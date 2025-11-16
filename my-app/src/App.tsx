import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import WelcomeScreen from './components/WelcomeScreen.tsx';
import Login from './components/Login.tsx';



export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const handleLogin = (data: any) => {
    setUserData(data);
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

        </Routes>
      </Router>
    </div>
  );
}
