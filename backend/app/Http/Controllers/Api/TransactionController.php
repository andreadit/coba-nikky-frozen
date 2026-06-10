<?php

namespace App\Http\Controllers\Api;

use App\Models\Inventory;
use App\Models\Product;
use App\Models\StockMovement;
use App\Models\Transaction;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Transaction::with(['branch', 'user', 'items.product'])
            ->latest('transaction_at')
            ->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'branch_id' => ['required', 'exists:branches,id'],
            'paid_amount' => ['required', 'integer', 'min:0'],
            'discount' => ['nullable', 'integer', 'min:0'],
            'tax' => ['nullable', 'integer', 'min:0'],
            'payment_method' => ['nullable', 'string', 'max:255'],
            'items' => ['required', 'array', 'min:1'],
            'items.*.product_id' => ['required', 'exists:products,id'],
            'items.*.qty' => ['required', 'integer', 'min:1'],
        ]);

        return DB::transaction(function () use ($data, $request) {
            $items = collect($data['items']);
            $products = Product::whereIn('id', $items->pluck('product_id'))
                ->get()
                ->keyBy('id');

            $subtotal = 0;
            foreach ($items as $item) {
                $product = $products[$item['product_id']];
                $subtotal += $product->price * $item['qty'];
            }

            $discount = $data['discount'] ?? 0;
            $tax = $data['tax'] ?? 0;
            $total = max(0, $subtotal - $discount + $tax);

            if ($data['paid_amount'] < $total) {
                throw ValidationException::withMessages([
                    'paid_amount' => ['Nominal bayar kurang dari total transaksi.'],
                ]);
            }

            $transaction = Transaction::create([
                'invoice_no' => 'INV-' . now()->format('YmdHis') . '-' . random_int(100, 999),
                'branch_id' => $data['branch_id'],
                'user_id' => $request->user()->id,
                'subtotal' => $subtotal,
                'discount' => $discount,
                'tax' => $tax,
                'total' => $total,
                'paid_amount' => $data['paid_amount'],
                'change_amount' => $data['paid_amount'] - $total,
                'payment_method' => $data['payment_method'] ?? 'cash',
                'status' => 'completed',
                'transaction_at' => now(),
            ]);

            foreach ($items as $item) {
                $product = $products[$item['product_id']];
                $inventory = Inventory::where('branch_id', $data['branch_id'])
                    ->where('product_id', $product->id)
                    ->lockForUpdate()
                    ->first();

                if (! $inventory || $inventory->stock < $item['qty']) {
                    throw ValidationException::withMessages([
                        'items' => ["Stok {$product->name} tidak mencukupi."],
                    ]);
                }

                $stockBefore = $inventory->stock;
                $stockAfter = $stockBefore - $item['qty'];

                $transaction->items()->create([
                    'product_id' => $product->id,
                    'qty' => $item['qty'],
                    'price' => $product->price,
                    'cost' => $product->cost,
                    'subtotal' => $product->price * $item['qty'],
                ]);

                $inventory->update([
                    'stock' => $stockAfter,
                ]);

                StockMovement::create([
                    'product_id' => $product->id,
                    'branch_id' => $data['branch_id'],
                    'user_id' => $request->user()->id,
                    'transaction_id' => $transaction->id,
                    'type' => 'out',
                    'qty' => $item['qty'],
                    'stock_before' => $stockBefore,
                    'stock_after' => $stockAfter,
                    'note' => "Penjualan {$transaction->invoice_no}",
                ]);
            }

            return $transaction->load(['branch', 'user', 'items.product']);
        });
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Transaction::with(['branch', 'user', 'items.product'])->findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $transaction = Transaction::findOrFail($id);

        $data = $request->validate([
            'status' => ['required', 'string', 'max:255'],
        ]);

        $transaction->update($data);

        return $transaction->load(['branch', 'user', 'items.product']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Transaction::findOrFail($id)->delete();

        return response()->noContent();
    }
}
