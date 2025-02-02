<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'seller_id',
        'quantity',
        'popularity',
    ];

    public function productCategories()
    {
        return $this->belongsToMany(ProductCategory::class, 'products_product_categories');
    }

    public function carts()
    {
        return $this->hasMany(Cart::class, 'carts_products');
    }

    public function images(){
        return $this->hasMany(File::class, 'products_images');
    }

}
