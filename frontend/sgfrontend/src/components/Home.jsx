import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Typography, Carousel, Space } from "antd";

function Home() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      fetch('http://localhost:3000/api/news', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("News data:", data);
          setDataSource(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching news:", error);
        });
  }, []);

  return (
    <div style={{ backgroundColor: "yellow", height: "600px" }}>
      <Carousel style={{ height: "100%" }} autoplay dots pauseOnDotsHover draggable>
        <div style={{ height: "100%" }}>
          <img
            src="https://ihoctienganh.com/public/files/upload/default/images/hien-co-7-truong-va-5-khoa-thuoc-truong-dai-hoc-quoc-gia-ha-noi.jpg"
            alt="Slide 1"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        {dataSource.length > 0 ? (
          dataSource.slice(0, 3).map((item) => (
            <div style={{ height: "100%" }} key={item.new_id}>
              <img
                src={item.image}
                alt={`Slide ${item.new_id}`}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </Carousel>
    </div>
  );
}

export default Home;