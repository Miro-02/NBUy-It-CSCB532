import { useState, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from "react-router";
import { useAuth } from '../auth/AuthContext';
import { useClickAway } from 'react-use';

function Navbar() {
    const { isAuthenticated, user, logout, isLoading, isSeller } = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    useClickAway(dropdownRef, () => {
        setShowDropdown(false);
    });


    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <nav className="bg-[#093f87] text-white shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-white hover:text-gray-300 transition-colors">
                    NbuyIt!
                </Link>
                
                <div className="flex items-center space-x-6">
                    {isAuthenticated && (
                        <Link to="/cart" className="text-white hover:text-gray-300 transition-colors">
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
                        </Link>
                    )}
                    
                    <div className="relative" ref={dropdownRef}>
                        <button 
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="text-sm font-medium hover:text-gray-300 transition-colors focus:outline-none"
                        >
                            My Account
                        </button>
                        
                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 divide-y divide-gray-100">
                                {isAuthenticated ? (
                                    <div className="px-4 py-3 text-sm text-gray-700">
                                        <p className="font-medium mb-2">Welcome, {user?.name}</p>
                                        <div className="space-y-2">
                                            <Link
                                                to="/profile"
                                                onClick={() => setShowDropdown(false)}
                                                className="block w-full px-2 py-1 text-gray-700 hover:bg-gray-100 rounded transition-colors"
                                            >
                                                My Profile
                                            </Link>
                                            {isSeller && (
                                               <Link
                                               to="/my-inventory"
                                               onClick={() => setShowDropdown(false)}
                                               className="block w-full px-2 py-1 text-gray-700 hover:bg-gray-100 rounded transition-colors"
                                                >
                                                    My Inventory
                                                </Link> 
                                            )}
                                            <Link
                                                to="/my-orders"
                                                onClick={() => setShowDropdown(false)}
                                                className="block w-full px-2 py-1 text-gray-700 hover:bg-gray-100 rounded transition-colors"
                                            >
                                                Orders
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    logout();
                                                    setShowDropdown(false);
                                                }}
                                                className="block w-full px-2 py-1 text-left text-red-600 hover:bg-red-50 rounded transition-colors"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="py-1">
                                        <Link 
                                            to="/sign-up" 
                                            onClick={() => setShowDropdown(false)}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Sign Up
                                        </Link>
                                        <Link 
                                            to="/login" 
                                            onClick={() => setShowDropdown(false)}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Login
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;