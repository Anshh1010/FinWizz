import React, { useState, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminIdContext from './components/context/adminContext';
import MainHomepage from './components/homepage/main-homepage.js';
import Login from './components/auth/login';
import Home from './components/dashboard/home.js';
import CreateSession from './components/dashboard/create-session.js';
import AssignDuty from './components/dashboard/assign-duty.js';
import SOS from './components/dashboard/SOS.js';
import Onboarding from './components/dashboard/onboarding.js';
import WorkNotifs from './components/dashboard/work-notif.js';
import Supervision from './components/dashboard/supervision.js';
import Analytics from './components/dashboard/analytics';
import './App.css';
import AdminNameContext from './components/context/AdminNameContext';
import DeleteUser from './components/dashboard/deleteUser';
import DeleteSession from './components/dashboard/deleteSession';
import AdminReg from './components/dashboard/admin-reg';

function App() {
  const [adminId, setAdminId] = useState(localStorage.getItem('adminID') || null);
  const [firstName, setAdminName] = useState(localStorage.getItem('firstName') || null);

  return (
    <div className="App">
      <BrowserRouter>
        <AdminIdContext.Provider value={{ adminId, setAdminId }}>
          <AdminNameContext.Provider value={{ firstName, setAdminName }}>
            <main>
              <Routes>
                <Route path="/" element={<MainHomepage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard/*" element={<PrivateRoutes />} />
              </Routes>
            </main>
          </AdminNameContext.Provider>
        </AdminIdContext.Provider>
      </BrowserRouter>
    </div>
  );
}

// PrivateRoutes component to handle the authenticated routes
function PrivateRoutes() {
  const { adminId } = useContext(AdminIdContext);

  if (!adminId) {
    return <Navigate to="/" />;
  } 

  return (
    <Routes>
      <Route path="home" element={<Home />} />
      <Route path="assign-duty" element={<AssignDuty />} />
      <Route path="create-session" element={<CreateSession />} />
      <Route path="sos" element={<SOS />} />
      <Route path="onboarding" element={<Onboarding />} />
      <Route path="post-work-notifications" element={<WorkNotifs />} />
      <Route path="supervision" element={<Supervision />} />
      <Route path="analytics" element={<Analytics />} />
      <Route path="delete-users" element={<DeleteUser />} />
      <Route path="delete-sessions" element={<DeleteSession />} />
      <Route path="admin-registration" element={<AdminReg />} />
    </Routes>
  );
}

export default App;
