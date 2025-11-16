import { useState } from 'react';
import { MapPin, Mail, Phone, Clock, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import React from 'react';

interface Appointment {
  id: string;
  date: string;
  time: string;
  center: string;
  type: string;
}

interface AppointmentBookingProps {
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  userZipCode?: string;
}

export default function AppointmentBooking({ addAppointment, userZipCode = '' }: AppointmentBookingProps) {
  const navigate = useNavigate();
  const [zipCode, setZipCode] = useState(userZipCode);
  const [featuredCenter, setFeaturedCenter] = useState(generateFeaturedCenter(userZipCode || '10001'));

  function generateFeaturedCenter(zip: string) {
    const zipNum = parseInt(zip) || 10001;
    const seed = zipNum % 1000;
    
    const centerTypes = ['Medical Center', 'Health Clinic', 'Community Hospital', 'Urgent Care Center'];
    const streets = ['Main St', 'Oak Ave', 'Maple Dr', 'Park Blvd', 'Cedar Lane', 'Elm Street', 'Pine Road'];
    const cities = ['Springfield', 'Riverside', 'Fairview', 'Georgetown', 'Madison', 'Clinton'];
    const states = ['NY', 'CA', 'TX', 'FL', 'IL', 'PA', 'OH', 'GA'];
    
    const typeIndex = seed % centerTypes.length;
    const streetNum = 100 + (seed % 900);
    const streetIndex = seed % streets.length;
    const cityIndex = (seed + 1) % cities.length;
    const stateIndex = (seed + 2) % states.length;
    
    return {
      name: `${cities[cityIndex]} ${centerTypes[typeIndex]}`,
      address: `${streetNum} ${streets[streetIndex]}, ${cities[cityIndex]}, ${states[stateIndex]} ${zip}`,
      email: `contact@${cities[cityIndex].toLowerCase()}health.com`,
      phone: `(${200 + (seed % 799)}) ${100 + (seed % 899)}-${1000 + (seed % 8999)}`,
      hours: seed % 2 === 0 ? 'Open Mon-Fri, 8AM-6PM' : 'Open Mon-Sat, 7AM-7PM'
    };
  }

  const handleZipCodeSearch = () => {
    if (zipCode && zipCode.length === 5) {
      setFeaturedCenter(generateFeaturedCenter(zipCode));
    }
  };

  const handleMapNavigation = () => {
    navigate('/map', { state: { zipCode } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50/30 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-gray-800 mb-2">Schedule Appointment</h1>
          <p className="text-gray-600">Find and book appointments at nearby health centers</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Search */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm sticky top-6">
              <h3 className="text-gray-800 mb-6">Search by Location</h3>
              
              {/* ZIP Code Search */}
              <div className="mb-6">
                <label className="block text-sm text-gray-700 mb-3">Enter ZIP Code</label>
                <div className="flex flex-col gap-3">
                  <input
                    type="text"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
                    placeholder="Enter 5-digit ZIP code"
                    maxLength={5}
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#8B7BA8] focus:ring-2 focus:ring-[#8B7BA8]/20 transition-all duration-200 bg-gray-50 hover:bg-white"
                  />
                  <button
                    onClick={handleZipCodeSearch}
                    disabled={zipCode.length !== 5}
                    className="bg-gradient-to-r from-[#D4C5E8] to-[#C4B5D8] hover:from-[#C4B5D8] hover:to-[#B4A5C8] text-gray-800 px-6 py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Search className="w-5 h-5" />
                    Search Centers
                  </button>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Enter your ZIP code to find healthcare facilities near you. We'll show you the closest options based on your location.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Map Placeholder */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
              <div className="bg-gradient-to-br from-[#E8E3F0] to-[#F0E8F5] h-96 rounded-2xl flex items-center justify-center text-gray-400 shadow-inner relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-200/20 to-pink-200/20"></div>
                <div className="relative z-10 text-center">
                  <MapPin className="w-20 h-20 mx-auto mb-4 text-[#8B7BA8]" />
                  <p className="text-gray-600 text-lg">Interactive Map View</p>
                  <p className="text-sm text-gray-500 mt-2">Find nearby health centers on the map</p>
                </div>
              </div>
            </div>
            
            {/* Featured Health Center */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-gray-800 mb-2">Featured Health Center</h3>
                  <p className="text-lg text-gray-700">{featuredCenter.name}</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs border border-green-200">Open</span>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-start gap-3 text-gray-700">
                  <MapPin className="w-5 h-5 text-[#8B7BA8] mt-0.5 flex-shrink-0" />
                  <span>{featuredCenter.address}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Mail className="w-5 h-5 text-[#8B7BA8] flex-shrink-0" />
                  <span>{featuredCenter.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Phone className="w-5 h-5 text-[#8B7BA8] flex-shrink-0" />
                  <span>{featuredCenter.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Clock className="w-5 h-5 text-[#8B7BA8] flex-shrink-0" />
                  <span>{featuredCenter.hours}</span>
                </div>
              </div>
              
              <button
                onClick={handleMapNavigation}
                className="w-full bg-gradient-to-r from-[#D4C5E8] to-[#C4B5D8] hover:from-[#C4B5D8] hover:to-[#B4A5C8] text-gray-800 py-4 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Book an Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
