<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $adminRole = Role::create(['name' => 'admin']);
        Role::create(['name' => 'buyer']);
        Role::create(['name' => 'seller']);
        Role::create(['name' => 'order-manager']);

        // Create admin user
        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => 'durabura',
            'phone' => "123213",
            'age' => 18,
            'address' => 'test',
        ]);

        $admin->assignRole($adminRole);
    }
}
