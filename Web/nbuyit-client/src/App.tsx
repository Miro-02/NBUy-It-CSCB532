import './index.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router';

import { useAuth0 } from '@auth0/auth0-react'
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Cart from './pages/Cart';
import { AddProduct } from './pages/AddProduct';

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route 
            path='/profile' 
            element={isAuthenticated ? <Profile /> : <Navigate to='/login' />} 
          />
          <Route 
            path='/login' 
            element={isAuthenticated ? <Navigate to='/profile' /> : <Login />} 
          />
          <Route 
          path='/cart'
          element={isAuthenticated ? <Cart /> : <Navigate to='/login' />}
          />
          <Route
          path='/add-product'
          element={isAuthenticated ? <AddProduct /> : <Navigate to='/login' />}
          />
          <Route path='*' element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;