import { Calendar, Clock, MapPin, User, Stethoscope, X, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Appointment } from '../App';
import React from 'react';

interface MyAppointmentsProps {
  appointments: Appointment[];
  onCancelAppointment: (id: string) => void;
}

export default function MyAppointments({ appointments, onCancelAppointment }: MyAppointmentsProps) {
  const navigate = useNavigate();

  const handleCancelAppointment = (id: string, centerName: string) => {
    if (window.confirm(`Are you sure you want to cancel your appointment at ${centerName}?`)) {
      onCancelAppointment(id);
    }
  };

  const parseDate = (dateStr: string) => {
    try {
      return new Date(dateStr);
    } catch {
      return new Date();
    }
  };

  // Separate upcoming and past appointments
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingAppointments = appointments
    .filter(apt => parseDate(apt.date) >= today)
    .sort((a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime());

  const pastAppointments = appointments
    .filter(apt => parseDate(apt.date) < today)
    .sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime());

  const formatDate = (dateStr: string) => {
    const date = parseDate(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      year: 'numeric' 
    });
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="bg-gradient-to-r from-[#8B7BA8] to-[#7B6BA8] bg-clip-text text-transparent mb-2">
          My Appointments
        </h1>
        <p className="text-gray-600">View and manage your healthcare appointments</p>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/appointment-booking')}
          className="bg-gradient-to-r from-[#9B8BB8] to-[#7B6BA8] hover:from-[#8B7BA8] hover:to-[#6B5B98] text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Book New Appointment
        </button>
      </div>

      {/* No Appointments State */}
      {appointments.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Calendar className="w-10 h-10 text-[#8B7BA8]" />
          </div>
          <h2 className="text-gray-800 mb-3">No Appointments Yet</h2>
          <p className="text-gray-600 mb-6">You haven't booked any appointments yet.</p>
          <button
            onClick={() => navigate('/appointment-booking')}
            className="bg-gradient-to-r from-[#9B8BB8] to-[#7B6BA8] hover:from-[#8B7BA8] hover:to-[#6B5B98] text-white px-6 py-3 rounded-xl transition-all duration-200"
          >
            Book Your First Appointment
          </button>
        </div>
      )}

      {/* Upcoming Appointments */}
      {upcomingAppointments.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-gray-800">Upcoming Appointments</h2>
              <p className="text-sm text-gray-600">{upcomingAppointments.length} scheduled</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#E8E3F0] to-[#DDD8E8] rounded-xl flex items-center justify-center flex-shrink-0">
                      <Stethoscope className="w-6 h-6 text-[#7B6BA8]" />
                    </div>
                    <div>
                      <h3 className="text-gray-800 mb-1">{appointment.centerName}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span className="line-clamp-1">{appointment.centerAddress}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCancelAppointment(appointment.id, appointment.centerName)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                    title="Cancel appointment"
                  >
                    <X className="w-5 h-5 text-gray-400 group-hover:text-red-600" />
                  </button>
                </div>

                {/* Details */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Calendar className="w-4 h-4 text-[#8B7BA8]" />
                    <span className="text-sm">{formatDate(appointment.date)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Clock className="w-4 h-4 text-[#8B7BA8]" />
                    <span className="text-sm">{appointment.time}</span>
                  </div>
                  {appointment.doctorName && (
                    <div className="flex items-center gap-3 text-gray-700">
                      <User className="w-4 h-4 text-[#8B7BA8]" />
                      <span className="text-sm">
                        {appointment.doctorName}
                        {appointment.doctorSpecialization && ` - ${appointment.doctorSpecialization}`}
                      </span>
                    </div>
                  )}
                  {appointment.reason && (
                    <div className="pt-3 border-t border-gray-100">
                      <p className="text-sm text-gray-600">
                        <span className="text-gray-700">Reason: </span>
                        {appointment.reason}
                      </p>
                    </div>
                  )}
                </div>

                {/* Status Badge */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-xs rounded-full">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    Confirmed
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Past Appointments */}
      {pastAppointments.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <h2 className="text-gray-800">Past Appointments</h2>
              <p className="text-sm text-gray-600">{pastAppointments.length} completed</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pastAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-200 opacity-75"
              >
                {/* Header */}
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Stethoscope className="w-6 h-6 text-gray-500" />
                  </div>
                  <div>
                    <h3 className="text-gray-700 mb-1">{appointment.centerName}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin className="w-4 h-4" />
                      <span className="line-clamp-1">{appointment.centerAddress}</span>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{formatDate(appointment.date)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{appointment.time}</span>
                  </div>
                  {appointment.doctorName && (
                    <div className="flex items-center gap-3 text-gray-600">
                      <User className="w-4 h-4" />
                      <span className="text-sm">
                        {appointment.doctorName}
                        {appointment.doctorSpecialization && ` - ${appointment.doctorSpecialization}`}
                      </span>
                    </div>
                  )}
                </div>

                {/* Status Badge */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
                    Completed
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Help Card */}
      {appointments.length > 0 && (
        <div className="mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-gray-800 mb-2">Need to Reschedule?</h3>
              <p className="text-sm text-gray-600 mb-3">
                To reschedule an appointment, please cancel your existing appointment and book a new one. 
                If you need to cancel within 24 hours of your appointment, please call us at (123) 456-7890.
              </p>
              <p className="text-sm text-gray-600">
                <span className="text-gray-800">Cancellation Policy:</span> You can cancel appointments at any time. 
                We recommend canceling at least 24 hours in advance to allow others to book the slot.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
