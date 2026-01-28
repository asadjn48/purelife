// import React, { useState } from 'react';
// import { Package, Eye, Truck, CheckCircle, XCircle, Clock } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';

// const Orders = () => {
//   const { user } = useAuth();
//   const [selectedOrder, setSelectedOrder] = useState(null);

//   const orders = user?.orders || [];

//   const getStatusIcon = (status) => {
//     const icons = {
//       pending: Clock,
//       processing: Package,
//       shipped: Truck,
//       delivered: CheckCircle,
//       cancelled: XCircle
//     };
//     return icons[status] || Package;
//   };

//   const getStatusColor = (status) => {
//     const colors = {
//       pending: 'bg-yellow-100 text-yellow-700',
//       processing: 'bg-blue-100 text-blue-700',
//       shipped: 'bg-purple-100 text-purple-700',
//       delivered: 'bg-green-100 text-green-700',
//       cancelled: 'bg-red-100 text-red-700'
//     };
//     return colors[status] || 'bg-gray-100 text-gray-700';
//   };

//   const formatPrice = (price) => {
//     return new Intl.NumberFormat('en-AE', {
//       style: 'currency',
//       currency: 'AED',
//       minimumFractionDigits: 2
//     }).format(price);
//   };

//   // Demo order details
//   const orderDetails = {
//     'PL123456': {
//       items: [
//         { name: 'Panadol Extra 20 Tablets', quantity: 2, price: 18.50 },
//         { name: 'Vitamin D3 1000 IU', quantity: 1, price: 45.00 }
//       ],
//       shipping: { method: 'Free Delivery', address: '123 Sheikh Zayed Road, Dubai' },
//       payment: { method: 'Cash on Delivery' },
//       timeline: [
//         { status: 'Order Placed', date: '2024-01-15 10:30 AM', completed: true },
//         { status: 'Order Confirmed', date: '2024-01-15 11:00 AM', completed: true },
//         { status: 'Shipped', date: '2024-01-15 02:00 PM', completed: true },
//         { status: 'Delivered', date: '2024-01-16 09:00 AM', completed: true }
//       ]
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="bg-white border rounded-lg p-6">
//         <h1 className="text-2xl font-semibold text-pharmacy-navy mb-2">My Orders</h1>
//         <p className="text-gray-600">View and track your order history</p>
//       </div>

//       {orders.length === 0 ? (
//         <div className="bg-white border rounded-lg p-12 text-center">
//           <Package className="mx-auto text-gray-300 mb-4" size={64} />
//           <h3 className="text-lg font-medium text-pharmacy-navy mb-2">No orders yet</h3>
//           <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
//           <a href="/products" className="btn-primary inline-block">
//             Start Shopping
//           </a>
//         </div>
//       ) : (
//         <div className="bg-white border rounded-lg overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Order ID</th>
//                   <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Date</th>
//                   <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Items</th>
//                   <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Status</th>
//                   <th className="px-6 py-4 text-right text-sm font-medium text-gray-600">Total</th>
//                   <th className="px-6 py-4 text-center text-sm font-medium text-gray-600">Action</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y">
//                 {orders.map((order) => {
//                   const StatusIcon = getStatusIcon(order.status);
//                   return (
//                     <tr key={order.id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 font-medium text-pharmacy-navy">{order.id}</td>
//                       <td className="px-6 py-4 text-gray-600">{order.date}</td>
//                       <td className="px-6 py-4 text-gray-600">{order.items} items</td>
//                       <td className="px-6 py-4">
//                         <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(order.status)}`}>
//                           <StatusIcon size={14} />
//                           {order.status}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 text-right font-medium text-pharmacy-navy">
//                         {formatPrice(order.total)}
//                       </td>
//                       <td className="px-6 py-4 text-center">
//                         <button
//                           onClick={() => setSelectedOrder(order)}
//                           className="inline-flex items-center gap-1 text-pharmacy-green hover:underline text-sm"
//                         >
//                           <Eye size={16} />
//                           View
//                         </button>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {/* Order Detail Modal */}
//       {selectedOrder && (
//         <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-auto">
//             <div className="p-6 border-b flex items-center justify-between">
//               <div>
//                 <h2 className="text-xl font-semibold text-pharmacy-navy">Order {selectedOrder.id}</h2>
//                 <p className="text-sm text-gray-500">Placed on {selectedOrder.date}</p>
//               </div>
//               <button
//                 onClick={() => setSelectedOrder(null)}
//                 className="p-2 hover:bg-gray-100 rounded"
//               >
//                 <XCircle size={24} className="text-gray-400" />
//               </button>
//             </div>

