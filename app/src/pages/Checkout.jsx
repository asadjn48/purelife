// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { MapPin, CreditCard, Truck, CheckCircle, ChevronRight, Shield } from 'lucide-react';
// import { useCart } from '../context/CartContext';
// import { useAuth } from '../context/AuthContext';

// const Checkout = () => {
//   const navigate = useNavigate();
//   const { items, getSubtotal, getDeliveryFee, getTotal, clearCart } = useCart();
//   const { user } = useAuth();

//   const [step, setStep] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [orderPlaced, setOrderPlaced] = useState(false);

//   const defaultAddress = user?.addresses?.find(a => a.isDefault);

//   const [formData, setFormData] = useState({
//     fullName: user?.displayName || '',
//     phone: user?.phoneNumber || '',
//     email: user?.email || '',
//     address: defaultAddress?.street || '',
//     city: defaultAddress?.city || 'Dubai',
//     emirate: defaultAddress?.emirate || 'Dubai',
//     zipCode: defaultAddress?.zipCode || '',
//     notes: '',
//     paymentMethod: 'cod'
//   });

//   const emirates = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain'];

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const validateStep1 = () => {
//     return formData.fullName && formData.phone && formData.email;
//   };

//   const validateStep2 = () => {
//     return formData.address && formData.city && formData.emirate;
//   };

//   const handlePlaceOrder = async () => {
//     setLoading(true);
//     await new Promise(resolve => setTimeout(resolve, 1500));
//     setOrderPlaced(true);
//     clearCart();
//     setLoading(false);
//   };

//   const formatPrice = (price) => {
//     return new Intl.NumberFormat('en-AE', {
//       style: 'currency',
//       currency: 'AED',
//       minimumFractionDigits: 2
//     }).format(price);
//   };

//   if (items.length === 0 && !orderPlaced) {
//     navigate('/cart');
//     return null;
//   }

//   if (orderPlaced) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
//         <div className="w-full max-w-md text-center">
//           <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
//             <CheckCircle size={40} className="text-green-600" />
//           </div>
//           <h1 className="text-2xl font-bold text-pharmacy-navy mb-2">
//             Order Confirmed!
//           </h1>
//           <p className="text-gray-600 mb-6">
//             Thank you for your order. We'll send you a confirmation email shortly.
//           </p>
//           <div className="bg-white border rounded-lg p-6 mb-6">
//             <p className="text-sm text-gray-500 mb-1">Order Reference</p>
//             <p className="font-bold text-pharmacy-navy text-xl">
//               PL{Date.now().toString().slice(-8)}
//             </p>
//           </div>
//           <button
//             onClick={() => navigate('/')}
//             className="btn-primary w-full"
//           >
//             Continue Shopping
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="container-main">
//         <h1 className="text-2xl md:text-3xl font-bold text-pharmacy-navy mb-8">Checkout</h1>

//         {/* Progress */}
//         <div className="flex items-center gap-4 mb-8">
//           {[
//             { step: 1, label: 'Contact' },
//             { step: 2, label: 'Delivery' },
//             { step: 3, label: 'Payment' }
//           ].map((s, idx) => (
//             <React.Fragment key={s.step}>
//               <div className={`flex items-center gap-2 ${step >= s.step ? 'text-pharmacy-navy' : 'text-gray-400'}`}>
//                 <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
//                   step >= s.step ? 'bg-pharmacy-green text-pharmacy-navy' : 'bg-gray-200'
//                 }`}>
//                   {s.step}
//                 </div>
//                 <span className="hidden sm:inline font-medium">{s.label}</span>
//               </div>
//               {idx < 2 && <ChevronRight className="text-gray-300" size={20} />}
//             </React.Fragment>
//           ))}
//         </div>

//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Main Form */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Step 1: Contact Info */}
//             {step === 1 && (
//               <div className="bg-white border rounded-lg p-6">
//                 <h2 className="text-lg font-semibold text-pharmacy-navy mb-6">Contact Information</h2>
//                 <div className="space-y-4">
//                   <div className="grid md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//                       <input
//                         type="text"
//                         name="fullName"
//                         value={formData.fullName}
//                         onChange={handleChange}
//                         className="input"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
//                       <input
//                         type="tel"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleChange}
//                         className="input"
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
//                     <input
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       className="input"
//                     />
//                   </div>
//                   <button
//                     onClick={() => validateStep1() && setStep(2)}
//                     disabled={!validateStep1()}
//                     className="w-full btn-primary py-4 disabled:opacity-50"
//                   >
//                     Continue to Delivery
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* Step 2: Delivery Address */}
//             {step >= 2 && (
//               <div className={`bg-white border rounded-lg p-6 ${step !== 2 && 'opacity-60'}`}>
//                 <h2 className="text-lg font-semibold text-pharmacy-navy mb-6">Delivery Address</h2>
//                 {step === 2 && (
//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
//                       <textarea
//                         name="address"
//                         value={formData.address}
//                         onChange={handleChange}
//                         rows={2}
//                         className="input resize-none"
//                         placeholder="Building name, street, apartment number"
//                       />
//                     </div>
//                     <div className="grid md:grid-cols-3 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Emirate</label>
//                         <select
//                           name="emirate"
//                           value={formData.emirate}
//                           onChange={handleChange}
//                           className="input"
//                         >
//                           {emirates.map(e => <option key={e} value={e}>{e}</option>)}
//                         </select>
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
//                         <input
//                           type="text"
//                           name="city"
//                           value={formData.city}
//                           onChange={handleChange}
//                           className="input"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
//                         <input
//                           type="text"
//                           name="zipCode"
//                           value={formData.zipCode}
//                           onChange={handleChange}
//                           className="input"
//                         />
//                       </div>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Notes (Optional)</label>
//                       <textarea
//                         name="notes"
//                         value={formData.notes}
//                         onChange={handleChange}
//                         rows={2}
//                         className="input resize-none"
//                         placeholder="Any special instructions"
//                       />
//                     </div>
//                     <div className="flex gap-3">
//                       <button
//                         onClick={() => setStep(1)}
//                         className="flex-1 py-3 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
//                       >
//                         Back
//                       </button>
//                       <button
//                         onClick={() => validateStep2() && setStep(3)}
//                         disabled={!validateStep2()}
//                         className="flex-1 btn-primary py-3 disabled:opacity-50"
//                       >
//                         Continue to Payment
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Step 3: Payment */}
//             {step >= 3 && (
//               <div className={`bg-white border rounded-lg p-6 ${step !== 3 && 'opacity-60'}`}>
//                 <h2 className="text-lg font-semibold text-pharmacy-navy mb-6">Payment Method</h2>
//                 {step === 3 && (
//                   <div className="space-y-4">
//                     <div className="space-y-3">
//                       <label className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer ${
//                         formData.paymentMethod === 'cod' ? 'border-pharmacy-green bg-pharmacy-green/5' : 'border-gray-200'
//                       }`}>
//                         <input
//                           type="radio"
//                           name="paymentMethod"
//                           value="cod"
//                           checked={formData.paymentMethod === 'cod'}
//                           onChange={handleChange}
//                           className="accent-pharmacy-green"
//                         />
//                         <div className="flex-1">
//                           <p className="font-medium text-pharmacy-navy">Cash on Delivery</p>
//                           <p className="text-sm text-gray-500">Pay when you receive your order</p>
//                         </div>
//                         <span className="text-2xl">💵</span>
//                       </label>

