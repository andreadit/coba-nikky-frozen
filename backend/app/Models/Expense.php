<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    protected $fillable = [
        'branch_id',
        'user_id',
        'category',
        'amount',
        'expense_date',
        'note',
    ];

    protected function casts(): array
    {
        return [
            'expense_date' => 'date',
        ];
    }
}
