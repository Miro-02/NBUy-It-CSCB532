import NoImageProduct from "../assets/product-no-image.webp";

interface CartItemProps {
    id: number;
    name: string;
    product_images: Array<{ url: string }>;
    price: string;
    quantity: number;
    onIncrement: any;
    onDecrement: any;
    onRemove: any;
}

export function CartItem({ id, name, product_images, price, quantity, onIncrement, onDecrement, onRemove }: CartItemProps) {
    console.log(product_images);

    return (
        <div className="bg-white rounded-xl shadow-sm p-4 flex gap-4 hover:shadow-md transition-shadow">
            <div className="w-24 h-24 flex-shrink-0">
                <img
                    src={product_images?.[0]?.url || NoImageProduct}
                    alt={name}
                    className="w-full h-full object-cover rounded-lg"
                />
            </div>
            
            <div className="flex-grow">
                <h3 className="text-gray-800 font-medium line-clamp-2 mb-2">{name}</h3>
                
                <div className="flex items-center justify-between">

                    <p className="text-lg font-bold text-[#093f87]">{price}</p>
                    
                    <div className="flex items-center gap-4">
                        <div className="flex items-center bg-gray-100 rounded-lg p-1">
                            <button 
                                onClick={() => onDecrement(id)}
                                className="px-3 py-1 hover:bg-gray-200 rounded-lg disabled:opacity-50"
                                disabled={quantity === 1}
                            >
                                -
                            </button>
                            <span className="px-3">{quantity}</span>
                            <button 
                                onClick={() => onIncrement(id)}
                                className="px-3 py-1 hover:bg-gray-200 rounded-lg"
                            >
                                +
                            </button>
                        </div>
                        <button 
                            onClick={() => onRemove(id)}
                            className="text-red-500 hover:text-red-600"
                        >
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}