import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import WelcomeScreen from './components/WelcomeScreen.tsx';
import Login from './components/Login.tsx';
import CreateAccount from './components/CreateAccount.tsx';
import HomePage from './components/HomePage.tsx';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const handleLogin = (data: any) => {
    setUserData({
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      email: data.email || ''
    });
    setIsAuthenticated(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Router>
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route
            path="/login"
            element={
              <Login
                setUserData={setUserData}
                handleLogin={handleLogin}
              />
            }
          />
          <Route
            path="/create-account"
            element={
              <CreateAccount
                setUserData={setUserData}
                handleLogin={handleLogin}
              />
            }
          />
          <Route
            path="/home"
            element={
              isAuthenticated ? (
                <HomePage
                  userName={userData.firstName}
                  stressEntries={[]}        
                  prescriptions={[]}         
                  appointments={[]}          
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
}
