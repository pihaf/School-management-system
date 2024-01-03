import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {FloatButton, Tooltip, Modal, List, Typography} from 'antd';
// import { Dayjs } from 'dayjs';
// import { BadgeProps, CalendarProps } from 'antd';
import { Calendar, Badge } from 'antd';
import dayjs from "dayjs";
import host from "../../config";

function Timetable({ isAuthenticated, model, id, token }) {
  const navigate = useNavigate();
  const [timetableData, setTimetableData] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      alert('You need to login');
      navigate('/login');
    } else {
      fetch(`${host}/api/timetable/${model}s/${id}`, { 
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then(response => response.json())
      .then(data => {
        console.log("data fetch:", data);
        const extractedData = data.map(record => {
          return {
            course_id: record.course_id,
            course_class_code: record.course_class_code,
            course_name: record.course_name,
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

  console.log("Timetable fetched: ", timetableData);

  // function getSpecificDaysOfWeekInCurrentMonth() {
  //   const currentDate = dayjs();
  //   const year = currentDate.year();
  //   const month = currentDate.month();
  //   const numDaysInMonth = currentDate.daysInMonth();
  //   const specificDays = {
  //     Monday: [],
  //     Tuesday: [],
  //     Wednesday: [],
  //     Thursday: [],
  //     Friday: [],
  //     Saturday: [],
  //     Sunday: [],
  //   };
  
  //   for (let day = 1; day <= numDaysInMonth; day++) {
  //     const date = dayjs(`${year}-${month + 1}-${day}`);
  //     const dayOfWeek = date.format('dddd');
  //     const dayValue = parseInt(date.format('DD'));
  //     specificDays[dayOfWeek].push(dayValue);
  //   }
  
  //   return specificDays;
  // }
  
  // const specificDays = getSpecificDaysOfWeekInCurrentMonth();
  
  // //console.log(`Specific dates for each day of the week in ${year}-${month + 1}:`);
  // console.log(specificDays);

  const monthCellRender = (value) => {
    const currentMonth = (new Date()).getMonth();

    // Check if the current month matches the value's month
    if (currentMonth === value.month()) {
      return (
        <div className="notes-month">
          <section>Study according to plans</section>
          <span>Monthly Focus</span>
        </div>
      );
    }
  };

  const dateCellRender = (value) => {
    const courses = timetableData;
  
    const filteredCourses = courses.filter(course => String(Number(course.day) - 1) === value.day().toString());
    
    const handleCellClick = (course) => {
      Modal.info({
        title: course.course_class_code,
        content: (
          <List
            size="small"
            dataSource={[
              `Course Name: ${course.course_name}`,
              `Day of week: ${course.day}`,
              `Time: ${course.time}`,
              `Periods: ${course.periods}`,
            ]}
            renderItem={item => <List.Item>{item}</List.Item>}
          />
        ),
      });
    };
  
    return (
      <ul className="events" style={{listStyleType: "none"}}>
        {filteredCourses.map((course) => (
          <li key={course.course_id} onClick={() => handleCellClick(course)}>
              <Badge status={course.time === 'Sáng' ? 'warning' : 'success'} text={course.course_class_code} />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };

  return (
    <><div>
      <Typography.Title level={2}>Timetable</Typography.Title>
      <Calendar cellRender={cellRender}/>
    </div><FloatButton.BackTop /></>
  );
}

export default Timetable;