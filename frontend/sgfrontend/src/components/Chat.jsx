import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import socketIOClient from "socket.io-client";
import '../../src/css/Chat.css';
const host = "http://localhost:3000";

function Chat({ isAuthenticated, model, id, token }) {
  const navigate = useNavigate()
  const [mess, setMess] = useState([]);
  const [message, setMessage] = useState('');
  const [socketId, setSocketId] = useState();
  const [isUser, setIsUser] = useState(false);

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
      if (token) {
        setIsUser(true);
      }
    }
  }, [isAuthenticated, navigate, model, token]);

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
    (m.isUser || isUser) ? (
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
    <div class="box-chat">
      <div class="box-chat_message">
      {renderMess}
      <div style={{ float:"left", clear: "both" }}
             ref={messagesEnd}>
        </div>
      </div>

      <div class="send-box">
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