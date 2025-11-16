import { useState } from 'react';
import { User, Mail, Lock, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  setUserData: (data: any) => void;
  handleLogin: (data: any) => void;
}

export default function Login({ setUserData, handleLogin }: LoginProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (email && password) {
      const userData = {
        email,
        firstName: email.split('@')[0],
        lastName: ''
      };
      setUserData(userData);
      handleLogin(userData);
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white rounded-[2rem] p-16 w-full max-w-md shadow-2xl shadow-purple-100 border border-gray-100">
        <div className="mb-8">
          <label className="block text-gray-700 mb-3">Login</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email or Username"
            className="w-full px-6 py-3 border border-gray-200 rounded-full focus:outline-none focus:border-[#8B7BA8] focus:ring-2 focus:ring-[#8B7BA8]/20 transition-all duration-200 bg-gray-50 hover:bg-white"
          />
        </div>
        
        <div className="mb-8">
          <label className="block text-gray-700 mb-3">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-6 py-3 border border-gray-200 rounded-full focus:outline-none focus:border-[#8B7BA8] focus:ring-2 focus:ring-[#8B7BA8]/20 transition-all duration-200 bg-gray-50 hover:bg-white"
          />
        </div>
        
        <p className="text-gray-400 text-center mb-8">Forgot your password? <span className="underline cursor-pointer hover:text-[#8B7BA8] transition-colors" onClick={() => navigate('/create-account')}>Sign up</span></p>
        
        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-[#D4C5E8] to-[#C4B5D8] hover:from-[#C4B5D8] hover:to-[#B4A5C8] text-gray-800 py-3 px-8 rounded-full flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Login
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}