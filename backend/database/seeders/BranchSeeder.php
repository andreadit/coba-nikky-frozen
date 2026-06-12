<?php

namespace Database\Seeders;

use App\Models\Branch;
use Illuminate\Database\Seeder;

class BranchSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $branches = [
            ['name' => 'Cabang Utama', 'code' => 'UTM', 'phone' => '0812-1000-0001', 'address' => 'Jl. Frozen Food No. 1'],
            ['name' => 'Cabang Bandung', 'code' => 'BDG', 'phone' => '0812-1000-0002', 'address' => 'Jl. Bandung Sejahtera No. 8'],
            ['name' => 'Cabang Surabaya', 'code' => 'SBY', 'phone' => '0812-1000-0003', 'address' => 'Jl. Surabaya Makmur No. 12'],
        ];

        foreach ($branches as $branch) {
            Branch::updateOrCreate(
                ['code' => $branch['code']],
                $branch + ['is_active' => true]
            );
        }
    }
}
