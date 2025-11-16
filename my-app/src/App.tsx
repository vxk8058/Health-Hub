import { useState } from 'react';

// Define or import the StressEntry type

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
import MyHealthcare from './components/MyHealthcare.tsx';
import Settings from './components/Settings.tsx';
import Layout from './components/Layout.tsx';
import EligibilityCheck from './components/EligibilityCheck.tsx';
import MyWellness from './components/MyWellness.tsx';
import LogStress from './components/LogStress.tsx';
import PrescriptionsManager, {
  Prescription,
} from './components/PrescriptionManager.tsx';
export interface StressEntry {
  id: string;
  date: string;
  stressLevel: number;
  sleepHours: number;
  journal: string;
  mood: string;
  typeNote?: string;
}

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
    email: '',
    zipCode: '',
    phone: '',
    address: '',
    dateOfBirth: ''
  });

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [stressEntries, setStressEntries] = useState<StressEntry[]>([]);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);

  const handleLogin = (data: any) => {
    setUserData({
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      email: data.email || '',
      zipCode: data.zipCode || '',
      phone: data.phone || '',
      address: data.address || '',
      dateOfBirth: data.dateOfBirth || ''
    });
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserData({
      firstName: '',
      lastName: '',
      email: '',
      zipCode: '',
      phone: '',
      address: '',
      dateOfBirth: '',
    });
    setAppointments([]);
    setStressEntries([]);
    setPrescriptions([]);
  };

  const addAppointment = (
    appointment: Omit<Appointment, 'id'> & {
      centerName?: string;
      centerAddress?: string;
    },
  ) => {
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      date: appointment.date,
      time: appointment.time,
      doctorName: appointment.doctorName,
      doctorSpecialization: appointment.doctorSpecialization,
      reason: appointment.reason,
      centerName: appointment.centerName || 'Unknown Center',
      centerAddress: appointment.centerAddress || 'Address not provided',
    };
    setAppointments((prev) => [...prev, newAppointment]);
  };

  const cancelAppointment = (id: string) => {
    setAppointments(appointments.filter(apt => apt.id !== id));
  };

  const addStressEntry = (entry: Omit<StressEntry, 'id'>) => {
    const newEntry: StressEntry = {
      ...entry,
      id: Date.now().toString(),
    };
    setStressEntries((prev) => [...prev, newEntry]);
  };

  const addPrescription = (prescription: Omit<Prescription, 'id'>) => {
    const newRx: Prescription = {
      ...prescription,
      id: Date.now().toString(),
    };
    setPrescriptions((prev) => [...prev, newRx]);
  };

  const deletePrescription = (id: string) => {
    setPrescriptions((prev) => prev.filter((p) => p.id !== id));
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
                <Layout userName={userData.firstName} onLogout={handleLogout}>
                  <HomePage
                    userName={userData.firstName}
                    stressEntries={stressEntries}
                    prescriptions={prescriptions}
                    appointments={appointments}
                  />
                </Layout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route 
            path="/appointment-booking" 
            element={
              <Layout
              userName={userData.firstName}
              onLogout={handleLogout}
              >
                <AppointmentBooking
                  addAppointment={addAppointment}
                  userZipCode={userData.zipCode}
                />
              </Layout>
            } 
          />

          <Route
            path="/appointment-confirmation"
            element={
              <Layout userName={userData.firstName} onLogout={handleLogout}>
                <AppointmentConfirmation />
              </Layout>
          }
          />
          <Route
            path="/map"
            element={
              <Layout userName={userData.firstName} onLogout={handleLogout}>
                <MapPage />
              </Layout>
            }
          />

          <Route
            path="/my-healthcare"
            element={
              <Layout userName={userData.firstName} onLogout={handleLogout}>
                <MyHealthcare />
              </Layout>
            }
          />
          <Route
            path="/settings"
            element={
              isAuthenticated ? (
                <Layout
                  userName={userData.firstName}
                  onLogout={handleLogout}
                >
                  <Settings
                    userData={userData}
                    onUpdateUserData={setUserData}
                    onLogout={handleLogout}
                  />
                </Layout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />


          <Route
            path="/eligibility-check"
            element={
              <Layout userName={userData.firstName} onLogout={handleLogout}>
                <EligibilityCheck />
              </Layout>
            } 
          />

          <Route
            path="/calendar-sync"
            element={
              isAuthenticated ? (
                <Layout
                  userName={userData.firstName}
                  onLogout={handleLogout}
                >
                  <CalanderSync addAppointment={addAppointment} />
                </Layout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Route for MyAppointments */}
          <Route
            path="/my-appointments"
            element={
              isAuthenticated ? (
                <Layout userName={userData.firstName} onLogout={handleLogout}>
                  <MyAppointments
                    appointments={appointments}
                    onCancelAppointment={cancelAppointment}
                  />
                </Layout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/my-wellness"
            element={
              isAuthenticated ? (
                <Layout userName={userData.firstName} onLogout={handleLogout}>
                  <MyWellness
                    latestEntry={
                      stressEntries.length > 0
                        ? stressEntries[stressEntries.length - 1]
                        : undefined
                    }
                  />
                </Layout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />


<Route
            path="/prescriptions"
            element={
              isAuthenticated ? (
                <Layout
                  userName={userData.firstName}
                  onLogout={handleLogout}
                >
                  <PrescriptionsManager
                    prescriptions={prescriptions}
                    onAddPrescription={addPrescription}
                    onDeletePrescription={deletePrescription}
                  />
                </Layout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

<Route
            path="/log-stress"
            element={
              isAuthenticated ? (
                <Layout
                  userName={userData.firstName}
                  onLogout={handleLogout}
                >
                  <LogStress
                    addStressEntry={addStressEntry}
                    stressEntries={stressEntries}
                    prescriptions={prescriptions}
                    addPrescription={addPrescription}
                    deletePrescription={deletePrescription}
                  />
                </Layout>
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
