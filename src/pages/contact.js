import React from 'react';
import './staticpages.css';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

function Contact() {
  return (
    <div className="static-page">
      <h2>Contact Us</h2>
      
      <div className="contact-card">
        <FaEnvelope className="contact-icon" />
        <p><strong>Email:</strong> <a href="mailto:grocery@bahria.edu.pk">grocery@bahria.edu.pk</a></p>
      </div>

      <div className="contact-card">
        <FaPhoneAlt className="contact-icon" />
        <p><strong>Phone:</strong> (051) 123-4567</p>
      </div>

      <div className="contact-card">
        <FaMapMarkerAlt className="contact-icon" />
        <p><strong>Address:</strong> Bahria University Islamabad Campus, Sector E-8, Islamabad</p>
      </div>

      <p className="contact-message">
        We'd love to hear from you. For suggestions, support, or help, reach out to us anytime!
      </p>
    </div>
  );
}

export default Contact;
