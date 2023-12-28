import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import socketIOClient from "socket.io-client";
import { Avatar, Rate, Space, Typography } from "antd";
import AdminFooter from "./AdminFooter";
import AdminHeader from "./AdminHeader";
import SideMenu from "./SideMenu";
import '../../css/Chat.css';
import '../../css/AdminHome.css';

const host = "http://localhost:3000";

function AdminChat({ isAuthenticated, adminToken }) {
  const navigate = useNavigate();
  const [mess, setMess] = useState([]);
  const [message, setMessage] = useState('');
  const [socketId, setSocketId] = useState();
  const [isAdmin, setIsAdmin] = useState(false);

  const socketRef = useRef();
  const messagesEnd = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient.connect(host)
  
    socketRef.current.on('getId', data => {
      setSocketId(data)
    })

    socketRef.current.on('sendDataServer', dataGot => {
      setMess(oldMsgs => [...oldMsgs, dataGot.data]);
      scrollToBottom();
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
        alert('You need to login');
        navigate('/login');
      } else {
        // Check if the user is an admin based on the adminToken
        if (adminToken) {
            setIsAdmin(true);
            socketRef.current.emit('adminConnected'); // Notify the server that an admin is connected
        }
    }
  }, [isAuthenticated, navigate, adminToken]);

  const sendMessage = () => {
    if(message !== null) {
      const msg = {
        content: message, 
        socketId: socketId
      }
      socketRef.current.emit('sendDataClient', msg)
      setMessage('')
    }
  }

  const scrollToBottom = () => {
    messagesEnd.current.scrollIntoView({ behavior: "smooth" });
  }
  
  const renderMess = mess.map((m, index) =>
    (m.isAdmin || isAdmin) ? (
      <div
        key={index}
        className={`${m.socketId === socketId ? 'your-message' : 'other-people'} chat-item`}
      >
        {m.content}
      </div>
    ) : null
  );

  const handleChange = (e) => {
    setMessage(e.target.value)
  }

  const onEnterPress = (e) => {
    if(e.keyCode == 13 && e.shiftKey == false) {
      sendMessage()
    }
  }

  return (
      <div className="App">
        <AdminHeader />
        <div className="SideMenuAndPageContent">
          <SideMenu></SideMenu>
            <Typography.Title level={4}>Chat</Typography.Title>
            {/* <Space size={20} direction="horizontal"> */}
              <div className="box-chat">
                <div className="box-chat_message">
                {renderMess}
                <div style={{ float:"left", clear: "both" }}
                      ref={messagesEnd}>
                  </div>
                </div>
                <div className="send-box">
                    <textarea 
                      value={message}  
                      onKeyDown={onEnterPress}
                      onChange={handleChange} 
                      placeholder="Nhập tin nhắn ..." 
                    />
                    <button onClick={sendMessage}>
                      Send
                    </button>
                </div>

              </div>
        </div>
        <AdminFooter />
      </div>
  );
}

export default AdminChat;