import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Plus, Minus, ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const CartDrawer = ({ isOpen, onClose }) => {
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
    onClose();
    if (isAuthenticated) {
      navigate('/checkout');
    } else {
      navigate('/login', { state: { from: '/checkout' } });
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <ShoppingCart className="text-pharmacy-navy" size={24} />
            <h2 className="font-semibold text-lg text-pharmacy-navy">Your Cart</h2>
            <span className="bg-pharmacy-green text-pharmacy-navy text-sm font-medium px-3 py-1 rounded-full">
              {items.length} items
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        {/* Cart Items */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <ShoppingCart size={32} className="text-gray-400" />
            </div>
            <h3 className="font-semibold text-xl text-pharmacy-navy mb-2">
              Your cart is empty
            </h3>
            <p className="text-gray-500 mb-6">
              Looks like you haven't added any products yet.
            </p>
            <button
              onClick={onClose}
              className="btn-primary"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3 border-b"
                >
                  {/* Image */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <Link 
                      to={`/product/${item.product.id}`}
                      onClick={onClose}
                      className="font-medium text-pharmacy-navy text-sm line-clamp-2 hover:text-pharmacy-green"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-pharmacy-green-dark font-semibold mt-1">
                      {formatPrice(item.product.price)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2 border rounded">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-2 text-gray-400 hover:text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={clearCart}
                className="text-sm text-red-500 hover:underline mt-4"
              >
                Clear all items
              </button>
            </div>

            {/* Footer - Summary */}
            <div className="border-t p-4 bg-gray-50">
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

              {/* Summary */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(getSubtotal())}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span>{getDeliveryFee() === 0 ? 'FREE' : formatPrice(getDeliveryFee())}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg text-pharmacy-navy pt-2 border-t">
                  <span>Total</span>
                  <span>{formatPrice(getTotal())}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full btn-primary py-4"
              >
                Proceed to Checkout
              </button>

              {/* Continue Shopping */}
              <button
                onClick={onClose}
                className="w-full text-center text-gray-500 hover:text-pharmacy-navy text-sm mt-3"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
