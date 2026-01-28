import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Demo users for testing
  const demoUsers = [
    {
      uid: 'user-1',
      email: 'customer@purelife.ae',
      password: 'customer123',
      displayName: 'EncoderBytes',
      phoneNumber: '+971 50 202 1155',
      isAdmin: false,
      addresses: [
        {
          id: 'addr-1',
          label: 'Home',
          street: '123 Sheikh Zayed Road',
          city: 'Dubai',
          emirate: 'Dubai',
          zipCode: '00000',
          isDefault: true
        }
      ],
      orders: [
        {
          id: 'PL123456',
          date: '2024-01-15',
          total: 245.50,
          status: 'delivered',
          items: 3
        },
        {
          id: 'PL123457',
          date: '2024-01-20',
          total: 189.00,
          status: 'processing',
          items: 2
        }
      ]
    },
    {
      uid: 'admin-1',
      email: 'admin@purelife.ae',
      password: 'admin123',
      displayName: 'Pharmacy Admin',
      phoneNumber: '+971 50 202 1155',
      isAdmin: true,
      addresses: [],
      orders: []
    }
  ];

  useEffect(() => {
    const savedUser = localStorage.getItem('purelife_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const foundUser = demoUsers.find(u => u.email === email && u.password === password);
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('purelife_user', JSON.stringify(userWithoutPassword));
      return { success: true, user: userWithoutPassword };
    }
    throw new Error('Invalid email or password');
  };

  const signup = async (email, password, displayName, phoneNumber) => {
    const newUser = {
      uid: `user-${Date.now()}`,
      email,
      displayName,
      phoneNumber,
      isAdmin: false,
      addresses: [],
      orders: []
    };
    setUser(newUser);
    localStorage.setItem('purelife_user', JSON.stringify(newUser));
    return { success: true, user: newUser };
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('purelife_user');
  };

  const updateProfile = async (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('purelife_user', JSON.stringify(updatedUser));
  };

  const addAddress = async (address) => {
    const newAddress = {
      ...address,
      id: `addr-${Date.now()}`
    };
    const updatedAddresses = [...(user.addresses || []), newAddress];
    const updatedUser = { ...user, addresses: updatedAddresses };
    setUser(updatedUser);
    localStorage.setItem('purelife_user', JSON.stringify(updatedUser));
  };

  const updateAddress = async (addressId, updates) => {
    const updatedAddresses = user.addresses.map(addr =>
      addr.id === addressId ? { ...addr, ...updates } : addr
    );
    const updatedUser = { ...user, addresses: updatedAddresses };
    setUser(updatedUser);
    localStorage.setItem('purelife_user', JSON.stringify(updatedUser));
  };

  const deleteAddress = async (addressId) => {
    const updatedAddresses = user.addresses.filter(addr => addr.id !== addressId);
    const updatedUser = { ...user, addresses: updatedAddresses };
    setUser(updatedUser);
    localStorage.setItem('purelife_user', JSON.stringify(updatedUser));
  };

  const setDefaultAddress = async (addressId) => {
    const updatedAddresses = user.addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === addressId
    }));
    const updatedUser = { ...user, addresses: updatedAddresses };
    setUser(updatedUser);
    localStorage.setItem('purelife_user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    updateProfile,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    isAuthenticated: !!user,
    isAdmin: user?.isAdmin || false
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
