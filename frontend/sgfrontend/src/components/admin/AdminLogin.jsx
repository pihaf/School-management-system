import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button} from 'antd';

function AdminLogin({ setAdminToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {

    // Make API request to login
    const response = await fetch('http://localhost:3000/api/admin/login', {
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

      // Save the token in localStorage
      localStorage.setItem('adminToken', token);

      // Update the token state
      setAdminToken(token);

      // Redirect to the home page or any desired page
      navigate('/admin');
    } else {
      // Handle login error
      console.error('Login failed');
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
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
    </div>
  );
}

export default AdminLogin