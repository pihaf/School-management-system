import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Typography, Layout, Button, Image, FloatButton, Collapse, theme} from "antd";
import { CaretRightOutlined } from '@ant-design/icons';

import "../css/UserCourse.css";
const { Content } = Layout;

const getItems = (panelStyle) => [
    {
      key: '1',
      label: 'How can I view my courses?',
      children: (
        <p>
          As a student or lecturer, you can view your courses by navigating to the "Courses"
          section on the website. There you will find a list of all the courses you are enrolled
          in or teaching, along with relevant information such as course name, course class code, and
          time.
        </p>
      ),
      style: panelStyle,
    },
    {
      key: '2',
      label: 'Where can I find my notifications?',
      children: (
        <p>
          Notifications can be accessed in the "Notifications" section of the website. This is
          where you will receive important updates, announcements, and messages from your
          instructors or administrators. Make sure to check your notifications
          regularly to stay informed about any changes or news related to your courses or the
          school.
        </p>
      ),
      style: panelStyle,
    },
    {
      key: '3',
      label: 'How can I check my grades?',
      children: (
        <p>
          Students can view their grades by going to the "Courses" and "View Grade" section. There, you will find
          a breakdown of your performance in each course, including individual assignment grades,
          exam scores, and overall course grades. If you have any concerns or questions about your
          grades, you can reach out to your course instructor for further clarification.
        </p>
      ),
      style: panelStyle,
    },
    {
      key: '4',
      label: 'Where can I find the latest news and updates?',
      children: (
        <p>
          The latest news and updates can be found in the "News" section of the website. This is
          where you will find information about school events, important announcements, deadlines,
          and other relevant news items. Stay tuned to the news section to stay up to date with the
          latest happenings in your school community.
        </p>
      ),
      style: panelStyle,
    },
    {
      key: '5',
      label: 'How can I make requests or submit inquiries?',
      children: (
        <p>
          Right noew the "Request" function is only available to students. If you need to make requests or submit inquiries, you can do so through the "Requests"
          section. This is where you can submit various types of requests such as course enrollment
          requests, change of personal information, or any other administrative inquiries. Fill out
          the necessary forms or provide the required information, and the school's administrative
          staff will address your request accordingly.
        </p>
      ),
      style: panelStyle,
    },
    {
      key: '6',
      label: 'Is there a chat feature available for communication?',
      children: (
        <p>
          Yes, the website provides a chat feature for communication purposes. Students, lecturers
          can use the chat feature to interact with the admins, discuss course-related
          matters, ask questions, or seek assistance. The chat feature promotes collaboration and enhances
          communication within the school community.
        </p>
      ),
      style: panelStyle,
    },
  ];

function Questions() {
  const navigate = useNavigate();
  const { token } = theme.useToken();

  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  };

  return (
    <Content style={{ margin: "0px 28px 0px 24px" }}>
      <Typography.Title level={2}>Frequently asked questions</Typography.Title>
      <Button
              onClick={() => {
                navigate(-1);
              }}
            >
              Back
            </Button>
      <Collapse
        bordered={false}
        defaultActiveKey={['1']}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        style={{ background: token.colorBgContainer }}
        items={getItems(panelStyle)}
      />
      <FloatButton.BackTop />
    </Content>
  );
}

export default Questions;
