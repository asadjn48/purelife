import React from 'react';
import { Search, Filter, X, ChevronDown } from 'lucide-react';

const ProductFilters = ({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  showFilters,
  onToggleFilters,
  priceRange,
  onPriceChange,
  categories,
  selectedCategory,
  onCategoryChange,
  onClearFilters,
  totalResults
}) => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm mb-8 transition-all duration-300">
      <div className="flex flex-col md:flex-row gap-4">
        
        {/* Search Input */}
        <div className="flex-1 relative group">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
        </div>

        <div className="flex gap-3">
          {/* Custom Styled Select */}
          <div className="relative min-w-[180px]">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full appearance-none pl-4 pr-10 py-3 bg-primary/5 border border-primary/10 rounded-xl text-sm font-semibold text-primary outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer hover:bg-primary/10 transition-colors"
            >
              <option value="featured">✨ Featured</option>
              <option value="price-low">💰 Price: Low to High</option>
              <option value="price-high">💎 Price: High to Low</option>
              <option value="rating">⭐ Highest Rated</option>
              <option value="name">🔤 Name A-Z</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-primary pointer-events-none" />
          </div>

          {/* Filter Toggle Button */}
          <button
            onClick={onToggleFilters}
            className={`flex items-center gap-2 px-5 py-3 border rounded-xl text-sm font-semibold transition-all shadow-sm ${
              showFilters 
                ? 'bg-primary text-white border-primary shadow-primary/30' 
                : 'bg-white border-gray-200 text-gray-700 hover:border-primary/50 hover:text-primary'
            }`}
          >
            <Filter size={18} />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>
      </div>

      {/* Expanded Filter Area */}
      {showFilters && (
        <div className="mt-6 pt-6 border-t border-gray-100 animate-in slide-in-from-top-2 duration-300">
          <div className="grid md:grid-cols-12 gap-8">
            
            {/* Categories (Span 8) */}
            <div className="md:col-span-8">
              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                Categories
                <span className="text-xs font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">Select one</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => onCategoryChange('')}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                    !selectedCategory 
                      ? 'bg-secondary text-white border-secondary shadow-md' 
                      : 'bg-white border-gray-200 text-gray-600 hover:border-secondary hover:text-secondary'
                  }`}
                >
                  All
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => onCategoryChange(cat.slug)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                      selectedCategory === cat.slug
                        ? 'bg-secondary text-white border-secondary shadow-md'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-secondary hover:text-secondary'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range (Span 4) */}
            <div className="md:col-span-4 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-gray-900">Price Range</h4>
                <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">
                  Up to AED {priceRange[1]}
                </span>
              </div>
              
              <input
                type="range"
                min="0"
                max="1000"
                step="10"
                value={priceRange[1]}
                onChange={(e) => onPriceChange([0, parseInt(e.target.value)])}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-secondary"
              />
              
              <div className="flex justify-between text-xs text-gray-500 mt-2 font-medium">
                <span>AED 0</span>
                <span>AED 1000+</span>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
            <p className="text-sm font-medium text-gray-500">
              Found <span className="text-primary font-bold">{totalResults}</span> products
            </p>
            <button
              onClick={onClearFilters}
              className="flex items-center gap-1.5 text-sm font-bold text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
            >
              <X size={16} />
              Reset Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductFilters;