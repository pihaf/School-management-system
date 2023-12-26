import React from 'react';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar.jsx';
import Header from './components/Header';
import Footer from './components/Footer';
import Timetable from './components/Timetable';
import Course from './components/Course';
import Request from './components/Request';
import Notification from './components/Notification';
import Profile from './components/Profile';
import Login from './components/Login';
import Logout from './components/Logout'; 
import NoPage from './components/NoPage.jsx';
import AdminLogin from './components/admin/AdminLogin.jsx';
import AdminLogout from './components/admin/AdminLogout.jsx';
import AdminHome from './components/admin/AdminHome.jsx';
import Dashboard from './components/admin/Dashboard.jsx'
import Students from './components/admin/Students.jsx';
import Lecturers from './components/admin/Lecturers.jsx';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken'));
  const [model, setModel] = useState(localStorage.getItem('model'));
  const [id, setId] = useState(localStorage.getItem('id'));

  // useEffect(() => {
  //   const token = localStorage.getItem('token');

  //   // Redirect to the login page if the token is not present
  //   if (!token && window.location.pathname !== '/login') {
  //     window.location.href = '/login';
  //   }
  // }, [token]);

  // function isAuthenticated() {
  //   return !!token; // Returns true if the token exists, false otherwise
  // };

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<>
              <Header />
              <Navbar />
              <Home />
              <Footer />
            </>} />
        <Route path="/login" element={<>
              <Header />
              <Navbar />
              <Login setToken={setToken} setModel={setModel} setId={setId}/>
              <Footer />
            </>} />
        <Route path="/logout" element={<>
              <Header />
              <Navbar />
              <Logout setToken={setToken} setModel={setModel} setId={setId} /> 
              <Footer />
        </>} />
        <Route path="/timetable" element={<>
              <Header />
              <Navbar />
              <Timetable isAuthenticated={!!token} model={model} id={id}/>
              <Footer/>
        </>} />
        <Route path="/course" element={<>
              <Header />
              <Navbar />
              <Course isAuthenticated={!!token} model={model} id={id}/>
              <Footer/>
        </>} />
        <Route path="/request" element={<>
              <Header />
              <Navbar />
              <Request isAuthenticated={!!token} model={model} id={id}/>
              <Footer/>
        </>} />
        <Route path="/notification" element={<>
              <Header />
              <Navbar />
              <Notification isAuthenticated={!!token} model={model} id={id}/>
              <Footer/>
        </>} />
        <Route path="/profile" element={<>
              <Header />
              <Navbar />
              <Profile isAuthenticated={!!token} model={model} id={id}/>
              <Footer/>
        </>} />
        <Route path="*" element={<NoPage />} />
        {/* For admins */}
        <Route path="/admin" element={<AdminHome isAuthenticated={!!adminToken} adminToken={adminToken} setAdminToken={setAdminToken}/>} />
        <Route path="/admin/login" element={<AdminLogin setAdminToken={setAdminToken}/>} />
        <Route path="/admin/logout" element={<AdminLogout setAdminToken={setAdminToken}/>} />
        <Route path="/admin/dashboard" element={<Dashboard isAuthenticated={!!adminToken } className="SideMenuAndPageContent PageContent"/>} />
        <Route path="/admin/students" element={<Students isAuthenticated={!!adminToken} className="SideMenuAndPageContent PageContent"/>} />
        <Route path="/admin/lecturers" element={<Lecturers isAuthenticated={!!adminToken} className="SideMenuAndPageContent PageContent"/>} />

      </Routes>
    </Router>
  );
}

export default App