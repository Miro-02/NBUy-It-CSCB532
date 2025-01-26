import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

function Login() {
    const { loginWithRedirect } = useAuth0();

    useEffect(() => {
        loginWithRedirect();
    }, [loginWithRedirect]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#093f87] to-blue-300 space-y-8">
            <div className="relative w-32 h-32">
                <div className="absolute inset-0 border-4 border-white border-opacity-30 rounded-full animate-ping"></div>
                <div className="absolute inset-0 border-4 border-white border-opacity-20 rounded-full"></div>
                <div className="flex items-center justify-center w-full h-full">
                    <svg 
                        className="w-20 h-20 text-white animate-bounce" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                    </svg>
                </div>
            </div>

            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-white animate-pulse">
                    Welcome to NbuyIt!
                </h1>
                <p className="text-white/80 text-lg animate-fade-in">
                    Redirecting to secure login...
                </p>
            </div>

            <div className="flex space-x-2">
                <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
        </div>
    );
}

export default Login;