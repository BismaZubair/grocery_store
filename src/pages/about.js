import React from 'react';
import './staticpages.css';
import { FaLightbulb, FaUserFriends, FaCheckCircle } from 'react-icons/fa';

function About() {
  return (
    <div className="static-page">
      <h2>About Us</h2>
      
      <div className="section-card">
        <FaLightbulb className="section-icon" />
        <h3>Our Vision</h3>
        <p>
          BU Grocery aims to revolutionize on-campus shopping by offering a smart, fast, and affordable grocery service tailored exclusively for Bahria University students.
        </p>
      </div>

      <div className="section-card">
        <FaUserFriends className="section-icon" />
        <h3>Who We Are</h3>
        <p>
          We're a student-driven team passionate about solving real problems. This platform is built to save your time and help you focus on what matters most — your studies and campus life.
        </p>
      </div>

      <div className="section-card">
        <FaCheckCircle className="section-icon" />
        <h3>Why Choose Us</h3>
        <p>
          With fast delivery, trusted quality, and a campus-specific system, BU Grocery is your one-stop solution for all essential items — right where you need them.
        </p>
      </div>
    </div>
  );
}

export default About;
