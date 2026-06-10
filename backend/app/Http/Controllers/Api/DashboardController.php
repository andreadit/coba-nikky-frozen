<?php

namespace App\Http\Controllers\Api;

use App\Models\Inventory;
use App\Models\Product;
use App\Models\Transaction;
use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    public function index()
    {
        $todayRevenue = Transaction::whereDate('transaction_at', today())->sum('total');
        $monthlyRevenue = Transaction::whereMonth('transaction_at', now()->month)
            ->whereYear('transaction_at', now()->year)
            ->sum('total');

        return response()->json([
            'today_revenue' => $todayRevenue,
            'monthly_revenue' => $monthlyRevenue,
            'product_count' => Product::where('is_active', true)->count(),
            'low_stock_count' => Inventory::whereColumn('stock', '<=', 'minimum_stock')->count(),
            'expiring_count' => Product::whereNotNull('expiry_date')
                ->whereDate('expiry_date', '<=', now()->addDays(7))
                ->count(),
            'recent_transactions' => Transaction::with(['branch', 'user'])
                ->latest('transaction_at')
                ->limit(5)
                ->get(),
        ]);
    }
}
