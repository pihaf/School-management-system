import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import socketIOClient from "socket.io-client";
import { Avatar, Rate, Space, Typography, Button, List } from "antd";
import { UserOutlined } from "@ant-design/icons";
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
  const [room, setRoom] = useState('');
  const [userRooms, setUserRooms] = useState([]);

  const socketRef = useRef();
  const messagesEnd = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient.connect(host)
  
    socketRef.current.on('getId', data => {
      setSocketId(data)
    })

    socketRef.current.on('sendDataServer', (dataGot) => {
      console.log("From sendDataServer: ");
      console.log(dataGot.data)
      setMess(oldMsgs => [...oldMsgs, dataGot.data]);
      scrollToBottom();
    });

    socketRef.current.on('serverSendUserRooms', (userRooms) => {
      console.log("User rooms:");
      console.log(userRooms);
      setUserRooms(userRooms);
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
        if (socketId){
          socketRef.current.emit('sendAdminSocketToServer', socketId);
        }
      }
  }, [isAuthenticated, navigate, adminToken, socketId]);

  const sendMessage = () => {
    if (room !== null) {
      console.log("Room in sendMessage:", room);
      if(message !== null) {
        const msg = {
          message: message, 
          socketId: socketId,
          room: room
        }
        socketRef.current.emit('sendDataClient', msg)
        setMess(oldMsgs => [...oldMsgs, msg])
        setMessage('')
      }
    }
  }

  const scrollToBottom = () => {
    messagesEnd.current.scrollIntoView({ behavior: "smooth" });
  }
  
  const renderMess =  mess.map((m, index) => 
        <div key={index} className={`${m.socketId === socketId ? 'your-message' : 'other-people'} chat-item`}>
          <div className="sender-info">
            {m.socketId !== socketId && (
              <Avatar size={24} icon={<UserOutlined />} />
            )}
            {m.socketId === socketId && (
              <Avatar size={24} icon={<UserOutlined />} className="admin-avatar" />
            )}
            {m.socketId === socketId ? 'Admin' : 'User'}
          </div>
          {m.message}
        </div>
      );

  const handleChange = (e) => {
    setMessage(e.target.value)
  }

  const onEnterPress = (e) => {
    if(e.keyCode == 13 && e.shiftKey == false) {
      sendMessage()
    }
  }

  // const handleRoomSelection = (selectedRoom) => {
  //   setRoom(selectedRoom);
  //   setMess([]); // Clear the messages when a new room is selected
  // };

  return (
      <div className="App">
        <AdminHeader />
        <div className="SideMenuAndPageContent">
          <SideMenu></SideMenu>
            <Typography.Title level={4}>Chat</Typography.Title>
              <div className="user-rooms">
                <Typography.Title level={5}>User Rooms</Typography.Title>
                <List
                  dataSource={Array.from(new Set(userRooms))}
                  renderItem={(room, index) => (
                    <List.Item key={`${room}_${index}`}>
                      {room}
                      <Button
                        type="link"
                        style={{ color: 'red' }}
                        onClick={() => {setRoom(room)}}
                      >
                        Select
                      </Button>
                    </List.Item>
                  )}
                />
              </div>
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
                      placeholder="Enter message ..." 
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