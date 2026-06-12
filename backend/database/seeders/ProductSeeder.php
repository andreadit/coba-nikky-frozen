<?php

namespace Database\Seeders;

use App\Models\Branch;
use App\Models\Category;
use App\Models\Inventory;
use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            ['sku' => 'CHK-001', 'name' => 'Chicken Nuggets (500g)', 'category' => 'Daging', 'price' => 35000, 'cost' => 24000, 'stock' => 45, 'expiry_date' => now()->addDays(30)],
            ['sku' => 'FSH-001', 'name' => 'Fish Ball (500g)', 'category' => 'Seafood', 'price' => 28000, 'cost' => 18000, 'stock' => 12, 'expiry_date' => now()->addDays(20)],
            ['sku' => 'BEF-001', 'name' => 'Beef Burger Patty (6pcs)', 'category' => 'Daging', 'price' => 45000, 'cost' => 32000, 'stock' => 30, 'expiry_date' => now()->addDays(60)],
            ['sku' => 'DMS-001', 'name' => 'Dimsum (12pcs)', 'category' => 'Snack', 'price' => 32000, 'cost' => 21000, 'stock' => 8, 'expiry_date' => now()->addDays(10)],
            ['sku' => 'FRF-001', 'name' => 'French Fries (500g)', 'category' => 'Sayuran', 'price' => 22000, 'cost' => 14000, 'stock' => 60, 'expiry_date' => now()->addDays(90)],
        ];

        $branch = Branch::where('code', 'UTM')->first();

        foreach ($products as $item) {
            $category = Category::where('name', $item['category'])->first();
            $product = Product::updateOrCreate(
                ['sku' => $item['sku']],
                [
                    'category_id' => $category?->id,
                    'name' => $item['name'],
                    'unit' => 'pcs',
                    'price' => $item['price'],
                    'cost' => $item['cost'],
                    'expiry_date' => $item['expiry_date'],
                    'is_active' => true,
                ]
            );

            if ($branch) {
                Inventory::updateOrCreate(
                    [
                        'product_id' => $product->id,
                        'branch_id' => $branch->id,
                    ],
                    [
                        'stock' => $item['stock'],
                        'minimum_stock' => 10,
                        'maximum_stock' => 100,
                    ]
                );
            }
        }
    }
}