//             <div className="p-6 space-y-6">
//               {/* Status */}
//               <div className={`inline-flex items-center gap-2 px-4 py-2 rounded ${getStatusColor(selectedOrder.status)}`}>
//                 {React.createElement(getStatusIcon(selectedOrder.status), { size: 18 })}
//                 <span className="font-medium capitalize">{selectedOrder.status}</span>
//               </div>

//               {/* Order Timeline */}
//               {orderDetails[selectedOrder.id]?.timeline && (
//                 <div>
//                   <h3 className="font-medium text-pharmacy-navy mb-4">Order Timeline</h3>
//                   <div className="space-y-4">
//                     {orderDetails[selectedOrder.id].timeline.map((step, idx) => (
//                       <div key={idx} className="flex items-start gap-4">
//                         <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
//                           step.completed ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'
//                         }`}>
//                           {step.completed ? <CheckCircle size={16} /> : <Clock size={16} />}
//                         </div>
//                         <div>
//                           <p className="font-medium text-gray-800">{step.status}</p>
//                           <p className="text-sm text-gray-500">{step.date}</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Order Items */}
//               {orderDetails[selectedOrder.id]?.items && (
//                 <div>
//                   <h3 className="font-medium text-pharmacy-navy mb-4">Order Items</h3>
//                   <div className="space-y-3">
//                     {orderDetails[selectedOrder.id].items.map((item, idx) => (
//                       <div key={idx} className="flex justify-between items-center py-2 border-b">
//                         <div>
//                           <p className="font-medium text-gray-800">{item.name}</p>
//                           <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
//                         </div>
//                         <p className="font-medium text-pharmacy-navy">
//                           {formatPrice(item.price * item.quantity)}
//                         </p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Totals */}
//               <div className="bg-gray-50 rounded-lg p-4 space-y-2">
//                 <div className="flex justify-between text-gray-600">
//                   <span>Subtotal</span>
//                   <span>{formatPrice(selectedOrder.total - 15)}</span>
//                 </div>
//                 <div className="flex justify-between text-gray-600">
//                   <span>Delivery</span>
//                   <span>FREE</span>
//                 </div>
//                 <div className="flex justify-between font-semibold text-lg text-pharmacy-navy pt-2 border-t">
//                   <span>Total</span>
//                   <span>{formatPrice(selectedOrder.total)}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Orders;














