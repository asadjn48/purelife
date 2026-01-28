import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, X } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

const Wishlist = () => {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
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
      <div className="bg-white border rounded-lg p-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-pharmacy-navy mb-2">My Wishlist</h1>
          <p className="text-gray-600">{items.length} {items.length === 1 ? 'product' : 'products'} saved</p>
        </div>
        {items.length > 0 && (
          <button
            onClick={clearWishlist}
            className="text-red-500 hover:underline text-sm"
          >
            Clear All
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="bg-white border rounded-lg p-12 text-center">
          <Heart className="mx-auto text-gray-300 mb-4" size={64} />
          <h3 className="text-lg font-medium text-pharmacy-navy mb-2">Your wishlist is empty</h3>
          <p className="text-gray-500 mb-4">Save products you like for later</p>
          <Link to="/products" className="btn-primary inline-block">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((product) => (
            <div key={product.id} className="bg-white border rounded-lg overflow-hidden hover:border-pharmacy-green">
              {/* Image */}
              <Link to={`/product/${product.id}`} className="block relative aspect-square bg-gray-50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.prescription && (
                  <span className="absolute top-3 left-3 px-2 py-1 bg-pharmacy-navy text-white text-xs font-medium rounded">
                    Rx Required
                  </span>
                )}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    removeFromWishlist(product.id);
                  }}
                  className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center text-red-500 hover:bg-red-50"
                >
                  <X size={16} />
                </button>
              </Link>

              {/* Content */}
              <div className="p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                  {product.subcategory || product.category}
                </p>
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-medium text-pharmacy-navy text-sm line-clamp-2 mb-2 hover:text-pharmacy-green">
                    {product.name}
                  </h3>
                </Link>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="font-bold text-lg text-pharmacy-navy">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Stock & Actions */}
                <div className="flex items-center justify-between">
                  <span className={`text-xs ${
                    product.stock > 20 ? 'text-green-600' : 
                    product.stock > 0 ? 'text-orange-500' : 'text-red-500'
                  }`}>
                    {product.stock > 20 ? 'In Stock' : 
                     product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock'}
                  </span>

                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                    className={`flex items-center gap-2 px-3 py-2 rounded text-sm font-medium ${
                      product.stock === 0
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-pharmacy-green text-pharmacy-navy hover:bg-pharmacy-green-dark'
                    }`}
                  >
                    <ShoppingCart size={14} />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
