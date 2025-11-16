import { useState } from 'react';
import { Save, BookOpen, X, Calendar, Moon, Smile, Frown, Meh } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { StressEntry } from '../App';
import PrescriptionManager, { Prescription } from './PrescriptionManager.tsx';
import React from 'react';

interface LogStressProps {
  addStressEntry: (entry: Omit<StressEntry, 'id'>) => void;
  stressEntries: StressEntry[];
  prescriptions: Prescription[];
  addPrescription: (prescription: Omit<Prescription, 'id'>) => void;
  deletePrescription: (id: string) => void;
}

export default function LogStress({ addStressEntry, stressEntries, prescriptions, addPrescription, deletePrescription }: LogStressProps) {
  const [stressLevel, setStressLevel] = useState(3);
  const [sleepHours, setSleepHours] = useState(8);
  const [journal, setJournal] = useState('');
  const [mood, setMood] = useState('Good');
  const [showPastEntries, setShowPastEntries] = useState(false);
  const [activeTab, setActiveTab] = useState<'log' | 'prescriptions'>('log');

  const handleSave = () => {
    if (journal) {
      const today = new Date();
      const dateStr = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      
      addStressEntry({
        date: dateStr,
        stressLevel,
        sleepHours,
        journal,
        typeNote: '',
        mood
      });

      // Reset form
      setStressLevel(3);
      setSleepHours(8);
      setJournal('');
      setMood('Good');
      
      // Show success feedback
      alert('Stress log saved successfully!');
    }
  };

  const getMoodIcon = (moodValue: string) => {
    switch (moodValue) {
      case 'Excellent':
        return <Smile className="w-5 h-5 text-green-600" />;
      case 'Good':
        return <Smile className="w-5 h-5 text-blue-600" />;
      case 'Stressed':
        return <Frown className="w-5 h-5 text-orange-600" />;
      default:
        return <Meh className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50/30 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-gray-800 mb-2">Wellness Center</h1>
          <p className="text-gray-600">Track your wellness journey</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-3 bg-white p-2 rounded-2xl mb-8 shadow-sm border border-gray-200 max-w-md">
          <button
            onClick={() => setActiveTab('log')}
            className={`flex-1 py-3 px-6 rounded-xl transition-all duration-200 ${
              activeTab === 'log'
                ? 'bg-gradient-to-r from-[#8B7BA8] to-[#7B6BA8] text-white shadow-md'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
            }`}
          >
            Log Wellness
          </button>
          <button
            onClick={() => setActiveTab('prescriptions')}
            className={`flex-1 py-3 px-6 rounded-xl transition-all duration-200 ${
              activeTab === 'prescriptions'
                ? 'bg-gradient-to-r from-[#8B7BA8] to-[#7B6BA8] text-white shadow-md'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
            }`}
          >
            Prescriptions
          </button>
        </div>
        
        {activeTab === 'log' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Input Forms */}
            <div className="lg:col-span-2 space-y-6">
              {/* Stress Level */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                <label className="block text-gray-800 mb-4 flex items-center gap-2">
                  <span>Stress Level</span>
                  <span className="text-sm text-gray-500">({stressLevel}/5)</span>
                </label>
                <div className="flex gap-3 mb-2">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <button
                      key={level}
                      onClick={() => setStressLevel(level)}
                      className={`flex-1 h-16 rounded-xl transition-all duration-200 relative overflow-hidden border ${
                        stressLevel >= level 
                          ? 'bg-gradient-to-br from-[#D4C5E8] to-[#C4B5D8] border-[#C4B5D8] shadow-lg transform scale-105' 
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100 shadow-sm'
                      }`}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className={`text-lg ${stressLevel >= level ? 'text-white' : 'text-gray-400'}`}>
                          {level}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>

              {/* Sleep Hours */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                <label className="block text-gray-800 mb-4 flex items-center gap-2">
                  <Moon className="w-5 h-5 text-[#8B7BA8]" />
                  <span>Sleep Hours</span>
                  <span className="text-sm text-gray-500">({sleepHours} hours)</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="12"
                  value={sleepHours}
                  onChange={(e) => setSleepHours(parseInt(e.target.value))}
                  className="w-full h-3 bg-gradient-to-r from-purple-200 to-blue-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>0h</span>
                  <span>6h</span>
                  <span>12h</span>
                </div>
              </div>

              {/* Mood Selection */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                <label className="block text-gray-800 mb-4">How are you feeling?</label>
                <div className="grid grid-cols-3 gap-3">
                  {['Excellent', 'Good', 'Stressed'].map((moodOption) => (
                    <button
                      key={moodOption}
                      onClick={() => setMood(moodOption)}
                      className={`py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 border ${
                        mood === moodOption
                          ? 'bg-gradient-to-r from-[#8B7BA8] to-[#7B6BA8] text-white shadow-lg transform scale-105 border-[#7B6BA8]'
                          : 'bg-gray-50 hover:bg-gray-100 text-gray-800 shadow-sm border-gray-200'
                      }`}
                    >
                      {getMoodIcon(moodOption)}
                      <span>{moodOption}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Journal Entry */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                <label className="block text-gray-700 mb-3">Journal Entry</label>
                <textarea
                  value={journal}
                  onChange={(e) => setJournal(e.target.value)}
                  placeholder="How was your day? Write your thoughts here..."
                  rows={6}
                  className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-[#8B7BA8] focus:ring-2 focus:ring-[#8B7BA8]/20 transition-all duration-200 bg-gray-50 hover:bg-white resize-none"
                />
              </div>
            </div>
            
            {/* Right Column - Actions */}
            <div className="space-y-4">
              <button
                onClick={() => setShowPastEntries(true)}
                className="w-full bg-gradient-to-r from-[#F0C5D0] to-[#E8B5C8] hover:from-[#E8B5C8] hover:to-[#E0A5C0] text-gray-800 py-4 px-6 rounded-2xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <BookOpen className="w-5 h-5" />
                Past Entries ({stressEntries.length})
              </button>
              <button
                onClick={handleSave}
                className="w-full bg-gradient-to-r from-[#D4C5E8] to-[#C4B5D8] hover:from-[#C4B5D8] hover:to-[#B4A5C8] text-gray-800 py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <Save className="w-5 h-5" />
                Save Entry
              </button>
            </div>
          </div>
        ) : (
          <div>
            <PrescriptionManager 
              prescriptions={prescriptions}
              onAddPrescription={addPrescription}
              onDeletePrescription={deletePrescription}
            />
          </div>
        )}
        
        {/* Past Entries Modal */}
        {showPastEntries && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50" onClick={() => setShowPastEntries(false)}>
            <div className="bg-white rounded-[2rem] p-10 w-full max-w-5xl max-h-[85vh] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-gray-800 mb-1">Past Wellness Entries</h3>
                  <p className="text-sm text-gray-500">{stressEntries.length} total entries</p>
                </div>
                <button
                  onClick={() => setShowPastEntries(false)}
                  className="p-3 hover:bg-gradient-to-br hover:from-red-50 hover:to-red-100 rounded-full transition-all duration-200 group"
                >
                  <X className="w-6 h-6 text-gray-600 group-hover:text-red-600 transition-colors" />
                </button>
              </div>
              
              <div className="space-y-4 overflow-y-auto max-h-[60vh] pr-3 custom-scrollbar">
                {stressEntries.map((entry, index) => (
                  <div
                    key={entry.id}
                    className="bg-gradient-to-br from-purple-50 via-white to-pink-50 rounded-2xl p-6 border-2 border-purple-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group"
                  >
                    <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#8B7BA8] to-[#7B6BA8] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#D4C5E8] to-[#C4B5D8] rounded-2xl flex items-center justify-center shadow-md">
                          <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <span className="text-gray-800 block mb-1">{entry.date}</span>
                          <span className="text-xs text-gray-500">Entry #{stressEntries.length - index}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-xl shadow-sm border border-purple-100">
                        {getMoodIcon(entry.mood)}
                        <span className="text-sm text-gray-700">{entry.mood}</span>
                      </div>
                    </div>
                    
                    <div className="bg-white/90 rounded-2xl p-5 mb-4 shadow-inner border border-purple-50">
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="w-4 h-4 text-[#8B7BA8]" />
                        <span className="text-xs text-gray-500 uppercase tracking-wide">Journal Entry</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{entry.journal}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border border-orange-100 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-600 uppercase tracking-wide">Stress Level</span>
                          <div className={`w-2 h-2 rounded-full ${
                            entry.stressLevel <= 2 ? 'bg-green-500' :
                            entry.stressLevel <= 3 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}></div>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl text-gray-800">{entry.stressLevel}</span>
                          <span className="text-sm text-gray-500">/ 5</span>
                        </div>
                        <div className="mt-2 h-2 bg-white/50 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full transition-all duration-500"
                            style={{ width: `${(entry.stressLevel / 5) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-600 uppercase tracking-wide">Sleep Hours</span>
                          <Moon className="w-4 h-4 text-indigo-500" />
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl text-gray-800">{entry.sleepHours}</span>
                          <span className="text-sm text-gray-500">hours</span>
                        </div>
                        <div className="mt-2 h-2 bg-white/50 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full transition-all duration-500"
                            style={{ width: `${(entry.sleepHours / 12) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {stressEntries.length === 0 && (
                  <div className="text-center py-16">
                    <BookOpen className="w-20 h-20 mx-auto mb-4 text-gray-300" />
                    <p className="text-gray-500 mb-2">No entries yet</p>
                    <p className="text-sm text-gray-400">Start logging your wellness journey</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(to right, #8B7BA8, #7B6BA8);
          cursor: pointer;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(to right, #8B7BA8, #7B6BA8);
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

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