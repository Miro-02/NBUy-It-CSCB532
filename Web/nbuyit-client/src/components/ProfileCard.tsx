import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from './LogoutButton';
import { useState } from 'react';

function ProfileCard() {
    const { user } = useAuth0();
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingUsername, setIsEditingUsername] = useState(false);
    const [newEmail, setNewEmail] = useState(user?.email || '');
    const [newUsername, setNewUsername] = useState(user?.nickname || '');

    const handleEmailChange = () => {
        setIsEditingEmail(false);
    };

    const handleUsernameChange = () => {
        setIsEditingUsername(false);
    };


    return (
        <div className="bg-white rounded-lg p-6 shadow-lg w-80 space-y-6">
            <img
                src={user?.picture}
                alt={user?.nickname}
                className="w-20 h-20 rounded-full mx-auto mb-4"
            />
            <h2 className="text-center text-xl font-semibold text-gray-800">
                Hello, {user?.nickname}
            </h2>

            {isEditingUsername ? (
                <div className="text-center">
                    <input
                        type="text"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        className="border p-2 rounded text-gray-700"
                    />
                    <button
                        onClick={handleUsernameChange}
                        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Save
                    </button>
                </div>
            ) : (
                <p className="text-center text-gray-600 text-sm">
                    {user?.nickname}
                    <button
                        onClick={() => setIsEditingUsername(true)}
                        className="ml-2 text-blue-500"
                    >
                        Edit Username
                    </button>
                </p>
            )}


            {isEditingEmail ? (
                <div className="text-center">
                    <input
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        className="border p-2 rounded text-gray-700"
                    />
                    <button
                        onClick={handleEmailChange}
                        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Save
                    </button>
                </div>
            ) : (
                <p className="text-center text-gray-600 text-sm">
                    {user?.email}
                    <button
                        onClick={() => setIsEditingEmail(true)}
                        className="ml-2 text-blue-500"
                    >
                        Edit Email
                    </button>
                </p>
            )}

            <div className="text-center">
                <LogoutButton className="inline-flex items-center gap-2 rounded bg-red-400 px-8 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-pink-500/40 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"/>
            </div>
        </div>
    );
}

export default ProfileCard;