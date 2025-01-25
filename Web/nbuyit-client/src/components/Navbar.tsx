import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import { Link } from "react-router";

function Navbar() {
    const { isAuthenticated, user } = useAuth0();
    
    return (
        <nav className="bg-[#093f87] text-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="text-xl font-semibold text-white hover:text-gray-300">
                    NbuyIt!
                </Link>
                <div className="flex items-center space-x-4">
                    <ul>
                        {isAuthenticated && (
                            <div className="flex items-center space-x-3">
                                <Link to="/profile" className="text-sm">{user?.nickname}</Link>
                            </div>
                        )}
                    </ul>
                    { !isAuthenticated && <LoginButton />}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;