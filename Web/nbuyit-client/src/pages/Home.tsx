import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import FloatingAddButton from "../components/FloatingAddButton";
import SellerButton from "../components/SellerButton";

function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [sortType, setSortType] = useState<'price_asc' | 'price_desc' | 'popularity' | 'none'>('none');

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/products")
      .then((response) => {
        setProducts(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/product-categories')
      .then(response => {
        const categoryNames: string[] = response.data.data.map((c: any) => c.name.toLowerCase());
        setCategories(['all', ...new Set(categoryNames)]);
      });
  }, []);

  const sortedAndFilteredProducts = useMemo(() => {
    const filtered = products.filter(product => {
      const searchLower = searchQuery.toLowerCase();
      const categoryLower = selectedCategory.toLowerCase();
    
      const matchesSearch = product.name.toLowerCase().includes(searchLower) ||
        product.description?.toLowerCase().includes(searchLower);
    
      const matchesCategory = categoryLower === 'all' || 
        product.product_categories.some((pc: any) => 
          pc.name.toLowerCase() === categoryLower
        );
    
      return matchesSearch && matchesCategory;
    });

    return [...filtered].sort((a, b) => {
      switch(sortType) {
        case 'price_asc':
          return parseFloat(a.price) - parseFloat(b.price);
        case 'price_desc':
          return parseFloat(b.price) - parseFloat(a.price);
        case 'popularity':
          return b.popularity - a.popularity;
        default:
          return 0;
      }
    });
  }, [products, searchQuery, selectedCategory, sortType]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-3xl font-bold text-[#093f87]">
              Discover Products
              <span className="text-gray-400 font-normal block md:inline mt-1 md:mt-0 md:ml-2 text-lg">
                ({products.length} items)
              </span>
            </h1>
            <SellerButton />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 space-y-4">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#093f87] focus:ring-2 focus:ring-[#093f87]/20 transition-all outline-none"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full capitalize ${
                  selectedCategory === category
                    ? 'bg-[#093f87] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Sort by:</label>
              <select 
                value={sortType}
                onChange={(e) => setSortType(e.target.value as any)}
                className="px-4 py-2 rounded-lg border border-gray-200 bg-white focus:border-[#093f87] focus:ring-2 focus:ring-[#093f87]/20"
              >
                <option value="none">Default</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="popularity">Popularity</option>
              </select>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                <div className="aspect-square bg-gray-200" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                  <div className="h-4 bg-gray-200 rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : sortedAndFilteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sortedAndFilteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🛍️</div>
            <h2 className="text-xl font-semibold text-gray-600 mb-2">
              No products found
            </h2>
            <p className="text-gray-500">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </main>

      <FloatingAddButton />
    </div>
  );
}

export default Home;