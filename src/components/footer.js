import React from 'react';
import './footer.css';
import { FaFacebookF, FaInstagram, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        {/* Column 1: About / Logo Info */}
        <div className="footer-section about">
          <h2>BU Grocery</h2>
          <p>Your trusted on-campus grocery partner. We bring essentials right to your university gate — fresh, fast, and student-friendly.</p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>
        </div>

        {/* Column 3: Contact & Social */}
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p><FaEnvelope /> grocery@bahria.edu.pk</p>
          <p>Sector E-8, Bahria University, Islamabad</p>

          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © 2025 BU Grocery. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
