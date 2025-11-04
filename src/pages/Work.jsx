import React from 'react';
import { Link } from 'react-router-dom';
import './Work2.css';

const Work = () => {
  return (
    <div className="work-container">
      <div className="work-content">
        <h1 className="work-heading">
          Freelance developer on a mission to redefine innovation. Fusing AI, Python, and analytics into intelligent, impactful solutions.
        </h1>
      </div>

      <div className="work-sidebar">
        <p className="work-tagline">
          Blending creativity, code, and interaction, I carve a unique space in the world of Development.
        </p>

        <div className="work-circle">
          <Link to="/about" className="circle-link">
            <span className="circle-text">About me</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Work;
