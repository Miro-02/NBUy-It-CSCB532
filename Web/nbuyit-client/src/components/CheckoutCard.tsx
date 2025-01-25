import React from 'react';

interface CheckoutCardProps {
    items: number;
    subtotal: string;
    taxes: string;
    total: string;
}

export function CheckoutCard({ items, subtotal, taxes, total } : CheckoutCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6 h-fit">
            <h2 className="text-xl font-bold text-[#093f87] mb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                    <span>Subtotal ({items} items)</span>
                    <span className="font-medium">{subtotal}</span>
                </div>
                <div className="flex justify-between">
                    <span>Taxes</span>
                    <span className="font-medium">{taxes}</span>
                </div>
            </div>
            
            <div className="border-t pt-4 mb-6">
                <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-[#093f87]">{total}</span>
                </div>
            </div>
            
            <button className="w-full bg-[#093f87] text-white py-3 rounded-lg hover:bg-[#082f6a] transition-colors">
                Proceed to Checkout
            </button>
        </div>
    );
}