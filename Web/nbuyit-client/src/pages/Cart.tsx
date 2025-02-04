import React, { useEffect, useState } from 'react';
import { CartItem } from '../components/CartItem';
import { CheckoutCard } from '../components/CheckoutCard';
import axios from 'axios';
import { Link } from 'react-router';

interface ProductImage {
    id: number;
    path: string;
    url: string;
    original_name: string;
    created_at: string;
    updated_at: string;
}

interface CartItemType {
    id: number;
    name: string;
    price: string;
    quantity: number;
    product_images: ProductImage[];
    product_categories: Array<{
      id: number;
      name: string;
      slug: string;
      created_at: string;
      updated_at: string;
    }>;
    description: string;
    seller_id: number;
    popularity: number;
    created_at: string;
    updated_at: string;
}

function Cart() {
    const [cartItems, setCartItems] = useState<CartItemType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCart = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/cart`, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            const receivedData = response.data.data?.products;
            const itemsArray = Array.isArray(receivedData) ? receivedData : [];
           /*  itemsArray.forEach(item => {
                console.log(`Product ID: ${item.id}, Images:`, item.product_images);
            }); */
            console.log(receivedData);
            
            setCartItems(itemsArray);
        } catch (error) {
            setError('Failed to load cart');
            console.error('Error fetching cart:', error);
            setCartItems([]); 
        } finally {
            setLoading(false);
        }
        };
        fetchCart();
    }, []);

    const updateQuantity = async (itemId: number, newQuantity: number) => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/cart/`, 
            {
                product_id: itemId,
                quantity: newQuantity,
            },
            {
            headers: {
                Authorization: `Bearer ${token}`,
                }
            });
      
            setCartItems(Array.isArray(response.data.data?.products) ? response.data.data?.products : []);
            console.log('Cart Items:', cartItems);
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
          await axios.delete(`${import.meta.env.VITE_SERVER_URL}/api/cart/${itemId}`, 
            {
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
        const items = Array.isArray(cartItems) ? cartItems : [];
        const subtotal = items.reduce((sum, item) => {
        const priceString = item?.price || '0';
        const price = Number(priceString.replace(/[^0-9.,]/g, '').replace(',', '.'));    
        return sum + (isNaN(price) ? 0 : price * (item.quantity || 0));
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
            totalItems: items.reduce((sum, item) => sum + item.quantity || 0, 0)
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

                {Array.isArray(cartItems) && cartItems.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-2xl text-gray-600 mb-4">
                            Your cart is empty 🛒
                        </div>
                        <Link 
                            to="/" 
                            className="text-[#093f87] hover:text-blue-700 font-medium"
                        >
                            Browse Products →
                        </Link>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-4">
                        {Array.isArray(cartItems) && cartItems.map(item => (
                            <CartItem
                                key={item.id}
                                {...item}
                                product_images={item.product_images || []}
                                onIncrement={handleIncrement}
                                onDecrement={handleDecrement}
                                onRemove={handleRemove}
                            />
                        ))}
                        </div>
                        
                        <CheckoutCard
                            items={totalItems}
                            subtotal={subtotal}
                            taxes={taxes}
                            total={total}
                        />
                    </div>
                )}
            </div>
            )}
        </div>
    );
}

export default Cart;