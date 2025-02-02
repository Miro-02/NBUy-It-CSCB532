<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'status_id',
    ];

    public function orderProducts(){
        return $this->hasMany(OrderProduct::class, 'orders_order_products');
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
}
