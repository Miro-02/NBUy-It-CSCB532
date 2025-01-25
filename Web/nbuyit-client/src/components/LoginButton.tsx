import { useAuth0 } from '@auth0/auth0-react';

function LoginButton() {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    if(!isAuthenticated) {
        return (
            <div>
                <button onClick={() => loginWithRedirect()}>
                    Log In / Sign Up
                </button>
            </div>
        );
    }
};

export default LoginButton;