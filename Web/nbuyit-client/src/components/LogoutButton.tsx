import { useAuth0 } from '@auth0/auth0-react';

function LogoutButton({ children, className }: { children?: React.ReactNode, className?: string }) {
    const { logout, isAuthenticated } = useAuth0();
    
    return isAuthenticated && (
        <button onClick={() => {
            logout({ 
                logoutParams: {
                returnTo: window.location.origin
                }
            });
        }}
        className={`bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ${className}`}
        >
            {children || 'Log out'}
        </button>
    );
};

export default LogoutButton;