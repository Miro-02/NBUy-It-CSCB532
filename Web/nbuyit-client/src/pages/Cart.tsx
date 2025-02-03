import React, { useEffect, useState } from 'react';
import { CartItem } from '../components/CartItem';
import { CheckoutCard } from '../components/CheckoutCard';
import axios from 'axios';

interface CartItemType {
    id: number;
    name: string;
    price: string;
    quantity: number;
    image: string;
}

function Cart() {
    const [cartItems, setCartItems] = useState<CartItemType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCart = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.get('/api/cart', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
            });
            setCartItems(response.data);
        } catch (error) {
            setError('Failed to load cart');
            console.error('Error fetching cart:', error);
        } finally {
            setLoading(false);
        }
        };
        fetchCart();
    }, []);

    const updateQuantity = async (itemId: number, newQuantity: number) => {
        try {
            const token = localStorage.getItem('authToken');
            await axios.put(`/api/cart/${itemId}`, {
              quantity: newQuantity
            }, {
            headers: {
                Authorization: `Bearer ${token}`,
                }
            });
      
            setCartItems(prevItems =>
                prevItems.map(item =>
                    item.id === itemId ? { ...item, quantity: newQuantity } : item
                )
            );
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const handleIncrement = (itemId: number) => {
        const item = cartItems.find(item => item.id === itemId);
        if (!item) return;
        updateQuantity(itemId, item.quantity + 1);
    };

    const handleDecrement = (itemId: number) => {
        const item = cartItems.find(item => item.id === itemId);
        if (!item) return;
        updateQuantity(itemId, Math.max(1, item.quantity - 1));
    };

    const handleRemove = async (itemId: number) => {
        try {
          const token = localStorage.getItem('authToken');
          await axios.delete(`/api/cart/${itemId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });
          setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
        } catch (error) {
          console.error('Error removing item:', error);
        }
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
            
            {loading && <div className="text-center">Loading cart...</div>}
            {error && <div className="text-red-500 text-center">{error}</div>}

            {!loading && !error && (
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
            )}
        </div>
    );
}

export default Cart;