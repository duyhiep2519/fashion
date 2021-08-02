import React from "react";
import { FiPhone } from "react-icons/fi";
import { GoLocation, GoMail } from "react-icons/go";
import { Link } from "react-router-dom";
import "./Footer.scss";

function Footer() {
  return (
    <div className="footer row">
      <ul className="footer__info col l-4 m-4 c-12">
        <h3>
          <img
            alt="header-logo"
            src="https://cdn.shopify.com/s/files/1/0332/6420/5963/files/kalles.svg?v=10756066450937027033"
          />
        </h3>
        <li>
          <GoLocation /> 64 Trieu Khuc, Thanh Xuan, HaNoi, Viet Nam
        </li>
        <li>
          <GoMail /> duyhiep2519@gmail.com
        </li>
        <li>
          <FiPhone /> 0857623119
        </li>
      </ul>
      <ul className="footer__info col l-4 m-4 c-12">
        <h3>information</h3>
        <li>
          <Link to="/aboutus">About Us</Link>
        </li>
        <li>
          <Link to="/aboutus">Contact Us</Link>
        </li>
        <li>
          <Link to="/aboutus">Terms & Conditions</Link>
        </li>
        <li>
          <Link to="/aboutus">Shipping & Delivery</Link>
        </li>
        <li>
          <Link to="/aboutus">Privacy Policy</Link>
        </li>
      </ul>
      <ul className="footer__info col l-4 m-4 c-12">
        <h3>Newsletter Signup</h3>
        <p>Subscribe to our newsletter and get 10% off your first purchase</p>

        <div className="footer__form">
          <input type="text" />
          <button type="button" className="">
            Subscribe
          </button>
        </div>
      </ul>
    </div>
  );
}

export default Footer;