//                       <label className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer ${
//                         formData.paymentMethod === 'card' ? 'border-pharmacy-green bg-pharmacy-green/5' : 'border-gray-200'
//                       }`}>
//                         <input
//                           type="radio"
//                           name="paymentMethod"
//                           value="card"
//                           checked={formData.paymentMethod === 'card'}
//                           onChange={handleChange}
//                           className="accent-pharmacy-green"
//                         />
//                         <div className="flex-1">
//                           <p className="font-medium text-pharmacy-navy">Credit/Debit Card</p>
//                           <p className="text-sm text-gray-500">Pay securely with your card</p>
//                         </div>
//                         <span className="text-2xl">💳</span>
//                       </label>

//                       <label className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer ${
//                         formData.paymentMethod === 'applepay' ? 'border-pharmacy-green bg-pharmacy-green/5' : 'border-gray-200'
//                       }`}>
//                         <input
//                           type="radio"
//                           name="paymentMethod"
//                           value="applepay"
//                           checked={formData.paymentMethod === 'applepay'}
//                           onChange={handleChange}
//                           className="accent-pharmacy-green"
//                         />
//                         <div className="flex-1">
//                           <p className="font-medium text-pharmacy-navy">Apple Pay</p>
//                           <p className="text-sm text-gray-500">Quick and secure payment</p>
//                         </div>
//                         <span className="text-2xl">🍎</span>
//                       </label>
//                     </div>

