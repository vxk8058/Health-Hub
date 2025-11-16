import { Check, Calendar, Clock, MapPin, User, Home as HomeIcon } from 'lucide-react';
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function AppointmentConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const appointment = (location.state as any)?.appointment;

  // Default values if no appointment data is passed
  const appointmentData = appointment || {
    date: 'October 19, 2025',
    time: '10:00 AM',
    centerName: 'Springfield Medical Center',
    centerAddress: '123 Main St, Springfield, CA 90001',
    doctorName: 'Dr. Amanda Taylor',
    doctorSpecialization: 'Family Medicine'
  };

  // Parse the date to get day of week
  const getDayOfWeek = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { weekday: 'long' });
    } catch {
      return 'Tuesday';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50/30 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center mb-6 shadow-xl mx-auto">
            <Check className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-gray-800 mb-3">Appointment Confirmed!</h1>
          <p className="text-gray-600">
            Your appointment has been successfully scheduled
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Appointment Details Card */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <h3 className="text-gray-800 mb-6">Appointment Details</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-[#8B7BA8]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Doctor</p>
                  <p className="text-gray-800">{appointmentData.doctorName}</p>
                  <p className="text-xs text-gray-500 mt-1">{appointmentData.doctorSpecialization}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-[#8B7BA8]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Date</p>
                  <p className="text-gray-800">{appointmentData.date}</p>
                  <p className="text-xs text-gray-500 mt-1">{getDayOfWeek(appointmentData.date)}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-[#8B7BA8]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Time</p>
                  <p className="text-gray-800">{appointmentData.time} - {appointmentData.time.includes('AM') ? appointmentData.time.replace('00 AM', '30 AM') : appointmentData.time.replace('00 PM', '30 PM')}</p>
                  <p className="text-xs text-gray-500 mt-1">30 minutes duration</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#8B7BA8]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Location</p>
                  <p className="text-gray-800">{appointmentData.centerName}</p>
                  <p className="text-xs text-gray-500 mt-1">{appointmentData.centerAddress}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Important Information Card */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 shadow-sm">
              <h4 className="text-gray-800 mb-4">Before Your Visit</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-blue-700">1</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">Arrive 15 minutes early for check-in</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-blue-700">2</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">Bring your insurance card and photo ID</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-blue-700">3</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">Complete any required pre-visit forms</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100 shadow-sm">
              <h4 className="text-gray-800 mb-3">Confirmation Number</h4>
              <div className="bg-white rounded-xl p-4 text-center border border-purple-200">
                <p className="text-2xl text-[#8B7BA8] tracking-wider">APT-{new Date().getFullYear()}-{String(new Date().getMonth() + 1).padStart(2, '0')}-{String(new Date().getDate()).padStart(2, '0')}-{String(Math.floor(Math.random() * 1000)).padStart(3, '0')}</p>
              </div>
              <p className="text-xs text-gray-500 text-center mt-3">
                Please save this number for your records
              </p>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100 shadow-sm">
              <h4 className="text-gray-800 mb-3">Need to Reschedule?</h4>
              <p className="text-sm text-gray-600 mb-4">
                If you need to change or cancel your appointment, please call us at least 24 hours in advance.
              </p>
              <p className="text-sm text-gray-800">
                📞 (123) 456-7890
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate('/home')}
            className="px-8 py-4 bg-gradient-to-r from-[#D4C5E8] to-[#C4B5D8] hover:from-[#C4B5D8] hover:to-[#B4A5C8] text-gray-800 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center gap-2"
          >
            <HomeIcon className="w-5 h-5" />
            Return to Dashboard
          </button>
          <button
            onClick={() => window.print()}
            className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-800 rounded-xl transition-all duration-200 shadow-md border border-gray-200"
          >
            Print Confirmation
          </button>
        </div>
      </div>
    </div>
  );
}
