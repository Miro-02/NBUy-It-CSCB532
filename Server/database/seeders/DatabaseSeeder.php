<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Insert product categories
        $categories = [
            ['name' => 'Electronics', 'slug' => 'electronics'],
            ['name' => 'Clothing', 'slug' => 'clothing'],
            ['name' => 'Home & Kitchen', 'slug' => 'home-kitchen'],
            ['name' => 'Books', 'slug' => 'books'],
            ['name' => 'Sports & Outdoors', 'slug' => 'sports-outdoors'],
        ];
        foreach ($categories as &$category) {
            $category['created_at'] = Carbon::now();
            $category['updated_at'] = Carbon::now();
        }
        DB::table('product_categories')->insert($categories);

        // Insert products
        $sellers = DB::table('users')->pluck('id');
        $products = [];
        for ($i = 1; $i <= 5; $i++) {
            $products[] = [
                'name' => "Product $i",
                'description' => "Description of Product $i",
                'price' => rand(10, 500),
                'seller_id' => $sellers->random(),
                'quantity' => rand(10, 100),
                'popularity' => rand(0, 50),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ];
        }
        DB::table('products')->insert($products);

        // Insert orders
        $orders = [];
        for ($i = 1; $i <= 5; $i++) {
            $orders[] = [
                'user_id' => $sellers->random(),
                'status_id' => rand(1, 5), // Assuming statuses exist
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ];
        }
        DB::table('orders')->insert($orders);

        // Insert order_products
        $orderProducts = [];
        $product_ids = DB::table('products')->pluck('id');
        foreach ($orders as $order) {
            $orderProducts[] = [
                'product_id' => $product_ids->random(),
                'name' => "Ordered Product",
                'price' => rand(10, 500),
                'seller_id' => $sellers->random(),
                'quantity' => rand(1, 5),
                'popularity' => rand(0, 50),
                'order_product_status_id' => rand(1, 5),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ];
        }
        DB::table('order_products')->insert($orderProducts);

        // Insert orders_order_products (AFTER order_products exist)
        $orderProductIds = DB::table('order_products')->pluck('id');
        $ordersOrderProducts = [];
        foreach ($orders as $order) {
            $ordersOrderProducts[] = [
                'order_id' => $order['user_id'],
                'order_product_id' => $orderProductIds->random(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ];
        }
        DB::table('orders_order_products')->insert($ordersOrderProducts);
    }
}
