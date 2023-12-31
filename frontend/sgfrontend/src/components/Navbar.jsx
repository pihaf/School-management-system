import {
  HomeOutlined,
  ProjectOutlined,
  SolutionOutlined,
  ReadOutlined,
  ProfileOutlined,
  NotificationOutlined,
  LoginOutlined,
  LogoutOutlined,
  CommentOutlined
} from "@ant-design/icons";
import { Menu, Layout } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Navbar({ model }) {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
    <div className="SideMenu">
  {model === null ? (
    <Menu
      className="SideMenuVertical"
      mode="vertical"
      theme="dark"
      onClick={(item) => {
        navigate(item.key);
      }}
      selectedKeys={[selectedKeys]}
      items={[
        {
          label: "Home",
          icon: <HomeOutlined />,
          key: "/home",
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
          key: "/courses",
          icon: <ReadOutlined />,
        },
        {
          label: "News",
          key: "/news",
          icon: <ProjectOutlined />,
        },
        {
          label: "Notifications",
          key: "/notifications",
          icon: <NotificationOutlined />,
        },
        {
          label: "Chat",
          key: "/chat",
          icon: <CommentOutlined />,
        },
        {
          label: "Login",
          key: "/login",
          icon: <LoginOutlined />,
        },
      ]}
    />
  ) : model === 'student' ? (
    <Menu
      className="SideMenuVertical"
      mode="vertical"
      theme="dark"
      onClick={(item) => {
        navigate(item.key);
      }}
      selectedKeys={[selectedKeys]}
      items={[
        {
          label: "Home",
          icon: <HomeOutlined />,
          key: "/home",
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
          key: "/courses",
          icon: <ReadOutlined />,
        },
        {
          label: "News",
          key: "/news",
          icon: <ProjectOutlined />,
        },
        {
          label: "Notifications",
          key: "/notifications",
          icon: <NotificationOutlined />,
        },
        {
          label: "Chat",
          key: "/chat",
          icon: <CommentOutlined />,
        },
        {
          label: "Logout",
          key: "/logout",
          icon: <LogoutOutlined />,
        },
      ]}
    />
  ) : (
    <Menu
      className="SideMenuVertical"
      mode="vertical"
      theme="dark"
      onClick={(item) => {
        navigate(item.key);
      }}
      selectedKeys={[selectedKeys]}
      items={[
        {
          label: "Home",
          icon: <HomeOutlined />,
          key: "/home",
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
          key: "/courses",
          icon: <ReadOutlined />,
        },
        {
          label: "News",
          key: "/news",
          icon: <ProjectOutlined />,
        },
        {
          label: "Notifications",
          key: "/notifications",
          icon: <NotificationOutlined />,
        },
        {
          label: "Chat",
          key: "/chat",
          icon: <CommentOutlined />,
        },
        {
          label: "Logout",
          key: "/logout",
          icon: <LogoutOutlined />,
        },
      ]}
    />
  )}
</div>
  );
}

export default Navbar;
