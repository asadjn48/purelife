import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Truck, 
  Shield, 
  Clock, 
  RotateCcw, 
  Phone, 
  ChevronRight,
  Star,
  Package,
  Heart,
  Stethoscope
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';

const Home = () => {
  const [cartOpen, setCartOpen] = useState(false);

  // Get featured products
  const bestsellers = products.filter(p => p.tags?.includes('bestseller')).slice(0, 4);
  const newArrivals = products.slice(0, 4);

  const categoryGrid = [
    { name: 'Medicines', slug: 'medicines', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80', count: '500+' },
    { name: 'Vitamins', slug: 'vitamins', image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&q=80', count: '200+' },
    { name: 'Personal Care', slug: 'personal-care', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&q=80', count: '300+' },
    { name: 'Medical Devices', slug: 'devices', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&q=80', count: '150+' },
    { name: 'Mother & Baby', slug: 'mother', image: 'https://images.unsplash.com/photo-1544367563-12123d8965cd?w=400&q=80', count: '250+' },
    { name: 'Health & Wellness', slug: 'wellness', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80', count: '400+' }
  ];

  const trustBadges = [
    { icon: Shield, title: 'Genuine Products', desc: '100% Authentic' },
    { icon: Truck, title: 'Free Delivery', desc: 'All UAE Emirates' },
    { icon: Clock, title: '24/7 Support', desc: 'Pharmacist Available' },
    { icon: RotateCcw, title: 'Easy Returns', desc: '7 Days Return' }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 2
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-pharmacy-navy">
        <div className="container-main py-12 md:py-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm mb-6">
                <span className="text-pharmacy-green">✓</span>
                <span>Licensed by DHA & MOHAP UAE</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Your Health,<br />
                <span className="text-pharmacy-green">Our Priority</span>
              </h1>
              <p className="text-lg text-white/80 mb-8 max-w-lg">
                Genuine medicines, wellness products, and healthcare essentials delivered 
                to your doorstep across all Emirates in the UAE.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/products" className="btn-primary">
                  Shop Now
                </Link>
                <a 
                  href="https://wa.me/97140000000" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-white text-white rounded hover:bg-white/10"
                >
                  <Phone size={18} />
                  <span>Speak to Pharmacist</span>
                </a>
              </div>

              {/* Trust Stats */}
              <div className="flex gap-8 mt-10 pt-8 border-t border-white/20">
                <div>
                  <p className="text-3xl font-bold text-pharmacy-green">50K+</p>
                  <p className="text-sm text-white/70">Happy Customers</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-pharmacy-green">10K+</p>
                  <p className="text-sm text-white/70">Products</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-pharmacy-green">4.8</p>
                  <p className="text-sm text-white/70">Rating</p>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="hidden lg:block">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80" 
                  alt="Pharmacy Products"
                  className="rounded-lg shadow-xl"
                />
                {/* Floating Badge */}
                <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-lg shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Truck className="text-green-600" size={24} />
                    </div>
                    <div>
                      <p className="font-semibold text-pharmacy-navy">Free Delivery</p>
                      <p className="text-sm text-gray-500">All across UAE</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-gray-50 border-y">
        <div className="container-main py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustBadges.map((badge, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-pharmacy-green/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <badge.icon className="text-pharmacy-green" size={20} />
                </div>
                <div>
                  <p className="font-medium text-pharmacy-navy text-sm">{badge.title}</p>
                  <p className="text-xs text-gray-500">{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="section">
        <div className="container-main">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-pharmacy-navy">Shop by Category</h2>
            <Link to="/products" className="text-pharmacy-green hover:underline flex items-center gap-1">
              View All <ChevronRight size={18} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categoryGrid.map((cat, idx) => (
              <Link 
                key={idx} 
                to={`/category/${cat.slug}`}
                className="group"
              >
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 mb-3">
                  <img 
                    src={cat.image} 
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:opacity-90"
                  />
                </div>
                <h3 className="font-medium text-pharmacy-navy text-sm group-hover:text-pharmacy-green">
                  {cat.name}
                </h3>
                <p className="text-xs text-gray-500">{cat.count} products</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Free Delivery Banner */}
      <section className="bg-pharmacy-green">
        <div className="container-main py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Truck className="text-pharmacy-navy" size={40} />
              <div>
                <h3 className="text-xl font-bold text-pharmacy-navy">FREE Delivery on All Orders</h3>
                <p className="text-pharmacy-navy/80">No minimum order value required</p>
              </div>
            </div>
            <Link to="/products" className="px-6 py-3 bg-pharmacy-navy text-white rounded font-medium hover:bg-pharmacy-navy-light">
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="section bg-gray-50">
        <div className="container-main">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-pharmacy-navy">Bestsellers</h2>
              <p className="text-gray-600 mt-1">Most popular products our customers love</p>
            </div>
            <Link to="/products" className="text-pharmacy-green hover:underline flex items-center gap-1">
              View All <ChevronRight size={18} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Prescription Support */}
      <section className="section">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-pharmacy-green/10 px-4 py-2 rounded-full text-sm mb-4">
                <Stethoscope className="text-pharmacy-green" size={16} />
                <span className="text-pharmacy-navy">Prescription Services</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-pharmacy-navy mb-4">
                Upload Your Prescription
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Need prescription medicines? Simply upload your prescription and our licensed 
                pharmacists will verify and process your order. We accept prescriptions from 
                all licensed UAE healthcare providers.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">Quick verification by licensed pharmacists</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">Secure and confidential handling</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">Same-day delivery for verified orders</span>
                </li>
              </ul>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="https://wa.me/97140000000" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Upload Prescription
                </a>
                <Link to="/contact" className="btn-outline">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <img 
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80" 
                alt="Prescription Service"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="section bg-gray-50">
        <div className="container-main">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-pharmacy-navy">New Arrivals</h2>
              <p className="text-gray-600 mt-1">Check out our latest products</p>
            </div>
            <Link to="/products" className="text-pharmacy-green hover:underline flex items-center gap-1">
              View All <ChevronRight size={18} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Customer Trust */}
      <section className="section">
        <div className="container-main">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-pharmacy-navy mb-4">
              Why Choose Pure Life Pharmacy?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the best healthcare experience for you and your family.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-pharmacy-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-pharmacy-green" size={32} />
              </div>
              <h3 className="font-semibold text-pharmacy-navy mb-2">Licensed & Regulated</h3>
              <p className="text-gray-600 text-sm">
                Fully licensed by Dubai Health Authority (DHA) and Ministry of Health & Prevention (MOHAP).
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pharmacy-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="text-pharmacy-green" size={32} />
              </div>
              <h3 className="font-semibold text-pharmacy-navy mb-2">Genuine Products</h3>
              <p className="text-gray-600 text-sm">
                All products are 100% authentic and sourced directly from licensed manufacturers.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pharmacy-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-pharmacy-green" size={32} />
              </div>
              <h3 className="font-semibold text-pharmacy-navy mb-2">Expert Support</h3>
              <p className="text-gray-600 text-sm">
                Our licensed pharmacists are available 24/7 to answer your health questions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-pharmacy-navy">
        <div className="container-main">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              What Our Customers Say
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Ahmed H.',
                location: 'Dubai',
                text: 'Fast delivery and genuine products. The pharmacists are very helpful and professional.',
                rating: 5
              },
              {
                name: 'Sarah M.',
                location: 'Abu Dhabi',
                text: 'I love the free delivery and the wide range of products. Highly recommended!',
                rating: 5
              },
              {
                name: 'Mohammed K.',
                location: 'Sharjah',
                text: 'Great customer service. They helped me find the right vitamins for my family.',
                rating: 5
              }
            ].map((review, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur p-6 rounded-lg">
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-yellow-400" size={16} />
                  ))}
                </div>
                <p className="text-white/90 mb-4">"{review.text}"</p>
                <div>
                  <p className="font-medium text-white">{review.name}</p>
                  <p className="text-sm text-white/60">{review.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-pharmacy-green">
        <div className="container-main">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-pharmacy-navy mb-4">
              Start Your Health Journey Today
            </h2>
            <p className="text-pharmacy-navy/80 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust Pure Life Pharmacy for their healthcare needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/products" className="px-8 py-4 bg-pharmacy-navy text-white rounded font-medium hover:bg-pharmacy-navy-light">
                Shop Now
              </Link>
              <Link to="/about" className="px-8 py-4 border-2 border-pharmacy-navy text-pharmacy-navy rounded font-medium hover:bg-pharmacy-navy hover:text-white">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
