import { Activity, Moon, Brain, Smile, TrendingUp, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { StressEntry } from '../App';
import React from 'react';

interface MyWellnessProps {
  latestEntry?: StressEntry;
}

export default function MyWellness({ latestEntry }: MyWellnessProps) {
  const navigate = useNavigate();

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl bg-gradient-to-r from-[#8B7BA8] to-[#7B6BA8] bg-clip-text text-transparent mb-2">
          My Wellness
        </h1>
        <p className="text-gray-500">Track your mental and physical wellbeing</p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Latest Status Card - Larger */}
        <div className="lg:col-span-2 bg-white rounded-xl p-8 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl text-gray-800">Current Status</h2>
            <Activity className="w-5 h-5 text-[#8B7BA8]" />
          </div>
          
          {latestEntry ? (
            <div className="grid grid-cols-3 gap-6">
              {/* Mood */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                <div className="flex items-center gap-2 mb-3">
                  <Smile className="w-5 h-5 text-[#8B7BA8]" />
                  <span className="text-sm text-gray-600">Mood</span>
                </div>
                <div className="text-2xl text-[#8B7BA8] mb-1">{latestEntry.mood}</div>
                <p className="text-xs text-gray-500">{latestEntry.date}</p>
              </div>

              {/* Sleep */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
                <div className="flex items-center gap-2 mb-3">
                  <Moon className="w-5 h-5 text-[#8B7BA8]" />
                  <span className="text-sm text-gray-600">Sleep</span>
                </div>
                <div className="text-2xl text-[#8B7BA8] mb-1">{latestEntry.sleepHours}h</div>
                <p className="text-xs text-gray-500">Last night</p>
              </div>

              {/* Stress */}
              <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6 border border-green-100">
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="w-5 h-5 text-[#8B7BA8]" />
                  <span className="text-sm text-gray-600">Stress</span>
                </div>
                <div className="text-2xl text-[#8B7BA8] mb-1">{latestEntry.stressLevel}/5</div>
                <p className="text-xs text-gray-500">Current level</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 mb-4">No wellness entries yet</p>
              <button
                onClick={() => navigate('/log-stress')}
                className="bg-gradient-to-r from-[#E8E3F0] to-[#DDD8E8] hover:from-[#DDD8E8] hover:to-[#D2CDE0] text-gray-800 py-3 px-6 rounded-lg text-sm transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Log Your First Entry
              </button>
            </div>
          )}

          {latestEntry?.journal && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm text-gray-600 mb-2">Journal Entry</h3>
              <p className="text-gray-800">{latestEntry.journal}</p>
            </div>
          )}
        </div>

        {/* Quick Actions Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg text-gray-800 mb-6">Quick Actions</h2>
          <button
            onClick={() => navigate('/log-stress')}
            className="w-full bg-gradient-to-r from-[#F0C5D0] to-[#E8B5C8] hover:from-[#E8B5C8] hover:to-[#E0A5C0] text-gray-800 py-3 px-4 rounded-lg text-left text-sm transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Log New Entry
          </button>
        </div>
      </div>
    </div>
  );
}