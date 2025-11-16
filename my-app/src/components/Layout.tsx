import { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Heart, Settings, LogOut, User, Stethoscope } from 'lucide-react';
import React from 'react';

interface LayoutProps {
  children: ReactNode;
  userName?: string;
  onLogout?: () => void;
}

export default function Layout({ children, userName, onLogout }: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const navigation = [
    { name: 'Home', path: '/home', icon: Home },
    { name: 'My Wellness', path: '/my-wellness', icon: Heart },
    { name: 'My Healthcare', path: '/my-healthcare', icon: Stethoscope },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm">
        {/* Logo/Brand */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#9B8BB8] to-[#7B6BA8] rounded-lg flex items-center justify-center shadow-md">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="bg-gradient-to-r from-[#8B7BA8] to-[#7B6BA8] bg-clip-text text-transparent">Health Hub</h1>
              {userName && <p className="text-sm text-gray-500">{userName}</p>}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  active
                    ? 'bg-gradient-to-r from-[#E8E3F0] to-[#DDD8E8] text-[#7B6BA8] shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{item.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        {onLogout && (
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={() => {
                onLogout();
                navigate('/login');
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}