<?php

namespace App\Http\Controllers\Api;

use App\Models\Expense;
use App\Models\Transaction;
use App\Http\Controllers\Controller;

class FinanceController extends Controller
{
    public function index()
    {
        $revenue = Transaction::where('status', 'completed')->sum('total');
        $expense = Expense::sum('amount');

        return response()->json([
            'revenue' => $revenue,
            'expense' => $expense,
            'profit' => $revenue - $expense,
            'transactions' => Transaction::with(['branch', 'user'])
                ->latest('transaction_at')
                ->limit(20)
                ->get(),
            'expenses' => Expense::latest('expense_date')
                ->limit(20)
                ->get(),
        ]);
    }
}
