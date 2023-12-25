import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile({ isAuthenticated, model, id }) {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      alert('You need to login');
      navigate('/login');
    } else {
      const fetchProfileData = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/${model}s/profile`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setProfileData(data);
          } else {
            navigate('/login'); 
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchProfileData();
    }
  }, [isAuthenticated, model, navigate]);

  if (!profileData) {
    return <div>Loading...</div>; // Return a loading state while fetching the profile data
  }

  return (
    <div>
      <h1>Profile</h1>
      {model === 'lecturer' ? (
        <div>
          <p>Name: {profileData.name}</p>
          <p>Email: {profileData.email}</p>
          <p>Department: {profileData.department}</p>
          <p>Subject/Lab: {profileData['subject/lab']}</p>
          <p>Job Title: {profileData.job_title}</p>
          <p>Phone Number: {profileData.phone_number}</p>
          <p>Profile Image: {profileData.profile_image}</p>
        </div>
      ) : (
        <div>
          <p>Student ID: {profileData.student_id}</p>
          <p>Class: {profileData.student_class}</p>
          <p>Name: {profileData.name}</p>
          <p>Date of Birth: {new Date(profileData.date_of_birth).toLocaleDateString()}</p>
          <p>Gender: {profileData.gender}</p>
          <p>Place of Birth: {profileData.place_of_birth}</p>
          <p>Citizen ID: {profileData.citizen_id}</p>
          <p>Email: {profileData.email}</p>
          <p>Phone Number: {profileData.phone_number}</p>
          <p>Profile Image: {profileData.profile_image}</p>
        </div>
      )}
    </div>
  );
}

export default Profile;