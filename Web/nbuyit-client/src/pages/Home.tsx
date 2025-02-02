import { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import NoImageProduct from "../assets/product-no-image.webp";

function Home() {
    const [products, setProducts] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState(0);
    
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

      const mappedProducts = products.map((product) => ({
        ...product,
        image: product.image || NoImageProduct,
        price: product.price ? `${product.price} лв.` : "N/A",
        categories: product.product_categories || [],
      }));
    

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
                    {mappedProducts.map((product) => (
                        <article
                            key={product.id}
                            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden flex flex-col h-full"
                        >
                            <Link to={`/products/${product.id}`} className="flex flex-col h-full">
                            <div className="aspect-square overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            <div className="p-4 flex flex-col flex-grow">
                                <h2 
                                    className="text-gray-800 line-clamp-3 mb-3 text-sm leading-snug"
                                    title={product.name} 
                                >
                                    {product.name}
                                </h2>

                                {product.categories?.length > 0 && (
                                    <div className="mb-2 text-sm text-gray-500">
                                        <div className="relative group">
                                        <div className="flex gap-1.5 overflow-hidden relative">
                                            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white z-10" />
                                            {product.categories.slice(0, 3).map((category, index, arr) => (
                                            <span 
                                                key={category.id}
                                                className="relative text-nowrap after:content-[','] last:after:content-none"
                                            >
                                                {category.name}
                                            </span>
                                            ))}
                                        </div>
                                        </div>

                                        {product.categories.length > 3 && (
                                        <span className="text-gray-400 text-xs mt-1">
                                            + {product.categories.length - 3} more
                                        </span>
                                        )}
                                    </div>
                                    )}
                                <div className="mt-auto flex items-end justify-between">
                                    <p className="text-lg font-bold text-[#093f87]">
                                        {product.price}
                                    </p>

                                    <button className="flex items-center space-x-2 rounded-lg bg-[#093f87] px-4 py-2 text-white hover:bg-[#082f6a] transition-colors duration-200">
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            strokeWidth="1.5" 
                                            stroke="currentColor" 
                                            className="w-5 h-5"
                                        >
                                            <path 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" 
                                            />
                                        </svg>
                                        <span className="text-sm">Add</span>
                                    </button>
                                </div>
                            </div>
                            </Link>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home