//                     <div className="flex gap-3 pt-4">
//                       <button
//                         onClick={() => setStep(2)}
//                         className="flex-1 py-3 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
//                       >
//                         Back
//                       </button>
//                       <button
//                         onClick={handlePlaceOrder}
//                         disabled={loading}
//                         className="flex-1 btn-primary py-3 disabled:opacity-50"
//                       >
//                         {loading ? (
//                           <span className="flex items-center justify-center gap-2">
//                             <span className="w-5 h-5 border-2 border-pharmacy-navy/30 border-t-pharmacy-navy rounded-full animate-spin" />
//                             Processing...
//                           </span>
//                         ) : (
//                           `Place Order (${formatPrice(getTotal())})`
//                         )}
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Order Summary */}
//           <div className="lg:col-span-1">
//             <div className="bg-white border rounded-lg p-6 sticky top-4">
//               <h2 className="text-lg font-semibold text-pharmacy-navy mb-4">Order Summary</h2>

//               {/* Items */}
//               <div className="space-y-3 mb-6 max-h-48 overflow-y-auto">
//                 {items.map((item) => (
//                   <div key={item.product.id} className="flex gap-3">
//                     <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
//                       <img
//                         src={item.product.image}
//                         alt={item.product.name}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <p className="text-sm font-medium text-pharmacy-navy line-clamp-1">
//                         {item.product.name}
//                       </p>
//                       <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
//                     </div>
//                     <p className="text-sm font-medium text-pharmacy-navy">
//                       {formatPrice(item.product.price * item.quantity)}
//                     </p>
//                   </div>
//                 ))}
//               </div>

//               {/* Delivery Notice */}
//               {getDeliveryFee() === 0 ? (
//                 <div className="p-3 bg-green-50 text-green-700 text-sm rounded mb-4 flex items-center gap-2">
//                   <span>🎉</span>
//                   <span>FREE Delivery!</span>
//                 </div>
//               ) : null}

//               {/* Totals */}
//               <div className="space-y-2 pt-4 border-t">
//                 <div className="flex justify-between text-gray-600 text-sm">
//                   <span>Subtotal</span>
//                   <span>{formatPrice(getSubtotal())}</span>
//                 </div>
//                 <div className="flex justify-between text-gray-600 text-sm">
//                   <span>Delivery</span>
//                   <span>{getDeliveryFee() === 0 ? 'FREE' : formatPrice(getDeliveryFee())}</span>
//                 </div>
//                 <div className="flex justify-between font-semibold text-lg text-pharmacy-navy pt-2 border-t">
//                   <span>Total</span>
//                   <span>{formatPrice(getTotal())}</span>
//                 </div>
//               </div>

//               {/* Security */}
//               <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
//                 <Shield size={16} className="text-pharmacy-green" />
//                 <span>Secure checkout</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;





























import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, CreditCard, Truck, CheckCircle, ChevronRight, 
  Shield, Wallet, Banknote, Smartphone, ChevronLeft 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

// --- Sub-Component: Order Summary ---
const OrderSummary = ({ items, subtotal, deliveryFee, total, formatPrice }) => (
  <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 sticky top-24">
    <h2 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h2>
    
    <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin">
      {items.map((item) => (
        <div key={item.product.id} className="flex gap-4">
          <div className="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 shrink-0">
            <img src={item.product.image} alt={item.product.name} className="w-full h-full object-contain" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-800 line-clamp-2">{item.product.name}</p>
            <p className="text-xs text-gray-500 mt-1">Qty: {item.quantity}</p>
          </div>
          <p className="text-sm font-bold text-primary">{formatPrice(item.product.price * item.quantity)}</p>
        </div>
      ))}
    </div>

    {deliveryFee === 0 && (
      <div className="bg-green-50 text-green-700 text-xs font-bold px-3 py-2 rounded-lg mb-6 flex items-center gap-2">
        <Truck size={14} />
        <span>Free Delivery Applied!</span>
      </div>
    )}

    <div className="space-y-3 pt-6 border-t border-gray-100">
      <div className="flex justify-between text-gray-600 text-sm">
        <span>Subtotal</span>
        <span>{formatPrice(subtotal)}</span>
      </div>
      <div className="flex justify-between text-gray-600 text-sm">
        <span>Delivery Fee</span>
        <span className="text-green-600 font-medium">{deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}</span>
      </div>
      <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t border-gray-100">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>
    </div>

    <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
      <Shield size={12} />
      <span>Secure SSL Encrypted Transaction</span>
    </div>
  </div>
);

