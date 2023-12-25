import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setToken, setModel, setId }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      <form onSubmit={handleSubmit}>
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
      </form>
    </div>
  );
}

export default Login