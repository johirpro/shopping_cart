<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                'name' => 'Product 1',
                'description' => 'Test Product 1',
                'price' => 1000.00,
                'stock' => 500,
                'image_url' => 'product_1.png',
            ],
            [
                'name' => 'Product 2',
                'description' => 'Test Product 2',
                'price' => 1100.00,
                'stock' => 400,
                'image_url' => 'product_2.png',
            ],
            [
                'name' => 'Product 3',
                'description' => 'Test Product 3',
                'price' => 1200.00,
                'stock' => 300,
                'image_url' => 'product_3.png',
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
