import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, Mail, MapPin, Clock, Shield, Truck, 
  RotateCcw, CreditCard, Facebook, Instagram, Twitter, Send
} from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Delivery Information', href: '/delivery' },
    { name: 'Returns & Refunds', href: '/returns' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' }
  ];

  const categories = [
    { name: 'Medicines', href: '/category/medicines' },
    { name: 'Beauty & Personal Care', href: '/category/beauty' },
    { name: 'Vitamins & Supplements', href: '/category/vitamins' },
    { name: 'Mother & Baby', href: '/category/mother' },
    { name: 'Medical Devices', href: '/category/devices' }
  ];

  const supportLinks = [
    { name: 'FAQs', href: '/faqs' },
    { name: 'Track Order', href: '/track-order' },
    { name: 'Upload Prescription', href: '/upload' },
    { name: 'Store Locator', href: '/stores' }
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-200 font-sans">
      
      {/* 1. TRUST BAR (Responsive Grid) */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            
            {/* Item 1 */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50/50 hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center flex-shrink-0">
                <Shield size={24} />
              </div>
              <div>
                <p className="font-bold text-gray-800 text-sm">Genuine Products</p>
                <p className="text-xs text-gray-500">100% Authentic Sourced</p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50/50 hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-full flex items-center justify-center flex-shrink-0">
                <Truck size={24} />
              </div>
              <div>
                <p className="font-bold text-gray-800 text-sm">Free Home Delivery</p>
                <p className="text-xs text-gray-500">Across UAE on orders 100+</p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50/50 hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <RotateCcw size={24} />
              </div>
              <div>
                <p className="font-bold text-gray-800 text-sm">Easy Returns</p>
                <p className="text-xs text-gray-500">Hassle-free 7 days return</p>
              </div>
            </div>

            {/* Item 4 */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50/50 hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock size={24} />
              </div>
              <div>
                <p className="font-bold text-gray-800 text-sm">24/7 Support</p>
                <p className="text-xs text-gray-500">Pharmacist always available</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 2. MAIN FOOTER CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Column 1: Brand & Newsletter (Span 4 cols) */}
          <div className="lg:col-span-4 space-y-2">
            <Link to="/" className="inline-block">
              <img 
                src="/logo.jpeg" 
                alt="Pure Life Pharmacy" 
                className="h-20 w-auto object-contain mix-blend-multiply"
              />
            </Link>
            
            <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
              Your trusted partner for health and wellness in the UAE. We deliver genuine medicines, vitamins, and care products directly to your doorstep with care and speed.
            </p>

            {/* Newsletter Input */}
            <div className="bg-white p-1.5 rounded-lg border border-gray-200 shadow-sm flex max-w-xs">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 bg-transparent px-3 text-sm outline-none text-gray-700 placeholder:text-gray-400"
              />
              <button className="bg-primary hover:bg-primary/90 text-white p-2 rounded-md transition-colors">
                <Send size={16} />
              </button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-sky-50 text-sky-500 flex items-center justify-center hover:bg-sky-500 hover:text-white transition-all">
                <Twitter size={16} />
              </a>
            </div>
          </div>

          {/* Column 2: Categories (Span 2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-gray-900 mb-6">Categories</h4>
            <ul className="space-y-3">
              {categories.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-gray-600 hover:text-secondary hover:pl-2 transition-all block">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links (Span 2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-gray-900 mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-gray-600 hover:text-primary hover:pl-2 transition-all block">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Support (Span 4 cols) */}
          <div className="lg:col-span-4">
             <h4 className="font-bold text-gray-900 mb-6">Contact Support</h4>
             <ul className="space-y-4 mb-6">
                <li className="flex items-start gap-3 text-sm text-gray-600">
                  <MapPin className="text-primary shrink-0 mt-0.5" size={18} />
                  <span>
                    Pure Life Pharmacy, Building 40,<br /> 
                    Sheikh Zayed Road, Dubai, UAE
                  </span>
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-600">
                  <Phone className="text-primary shrink-0" size={18} />
                  <span className="font-medium">+971 4 000 0000</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-600">
                  <Mail className="text-primary shrink-0" size={18} />
                  <a href="mailto:care@purelife.ae" className="hover:text-primary">care@purelife.ae</a>
                </li>
             </ul>

             {/* WhatsApp Button */}
             <a
               href="https://wa.me/97140000000"
               target="_blank"
               rel="noopener noreferrer"
               className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white text-sm font-bold rounded-xl hover:bg-[#20bd5a] transition-colors shadow-lg shadow-green-100"
             >
               <Phone size={18} />
               <span>Chat on WhatsApp</span>
             </a>
          </div>

        </div>
      </div>

      {/* 3. BOTTOM BAR (Payments & Copyright) */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Payment Methods -  */}
            <div className="flex flex-wrap justify-center gap-3 opacity-80">
               <div className="h-8 px-2 border rounded flex items-center bg-white" title="Visa">
                 <span className="font-bold text-blue-700 italic">VISA</span>
               </div>
               <div className="h-8 px-2 border rounded flex items-center bg-white" title="Mastercard">
                  <div className="flex -space-x-1">
                    <div className="w-4 h-4 rounded-full bg-red-500 opacity-80"></div>
                    <div className="w-4 h-4 rounded-full bg-yellow-500 opacity-80"></div>
                  </div>
               </div>
               <div className="h-8 px-2 border rounded flex items-center bg-white gap-1" title="Apple Pay">
                  <span className="font-medium text-black">Pay</span>
               </div>
               <div className="h-8 px-3 border rounded flex items-center bg-white text-xs font-bold text-gray-600" title="Cash on Delivery">
                  COD
               </div>
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} <span className="font-semibold text-primary">Pure Life Pharmacy</span>. All rights reserved.
              </p>
              <p className="text-[10px] text-gray-400 mt-1">
                Licensed by DHA & MOHAP UAE
              </p>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;