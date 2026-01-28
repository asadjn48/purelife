// import React from 'react';
// import { Truck, Clock, MapPin, Package, CheckCircle, AlertCircle } from 'lucide-react';

// const Delivery = () => {
//   const deliveryInfo = [
//     {
//       emirate: 'Dubai',
//       time: 'Same Day - Next Day',
//       fee: 'FREE'
//     },
//     {
//       emirate: 'Abu Dhabi',
//       time: '1-2 Business Days',
//       fee: 'FREE'
//     },
//     {
//       emirate: 'Sharjah',
//       time: 'Same Day - Next Day',
//       fee: 'FREE'
//     },
//     {
//       emirate: 'Ajman',
//       time: '1-2 Business Days',
//       fee: 'FREE'
//     },
//     {
//       emirate: 'Ras Al Khaimah',
//       time: '2-3 Business Days',
//       fee: 'FREE'
//     },
//     {
//       emirate: 'Fujairah',
//       time: '2-3 Business Days',
//       fee: 'FREE'
//     },
//     {
//       emirate: 'Umm Al Quwain',
//       time: '2-3 Business Days',
//       fee: 'FREE'
//     }
//   ];

//   const process = [
//     {
//       icon: Package,
//       title: 'Order Placed',
//       description: 'We receive and confirm your order'
//     },
//     {
//       icon: CheckCircle,
//       title: 'Order Processed',
//       description: 'Our pharmacists verify and prepare your order'
//     },
//     {
//       icon: Truck,
//       title: 'Out for Delivery',
//       description: 'Your order is on its way to you'
//     },
//     {
//       icon: MapPin,
//       title: 'Delivered',
//       description: 'Your order arrives at your doorstep'
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Hero */}
//       <div className="bg-pharmacy-navy py-16">
//         <div className="container-main text-center">
//           <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
//             Delivery Information
//           </h1>
//           <p className="text-xl text-white/80 max-w-2xl mx-auto">
//             Free delivery across all Emirates in the UAE
//           </p>
//         </div>
//       </div>

