import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import FloatingAddButton from "../components/FloatingAddButton";
import SellerButton from "../components/SellerButton";

function Home() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/products")
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-[#093f87] mb-8">
          Welcome to NbuyIt!
        </h1>
        
        <div className="mb-8 max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full px-6 py-3 rounded-xl border-2 border-gray-200 focus:border-[#093f87] focus:ring-2 focus:ring-[#093f87]/20 transition-all outline-none"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <FloatingAddButton />
    </div>
  );
}

export default Home;