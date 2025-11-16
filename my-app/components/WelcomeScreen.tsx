import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function WelcomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white rounded-[2rem] p-16 w-full max-w-md shadow-2xl shadow-purple-100 flex flex-col items-center border border-gray-100">
        <p className="text-gray-400 mb-12 tracking-wide">Welcome screen</p>
        
        <div className="w-32 h-32 bg-gradient-to-br from-[#9B8BB8] to-[#7B6BA8] rounded-full flex items-center justify-center mb-6 shadow-lg">
          <User className="w-16 h-16 text-white" />
        </div>
        
        <h2 className="mb-12 text-center bg-gradient-to-r from-[#8B7BA8] to-[#7B6BA8] bg-clip-text text-transparent">Health Hub</h2>
        
        <button
          onClick={() => navigate('/login')}
          className="w-full bg-gradient-to-r from-[#D4C5E8] to-[#C4B5D8] hover:from-[#C4B5D8] hover:to-[#B4A5C8] text-gray-800 py-3 px-8 rounded-full mb-4 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Login
        </button>
        
        <button
          onClick={() => navigate('/create-account')}
          className="w-full bg-gradient-to-r from-[#D4C5E8] to-[#C4B5D8] hover:from-[#C4B5D8] hover:to-[#B4A5C8] text-gray-800 py-3 px-8 rounded-full transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Create Account
        </button>
      </div>
    </div>
  );
}