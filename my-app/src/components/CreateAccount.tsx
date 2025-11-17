import { useState } from 'react';
import { User, Mail, Lock, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import React from 'react';

interface CreateAccountProps {
  setUserData: (data: any) => void;
  handleLogin: (data: any) => void;
}

export default function CreateAccount({ setUserData, handleLogin }: CreateAccountProps) {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (firstName && email && password) {
      const userData = {
        firstName,
        lastName,
        email
      };
      setUserData(userData);
      handleLogin(userData);
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white rounded-[2rem] p-16 w-full max-w-md shadow-2xl shadow-purple-100 border border-gray-100">
        <p className="text-gray-400 mb-12 tracking-wide">Create Account</p>
        
        <div className="mb-8">
          {/* <label className="block text-gray-700 mb-3">Health Hub</label> */}
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-6 py-3 border border-gray-200 rounded-full focus:outline-none focus:border-[#8B7BA8] focus:ring-2 focus:ring-[#8B7BA8]/20 transition-all duration-200 bg-gray-50 hover:bg-white mb-4"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-6 py-3 border border-gray-200 rounded-full focus:outline-none focus:border-[#8B7BA8] focus:ring-2 focus:ring-[#8B7BA8]/20 transition-all duration-200 bg-gray-50 hover:bg-white mb-4"
          />
          <input
            type="text"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-6 py-3 border border-gray-200 rounded-full focus:outline-none focus:border-[#8B7BA8] focus:ring-2 focus:ring-[#8B7BA8]/20 transition-all duration-200 bg-gray-50 hover:bg-white mb-4"
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-6 py-3 border border-gray-200 rounded-full focus:outline-none focus:border-[#8B7BA8] focus:ring-2 focus:ring-[#8B7BA8]/20 transition-all duration-200 bg-gray-50 hover:bg-white"
          />
        </div>
        
        <p className="text-gray-400 text-center mb-8">Already have an account? <span className="underline cursor-pointer hover:text-[#8B7BA8] transition-colors" onClick={() => navigate('/login')}>Login</span></p>
        
        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-[#D4C5E8] to-[#C4B5D8] hover:from-[#C4B5D8] hover:to-[#B4A5C8] text-gray-800 py-3 px-8 rounded-full flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Create Account
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}