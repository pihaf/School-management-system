import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Course({ isAuthenticated, model, id }) {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      alert('You need to login');
      navigate('/login');
    } else {
      // Fetch the list of courses based on the user's role
      let url;
      if (model === 'student') {
        url = `http://localhost:3000/api/courses/students/${id}`; 
      } else if (model === 'lecturer') {
        url = `http://localhost:3000/api/courses/lecturers/${id}`; 
      }

      fetch(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          setCourses(data);
        })
        .catch(error => {
          console.error('Error fetching courses:', error);
        });
    }
  }, [isAuthenticated, navigate, model]);

  return (
    <div>
      <h1>Course</h1>
      <ul>
      {courses.map(course => (
        <li key={course.course_id}>
          <p>Title: {course.title}</p>
          <p>Course ID: {course.course_id}</p>
          <p>Class Code: {course.course_class_code}</p>
          <p>Course Code: {course.course_code}</p>
          <p>Course Name: {course.course_name}</p>
          <p>Credits: {course.credits}</p>
          <p>Number of Students: {course.number_of_students}</p>
          <p>Time: {course.time}</p>
          <p>Day: {course.day}</p>
          <p>Periods: {course.periods}</p>
          <p>Location: {course.location}</p>
          <p>Group: {course.group}</p>
          <p>Semester: {course.semester}</p>
        </li>
      ))}
      </ul>
    </div>
  );
}

export default Course