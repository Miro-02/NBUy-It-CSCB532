import LogoutButton from './LogoutButton';
import { useState } from 'react';
import { Link } from 'react-router';
import { useAuth } from '../auth/AuthContext';
import UserImage from '../assets/user-picture.jpg';
import axios from 'axios';
import { ad } from 'react-router/dist/production/route-data-DuV3tXo2';

function ProfileCard() {
    const { user, isSeller, updateUser } = useAuth();
    const [isEditingUsername, setIsEditingUsername] = useState(false);
    const [newName, setNewName] = useState(user?.name || '');

    const [isEditingPhone, setIsEditingPhone] = useState(false);
    const [newPhone, setNewPhone] = useState(user?.phone);
    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [newAddress, setNewAddress] = useState(user?.address);

    const [phoneError, setPhoneError] = useState<string | null>(null);
    const [addressError, setAddressError] = useState<string | null>(null);

    const handlePhoneChange = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.put(
                `${import.meta.env.VITE_SERVER_URL}/api/user/contact-details`, 
                { 
                    phone: newPhone,
                    address: user?.address
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            updateUser({ phone: newPhone });
            setIsEditingPhone(false);
        } catch (error) {
            console.error('Error updating phone:', error);
            setNewPhone(user?.phone || '');
            setPhoneError('Failed to update phone number');
        }
    };

    const handleAddressChange = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.put(
                `${import.meta.env.VITE_SERVER_URL}/api/user/contact-details`, 
                { 
                    address: newAddress,
                    phone:  user?.phone
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            updateUser({ address: newAddress });
            setIsEditingAddress(false);
        } catch (error) {
            console.error('Error updating address:', error);
            setNewAddress(user?.address || '');
            setAddressError('Failed to update address');
        }
    };
    
    const userRole = isSeller ? 'SELLER' : 'BUYER';
    
    return (
        <div className="bg-white rounded-xl p-8 shadow-lg w-96 space-y-6 border border-gray-100 relative">
            <div className="flex flex-col items-center space-y-4">
                <img
                    src={UserImage}
                    alt={user?.name}
                    className="w-32 h-32 rounded-full border-4 border-[#093f87] mb-4"
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                />

                <div className="text-center space-y-1">
                    <h1 className="text-3xl font-bold text-gray-800">
                        {user?.name}
                    </h1>
                    <p className="text-lg text-gray-600">
                        {user?.email}
                    </p>
                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        userRole === 'SELLER' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-blue-100 text-blue-800'
                    }`}>
                        {userRole}
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-blue-50 rounded-lg p-4 space-y-3">
                    <h3 className="text-sm font-semibold text-blue-800 mb-2">Contact Information</h3>
                    
                    <div className="space-y-2">
                        {isEditingPhone ? (
                            <div className="flex gap-2">
                                <input
                                    type="tel"
                                    value={newPhone ?? ''}
                                    onChange={(e) => setNewPhone(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                    autoFocus
                                />
                                {phoneError && <div className="text-red-500 text-sm mt-1">{phoneError}</div>}
                                <button
                                    onClick={handlePhoneChange}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Save
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center justify-between">
                                <span className="font-medium text-gray-700">
                                    Phone: {user?.phone || 'N/A'}
                                </span>
                                <button
                                    onClick={() => setIsEditingPhone(true)}
                                    className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                        />
                                    </svg>
                                    <span className="text-sm">Edit</span>
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        {isEditingAddress ? (
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newAddress ?? ''}
                                    onChange={(e) => setNewAddress(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                    autoFocus
                                />
                                {addressError && <div className="text-red-500 text-sm mt-1">{addressError}</div>}
                                <button
                                    onClick={() =>handleAddressChange}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Save
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center justify-between">
                                <span className="font-medium text-gray-700">
                                    Address: {user?.address || 'N/A'}
                                </span>

                                <button
                                    onClick={() => setIsEditingAddress(true)}
                                    className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                        />
                                    </svg>
                                    <span className="text-sm">Edit</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {userRole === 'BUYER' && (
                <div className="bg-emerald-50 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-emerald-800 mb-3">
                        Seller Account
                    </h3>

                    <Link
                        to="/become-seller"
                        className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors group"
                    >
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 transition-transform group-hover:scale-110"
                        >
                        <path d="M5.223 2.25c-.497 0-.974.198-1.325.55l-1.3 1.298A3.75 3.75 0 007.5 9.75c.627.47 1.406.75 2.25.75.844 0 1.624-.28 2.25-.75.626.47 1.406.75 2.25.75.844 0 1.623-.28 2.25-.75a3.75 3.75 0 004.902-5.652l-1.3-1.299a1.875 1.875 0 00-1.325-.549H5.223z" />
                        <path
                            fillRule="evenodd"
                            d="M3 20.25v-8.755c1.42.674 3.08.673 4.5 0A5.234 5.234 0 009.75 12c.804 0 1.568-.182 2.25-.506a5.234 5.234 0 002.25.506c.804 0 1.567-.182 2.25-.506 1.42.674 3.08.675 4.5.001v8.755h.75a.75.75 0 010 1.5H2.25a.75.75 0 010-1.5H3zm3-6a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v3a.75.75 0 01-.75.75h-3a.75.75 0 01-.75-.75v-3zm8.25-.75a.75.75 0 00-.75.75v5.25a.75.75 0 001.5 0V14.25a.75.75 0 00-.75-.75z"
                            clipRule="evenodd"
                        />
                        </svg>
                        <span className="font-medium">Be a Seller</span>
                    </Link>
                    </div>
                )}
                <div className="space-y-2 text-center">
                    <div className="text-sm text-gray-500">
                        <span className="font-medium">Joined:</span> {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                    </div>
                    <div className="text-sm text-gray-500">
                        Last updated: {user?.updated_at ? new Date(user.updated_at).toLocaleDateString() : 'N/A'}
                    </div>
                </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
                <LogoutButton className="w-full bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2" />
            </div>
        </div>
    );
}

export default ProfileCard;