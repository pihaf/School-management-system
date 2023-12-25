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

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [model, setModel] = useState(localStorage.getItem('model'));
  const [id, setId] = useState(localStorage.getItem('id'));

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Redirect to the login page if the token is not present
    if (!token && window.location.pathname !== '/login') {
      window.location.href = '/login';
    }
  }, [token]);

  // function isAuthenticated() {
  //   return !!token; // Returns true if the token exists, false otherwise
  // };

  return (
    <Router>
      <Header />
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login setToken={setToken} setModel={setModel} setId={setId}/>} />
        <Route path="/logout" element={<Logout setToken={setToken} setModel={setModel} setId={setId} />} />
        <Route path="/timetable" element={<Timetable />} />
        <Route path="/course" element={<Course isAuthenticated={!!token} model={model} id={id}/>} />
        <Route path="/request" element={<Request isAuthenticated={!!token} model={model} id={id}/>} />
        <Route path="/notification" element={<Notification isAuthenticated={!!token} model={model} id={id}/>} />
        <Route path="/profile" element={<Profile isAuthenticated={!!token} model={model} id={id}/>} />
        <Route path="*" element={<NoPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App