import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Typography, Carousel, Space, Layout } from "antd";

const { Content } = Layout;
function Home() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //     console.log(host)
  //     fetch(`${host}/api/news`, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log("News data:", data);
  //         setDataSource(data);
  //         setLoading(false);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching news:", error);
  //       });
  // }, []);

  return (
    <>
      <div
        style={{
          backgroundColor: "#fff",
          height: "100%",
          width: "86%",
          borderRadius: "10px 10px",
        }}
      >
        <Carousel
          style={{ height: "80%", width: "100%" }}
          autoplay
          dots
          pauseOnDotsHover
          draggable
        >
          <div style={{ height: "100%", width: "100%", objectFit: "cover" }}>
            <img
              src="/uet1.jpg"
              alt="Slide 1"
              style={{ width: "100%", borderRadius: "10px 10px" }}
            />
          </div>
          <div style={{ height: "100%", width: "100%", objectFit: "cover" }}>
            <img
              src="/uet2.jpg"
              alt="Slide 2"
              style={{ width: "100%", borderRadius: "10px 10px" }}
            />
          </div>
          <div style={{ height: "100%", width: "100%", objectFit: "cover" }}>
            <img
              src="/uet3.jpg"
              alt="Slide 3"
              style={{ width: "100%", borderRadius: "10px 10px" }}
            />
          </div>
          {/* <div style={{ height: "100%", width: "100%" }}>
          <img
            src="https://www.deskera.com/blog/content/images/2023/01/Assembly-To-Order-7-.png"
            alt="Slide 4"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div> */}
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
    </>
  );
}

export default Home;
