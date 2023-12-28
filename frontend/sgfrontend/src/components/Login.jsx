import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button} from 'antd';

function Login({ setToken, setModel, setId }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // e.preventDefault();

    // Make API request to login
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      const token = data.token;
      const model = data.model;
      const id = data.id;

      // Save the token in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('model', model);
      localStorage.setItem('id', id);

      // Update the token state
      setToken(token);
      setModel(model);
      setId(id);

      // Redirect to the home page or any desired page
      navigate('/');
    } else {
      // Handle login error
      console.error('Login failed');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <Form onFinish={handleSubmit}>
        <Form.Item label="Username" name="username">
          <Input placeholder='Username' id='username' value={username} onChange={(e) => setUsername(e.target.value)} required></Input>
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input.Password placeholder='Password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} required></Input.Password>
        </Form.Item>
        <Form.Item>
          <Button block type='primary' htmlType='submit'>Login</Button>
        </Form.Item>
      </Form>
      {/* <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form> */}
    </div>
  );
}

export default Login