<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;

class AdminUserSeeder extends Seeder
{
    public function run()
    {
        // Create admin user and assign 'admin' role
        $admin = User::create([
            'name'      => 'Admin User',
            'email'     => 'admin@example.com',
            'password'  => bcrypt('durabura'),
            'phone'     => '123213',
            'age'       => 30,
            'address'   => 'Admin Address',
        ]);

        // Check if 'admin' role exists and assign it to the user
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $admin->assignRole($adminRole);

        // Create buyer user and assign 'buyer' role
        $buyer = User::create([
            'name'      => 'Buyer User',
            'email'     => 'buyer@example.com',
            'password'  => bcrypt('durabura'),
            'phone'     => '123456',
            'age'       => 28,
            'address'   => 'Buyer Address',
        ]);

        // Check if 'buyer' role exists and assign it to the user
        $buyerRole = Role::firstOrCreate(['name' => 'buyer']);
        $buyer->assignRole($buyerRole);

        // Create seller user and assign 'seller' role
        $seller = User::create([
            'name'      => 'Seller User',
            'email'     => 'seller@example.com',
            'password'  => bcrypt('durabura'),
            'phone'     => '987654',
            'age'       => 35,
            'address'   => 'Seller Address',
        ]);

        // Check if 'seller' role exists and assign it to the user
        $sellerRole = Role::firstOrCreate(['name' => 'seller']);
        $seller->assignRole($sellerRole);

        // Create order manager user and assign 'order-manager' role
        $orderManager = User::create([
            'name'      => 'Order Manager User',
            'email'     => 'order-manager@example.com',
            'password'  => bcrypt('durabura'),
            'phone'     => '112233',
            'age'       => 32,
            'address'   => 'Order Manager Address',
        ]);

        // Check if 'order-manager' role exists and assign it to the user
        $orderManagerRole = Role::firstOrCreate(['name' => 'order-manager']);
        $orderManager->assignRole($orderManagerRole);
    }
}
