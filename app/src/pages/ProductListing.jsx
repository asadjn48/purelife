import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import ProductFilters from '../components/ui/ProductFilters'; // Import new component
import { products, categories, getProductsByCategory, getCategoryBySlug } from '../data/products';

const ProductListing = () => {
  const { categorySlug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const searchParams = new URLSearchParams(location.search);
  const urlSearchQuery = searchParams.get('search') || '';

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [localSearch, setLocalSearch] = useState(urlSearchQuery);

  const category = categorySlug ? getCategoryBySlug(categorySlug) : null;

  // Filter and sort products logic
  useEffect(() => {
    let result = [...products];

    // 1. Filter by category (from URL param)
    if (categorySlug) {
      result = getProductsByCategory(categorySlug);
    }

    // 2. Filter by search query (local input)
    if (localSearch) {
      const query = localSearch.toLowerCase();
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          (p.subcategory && p.subcategory.toLowerCase().includes(query))
      );
    }

    // 3. Filter by price range
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // 4. Sort
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
  }, [categorySlug, localSearch, priceRange, sortBy]);

  // Handler to update URL when category changes via filter component
  const handleCategoryChange = (slug) => {
    if (slug) {
      navigate(`/category/${slug}`);
    } else {
      navigate('/products');
    }
  };

  const clearFilters = () => {
    setPriceRange([0, 1000]);
    setSortBy('featured');
    setLocalSearch('');
    navigate('/products');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-3 uppercase tracking-wider">
            <span className="hover:text-primary cursor-pointer" onClick={() => navigate('/')}>Home</span>
            <span>/</span>
            <span className="text-primary font-bold">
              {category ? category.name : localSearch ? 'Search Results' : 'All Products'}
            </span>
          </nav>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {category ? category.name : localSearch ? `Results for "${localSearch}"` : 'Shop All Products'}
          </h1>
          
          {category && (
            <p className="text-gray-600 max-w-2xl text-sm leading-relaxed">
              {category.description || `Browse our wide selection of ${category.name.toLowerCase()} products.`}
            </p>
          )}
        </div>

        {/* Reusable Filter Component */}
        <ProductFilters 
          searchQuery={localSearch}
          onSearchChange={setLocalSearch}
          sortBy={sortBy}
          onSortChange={setSortBy}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters(!showFilters)}
          priceRange={priceRange}
          onPriceChange={setPriceRange}
          categories={categories}
          selectedCategory={categorySlug}
          onCategoryChange={handleCategoryChange}
          onClearFilters={clearFilters}
          totalResults={filteredProducts.length}
        />

        {/* Results Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-3xl p-16 text-center shadow-sm">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="text-gray-300" size={40} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">
              We couldn't find what you're looking for. Try adjusting your filters or search query.
            </p>
            <button onClick={clearFilters} className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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