import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Timetable({ isAuthenticated, model, id }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      alert('You need to login');
      navigate('/login');
    }
  }, [isAuthenticated, navigate, id]);

  return <h1>Timetable</h1>;
}

export default Timetable;