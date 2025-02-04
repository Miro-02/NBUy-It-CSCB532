<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderProduct extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'name',
        'price',
        'seller_id',
        'quantity',
        'popularity',
        'order_product_status_id',
    ];

    public function order()
    {
        return $this->hasMany(Order::class, 'orders_order_products');
    }

    public function status()
    {
        return $this->belongsTo(OrderProductStatus::class, 'order_product_status_id', 'id');
    }
}
