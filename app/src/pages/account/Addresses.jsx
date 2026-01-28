import React, { useState } from 'react';
import { Plus, MapPin, Home, Building, Check, Edit2, Trash2, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Addresses = () => {
  const { user, addAddress, updateAddress, deleteAddress, setDefaultAddress } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({
    label: 'Home',
    street: '',
    city: '',
    emirate: 'Dubai',
    zipCode: '',
    phone: ''
  });

  const emirates = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain'];

  const handleOpenModal = (address = null) => {
    if (address) {
      setEditingAddress(address);
      setFormData({
        label: address.label,
        street: address.street,
        city: address.city,
        emirate: address.emirate,
        zipCode: address.zipCode,
        phone: address.phone || ''
      });
    } else {
      setEditingAddress(null);
      setFormData({
        label: 'Home',
        street: '',
        city: '',
        emirate: 'Dubai',
        zipCode: '',
        phone: ''
      });
    }
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingAddress) {
      updateAddress(editingAddress.id, formData);
    } else {
      addAddress({ ...formData, isDefault: user?.addresses?.length === 0 });
    }
    setShowModal(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addresses = user?.addresses || [];

  return (
    <div className="space-y-6">
      <div className="bg-white border rounded-lg p-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-pharmacy-navy mb-2">My Addresses</h1>
          <p className="text-gray-600">Manage your delivery addresses</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={18} />
          <span>Add Address</span>
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className="bg-white border rounded-lg p-12 text-center">
          <MapPin className="mx-auto text-gray-300 mb-4" size={64} />
          <h3 className="text-lg font-medium text-pharmacy-navy mb-2">No addresses saved</h3>
          <p className="text-gray-500 mb-4">Add an address for faster checkout</p>
          <button
            onClick={() => handleOpenModal()}
            className="btn-primary inline-flex items-center gap-2"
          >
            <Plus size={18} />
            <span>Add Address</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <div
              key={address.id}
              className={`bg-white border rounded-lg p-4 ${address.isDefault ? 'border-pharmacy-green' : ''}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-pharmacy-green/10 rounded-lg flex items-center justify-center">
                    {address.label === 'Home' ? <Home size={20} className="text-pharmacy-green" /> : <Building size={20} className="text-pharmacy-green" />}
                  </div>
                  <div>
                    <p className="font-medium text-pharmacy-navy">{address.label}</p>
                    {address.isDefault && (
                      <span className="text-xs bg-pharmacy-green/10 text-pharmacy-green px-2 py-0.5 rounded flex items-center gap-1">
                        <Check size={12} />
                        Default
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenModal(address)}
                    className="p-2 text-gray-400 hover:text-pharmacy-navy"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => deleteAddress(address.id)}
                    className="p-2 text-gray-400 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="text-sm text-gray-600 space-y-1">
                <p>{address.street}</p>
                <p>{address.city}, {address.emirate}</p>
                {address.zipCode && <p>ZIP: {address.zipCode}</p>}
                {address.phone && <p className="flex items-center gap-1">📞 {address.phone}</p>}
              </div>

              {!address.isDefault && (
                <button
                  onClick={() => setDefaultAddress(address.id)}
                  className="mt-4 text-sm text-pharmacy-green hover:underline"
                >
                  Set as Default
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="font-semibold text-pharmacy-navy">
                {editingAddress ? 'Edit Address' : 'Add New Address'}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-100 rounded">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address Label</label>
                <div className="flex gap-2">
                  {['Home', 'Work', 'Other'].map((label) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setFormData({ ...formData, label })}
                      className={`px-4 py-2 rounded border text-sm ${
                        formData.label === label
                          ? 'bg-pharmacy-green border-pharmacy-green text-pharmacy-navy'
                          : 'border-gray-300 text-gray-600'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                <textarea
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  required
                  rows={2}
                  className="input"
                  placeholder="Building name, street, apartment number"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Emirate</label>
                  <select
                    name="emirate"
                    value={formData.emirate}
                    onChange={handleChange}
                    className="input"
                  >
                    {emirates.map(e => <option key={e} value={e}>{e}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone (Optional)</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input"
                    placeholder="+971 XX XXX XXXX"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2 border border-gray-300 rounded text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button type="submit" className="flex-1 btn-primary">
                  {editingAddress ? 'Save Changes' : 'Add Address'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Addresses;
