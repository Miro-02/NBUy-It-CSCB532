import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import NoProductImage from '../assets/product-no-image.webp';

interface ProductImage {
  id: number;
  path: string;
  url: string;
  original_name: string;
  created_at: string;
  updated_at: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  quantity: number;
  popularity: number;
  product_images: ProductImage[];
  created_at: string;
}

function MyInventory() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get<Product[]>(
          `${import.meta.env.VITE_SERVER_URL}/api/my-products`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching inventory:', error);
        setError('Error fetching inventory');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInventory();
  }, []);

  const handleDelete = async (productId: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/api/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if(response.status === 204) {
        setProducts((prevProducts) => prevProducts.filter(product => product.id !== productId));
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 text-center text-gray-600">
        Loading inventory...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        {error}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">My Inventory</h1>
        <p className="text-gray-600">You have no products in your inventory.</p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Inventory</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md p-4">
            <img
              src={product.product_images?.[0]?.url || NoProductImage}
              alt={product.product_images?.[0]?.original_name}
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-sm text-gray-500">
              Posted on: {new Date(product.created_at).toLocaleDateString()}
            </p>
            <div className="mt-4 flex justify-between items-center">
              <Link
                to={`/products/${product.id}/edit`}
                className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-1 px-3 rounded"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(product.id)}
                className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-1 px-3 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyInventory;
