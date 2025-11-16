import { useState } from 'react';
import { X, Plus, Pill, Clock, Calendar, Trash2, Bell, Edit2 } from 'lucide-react';
import React from 'react';

export interface Prescription {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  time: string;
  days: string[];
  notes: string;
}

interface PrescriptionManagerProps {
  prescriptions: Prescription[];
  onAddPrescription: (prescription: Omit<Prescription, 'id'>) => void;
  onDeletePrescription: (id: string) => void;
}

export default function PrescriptionManager({ prescriptions, onAddPrescription, onDeletePrescription }: PrescriptionManagerProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('Once daily');
  const [time, setTime] = useState('09:00');
  const [selectedDays, setSelectedDays] = useState<string[]>(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);
  const [notes, setNotes] = useState('');

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const frequencies = ['Once daily', 'Twice daily', 'Three times daily', 'As needed'];

  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const resetForm = () => {
    setName('');
    setDosage('');
    setFrequency('Once daily');
    setTime('09:00');
    setSelectedDays(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);
    setNotes('');
    setShowAddForm(false);
    setEditingId(null);
  };

  const handleAdd = () => {
    if (name && dosage && selectedDays.length > 0) {
      onAddPrescription({
        name,
        dosage,
        frequency,
        time,
        days: selectedDays,
        notes
      });
      
      resetForm();
    }
  };

  const handleEdit = (prescription: Prescription) => {
    setEditingId(prescription.id);
    setName(prescription.name);
    setDosage(prescription.dosage);
    setFrequency(prescription.frequency);
    setTime(prescription.time);
    setSelectedDays(prescription.days);
    setNotes(prescription.notes);
    setShowAddForm(true);
  };

  const handleUpdate = () => {
    if (editingId && name && dosage && selectedDays.length > 0) {
      // Delete the old one and add the updated one
      onDeletePrescription(editingId);
      onAddPrescription({
        name,
        dosage,
        frequency,
        time,
        days: selectedDays,
        notes
      });
      
      resetForm();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Pill className="w-6 h-6 text-[#8B7BA8]" />
          <h3 className="text-lg text-gray-800">Prescription Manager</h3>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="p-2 bg-gradient-to-r from-[#D4C5E8] to-[#C4B5D8] hover:from-[#C4B5D8] hover:to-[#B4A5C8] rounded-full transition-all duration-200 shadow-md hover:shadow-lg"
        >
          {showAddForm ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </button>
      </div>

      {showAddForm && (
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-100 shadow-md">
          <h4 className="mb-4 text-gray-800">Add New Prescription</h4>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Medication Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Aspirin"
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#8B7BA8] focus:ring-2 focus:ring-[#8B7BA8]/20 transition-all duration-200 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Dosage</label>
                <input
                  type="text"
                  value={dosage}
                  onChange={(e) => setDosage(e.target.value)}
                  placeholder="e.g., 100mg"
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#8B7BA8] focus:ring-2 focus:ring-[#8B7BA8]/20 transition-all duration-200 bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Frequency</label>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#8B7BA8] focus:ring-2 focus:ring-[#8B7BA8]/20 transition-all duration-200 bg-white"
                >
                  {frequencies.map(freq => (
                    <option key={freq} value={freq}>{freq}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Time</label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#8B7BA8] focus:ring-2 focus:ring-[#8B7BA8]/20 transition-all duration-200 bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Days</label>
              <div className="flex gap-2 flex-wrap">
                {daysOfWeek.map(day => (
                  <button
                    key={day}
                    onClick={() => toggleDay(day)}
                    className={`px-4 py-2 rounded-xl transition-all duration-200 ${
                      selectedDays.includes(day)
                        ? 'bg-gradient-to-r from-[#8B7BA8] to-[#7B6BA8] text-white shadow-md'
                        : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Notes (Optional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g., Take with food"
                rows={2}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#8B7BA8] focus:ring-2 focus:ring-[#8B7BA8]/20 transition-all duration-200 bg-white resize-none"
              />
            </div>

            <button
              onClick={editingId ? handleUpdate : handleAdd}
              disabled={!name || !dosage || selectedDays.length === 0}
              className="w-full bg-gradient-to-r from-[#D4C5E8] to-[#C4B5D8] hover:from-[#C4B5D8] hover:to-[#B4A5C8] text-gray-800 py-3 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {editingId ? 'Update Prescription' : 'Add Prescription'}
            </button>
          </div>
        </div>
      )}

      {prescriptions.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-200">
          <Pill className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500 mb-2">No prescriptions added yet</p>
          <p className="text-sm text-gray-400">Add your medications to track and get reminders</p>
        </div>
      ) : (
        <div className="space-y-3">
          {prescriptions.map((prescription) => (
            <div
              key={prescription.id}
              className="bg-gradient-to-br from-white via-purple-50 to-pink-50 rounded-2xl p-5 border border-purple-100 shadow-md hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#8B7BA8] to-[#7B6BA8] rounded-xl flex items-center justify-center shadow-md">
                    <Pill className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-gray-800 mb-1">{prescription.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{prescription.dosage} • {prescription.frequency}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-[#8B7BA8]" />
                        <span>{prescription.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-[#8B7BA8]" />
                        <span>{prescription.days.join(', ')}</span>
                      </div>
                    </div>

                    {prescription.notes && (
                      <p className="text-xs text-gray-500 bg-white/70 px-3 py-1.5 rounded-lg">{prescription.notes}</p>
                    )}

                    <div className="flex items-center gap-2 mt-3">
                      <Bell className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                        Reminders active
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(prescription)}
                    className="p-2 hover:bg-gray-50 rounded-lg transition-colors group"
                  >
                    <Edit2 className="w-5 h-5 text-gray-400 group-hover:text-gray-500 transition-colors" />
                  </button>
                  <button
                    onClick={() => onDeletePrescription(prescription.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                  >
                    <Trash2 className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}