import React, { useState } from 'react';
import { Search, Filter, Eye, Package, Truck, CheckCircle, XCircle, ChevronDown } from 'lucide-react';

const AdminOrders = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Demo orders data
  const [orders, setOrders] = useState([
    {
      id: 'PL123456',
      customer: 'Ahmed Hassan',
      email: 'ahmed@example.com',
      phone: '+971 50 123 4567',
      address: '123 Sheikh Zayed Road, Dubai',
      items: [
        { name: 'Panadol Extra', quantity: 2, price: 18.50 },
        { name: 'Vitamin D3 1000 IU', quantity: 1, price: 45.00 }
      ],
      subtotal: 82.00,
      deliveryFee: 0,
      total: 82.00,
      status: 'delivered',
      paymentMethod: 'cod',
      date: '2024-01-28',
      notes: 'Please leave at reception'
    },
    {
      id: 'PL123457',
      customer: 'Sarah Ahmed',
      email: 'sarah@example.com',
      phone: '+971 55 987 6543',
      address: '45 Al Wasl Road, Dubai',
      items: [
        { name: 'Blood Pressure Monitor', quantity: 1, price: 299.00 }
      ],
      subtotal: 299.00,
      deliveryFee: 15.00,
      total: 314.00,
      status: 'processing',
      paymentMethod: 'card',
      date: '2024-01-28',
      notes: ''
    },
    {
      id: 'PL123458',
      customer: 'Mohammed Ali',
      email: 'mohammed@example.com',
      phone: '+971 56 456 7890',
      address: '78 Corniche Road, Abu Dhabi',
      items: [
        { name: 'Omega-3 Fish Oil', quantity: 2, price: 55.00 },
        { name: 'Multivitamin Adults', quantity: 1, price: 65.00 },
        { name: 'Hand Sanitizer', quantity: 3, price: 25.00 }
      ],
      subtotal: 270.00,
      deliveryFee: 0,
      total: 270.00,
      status: 'pending',
      paymentMethod: 'cod',
      date: '2024-01-27',
      notes: 'Call before delivery'
    },
    {
      id: 'PL123459',
      customer: 'Fatima Khan',
      email: 'fatima@example.com',
      phone: '+971 50 789 1234',
      address: '12 Jumeirah Beach Road, Dubai',
      items: [
        { name: 'La Roche-Posay Sunscreen', quantity: 1, price: 89.00 }
      ],
      subtotal: 89.00,
      deliveryFee: 15.00,
      total: 104.00,
      status: 'shipped',
      paymentMethod: 'card',
      date: '2024-01-27',
      notes: ''
    },
    {
      id: 'PL123460',
      customer: 'Omar Farooq',
      email: 'omar@example.com',
      phone: '+971 55 234 5678',
      address: '56 Khalifa Street, Sharjah',
      items: [
        { name: 'Omron Blood Pressure Monitor', quantity: 1, price: 299.00 },
        { name: 'Pulse Oximeter', quantity: 1, price: 79.00 },
        { name: 'Vitamin C 1000mg', quantity: 2, price: 35.00 }
      ],
      subtotal: 448.00,
      deliveryFee: 0,
      total: 448.00,
      status: 'delivered',
      paymentMethod: 'cod',
      date: '2024-01-26',
      notes: ''
    }
  ]);

  const statusOptions = [
    { value: 'all', label: 'All Orders' },
    { value: 'pending', label: 'Pending' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' }
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

  const getStatusIcon = (status) => {
    const icons = {
      pending: Package,
      processing: Package,
      shipped: Truck,
      delivered: CheckCircle,
      cancelled: XCircle
    };
    return icons[status] || Package;
  };

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 2
    }).format(price);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-heading font-bold text-navy text-3xl">Orders</h1>
        <p className="text-navy/60">Manage and track customer orders</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/40" />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-lime focus:ring-2 focus:ring-lime/20 outline-none"
          />
        </div>
        <div className="relative">
          <Filter size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/40" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none pl-12 pr-10 py-3 rounded-xl border border-gray-200 focus:border-lime focus:ring-2 focus:ring-lime/20 outline-none bg-white"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-navy/40 pointer-events-none" />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-navy/60">Order ID</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-navy/60">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-navy/60">Date</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-navy/60">Status</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-navy/60">Total</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-navy/60">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-navy">{order.id}</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-navy">{order.customer}</p>
                      <p className="text-sm text-navy/50">{order.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-navy/70">{order.date}</td>
                  <td className="px-6 py-4">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-xs font-medium capitalize border-0 cursor-pointer ${getStatusColor(order.status)}`}
                    >
                      {statusOptions.filter(s => s.value !== 'all').map(s => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-navy">
                    {formatPrice(order.total)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-2 hover:bg-gray-100 rounded-lg text-navy/60 hover:text-navy transition-colors"
                      >
                        <Eye size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-navy/60">No orders found</p>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-auto">
            <div className="p-6 border-b flex items-center justify-between">
              <div>
                <h2 className="font-heading font-semibold text-navy text-xl">
                  Order {selectedOrder.id}
                </h2>
                <p className="text-navy/50 text-sm">{selectedOrder.date}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <XCircle size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Status */}
              <div className="flex items-center gap-4">
                <span className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${getStatusColor(selectedOrder.status)}`}>
                  {selectedOrder.status}
                </span>
                <span className="text-navy/50">
                  Payment: {selectedOrder.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Credit Card'}
                </span>
              </div>

              {/* Customer Info */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-medium text-navy mb-3">Customer Information</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-navy/70"><span className="text-navy">Name:</span> {selectedOrder.customer}</p>
                  <p className="text-navy/70"><span className="text-navy">Email:</span> {selectedOrder.email}</p>
                  <p className="text-navy/70"><span className="text-navy">Phone:</span> {selectedOrder.phone}</p>
                  <p className="text-navy/70"><span className="text-navy">Address:</span> {selectedOrder.address}</p>
                </div>
              </div>

              {/* Items */}
              <div>
                <h3 className="font-medium text-navy mb-3">Order Items</h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b">
                      <div>
                        <p className="font-medium text-navy">{item.name}</p>
                        <p className="text-sm text-navy/50">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium text-navy">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totals */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-navy/70">Subtotal</span>
                  <span className="text-navy">{formatPrice(selectedOrder.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-navy/70">Delivery Fee</span>
                  <span className="text-navy">
                    {selectedOrder.deliveryFee === 0 ? 'FREE' : formatPrice(selectedOrder.deliveryFee)}
                  </span>
                </div>
                <div className="flex justify-between font-heading font-bold text-lg pt-2 border-t">
                  <span className="text-navy">Total</span>
                  <span className="text-navy">{formatPrice(selectedOrder.total)}</span>
                </div>
              </div>

              {/* Notes */}
              {selectedOrder.notes && (
                <div className="bg-yellow-50 rounded-xl p-4">
                  <h3 className="font-medium text-yellow-700 mb-1">Customer Notes</h3>
                  <p className="text-yellow-600 text-sm">{selectedOrder.notes}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="flex-1 py-3 rounded-pill border border-navy text-navy font-medium hover:bg-navy/5 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