import React, { useState } from 'react';
import { Package, Eye, Truck, CheckCircle, XCircle, Clock, ChevronRight, AlertCircle, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Orders = () => {
  const { user } = useAuth();
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Fallback if user.orders is undefined
  const orders = user?.orders || [];

  const getStatusIcon = (status) => {
    const icons = {
      pending: Clock,
      processing: Package,
      shipped: Truck,
      delivered: CheckCircle,
      cancelled: XCircle
    };
    return icons[status.toLowerCase()] || Package;
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-700',
      processing: 'bg-blue-100 text-blue-700',
      shipped: 'bg-purple-100 text-purple-700',
      delivered: 'bg-green-100 text-green-700',
      cancelled: 'bg-red-100 text-red-700'
    };
    return colors[status.toLowerCase()] || 'bg-gray-100 text-gray-700';
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 2
    }).format(price);
  };

  // --- Mock Data for Detail View ---
  const MOCK_ORDER_DETAILS = {
    // Default fallback for any order ID
    'default': {
      items: [
        { name: 'Panadol Extra 20 Tablets', quantity: 2, price: 18.50 },
        { name: 'Vitamin D3 1000 IU', quantity: 1, price: 45.00 }
      ],
      shipping: { method: 'Free Delivery', address: '123 Sheikh Zayed Road, Dubai' },
      payment: { method: 'Cash on Delivery' },
      timeline: [
        { status: 'Order Placed', date: 'Jan 28, 10:00 AM', completed: true },
        { status: 'Processing', date: 'Jan 28, 11:30 AM', completed: true },
        { status: 'Out for Delivery', date: 'Expected Today', completed: true },
        { status: 'Delivered', date: 'Pending', completed: true }
      ]
    }
  };

  // Helper to get details or fallback
  const getOrderDetails = (id) => MOCK_ORDER_DETAILS[id] || MOCK_ORDER_DETAILS['default'];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-500">Track and manage your recent purchases</p>
        </div>
        <Link to="/products" className="bg-primary text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-primary/90 transition-colors text-center">
          Browse Products
        </Link>
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-xl p-16 text-center flex flex-col items-center">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
            <Package className="text-gray-300" size={40} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No orders placed yet</h3>
          <p className="text-gray-500 max-w-sm mx-auto mb-8">
            Looks like you haven't made your first purchase. Check out our bestsellers!
          </p>
          <Link to="/" className="text-primary font-bold hover:underline">
            Start Shopping &rarr;
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Items</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((order) => {
                  const StatusIcon = getStatusIcon(order.status);
                  return (
                    <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4 font-bold text-gray-900">
                        <span className="font-mono text-primary">#{order.id}</span>
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-gray-400" />
                          {order.date}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-sm">
                        {order.items} <span className="text-gray-400">items</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold capitalize ${getStatusColor(order.status)}`}>
                          <StatusIcon size={14} />
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-bold text-gray-900">
                        {formatPrice(order.total)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all tooltip"
                            title="View Details"
                          >
                            <Eye size={18} />
                          </button>
                          {/* Track Button (Only if active) */}
                          {['processing', 'shipped'].includes(order.status.toLowerCase()) && (
                             <button
                               onClick={() => setSelectedOrder(order)}
                               className="p-2 text-gray-400 hover:text-secondary hover:bg-secondary/5 rounded-lg transition-all"
                               title="Track Order"
                             >
                               <Truck size={18} />
                             </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- Order Details Modal (Slide-over style) --- */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setSelectedOrder(null)}
          />

          {/* Modal Panel */}
          <div className="relative w-full max-w-lg bg-white h-full shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300">
            
            {/* Modal Header */}
            <div className="sticky top-0 bg-white z-10 border-b border-gray-100 px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  Order <span className="font-mono text-primary">#{selectedOrder.id}</span>
                </h2>
                <p className="text-xs text-gray-500">Placed on {selectedOrder.date}</p>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <XCircle size={24} className="text-gray-400 hover:text-red-500" />
              </button>
            </div>

            <div className="p-6 space-y-8">
              
              {/* Status Banner */}
              <div className={`flex items-center justify-between p-4 rounded-xl ${getStatusColor(selectedOrder.status)} bg-opacity-20 border border-current border-opacity-20`}>
                <div className="flex items-center gap-3">
                  {React.createElement(getStatusIcon(selectedOrder.status), { size: 24 })}
                  <div>
                    <p className="font-bold text-sm uppercase tracking-wider">Status</p>
                    <p className="font-bold text-lg capitalize">{selectedOrder.status}</p>
                  </div>
                </div>
              </div>

              {/* Order Timeline */}
              <div>
                <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Truck size={18} className="text-primary" /> Tracking History
                </h3>
                <div className="relative pl-4 border-l-2 border-gray-100 space-y-8">
                  {getOrderDetails(selectedOrder.id).timeline.map((step, idx) => (
                    <div key={idx} className="relative">
                      {/* Dot */}
                      <div className={`absolute -left-[21px] top-1 w-4 h-4 rounded-full border-2 ${
                        step.completed 
                          ? 'bg-green-500 border-green-500' 
                          : 'bg-white border-gray-300'
                      }`} />
                      
                      <div className={step.completed ? 'opacity-100' : 'opacity-50'}>
                        <p className="font-bold text-gray-900 text-sm">{step.status}</p>
                        <p className="text-xs text-gray-500 mt-1">{step.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Package size={18} className="text-primary" /> Items Ordered
                </h3>
                <div className="bg-gray-50 rounded-xl p-4 space-y-4">
                  {getOrderDetails(selectedOrder.id).items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                      <div>
                        <p className="font-bold text-gray-800 text-sm">{item.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-gray-900">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Payment Details</h3>
                <div className="border border-gray-100 rounded-xl p-4 space-y-3">
                   <div className="flex justify-between text-sm text-gray-600">
                     <span>Subtotal</span>
                     <span>{formatPrice(selectedOrder.total - 15)}</span>
                   </div>
                   <div className="flex justify-between text-sm text-gray-600">
                     <span>Shipping</span>
                     <span className="text-green-600 font-medium">Free</span>
                   </div>
                   <div className="flex justify-between text-sm text-gray-600">
                     <span>Payment Method</span>
                     <span>Cash on Delivery</span>
                   </div>
                   <div className="pt-3 border-t border-gray-100 flex justify-between font-bold text-lg text-primary">
                     <span>Total</span>
                     <span>{formatPrice(selectedOrder.total)}</span>
                   </div>
                </div>
              </div>

              {/* Need Help? */}
              <div className="bg-blue-50 p-4 rounded-xl flex items-start gap-3">
                <AlertCircle className="text-blue-500 mt-0.5" size={20} />
                <div>
                  <p className="font-bold text-blue-900 text-sm">Need help with this order?</p>
                  <p className="text-xs text-blue-700 mt-1 mb-2">If you have issues with delivery or items, contact our support.</p>
                  <a href="/contact" className="text-xs font-bold text-blue-600 hover:underline">Contact Support &rarr;</a>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Orders;