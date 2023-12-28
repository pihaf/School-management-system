import React from "react";
import { Link } from "react-router-dom";
//import "../css/Navbar.css";
import {
  HomeOutlined,
  ProjectOutlined,
  SolutionOutlined,
  ReadOutlined,
  ProfileOutlined,
  NotificationOutlined,
  LoginOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Menu, Layout } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  //const [menuOpen, setMenuOpen] = useState(false);
  //   return (
  //     <nav>
  //         <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
  //             <span></span>
  //             <span></span>
  //             <span></span>
  //         </div>
  //         <ul>
  //             <li>
  //                 <Link to="/">Home</Link>
  //             </li>
  //             <li>
  //                 <Link to="/profile">Profile</Link>
  //             </li>
  //             <li>
  //                 <Link to="/timetable">Timetable</Link>
  //             </li>
  //             <li>
  //                 <Link to="/course">Course</Link>
  //             </li>
  //             <li>
  //                 <Link to="/notification">Notification</Link>
  //             </li>
  //             <li>
  //                 <Link to="/request">Request</Link>
  //             </li>
  //             <li>
  //                 <Link to="/login">Login</Link>
  //             </li>
  //             <li>
  //                 <Link to="/logout">Logout</Link>
  //             </li>
  //         </ul>
  //     </nav>
  //   )
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
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
                <Link to="/timetable">Timetable</Link>
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
                <Link to="/chat">Chat</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
            <li>
                <Link to="/logout">Logout</Link>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar;
