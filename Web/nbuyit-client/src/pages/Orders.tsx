import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { Link } from 'react-router';

interface Order {
  id: number;
  created_at: string;
  status: {
    name: string;
    slug: string;
  };
  order_products: Array<{
    id: number;
    product_id: number;
    quantity: number;
    price: number;
  }>;
}

function Orders() {
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get<Order[]>(`${import.meta.env.VITE_SERVER_URL}/api/my-orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setOrders([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <div className="p-4 text-center text-red-500">Please login to view your orders</div>;
  }

  if (isLoading) {
    return <div className="p-4 text-center text-gray-600">Loading orders...</div>;
  }

  if (!orders.length) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">My Orders</h1>
        <p className="text-gray-600">You haven't placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-lg font-semibold">Order # {order.id}</h2>
                <p className="text-sm text-gray-500">
                  Ordered on: {new Date(order.created_at).toLocaleDateString()}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                order.status.slug === 'pending' 
                  ? 'bg-yellow-100 text-yellow-800' 
                  : 'bg-green-100 text-green-800'
              }`}>
                {order.status.name}
              </span>
              <Link to={`/my-orders/${order.id}`}>View Details</Link>
            </div>
            
            {order.order_products.length > 0 ? (
              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Products:</h3>
                <div className="space-y-2">
                  {order.order_products.map((product) => (
                    <div key={product.id} className="flex justify-between items-center">
                      <span>Product #{product.product_id}</span>
                      <div className="text-gray-600">
                      <span>{product.quantity} x {Number(product.price).toFixed(2)} лв.</span>
                      <span className="ml-4">{(product.quantity * Number(product.price)).toFixed(2)} лв.</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>  
            ) : (
              <p className="text-gray-500 text-sm">No products in this order</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;