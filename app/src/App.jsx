import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider } from './context/ToastContext';

// Components
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Checkout from './pages/Checkout';
import NotFound from './pages/NotFound';


// Info Pages
import About from './pages/About';
import Contact from './pages/Contact';
import Delivery from './pages/Delivery';
import Returns from './pages/Returns';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

// Account Pages
import AccountLayout from './pages/account/AccountLayout';
import Dashboard from './pages/account/Dashboard';
import Orders from './pages/account/Orders';
import Addresses from './pages/account/Addresses';
import Wishlist from './pages/account/Wishlist';
import Profile from './pages/account/Profile';

// Admin
import AdminDashboard from './pages/admin/AdminDashboard';

// Protected Route
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const user = JSON.parse(localStorage.getItem('purelife_user') || 'null');
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (requireAdmin && !user.isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <AuthProvider>
      <ToastProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <div className="min-h-screen flex flex-col bg-white">
              {/* Navigation */}
              <Routes>
                <Route path="/admin/*" element={null} />
                <Route path="*" element={<><Navbar /><CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} /></>} />
              </Routes>
              
              {/* Main Content */}
              <main className="flex-1">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<ProductListing />} />
                  <Route path="/category/:categorySlug" element={<ProductListing />} />
                  <Route path="/product/:productId" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  
                  {/* Info Pages */}
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/delivery" element={<Delivery />} />
                  <Route path="/returns" element={<Returns />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  
                  {/* Protected Routes */}
                  <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                  
                  {/* Account Routes */}
                  <Route path="/account" element={<ProtectedRoute><AccountLayout><Dashboard /></AccountLayout></ProtectedRoute>} />
                  <Route path="/account/orders" element={<ProtectedRoute><AccountLayout><Orders /></AccountLayout></ProtectedRoute>} />
                  <Route path="/account/addresses" element={<ProtectedRoute><AccountLayout><Addresses /></AccountLayout></ProtectedRoute>} />
                  <Route path="/account/wishlist" element={<ProtectedRoute><AccountLayout><Wishlist /></AccountLayout></ProtectedRoute>} />
                  <Route path="/account/profile" element={<ProtectedRoute><AccountLayout><Profile /></AccountLayout></ProtectedRoute>} />
                  
                  {/* Admin Routes */}
                  <Route path="/admin/*" element={<ProtectedRoute requireAdmin={true}><AdminDashboard /></ProtectedRoute>} />
                  
                  {/* 404 */}
                  {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>

              {/* Footer */}
              <Routes>
                <Route path="/admin/*" element={null} />
                <Route path="*" element={<Footer />} />
              </Routes>
            </div>
          </Router>
        </WishlistProvider>
      </CartProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
