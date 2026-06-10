<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'category_id',
        'sku',
        'name',
        'unit',
        'price',
        'cost',
        'expiry_date',
        'image',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'expiry_date' => 'date',
            'is_active' => 'boolean',
        ];
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function inventories()
    {
        return $this->hasMany(Inventory::class);
    }

    public function transactionItems()
    {
        return $this->hasMany(TransactionItem::class);
    }
}
