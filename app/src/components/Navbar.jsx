import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; 
import { 
  Search, User, ShoppingCart, Menu, X, ChevronDown, ChevronRight,
  Phone, LogOut, Heart, Package, MapPin, UserCircle 
} from "lucide-react";

// --- MOCK DATA ---
const isAuthenticated = true; 
const user = { displayName: "EncoderBytes", email: "eb@example.com" };
const cartCount = 3;
const cartTotal = 150.00;

const MEGA_MENU_DATA = {
  medicines: {
    title: 'Medicines',
    columns: [
      { title: 'Pain Relief', items: ['Paracetamol', 'Ibuprofen', 'Aspirin', 'Naproxen'] },
      { title: 'Cold & Flu', items: ['Cough Syrup', 'Decongestants', 'Nasal Spray'] },
      { title: 'Allergy', items: ['Antihistamines', 'Eye Drops', 'Eczema Care'] },
      { title: 'Digestive', items: ['Antacids', 'Probiotics', 'Fiber'] }
    ]
  },
  beauty: {
    title: 'Beauty & Personal Care',
    columns: [
      { title: 'Skincare', items: ['Face Wash', 'Moisturizers', 'Sunscreen', 'Serums'] },
      { title: 'Hair Care', items: ['Shampoo', 'Conditioner', 'Hair Oil'] },
      { title: 'Body Care', items: ['Body Wash', 'Lotions', 'Deodorants'] }
    ]
  },
  vitamins: {
    title: 'Vitamins & Supplements',
    columns: [
      { title: 'Essential', items: ['Vitamin C', 'Vitamin D', 'Multivitamins'] },
      { title: 'Minerals', items: ['Calcium', 'Iron', 'Zinc', 'Magnesium'] },
      { title: 'Herbal', items: ['Turmeric', 'Ashwagandha', 'Green Tea'] }
    ]
  },
  mother: {
    title: 'Mother & Baby',
    columns: [
      { title: 'Baby Care', items: ['Diapers', 'Wipes', 'Baby Lotion'] },
      { title: 'Feeding', items: ['Formula', 'Bottles', 'Breast Pumps'] },
      { title: 'Maternity', items: ['Prenatal Vitamins', 'Stretch Marks Cream'] }
    ]
  },
  devices: {
    title: 'Medical Devices',
    columns: [
      { title: 'Monitoring', items: ['BP Monitors', 'Glucometers', 'Thermometers'] },
      { title: 'Respiratory', items: ['Nebulizers', 'Inhalers', 'Oxygen'] },
      { title: 'Supports', items: ['Wheelchairs', 'Walkers', 'Braces'] }
    ]
  },
};

