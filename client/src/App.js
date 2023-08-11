import React, { useState, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainHomepage from './components/homepage/main-homepage.js';
import Login from './components/auth/login';
import Home from './components/dashboard/home.js';
import './App.css';
import AdminNameContext from './components/context/AdminNameContext';
import AdminEmailContext from './components/context/adminContext.js';
import Risk from './components/dashboard/risk.js';

function App() {
  const [AdminEmail, setAdminEmail] = useState(localStorage.getItem('AdminEmail') || 'abc@xyz.com');
  const [firstName, setAdminName] = useState(localStorage.getItem('firstName') || null);

  return (
    <div className="App">
      <BrowserRouter>
        <AdminEmailContext.Provider value={{ AdminEmail, setAdminEmail }}>
          <AdminNameContext.Provider value={{ firstName, setAdminName }}>
            <main>
              <Routes>
                <Route path="/" element={<MainHomepage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard/home" element={<Home />} />
                <Route path='/dashboard/risk' element={<Risk />}/>
              </Routes>
            </main>
          </AdminNameContext.Provider>
        </AdminEmailContext.Provider>
      </BrowserRouter>
    </div>
  );
}

// PrivateRoutes component to handle the authenticated routes
// function PrivateRoutes() {
  

//   if (!AdminEmail) {
//     return <Navigate to="/" />;
//   } 

//   return (
//     <Routes>
//       <Route path="home" element={<Home />} />
//     </Routes>
//   );
// }

export default App;
