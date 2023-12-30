import React from "react";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar.jsx";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Timetable from "./components/Timetable";
import Course from "./components/Course";
import Grade from "./components/Grade.jsx";
import Request from "./components/Request";
import Chat from "./components/Chat.jsx";
import News from "./components/News.jsx";
import NewsContent from "./components/NewsContent.jsx";
import Notification from "./components/Notification";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Logout from "./components/Logout";
import NoPage from "./components/NoPage.jsx";

import AdminLogin from "./components/admin/AdminLogin.jsx";
import AdminLogout from "./components/admin/AdminLogout.jsx";
import AdminHome from "./components/admin/AdminHome.jsx";
import Dashboard from "./components/admin/Dashboard.jsx";
import AdminProfile from "./components/admin/AdminProfile.jsx";
import Students from "./components/admin/Students.jsx";
import Lecturers from "./components/admin/Lecturers.jsx";
import AdminNews from "./components/admin/AdminNews.jsx";
import AdminRequest from "./components/admin/AdminRequest.jsx";
import AdminChat from "./components/admin/AdminChat.jsx";
import AdminCourse from "./components/admin/AdminCourse.jsx";
import AdminGrade from "./components/admin/AdminGrade.jsx";
import AdminNotification from "./components/admin/AdminNotification.jsx";
import "./css/AdminHome.css";


function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [adminToken, setAdminToken] = useState(
    localStorage.getItem("adminToken")
  );
  const [model, setModel] = useState(localStorage.getItem("model"));
  const [id, setId] = useState(localStorage.getItem("id"));

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
        <Route
          exact
          path="/home"
          element={
            <div className="App">
              <Header model={model} id={id} />
              <div className="SideMenuAndPageContent">
                <Navbar />
              </div>
              <Footer />
            </div>
          }
        />
        <Route
          exact
          path="/"
          element={
            <div className="App">
              <Header model={model} id={id} />
              <div className="SideMenuAndPageContent">
                <Navbar />
              </div>
              <Footer />
            </div>
          }
        />
        <Route
          path="/login"
          element={
            <div className="App">
              <Header />
              <div className="SideMenuAndPageContent">
                <Navbar />{" "}
                <Login setToken={setToken} setModel={setModel} setId={setId} />
              </div>

              <Footer />
            </div>
          }
        />
        <Route
          path="/logout"
          element={
            <div className="App">
              <Header />
              <div className="SideMenuAndPageContent">
                <Navbar />
                <Logout setToken={setToken} setModel={setModel} setId={setId} />
              </div>
              <Footer />
            </div>
          }
        />
        <Route
          path="/timetable"
          element={
            <div className="App">
              <Header />
              <div className="SideMenuAndPageContent">
                <Navbar />
                <Timetable isAuthenticated={!!token} model={model} id={id} />
              </div>
              <Footer />
            </div>
          }
        />
        <Route
          path="/courses"
          element={
            <div className="App">
              <Header />
              <div className="SideMenuAndPageContent">
                <Navbar />
                <Course isAuthenticated={!!token} model={model} id={id} />
              </div>

              <Footer />
            </div>
          }
        />
        <Route
          path="/grades/:courseId"
          element={
            <div className="App">
              <Header />
              <div className="SideMenuAndPageContent">
                <Navbar />
                <Grade isAuthenticated={!!token} model={model} id={id}/>
              </div>
              <Footer />
            </div>
          }
        />
        <Route
          path="/requests"
          element={
            <div className="App">
              <Header />
              <div className="SideMenuAndPageContent">
                <Navbar />
                <Request isAuthenticated={!!token} model={model} id={id} />
              </div>
              <Footer />
            </div>
          }
        />
        <Route
          path="/chat"
          element={
            <>
              <Header />
              <div className="SideMenuAndPageContent">
                <Navbar />
                <Chat
                  isAuthenticated={!!token}
                  model={model}
                  id={id}
                  token={token}
                />
              </div>

              <Footer />
            </>
          }
        />
        <Route
          path="/news/:newId"
          element={
            <div className="App">
              <Header />
              <div className="SideMenuAndPageContent">
                <Navbar />
                <NewsContent/>
              </div>
              <Footer />
            </div>
          }
        />
        <Route
          path="/news"
          element={
            <div className="App">
              <Header />
              <div className="SideMenuAndPageContent">
                <Navbar />
                <News isAuthenticated={!!token} model={model} id={id} />
              </div>
              <Footer />
            </div>
          }
        />
        <Route
          path="/notifications"
          element={
            <div className="App">
              <Header />
              <div className="SideMenuAndPageContent">
                <Navbar />
                <Notification isAuthenticated={!!token} model={model} id={id} />
              </div>

              <Footer />
            </div>
          }
        />
        <Route
          path="/profile"
          element={
            <div className="App">
              <Header />
              <div className="SideMenuAndPageContent">
                <Navbar />
                <Profile isAuthenticated={!!token} model={model} id={id} />
              </div>

              <Footer />
            </div>
          }
        />
        <Route path="*" element={<NoPage />} />
        {/* For admins */}
        <Route
          path="/admin"
          element={
            <AdminHome
              isAuthenticated={!!adminToken}
              adminToken={adminToken}
              setAdminToken={setAdminToken}
            />
          }
        />
        <Route
          path="/admin/login"
          element={<AdminLogin setAdminToken={setAdminToken} />}
        />
        <Route
          path="/admin/logout"
          element={<AdminLogout setAdminToken={setAdminToken} />}
        />
        <Route
          path="/admin/dashboard"
          element={
            <Dashboard
              isAuthenticated={!!adminToken}
              className="SideMenuAndPageContent PageContent"
            />
          }
        />
        <Route
          path="/admin/students"
          element={
            <Students
              isAuthenticated={!!adminToken}
              className="SideMenuAndPageContent PageContent"
            />
          }
        />
        <Route
          path="/admin/lecturers"
          element={
            <Lecturers
              isAuthenticated={!!adminToken}
              className="SideMenuAndPageContent PageContent"
            />
          }
        />
        <Route
          path="/admin/courses"
          element={
            <AdminCourse
              isAuthenticated={!!adminToken}
              className="SideMenuAndPageContent PageContent"
            />
          }
        />
        <Route
          path="/admin/news"
          element={
            <AdminNews
              isAuthenticated={!!adminToken}
              className="SideMenuAndPageContent PageContent"
            />
          }
        />
        <Route
          path="/admin/requests"
          element={
            <AdminRequest
              isAuthenticated={!!adminToken}
              className="SideMenuAndPageContent PageContent"
            />
          }
        />
        <Route
          path="/admin/notifications"
          element={
            <AdminNotification
              isAuthenticated={!!adminToken}
              className="SideMenuAndPageContent PageContent"
            />
          }
        />
        <Route
          path="/admin/chat"
          element={
            <AdminChat
              isAuthenticated={!!adminToken}
              adminToken={adminToken}
              className="SideMenuAndPageContent PageContent"
            />
          }
        />
        <Route
          path="/admin/grades"
          element={
            <AdminGrade
              isAuthenticated={!!adminToken}
              className="SideMenuAndPageContent PageContent"
            />
          }
        />
        <Route
          path="/admin/profile"
          element={
            <AdminProfile
              isAuthenticated={!!adminToken}
              className="SideMenuAndPageContent PageContent"
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
