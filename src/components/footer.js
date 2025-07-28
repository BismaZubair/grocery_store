import React from 'react';
import './footer.css';
import { FaFacebookF, FaInstagram, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        
        <div className="footer-section about">
          <h2>BU Grocery</h2>
          <p>Your trusted on-campus grocery partner. We bring essentials right to your university gate — fresh, fast, and student-friendly.</p>
        </div>

       
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>
        </div>

    
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p><FaEnvelope /> grocery@bahria.edu.pk</p>
          <p>Sector E-8, Bahria University, Islamabad</p>

          <div className="social-icons">
           <Link to="/about"><FaFacebookF /></Link>
           <Link to="/about"><FaInstagram /></Link>
           <Link to="/about"><FaTwitter /></Link>
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
