import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Auth0Provider } from '@auth0/auth0-react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN || 'default-domain'}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID || 'default-client-id'}
      authorizationParams={{ 
        redirect_uri: window.location.origin,
        scope: 'openid profile email',
      }}
      cacheLocation='localstorage'
    >
      <App />
    </Auth0Provider>
  </StrictMode>,
)
