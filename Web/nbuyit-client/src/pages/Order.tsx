import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { useAuth } from '../auth/AuthContext';

interface OrderProduct {
  id: number;
  product_id: number;
  name: string;
  price: string;
  quantity: number;
  seller_id: number;
  created_at: string;
  updated_at: string;
}

interface Order {
  id: number;
  created_at: string;
  updated_at: string;
  status: {
    name: string;
    slug: string;
  };
  order_products: OrderProduct[];
}

function OrderDetails() {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get<Order>(
          `${import.meta.env.VITE_SERVER_URL}/api/my-orders/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching order:', error);
        setError('Failed to load order details');
        setOrder(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated && id) {
      fetchOrder();
    }
  }, [id, isAuthenticated]);

  if (isLoading) {
    return <div className="p-4 text-center text-gray-600">Loading order details...</div>;
  }

  if (error || !order) {
    return (
      <div className="p-4 text-center">
        <div className="text-red-500 mb-4">{error || 'Order not found'}</div>
        <Link to="/my-orders" className="text-[#093f87] hover:underline">
          ← Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="mb-6 flex justify-between items-start">
        <h1 className="text-2xl font-bold">Order Details #{order.id}</h1>
        <Link to="/my-orders" className="text-[#093f87] hover:underline">
          ← Back to Orders
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-sm text-gray-500">
              Ordered on: {new Date(order.created_at).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500">
              Last updated: {new Date(order.updated_at).toLocaleDateString()}
            </p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              order.status.slug === 'pending'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-green-100 text-green-800'
            }`}
          >
            {order.status.name}
          </span>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold mb-4">Products in this order</h3>
          <div className="space-y-4">
            {order.order_products.map((product) => (
              <div key={product.id} className="flex justify-between items-start border-b pb-4">
                <div>
                  <h4 className="font-medium">{product.name}</h4>
                  <p className="text-sm text-gray-500">Product ID: #{product.product_id}</p>
                  <p className="text-sm text-gray-500">Seller ID: #{product.seller_id}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600">
                    {product.quantity} × {Number(product.price).toFixed(2)} лв.
                  </p>
                  <p className="font-medium">
                    {(product.quantity * Number(product.price)).toFixed(2)} лв.
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t">
            <div className="flex justify-between items-center font-medium">
              <span>Total Items:</span>
              <span>
                {order.order_products.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;