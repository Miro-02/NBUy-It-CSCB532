import axios from 'axios';
import { useNavigate } from 'react-router';

interface CheckoutCardProps {
    items: number;
    subtotal: string;
    taxes: string;
    total: string;
}

export function CheckoutCard({ items, subtotal, taxes, total } : CheckoutCardProps) {
    const navigate = useNavigate();

    const handleCheckout = async() => {
        try {
            const token = localStorage.getItem("authToken");
            console.log(token);
            const response = await axios.post(
              `${import.meta.env.VITE_SERVER_URL}/api/order`, {},
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                }
              }
            );
            if(response.status === 201) {
              window.location.reload();
            }
          } catch (error) {
            console.error("Error:", error);
          }
    };

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
            
            <button onClick={handleCheckout} className="w-full bg-[#093f87] text-white py-3 rounded-lg hover:bg-[#082f6a] transition-colors">
                Proceed to Checkout
            </button>
        </div>
    );
}