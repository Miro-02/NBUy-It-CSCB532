import { Link } from "react-router";
import CategoriesList from "./CategoriesList";
import AddToCartButton from "./AddToCartButton";
import NoImageProduct from "../assets/product-no-image.webp";

export default function ProductCard({ product }: { product: any }) {
  const getPopularityLabel = () => {
    if (product.popularity > 50) return "Hot Item";
    if (product.popularity > 20) return "Popular";
    return null;
  };

  return (
    <article className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden flex flex-col h-full">
      <Link to={`/products/${product.id}`} className="flex flex-col h-full">
        <div className="aspect-square bg-white overflow-hidden flex items-center justify-center">

          <img
            src={product?.product_images[0]?.url || NoImageProduct}
            alt={product.name}
            className="max-w-full max-h-full object-scale-down"/>
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <h2 
            className="text-gray-800 line-clamp-3 mb-3 text-sm leading-snug"
            title={product.name} 
          >
            {product.name}
            {product.popularity > 20 && (
              <>
                {' '}
                <span className="inline-flex items-center gap-1 ml-1 text-red-500 font-medium">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                  {getPopularityLabel()}
                </span>
              </>
            )}
          </h2>

          <CategoriesList categories={product.product_categories} />

          <div className="mt-auto flex items-end justify-between">
            <p className="text-lg font-bold text-[#093f87]">
              {product.price ? `${product.price} лв.` : "N/A"}
            </p>
            <AddToCartButton />
          </div>
        </div>
      </Link>
    </article>
  );
}