<?php

namespace App\Http\Controllers\Api;

use App\Models\Inventory;
use App\Models\Branch;
use App\Models\Product;
use App\Models\Transaction;
use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    public function index()
    {
        $todayRevenue = Transaction::whereDate('created_at', today())->sum('total');
        $monthlyRevenue = Transaction::whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->sum('total');
        $branchRevenue = Branch::query()
            ->leftJoin('transactions', 'transactions.branch_id', '=', 'branches.id')
            ->selectRaw('branches.name as branch, COALESCE(SUM(transactions.total), 0) as revenue')
            ->where('branches.is_active', true)
            ->groupBy('branches.id', 'branches.name')
            ->orderByDesc('revenue')
            ->get();
        $topRevenue = max((int) $branchRevenue->max('revenue'), 1);

        return response()->json([
            'today_revenue' => $todayRevenue,
            'monthly_revenue' => $monthlyRevenue,
            'today_transaction_count' => Transaction::whereDate('created_at', today())->count(),
            'active_branch_count' => Branch::where('is_active', true)->count(),
            'product_count' => Product::where('is_active', true)->count(),
            'low_stock_count' => Inventory::whereColumn('stock', '<=', 'minimum_stock')->count(),
            'expiring_count' => Product::whereNotNull('expiry_date')
                ->whereDate('expiry_date', '<=', now()->addDays(7))
                ->count(),
            'recent_transactions' => Transaction::with(['branch', 'user'])
                ->latest('created_at')
                ->limit(5)
                ->get(),
            'branch_performance' => $branchRevenue->map(fn ($branch) => [
                'branch' => $branch->branch,
                'revenue' => (int) $branch->revenue,
                'pct' => round(((int) $branch->revenue / $topRevenue) * 100),
                'trend' => 'Realtime',
            ])->values(),
        ]);
    }
}
