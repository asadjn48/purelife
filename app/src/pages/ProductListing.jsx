import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Search, Filter, X, ChevronDown, Grid, List } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories, getProductsByCategory, getCategoryBySlug } from '../data/products';

const ProductListing = () => {
  const { categorySlug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search') || '';

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [viewMode, setViewMode] = useState('grid');

  const category = categorySlug ? getCategoryBySlug(categorySlug) : null;

  // Filter and sort products
  useEffect(() => {
    let result = [...products];

    // Filter by category
    if (categorySlug) {
      result = getProductsByCategory(categorySlug);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.subcategory?.toLowerCase().includes(query)
      );
    }

    // Filter by price range
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [categorySlug, searchQuery, priceRange, sortBy]);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(location.search);
    if (localSearch) {
      params.set('search', localSearch);
    } else {
      params.delete('search');
    }
    navigate(`${location.pathname}?${params.toString()}`);
  };

  const clearFilters = () => {
    setPriceRange([0, 1000]);
    setSortBy('featured');
    setLocalSearch('');
    navigate('/products');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-main">
        {/* Breadcrumb & Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <span>Home</span>
            <span>/</span>
            <span className="text-pharmacy-navy">
              {category ? category.name : searchQuery ? `Search: "${searchQuery}"` : 'All Products'}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-pharmacy-navy">
            {category ? category.name : searchQuery ? `Search Results` : 'All Products'}
          </h1>
          {category && (
            <p className="text-gray-600 mt-1">{category.description}</p>
          )}
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white border rounded-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-md text-sm outline-none focus:border-pharmacy-green"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-pharmacy-green rounded flex items-center justify-center"
                >
                  <Search size={16} className="text-pharmacy-navy" />
                </button>
              </div>
            </form>

            {/* Filters */}
            <div className="flex gap-3">
              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-3 border border-gray-300 rounded-md text-sm outline-none focus:border-pharmacy-green bg-white"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name A-Z</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-md text-sm hover:border-pharmacy-green"
              >
                <Filter size={16} />
                <span className="hidden sm:inline">Filters</span>
              </button>

              {/* View Mode */}
              <div className="hidden md:flex border rounded-md overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 ${viewMode === 'grid' ? 'bg-pharmacy-green text-pharmacy-navy' : 'bg-white text-gray-600'}`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 ${viewMode === 'list' ? 'bg-pharmacy-green text-pharmacy-navy' : 'bg-white text-gray-600'}`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Categories */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Categories</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={!categorySlug}
                        onChange={() => navigate('/products')}
                        className="accent-pharmacy-green"
                      />
                      <span className="text-sm text-gray-600">All Products</span>
                    </label>
                    {categories.map((cat) => (
                      <label key={cat.slug} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          checked={categorySlug === cat.slug}
                          onChange={() => navigate(`/category/${cat.slug}`)}
                          className="accent-pharmacy-green"
                        />
                        <span className="text-sm text-gray-600">{cat.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Price Range</h4>
                  <div className="space-y-3">
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                      className="w-full accent-pharmacy-green"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{formatPrice(0)}</span>
                      <span>{formatPrice(priceRange[1])}</span>
                    </div>
                  </div>
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-2 text-red-500 hover:underline"
                  >
                    <X size={16} />
                    Clear All Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white border rounded-lg p-12 text-center">
            <Search className="mx-auto text-gray-300 mb-4" size={64} />
            <h3 className="text-lg font-medium text-pharmacy-navy mb-2">No products found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
            <button onClick={clearFilters} className="btn-primary">
              Clear Filters
            </button>
          </div>
        ) : (
          <div className={`grid gap-4 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListing;
