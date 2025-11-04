import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const navItems = [
    { 
      id: 'home', 
      label: 'Home', 
      color: '#ef4444',
      path: '/',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      )
    },
    { 
      id: 'work', 
      label: 'Work', 
      color: '#3b82f6',
      path: '/work2',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
        </svg>
      )
    },
    { 
      id: 'about', 
      label: 'About', 
      color: '#10b981',
      path: '/about',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="16" x2="12" y2="12"/>
          <line x1="12" y1="8" x2="12.01" y2="8"/>
        </svg>
      )
    },
    { 
      id: 'contact', 
      label: 'Contact', 
      color: '#f97316',
      path: '/contact',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      )
    }
  ];

  const getTransform = (index) => {
    if (hoveredIndex === null) return 'scale(1) translateY(0px)';
    
    const distance = Math.abs(hoveredIndex - index);
    if (distance === 0) return 'scale(1.5) translateY(-16px)';
    if (distance === 1) return 'scale(1.2) translateY(-8px)';
    if (distance === 2) return 'scale(1.05) translateY(-2px)';
    return 'scale(1) translateY(0px)';
  };

  return (
    <nav className="liquid-navbar">
      <div className="navbar-glow" style={{ opacity: hoveredIndex !== null ? 0.6 : 0.3 }} />
      
      <div className="navbar-container">
        {hoveredIndex !== null && (
          <div 
            className="navbar-blob"
            style={{
              left: `${hoveredIndex * 25 + 5}%`,
              background: `linear-gradient(135deg, ${navItems[hoveredIndex].color}40, ${navItems[hoveredIndex].color}20)`
            }}
          />
        )}

        {navItems.map((item, index) => {
          const isHovered = hoveredIndex === index;
          
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`nav-item ${item.id} ${isHovered ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                transform: getTransform(index)
              }}
            >
              <div 
                className="nav-glow"
                style={{
                  opacity: isHovered ? 0.3 : 0,
                  background: `radial-gradient(circle, ${item.color}40 0%, transparent 70%)`
                }}
              />

              <div 
                className="nav-icon"
                style={{
                  color: item.color,
                  filter: isHovered ? `drop-shadow(0 4px 8px ${item.color}40)` : 'none'
                }}
              >
                {item.icon}
                
                {isHovered && (
                  <>
                    <div 
                      className="particle particle-1"
                      style={{ backgroundColor: item.color }}
                    />
                    <div 
                      className="particle particle-2"
                      style={{ backgroundColor: item.color }}
                    />
                  </>
                )}
              </div>

              <span 
                className={`nav-label ${isHovered ? 'visible' : 'hidden'}`}
                style={{
                  color: isHovered ? item.color : '#1f2937',
                  textShadow: isHovered ? `0 2px 8px ${item.color}30` : 'none'
                }}
              >
                {item.label}
              </span>

              <div 
                className="nav-indicator"
                style={{
                  width: isHovered ? '60%' : '0%',
                  backgroundColor: item.color,
                  boxShadow: isHovered ? `0 0 12px ${item.color}60` : 'none'
                }}
              />
            </Link>
          );
        })}

        {hoveredIndex !== null && (
          <div className="floating-particles">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="float-particle"
                style={{
                  backgroundColor: navItems[hoveredIndex].color,
                  left: `${20 + i * 12}%`,
                  top: `${-10 + (i % 2) * 5}%`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: `${2 + i * 0.3}s`
                }}
              />
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;