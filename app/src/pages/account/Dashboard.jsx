import React from 'react';
import { Link } from 'react-router-dom';
import { Package, MapPin, Heart, User, ChevronRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';

const Dashboard = () => {
  const { user } = useAuth();
  const { count: wishlistCount } = useWishlist();

  const quickActions = [
    {
      title: 'My Orders',
      description: 'View and track your orders',
      icon: Package,
      link: '/account/orders',
      count: user?.orders?.length || 0
    },
    {
      title: 'My Addresses',
      description: 'Manage delivery addresses',
      icon: MapPin,
      link: '/account/addresses',
      count: user?.addresses?.length || 0
    },
    {
      title: 'My Wishlist',
      description: 'Products you saved',
      icon: Heart,
      link: '/account/wishlist',
      count: wishlistCount
    },
    {
      title: 'Profile Settings',
      description: 'Update your information',
      icon: User,
      link: '/account/profile',
      count: null
    }
  ];

  const recentOrders = user?.orders?.slice(0, 3) || [];

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

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 2
    }).format(price);
  };

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-white border rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-pharmacy-navy mb-2">
          Welcome back, {user?.displayName?.split(' ')[0]}!
        </h1>
        <p className="text-gray-600">
          Manage your orders, addresses, and account settings from your dashboard.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quickActions.map((action) => (
          <Link
            key={action.title}
            to={action.link}
            className="bg-white border rounded-lg p-4 flex items-center gap-4 hover:border-pharmacy-green"
          >
            <div className="w-12 h-12 bg-pharmacy-green/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <action.icon className="text-pharmacy-green" size={24} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-pharmacy-navy">{action.title}</h3>
                {action.count > 0 && (
                  <span className="bg-pharmacy-green text-pharmacy-navy text-xs font-medium px-2 py-0.5 rounded-full">
                    {action.count}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500">{action.description}</p>
            </div>
            <ChevronRight className="text-gray-400" size={20} />
          </Link>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white border rounded-lg">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="font-semibold text-pharmacy-navy">Recent Orders</h2>
          <Link to="/account/orders" className="text-sm text-pharmacy-green hover:underline">
            View All
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="p-8 text-center">
            <Package className="mx-auto text-gray-300 mb-3" size={48} />
            <p className="text-gray-500">No orders yet</p>
            <Link to="/products" className="text-pharmacy-green hover:underline text-sm mt-2 inline-block">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="divide-y">
            {recentOrders.map((order) => (
              <div key={order.id} className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-pharmacy-navy">{order.id}</p>
                  <p className="text-sm text-gray-500">{order.date} • {order.items} items</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-pharmacy-navy">{formatPrice(order.total)}</p>
                  <span className={`text-xs px-2 py-1 rounded capitalize ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Default Address */}
      {user?.addresses?.find(a => a.isDefault) && (
        <div className="bg-white border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-pharmacy-navy">Default Address</h2>
            <Link to="/account/addresses" className="text-sm text-pharmacy-green hover:underline">
              Manage
            </Link>
          </div>
          {(() => {
            const defaultAddr = user.addresses.find(a => a.isDefault);
            return (
              <div className="text-sm text-gray-600">
                <p className="font-medium text-gray-800">{defaultAddr.label}</p>
                <p>{defaultAddr.street}</p>
                <p>{defaultAddr.city}, {defaultAddr.emirate}</p>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
