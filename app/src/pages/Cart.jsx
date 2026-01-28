import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    getSubtotal,
    getDeliveryFee,
    getTotal,
    clearCart
  } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 2
    }).format(price);
  };

  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate('/checkout');
    } else {
      navigate('/login', { state: { from: '/checkout' } });
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container-main">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart size={48} className="text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold text-pharmacy-navy mb-2">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-6">Looks like you haven't added any products yet.</p>
            <Link to="/products" className="btn-primary inline-block">
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-main">
        <h1 className="text-2xl md:text-3xl font-bold text-pharmacy-navy mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white border rounded-lg overflow-hidden">
              {/* Header */}
              <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
                <span className="font-medium text-gray-700">{items.length} items</span>
                <button
                  onClick={clearCart}
                  className="text-red-500 hover:underline text-sm"
                >
                  Clear Cart
                </button>
              </div>

              {/* Items */}
              <div className="divide-y">
                {items.map((item) => (
                  <div key={item.product.id} className="p-4 flex gap-4">
                    {/* Image */}
                    <Link 
                      to={`/product/${item.product.id}`}
                      className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <Link 
                        to={`/product/${item.product.id}`}
                        className="font-medium text-pharmacy-navy hover:text-pharmacy-green line-clamp-2"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-gray-500 mt-1">
                        {item.product.subcategory || item.product.category}
                      </p>
                      <p className="font-semibold text-pharmacy-green-dark mt-2">
                        {formatPrice(item.product.price)}
                      </p>

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity */}
                        <div className="flex items-center border rounded">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-10 text-center text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="flex items-center gap-1 text-gray-400 hover:text-red-500 text-sm"
                        >
                          <Trash2 size={16} />
                          <span className="hidden sm:inline">Remove</span>
                        </button>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="text-right hidden sm:block">
                      <p className="font-semibold text-pharmacy-navy">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Continue Shopping */}
            <Link 
              to="/products" 
              className="inline-flex items-center gap-2 mt-4 text-pharmacy-green hover:underline"
            >
              <ArrowRight size={18} className="rotate-180" />
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border rounded-lg p-6 sticky top-4">
              <h2 className="text-lg font-semibold text-pharmacy-navy mb-4">Order Summary</h2>

              {/* Delivery Notice */}
              {getDeliveryFee() === 0 ? (
                <div className="p-3 bg-green-50 text-green-700 text-sm rounded mb-4 flex items-center gap-2">
                  <span>🎉</span>
                  <span>You qualify for FREE delivery!</span>
                </div>
              ) : (
                <div className="p-3 bg-blue-50 text-blue-700 text-sm rounded mb-4">
                  Add {formatPrice(100 - getSubtotal())} more for FREE delivery
                </div>
              )}

              {/* Totals */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(getSubtotal())}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span>{getDeliveryFee() === 0 ? 'FREE' : formatPrice(getDeliveryFee())}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-semibold text-lg text-pharmacy-navy">
                    <span>Total</span>
                    <span>{formatPrice(getTotal())}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Including VAT</p>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full btn-primary py-4 mb-4"
              >
                Proceed to Checkout
              </button>

              {/* Payment Methods */}
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-2">We Accept:</p>
                <div className="flex justify-center gap-2">
                  <span className="px-2 py-1 bg-gray-100 rounded text-xs">COD</span>
                  <span className="px-2 py-1 bg-gray-100 rounded text-xs">Visa</span>
                  <span className="px-2 py-1 bg-gray-100 rounded text-xs">Mastercard</span>
                  <span className="px-2 py-1 bg-gray-100 rounded text-xs">Apple Pay</span>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="bg-white border rounded p-3 text-center">
                <Package className="mx-auto text-pharmacy-green mb-1" size={20} />
                <p className="text-xs text-gray-600">Genuine Products</p>
              </div>
              <div className="bg-white border rounded p-3 text-center">
                <ArrowRight className="mx-auto text-pharmacy-green mb-1" size={20} />
                <p className="text-xs text-gray-600">Free Returns</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
