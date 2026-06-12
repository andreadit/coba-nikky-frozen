<?php

namespace App\Http\Controllers\Api;

use App\Models\Inventory;
use App\Models\Product;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Product::with(['category', 'inventories.branch'])
            ->latest()
            ->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'category_id' => ['nullable', 'exists:categories,id'],
            'sku' => ['required', 'string', 'max:255', 'unique:products,sku'],
            'name' => ['required', 'string', 'max:255'],
            'unit' => ['required', 'string', 'max:255'],
            'price' => ['required', 'integer', 'min:0'],
            'cost' => ['nullable', 'integer', 'min:0'],
            'expiry_date' => ['nullable', 'date'],
            'image' => ['nullable', 'string', 'max:255'],
            'is_active' => ['boolean'],
            'branch_id' => ['required', 'exists:branches,id'],
            'stock' => ['required', 'integer', 'min:0'],
            'minimum_stock' => ['required', 'integer', 'min:0'],
            'maximum_stock' => ['nullable', 'integer', 'min:0'],
        ]);

        return DB::transaction(function () use ($data) {
            $product = Product::create(collect($data)->only([
                'category_id',
                'sku',
                'name',
                'unit',
                'price',
                'cost',
                'expiry_date',
                'image',
                'is_active',
            ])->all());

            Inventory::create([
                'product_id' => $product->id,
                'branch_id' => $data['branch_id'],
                'stock' => $data['stock'],
                'minimum_stock' => $data['minimum_stock'],
                'maximum_stock' => $data['maximum_stock'] ?? null,
            ]);

            return $product->load(['category', 'inventories.branch']);
        });
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Product::with(['category', 'inventories.branch'])->findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $product = Product::findOrFail($id);

        $data = $request->validate([
            'category_id' => ['nullable', 'exists:categories,id'],
            'sku' => ['required', 'string', 'max:255', Rule::unique('products', 'sku')->ignore($product->id)],
            'name' => ['required', 'string', 'max:255'],
            'unit' => ['required', 'string', 'max:255'],
            'price' => ['required', 'integer', 'min:0'],
            'cost' => ['nullable', 'integer', 'min:0'],
            'expiry_date' => ['nullable', 'date'],
            'image' => ['nullable', 'string', 'max:255'],
            'is_active' => ['boolean'],
            'branch_id' => ['required', 'exists:branches,id'],
            'stock' => ['required', 'integer', 'min:0'],
            'minimum_stock' => ['required', 'integer', 'min:0'],
            'maximum_stock' => ['nullable', 'integer', 'min:0'],
        ]);

        DB::transaction(function () use ($product, $data) {
            $product->update(collect($data)->only([
                'category_id',
                'sku',
                'name',
                'unit',
                'price',
                'cost',
                'expiry_date',
                'image',
                'is_active',
            ])->all());

            Inventory::updateOrCreate(
                [
                    'product_id' => $product->id,
                    'branch_id' => $data['branch_id'],
                ],
                [
                    'stock' => $data['stock'],
                    'minimum_stock' => $data['minimum_stock'],
                    'maximum_stock' => $data['maximum_stock'] ?? null,
                ]
            );
        });

        return $product->load(['category', 'inventories.branch']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Product::findOrFail($id)->delete();

        return response()->noContent();
    }
}
