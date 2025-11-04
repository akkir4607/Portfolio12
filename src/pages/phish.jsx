import React, { useState, useEffect, useRef } from 'react';
import './phish.css';
import Navbar from '../components/Navbar';

const Phish = () => {
  const [currentScreen, setCurrentScreen] = useState('safe');
  const [showThreat, setShowThreat] = useState(false);
  const [animateWarning, setAnimateWarning] = useState(false);
  const [clickedLinks, setClickedLinks] = useState(new Set());
  const [showCookieNotice, setShowCookieNotice] = useState(true);
  const [floatingElements, setFloatingElements] = useState([]);
  const [clipboard, setClipboard] = useState('');
  const [showClipboard, setShowClipboard] = useState(false);
  const [urlBarText, setUrlBarText] = useState('🔒 secure-bank.com');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedLinkId, setCopiedLinkId] = useState(null);
  const [showPasteButton, setShowPasteButton] = useState(false);
  const [threatLevel, setThreatLevel] = useState('safe');
  const urlBarRef = useRef(null);

  const phishingLinks = [
    { 
      id: 1, 
      text: "🎁 Free iPhone 15 Pro - Click Now!", 
      url: "fake-apple-giveaway.com/free-iphone", 
      danger: "high", 
      position: "link-1",
      icon: "🎁",
      description: "Fake giveaway scam"
    },
    { 
      id: 2, 
      text: "⚠️ Your Account Will Be Suspended", 
      url: "account-verify-urgent.net/login", 
      danger: "high", 
      position: "link-2",
      icon: "⚠️",
      description: "Account verification phish"
    },
    { 
      id: 3, 
      text: "💰 Claim Your $1,000,000 Prize!", 
      url: "lottery-winner-claim.org/prize", 
      danger: "high", 
      position: "link-3",
      icon: "💰",
      description: "Lottery scam"
    },
    { 
      id: 4, 
      text: "🔒 Security Alert - Update Password", 
      url: "security-update-required.com/reset", 
      danger: "medium", 
      position: "link-4",
      icon: "🔒",
      description: "Credential harvesting"
    },
    
    { 
      id: 6, 
      text: "📧 You Have 25 New Messages", 
      url: "email-notification-center.co/inbox", 
      danger: "medium", 
      position: "link-6",
      icon: "📧",
      description: "Email spoofing"
    }
  ];

  useEffect(() => {
    // Create floating background elements
    const elements = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 15 + 5,
      speed: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.3 + 0.1
    }));
    setFloatingElements(elements);

    // Animate floating elements
    const interval = setInterval(() => {
      setFloatingElements(prev => prev.map(el => ({
        ...el,
        y: (el.y + el.speed) % 110,
        x: el.x + Math.sin(Date.now() * 0.001 + el.id) * 0.1
      })));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleLinkClick = async (link) => {
    setCopiedLinkId(link.id);
    setClickedLinks(prev => new Set([...prev, link.id]));
    
    // Copy to clipboard
    setClipboard(link.url);
    setShowClipboard(true);
    
    // Show clipboard notification
    setTimeout(() => setShowClipboard(false), 2000);
    
    // Show paste button after a delay
    setTimeout(() => setShowPasteButton(true), 1000);
    
    // Reset copied indicator
    setTimeout(() => setCopiedLinkId(null), 1000);
  };

  const handlePasteUrl = async () => {
    if (!clipboard) return;
    
    setIsTyping(true);
    setShowPasteButton(false);
    
    // Simulate typing animation
    let currentText = '';
    const targetText = clipboard;
    
    for (let i = 0; i <= targetText.length; i++) {
      currentText = targetText.substring(0, i);
      setUrlBarText(`⚠️ ${currentText}`);
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    setIsTyping(false);
    
    // Analyze threat level
    const clickedLink = phishingLinks.find(link => link.url === clipboard);
    const threat = clickedLink?.danger || 'high';
    setThreatLevel(threat);
    
    // Trigger threat detection
    setTimeout(() => {
      setCurrentScreen('threat');
      setShowThreat(true);
      setAnimateWarning(true);
      
      setTimeout(() => setAnimateWarning(false), 3000);
      setTimeout(() => {
        setCurrentScreen('safe');
        setShowThreat(false);
        setUrlBarText('🔒 secure-bank.com');
        setThreatLevel('safe');
      }, 6000);
    }, 1000);
  };

  const resetDemo = () => {
    setCurrentScreen('safe');
    setShowThreat(false);
    setAnimateWarning(false);
    setClickedLinks(new Set());
    setClipboard('');
    setShowClipboard(false);
    setUrlBarText('🔒 secure-bank.com');
    setIsTyping(false);
    setCopiedLinkId(null);
    setShowPasteButton(false);
    setThreatLevel('safe');
  };

  const getThreatData = () => {
    if (clipboard) {
      const link = phishingLinks.find(l => l.url === clipboard);
      return link || { danger: 'high', description: 'Unknown threat', icon: '⚠️' };
    }
    return { danger: 'safe', description: 'Secure connection', icon: '🔒' };
  };

  const threatData = getThreatData();

  return (
    
    <div className="phish-container">
      <Navbar />
      {/* Floating Background Elements */}
      <div className="floating-bg">
        {floatingElements.map(el => (
          <div 
            key={el.id}
            className="floating-element"
            style={{
              left: `${el.x}%`,
              top: `${el.y}%`,
              width: `${el.size}px`,
              height: `${el.size}px`,
              opacity: el.opacity
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="header">
        <h1 className="title">Phishing Link Detector</h1>
        <h2>CLick on any link and Paste into Tab</h2>
        <div className="header-info">
          <div className="info-section">
            <span className="label">ROLE / SERVICES</span>
            <p>Secure from Phishing Links</p>
          </div>
          <div className="info-section">
            <span className="label">CREDITS</span>
            <p>Security Awareness Training</p>
          </div>
          <div className="info-section">
            <span className="label">YEAR</span>
            <p>2025</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Laptop Container */}
        <div className="laptop-container">
          <div className="laptop">
            <div className="laptop-screen">
              <div className="browser-bar">
                <div className="browser-buttons">
                  <div className="browser-btn red"></div>
                  <div className="browser-btn yellow"></div>
                  <div className="browser-btn green"></div>
                </div>
                <div className={`url-bar ${threatLevel === 'safe' ? 'url-safe' : 'url-danger'}`} ref={urlBarRef}>
                  <span className={isTyping ? 'typing' : ''}>{urlBarText}</span>
                  {isTyping && <span className="cursor">|</span>}
                </div>
                {showPasteButton && (
                  <button className="paste-btn" onClick={handlePasteUrl}>
                    📋 Paste & Go
                  </button>
                )}
              </div>

              {/* Website Content */}
              <div className={`website-content ${currentScreen} ${threatLevel}`}>
                {currentScreen === 'safe' ? (
                  <div className="safe-site">
                    <div className="hero-section">
                      <h2>MAKE IT SECURE</h2>
                      <p>Your trusted digital security partner</p>
                      <div className="secure-indicators">
                        <div className="indicator">🔒 SSL Secured</div>
                        <div className="indicator">✅ Verified Domain</div>
                        <div className="indicator">🛡️ Protected Connection</div>
                      </div>
                      <div className="security-stats">
                        <div className="stat">
                          <span className="stat-number">99.9%</span>
                          <span className="stat-label">Uptime</span>
                        </div>
                        <div className="stat">
                          <span className="stat-number">{clickedLinks.size}</span>
                          <span className="stat-label">Threats Blocked</span>
                        </div>
                      </div>
                    </div>
                    <div className="scroll-indicator">
                      <span>CLICK LINKS TO TEST SECURITY</span>
                      <div className="arrow-down"></div>
                    </div>
                  </div>
                ) : (
                  <div className="threat-site">
                    <div className="threat-alert">
                      <div className="danger-icon">{threatData.icon}</div>
                      <h2>🚨 PHISHING DETECTED! 🚨</h2>
                      <div className="threat-details">
                        <div className="threat-item">
                          <span className="threat-label">Threat Type:</span>
                          <span className="threat-value">{threatData.description}</span>
                        </div>
                        <div className="threat-item">
                          <span className="threat-label">Risk Level:</span>
                          <span className={`threat-value ${threatData.danger}`}>
                            {threatData.danger.toUpperCase()}
                          </span>
                        </div>
                        <div className="threat-item">
                          <span className="threat-label">Malicious URL:</span>
                          <span className="threat-value malicious-url">{clipboard}</span>
                        </div>
                        <div className="threat-item">
                          <span className="threat-label">Status:</span>
                          <span className="threat-value blocked">🚫 BLOCKED</span>
                        </div>
                      </div>
                      <div className="warning-animation">
                        <div className="pulse-ring"></div>
                        <div className="pulse-ring pulse-ring-delay"></div>
                        <div className="pulse-ring pulse-ring-delay-2"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="laptop-base">
              <div className="laptop-logo"></div>
            </div>
          </div>

          
          
        </div>

        {/* Phishing Links Around Laptop */}
        <div className="phishing-links">
          {phishingLinks.map(link => (
            <div
              key={link.id}
              className={`phishing-link ${link.position} ${link.danger} ${clickedLinks.has(link.id) ? 'clicked' : ''} ${copiedLinkId === link.id ? 'copying' : ''}`}
              onClick={() => handleLinkClick(link)}
            >
              <div className="link-content">
                <span className="link-icon">{link.icon}</span>
                <div className="link-text-wrapper">
                  <span className="link-text">{link.text}</span>
                  <span className="link-url">{link.url}</span>
                </div>
                <div className="danger-indicator">
                  {link.danger === 'high' ? '🔴' : '🟡'}
                </div>
              </div>
              <div className="link-glow"></div>
              {copiedLinkId === link.id && (
                <div className="copy-notification">
                  📋 Copied!
                </div>
              )}
            </div>
          ))}
        </div>

        
       

        
        
      </div>

      {/* Clipboard Notification */}
      {showClipboard && (
        <div className="clipboard-notification">
          <div className="clipboard-icon">📋</div>
          <div className="clipboard-text">
            <span>Copied to clipboard!</span>
            <p>{clipboard}</p>
          </div>
        </div>
      )}

      {/* Threat Overlay */}
      {showThreat && (
        <div className={`threat-overlay ${animateWarning ? 'animate' : ''}`}>
          <div className="threat-warning">
            <div className="warning-icon">{threatData.icon}</div>
            <h2>🛡️ SECURITY SHIELD ACTIVATED</h2>
            <p>Malicious website blocked successfully!</p>
            <div className="threat-summary">
              <div className="summary-item">
                <strong>Threat:</strong> {threatData.description}
              </div>
              <div className="summary-item">
                <strong>Action:</strong> Connection terminated
              </div>
              <div className="summary-item">
                <strong>Status:</strong> You are protected
              </div>
            </div>
            <div className="threat-animation">
              <div className="warning-pulse"></div>
              <div className="shield-animation">🛡️</div>
            </div>
          </div>
        </div>
      )}
      
      </div>
    
  );
};

export default Phish;