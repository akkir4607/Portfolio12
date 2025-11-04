import React, { useState, useEffect } from 'react';
import './Airguard.css';
import Navbar from '../components/Navbar';

const Phis = () => {
  const [aqiValue, setAqiValue] = useState(85);
  const [isAlertSent, setIsAlertSent] = useState(false);
  const [smsMessages, setSmsMessages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pulseAlert, setPulseAlert] = useState(false);

  // Animation on component mount
  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  // Simulate real-time AQI updates with smooth transitions
  useEffect(() => {
    const interval = setInterval(() => {
      const newAqi = Math.floor(Math.random() * 300) + 1;
      setAqiValue(newAqi);
      
      // Trigger pulse animation for high AQI
      if (newAqi > 150) {
        setPulseAlert(true);
        setTimeout(() => setPulseAlert(false), 2000);
      }
      
      // Send SMS alert if AQI is high and alert hasn't been sent recently
      if (newAqi > 150 && !isAlertSent) {
        sendSMSAlert(newAqi);
        setIsAlertSent(true);
        
        // Reset alert flag after 15 seconds
        setTimeout(() => setIsAlertSent(false), 15000);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isAlertSent]);

  const sendSMSAlert = (aqi) => {
    const alertMessage = {
      id: Date.now(),
      aqi: aqi,
      level: getAQILevel(aqi),
      precaution: getPrecautionMessage(aqi),
      timestamp: new Date().toLocaleTimeString()
    };
    
    setSmsMessages(prev => [alertMessage, ...prev.slice(0, 4)]);
    
    // Trigger phone vibration animation
    const phoneElement = document.querySelector('.phone-frame');
    if (phoneElement) {
      phoneElement.classList.add('vibrate');
      setTimeout(() => phoneElement.classList.remove('vibrate'), 1000);
    }
  };

  const getAQILevel = (aqi) => {
    if (aqi <= 50) return { text: "Good", color: "#00E400", bg: "#00E40020" };
    if (aqi <= 100) return { text: "Moderate", color: "#FFFF00", bg: "#FFFF0020" };
    if (aqi <= 150) return { text: "Unhealthy for Sensitive", color: "#FF7E00", bg: "#FF7E0020" };
    if (aqi <= 200) return { text: "Unhealthy", color: "#FF0000", bg: "#FF000020" };
    if (aqi <= 300) return { text: "Very Unhealthy", color: "#8F3F97", bg: "#8F3F9720" };
    return { text: "Hazardous", color: "#7E0023", bg: "#7E002320" };
  };

  const getPrecautionMessage = (aqi) => {
    if (aqi <= 50) return "Air quality is excellent! Perfect time for outdoor activities and exercise.";
    if (aqi <= 100) return "Air quality is acceptable. Sensitive individuals should consider limiting prolonged outdoor activities.";
    if (aqi <= 150) return "⚠️ Sensitive groups should avoid outdoor activities. Others should limit time outside.";
    if (aqi <= 200) return "🚨 Everyone should limit outdoor activities. Wear masks when going outside.";
    if (aqi <= 300) return "🔴 Avoid all outdoor activities. Use air purifiers indoors. Seek medical attention if experiencing symptoms.";
    return "💀 EMERGENCY: Stay indoors immediately. Close all windows. Use N95 masks if you must go outside.";
  };

  const aqiLevel = getAQILevel(aqiValue);
  const strokeDasharray = (aqiValue / 300) * 251;

  return (
    <div className={`airguard-container ${isLoaded ? 'loaded' : ''}`}>
      <Navbar />
      
      {/* Animated Background Particles */}
      <div className="background-particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className={`particle particle-${i % 3}`}></div>
        ))}
      </div>

      {/* Header */}
      <header className="fabric-header">
        <div className="container">
          <div className="logo-section">
            <h1 className="fabric-logo">
              <span className="logo-text">AIRGUARD</span>
              <span className="logo-trademark">™</span>
              <div className="logo-underline"></div>
            </h1>
          </div>
          
          <div className="credits-section">
            <div className="credit-item">
              <span className="credit-label">ROLE / SERVICES</span>
              <span className="credit-value">IoT Air Quality Monitoring</span>
            </div>
            <div className="credit-item">
              <span className="credit-label">SENSOR NETWORK</span>
              <span className="credit-value">PM2.5, PM10, O3, NO2, CO</span>
            </div>
            <div className="credit-item">
              <span className="credit-label">YEAR</span>
              <span className="credit-value">2025</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          <div className="community-section">
            <div className="section-header">
              <h2 className="section-title">
                <span className="title-line">REAL-TIME</span>
                <span className="title-line">MONITORING</span>
              </h2>
              <p className="section-description">
                Advanced IoT sensors continuously monitor air quality parameters,
                providing instant alerts and actionable insights to protect your health
                and well-being in real-time.
              </p>
            </div>

            {/* Enhanced Stats */}
            <div className="stats-container">
              <div className="stat-item">
                <div className="stat-icon">
                  <div className="icon-wrapper">🌍</div>
                </div>
                <div className="stat-content">
                  <div className="stat-number">24/7</div>
                  <div className="stat-label">Real-time Monitoring</div>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">
                  <div className="icon-wrapper">⚡</div>
                </div>
                <div className="stat-content">
                  <div className="stat-number">5+</div>
                  <div className="stat-label">Sensor Parameters</div>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">
                  <div className="icon-wrapper">📱</div>
                </div>
                <div className="stat-content">
                  <div className="stat-number">100+</div>
                  <div className="stat-label">Daily Alerts</div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Device Section */}
          <div className="device-section">
            <div className="devices-container">
              {/* Laptop with Enhanced AQI Meter */}
              <div className="device-wrapper laptop-wrapper">
                <div className="device-shadow"></div>
                <div className="laptop-container">
                  <div className="laptop-screen">
                    <div className="screen-glow"></div>
                    <div className="laptop-header">
                      <div className="window-controls">
                        <span className="control close"></span>
                        <span className="control minimize"></span>
                        <span className="control maximize"></span>
                      </div>
                    </div>
                    
                    <div className="aqi-display">
                      <div className={`aqi-meter-container ${pulseAlert ? 'pulse-alert' : ''}`}>
                        <div className="meter-background" style={{background: aqiLevel.bg}}></div>
                        <div className="aqi-meter">
                          <svg className="meter-svg" viewBox="0 0 200 120">
                            {/* Gradient Definitions */}
                            <defs>
                              <linearGradient id="meterGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#00E400" />
                                <stop offset="20%" stopColor="#FFFF00" />
                                <stop offset="40%" stopColor="#FF7E00" />
                                <stop offset="60%" stopColor="#FF0000" />
                                <stop offset="80%" stopColor="#8F3F97" />
                                <stop offset="100%" stopColor="#7E0023" />
                              </linearGradient>
                              <filter id="glow">
                                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                                <feMerge> 
                                  <feMergeNode in="coloredBlur"/>
                                  <feMergeNode in="SourceGraphic"/>
                                </feMerge>
                              </filter>
                            </defs>
                            
                            {/* Background arc */}
                            <path
                              d="M 20 100 A 80 80 0 0 1 180 100"
                              fill="none"
                              stroke="rgba(255,255,255,0.1)"
                              strokeWidth="12"
                            />
                            
                            {/* Progress arc with gradient */}
                            <path
                              d="M 20 100 A 80 80 0 0 1 180 100"
                              fill="none"
                              stroke="url(#meterGradient)"
                              strokeWidth="12"
                              strokeDasharray={`${strokeDasharray} 251`}
                              strokeDashoffset="0"
                              className="progress-arc"
                              filter="url(#glow)"
                              strokeLinecap="round"
                            />
                            
                            {/* Center content */}
                            <text x="100" y="65" textAnchor="middle" className="aqi-value-text">
                              {aqiValue}
                            </text>
                            <text x="100" y="85" textAnchor="middle" className="aqi-label-text">
                              AQI INDEX
                            </text>
                          </svg>
                        </div>
                        
                        <div className="aqi-status">
                          <div className="status-badge" style={{
                            background: aqiLevel.bg,
                            border: `2px solid ${aqiLevel.color}`,
                            color: aqiLevel.color
                          }}>
                            <span className="status-dot" style={{backgroundColor: aqiLevel.color}}></span>
                            {aqiLevel.text}
                          </div>
                          
                          <div className="sensor-grid">
                            <div className="sensor-card">
                              <div className="sensor-label">PM2.5</div>
                              <div className="sensor-value">{Math.floor(aqiValue * 0.4)}µg/m³</div>
                            </div>
                            <div className="sensor-card">
                              <div className="sensor-label">PM10</div>
                              <div className="sensor-value">{Math.floor(aqiValue * 0.6)}µg/m³</div>
                            </div>
                            <div className="sensor-card">
                              <div className="sensor-label">O3</div>
                              <div className="sensor-value">{Math.floor(aqiValue * 0.3)}µg/m³</div>
                            </div>
                            <div className="sensor-card">
                              <div className="sensor-label">NO2</div>
                              <div className="sensor-value">{Math.floor(aqiValue * 0.2)}µg/m³</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="laptop-base">
                    <div className="trackpad"></div>
                  </div>
                </div>
              </div>

              {/* Enhanced Android Phone */}
              <div className="device-wrapper phone-wrapper">
                <div className="device-shadow"></div>
                <div className="phone-container">
                  <div className="phone-frame">
                    <div className="phone-screen">
                      <div className="screen-overlay"></div>
                      <div className="phone-speaker"></div>
                      <div className="notch"></div>
                      
                      <div className="phone-header">
                        <div className="status-bar">
                          <div className="status-left">
                            <span className="time">{new Date().toLocaleTimeString().slice(0, 5)}</span>
                          </div>
                          <div className="status-right">
                            <span className="battery-icon">🔋</span>
                          </div>
                        </div>
                        
                        <div className="app-header">
                          <div className="app-icon">🛡️</div>
                          <h3>AirGuard Alerts</h3>
                          <div className={`notification-badge ${smsMessages.length > 0 ? 'active' : ''}`}>
                            {smsMessages.length}
                          </div>
                        </div>
                      </div>
                      
                      <div className="sms-container">
                        {smsMessages.length === 0 ? (
                          <div className="no-messages">
                            <div className="empty-state-icon">🌬️</div>
                            <p className="empty-title">No Active Alerts</p>
                            <p className="empty-subtitle">You'll receive notifications when AQI exceeds safe levels</p>
                            <div className="status-indicator">
                              <div className="indicator-dot green"></div>
                              <span>System Active</span>
                            </div>
                          </div>
                        ) : (
                          <div className="messages-list">
                            {smsMessages.map((message, index) => (
                              <div key={message.id} className="sms-message" style={{animationDelay: `${index * 0.1}s`}}>
                                <div className="message-header">
                                  <div className="sender-info">
                                    <span className="sender-icon">🚨</span>
                                    <span className="sender">AirGuard System</span>
                                  </div>
                                  <span className="timestamp">{message.timestamp}</span>
                                </div>
                                <div className="message-content">
                                  <div className="alert-badge" style={{
                                    backgroundColor: message.level.color,
                                    boxShadow: `0 0 20px ${message.level.color}40`
                                  }}>
                                    <span className="badge-icon">⚠️</span>
                                    AQI: {message.aqi} - {message.level.text}
                                  </div>
                                  <p className="precaution-text">{message.precaution}</p>
                                  <div className="message-actions">
                                    <button className="action-btn">View Details</button>
                                    <button className="action-btn secondary">Dismiss</button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Connection Animation */}
            <div className="connection-line">
              <div className="data-flow"></div>
              <div className="connection-pulse"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Phis;