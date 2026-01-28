import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, Star, Check, Shield, Truck, Clock, Heart, Share2, AlertCircle } from 'lucide-react';
import { getProductById, products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    const foundProduct = getProductById(productId);
    if (foundProduct) {
      setProduct(foundProduct);
      // Get related products from same category
    } else {
      navigate('/products');
    }
  }, [productId, navigate]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  const handleWishlist = () => {
    if (product) {
      toggleWishlist(product);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 2
    }).format(price);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-pharmacy-green border-t-transparent rounded-full" />
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const inWishlist = isInWishlist(product.id);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-main">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-pharmacy-green">Home</Link>
          <span>/</span>
          <Link to={`/category/${product.category}`} className="hover:text-pharmacy-green capitalize">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-pharmacy-navy">{product.name}</span>
        </div>

        {/* Product Details */}
        <div className="bg-white border rounded-lg p-6 mb-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Image */}
            <div>
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Thumbnail Gallery */}
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <button
                    key={i}
                    className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden border-2 border-transparent hover:border-pharmacy-green"
                  >
                    <img
                      src={product.image}
                      alt={`View ${i}`}
                      className="w-full h-full object-cover opacity-50"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div>
              {/* Category & Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                  {product.subcategory || product.category}
                </span>
                {product.prescription && (
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-full flex items-center gap-1">
                    <AlertCircle size={14} />
                    Prescription Required
                  </span>
                )}
              </div>

              {/* Name */}
              <h1 className="text-2xl md:text-3xl font-bold text-pharmacy-navy mb-3">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-gray-600">{product.rating}</span>
                <span className="text-gray-400">({product.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-pharmacy-navy">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="px-2 py-1 bg-red-100 text-red-600 text-sm rounded">
                      Save {formatPrice(product.originalPrice - product.price)}
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-6">
                {product.description}
              </p>

              {/* Stock */}
              <div className="flex items-center gap-2 mb-6">
                <div className={`w-3 h-3 rounded-full ${
                  product.stock > 20 ? 'bg-green-500' : 
                  product.stock > 0 ? 'bg-orange-500' : 'bg-red-500'
                }`} />
                <span className={`text-sm ${
                  product.stock > 20 ? 'text-green-600' : 
                  product.stock > 0 ? 'text-orange-500' : 'text-red-500'
                }`}>
                  {product.stock > 20 ? 'In Stock' : 
                   product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock'}
                </span>
              </div>

              {/* Quantity & Actions */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                {/* Quantity */}
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`flex-1 min-w-[200px] py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 ${
                    product.stock === 0
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-pharmacy-green text-pharmacy-navy hover:bg-pharmacy-green-dark'
                  }`}
                >
                  <span>Add to Cart</span>
                </button>

                {/* Wishlist */}
                <button
                  onClick={handleWishlist}
                  className={`w-12 h-12 rounded-lg border flex items-center justify-center ${
                    inWishlist 
                      ? 'bg-red-50 border-red-200 text-red-500' 
                      : 'border-gray-300 text-gray-400 hover:text-red-500'
                  }`}
                >
                  <Heart size={20} className={inWishlist ? 'fill-current' : ''} />
                </button>

                {/* Share */}
                <button className="w-12 h-12 rounded-lg border border-gray-300 text-gray-400 hover:text-pharmacy-navy flex items-center justify-center">
                  <Share2 size={20} />
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Truck className="text-pharmacy-green" size={20} />
                  <span className="text-sm text-gray-600">Free Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="text-pharmacy-green" size={20} />
                  <span className="text-sm text-gray-600">Genuine Product</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="text-pharmacy-green" size={20} />
                  <span className="text-sm text-gray-600">Same Day Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="text-pharmacy-green" size={20} />
                  <span className="text-sm text-gray-600">7-Day Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border rounded-lg mb-8">
          <div className="flex border-b">
            {['description', 'details', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-medium capitalize ${
                  activeTab === tab
                    ? 'text-pharmacy-navy border-b-2 border-pharmacy-green'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="p-6">
            {activeTab === 'description' && (
              <div className="prose max-w-none text-gray-600">
                <p>{product.description}</p>
                <p className="mt-4">
                  This product is sourced from licensed manufacturers and distributors. 
                  All products sold on Pure Life Pharmacy are 100% genuine and authentic.
                </p>
              </div>
            )}
            {activeTab === 'details' && (
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-pharmacy-navy mb-3">Product Information</h4>
                  <table className="w-full text-sm">
                    <tbody className="divide-y">
                      {product.manufacturer && (
                        <tr>
                          <td className="py-2 text-gray-500">Manufacturer</td>
                          <td className="py-2 text-gray-700">{product.manufacturer}</td>
                        </tr>
                      )}
                      {product.dosage && (
                        <tr>
                          <td className="py-2 text-gray-500">Dosage</td>
                          <td className="py-2 text-gray-700">{product.dosage}</td>
                        </tr>
                      )}
                      <tr>
                        <td className="py-2 text-gray-500">Category</td>
                        <td className="py-2 text-gray-700 capitalize">{product.category}</td>
                        </tr>
                      <tr>
                        <td className="py-2 text-gray-500">SKU</td>
                        <td className="py-2 text-gray-700">{product.id.toUpperCase()}</td>
                        </tr>
                    </tbody>
                  </table>
                </div>
                <div>
                  <h4 className="font-medium text-pharmacy-navy mb-3">Shipping Information</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Free delivery across all UAE Emirates</li>
                    <li>• Same-day delivery in Dubai (orders before 2 PM)</li>
                    <li>• 1-2 days delivery for other Emirates</li>
                    <li>• Cash on delivery available</li>
                  </ul>
                </div>
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className="text-center py-8">
                <p className="text-gray-500">Reviews coming soon</p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-pharmacy-navy mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
