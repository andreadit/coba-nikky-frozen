<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Owner',
            'email' => 'owner@nikky.com',
            'password' => Hash::make('password123'),
            'role' => 'owner',
            'branch_id' => 1,
            'is_active' => true,
        ]);

        User::create([
            'name' => 'Admin',
            'email' => 'admin@nikky.com',
            'password' => Hash::make('password123'),
            'role' => 'admin',
            'branch_id' => 1,
            'is_active' => true,
        ]);

        User::create([
            'name' => 'Cashier',
            'email' => 'cashier@nikky.com',
            'password' => Hash::make('password123'),
            'role' => 'cashier',
            'branch_id' => 1,
            'is_active' => true,
        ]);
    }
}
