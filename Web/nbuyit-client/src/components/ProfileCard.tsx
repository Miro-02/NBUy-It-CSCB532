import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from './LogoutButton';
import { useState } from 'react';

function ProfileCard() {
    const { user } = useAuth0();
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingUsername, setIsEditingUsername] = useState(false);
    const [newEmail, setNewEmail] = useState(user?.email || '');
    const [newUsername, setNewUsername] = useState(user?.nickname || '');

    const handleEmailChange = () => setIsEditingEmail(false);
    const handleUsernameChange = () => setIsEditingUsername(false);

    return (
        <div className="bg-white rounded-xl p-8 shadow-lg w-96 space-y-6 border border-gray-100">
            <div className="flex flex-col items-center">
                <img
                    src={user?.picture}
                    alt={user?.nickname}
                    className="w-24 h-24 rounded-full border-4 border-[#093f87]/10 mb-6"
                />
                <h2 className="text-2xl font-bold text-[#093f87] mb-2">
                    Hello, {user?.nickname}
                </h2>
            </div>

            <div className="space-y-4">
                {/* Username Field */}
                <div className="space-y-2">
                    {isEditingUsername ? (
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newUsername}
                                onChange={(e) => setNewUsername(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-[#093f87] focus:ring-2 focus:ring-[#093f87]/20"
                                autoFocus
                            />
                            <button
                                onClick={handleUsernameChange}
                                className="px-4 py-2 bg-[#093f87] text-white rounded-lg hover:bg-[#082f6a] transition-colors"
                            >
                                Save
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                            <span className="font-medium text-gray-700">{user?.nickname}</span>
                            <button
                                onClick={() => setIsEditingUsername(true)}
                                className="text-[#093f87] hover:text-[#082f6a] flex items-center gap-1"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
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

                {/* Email Field */}
                <div className="space-y-2">
                    {isEditingEmail ? (
                        <div className="flex gap-2">
                            <input
                                type="email"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-[#093f87] focus:ring-2 focus:ring-[#093f87]/20"
                                autoFocus
                            />
                            <button
                                onClick={handleEmailChange}
                                className="px-4 py-2 bg-[#093f87] text-white rounded-lg hover:bg-[#082f6a] transition-colors"
                            >
                                Save
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                            <span className="font-medium text-gray-700">{user?.email}</span>
                            <button
                                onClick={() => setIsEditingEmail(true)}
                                className="text-[#093f87] hover:text-[#082f6a] flex items-center gap-1"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
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

            <div className="pt-4 border-t border-gray-100">
                <LogoutButton className="w-full bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2" />
            </div>
        </div>
    );
}

export default ProfileCard;