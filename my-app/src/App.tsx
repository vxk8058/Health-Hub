import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import WelcomeScreen from './components/WelcomeScreen.tsx';
import Login from './components/Login.tsx';
import AppointmentBooking from './components/AppointmentBooking.tsx';
import AppointmentConfirmation from './components/AppointmentConfirmation.tsx';
import CreateAccount from './components/CreateAccount.tsx';
import HomePage from './components/HomePage.tsx';

interface Appointment {
  id: string;
  date: string;
  time: string;
  center: string;
  type: string;
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const handleLogin = (data: any) => {
    setUserData({
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      email: data.email || ''
    });
    setIsAuthenticated(true);
  };

  const addAppointment = (appointment: Omit<Appointment, 'id'>) => {
    const newAppointment: Appointment = {
      ...appointment,
      id: Date.now().toString()
    };
    setAppointments([...appointments, newAppointment]);
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
                  appointments={appointments}          
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route 
            path="/appointment-booking" 
            element={<AppointmentBooking addAppointment={addAppointment} userZipCode={userData.email ? '10001' : ''} />} 
          />
          <Route path="/appointment-confirmation" element={<AppointmentConfirmation />} />
        </Routes>
      </Router>
    </div>
  );
}
