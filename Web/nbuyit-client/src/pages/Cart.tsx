// pages/Cart.jsx
import React, { useState } from 'react';
import { CartItem } from '../components/CartItem';
import { CheckoutCard } from '../components/CheckoutCard';

function Cart() {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: 'Apple iPhone 13, 128GB, 4GB RAM, 5G, Midnight',
            image: 'https://s13emagst.akamaized.net/products/40685/40684414/images/res_974dc0e4b6a1180b612c24afef8eb494.jpg',
            price: '979,99 лв.',
            quantity: 1
        },
        {
            id: 6,
            name: 'Крем от шамфъстък Pisti, За мазане, 200 г',
            image: 'https://s13emagst.akamaized.net/products/56959/56958177/images/res_bbc8ad214d844859dfe6dc6e87f621c3.jpg',
            price: '18,62 лв.',
            quantity: 2
        }
    ]);

    const handleIncrement = (itemId: number) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === itemId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    const handleDecrement = (itemId: number) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === itemId
                    ? { ...item, quantity: Math.max(1, item.quantity - 1) }
                    : item
            )
        );
    };

    const handleRemove = (itemId: number) => {
        setCartItems(prevItems =>
            prevItems.filter(item => item.id !== itemId)
        );
    };

    const calculateAmounts = () => {
        const subtotal = cartItems.reduce((sum, item) => {
            const price = Number(item.price.replace(' лв.', '').replace(',', '.'));
            return sum + (price * item.quantity);
        }, 0);
        
        const taxes = subtotal * 0.20;
        const total = subtotal + taxes;
        
        const formatter = new Intl.NumberFormat('bg-BG', {
            style: 'currency',
            currency: 'BGN',
            minimumFractionDigits: 2
        });
        
        return {
            subtotal: formatter.format(subtotal),
            taxes: formatter.format(taxes),
            total: formatter.format(total),
            totalItems: cartItems.reduce((sum, item) => sum + item.quantity, 0)
        };
    };

    const { subtotal, taxes, total, totalItems } = calculateAmounts();

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-[#093f87] mb-8">Your Cart</h1>
                
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                    {
                        cartItems.map(item => (
                            <CartItem
                                key={item.id}
                                {...item}
                                onIncrement={handleIncrement}
                                onDecrement={handleDecrement}
                                onRemove={handleRemove}
                            />
                        ))
                    }
                    </div>
                    
                    <CheckoutCard
                        items={totalItems}
                        subtotal={subtotal}
                        taxes={taxes}
                        total={total}
                    />
                </div>
            </div>
        </div>
    );
}

export default Cart;