const MAIN_NAV_ITEMS = [
  { key: 'home', label: 'Home', path: '/' }, // Changed Products to Home
  { key: 'medicines', label: 'Medicines', path: '/category/medicines' },
  { key: 'beauty', label: 'Beauty & Care', path: '/category/beauty' },
  { key: 'vitamins', label: 'Vitamins', path: '/category/vitamins' },
  { key: 'mother', label: 'Mother & Baby', path: '/category/mother' },
  { key: 'devices', label: 'Devices', path: '/category/devices' }
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  
  const navigate = useNavigate(); 
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setExpandedMobileMenu(null);
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    setShowUserDropdown(false);
    navigate('/');
  };

  const toggleMobileCategory = (key) => {
    setExpandedMobileMenu(expandedMobileMenu === key ? null : key);
  };

  return (
    <header className="bg-white w-full sticky top-0 z-50 shadow-sm font-sans">
      
      {/* 1. TOP UTILITY BAR */}
      <div className="bg-primary text-white text-xs py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium">
              <span>🚚</span>
              <span className="hidden sm:inline">Free Home Delivery across UAE</span>
              <span className="sm:hidden">Free Delivery</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5 opacity-90">
              <Phone size={13} />
              <span>+971 50 202 1155</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/track-order" className="hover:text-secondary transition-colors">Track Order</Link>
            <Link to="/about" className="hover:text-secondary transition-colors hidden sm:block">About</Link>
            <Link to="/contact" className="hover:text-secondary transition-colors hidden sm:block">Contact</Link>
            <Link to="/delivery" className="hover:text-secondary transition-colors hidden sm:block">Delivery Info</Link>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER */}
      <div className="border-b border-gray-100 bg-white py-3 md:py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 md:gap-8">
            
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
               <div className="relative h-14 md:h-16 w-auto flex items-center">
                 <img 
                   src="/logo.jpeg" 
                   alt="Pure Life Pharmacy"
                   className="h-full w-auto object-contain"
                 />
               </div>
            </Link>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl relative group">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search medicines, brands, wellness..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-5 pr-14 py-3 border border-gray-200 rounded-full bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm shadow-sm group-hover:shadow-md"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 bg-secondary rounded-full flex items-center justify-center text-white hover:bg-opacity-90 transition-all shadow-sm hover:scale-105"
                >
                  <Search size={18} />
                </button>
              </div>
            </form>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-6">
              
              {/* Account Dropdown */}
              <div className="relative z-50" ref={dropdownRef}>
                <button
                  onClick={() => isAuthenticated ? setShowUserDropdown(!showUserDropdown) : navigate('/login')}
                  className="flex items-center gap-2 group p-1"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <User size={22} />
                  </div>
                  <div className="hidden lg:flex flex-col items-start leading-none">
                    <span className="text-[10px] text-gray-500 font-medium">Welcome</span>
                    <span className="text-xs font-bold text-primary truncate max-w-[80px]">
                      {isAuthenticated ? user.displayName.split(' ')[0] : 'Sign In'}
                    </span>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {showUserDropdown && isAuthenticated && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    <div className="bg-primary/5 p-4 border-b border-primary/10">
                      <p className="font-bold text-primary">{user?.displayName}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <div className="py-2">
                      <Link to="/account" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors">
                        <UserCircle size={16}/> Dashboard
                      </Link>
                      <Link to="/account/orders" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors">
                        <Package size={16} /> My Orders
                      </Link>
                      <Link to="/account/wishlist" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors">
                        <Heart size={16} /> My Wishlist
                      </Link>
                      <Link to="/account/addresses" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors">
                        <MapPin size={16} /> Addresses
                      </Link>
                    </div>
                    <div className="border-t border-gray-100 py-2">
                      <button onClick={handleLogout} className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Cart */}
              <Link to="/cart" className="flex items-center gap-2 group p-1">
                <div className="relative w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <ShoppingCart size={22} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                      {cartCount}
                    </span>
                  )}
                </div>
                <div className="hidden lg:flex flex-col items-start leading-none">
                  <span className="text-[10px] text-gray-500 font-medium">My Cart</span>
                  <span className="text-xs font-bold text-primary">AED {cartTotal}</span>
                </div>
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-primary hover:bg-gray-50 rounded-md"
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
          
          {/* Mobile Search Bar */}
          <form onSubmit={handleSearch} className="md:hidden mt-4 pb-2 relative">
             <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary shadow-sm text-sm"
              />
               <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-primary p-1">
                <Search size={20} />
              </button>
          </form>
        </div>
      </div>

      {/* 3. MEGA MENU NAVIGATION (Desktop) */}
      <nav className="hidden lg:block border-b border-gray-100 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center justify-center gap-1 xl:gap-4">
            {MAIN_NAV_ITEMS.map((item) => (
              <li
                key={item.key}
                onMouseEnter={() => setActiveMegaMenu(item.key)}
                onMouseLeave={() => setActiveMegaMenu(null)}
                className="group"
              >
                <Link
                  to={item.path} 
                  className={`
                    flex items-center gap-1 px-3 py-3 text-sm font-medium transition-colors border-b-2 border-transparent
                    ${activeMegaMenu === item.key 
                      ? "text-primary border-primary bg-gray-50/50" 
                      : "text-gray-600 hover:text-primary hover:border-gray-200"
                    }
                    lg:text-[13px] xl:text-sm whitespace-nowrap
                  `}
                >
                  {item.label}
                  {item.key !== 'home' && ( // Only show chevron for items with dropdowns
                    <ChevronDown size={14} className={`transition-transform duration-200 ${activeMegaMenu === item.key ? 'rotate-180' : ''}`} />
                  )}
                </Link>

                {/* Dropdown Panel */}
                {activeMegaMenu === item.key && MEGA_MENU_DATA[item.key] && (
                  <div className="absolute left-0 top-full w-full bg-white border-t border-gray-100 shadow-xl z-40 py-8 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="max-w-7xl mx-auto px-8">
                      <div className="flex gap-12">
                        <div className="w-1/5 pr-4 border-r border-gray-100">
                           <h3 className="text-xl font-bold text-primary mb-2">{MEGA_MENU_DATA[item.key].title}</h3>
                           <Link to={item.path} className="text-sm text-secondary font-medium hover:underline">
                             View all products &rarr;
                           </Link>
                        </div>
                        
                        <div className="flex-1 grid grid-cols-4 gap-8">
                          {MEGA_MENU_DATA[item.key].columns.map((column, idx) => (
                            <div key={idx}>
                              <h4 className="font-semibold text-gray-900 text-sm mb-4 uppercase tracking-wider">{column.title}</h4>
                              <ul className="space-y-2.5">
                                {column.items.map((subItem, subIdx) => (
                                  <li key={subIdx}>
                                    <Link
                                      to={`/products?search=${encodeURIComponent(subItem)}`}
                                      className="text-sm text-gray-500 hover:text-secondary hover:pl-1 transition-all"
                                    >
                                      {subItem}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* 4. MOBILE MENU DRAWER */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div 
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>

          <div className="absolute left-0 top-0 h-full w-[85%] max-w-[320px] bg-white shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-primary text-white">
              <span className="font-bold text-lg">Menu</span>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              {MAIN_NAV_ITEMS.map((item) => (
                <div key={item.key} className="mb-2 border-b border-gray-50 pb-2">
                   {/* Main Category Header */}
                   <div 
                     className="flex items-center justify-between py-2 cursor-pointer"
                     onClick={() => item.key === 'home' ? navigate('/') : toggleMobileCategory(item.key)}
                   >
                      <span className={`font-bold text-base ${expandedMobileMenu === item.key ? 'text-primary' : 'text-gray-800'}`}>
                        {item.label}
                      </span>
                      {item.key !== 'home' && (
                        <ChevronDown 
                          size={18} 
                          className={`text-gray-400 transition-transform duration-200 ${expandedMobileMenu === item.key ? 'rotate-180 text-primary' : ''}`}
                        />
                      )}
                   </div>

                   {/* Sub-Items (Accordion Body) */}
                   {expandedMobileMenu === item.key && MEGA_MENU_DATA[item.key] && (
                     <div className="pl-2 mt-1 space-y-4 animate-in slide-in-from-top-2 duration-200 bg-gray-50/50 rounded-lg p-3">
                        {MEGA_MENU_DATA[item.key]?.columns.map((col, idx) => (
                          <div key={idx} className="mb-3 last:mb-0">
                             <h5 className="text-xs font-bold text-secondary uppercase mb-2 flex items-center gap-1">
                                {col.title}
                             </h5>
                             <div className="flex flex-col gap-2 pl-2 border-l-2 border-gray-200">
                               {col.items.map((sub, subIdx) => (
                                 <Link 
                                   key={subIdx} 
                                   to={`/products?search=${encodeURIComponent(sub)}`}
                                   onClick={() => setIsMobileMenuOpen(false)}
                                   className="text-sm text-gray-600 hover:text-primary"
                                 >
                                   {sub}
                                 </Link>
                               ))}
                             </div>
                          </div>
                        ))}
                        <Link 
                          to={item.path} 
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-1 text-sm font-semibold text-primary mt-3 pt-2 border-t border-gray-200"
                        >
                          View All in {item.label} <ChevronRight size={14} />
                        </Link>
                     </div>
                   )}
                </div>
              ))}
              
              <div className="mt-6 pt-2 space-y-3">
                <Link to="/about" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 text-gray-700 font-medium">
                  About Us
                </Link>
                <Link to="/contact" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 text-gray-700 font-medium">
                  Contact & Support
                </Link>
                <Link to="/delivery" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 text-gray-700 font-medium">
                  Delivery Information
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;