import { useAuth } from '../auth/AuthContext';

function LogoutButton({ children, className }: { children?: React.ReactNode, className?: string }) {
    const { logout, isAuthenticated } = useAuth();
    
    return isAuthenticated && (
        <button onClick={() => {
            logout();
        }}
        className={`bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ${className}`}
        >
            {children || 'Log out'}
        </button>
    );
};

export default LogoutButton;