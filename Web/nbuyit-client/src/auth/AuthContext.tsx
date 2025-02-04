import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    phone: string | null;
    is_banned: number;
    cart_id: number | null;
    age: number | null;
    address: string | null;
    roles: Array<{ name: string }>;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean; 
    isSeller: boolean;
    logout: () => void;
    login: (token: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    isSeller: false,
    logout: () => {},
    login: async () => {},
});

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const loadUser = async (token?: string) => {
        setIsLoading(true);
        const authToken = token || localStorage.getItem('authToken');
        if (!authToken) {
            setIsAuthenticated(false);
            setUser(null);
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.get<User>(`${import.meta.env.VITE_SERVER_URL}/api/user`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Access-Control-Allow-Credentials': true,
                },
            });

            const userData: User = {
                ...response.data,
                roles: response.data.roles.map(role => ({ name: role.name }))
            };

            setUser(userData);
            setIsAuthenticated(true);
            if (!token) localStorage.setItem('authToken', authToken);
        } catch (error) {
            console.error('Failed to load user', error);
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    const login = async (token: string) => {
        localStorage.setItem('authToken', token);
        await loadUser(token);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setUser(null);
        setIsAuthenticated(false);
    };

    const isSeller = user?.roles.some(role => role.name === 'seller') ?? false;

    return (
       <AuthContext.Provider value={{ 
        user, 
        isAuthenticated, 
        isLoading,
        isSeller,
        logout,
        login
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    return useContext(AuthContext);
};