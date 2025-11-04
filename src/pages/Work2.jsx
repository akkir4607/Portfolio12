import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Work2.css';
import Navbar from '../components/Navbar';

// Inline Preview Components
const SaraPreview = () => {
  const [messages, setMessages] = useState([
    { type: 'user', text: 'Hello Sara', time: '10:30' },
    { type: 'sara', text: 'Hello! How can I help you today?', time: '10:30' }
  ]);
  const [isListening, setIsListening] = useState(false);
  const [waveAnimation, setWaveAnimation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWaveAnimation(prev => (prev + 1) % 3);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      const responses = [
        'Playing your favorite music',
        'Weather is sunny today, 25°C',
        'Setting reminder for 3 PM',
        'Opening calculator app'
      ];
      const userQueries = [
        'Play some music',
        'What\'s the weather?',
        'Remind me at 3 PM',
        'Open calculator'
      ];
      
      const randomIndex = Math.floor(Math.random() * responses.length);
      setMessages(prev => {
        if (prev.length > 6) {
          return [
            { type: 'user', text: userQueries[randomIndex], time: '10:35' },
            { type: 'sara', text: responses[randomIndex], time: '10:35' }
          ];
        }
        return [
          ...prev,
          { type: 'user', text: userQueries[randomIndex], time: '10:35' },
          { type: 'sara', text: responses[randomIndex], time: '10:35' }
        ];
      });
    }, 3000);

    return () => clearInterval(messageInterval);
  }, []);

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  return (
    <div className="preview-sara">
      <div className="sara-bg-animation">
        <div className={`sara-orb sara-orb-1 ${isListening ? 'listening' : ''}`}></div>
        <div className={`sara-orb sara-orb-2 ${isListening ? 'listening' : ''}`}></div>
      </div>

      <div className="sara-chat">
        <div className="sara-header">
          <div className="sara-avatar"></div>
          <span>SARA</span>
          <div className={`sara-status ${isListening ? 'active' : ''}`}></div>
        </div>
        
        <div className="sara-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`sara-message ${msg.type}`}>
              <div className="sara-bubble">
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="sara-controls">
          <button className={`sara-mic ${isListening ? 'listening' : ''}`} onClick={toggleListening}>
            <div className="mic-icon"></div>
          </button>
        </div>

        {isListening && (
          <div className="sara-waves">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`sara-wave ${waveAnimation === i % 3 ? 'active' : ''}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              ></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const PhishingPreview = () => {
  const [url, setUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [progress, setProgress] = useState(0);

  const phishingUrls = [
    'secure-bank-login.suspicious-site.com',
    'paypal-verification.fake-domain.net',
    'microsoft-security-alert.phish.org'
  ];

  const safeUrls = [
    'github.com',
    'stackoverflow.com',
    'google.com'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const allUrls = [...phishingUrls, ...safeUrls];
      const randomUrl = allUrls[Math.floor(Math.random() * allUrls.length)];
      setUrl(randomUrl);
      
      setIsScanning(true);
      setProgress(0);
      
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            setIsScanning(false);
            setResult({
              isPhishing: phishingUrls.includes(randomUrl),
              confidence: Math.floor(Math.random() * 20) + 80,
              threats: phishingUrls.includes(randomUrl) 
                ? ['Suspicious domain', 'SSL certificate issues', 'Known phishing patterns']
                : []
            });
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      return () => {
        clearInterval(progressInterval);
      };
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="preview-phishing">
      <div className="phishing-header">
        <div className="shield-icon"></div>
        <span>Phishing Detector</span>
      </div>

      <div className="phishing-url">
        <div className="url-label">URL Being Scanned:</div>
        <div className="url-text">{url}</div>
      </div>

      {isScanning && (
        <div className="phishing-scanning">
          <div className="scanning-indicator">
            <div className="scanner-spinner"></div>
            <span>Analyzing...</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      )}

      {result && !isScanning && (
        <div className={`phishing-result ${result.isPhishing ? 'danger' : 'safe'}`}>
          <div className="result-header">
            <div className={`result-icon ${result.isPhishing ? 'warning' : 'check'}`}></div>
            <span>{result.isPhishing ? 'PHISHING DETECTED' : 'SAFE WEBSITE'}</span>
          </div>
          
          <div className="confidence">Confidence: {result.confidence}%</div>

          {result.threats.length > 0 && (
            <div className="threats">
              <div className="threats-label">Threats Detected:</div>
              <ul>
                {result.threats.map((threat, idx) => (
                  <li key={idx}>• {threat}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const AirGuardPreview = () => {
  const [aqi, setAqi] = useState(45);
  const [status, setStatus] = useState('Good');
  const [color, setColor] = useState('good');

  useEffect(() => {
    const interval = setInterval(() => {
      const newAqi = Math.floor(Math.random() * 200) + 1;
      setAqi(newAqi);
      
      if (newAqi <= 50) {
        setStatus('Good');
        setColor('good');
      } else if (newAqi <= 100) {
        setStatus('Moderate');
        setColor('moderate');
      } else if (newAqi <= 150) {
        setStatus('Unhealthy');
        setColor('unhealthy');
      } else {
        setStatus('Hazardous');
        setColor('hazardous');
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getAqiPercentage = () => (aqi / 200) * 100;

  return (
    <div className="preview-airguard">
      <div className="airguard-header">
        <div className="gauge-icon"></div>
        <span>AirGuard Monitor</span>
      </div>

      <div className="aqi-meter">
        <div className="meter-container">
          <svg className="meter-svg" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              className={`meter-progress ${color}`}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${getAqiPercentage() * 2.83} 283`}
            />
          </svg>
          <div className="meter-center">
            <span className="aqi-value">{aqi}</span>
            <span className="aqi-label">AQI</span>
          </div>
        </div>

        <div className={`aqi-status ${color}`}>
          {status}
        </div>
      </div>

      <div className="sensor-data">
        <div className="sensor-item">
          <span>PM2.5</span>
          <span>{Math.floor(aqi * 0.4)} μg/m³</span>
        </div>
        <div className="sensor-item">
          <span>PM10</span>
          <span>{Math.floor(aqi * 0.6)} μg/m³</span>
        </div>
        <div className="sensor-item">
          <span>O₃</span>
          <span>{Math.floor(aqi * 0.3)} μg/m³</span>
        </div>
      </div>
    </div>
  );
};

