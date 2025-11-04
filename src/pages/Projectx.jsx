import React from 'react';
import './Projectx.css';

const Projectx = () => {
  return (
    <div className="project-container">
      <div className="content-wrapper">
        <div className="profile-section">
          
          <div className="main-text">
            <h1>Collaborate with me?</h1>
          </div>
        </div>

        <div className="contact-section">
          <div className="contact-buttons">
            <a href="mailto:akkir4607@gmail.com" className="contact-btn">
              akkir4607@gmail.com
            </a>
            
          </div>
          
          <div className="get-in-touch">
            <div className="touch-circle">
              <span>Get in touch</span>
            </div>
          </div>
        </div>

        <div className="footer">
          <div className="footer-left">
            <div className="version">
              <span className="label">Code by</span>
              <span className="value">Mohit Grover</span>
            </div>
            <div className="time">
              <span className="label"></span>
              <span className="value"></span>
            </div>
          </div>
          
          <div className="footer-right">
            <span className="socials-label">SOCIALS</span>
            <div className="social-links">
              <a href="https://www.linkedin.com/in/mohit-grover-99b799336/" className="social-link">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="hamburger-menu">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default Projectx;