//       {/* Free Delivery Banner */}
//       <div className="bg-pharmacy-green py-8">
//         <div className="container-main">
//           <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center">
//             <Truck className="text-pharmacy-navy" size={48} />
//             <div>
//               <h2 className="text-2xl font-bold text-pharmacy-navy mb-1">FREE Delivery on All Orders</h2>
//               <p className="text-pharmacy-navy/80">No minimum order value required</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Delivery Times */}
//       <div className="section">
//         <div className="container-main">
//           <h2 className="text-3xl font-bold text-pharmacy-navy text-center mb-12">
//             Delivery Times by Emirate
//           </h2>
//           <div className="max-w-3xl mx-auto">
//             <div className="bg-white border rounded-lg overflow-hidden">
//               <table className="w-full">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-4 text-left font-medium text-gray-600">Emirate</th>
//                     <th className="px-6 py-4 text-left font-medium text-gray-600">Delivery Time</th>
//                     <th className="px-6 py-4 text-left font-medium text-gray-600">Delivery Fee</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y">
//                   {deliveryInfo.map((info, idx) => (
//                     <tr key={idx} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 font-medium text-pharmacy-navy">{info.emirate}</td>
//                       <td className="px-6 py-4 text-gray-600 flex items-center gap-2">
//                         <Clock size={16} className="text-pharmacy-green" />
//                         {info.time}
//                       </td>
//                       <td className="px-6 py-4">
//                         <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
//                           {info.fee}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Delivery Process */}
//       <div className="section bg-gray-50">
//         <div className="container-main">
//           <h2 className="text-3xl font-bold text-pharmacy-navy text-center mb-12">
//             How It Works
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {process.map((step, idx) => (
//               <div key={idx} className="bg-white p-6 rounded-lg border text-center">
//                 <div className="w-16 h-16 bg-pharmacy-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <step.icon className="text-pharmacy-green" size={32} />
//                 </div>
//                 <div className="w-8 h-8 bg-pharmacy-navy text-white rounded-full flex items-center justify-center mx-auto -mt-12 mb-4 relative z-10">
//                   {idx + 1}
//                 </div>
//                 <h3 className="font-semibold text-pharmacy-navy mb-2">{step.title}</h3>
//                 <p className="text-gray-600 text-sm">{step.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Important Info */}
//       <div className="section">
//         <div className="container-main">
//           <div className="grid md:grid-cols-2 gap-8">
//             <div className="bg-green-50 p-6 rounded-lg">
//               <div className="flex items-center gap-3 mb-4">
//                 <CheckCircle className="text-green-600" size={24} />
//                 <h3 className="font-semibold text-green-800">What to Expect</h3>
//               </div>
//               <ul className="space-y-3 text-green-700">
//                 <li>• You'll receive an SMS confirmation when your order is placed</li>
//                 <li>•Our team will call you to confirm your order details</li>
//                 <li>• You'll receive tracking updates via SMS</li>
//                 <li>• Our delivery partner will call before arrival</li>
//                 <li>• Pay cash on delivery or use your card</li>
//               </ul>
//             </div>

//             <div className="bg-orange-50 p-6 rounded-lg">
//               <div className="flex items-center gap-3 mb-4">
//                 <AlertCircle className="text-orange-600" size={24} />
//                 <h3 className="font-semibold text-orange-800">Important Notes</h3>
//               </div>
//               <ul className="space-y-3 text-orange-700">
//                 <li>• Someone must be available to receive the order</li>
//                 <li>• Please have your ID ready for verification</li>
//                 <li>• Prescription medicines require original prescription</li>
//                 <li>• Same-day delivery for orders before 2 PM in Dubai</li>
//                 <li>• Delivery may be delayed during weekends/holidays</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Track Order */}
//       <div className="section bg-pharmacy-navy">
//         <div className="container-main text-center">
//           <h2 className="text-2xl font-bold text-white mb-4">Track Your Order</h2>
//           <p className="text-white/80 mb-6 max-w-xl mx-auto">
//             Enter your order ID to check the status of your delivery
//           </p>
//           <div className="max-w-md mx-auto flex gap-2">
//             <input
//               type="text"
//               placeholder="Enter Order ID (e.g., PL123456)"
//               className="flex-1 px-4 py-3 rounded text-gray-800"
//             />
//             <button className="btn-primary">Track</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Delivery;

























import React from 'react';
import { Truck, Clock, MapPin, Package, CheckCircle, AlertCircle, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const Delivery = () => {
  const deliveryInfo = [
    { emirate: 'Dubai', time: 'Same Day (Order before 2PM)', fee: 'FREE' },
    { emirate: 'Abu Dhabi', time: '1-2 Business Days', fee: 'FREE' },
    { emirate: 'Sharjah', time: 'Same Day - Next Day', fee: 'FREE' },
    { emirate: 'Ajman', time: '1-2 Business Days', fee: 'FREE' },
    { emirate: 'Ras Al Khaimah', time: '2-3 Business Days', fee: 'FREE' },
    { emirate: 'Fujairah', time: '2-3 Business Days', fee: 'FREE' },
    { emirate: 'Umm Al Quwain', time: '2-3 Business Days', fee: 'FREE' }
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      
      {/* Hero Section */}
      <div className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6 backdrop-blur-sm border border-white/20">
            <Truck size={18} className="text-secondary" />
            <span className="font-medium text-sm">Fast & Reliable Shipping</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Delivery Information</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            We deliver health and happiness across all Emirates in the UAE with care and precision.
          </p>
        </div>
      </div>

      {/* Free Delivery Banner */}
      <div className="bg-secondary/10 border-y border-secondary/20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
            <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white shadow-lg shadow-secondary/30">
              <Truck size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">FREE Delivery on All Orders</h2>
              <p className="text-gray-600">No minimum order value required for a limited time.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Table */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Delivery Schedule</h2>
          <div className="bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-5 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">Emirate</th>
                  <th className="px-6 py-5 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">Estimated Time</th>
                  <th className="px-6 py-5 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {deliveryInfo.map((info, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-gray-800">{info.emirate}</td>
                    <td className="px-6 py-4 text-gray-600 flex items-center gap-2">
                      <Clock size={16} className="text-primary" /> {info.time}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase">
                        {info.fee}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Process Steps */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Package, title: 'Order Placed', desc: 'We receive your order' },
              { icon: CheckCircle, title: 'Processing', desc: 'Pharmacist verifies items' },
              { icon: Truck, title: 'Shipped', desc: 'Courier picks up package' },
              { icon: MapPin, title: 'Delivered', desc: 'Arrives at your door' }
            ].map((step, idx) => (
              <div key={idx} className="relative flex flex-col items-center text-center group">
                {idx !== 3 && (
                  <div className="hidden md:block absolute top-8 left-[50%] w-full h-0.5 bg-gray-200 -z-10" />
                )}
                <div className="w-16 h-16 bg-white border-2 border-primary/20 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:border-primary group-hover:shadow-md transition-all duration-300">
                  <step.icon className="text-primary" size={32} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 max-w-[150px]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Important Info Cards */}
      <div className="py-16">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-8">
          <div className="bg-green-50/50 p-8 rounded-3xl border border-green-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-100 rounded-full text-green-600"><CheckCircle size={24} /></div>
              <h3 className="font-bold text-xl text-green-800">Delivery Guidelines</h3>
            </div>
            <ul className="space-y-4 text-green-800/80 font-medium">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 bg-green-500 rounded-full" />
                You receive SMS updates at every step.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 bg-green-500 rounded-full" />
                Our courier will call you before arrival.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 bg-green-500 rounded-full" />
                Original ID required for controlled medicines.
              </li>
            </ul>
          </div>

          <div className="bg-orange-50/50 p-8 rounded-3xl border border-orange-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-orange-100 rounded-full text-orange-600"><AlertCircle size={24} /></div>
              <h3 className="font-bold text-xl text-orange-800">Important Notes</h3>
            </div>
            <ul className="space-y-4 text-orange-800/80 font-medium">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 bg-orange-500 rounded-full" />
                Deliveries may be delayed on public holidays.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 bg-orange-500 rounded-full" />
                Ensure someone is home to receive the package.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 bg-orange-500 rounded-full" />
                Remote areas may take +1 extra day.
              </li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Delivery;