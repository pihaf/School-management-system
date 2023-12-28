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
    <div className="SideMenu">
      <Menu
        className="SideMenuVertical"
        mode="vertical"
        theme="light"
        onClick={(item) => {
          //item.key
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
        items={[
          {
            label: "Home",
            icon: <HomeOutlined />,
            key: "/",
          },
          {
            label: "Profile",
            icon: <ProfileOutlined />,
            key: "/profile",
          },
          {
            label: "Timetable",
            key: "/timetable",
            icon: <ProjectOutlined />,
          },
          {
            label: "Courses",
            key: "/course",
            icon: <ReadOutlined />,
          },
          {
            label: "Notification",
            key: "/notification",
            icon: <NotificationOutlined />,
          },
          {
            label: "Requests",
            key: "/request",
            icon: <SolutionOutlined />,
          },
          {
            label: "Login",
            key: "/login",
            icon: <LoginOutlined />,
          },
          {
            label: "Logout",
            key: "/logout",
            icon: <LogoutOutlined />,
          },
        ]}
      ></Menu>
    </div>
  );
}

export default Navbar;
