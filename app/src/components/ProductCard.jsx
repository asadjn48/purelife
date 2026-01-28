import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Check, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import FeedbackModal from './ui/FeedbackModal'; 

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToast } = useToast();
  const navigate = useNavigate();

  // Local state
  const [isAdding, setIsAdding] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // 1. Logic
    addToCart(product, 1);
    
    // 2. Visual Button Feedback (Make it clearly visible)
    setIsAdding(true);
    setTimeout(() => setIsAdding(false), 1500); // 1.5 seconds delay

    // 3. Trigger Global Toast
    addToast(
      `Added ${product.name} to your cart`, 
      'success',
      { label: 'View Cart', onClick: () => navigate('/cart') }
    );
  };

  // Special "Feedback" feature on card
  const handleFeedbackClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowFeedbackModal(true);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    if (!isInWishlist(product.id)) {
      addToast('Added to Wishlist', 'info');
    } else {
      addToast('Removed from Wishlist', 'info');
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-AE', { style: 'currency', currency: 'AED' }).format(price);
  };

  return (
    <>
      <FeedbackModal isOpen={showFeedbackModal} onClose={() => setShowFeedbackModal(false)} />

      <div className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex flex-col h-full">
        
        {/* --- Image --- */}
        <Link to={`/product/${product.id}`} className="relative block aspect-[4/3] bg-gray-50 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500 ease-out"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />

          {/* Wishlist Btn */}
          <button
            onClick={handleWishlist}
            className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow-sm z-10 transition-transform hover:scale-110 ${
              isInWishlist(product.id) ? 'bg-red-50 text-red-500' : 'bg-white text-gray-400 hover:text-red-500'
            }`}
          >
            <Heart size={18} className={isInWishlist(product.id) ? 'fill-current' : ''} />
          </button>
        </Link>

        {/* --- Content --- */}
        <div className="p-4 flex flex-col flex-1">
          <p className="text-[10px] font-bold text-secondary uppercase tracking-wider mb-1.5">
            {product.category}
          </p>
          
          <Link to={`/product/${product.id}`} className="block mb-2">
            <h3 className="font-semibold text-gray-800 text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
          </Link>

          {/* Price & Stock */}
          <div className="mt-auto pt-2">
            <div className="flex items-center justify-between mb-3">
              <span className="font-bold text-lg text-primary">{formatPrice(product.price)}</span>
              {/* Optional: Feedback Trigger Button on Card */}
              <button 
                onClick={handleFeedbackClick} 
                className="text-[10px] text-gray-400 hover:text-primary flex items-center gap-1 underline decoration-dotted"
              >
                <MessageCircle size={10} /> Feedback
              </button>
            </div>

            {/* --- ADD TO CART BUTTON WITH VISIBLE FEEDBACK --- */}
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`
                w-full relative flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-300 overflow-hidden
                ${product.stock === 0 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : isAdding 
                    ? '!bg-green-600 text-white shadow-green-200 shadow-lg scale-95' 
                    : 'bg-primary text-white hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5'
                }
              `}
            >
              <div className={`flex items-center gap-2 transition-all duration-300 ${isAdding ? 'translate-y-[-150%] absolute' : 'translate-y-0'}`}>
                <ShoppingCart size={18} />
                <span>Add to Cart</span>
              </div>
              
              <div className={`flex items-center gap-2 absolute transition-all duration-300 ${isAdding ? 'translate-y-0' : 'translate-y-[150%]'}`}>
                <Check size={20} className="animate-bounce" />
                <span>Added!</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;