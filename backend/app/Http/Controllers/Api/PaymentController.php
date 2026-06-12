<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PaymentController extends Controller
{
    public function createMidtransSnap(Transaction $transaction)
    {
        $transaction->load(['items.product', 'user', 'branch']);

        $serverKey = config('services.midtrans.server_key');
        $baseUrl = config('services.midtrans.is_production')
            ? 'https://app.midtrans.com'
            : 'https://app.sandbox.midtrans.com';

        abort_if(blank($serverKey), 500, 'MIDTRANS_SERVER_KEY belum diatur.');

        $payload = [
            'transaction_details' => [
                'order_id' => $transaction->invoice_no,
                'gross_amount' => $transaction->total,
            ],
            'item_details' => $transaction->items->map(fn ($item) => [
                'id' => (string) $item->product_id,
                'price' => $item->price,
                'quantity' => $item->qty,
                'name' => $item->product->name,
            ])->values()->all(),
            'customer_details' => [
                'first_name' => $transaction->user->name,
                'email' => $transaction->user->email,
            ],
            'callbacks' => [
                'finish' => config('services.midtrans.finish_url'),
            ],
        ];

        $response = Http::withBasicAuth($serverKey, '')
            ->acceptJson()
            ->post("{$baseUrl}/snap/v1/transactions", $payload);

        if ($response->failed()) {
            return response()->json([
                'message' => 'Gagal membuat transaksi Midtrans.',
                'error' => $response->json(),
            ], $response->status());
        }

        $transaction->update([
            'status' => 'pending',
        ]);

        return response()->json([
            'transaction' => $transaction,
            'snap_token' => $response->json('token'),
            'redirect_url' => $response->json('redirect_url'),
        ]);
    }

    public function handleMidtransNotification(Request $request)
    {
        $serverKey = config('services.midtrans.server_key');
        $orderId = $request->input('order_id');
        $statusCode = $request->input('status_code');
        $grossAmount = $request->input('gross_amount');
        $signature = hash('sha512', $orderId . $statusCode . $grossAmount . $serverKey);

        abort_if($signature !== $request->input('signature_key'), 403, 'Signature Midtrans tidak valid.');

        $transaction = Transaction::where('invoice_no', $orderId)->firstOrFail();
        $paymentStatus = $request->input('transaction_status');
        $fraudStatus = $request->input('fraud_status');

        $status = match ($paymentStatus) {
            'capture' => $fraudStatus === 'challenge' ? 'pending' : 'completed',
            'settlement' => 'completed',
            'pending' => 'pending',
            'expire' => 'expired',
            'cancel' => 'cancelled',
            'deny' => 'denied',
            default => $transaction->status,
        };

        $transaction->update([
            'status' => $status,
            'paid' => $status === 'completed' ? $transaction->total : $transaction->paid,
            'change' => 0,
        ]);

        return response()->json([
            'message' => 'Notifikasi Midtrans diproses.',
        ]);
    }
}
