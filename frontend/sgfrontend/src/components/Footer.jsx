import React from "react";
import { Typography, Input } from "antd";
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
      <footer class="section-p1">
        <div class="col">
          {/* <img class="logo" src="./resource/logo-transparent.png" alt="logo"> */}
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
          <div class="follow">
            <h4>Follow us</h4>
            <div class="icon">
              <i class="fab fa-facebook-f"></i>
              <i class="fab fa-twitter"></i>
              <i class="fab fa-instagram"></i>
              <i class="fab fa-pinterest-p"></i>
              <i class="fab fa-youtube"></i>
            </div>
          </div>
        </div>

        <div class="col">
          <h4>About</h4>
          <a href="/about">About Us</a>
          <a href="#">Delivery Information</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
          <a href="/contact">Contact Us</a>
        </div>
        <div class="col">
          <h4>About</h4>
          <a href="/about">About Us</a>
          <a href="#">Delivery Information</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
          <a href="/contact">Contact Us</a>
        </div>
        <div class="col">
          <h4>About</h4>
          <a href="/about">About Us</a>
          <a href="#">Delivery Information</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
          <a href="/contact">Contact Us</a>
        </div>
        <div class="col">
          <h4>My Account</h4>
          <a href="/login">Sign In</a>
          <a href="/cart">View Cart</a>
          <a href="#">My Wishlist</a>
          <a href="#">Track My Oder</a>
          <a href="#">Help</a>
        </div>

        <div class="copyright">
          <p>© 2023 Walkrags, Inc - All Rights Reserved</p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
