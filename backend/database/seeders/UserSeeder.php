<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(['email' => 'owner@nikkyfrozen.com'], [
            'name' => 'Owner Nikky Frozen',
            'password' => Hash::make('password123'),
            'role' => 'owner',
            'branch_id' => 1,
            'is_active' => true,
        ]);

        User::updateOrCreate(['email' => 'gudang@nikkyfrozen.com'], [
            'name' => 'Admin Gudang',
            'password' => Hash::make('password123'),
            'role' => 'admin_gudang',
            'branch_id' => 1,
            'is_active' => true,
        ]);

        User::updateOrCreate(['email' => 'kasir@nikkyfrozen.com'], [
            'name' => 'Kasir Utama',
            'password' => Hash::make('password123'),
            'role' => 'kasir',
            'branch_id' => 1,
            'is_active' => true,
        ]);
    }
}
