import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav>
        <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/profile">Profile</Link>
            </li>
            <li>
                <Link to="/curriculum">Curriculum</Link>
            </li>
            <li>
                <Link to="/course">Course</Link>
            </li>
            <li>
                <Link to="/notification">Notification</Link>
            </li>
            <li>
                <Link to="/request">Request</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar;