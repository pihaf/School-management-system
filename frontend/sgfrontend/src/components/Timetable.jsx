import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { Dayjs } from 'dayjs';
// import { BadgeProps, CalendarProps } from 'antd';
import { Calendar, Badge } from 'antd';

function Timetable({ isAuthenticated, model, id }) {
  const navigate = useNavigate();
  const [timetableData, setTimetableData] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      alert('You need to login');
      navigate('/login');
    } else {
      fetch("http://localhost:3000/api/courses", { 
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }).then(response => response.json())
      .then(data => {
        const extractedData = data.map(record => {
          return {
            day: record.day,
            time: record.time,
            periods: record.periods
          };
        });
        setTimetableData(extractedData);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
      });
    }
  }, [isAuthenticated, navigate, id]);

  // const cellRender = (value) => {
  //   const filteredData = timetableData.filter(record => record.day.isSame(value, 'day'));
  //   return (
  //     <ul>
  //       {filteredData.map((record, index) => (
  //         <li key={index}>
  //           {record.time} - <Badge text={record.periods} />
  //         </li>
  //       ))}
  //     </ul>
  //   );
  // };

  return (
    <div>
      <h1>Timetable</h1>
      <Calendar />
    </div>
  );
}

export default Timetable;