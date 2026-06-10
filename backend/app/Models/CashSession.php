<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CashSession extends Model
{
    protected $fillable = [
        'branch_id',
        'user_id',
        'opening_cash',
        'closing_cash',
        'expected_cash',
        'difference',
        'opened_at',
        'closed_at',
        'status',
        'note',
    ];

    protected function casts(): array
    {
        return [
            'opened_at' => 'datetime',
            'closed_at' => 'datetime',
        ];
    }
}
