import { User, Home, Heart, Settings, Moon, Calendar, Pill, Activity, TrendingUp, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HomePageProps {
  userName: string;
  stressEntries?: any[];
  prescriptions?: any[];
  appointments?: any[];
}

export default function HomePage({ userName, stressEntries = [], prescriptions = [], appointments = [] }: HomePageProps) {
  const navigate = useNavigate();

  const latestEntry = stressEntries[0];
  const upcomingPrescriptions = prescriptions.filter(p => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'short' });
    const dayMap: { [key: string]: string } = {
      'Monday': 'Mon',
      'Tuesday': 'Tue',
      'Wednesday': 'Wed',
      'Thursday': 'Thu',
      'Friday': 'Fri',
      'Saturday': 'Sat',
      'Sunday': 'Sun'
    };
    return p.days.includes(dayMap[today]);
  }).slice(0, 3);

  // Get upcoming appointments (mock for now)
  const upcomingAppointmentCount = appointments?.length || 0;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl bg-gradient-to-r from-[#8B7BA8] to-[#7B6BA8] bg-clip-text text-transparent mb-2">
          Welcome back, {userName}
        </h1>
        <p className="text-gray-500">Here's your health overview for today</p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Today's Summary Card */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg text-gray-800">Today's Summary</h2>
            <Activity className="w-5 h-5 text-[#8B7BA8]" />
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {/* Sleep */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
              <div className="flex items-center gap-2 mb-3">
                <Moon className="w-5 h-5 text-[#8B7BA8]" />
                <span className="text-sm text-gray-600">Sleep</span>
              </div>
              <div className="text-3xl text-[#8B7BA8] mb-1">{latestEntry?.sleepHours || 0}h</div>
              <p className="text-xs text-gray-500">Last night</p>
            </div>
            
            {/* Appointments */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-5 h-5 text-[#8B7BA8]" />
                <span className="text-sm text-gray-600">Appointments</span>
              </div>
              <div className="text-3xl text-[#8B7BA8] mb-1">{upcomingAppointmentCount}</div>
              <p className="text-xs text-gray-500">Upcoming</p>
            </div>
            
            {/* Prescriptions */}
            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6 border border-green-100">
              <div className="flex items-center gap-2 mb-3">
                <Pill className="w-5 h-5 text-[#8B7BA8]" />
                <span className="text-sm text-gray-600">Prescriptions</span>
              </div>
              <div className="text-3xl text-[#8B7BA8] mb-1">{prescriptions.length}</div>
              <p className="text-xs text-gray-500">Active</p>
            </div>
          </div>
        </div>

        {/* Quick Actions Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg text-gray-800 mb-6">Quick Actions</h2>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/log-stress')}
              className="w-full bg-gradient-to-r from-[#E8E3F0] to-[#DDD8E8] hover:from-[#DDD8E8] hover:to-[#D2CDE0] text-gray-800 py-3 px-4 rounded-lg text-left text-sm transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Log Wellness Entry
            </button>
            <button
              onClick={() => navigate('/appointment-booking')}
              className="w-full bg-gradient-to-r from-[#F0C5D0] to-[#E8B5C8] hover:from-[#E8B5C8] hover:to-[#E0A5C0] text-gray-800 py-3 px-4 rounded-lg text-left text-sm transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Schedule Appointment
            </button>
            <button
              onClick={() => navigate('/my-wellness')}
              className="w-full bg-gradient-to-r from-[#C5E8F0] to-[#B5D8E8] hover:from-[#B5D8E8] hover:to-[#A5C8E0] text-gray-800 py-3 px-4 rounded-lg text-left text-sm transition-all duration-200 shadow-sm hover:shadow-md"
            >
              View My Wellness
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Medications */}
        {upcomingPrescriptions.length > 0 && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg text-gray-800">Today's Medications</h2>
              <Clock className="w-5 h-5 text-[#8B7BA8]" />
            </div>
            <div className="space-y-2">
              {upcomingPrescriptions.map(p => (
                <div key={p.id} className="flex items-center justify-between bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg px-4 py-3 border border-purple-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#8B7BA8] rounded-lg flex items-center justify-center">
                      <Pill className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-800">{p.name}</p>
                      <p className="text-xs text-gray-500">{p.dosage}</p>
                    </div>
                  </div>
                  <span className="text-sm text-[#8B7BA8]">{p.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg text-gray-800">Recent Activity</h2>
            <TrendingUp className="w-5 h-5 text-[#8B7BA8]" />
          </div>
          <div className="space-y-3">
            {stressEntries.slice(0, 3).map(entry => (
              <div key={entry.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <p className="text-sm text-gray-800">Wellness Entry</p>
                  <p className="text-xs text-gray-500">{entry.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-[#8B7BA8]">{entry.mood}</p>
                  <p className="text-xs text-gray-500">Stress: {entry.stressLevel}/5</p>
                </div>
              </div>
            ))}
            {stressEntries.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-4">No recent activity</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}