import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router';

function LoginButton() {
    const isAuthenticated = false;

    if(!isAuthenticated) {
        return (
            <div>
                <Link to="login">
                    Login
                </Link>
            </div>
        );
    }
};

export default LoginButton;