import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";

function ProductDetails() {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<any>(null);
    const [selectedImage, setSelectedImage] = useState(0);

    const categories = [
        { id: 1, name: 'Electronics' },
        { id: 2, name: 'Home Appliances' },
        { id: 3, name: 'Computer Accessories' },
        { id: 4, name: 'Sports & Fitness' },
        { id: 5, name: 'Home & Kitchen' },
        { id: 6, name: 'Beauty & Care' },
    ];

    const products = [
        {
            id: 1,
            name: 'Apple iPhone 13, 128GB, 4GB RAM, 5G, Midnight',
            image: 'https://s13emagst.akamaized.net/products/40685/40684414/images/res_974dc0e4b6a1180b612c24afef8eb494.jpg',
            price: '979,99 лв.',
            category: 1,
        },
        {
            id: 2,
            name: 'Блендер Philips HR3041/00 Series 5000, 1200 W, Остриета New ProBlend Plus, Оребрена стъклена купа, 3 скорости плюс импулс, Подвижни остриета, Капацитет 2 л, Автоматизирано почистване с едно докосване, Черен',
            image: 'https://s13emagst.akamaized.net/products/67591/67590545/images/res_8aaaf887d6ad8f061a462f621e202929.jpg',
            price: '173,99 лв.',
            category: 5,
        },
        {
            id: 3,
            name: 'Механична клавиатура ZENKABEAT, Bluetooth, 2.4 Ghz, RGB, 68 клавиша, Функция за бърза смяна, Адаптивен RGB софтуер, Съвместима с Play Station, Type-C към USB 3.0, Батерия 3150 mAh, С кабел/Безжична, Червени превключватели, Бял',
            image: 'https://s13emagst.akamaized.net/products/34626/34625907/images/res_ad3c682c77f9f89f7943e27d297d7dd6.jpg',
            price: '121,09 лв.',
            category: 1,
        },
        {
            id: 4,
            name: 'Гира Orion, Винил, 5 кг',
            image: 'https://s13emagst.akamaized.net/products/78233/78232949/images/res_f9a7433c3c80776da6b75c21b7ea2d40.jpg',
            price: '27,99 лв.',
            category: 4,
        },
        {
            id: 5,
            name: 'Двойно спално бельо, 4 части, Superior Satin Cotton, Yellow-Grey, мигли и звезди, Promerco®️',
            image: 'https://s13emagst.akamaized.net/products/68126/68125402/images/res_060ea067eb96437f70e3cdf54eabb275.jpg?width=720&height=720&hash=22771AC83D0F654DC8610C22DA3681B2',
            price: '35,36 лв.',
            category: 5,
        },
        {
            id: 6,
            name: 'Крем от шамфъстък Pisti, За мазане, 200 г',
            image: 'https://s13emagst.akamaized.net/products/56959/56958177/images/res_bbc8ad214d844859dfe6dc6e87f621c3.jpg?width=720&height=720&hash=AC8C3EA681724E74B33DE8DB0A908944',
            price: '18,62 лв.',
            category: 5,
        },
    ];

    useEffect(() => {
        const foundProduct = products.find(p => p.id === Number(id));
        setProduct(foundProduct);
    }, [id]);

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
                            <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full"
                                />
                            </div>
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
                                <button className="flex items-center space-x-2 rounded-lg bg-[#093f87] px-6 py-3 text-white hover:bg-[#082f6a] transition-colors duration-200">
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
                                            Category
                                        </dt>
                                        <dd className="mt-1 text-sm text-[#093f87]">
                                            {categories.find(c => c.id === product.category)?.name}
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