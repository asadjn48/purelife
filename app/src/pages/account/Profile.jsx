import React, { useState } from 'react';
import { User, Mail, Phone, Lock, Check, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const [profileData, setProfileData] = useState({
    displayName: user?.displayName || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    updateProfile({
      displayName: profileData.displayName,
      phoneNumber: profileData.phoneNumber
    });
    setSuccessMessage('Profile updated successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }
    setSuccessMessage('Password updated successfully!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-pharmacy-navy mb-2">Profile Settings</h1>
        <p className="text-gray-600">Manage your account information</p>
      </div>

      {/* Tabs */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-3 text-sm font-medium ${
              activeTab === 'profile'
                ? 'text-pharmacy-navy border-b-2 border-pharmacy-green'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Personal Information
          </button>
          <button
            onClick={() => setActiveTab('password')}
            className={`flex-1 py-3 text-sm font-medium ${
              activeTab === 'password'
                ? 'text-pharmacy-navy border-b-2 border-pharmacy-green'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Change Password
          </button>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="p-4 bg-green-50 border-b">
            <div className="flex items-center gap-2 text-green-700">
              <Check size={18} />
              <span>{successMessage}</span>
            </div>
          </div>
        )}

        <div className="p-6">
          {activeTab === 'profile' ? (
            <form onSubmit={handleProfileSubmit} className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    name="displayName"
                    value={profileData.displayName}
                    onChange={handleProfileChange}
                    className="input pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    disabled
                    className="input pl-10 bg-gray-50"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={profileData.phoneNumber}
                    onChange={handleProfileChange}
                    className="input pl-10"
                    placeholder="+971 XX XXX XXXX"
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary w-full">
                Save Changes
              </button>
            </form>
          ) : (
            <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    required
                    className="input pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    required
                    minLength={6}
                    className="input pl-10"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                    className="input pl-10"
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary w-full">
                Update Password
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Account Info */}
      <div className="bg-gray-50 border rounded-lg p-4">
        <h3 className="font-medium text-pharmacy-navy mb-3">Account Information</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Member Since</p>
            <p className="font-medium text-gray-800">January 2024</p>
          </div>
          <div>
            <p className="text-gray-500">Account Type</p>
            <p className="font-medium text-gray-800">Customer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
