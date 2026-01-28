import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  MapPin, 
  Heart, 
  User, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AccountLayout = ({ children }) => {
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const menuItems = [
    { path: '/account', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/account/orders', icon: Package, label: 'My Orders' },
    { path: '/account/addresses', icon: MapPin, label: 'My Addresses' },
    { path: '/account/wishlist', icon: Heart, label: 'My Wishlist' },
    { path: '/account/profile', icon: User, label: 'Profile Settings' },
  ];

  const isActive = (path) => {
    if (path === '/account') {
      return location.pathname === '/account';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-main">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white border rounded-lg overflow-hidden">
              {/* User Info */}
              <div className="p-4 border-b bg-pharmacy-navy">
                <p className="font-medium text-white">{user?.displayName}</p>
                <p className="text-sm text-white/70">{user?.email}</p>
              </div>

              {/* Navigation */}
              <nav className="p-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center justify-between px-4 py-3 rounded-md text-sm ${
                      isActive(item.path)
                        ? 'bg-pharmacy-green/10 text-pharmacy-navy font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon size={18} />
                      <span>{item.label}</span>
                    </div>
                    {isActive(item.path) && <ChevronRight size={16} />}
                  </Link>
                ))}
              </nav>

              {/* Logout */}
              <div className="p-2 border-t">
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;
