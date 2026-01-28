import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Package, ShoppingCart, Users, Settings,
  LogOut, Menu, X, TrendingUp, DollarSign, PackageCheck, Clock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

// Admin Sub-pages
import AdminProducts from './AdminProducts';
import AdminOrders from './AdminOrders';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAdmin, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
    }
  }, [isAdmin, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const menuItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/products', icon: Package, label: 'Products' },
    { path: '/admin/orders', icon: ShoppingCart, label: 'Orders' },
  ];

  const isActive = (path) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  // Stats for dashboard
  const stats = [
    { label: 'Total Orders', value: '1,234', change: '+12%', icon: ShoppingCart, color: 'bg-blue-500' },
    { label: 'Revenue', value: 'AED 45,678', change: '+8%', icon: DollarSign, color: 'bg-green-500' },
    { label: 'Products', value: '156', change: '+3', icon: Package, color: 'bg-purple-500' },
    { label: 'Pending Orders', value: '23', change: '-5', icon: Clock, color: 'bg-orange-500' },
  ];

  const recentOrders = [
    { id: 'PL123456', customer: 'Ahmed Hassan', total: 245.50, status: 'delivered', date: '2024-01-28' },
    { id: 'PL123457', customer: 'Sarah Ahmed', total: 189.00, status: 'processing', date: '2024-01-28' },
    { id: 'PL123458', customer: 'Mohammed Ali', total: 456.75, status: 'pending', date: '2024-01-27' },
    { id: 'PL123459', customer: 'Fatima Khan', total: 123.00, status: 'shipped', date: '2024-01-27' },
    { id: 'PL123460', customer: 'Omar Farooq', total: 789.25, status: 'delivered', date: '2024-01-26' },
  ];

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-700',
      processing: 'bg-blue-100 text-blue-700',
      shipped: 'bg-purple-100 text-purple-700',
      delivered: 'bg-green-100 text-green-700',
      cancelled: 'bg-red-100 text-red-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-navy text-white transform transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-10">
            <div className="w-10 h-10 bg-lime rounded-full flex items-center justify-center">
              <span className="text-navy font-heading font-bold text-lg">P</span>
            </div>
            <div>
              <span className="font-heading font-bold text-xl">Pure Life</span>
              <span className="block text-white/50 text-xs">Admin Panel</span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive(item.path)
                    ? 'bg-lime text-navy'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white transition-colors"
          >
            <span>View Store</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-red-400 transition-colors w-full"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="font-medium text-navy">{user?.displayName}</p>
              <p className="text-sm text-navy/50">Administrator</p>
            </div>
            <div className="w-10 h-10 bg-lime rounded-full flex items-center justify-center">
              <span className="text-navy font-heading font-bold">
                {user?.displayName?.charAt(0) || 'A'}
              </span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Routes>
            <Route
              path="/"
              element={
                <div className="space-y-6">
                  {/* Welcome */}
                  <div>
                    <h1 className="font-heading font-bold text-navy text-3xl">
                      Welcome back, {user?.displayName?.split(' ')[0]}!
                    </h1>
                    <p className="text-navy/60">Here's what's happening with your store today.</p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat) => (
                      <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-navy/60 text-sm">{stat.label}</p>
                            <p className="font-heading font-bold text-navy text-2xl mt-1">
                              {stat.value}
                            </p>
                          </div>
                          <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                            <stat.icon size={24} className="text-white" />
                          </div>
                        </div>
                        <div className="flex items-center gap-1 mt-4">
                          <TrendingUp size={16} className={stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'} />
                          <span className={`text-sm ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                            {stat.change}
                          </span>
                          <span className="text-navy/40 text-sm">vs last month</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Recent Orders */}
                  <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="p-6 border-b flex items-center justify-between">
                      <h2 className="font-heading font-semibold text-navy text-xl">Recent Orders</h2>
                      <Link
                        to="/admin/orders"
                        className="text-lime-dark hover:underline text-sm"
                      >
                        View All
                      </Link>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-4 text-left text-sm font-medium text-navy/60">Order ID</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-navy/60">Customer</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-navy/60">Date</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-navy/60">Status</th>
                            <th className="px-6 py-4 text-right text-sm font-medium text-navy/60">Total</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {recentOrders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 font-medium text-navy">{order.id}</td>
                              <td className="px-6 py-4 text-navy/70">{order.customer}</td>
                              <td className="px-6 py-4 text-navy/70">{order.date}</td>
                              <td className="px-6 py-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(order.status)}`}>
                                  {order.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-right font-medium text-navy">
                                AED {order.total.toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              }
            />
            <Route path="/products" element={<AdminProducts />} />
            <Route path="/orders" element={<AdminOrders />} />
          </Routes>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
