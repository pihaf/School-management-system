import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Typography, Carousel, Space } from "antd";

function Home() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      //console.log(host)
      fetch("http://localhost:3000/api/news", {
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
    <div style={{ backgroundColor: "yellow", height: "100%", width: "100%" }}>
      <Carousel style={{ height: "50%", width: "100%" }} autoplay dots pauseOnDotsHover draggable>
        <div style={{ height: "100%", width: "100%" }}>
          <img
            src="https://ihoctienganh.com/public/files/upload/default/images/hien-co-7-truong-va-5-khoa-thuoc-truong-dai-hoc-quoc-gia-ha-noi.jpg"
            alt="Slide 1"
            style={{ width: "100%", height: "100%" , objectFit: "cover" }}
          />
        </div>
        <div style={{ height: "100%", width: "100%"}}>
          <img
            src="https://onlinefirstaid4e88.b-cdn.net/wp-content/uploads/2019/06/school-sports-day-scaled.jpeg.bv_resized_desktop.jpeg.bv.webp?bv_host=onlinefirstaid.com"
            alt="Slide 2"
            style={{ width: "100%", height: "100%", objectFit: "cover"  }}
          />
        </div>
        <div style={{ height: "100%", width: "100%" }}>
          <img
            src="https://intercoast.edu/wp-content/uploads/2020/10/af8fe31b3f3ac22e3c133db1c46bec90.jpg"
            alt="Slide 3"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div style={{ height: "100%", width: "100%" }}>
          <img
            src="https://www.deskera.com/blog/content/images/2023/01/Assembly-To-Order-7-.png"
            alt="Slide 4"
            style={{ width: "100%", height: "100%", objectFit: "cover"  }}
          />
        </div>
        {/* {dataSource.length > 0 ? (
          dataSource.slice(0, 3).map((item) => (
            <div style={{ height: "100%", width: "100%" }} key={item.new_id}>
              <img
                src={item.image}
                alt={`Slide ${item.new_id}`}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )} */}
      </Carousel>
    </div>
  );
}

export default Home;