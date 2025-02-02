import { Link } from "react-router";
import CategoriesList from "./CategoriesList";
import AddToCartButton from "./AddToCartButton";
import NoImageProduct from "../assets/product-no-image.webp";

export default function ProductCard({ product }: { product: any }) {
  return (
    <article className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden flex flex-col h-full">
      <Link to={`/products/${product.id}`} className="flex flex-col h-full">
        <div className="aspect-square overflow-hidden">
          <img
            src={product.image || NoImageProduct}
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