const MGSharePreview = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [transferring, setTransferring] = useState(false);
  const [progress, setProgress] = useState(0);
  const [files] = useState([
    { name: 'Document.pdf', size: '2.4 MB' },
    { name: 'Image.jpg', size: '1.8 MB' },
    { name: 'Video.mp4', size: '15.2 MB' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsConnected(prev => !prev);
      if (!transferring) {
        setTimeout(() => {
          setTransferring(true);
          setProgress(0);
          
          const progressInterval = setInterval(() => {
            setProgress(prev => {
              if (prev >= 100) {
                clearInterval(progressInterval);
                setTransferring(false);
                return 0;
              }
              return prev + 20;
            });
          }, 500);
        }, 2000);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [transferring]);

  return (
    <div className="preview-mgshare">
      <div className="mgshare-header">
        <div className="share-icon"></div>
        <span>MGShare</span>
        <div className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}></div>
      </div>

      <div className="devices-container">
        <div className={`device laptop ${isConnected ? 'connected' : ''}`}>
          <div className="device-icon laptop-icon"></div>
          <span>Laptop</span>
        </div>

        <div className="connection-line">
          <div className={`line ${isConnected ? 'connected' : ''}`}></div>
          {transferring && <div className="transfer-indicator"></div>}
          {isConnected && <div className="wifi-indicator"></div>}
        </div>

        <div className={`device mobile ${isConnected ? 'connected' : ''}`}>
          <div className="device-icon mobile-icon"></div>
          <span>Mobile</span>
        </div>
      </div>

      <div className="files-list">
        {files.map((file, idx) => (
          <div key={idx} className="file-item">
            <div className="file-icon">
              {file.name.split('.').pop().toUpperCase()}
            </div>
            <div className="file-info">
              <div className="file-name">{file.name}</div>
              <div className="file-size">{file.size}</div>
            </div>
            {transferring && idx === 0 && (
              <div className="file-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="status-text">
        {transferring ? 'Transferring files...' : 
         isConnected ? 'Devices connected' : 'Searching for devices...'}
      </div>
    </div>
  );
};
const VynkkrPreview = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [messages, setMessages] = useState([
    { user: 'left', text: '😂', time: '10:30' },
    { user: 'right', text: 'This scene!', time: '10:30' }
  ]);

  useEffect(() => {
    // Video progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 0;
        return prev + 1;
      });
    }, 300);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    // Chat messages animation
    const chatMessages = [
      { left: '😂', right: 'This scene!' },
      { left: 'Love this part', right: '🍿' },
      { left: '🎬', right: 'Best movie!' },
      { left: 'Watch together?', right: 'Always! ❤️' }
    ];

    const messageInterval = setInterval(() => {
      const randomMsg = chatMessages[Math.floor(Math.random() * chatMessages.length)];
      setMessages([
        { user: 'left', text: randomMsg.left, time: '10:35' },
        { user: 'right', text: randomMsg.right, time: '10:35' }
      ]);
    }, 4000);

    return () => clearInterval(messageInterval);
  }, []);

  return (
    <div className="preview-vynkkr">
      <div className="vynkkr-bg">
        <div className="vynkkr-glow vynkkr-glow-1"></div>
        <div className="vynkkr-glow vynkkr-glow-2"></div>
      </div>

      <div className="vynkkr-header">
        <div className="vynkkr-logo">
          <div className="logo-play">▶</div>
        </div>
        <span>Vynkkr</span>
        <div className="live-indicator">
          <div className="live-dot"></div>
          <span>LIVE</span>
        </div>
      </div>

      <div className="vynkkr-devices">
        {/* Left Mobile */}
        <div className="vynkkr-mobile left-mobile">
          <div className="mobile-screen">
            <div className="movie-player">
              <div className="movie-frame">
                <div className="movie-gradient"></div>
                <div className={`play-indicator ${isPlaying ? 'playing' : ''}`}>
                  {isPlaying ? '▶' : '⏸'}
                </div>
              </div>
              <div className="player-controls">
                <div className="progress-track">
                  <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
            </div>
            <div className="chat-overlay left">
              {messages.filter(m => m.user === 'left').map((msg, idx) => (
                <div key={idx} className="chat-bubble left-bubble">
                  {msg.text}
                </div>
              ))}
            </div>
          </div>
          <div className="mobile-user">
            <div className="user-avatar avatar-1"></div>
          </div>
        </div>

        {/* Connection Wave */}
        <div className="vynkkr-connection">
          <div className="connection-wave wave-1"></div>
          <div className="connection-wave wave-2"></div>
          <div className="connection-wave wave-3"></div>
          <div className="sync-icon">⟲</div>
        </div>

        {/* Right Mobile */}
        <div className="vynkkr-mobile right-mobile">
          <div className="mobile-screen">
            <div className="movie-player">
              <div className="movie-frame">
                <div className="movie-gradient"></div>
                <div className={`play-indicator ${isPlaying ? 'playing' : ''}`}>
                  {isPlaying ? '▶' : '⏸'}
                </div>
              </div>
              <div className="player-controls">
                <div className="progress-track">
                  <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
            </div>
            <div className="chat-overlay right">
              {messages.filter(m => m.user === 'right').map((msg, idx) => (
                <div key={idx} className="chat-bubble right-bubble">
                  {msg.text}
                </div>
              ))}
            </div>
          </div>
          <div className="mobile-user">
            <div className="user-avatar avatar-2"></div>
          </div>
        </div>
      </div>

      <div className="vynkkr-status">
        <div className="viewer-count">
          <span className="count-icon">👥</span>
          <span>2 watching together</span>
        </div>
      </div>
    </div>
  );
};
const NexusPreview = () => {
  return (
    <div className="preview-nexus">
      <div className="nexus-logo">N</div>
      <h3>Coming Soon</h3>
      <p>Coming Soon...</p>
    </div>
  );
};

const Work = () => {
    
  const [hoveredProject, setHoveredProject] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();
  

  const projects = [
    {
      id: 1,
      title: "SARA",
      category: "Speech Recognition and Response System",
      url: "/sara",
      previewType: "sara",
      description: "Your voice, her command – Sara listens."
    },
    {
      id: 2,
      title: "Phishing Link Detector",
      category: "Design & Development",
      url: "/phish",
      previewType: "phishing",
      description: "Modern web platform with seamless user experience"
    },
    {
      id: 3,
      title: "AirGuard",
      category: "IoT & Embedded Systems",
      url: "/airguard",
      previewType: "airguard",
      description: "Smart Air Quality Monitoring System"
    },
    {
      id: 4,
      title: "MGShare",
      category: "Networking & File Sharing",
      url: "/mgshare",
      previewType: "mgshare",
      description: "Seamless local file transfer between laptop and mobile"
    },
    {
      id: 5,
      title: "Other Projects Coming Soon",
      category: "SOOOOOOOONNNNNNN",
      previewType: "",
     
    }
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseEnter = (project) => {
    setHoveredProject(project);
  };

  const handleMouseLeave = () => {
    setHoveredProject(null);
  };

  const handleProjectClick = (e, project) => {
    e.preventDefault();
    if (project.url === "/sara") {
      navigate("/sara");
    } else if (project.url === "/mgshare") {
      navigate("/mgshare");
    } else if (project.url !== "#") {
      navigate(project.url);
    }
  };

  const getPreviewComponent = (previewType) => {
  switch(previewType) {
    case 'sara': return <SaraPreview />;
    case 'phishing': return <PhishingPreview />;
    case 'airguard': return <AirGuardPreview />;
    case 'mgshare': return <MGSharePreview />;
    case 'nexus': return <NexusPreview />;
    default: return null;
  }
};

  return (
    <div className="work-container">
      <Navbar />

      <div className="bg-elements">
        <div
          className="gradient-orb orb-1"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        ></div>
        <div
          className="gradient-orb orb-2"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        ></div>
      </div>

      <section className="projects-section">
        <div className="projects-list">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="project-link"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => handleMouseEnter(project)}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => handleProjectClick(e, project)}
              style={{
                animationDelay: `${index * 0.1}s`,
                transform: `translateY(${scrollY * 0.02 * (index + 1)}px)`,
                cursor: project.url !== "#" ? "pointer" : "default"
              }}
            >
              <div className="project-item">
                <div className="project-number">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="project-info">
                  <h2 className="project-title">{project.title}</h2>
                  <p className="project-desc">{project.description}</p>
                </div>
                <div className="project-category">
                  <span>{project.category}</span>
                  <div className="arrow">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M7 17L17 7M17 7H7M17 7V17"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="project-line"></div>
            </div>
          ))}
        </div>
      </section>

      {hoveredProject && (
        <div
          className="project-preview"
          style={{
            left: mousePosition.x + 30,
            top: mousePosition.y - 200
          }}
        >
          <div className="preview-card">
            <div className="preview-content">
              {getPreviewComponent(hoveredProject.previewType)}
            </div>
            <div className="preview-info">
              <h3>{hoveredProject.title}</h3>
              <p>{hoveredProject.category}</p>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default Work;