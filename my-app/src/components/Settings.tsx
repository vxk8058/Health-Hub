import { useState, useEffect } from 'react';
import { Save, LogOut, Phone, Mail, MapPin, Calendar, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import React from 'react';

interface SettingsProps {
  userData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    dateOfBirth: string;
    zipCode: string;
  };
  onUpdateUserData: (data: any) => void;
  onLogout: () => void;
}

export default function Settings({ userData, onUpdateUserData, onLogout }: SettingsProps) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userData);

  useEffect(() => {
    setFormData(userData);
  }, [userData]);

  const handleSave = () => {
    onUpdateUserData(formData);
    setIsEditing(false);
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      onLogout();
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50/30 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-gray-800 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your account and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm sticky top-6">
              <div className="w-24 h-24 bg-gradient-to-br from-[#9B8BB8] to-[#7B6BA8] rounded-full flex items-center justify-center shadow-lg mx-auto mb-4">
                <User className="w-12 h-12 text-white" />
              </div>
              <div className="text-center">
                <h3 className="text-gray-800 mb-1">{formData.firstName} {formData.lastName}</h3>
                <p className="text-sm text-gray-500 mb-6">{formData.email}</p>
              </div>

              <div className="space-y-3 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Phone className="w-4 h-4 text-[#8B7BA8]" />
                  <span>{formData.phone || 'No phone added'}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-[#8B7BA8]" />
                  <span>{formData.zipCode || 'No ZIP code'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Edit Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information Section */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-gray-800">Personal Information</h3>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-2 bg-gradient-to-r from-[#D4C5E8] to-[#C4B5D8] hover:from-[#C4B5D8] hover:to-[#B4A5C8] text-gray-800 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Edit
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2 flex items-center gap-2">
                      <User className="w-4 h-4 text-[#8B7BA8]" />
                      First Name
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 border border-gray-200 rounded-xl transition-all duration-200 ${
                        isEditing 
                          ? 'bg-white focus:outline-none focus:border-[#8B7BA8] focus:ring-2 focus:ring-[#8B7BA8]/20' 
                          : 'bg-gray-50 cursor-not-allowed'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 border border-gray-200 rounded-xl transition-all duration-200 ${
                        isEditing 
                          ? 'bg-white focus:outline-none focus:border-[#8B7BA8] focus:ring-2 focus:ring-[#8B7BA8]/20' 
                          : 'bg-gray-50 cursor-not-allowed'
                      }`}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#8B7BA8]" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border border-gray-200 rounded-xl transition-all duration-200 ${
                      isEditing 
                        ? 'bg-white focus:outline-none focus:border-[#8B7BA8] focus:ring-2 focus:ring-[#8B7BA8]/20' 
                        : 'bg-gray-50 cursor-not-allowed'
                    }`}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#8B7BA8]" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={!isEditing}
                    placeholder="(555) 123-4567"
                    className={`w-full px-4 py-3 border border-gray-200 rounded-xl transition-all duration-200 ${
                      isEditing 
                        ? 'bg-white focus:outline-none focus:border-[#8B7BA8] focus:ring-2 focus:ring-[#8B7BA8]/20' 
                        : 'bg-gray-50 cursor-not-allowed'
                    }`}
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#8B7BA8]" />
                    Address
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    disabled={!isEditing}
                    placeholder="123 Main St, City, State ZIP"
                    className={`w-full px-4 py-3 border border-gray-200 rounded-xl transition-all duration-200 ${
                      isEditing 
                        ? 'bg-white focus:outline-none focus:border-[#8B7BA8] focus:ring-2 focus:ring-[#8B7BA8]/20' 
                        : 'bg-gray-50 cursor-not-allowed'
                    }`}
                  />
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#8B7BA8]" />
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border border-gray-200 rounded-xl transition-all duration-200 ${
                      isEditing 
                        ? 'bg-white focus:outline-none focus:border-[#8B7BA8] focus:ring-2 focus:ring-[#8B7BA8]/20' 
                        : 'bg-gray-50 cursor-not-allowed'
                    }`}
                  />
                </div>
              </div>

              {isEditing && (
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={handleSave}
                    className="flex-1 bg-gradient-to-r from-[#D4C5E8] to-[#C4B5D8] hover:from-[#C4B5D8] hover:to-[#B4A5C8] text-gray-800 py-3 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    Save Changes
                  </button>
                  <button
                    onClick={() => {
                      setFormData(userData);
                      setIsEditing(false);
                    }}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-xl transition-all duration-200 shadow-md"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {/* Account Actions */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
              <h3 className="text-gray-800 mb-6">Account Actions</h3>
              <button
                onClick={handleLogout}
                className="w-full bg-gradient-to-r from-red-100 to-red-200 hover:from-red-200 hover:to-red-300 text-red-700 py-4 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <LogOut className="w-5 h-5" />
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}