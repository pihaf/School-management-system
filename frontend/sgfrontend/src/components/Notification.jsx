import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Notification({ isAuthenticated, model, id }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      alert('You need to login');
      navigate('/login');
    }
  }, [isAuthenticated, navigate, id]);
}

export default Notification;