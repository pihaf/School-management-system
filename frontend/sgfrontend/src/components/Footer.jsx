import React from "react";
import { Typography, Input } from "antd";
import {
  FacebookFilled,
  InstagramOutlined,
  TwitterOutlined,
  YoutubeFilled,
} from "@ant-design/icons";
import "../css/Footer.css";

function Footer() {
  return (
    // <div className="AppFooter">
    //   <Typography.Link href="tel:+123456789">+123456789</Typography.Link>
    //   <Typography.Link href="https://www.google.com" target={"_blank"}>
    //     Privacy Policy
    //   </Typography.Link>
    //   <Typography.Link href="https://www.google.com" target={"_blank"}>
    //     Terms of Use
    //   </Typography.Link>
    // </div>
    <>
      <footer className="section-p1">
        <div className="info-col">
          <div className="col">
            <h4>COOPERATION – DEVELOPMENT</h4>
            <a href="https://uet.vnu.edu.vn/hoat-dong-hop-tac-phat-trien/">
              News
            </a>
            <a href="https://uet.vnu.edu.vn/category/tin-tuc/tin-hop-tac-2/">
              Information
            </a>
            <a href="https://uet.vnu.edu.vn/category/hop-tac/cac-doi-tac/">
              Partners
            </a>
          </div>

          <div className="col">
            <h4>QUALITY ASSURANCE</h4>
            <a href="/about">Quality assurance center</a>
            <a href="#">Three publicly</a>
            <a href="#">Quality verification</a>
          </div>
          <div className="col">
            <h4>CENTER – LABORATORY</h4>
            <a href="/about">
              Electronics and Telecommunications Research Center
            </a>
            <a href="#">GSHT interdisciplinary integrated technology center</a>
            <a href="#">Computer Center</a>
            <a href="#">Key Laboratory of Micro and Nano Technology</a>
            <a href="/contact">Key Laboratory Smart integrated system</a>
          </div>

          <div className="col">
            <h4>UNION</h4>
            <a href="/login">Youth Group</a>
            <a href="#">Student Association</a>
          </div>
        </div>
        <div className="footer">
          <div className="contact">
          <img
            className="logo"
            src="/logo-trans.png"
            alt="logo"
          ></img>
          <p>
            <strong>Address:</strong> 144 Xuân Thủy, Dịch Vọng Hậu, Cầu Giấy, Hà
            Nội
          </p>
          <p>
            <strong>Phone:</strong> +84(0)24 3754 7461
          </p>
          <p>
            <strong>Hours:</strong> Mon-Fri / 8:00AM - 17h30PM
          </p>
          </div>
          <div className="follow">
            <h4>Follow us</h4>
            <div className="icon">
              <FacebookFilled
                style={{ fontSize: "24px", marginRight: "10px" }}
              />
              <InstagramOutlined
                style={{ fontSize: "24px", marginRight: "10px" }}
              />
              <TwitterOutlined
                style={{ fontSize: "24px", marginRight: "10px" }}
              />
              <YoutubeFilled
                style={{ fontSize: "24px", marginRight: "10px" }}
              />
            </div>
          </div>
        </div>
         <div className="copyright">
          <p>© 2024 UETSupport, Inc - All Rights Reserved</p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
