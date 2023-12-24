import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Curriculum from './components/Curriculum';
import Course from './components/Course';
import Request from './components/Request';
import Notification from './components/Notification';
import Profile from './components/Profile';
import Login from './components/Login';
import NoPage from "./components/NoPage.jsx";

function App() {
  return (
    <Router>
      <Header />
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