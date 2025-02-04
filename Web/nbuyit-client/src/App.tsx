import './index.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Cart from './pages/Cart';
import { AddProduct } from './pages/AddProduct';
import NotFound from './pages/NotFound';
import ProductDetails from './pages/ProductDetails';
import { useEffect } from 'react';
import ScrollToTop from './components/ScrollToTop';
import BecomeSeller from './pages/BecomeSeller';
import SignUp from './pages/SignUp';
import { AuthProvider, useAuth } from './auth/AuthContext';
import Orders from './pages/Orders';
import Order from './pages/Order';

function App() {
  const { isAuthenticated, isSeller } = useAuth();

  useEffect(() => {
    if (window.history?.scrollRestoration) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div>
        <Navbar />
        <Routes>
          <Route 
            path='/' 
            element={<Home />} 
          />

          <Route 
            path='/products/:id' 
            element={<ProductDetails />} 
          />
          
          <Route
            path="/sign-up"
            element={isAuthenticated? <Navigate to='/' /> : <SignUp />}
          />
          
          <Route 
            path='/login' 
            element={isAuthenticated ? <Navigate to='/' /> :  <Login />}
          />
          
          <Route 
            path='/profile' 
            element={isAuthenticated ? <Profile /> : <Navigate to='/login' />} 
          />
          <Route 
            path='/cart'
            element={isAuthenticated ? <Cart /> : <Navigate to='/login' />}
          />
          <Route
            path='/products/add'
            element={isAuthenticated ? <AddProduct /> : <Navigate to='/login' />}
          />
          <Route
            path='/become-seller'
            element={isAuthenticated && !isSeller ? <BecomeSeller /> : <Navigate to='/login' />}
          />
          <Route
            path='/my-orders'
            element={isAuthenticated ? <Orders /> : <Navigate to='/login' />}
          />
          <Route
            path='/my-orders/:id'
            element={isAuthenticated ? <Order /> : <Navigate to='/login' />}
          />
          <Route 
            path='*' 
            element={<NotFound />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;