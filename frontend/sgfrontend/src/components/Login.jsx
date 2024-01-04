import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";
import host from "../../config";
import "../css/Login.css";
function Login({ setToken, setModel, setId, setProfileHeader }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // e.preventDefault();

    // Make API request to login
    const response = await fetch(`${host}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      const token = data.token;
      const model = data.model;
      const id = data.id;

      // Save the token in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("model", model);
      localStorage.setItem("id", id);

      // Update the token state
      setToken(token);
      setModel(model);
      setId(id);

      const fetchProfileData = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/api/${model}s/profile`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            console.log(data);
            if (model === "student") {
              const { name, student_id } = data;
              const newData = {
                name,
                student_id,
              };
              localStorage.setItem("profileHeader", JSON.stringify(newData));
            } else if (model === "lecturer") {
              const { name, email } = data;
              const newData = {
                name,
                email,
              };
              localStorage.setItem("profileHeader", JSON.stringify(newData));
            }
            setProfileHeader(data);
          } else {
            navigate("/login");
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchProfileData();
      // Redirect to the home page or any desired page
      navigate("/");
    } else {
      // Handle login error
      console.error("Login failed");
    }
  };

  return (
    <div className="body">
      <div className="container">
        <div className="form-container sign-in-container">
          <Form onFinish={handleSubmit}>
            <h1>Sign in</h1>
            <div className="align">
              <Form.Item
                name="username"
                style={{ marginBottom: "6px", marginTop: "10px" }}
              >
                <Input
                  className="input-field"
                  placeholder="Username"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                ></Input>
              </Form.Item>
              <Form.Item name="password">
                <Input.Password
                  className="input-field"
                  placeholder="Password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                ></Input.Password>
              </Form.Item>
            </div>

            <Form.Item>
              <Button block type="primary" htmlType="submit">
                Sign In
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Welcome back!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
