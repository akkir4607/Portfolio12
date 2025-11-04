import React, { useState, useRef, useEffect } from 'react';
import './mgshare.css';
import Navbar from '../components/Navbar';

const MGShare = () => {
  const [draggedFile, setDraggedFile] = useState(null);
  const [droppedFiles, setDroppedFiles] = useState([]);
  const [qrGenerated, setQrGenerated] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [transferComplete, setTransferComplete] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const laptopRef = useRef(null);
  const phoneRef = useRef(null);

  const sampleFiles = [
    { id: 1, name: 'Project.pdf', type: 'pdf', size: '2.4 MB', color: '#ff6b6b' },
    { id: 2, name: 'Image.jpg', type: 'image', size: '1.8 MB', color: '#4ecdc4' },
    { id: 3, name: 'Document.docx', type: 'doc', size: '856 KB', color: '#45b7d1' },
    { id: 4, name: 'Video.mp4', type: 'video', size: '15.2 MB', color: '#f7b731' },
    { id: 5, name: 'Music.mp3', type: 'audio', size: '4.1 MB', color: '#5f27cd' }
  ];

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const handleMouseMove = (e) => {
    if (!laptopRef.current || windowWidth < 768) return;
    const laptop = laptopRef.current;
    const rect = laptop.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 12;
    
    laptop.style.transform = `rotateX(${15 + rotateX}deg) rotateY(${-5 + rotateY}deg)`;
  };
  
  const handleMouseLeave = () => {
    if (laptopRef.current) {
      laptopRef.current.style.transform = 'rotateX(15deg) rotateY(-5deg)';
    }
  };

  const handleDragStart = (e, file) => {
    setDraggedFile(file);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (draggedFile && !droppedFiles.find(f => f.id === draggedFile.id)) {
      setDroppedFiles(prev => [...prev, draggedFile]);
      setTimeout(() => {
        setQrGenerated(true);
      }, 800);
    }
    setDraggedFile(null);
  };

  const handlePhoneClick = () => {
    if (qrGenerated && !isScanning && !transferComplete) {
      setIsScanning(true);
      setScanProgress(0);
      
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setIsScanning(false);
              setTransferComplete(true);
            }, 500);
            return 100;
          }
          return prev + 2;
        });
      }, 40);
    }
  };

  const resetDemo = () => {
    setDroppedFiles([]);
    setQrGenerated(false);
    setIsScanning(false);
    setTransferComplete(false);
    setScanProgress(0);
  };

  const getFileIcon = (type) => {
    const icons = {
      pdf: '📄',
      image: '🖼️',
      doc: '📝',
      video: '🎥',
      audio: '🎵'
    };
    return icons[type] || '📁';
  };

  const isMobile = windowWidth < 768;

  return (
    
    <div className="mgshare-container">
      <Navbar />
      {/* Credits Section */}
      <div className="credits-section">
        <h1 className="main-title">MGShare</h1>
        
        <div className="credits-grid">
          <div className="credit-column">
            <h3 className="credit-header">ROLE / SERVICES</h3>
            <p className="credit-text">Cross-Device Sharing</p>
          </div>
          
          <div className="credit-column">
            <h3 className="credit-header">Tech Stack</h3>
            <p className="credit-text">Python, React, FLask, Werkzeug</p>
            <p className="credit-text">Kotlin</p>
            <p className="credit-text"></p>
          </div>
          
          <div className="credit-column">
            <h3 className="credit-header">LOCATION & YEAR</h3>
            <p className="credit-text"> 2024</p>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="header-section">
        <p className="subtitle">Seamless File Sharing Between Devices</p>
        <button onClick={resetDemo} className="reset-btn">
          <span>Reset Demo</span>
        </button>
      </div>

      {/* Demo Section */}
      <div className={`demo-section ${isMobile ? 'mobile' : ''}`}>
        
        {/* Floating Files */}
        {!isMobile && (
          <div className="floating-files">
            {sampleFiles.map((file, index) => (
              <div
                key={file.id}
                className={`file-item ${draggedFile?.id === file.id ? 'dragging' : ''} ${droppedFiles.find(f => f.id === file.id) ? 'dropped' : ''}`}
                draggable
                onDragStart={(e) => handleDragStart(e, file)}
                style={{
                  '--delay': `${index * 0.2}s`,
                  '--file-color': file.color
                }}
              >
                <div className="file-icon">
                  {getFileIcon(file.type)}
                </div>
                <div className="file-info">
                  <span className="file-name">{file.name}</span>
                  <span className="file-size">{file.size}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Mobile File List */}
        {isMobile && (
          <div className="mobile-file-list">
            <h3>Available Files</h3>
            {sampleFiles.map((file) => (
              <div
                key={file.id}
                className={`mobile-file-item ${droppedFiles.find(f => f.id === file.id) ? 'selected' : ''}`}
                onClick={() => {
                  if (!droppedFiles.find(f => f.id === file.id)) {
                    setDroppedFiles(prev => [...prev, file]);
                    setTimeout(() => setQrGenerated(true), 800);
                  }
                }}
              >
                <div className="file-icon">{getFileIcon(file.type)}</div>
                <div className="file-info">
                  <span className="file-name">{file.name}</span>
                  <span className="file-size">{file.size}</span>
                </div>
                {droppedFiles.find(f => f.id === file.id) && (
                  <span className="selected-indicator">✓</span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Devices Container */}
        <div className="devices-container">
          
          {/* Laptop */}
          <div className="device-container laptop-device">
            <div 
              className="laptop-container" 
              ref={laptopRef}
              onMouseMove={handleMouseMove} 
              onMouseLeave={handleMouseLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div className="laptop-screen">
                <div className="browser-bar">
                  <div className="browser-controls">
                    <span className="control-dot red"></span>
                    <span className="control-dot yellow"></span>
                    <span className="control-dot green"></span>
                  </div>
                </div>
                
                <div className="mgshare-interface">
                  <div className="interface-header">
                    <div className="logo">MGShare</div>
                    <div className="connection-status">
                      <div className={`status-dot ${qrGenerated ? 'active' : ''}`}></div>
                      <span>Ready to Share</span>
                    </div>
                  </div>

                  <div className="drop-zone">
                    {droppedFiles.length === 0 ? (
                      <div className="drop-message">
                        <div className="drop-icon">📁</div>
                        <p>{isMobile ? 'Select files to share' : 'Drag files here to share'}</p>
                      </div>
                    ) : (
                      <div className="dropped-files">
                        {droppedFiles.map(file => (
                          <div key={file.id} className="dropped-file">
                            <span className="file-icon-small">
                              {getFileIcon(file.type)}
                            </span>
                            <span className="file-name">{file.name}</span>
                            {transferComplete && <span className="check-mark">✅</span>}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {qrGenerated && (
                    <div className="qr-section">
                      <div className="qr-code">
                        <div className="qr-pattern">
                          <div className="qr-corner"></div>
                          <div className="qr-corner"></div>
                          <div className="qr-corner"></div>
                          <div className="qr-corner"></div>
                          <div className="qr-dots">
                            {Array.from({length: 100}).map((_, i) => (
                              <div key={i} className="qr-dot"></div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="qr-instruction">Scan with mobile device</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="laptop-base"></div>
            </div>
            <div className="device-label">Laptop</div>
          </div>

          {/* Connection Line */}
          {qrGenerated && (
            <div className={`connection-line ${transferComplete ? 'complete' : ''} ${isMobile ? 'mobile' : ''}`}>
              <div className="data-flow"></div>
            </div>
          )}

          {/* Android Phone */}
          <div className="device-container phone-device">
            <div 
              className={`phone-container ${isScanning ? 'scanning' : ''} ${transferComplete ? 'complete' : ''}`}
              ref={phoneRef}
              onClick={handlePhoneClick}
            >
              <div className="phone-screen">
                <div className="phone-header">
                  <div className="phone-notch"></div>
                  <div className="phone-status">
                    <span>MGShare</span>
                    <div className="signal-bars">
                      <div></div><div></div><div></div><div></div>
                    </div>
                  </div>
                </div>
                
                <div className="phone-content">
                  {!qrGenerated ? (
                    <div className="waiting-state">
                      <div className="phone-icon">📱</div>
                      <p>Waiting for files...</p>
                    </div>
                  ) : !isScanning && !transferComplete ? (
                    <div className="scan-state">
                      <div className="camera-view">
                        <div className="scan-frame"></div>
                        <div className="scan-line"></div>
                      </div>
                      <p>Tap to scan QR code</p>
                    </div>
                  ) : isScanning ? (
                    <div className="scanning-state">
                      <div className="progress-circle">
                        <div className="progress-bar" style={{'--progress': `${scanProgress}%`}}></div>
                        <span className="progress-text">{Math.round(scanProgress)}%</span>
                      </div>
                      <p>Receiving files...</p>
                    </div>
                  ) : (
                    <div className="complete-state">
                      <div className="success-icon">✅</div>
                      <p>Transfer Complete!</p>
                      <div className="received-files">
                        {droppedFiles.map(file => (
                          <div key={file.id} className="received-file">
                            <span className="file-icon-small">
                              {getFileIcon(file.type)}
                            </span>
                            <span>{file.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="device-label">Android Phone</div>
          </div>

        </div>
      </div>

      {/* Instructions */}
      
    </div>
  );
};

export default MGShare;