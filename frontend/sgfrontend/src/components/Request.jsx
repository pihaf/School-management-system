import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Request({ isAuthenticated, model, id }) {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      alert('You need to login');
      navigate('/login');
    } else if (model === 'lecturer') {
      alert('Access denied');
      navigate('/');
    } else {
      const fetchRequests = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/requests/students/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setRequests(data);
          } else {
            throw new Error('Failed to fetch requests');         
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchRequests();
    }
  }, [isAuthenticated, navigate, id]);
  
  return (
    <div>
      <h1>Request</h1>
      <ul>
      {requests.map((request) => (
        <li key={request.request_id}>
          <p>Request ID: {request.request_id}</p>
          <p>Student ID: {request.Student.student_id}</p>
          <p>Type: {request.type}</p>
          <p>Details: {request.details}</p>
          <p>Status: {request.status}</p>
          <p>Created at: {new Date(request.created_at).toLocaleDateString()}</p>
          {request.Admin && (
            <>
              <p>Admin ID: {request.Admin.admin_id}</p>
              <p>Admin Email: {request.Admin.email}</p>
            </>
          )}
        </li>
      ))}
      </ul>
    </div>
  );
}

export default Request;