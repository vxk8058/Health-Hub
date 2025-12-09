import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import React from 'react';

interface Appointment {
  id: string;
  date: string;
  time: string;
  centerName: string;
  centerAddress: string;
  reason: string;
  doctorName: string;
  doctorSpecialization: string;
}

interface CalendarSyncProps {
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
}

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
}

interface Doctor {
  name: string;
  specialization: string;
}

export default function CalendarSync({ addAppointment }: CalendarSyncProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedCenter = (location.state as any)?.selectedCenter as HealthCenter | undefined;
  
  const [selectedDate, setSelectedDate] = useState(19);
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [currentMonth, setCurrentMonth] = useState(11); // December
  const [currentYear, setCurrentYear] = useState(2025);

  // Function to assign a doctor based on center name and type
  const getDoctorForCenter = (centerName: string, centerType: string): Doctor => {
    // Generate a consistent hash from center name
    const hash = centerName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    // Hospital doctors (emergency and specialized care)
    const hospitalDoctors: Doctor[] = [
      { name: 'Dr. Sarah Johnson', specialization: 'Emergency Medicine' },
      { name: 'Dr. Michael Chen', specialization: 'Internal Medicine' },
      { name: 'Dr. Emily Rodriguez', specialization: 'Cardiology' },
      { name: 'Dr. David Kim', specialization: 'Orthopedic Surgery' },
      { name: 'Dr. Jennifer Martinez', specialization: 'Neurology' },
      { name: 'Dr. Robert Thompson', specialization: 'General Surgery' },
      { name: 'Dr. Lisa Anderson', specialization: 'Pulmonology' },
      { name: 'Dr. James Wilson', specialization: 'Gastroenterology' }
    ];

    // Clinic doctors (primary care and general practice)
    const clinicDoctors: Doctor[] = [
      { name: 'Dr. Amanda Taylor', specialization: 'Family Medicine' },
      { name: 'Dr. Christopher Lee', specialization: 'General Practice' },
      { name: 'Dr. Jessica Brown', specialization: 'Pediatrics' },
      { name: 'Dr. Daniel White', specialization: 'Internal Medicine' },
      { name: 'Dr. Michelle Garcia', specialization: 'Family Medicine' },
      { name: 'Dr. Kevin Moore', specialization: 'General Practice' },
      { name: 'Dr. Rachel Davis', specialization: 'Urgent Care Medicine' },
      { name: 'Dr. Brian Miller', specialization: 'Primary Care' }
    ];

    const doctors = centerType === 'Hospital' ? hospitalDoctors : clinicDoctors;
    return doctors[hash % doctors.length];
  };

  // Get doctor and center info
  const centerInfo = selectedCenter || {
    name: 'Springfield Medical Center',
    address: '123 Main St',
    city: 'Springfield',
    state: 'CA',
    zipCode: '90001',
    type: 'Clinic' as const
  };

  const doctor = getDoctorForCenter(centerInfo.name, centerInfo.type);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Generate calendar days for the current month
  const generateCalendar = () => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    const calendar: (number | null)[][] = [];
    let week = new Array(firstDay).fill(null);
    
    for (let day = 1; day <= daysInMonth; day++) {
      week.push(day);
      if (week.length === 7) {
        calendar.push(week);
        week = [];
      }
    }
    
    if (week.length > 0) {
      while (week.length < 7) {
        week.push(null);
      }
      calendar.push(week);
    }
    
    return calendar;
  };

  const calendar = generateCalendar();

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50/30 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-gray-800 mb-2">Book Your Appointment</h1>
          <p className="text-gray-600">Choose your preferred date and time</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left & Center Column - Calendar & Time */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Calendar Section */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <CalendarIcon className="w-6 h-6 text-[#8B7BA8]" />
                <h3 className="text-gray-800">Select Date</h3>
              </div>

              <div className="flex justify-between items-center mb-6">
                <button 
                  onClick={handlePreviousMonth}
                  className="p-2 hover:bg-purple-50 rounded-xl transition-all duration-200"
                >
                  <ChevronLeft className="w-6 h-6 text-[#8B7BA8]" />
                </button>
                <span className="text-gray-800">{monthNames[currentMonth]} {currentYear}</span>
                <button 
                  onClick={handleNextMonth}
                  className="p-2 hover:bg-purple-50 rounded-xl transition-all duration-200"
                >
                  <ChevronRight className="w-6 h-6 text-[#8B7BA8]" />
                </button>
              </div>
              
              <div className="grid grid-cols-7 gap-2 mb-3">
                {daysOfWeek.map((day) => (
                  <div key={day} className="text-center text-sm text-gray-500 py-2">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-2">
                {calendar.flat().map((day, idx) => (
                  <button
                    key={idx}
                    onClick={() => day && setSelectedDate(day)}
                    disabled={!day}
                    className={`aspect-square flex items-center justify-center rounded-xl transition-all duration-200 ${
                      day === selectedDate
                        ? 'bg-gradient-to-br from-[#8B7BA8] to-[#7B6BA8] text-white shadow-lg transform scale-110'
                        : day
                        ? 'hover:bg-purple-50 bg-gray-50 text-gray-800 hover:shadow-md border border-gray-200'
                        : ''
                    }`}
                  >
                    {day || ''}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selection Section */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-6 h-6 text-[#8B7BA8]" />
                <h3 className="text-gray-800">Select Time</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-3 px-4 rounded-xl transition-all duration-200 text-sm ${
                      selectedTime === time
                        ? 'bg-gradient-to-r from-[#8B7BA8] to-[#7B6BA8] text-white shadow-lg transform scale-105'
                        : 'bg-gray-50 hover:bg-purple-50 text-gray-800 border border-gray-200 hover:border-[#8B7BA8]'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Summary & Actions */}
          <div className="space-y-6">
            {/* Appointment Summary */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-gray-800 mb-4">Appointment Summary</h3>
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                  <span className="text-sm text-gray-600 block mb-1">Selected Date</span>
                  <span className="text-gray-800">{monthNames[currentMonth]} {selectedDate}, {currentYear}</span>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                  <span className="text-sm text-gray-600 block mb-1">Selected Time</span>
                  <span className="text-gray-800">{selectedTime}</span>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-4 border border-green-100">
                  <span className="text-sm text-gray-600 block mb-1">Health Center</span>
                  <span className="text-gray-800">{centerInfo.name}</span>
                </div>
                <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4 border border-red-100">
                  <span className="text-sm text-gray-600 block mb-1">Doctor</span>
                  <span className="text-gray-800">{doctor.name} - {doctor.specialization}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => {
                  // Format the date as a string
                  const dateStr = `${monthNames[currentMonth]} ${selectedDate}, ${currentYear}`;
                  
                  addAppointment({
                    date: dateStr,
                    time: selectedTime,
                    centerName: centerInfo.name,
                    centerAddress: `${centerInfo.address}, ${centerInfo.city}, ${centerInfo.state} ${centerInfo.zipCode}`,
                    reason: 'General Checkup',
                    doctorName: doctor.name,
                    doctorSpecialization: doctor.specialization
                  });
                  navigate('/appointment-confirmation', { 
                    state: { 
                      appointment: {
                        date: dateStr,
                        time: selectedTime,
                        centerName: centerInfo.name,
                        centerAddress: `${centerInfo.address}, ${centerInfo.city}, ${centerInfo.state} ${centerInfo.zipCode}`,
                        doctorName: doctor.name,
                        doctorSpecialization: doctor.specialization
                      }
                    }
                  });
                }}
                className="w-full bg-gradient-to-r from-[#D4C5E8] to-[#C4B5D8] hover:from-[#C4B5D8] hover:to-[#B4A5C8] text-gray-800 py-4 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Confirm Appointment
              </button>
              <button
                onClick={() => navigate('/map')}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-6 rounded-xl transition-all duration-200"
              >
                Back to Search
              </button>
            </div>

            {/* Info Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              <h4 className="text-gray-800 mb-3 text-sm">What to Expect</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-[#8B7BA8] mt-0.5">•</span>
                  <span>Please arrive 15 minutes early</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8B7BA8] mt-0.5">•</span>
                  <span>Bring your insurance card</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8B7BA8] mt-0.5">•</span>
                  <span>Bring a valid photo ID</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
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