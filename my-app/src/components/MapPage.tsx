import { useState, useEffect } from 'react';
import { Search, MapPin, Clock, Star, Loader2, Info } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import React from 'react';

interface HealthCenter {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  type: 'Clinic' | 'Hospital';
  hours: string;
  availability: string;
  rating: number;
  phone: string;
  distance?: number;
  costType?: 'Free' | 'Low-Cost' | 'Sliding Scale' | 'Standard';
}

export default function MapPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedType, setSelectedType] = useState('All');
  const [selectedCostType, setSelectedCostType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [zipCode, setZipCode] = useState((location.state as any)?.zipCode || '');
  const [loading, setLoading] = useState(false);
  const [healthCenters, setHealthCenters] = useState<HealthCenter[]>([]);

  const types = ['All', 'Clinic', 'Hospital'];
  const costTypes = ['All', 'Free Services', 'Low-Cost', 'Sliding Scale', 'Standard'];

  // Simulate fetching health centers based on ZIP code
  const fetchHealthCenters = (zip: string) => {
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const mockData = generateHealthCentersForZip(zip);
      setHealthCenters(mockData);
      setLoading(false);
    }, 800);
  };

  // Generate realistic health center data based on ZIP code
  const generateHealthCentersForZip = (zip: string): HealthCenter[] => {
    // Use ZIP code to seed random data for consistency
    const seed = zip ? parseInt(zip.substring(0, 3)) : 100;
    
    const cityNames = ['Springfield', 'Riverside', 'Oak Park', 'Greenville', 'Madison', 'Franklin'];
    const streetNames = ['Main St', 'Oak Ave', 'Park Blvd', 'Elm St', 'Medical Plaza', 'Health Drive', 'Wellness Way', 'Emergency Lane'];
    const centerPrefixes = ['City', 'Community', 'Family', 'Metro', 'Central', 'Regional', 'Premier', 'Advanced'];
    const clinicSuffixes = ['Medical Clinic', 'Health Center', 'Care Clinic', 'Urgent Care', 'Medical Center'];
    const hospitalSuffixes = ['General Hospital', 'Medical Center', 'Hospital', 'Regional Hospital'];
    
    const city = cityNames[seed % cityNames.length];
    const state = 'CA'; // Can be dynamic based on ZIP
    
    const centers: HealthCenter[] = [];
    const numCenters = 8 + (seed % 5);
    
    for (let i = 0; i < numCenters; i++) {
      const isHospital = i % 3 === 0;
      const prefix = centerPrefixes[(seed + i) % centerPrefixes.length];
      const suffix = isHospital 
        ? hospitalSuffixes[(seed + i) % hospitalSuffixes.length]
        : clinicSuffixes[(seed + i) % clinicSuffixes.length];
      
      const streetNumber = 100 + ((seed + i * 111) % 900);
      const street = streetNames[(seed + i) % streetNames.length];
      
      const is24Hour = isHospital || (i % 4 === 0);
      const availabilityOptions = [
        'Same Day Appointments',
        'Available Tomorrow',
        'Next Week',
        'Walk-ins Welcome',
        'Immediate Care'
      ];
      
      const availability = isHospital 
        ? (i % 2 === 0 ? 'Immediate Care' : 'Same Day Appointments')
        : availabilityOptions[(seed + i) % availabilityOptions.length];
      
      const costTypeOptions = ['Free', 'Low-Cost', 'Sliding Scale', 'Standard'];
      const costType = costTypeOptions[(seed + i) % costTypeOptions.length];
      
      centers.push({
        name: `${prefix} ${suffix}`,
        address: `${streetNumber} ${street}`,
        city: city,
        state: state,
        zipCode: zip || '90001',
        type: isHospital ? 'Hospital' : 'Clinic',
        hours: is24Hour ? 'Open 24/7' : 'Open Today',
        availability: availability,
        rating: 4.5 + ((seed + i) % 5) / 10,
        phone: `(${200 + (seed % 800)}) ${100 + (i * 111) % 900}-${1000 + (seed + i * 234) % 9000}`,
        distance: 0.5 + ((seed + i * 7) % 100) / 10,
        costType: costType
      });
    }
    
    return centers.sort((a, b) => (a.distance || 0) - (b.distance || 0));
  };

  useEffect(() => {
    // Load initial data
    fetchHealthCenters('90001');
  }, []);

  useEffect(() => {
    // Fetch new data when ZIP code changes (after user stops typing)
    if (zipCode.length === 5) {
      const timeoutId = setTimeout(() => {
        fetchHealthCenters(zipCode);
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [zipCode]);

  // Filter health centers based on search and type
  const filteredHealthCenters = healthCenters.filter((center) => {
    const matchesSearch = center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         center.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'All' || center.type === selectedType;
    
    // Map display labels to internal cost type values
    let matchesCostType = selectedCostType === 'All';
    if (!matchesCostType) {
      if (selectedCostType === 'Free Services') {
        matchesCostType = center.costType === 'Free';
      } else {
        matchesCostType = center.costType === selectedCostType;
      }
    }
    
    return matchesSearch && matchesType && matchesCostType;
  });

  const getAvailabilityColor = (availability: string) => {
    if (availability.includes('Same Day') || availability.includes('Immediate') || availability.includes('Walk-ins')) {
      return 'bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 border border-emerald-200';
    } else if (availability.includes('Tomorrow')) {
      return 'bg-gradient-to-r from-blue-100 to-sky-100 text-blue-700 border border-blue-200';
    } else if (availability.includes('Next Week')) {
      return 'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 border border-amber-200';
    }
    return 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border border-purple-200';
  };

  const getHoursColor = (hours: string) => {
    if (hours.includes('24/7')) {
      return 'bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 border border-indigo-200';
    }
    return 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-700 border border-gray-200';
  };

  const getCostTypeColor = (costType?: string) => {
    switch (costType) {
      case 'Free':
        return 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200';
      case 'Low-Cost':
        return 'bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-700 border border-teal-200';
      case 'Sliding Scale':
        return 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border border-blue-200';
      case 'Standard':
        return 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-700 border border-gray-200';
      default:
        return 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border border-purple-200';
    }
  };

  const getCostTypeLabel = (costType?: string) => {
    if (costType === 'Free') return 'Free Services';
    if (costType === 'Low-Cost') return 'Low-Cost';
    if (costType === 'Sliding Scale') return 'Sliding Scale';
    if (costType === 'Standard') return 'Standard Fees';
    return 'Cost Not Listed';
  };

  const getCostTypeDescription = (costType: string) => {
    switch (costType) {
      case 'Free Services':
        return 'No charge for services. Care is provided at no cost to you.';
      case 'Low-Cost':
        return 'Reduced fees for healthcare services. More affordable than standard rates.';
      case 'Sliding Scale':
        return 'Fees based on your income and family size. You pay what you can afford.';
      case 'Standard':
        return 'Regular healthcare fees. Standard insurance and payment options accepted.';
      default:
        return 'View all available health centers regardless of cost.';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50/30 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-gray-800 mb-2">Find Health Centers</h1>
          <p className="text-gray-600">
            {loading ? 'Searching...' : `${filteredHealthCenters.length} centers found`}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Search & Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6 sticky top-6">
              {/* Search */}
              <div>
                <label className="block text-sm text-gray-700 mb-3">Search</label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Name or address"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#8B7BA8] focus:ring-2 focus:ring-[#8B7BA8]/20 transition-all duration-200 bg-gray-50 hover:bg-white"
                  />
                </div>
              </div>

              {/* ZIP Code */}
              <div>
                <label className="block text-sm text-gray-700 mb-3">ZIP Code</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter ZIP"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
                    maxLength={5}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#8B7BA8] focus:ring-2 focus:ring-[#8B7BA8]/20 transition-all duration-200 bg-gray-50 hover:bg-white"
                  />
                </div>
              </div>
              
              {/* Filter by Type */}
              <div>
                <label className="block text-sm text-gray-700 mb-3">Filter by Type</label>
                <div className="flex flex-col gap-2">
                  {types.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`px-4 py-3 rounded-xl transition-all duration-200 text-left ${
                        selectedType === type
                          ? 'bg-gradient-to-r from-[#8B7BA8] to-[#7B6BA8] text-white shadow-md'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Filter by Cost Type */}
              <div>
                <label className="block text-sm text-gray-700 mb-3">Filter by Cost Type</label>
                <div className="flex flex-col gap-2">
                  {costTypes.map((costType) => (
                    <div key={costType} className="relative group/tooltip">
                      <button
                        onClick={() => setSelectedCostType(costType)}
                        className={`w-full px-4 py-3 rounded-xl transition-all duration-200 text-left flex items-center justify-between gap-2 ${
                          selectedCostType === costType
                            ? 'bg-gradient-to-r from-[#8B7BA8] to-[#7B6BA8] text-white shadow-md'
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <span>{costType}</span>
                        <Info className={`w-4 h-4 flex-shrink-0 ${
                          selectedCostType === costType ? 'text-white/80' : 'text-gray-400'
                        }`} />
                      </button>
                      {/* Tooltip */}
                      <div className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-opacity duration-200 z-50 w-64">
                        <div className="bg-gray-900 text-white text-xs rounded-xl p-3 shadow-2xl">
                          <p className="leading-relaxed">{getCostTypeDescription(costType)}</p>
                          <div className="absolute right-full top-1/2 transform -translate-y-1/2">
                            <div className="border-8 border-transparent border-r-gray-900"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Info helper text */}
                <div className="mt-3 p-3 bg-blue-50 border border-blue-100 rounded-xl">
                  <p className="text-xs text-blue-800 leading-relaxed">
                    <Info className="w-3 h-3 inline mr-1" />
                    Hover over each option to learn more about different cost types
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => navigate('/calendar-sync')}
                disabled={loading || filteredHealthCenters.length === 0}
                className="w-full bg-gradient-to-r from-[#D4C5E8] to-[#C4B5D8] hover:from-[#C4B5D8] hover:to-[#B4A5C8] text-gray-800 py-3 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Booking
              </button>
            </div>
          </div>

          {/* Right Column - Map & Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Interactive Map View */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-inner">
                {/* Map background with grid */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
                  {/* Grid lines to simulate map streets */}
                  <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                        <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(139, 123, 168, 0.15)" strokeWidth="1.5"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                    {/* Main roads */}
                    <line x1="0" y1="40%" x2="100%" y2="40%" stroke="rgba(139, 123, 168, 0.25)" strokeWidth="3" />
                    <line x1="30%" y1="0" x2="30%" y2="100%" stroke="rgba(139, 123, 168, 0.25)" strokeWidth="3" />
                    <line x1="70%" y1="0" x2="70%" y2="100%" stroke="rgba(139, 123, 168, 0.25)" strokeWidth="3" />
                  </svg>
                </div>

                {/* Map markers for health centers */}
                <div className="absolute inset-0">
                  {!loading && filteredHealthCenters.slice(0, 8).map((center, idx) => {
                    const positions = [
                      { top: '20%', left: '25%' },
                      { top: '15%', left: '60%' },
                      { top: '35%', left: '45%' },
                      { top: '50%', left: '70%' },
                      { top: '60%', left: '30%' },
                      { top: '70%', left: '55%' },
                      { top: '45%', left: '15%' },
                      { top: '25%', left: '80%' },
                    ];
                    const position = positions[idx % positions.length];
                    
                    return (
                      <div
                        key={idx}
                        className="absolute group cursor-pointer"
                        style={{ top: position.top, left: position.left }}
                      >
                        {/* Marker */}
                        <div className="relative">
                          <MapPin 
                            className={`w-8 h-8 ${
                              center.type === 'Hospital' 
                                ? 'text-red-500 fill-red-400' 
                                : 'text-blue-500 fill-blue-400'
                            } drop-shadow-lg animate-bounce`} 
                            style={{ animationDuration: `${2 + (idx * 0.2)}s` }}
                          />
                          {/* Tooltip on hover */}
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                            <div className="bg-white rounded-xl p-3 shadow-xl border border-purple-200 whitespace-nowrap">
                              <p className="text-xs font-medium text-gray-800 mb-1">{center.name}</p>
                              <p className="text-xs text-gray-600">{center.distance?.toFixed(1)} mi • {center.availability}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Center marker (user location) */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                  <div className="relative">
                    <div className="w-6 h-6 bg-purple-600 rounded-full border-4 border-white shadow-2xl"></div>
                    <div className="absolute inset-0 w-6 h-6 bg-purple-400 rounded-full animate-ping opacity-75"></div>
                  </div>
                </div>

                {/* Map overlay text */}
                {loading && (
                  <div className="absolute inset-0 bg-white/80 flex items-center justify-center backdrop-blur-sm">
                    <div className="text-center">
                      <Loader2 className="w-12 h-12 mx-auto mb-3 text-[#8B7BA8] animate-spin" />
                      <p className="text-gray-600">Loading map...</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Map legend */}
              <div className="flex items-center justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-500 fill-blue-400" />
                  <span className="text-sm text-gray-600">Clinic</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-red-500 fill-red-400" />
                  <span className="text-sm text-gray-600">Hospital</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-purple-600 rounded-full border-2 border-white shadow-lg"></div>
                  <span className="text-sm text-gray-600">Your Location</span>
                </div>
              </div>
            </div>
            
            {/* Health Centers List */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-gray-800 mb-4">Nearby Health Centers</h3>
              {loading ? (
                <div className="text-center py-16">
                  <Loader2 className="w-16 h-16 mx-auto mb-4 text-[#8B7BA8] animate-spin" />
                  <p className="text-gray-500">Finding health centers near you...</p>
                </div>
              ) : filteredHealthCenters.length === 0 ? (
                <div className="text-center py-16">
                  <Search className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500 mb-2">No health centers found</p>
                  <p className="text-sm text-gray-400">Try adjusting your search or filters</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                  {filteredHealthCenters.map((center, idx) => (
                    <div 
                      key={idx}
                      className="bg-gradient-to-br from-purple-50 via-white to-pink-50 rounded-2xl p-6 border border-purple-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
                      onClick={() => navigate('/calendar-sync', { state: { selectedCenter: center } })}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-gray-800 group-hover:text-[#8B7BA8] transition-colors">{center.name}</h4>
                            <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs rounded-full border border-purple-200">
                              {center.type}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 mb-1">
                            <MapPin className="w-4 h-4 text-[#8B7BA8]" />
                            <span className="text-sm">{center.address}, {center.city}, {center.state} {center.zipCode}</span>
                          </div>
                          {center.distance && (
                            <span className="text-xs text-gray-500 ml-6">{center.distance.toFixed(1)} miles away</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 bg-gradient-to-br from-yellow-50 to-amber-50 px-3 py-1.5 rounded-full border border-yellow-200 shadow-sm">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm text-gray-800">{center.rating.toFixed(1)}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 flex-wrap">
                        <span className={`px-4 py-1.5 text-sm rounded-full shadow-sm ${getHoursColor(center.hours)}`}>
                          <Clock className="w-3 h-3 inline mr-1.5" />
                          {center.hours}
                        </span>
                        <span className={`px-4 py-1.5 text-sm rounded-full shadow-sm ${getAvailabilityColor(center.availability)}`}>
                          {center.availability}
                        </span>
                        <span className={`px-4 py-1.5 text-sm rounded-full shadow-sm ${getCostTypeColor(center.costType)}`}>
                          {getCostTypeLabel(center.costType)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #8B7BA8, #7B6BA8);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #7B6BA8, #6B5B98);
        }
      `}</style>
    </div>
  );
}