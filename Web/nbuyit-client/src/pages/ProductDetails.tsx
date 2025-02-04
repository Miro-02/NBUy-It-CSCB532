import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import NoImageProduct from "../assets/product-no-image.webp";

function ProductDetails() {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [categories, setCategories] = useState<Array<{ id: number; name: string }>>([]);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const goToPrevious = () => {
        setActiveImageIndex(prev => 
          prev === 0 ? product.product_images.length - 1 : prev - 1
        );
    };
    
    const goToNext = () => {
        setActiveImageIndex(prev => 
            prev === product.product_images.length - 1 ? 0 : prev + 1
        );
    };

    const handleAddToCart = async (e: React.MouseEvent) => {    
        e.preventDefault();
        e.stopPropagation();
    
        try {
          const token = localStorage.getItem("authToken");
          await axios.post(
            `${import.meta.env.VITE_SERVER_URL}/api/cart`,
            {
              product_id: product.id,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Access-Control-Allow-Credentials': true,
              },
            }
          );
          console.log("Product added to cart!");
        } catch (error) {
          console.error("Error adding to cart:", error);
        }
      };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productResponse = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/products/${id}`);
                setProduct(productResponse.data.data);

                const categoriesResponse = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/product-categories`);
                setCategories(categoriesResponse.data.data);
            } catch (err) {
                setError(axios.isAxiosError(err) 
                    ? err.response?.data?.message || 'Failed to load product' 
                    : 'An unexpected error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#093f87]"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-[#093f87] mb-4">{error}</h1>
                    <Link
                        to="/"
                        className="text-[#093f87] hover:text-[#082f6a] underline"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-[#093f87] mb-4">
                        Product not found
                    </h1>
                    <Link
                        to="/"
                        className="text-[#093f87] hover:text-[#082f6a] underline"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="mb-6">
                        <Link
                            to="/"
                            className="text-[#093f87] hover:text-[#082f6a] flex items-center"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-1"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Back to Products
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden relative">
                        {product.product_images?.map((image: any, index: number) => (
                            <img
                                key={image.id}
                                src={image.url || NoImageProduct}
                                alt={product.name}
                                className={`w-full h-full object-scale-down absolute inset-0 transition-opacity duration-300 ${
                                    index === activeImageIndex ? 'opacity-100' : 'opacity-0'
                                }`}
                            />
                            ))}
                            
                            {product.product_images?.length > 1 && (
                            <>
                                <button
                                onClick={goToPrevious}
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors"
                                >
                                <svg
                                    className="w-6 h-6 text-[#093f87]"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                                </button>
                                
                                <button
                                onClick={goToNext}
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors"
                                >
                                <svg
                                    className="w-6 h-6 text-[#093f87]"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                    />
                                </svg>
                                </button>
                            </>
                            )}
                        </div>

                        {product.images?.length > 1 && (
                            <div className="flex gap-2 overflow-x-auto py-2">
                            {product.images.map((image: any, index: number) => (
                                <button
                                key={image.id}
                                onClick={() => setActiveImageIndex(index)}
                                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all bg-white ${
                                    index === activeImageIndex
                                      ? 'border-[#093f87]'
                                      : 'border-transparent'
                                  }`}
                                >
                                <img
                                    src={image.image_url || NoImageProduct}
                                    alt={product.name}
                                    className="w-full h-full object-contain bg-white"
                                />
                                </button>
                            ))}
                            </div>
                        )}
                        </div>

                        <div className="space-y-6">
                            <h1 className="text-3xl font-bold text-[#093f87]">
                                {product.name}
                            </h1>

                            <div className="text-2xl font-bold text-[#093f87]">
                                {product.price}
                            </div>

                            <div className="prose max-w-none">
                                <p className="text-gray-600">
                                    {product.description || 'No description available'}
                                </p>
                            </div>

                            <div className="flex items-center space-x-4">
                                <button 
                                onClick={handleAddToCart}
                                className="flex items-center space-x-2 rounded-lg bg-[#093f87] px-6 py-3 text-white hover:bg-[#082f6a] transition-colors duration-200">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                                        />
                                    </svg>
                                    <span>Add to Cart</span>
                                </button>
                            </div>

                            <div className="border-t pt-4">
                                <dl className="grid grid-cols-2 gap-4">
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">
                                            Categories
                                        </dt>
                                        <dd className="mt-1 font-bold text-sm text-[#093f87]">
                                            {product.product_categories?.map((pc: any) => (
                                                <span key={pc.id} className="block">
                                                    {pc.name}
                                                </span>
                                            ))}
                                        </dd>
                                    </div>  
                                </dl>
                            </div>

                            <div className="mt-12">
                                <h2 className="text-2xl font-bold text-[#093f87] mb-6">Customer Reviews</h2>
                                <div className="bg-gray-50 rounded-xl p-6 mb-8">
                                    <h3 className="text-lg font-semibold mb-4">Write a Review</h3>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4">
                                            <label className="text-sm font-medium">Your Rating:</label>
                                            <div className="flex gap-1 text-gray-300">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <span key={star} className="w-8 h-8 cursor-not-allowed">☆</span>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <input
                                                type="text"
                                                placeholder="Your Name"
                                                className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-100 cursor-not-allowed"
                                                disabled
                                            />
                                        </div>
                                        <div>
                                            <textarea
                                                placeholder="Write your review..."
                                                rows={4}
                                                className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-100 cursor-not-allowed"
                                                disabled
                                            />
                                        </div>

                                        <button
                                            className="bg-[#093f87]/70 text-white px-6 py-2 rounded-lg cursor-not-allowed"
                                            disabled
                                        >
                                            Submit Review
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div className="bg-white rounded-xl p-6 shadow-sm">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-3">
                                                <span className="font-semibold">John D.</span>
                                                <div className="flex gap-1 text-yellow-400">
                                                    ★★★★☆
                                                </div>
                                            </div>
                                            <span className="text-sm text-gray-500">2024-03-15</span>
                                        </div>
                                        <p className="text-gray-600">Great product! Exactly as described and fast delivery.</p>
                                    </div>

                                    <div className="bg-white rounded-xl p-6 shadow-sm">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-3">
                                                <span className="font-semibold">Sarah M.</span>
                                                <div className="flex gap-1 text-yellow-400">
                                                    ★★★★★
                                                </div>
                                            </div>
                                            <span className="text-sm text-gray-500">2024-03-14</span>
                                        </div>
                                        <p className="text-gray-600">Excellent quality, highly recommend!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;