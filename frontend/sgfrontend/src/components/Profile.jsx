import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "antd";

function Profile({ isAuthenticated, model, id }) {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);

  useEffect(() =>
  {
    if (!isAuthenticated)
    {
      alert("You need to login");
      navigate("/login");
    } else
    {
      const fetchProfileData = async () =>
      {
        try
        {
          const response = await fetch(
            `http://localhost:3000/api/${model}s/profile`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem(
                  "token"
                )}`,
              },
            }
          );

          if (response.ok)
          {
            const data = await response.json();
            setProfileData(data);
          } else
          {
            navigate("/login");
          }
        } catch (error)
        {
          console.error(error);
        }
      };

      fetchProfileData();
    }
  }, [isAuthenticated, model, navigate]);

  if (!profileData)
  {
    return <div>Loading...</div>; // Return a loading state while fetching the profile data
  }

  const columns = [
    {
      title: "Field",
      dataIndex: "field",
    },
    {
      title: "Value",
      dataIndex: "value",
    },
  ];

  const data =
    model === "lecturer"
      ? [
        { field: "Name", value: profileData.name },
        { field: "Email", value: profileData.email },
        { field: "Department", value: profileData.department },
        { field: "Subject/Lab", value: profileData["subject/lab"] },
        { field: "Job Title", value: profileData.job_title },
        { field: "Phone Number", value: profileData.phone_number },
        { field: "Profile Image", value: profileData.profile_image },

      ]
      : [
        { field: "Student ID", value: profileData.student_id },
        { field: "Class", value: profileData.student_class },
        { field: "Name", value: profileData.name },
        {
          field: "Date of Birth",
          value: new Date(
            profileData.date_of_birth
          ).toLocaleDateString(),
        },
        { field: "Gender", value: profileData.gender },
        { field: "Email", value: profileData.email },
        { field: "Phone Number", value: profileData.phone_number },
        {
          field: "Profile Image",
          value: profileData.profile_image,
        },
      ];

  return (
    <div style={ { justifyContent: 'center', alignItems: 'center', height: '100vh' } }>
      <h1>Profile</h1>
      <Table columns={ columns } dataSource={ data } pagination={ false } />
    </div>
  );
  //   return (
  //     <div>
  //       <h1>Profile</h1>
  //       {model === 'lecturer' ? (
  //         <div>
  //           <p>Name: {profileData.name}</p>
  //           <p>Email: {profileData.email}</p>
  //           <p>Department: {profileData.department}</p>
  //           <p>Subject/Lab: {profileData['subject/lab']}</p>
  //           <p>Job Title: {profileData.job_title}</p>
  //           <p>Phone Number: {profileData.phone_number}</p>
  //           <p>Profile Image: {profileData.profile_image}</p>
  //         </div>
  //       ) : (
  //         <div>
  //           <p>Student ID: {profileData.student_id}</p>
  //           <p>Class: {profileData.student_class}</p>
  //           <p>Name: {profileData.name}</p>
  //           <p>Date of Birth: {new Date(profileData.date_of_birth).toLocaleDateString()}</p>
  //           <p>Gender: {profileData.gender}</p>
  //           <p>Place of Birth: {profileData.place_of_birth}</p>
  //           <p>Citizen ID: {profileData.citizen_id}</p>
  //           <p>Email: {profileData.email}</p>
  //           <p>Phone Number: {profileData.phone_number}</p>
  //           <p>Profile Image: {profileData.profile_image}</p>
  //         </div>
  //       )}
  //     </div>
  //   );
}

export default Profile;
