import { Calendar, FileText, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import React from 'react';

export default function MyHealthcare() {
  const navigate = useNavigate();

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl bg-gradient-to-r from-[#8B7BA8] to-[#7B6BA8] bg-clip-text text-transparent mb-2">
          My Health Care
        </h1>
        <p className="text-gray-500">Manage your appointments and insurance coverage</p>
      </div>

      {/* Healthcare Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Schedule Appointment Card */}
        <div 
          onClick={() => navigate('/appointment-booking')}
          className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer group"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#9B8BB8] to-[#7B6BA8] rounded-lg flex items-center justify-center shadow-md">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#8B7BA8] group-hover:translate-x-1 transition-all duration-200" />
          </div>
          <h3 className="text-xl text-gray-800 mb-2">Schedule an Appointment</h3>
          <p className="text-gray-500 text-sm">Book a visit with healthcare providers near you</p>
        </div>

        {/* Insurance Coverage Card */}
        <div 
          onClick={() => navigate('/eligibility-check')}
          className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer group"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#9B8BB8] to-[#7B6BA8] rounded-lg flex items-center justify-center shadow-md">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#8B7BA8] group-hover:translate-x-1 transition-all duration-200" />
          </div>
          <h3 className="text-xl text-gray-800 mb-2">My Insurance Coverage</h3>
          <p className="text-gray-500 text-sm">View your insurance details and coverage information</p>
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="mt-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
        <h3 className="text-lg text-gray-800 mb-3">Need Help?</h3>
        <p className="text-sm text-gray-600 mb-4">
          Contact our support team if you have questions about appointments or insurance coverage.
        </p>
        <button className="text-sm text-[#8B7BA8] hover:text-[#7B6BA8] transition-colors duration-200">
          Contact Support →
        </button>
      </div>
    </div>
  );
}