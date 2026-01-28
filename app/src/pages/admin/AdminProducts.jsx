import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, X, Check, AlertCircle } from 'lucide-react';
import { products, categories } from '../../data/products';

const AdminProducts = () => {
  const [productList, setProductList] = useState(products);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: 'medicines',
    subcategory: '',
    stock: '',
    prescription: false,
    image: ''
  });

  const filteredProducts = productList.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        originalPrice: product.originalPrice?.toString() || '',
        category: product.category,
        subcategory: product.subcategory || '',
        stock: product.stock.toString(),
        prescription: product.prescription,
        image: product.image
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        originalPrice: '',
        category: 'medicines',
        subcategory: '',
        stock: '',
        prescription: false,
        image: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
      stock: parseInt(formData.stock),
      rating: editingProduct?.rating || 4.5,
      reviews: editingProduct?.reviews || 0
    };

    if (editingProduct) {
      // Update existing product
      setProductList(productList.map(p =>
        p.id === editingProduct.id ? { ...productData, id: p.id } : p
      ));
    } else {
      // Add new product
      const newProduct = {
        ...productData,
        id: `prod-${Date.now()}`,
        rating: 4.5,
        reviews: 0
      };
      setProductList([...productList, newProduct]);
    }

    handleCloseModal();
  };

  const handleDelete = (productId) => {
    setProductList(productList.filter(p => p.id !== productId));
    setDeleteConfirm(null);
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-bold text-navy text-3xl">Products</h1>
          <p className="text-navy/60">Manage your product inventory</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-6 py-3 bg-lime text-navy rounded-pill font-medium hover:bg-lime-light transition-colors"
        >
          <Plus size={20} />
          <span>Add Product</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/40" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-lime focus:ring-2 focus:ring-lime/20 outline-none"
        />
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-navy/60">Product</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-navy/60">Category</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-navy/60">Price</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-navy/60">Stock</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-navy/60">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-navy">{product.name}</p>
                        {product.prescription && (
                          <span className="text-xs text-orange-500">Prescription Required</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-navy/70 capitalize">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <span className="font-medium text-navy">{formatPrice(product.price)}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-navy/40 line-through ml-2">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-medium ${
                      product.stock > 20 ? 'text-green-500' :
                      product.stock > 0 ? 'text-orange-500' : 'text-red-500'
                    }`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenModal(product)}
                        className="p-2 hover:bg-gray-100 rounded-lg text-navy/60 hover:text-navy transition-colors"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(product)}
                        className="p-2 hover:bg-red-50 rounded-lg text-navy/60 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-navy/60">No products found</p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-auto">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="font-heading font-semibold text-navy text-xl">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-navy font-medium text-sm mb-2">Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-lime focus:ring-2 focus:ring-lime/20 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-navy font-medium text-sm mb-2">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-lime focus:ring-2 focus:ring-lime/20 outline-none"
                  >
                    {categories.map(cat => (
                      <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-navy font-medium text-sm mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-lime focus:ring-2 focus:ring-lime/20 outline-none resize-none"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-navy font-medium text-sm mb-2">Price (AED)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-lime focus:ring-2 focus:ring-lime/20 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-navy font-medium text-sm mb-2">Original Price (AED)</label>
                  <input
                    type="number"
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-lime focus:ring-2 focus:ring-lime/20 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-navy font-medium text-sm mb-2">Stock</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                    min="0"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-lime focus:ring-2 focus:ring-lime/20 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-navy font-medium text-sm mb-2">Image URL</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  required
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-lime focus:ring-2 focus:ring-lime/20 outline-none"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="prescription"
                  checked={formData.prescription}
                  onChange={handleChange}
                  className="w-5 h-5 accent-lime"
                />
                <label className="text-navy">Requires Prescription</label>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 py-3 rounded-pill border border-navy text-navy font-medium hover:bg-navy/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-pill bg-lime text-navy font-medium hover:bg-lime-light transition-colors"
                >
                  {editingProduct ? 'Save Changes' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center gap-3 text-red-500 mb-4">
              <AlertCircle size={24} />
              <h3 className="font-heading font-semibold text-lg">Delete Product</h3>
            </div>
            <p className="text-navy/70 mb-6">
              Are you sure you want to delete "{deleteConfirm.name}"? This action cannot be undone.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-3 rounded-pill border border-navy text-navy font-medium hover:bg-navy/5 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm.id)}
                className="flex-1 py-3 rounded-pill bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
