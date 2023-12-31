import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Rate, Space, Typography, Button, List } from "antd";
import { UserOutlined } from "@ant-design/icons";
import socketIOClient from "socket.io-client";
import '../../src/css/Chat.css';
const host = "http://localhost:3000";

function Chat({ isAuthenticated, model, id, token }) {
  const navigate = useNavigate()
  const [mess, setMess] = useState([]);
  const [message, setMessage] = useState('');
  const [socketId, setSocketId] = useState();
  const [room, setRoom] = useState('');

  const socketRef = useRef();
  const messagesEnd = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient.connect(host)
  
    socketRef.current.on('getId', data => {
      setSocketId(data);
      // const newRoom = `${model}_${id}`;
      // setRoom(newRoom);
      // socketRef.current.emit('sendUserRoomToServer', { room: newRoom });
      // socketRef.current.emit("join_room", newRoom);
    })

    socketRef.current.on('sendDataServer', (dataGot) => {
      console.log("From sendDataServer: ");
      console.log(dataGot.data)
      setMess(oldMsgs => [...oldMsgs, dataGot.data])
      scrollToBottom()
    })

    return () => {
      socketRef.current.emit("disconnect-event", { id, model });
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      alert('You need to login');
      navigate('/login');
    } else {
      if (socketId) {
        const newRoom = `${model}_${id}`;
        setRoom(newRoom);
        console.log('User room from fe:');
        console.log(newRoom);
      }
    }
  }, [isAuthenticated, navigate, model, id, token, socketId]);

  useEffect(() => {
    if (room) {
      socketRef.current.emit('sendUserRoomToServer', { room: room });
      socketRef.current.emit("join_room", room);
    } else {
      console.log("User room not exists");
    }
  }, [room]);

  const sendMessage = () => {
    if(message !== null) {
      const msg = {
        message: message, 
        socketId: socketId,
        room: room,
      }
      socketRef.current.emit('sendDataClient', msg);
      setMess(oldMsgs => [...oldMsgs, msg]);
      setMessage('');
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
      )

  const handleChange = (e) => {
    setMessage(e.target.value)
  }

  const onEnterPress = (e) => {
    if(e.keyCode == 13 && e.shiftKey == false) {
      sendMessage()
    }
  }

  return (
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
  );
}

export default Chat;