// --- Sub-Component: Payment Option Card ---
const PaymentOption = ({ id, title, subtitle, icon, selected, onSelect }) => (
  <div 
    onClick={() => onSelect(id)}
    className={`relative cursor-pointer rounded-xl border-2 p-5 transition-all duration-200 flex items-center gap-4 ${
      selected 
        ? 'border-primary bg-primary/5 shadow-md scale-[1.01]' 
        : 'border-gray-100 bg-white hover:border-gray-300 hover:bg-gray-50'
    }`}
  >
    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl shrink-0 ${
      selected ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'
    }`}>
      {icon}
    </div>
    <div className="flex-1">
      <h3 className={`font-bold text-sm ${selected ? 'text-primary' : 'text-gray-900'}`}>{title}</h3>
      <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
    </div>
    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
      selected ? 'border-primary' : 'border-gray-300'
    }`}>
      {selected && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
    </div>
  </div>
);

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getSubtotal, getDeliveryFee, getTotal, clearCart } = useCart();
  const { user } = useAuth();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Form Data
  const defaultAddress = user?.addresses?.find(a => a.isDefault);
  const [formData, setFormData] = useState({
    fullName: user?.displayName || '', phone: user?.phoneNumber || '', email: user?.email || '',
    address: defaultAddress?.street || '', city: defaultAddress?.city || 'Dubai', 
    emirate: defaultAddress?.emirate || 'Dubai', zipCode: defaultAddress?.zipCode || '', notes: '', paymentMethod: 'card'
  });

  const emirates = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain'];

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const validateStep1 = () => formData.fullName && formData.phone && formData.email;
  const validateStep2 = () => formData.address && formData.city && formData.emirate;

  const handlePlaceOrder = async () => {
    setLoading(true);
    // Simulate API
    await new Promise(resolve => setTimeout(resolve, 2000));
    const newOrderId = `PL-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(newOrderId);
    setOrderPlaced(true);
    clearCart();
    setLoading(false);
  };

  const formatPrice = (price) => new Intl.NumberFormat('en-AE', { style: 'currency', currency: 'AED' }).format(price);

  useEffect(() => {
    if (items.length === 0 && !orderPlaced) navigate('/cart');
  }, [items, orderPlaced, navigate]);

  // --- Success View ---
  if (orderPlaced) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-8 text-center animate-in zoom-in-95 duration-300">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} className="text-green-600 animate-bounce" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-500 mb-8">Thank you for choosing Pure Life. We are preparing your order.</p>
          
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-6 mb-8">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Order Reference</p>
            <p className="text-2xl font-mono font-bold text-primary tracking-widest">{orderId}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button 
              onClick={() => navigate('/account/orders')}
              className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/30"
            >
              <Truck size={20} /> Track Order
            </button>
            <button 
              onClick={() => navigate('/')}
              className="w-full py-4 bg-white border-2 border-gray-100 text-gray-700 font-bold rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate('/cart')} className="p-2 hover:bg-white rounded-full transition-colors">
            <ChevronLeft size={24} className="text-gray-600" />
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Steps */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Step Indicators */}
            <div className="flex items-center justify-between mb-8 px-2">
              {[
                { s: 1, label: 'Contact', icon: Shield }, 
                { s: 2, label: 'Delivery', icon: MapPin }, 
                { s: 3, label: 'Payment', icon: CreditCard }
              ].map((item, idx) => (
                <div key={item.s} className="flex flex-col items-center gap-2 relative z-10 w-1/3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    step >= item.s ? 'bg-primary border-primary text-white' : 'bg-white border-gray-200 text-gray-300'
                  }`}>
                    <item.icon size={18} />
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-wider ${
                    step >= item.s ? 'text-primary' : 'text-gray-300'
                  }`}>{item.label}</span>
                  {/* Progress Line */}
                  {idx !== 2 && (
                    <div className={`absolute top-5 left-[50%] w-full h-0.5 -z-10 ${
                       step > item.s ? 'bg-primary' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {/* STEP 1: CONTACT */}
            {step === 1 && (
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 animate-in slide-in-from-left-4 duration-300">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Contact Details</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="input-field" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="input-field" placeholder="+971 50 000 0000" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="input-field" placeholder="john@example.com" />
                  </div>
                </div>
                <button onClick={() => validateStep1() && setStep(2)} disabled={!validateStep1()} className="btn-next mt-8">
                  Continue to Delivery <ChevronRight size={20} />
                </button>
              </div>
            )}

            {/* STEP 2: DELIVERY */}
            {step === 2 && (
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 animate-in slide-in-from-right-4 duration-300">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Delivery Address</h2>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Street Address</label>
                    <textarea name="address" value={formData.address} onChange={handleChange} className="input-field resize-none h-24" placeholder="Building, Apt, Street..." />
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Emirate</label>
                      <select name="emirate" value={formData.emirate} onChange={handleChange} className="input-field">
                        {emirates.map(e => <option key={e} value={e}>{e}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">City</label>
                      <input type="text" name="city" value={formData.city} onChange={handleChange} className="input-field" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">ZIP Code</label>
                      <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} className="input-field" />
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 mt-8">
                  <button onClick={() => setStep(1)} className="btn-back">Back</button>
                  <button onClick={() => validateStep2() && setStep(3)} disabled={!validateStep2()} className="btn-next">
                    Continue to Payment <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: PAYMENT */}
            {step === 3 && (
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 animate-in zoom-in-95 duration-300">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Choose Payment Method</h2>
                
                <div className="grid md:grid-cols-1 gap-4">
                  {/* Option 1: Card */}
                  <PaymentOption 
                    id="card"
                    title="Credit / Debit Card"
                    subtitle="Pay securely with Visa or Mastercard"
                    icon={<CreditCard />}
                    selected={formData.paymentMethod === 'card'}
                    onSelect={(id) => setFormData({...formData, paymentMethod: id})}
                  />
                  
                  {/* Option 2: Apple Pay */}
                  <PaymentOption 
                    id="applepay"
                    title="Apple Pay"
                    subtitle="Fast and secure checkout"
                    icon={<Smartphone />}
                    selected={formData.paymentMethod === 'applepay'}
                    onSelect={(id) => setFormData({...formData, paymentMethod: id})}
                  />

                  {/* Option 3: COD */}
                  <PaymentOption 
                    id="cod"
                    title="Cash on Delivery"
                    subtitle="Pay with cash upon arrival"
                    icon={<Banknote />}
                    selected={formData.paymentMethod === 'cod'}
                    onSelect={(id) => setFormData({...formData, paymentMethod: id})}
                  />
                </div>

                <div className="flex gap-4 mt-8">
                  <button onClick={() => setStep(2)} className="btn-back">Back</button>
                  <button onClick={handlePlaceOrder} disabled={loading} className="btn-primary-lg flex-1">
                    {loading ? 'Processing Order...' : `Pay ${formatPrice(getTotal())}`}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Summary */}
          <div className="lg:col-span-4">
            <OrderSummary items={items} subtotal={getSubtotal()} deliveryFee={getDeliveryFee()} total={getTotal()} formatPrice={formatPrice} />
          </div>

        </div>
      </div>
      
      {/* CSS Utility Classes for cleaner JSX */}
      <style>{`
        .input-field {
          width: 100%; padding: 0.75rem 1rem; border-radius: 0.75rem; border: 1px solid #e5e7eb; outline: none; transition: all 0.2s;
        }
        .input-field:focus { border-color: #22709e; box-shadow: 0 0 0 3px rgba(34, 112, 158, 0.1); }
        .btn-next {
          width: 100%; display: flex; align-items: center; justify-content: center; gap: 0.5rem; background: #22709e; color: white; font-weight: 600; padding: 1rem; border-radius: 0.75rem; transition: all 0.2s;
        }
        .btn-next:hover { background: #1b5b80; }
        .btn-next:disabled { opacity: 0.5; cursor: not-allowed; }
        .btn-back {
          padding: 1rem 2rem; font-weight: 600; color: #4b5563; border: 1px solid #e5e7eb; border-radius: 0.75rem; transition: all 0.2s;
        }
        .btn-back:hover { background: #f9fafb; border-color: #d1d5db; }
        .btn-primary-lg {
          background: #22709e; color: white; font-weight: 700; padding: 1rem; border-radius: 0.75rem; transition: all 0.2s; box-shadow: 0 4px 12px rgba(34, 112, 158, 0.2);
        }
        .btn-primary-lg:hover { background: #1b5b80; transform: translateY(-1px); }
        .btn-primary-lg:disabled { opacity: 0.7; transform: none; cursor: wait; }
      `}</style>
    </div>
  );
};

export default Checkout;