import { useState } from 'react';
import { CheckCircle2, User, ArrowLeft, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import React from 'react';

export default function EligibilityCheck() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [insuranceProvider, setInsuranceProvider] = useState('');
  const [memberId, setMemberId] = useState('');

  const insuranceProviders = [
    'Blue Cross Blue Shield',
    'UnitedHealthcare',
    'Aetna',
    'Cigna',
    'Humana',
    'Medicare',
    'Medicaid'
  ];

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100 shadow-sm">
        <p className="text-gray-700 mb-6">
          Enter your name and birthday to check eligibility
        </p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-[#8B7BA8] focus:ring-2 focus:ring-[#8B7BA8]/20 transition-all duration-200 bg-white"
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-700 mb-2">Date of Birth</label>
            <input
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-[#8B7BA8] focus:ring-2 focus:ring-[#8B7BA8]/20 transition-all duration-200 bg-white"
            />
          </div>
        </div>
      </div>
      
      <button
        onClick={() => setStep(2)}
        disabled={!name || !birthday}
        className="w-full bg-gradient-to-r from-[#D4C5E8] to-[#C4B5D8] hover:from-[#C4B5D8] hover:to-[#B4A5C8] text-gray-800 py-4 px-8 rounded-2xl transition-all duration-200 shadow-md hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        Next
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-100 shadow-sm">
        <p className="text-gray-700 mb-6">
          Enter your insurance details to verify eligibility
        </p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Insurance Provider</label>
            <select
              value={insuranceProvider}
              onChange={(e) => setInsuranceProvider(e.target.value)}
              className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-[#8B7BA8] focus:ring-2 focus:ring-[#8B7BA8]/20 transition-all duration-200 bg-white appearance-none cursor-pointer"
            >
              <option value="">Select your insurance provider</option>
              {insuranceProviders.map((provider) => (
                <option key={provider} value={provider}>
                  {provider}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm text-gray-700 mb-2">Member ID</label>
            <input
              type="text"
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
              placeholder="Enter your member ID"
              className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-[#8B7BA8] focus:ring-2 focus:ring-[#8B7BA8]/20 transition-all duration-200 bg-white"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setStep(1)}
          className="flex-1 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800 py-4 px-8 rounded-2xl transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Back
        </button>
        <button
          onClick={() => setStep(3)}
          disabled={!insuranceProvider || !memberId}
          className="flex-1 bg-gradient-to-r from-[#D4C5E8] to-[#C4B5D8] hover:from-[#C4B5D8] hover:to-[#B4A5C8] text-gray-800 py-4 px-8 rounded-2xl transition-all duration-200 shadow-md hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          Check Eligibility
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border-2 border-emerald-200 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle2 className="w-8 h-8 text-emerald-600" />
          <h4 className="text-lg text-gray-800">You're eligible for coverage!</h4>
        </div>
        <p className="text-sm text-gray-600 mb-6">
          Great news! Based on the information provided, you qualify for healthcare coverage.
        </p>
        
        <div className="bg-white/70 rounded-xl p-5 space-y-3">
          <div className="flex justify-between items-center pb-3 border-b border-gray-200">
            <span className="text-sm text-gray-600">Name</span>
            <span className="text-gray-800">{name || 'John Doe'}</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-gray-200">
            <span className="text-sm text-gray-600">Date of Birth</span>
            <span className="text-gray-800">{birthday ? new Date(birthday).toLocaleDateString() : 'MM/DD/YYYY'}</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-gray-200">
            <span className="text-sm text-gray-600">Insurance Provider</span>
            <span className="text-gray-800">{insuranceProvider}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Member ID</span>
            <span className="text-gray-800">{memberId}</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h4 className="text-gray-800 mb-4">Coverage Details</h4>
          <div className="space-y-3">
            <div className="bg-gray-50 rounded-xl p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Plan Type</p>
                <p className="text-gray-800">PPO Gold Plan</p>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="bg-gray-50 rounded-xl p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Deductible</p>
                <p className="text-gray-800">$500 / $2,000</p>
              </div>
              <span className="text-xs text-gray-500">Met / Total</span>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Coverage Period</p>
                <p className="text-gray-800">Jan 1, 2025 - Dec 31, 2025</p>
              </div>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs border border-emerald-200">Active</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h4 className="text-gray-800 mb-4">Available Benefits</h4>
          <div className="space-y-3">
            <div className="bg-blue-50 hover:bg-blue-100 rounded-xl p-4 text-center transition-all duration-200 shadow-sm border border-blue-100">
              <p className="text-xs text-gray-600 mb-1">Primary Care</p>
              <p className="text-sm text-gray-800">$20 copay</p>
            </div>
            <div className="bg-purple-50 hover:bg-purple-100 rounded-xl p-4 text-center transition-all duration-200 shadow-sm border border-purple-100">
              <p className="text-xs text-gray-600 mb-1">Specialist</p>
              <p className="text-sm text-gray-800">$40 copay</p>
            </div>
            <div className="bg-green-50 hover:bg-green-100 rounded-xl p-4 text-center transition-all duration-200 shadow-sm border border-green-100">
              <p className="text-xs text-gray-600 mb-1">Prescriptions</p>
              <p className="text-sm text-gray-800">$10-$50</p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => navigate('/home')}
        className="w-full bg-gradient-to-r from-[#D4C5E8] to-[#C4B5D8] hover:from-[#C4B5D8] hover:to-[#B4A5C8] text-gray-800 py-4 px-8 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
      >
        Return to Dashboard
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50/30 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-gray-800 mb-2">Eligibility Check</h1>
            <p className="text-gray-600">Verify your insurance coverage</p>
          </div>
          <div className="flex gap-2">
            <div className={`w-10 h-2 rounded-full transition-all duration-300 ${step === 1 ? 'bg-gradient-to-r from-[#8B7BA8] to-[#7B6BA8]' : 'bg-gray-200'}`} />
            <div className={`w-10 h-2 rounded-full transition-all duration-300 ${step === 2 ? 'bg-gradient-to-r from-[#8B7BA8] to-[#7B6BA8]' : 'bg-gray-200'}`} />
            <div className={`w-10 h-2 rounded-full transition-all duration-300 ${step === 3 ? 'bg-gradient-to-r from-[#8B7BA8] to-[#7B6BA8]' : 'bg-gray-200'}`} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Step Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm sticky top-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#9B8BB8] to-[#7B6BA8] rounded-full flex items-center justify-center shadow-lg mx-auto mb-4">
                {step === 3 ? (
                  <CheckCircle2 className="w-8 h-8 text-white" />
                ) : (
                  <Shield className="w-8 h-8 text-white" />
                )}
              </div>
              <div className="text-center mb-6">
                <h3 className="text-gray-800 mb-2">Step {step} of 3</h3>
                <p className="text-sm text-gray-500">
                  {step === 1 && 'Personal Information'}
                  {step === 2 && 'Insurance Details'}
                  {step === 3 && 'Eligibility Results'}
                </p>
              </div>

              <div className="space-y-3 pt-6 border-t border-gray-200">
                <div className={`flex items-center gap-3 text-sm ${step >= 1 ? 'text-[#8B7BA8]' : 'text-gray-400'}`}>
                  <div className={`w-2 h-2 rounded-full ${step >= 1 ? 'bg-[#8B7BA8]' : 'bg-gray-300'}`}></div>
                  <span>Enter personal info</span>
                </div>
                <div className={`flex items-center gap-3 text-sm ${step >= 2 ? 'text-[#8B7BA8]' : 'text-gray-400'}`}>
                  <div className={`w-2 h-2 rounded-full ${step >= 2 ? 'bg-[#8B7BA8]' : 'bg-gray-300'}`}></div>
                  <span>Provide insurance details</span>
                </div>
                <div className={`flex items-center gap-3 text-sm ${step >= 3 ? 'text-[#8B7BA8]' : 'text-gray-400'}`}>
                  <div className={`w-2 h-2 rounded-full ${step >= 3 ? 'bg-[#8B7BA8]' : 'bg-gray-300'}`}></div>
                  <span>View eligibility results</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Forms */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
              {step === 1 ? renderStep1() : step === 2 ? renderStep2() : renderStep3()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
