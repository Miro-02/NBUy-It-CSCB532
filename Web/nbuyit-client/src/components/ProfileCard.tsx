import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from './LogoutButton';
import { useEffect, useState } from 'react';

function ProfileCard() {
    const { user } = useAuth0();
    const [isEditingUsername, setIsEditingUsername] = useState(false);
    const [newUsername, setNewUsername] = useState(user?.nickname || '');

    const handleUsernameChange = () => setIsEditingUsername(false);
    
    return (
        <div className="bg-white rounded-xl p-8 shadow-lg w-96 space-y-6 border border-gray-100 relative">
            <div className="flex flex-col items-center space-y-4">
                <img
                    src={user?.picture}
                    alt={user?.nickname}
                    className="w-32 h-32 rounded-full border-4 border-[#093f87] mb-4"
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                />

                <div className="text-center space-y-1">
                    <h1 className="text-3xl font-bold text-gray-800">
                        {user?.given_name} {user?.family_name}
                    </h1>
                    <p className="text-lg text-gray-600">
                        {user?.email}
                    </p>
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-blue-800 mb-2">Update Username</h3>
                    
                    {isEditingUsername ? (
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newUsername}
                                onChange={(e) => setNewUsername(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                autoFocus
                            />
                            <button
                                onClick={handleUsernameChange}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Save
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-700">
                                Current: {user?.nickname}
                            </span>
                            <button
                                onClick={() => setIsEditingUsername(true)}
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

                <div className="space-y-2 text-center">
                    <div className="text-sm text-gray-500">
                        <span className="font-medium">Joined:</span> {new Date(user?.created_at).toLocaleDateString()}
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