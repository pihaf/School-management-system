import React from 'react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar.jsx';
import Header from './components/Header';
import Footer from './components/Footer';
import Curriculum from './components/Curriculum';
import Course from './components/Course';
import Request from './components/Request';
import Notification from './components/Notification';
import Profile from './components/Profile';
import Login from './components/Login';
import NoPage from './components/NoPage.jsx';

function App() {
  useEffect(() => {
    const token = localStorage.getItem('token');

    // Redirect to the login page if the token is not present
    if (!token && window.location.pathname !== '/login') {
      window.location.href = '/login';
    }
  }, []);
  
  return (
    <Router>
      <Header />
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/curriculum" element={<Curriculum />} />
        <Route path="/course" element={<Course />} />
        <Route path="/request" element={<Request />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App