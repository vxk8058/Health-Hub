import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';

import WelcomeScreen from './components/WelcomeScreen.tsx';
import Login from './components/Login.tsx';
import AppointmentBooking from './components/AppointmentBooking.tsx';
import AppointmentConfirmation from './components/AppointmentConfirmation.tsx';
import CreateAccount from './components/CreateAccount.tsx';
import HomePage from './components/HomePage.tsx';
import MapPage from './components/MapPage.tsx';
import CalanderSync from './components/CalanderSync.tsx';
import MyAppointments from './components/MyAppointments.tsx';


export interface Appointment {
  id: string;
  date: string;
  time: string;
  centerName: string;
  centerAddress: string;
  doctorName?: string;
  doctorSpecialization?: string;
  reason?: string;
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
      id: Date.now().toString(),
      centerName: appointment.centerName || 'Unknown Center',
      centerAddress: appointment.centerAddress || 'Address not provided',
    };
    setAppointments([...appointments, newAppointment]);
  };

  const cancelAppointment = (id: string) => {
    setAppointments(appointments.filter(apt => apt.id !== id));
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
            element={
              <AppointmentBooking 
                addAppointment={addAppointment} 
                userZipCode={userData.email ? '10001' : ''} 
              />
            } 
          />

          <Route path="/appointment-confirmation" element={<AppointmentConfirmation />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/calendar-sync" element={<CalanderSync addAppointment={addAppointment} />} />

          {/* Route for MyAppointments */}
          <Route
            path="/my-appointments"
            element={
              isAuthenticated ? (
                <MyAppointments
                  appointments={appointments}
                  onCancelAppointment={cancelAppointment}
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
