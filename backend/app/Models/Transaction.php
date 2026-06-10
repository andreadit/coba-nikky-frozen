<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = [
        'invoice_no',
        'branch_id',
        'user_id',
        'subtotal',
        'discount',
        'tax',
        'total',
        'paid_amount',
        'change_amount',
        'payment_method',
        'status',
        'transaction_at',
    ];

    protected function casts(): array
    {
        return [
            'transaction_at' => 'datetime',
        ];
    }

    public function branch()
    {
        return $this->belongsTo(Branch::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(TransactionItem::class);
    }
}
