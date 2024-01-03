import React from "react";
import { Typography, Input } from "antd";
import { FacebookFilled, InstagramOutlined, TwitterOutlined, YoutubeFilled} from "@ant-design/icons";
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
        <div className="col">
          {/* <img className="logo" src="./resource/logo-transparent.png" alt="logo"> */}
          <h4>Contact</h4>
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
          <div className="follow">
            <h4>Follow us</h4>
            <div className="icon">
              {/* <i className="fab fa-facebook-f"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-instagram"></i>
              <i className="fab fa-pinterest-p"></i>
              <i className="fab fa-youtube"></i> */}
            <FacebookFilled style={{ fontSize: '24px', marginRight: '10px' }} />
            <InstagramOutlined style={{ fontSize: '24px', marginRight: '10px' }} />
            <TwitterOutlined style={{ fontSize: '24px', marginRight: '10px' }} />
            <YoutubeFilled style={{ fontSize: '24px', marginRight: '10px' }} />
            </div>
          </div>
        </div>

        <div className="col">
          <h4>About</h4>
          <a href="/about">About Us</a>
          <a href="#">Information</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
          <a href="/contact">Contact Us</a>
        </div>
        <div className="col">
          <h4>About</h4>
          <a href="/about">About Us</a>
          <a href="#"> Information</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
          <a href="/contact">Contact Us</a>
        </div>
        <div className="col">
          <h4>About</h4>
          <a href="/about">About Us</a>
          <a href="#"> Information</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
          <a href="/contact">Contact Us</a>
        </div>
        <div className="col">
          <h4>My Account</h4>
          <a href="/login">Sign In</a>
          <a href="#">Help</a>
        </div>

        <div className="copyright">
          <p>© 2024 UETSupport, Inc - All Rights Reserved</p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
