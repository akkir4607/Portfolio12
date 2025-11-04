import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Sara.css';

const Sara = () => {
  const navigate = useNavigate();
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [showUserMessage, setShowUserMessage] = useState(false);
  const [showAiMessage, setShowAiMessage] = useState(false);
  const [aiThinking, setAiThinking] = useState(false);
  const [voiceWaves, setVoiceWaves] = useState(false);
  const [screenGlow, setScreenGlow] = useState(false);
  const [currentPhase, setCurrentPhase] = useState('idle'); // idle, userTyping, aiThinking, aiResponding
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const laptopRef = useRef(null);

  const conversations = [
    {
      question: "Hey SARA, what's the weather like today?",
      answer: "🌤️ It's a beautiful sunny day with 25°C! Perfect for outdoor activities. The humidity is 45% with a gentle breeze. Would you like me to check the forecast for tomorrow?",
      mood: 'happy'
    },
    {
      question: "Can you help me organize my schedule?",
      answer: "📅 Absolutely! I can see you have 3 meetings today. I've optimized your calendar and set reminders. Your next meeting is in 2 hours - should I prepare the documents?",
      mood: 'productive'
    },
    {
      question: "Play some music to help me focus",
      answer: "🎵 Playing your 'Deep Focus' playlist! I've selected instrumental tracks with 40Hz binaural beats to enhance concentration. Current track: 'Peaceful Minds' by Max Richter.",
      mood: 'relaxed'
    },
    {
      question: "Tell me something interesting about space",
      answer: "🚀 Did you know that neutron stars are so dense that a teaspoon would weigh 6 billion tons? They spin up to 700 times per second and have magnetic fields trillion times stronger than Earth's!",
      mood: 'excited'
    },
    {
      question: "What's my productivity score today?",
      answer: "📊 Your productivity score is 87%! You've completed 8/10 tasks, focused for 6.5 hours, and took optimal breaks. You're 15% more productive than yesterday! 🎉",
      mood: 'achievement'
    },
    {
      question: "Can you translate 'Hello beautiful world' to French?",
      answer: "🇫🇷 'Bonjour beau monde' - That's French for 'Hello beautiful world'! Would you like me to teach you more French phrases or help with pronunciation?",
      mood: 'helpful'
    }
  ];

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (laptopRef.current) {
        const rect = laptopRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        });
      }
    };

    const laptop = laptopRef.current;
    if (laptop) {
      laptop.addEventListener('mousemove', handleMouseMove);
      return () => laptop.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  useEffect(() => {
    const conversation = conversations[currentMessageIndex];
    let timeoutId;

    const startConversation = async () => {
      // Reset states
      setShowUserMessage(false);
      setShowAiMessage(false);
      setDisplayedText('');
      setCurrentPhase('idle');
      
      // Wait a moment, then start user typing
      setTimeout(() => {
        setCurrentPhase('userTyping');
        setIsUserTyping(true);
        setVoiceWaves(true);
        setScreenGlow(true);
        
        // Type user message
        let userIndex = 0;
        const typeUserMessage = () => {
          if (userIndex <= conversation.question.length) {
            setDisplayedText(conversation.question.slice(0, userIndex));
            userIndex++;
            setTimeout(typeUserMessage, 60 + Math.random() * 40);
          } else {
            setIsUserTyping(false);
            setShowUserMessage(true);
            setVoiceWaves(false);
            
            // AI thinking phase
            setTimeout(() => {
              setCurrentPhase('aiThinking');
              setAiThinking(true);
              setScreenGlow(false);
              
              setTimeout(() => {
                setAiThinking(false);
                setCurrentPhase('aiResponding');
                setIsAiTyping(true);
                setVoiceWaves(true);
                setScreenGlow(true);
                
                // Type AI response
                let aiIndex = 0;
                setDisplayedText('');
                const typeAiMessage = () => {
                  if (aiIndex <= conversation.answer.length) {
                    setDisplayedText(conversation.answer.slice(0, aiIndex));
                    aiIndex++;
                    setTimeout(typeAiMessage, 40 + Math.random() * 20);
                  } else {
                    setIsAiTyping(false);
                    setShowAiMessage(true);
                    setVoiceWaves(false);
                    setScreenGlow(false);
                    
                    // Wait before next conversation
                    setTimeout(() => {
                      setCurrentPhase('idle');
                      setCurrentMessageIndex((prev) => (prev + 1) % conversations.length);
                    }, 4000);
                  }
                };
                typeAiMessage();
              }, 2000);
            }, 1500);
          }
        };
        typeUserMessage();
      }, 1000);
    };

    timeoutId = setTimeout(startConversation, 500);
    return () => clearTimeout(timeoutId);
  }, [currentMessageIndex]);

  const scrollToLiveView = () => {
    const liveViewElement = document.getElementById('live-view-section');
    if (liveViewElement) {
      liveViewElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getCurrentMood = () => {
    return conversations[currentMessageIndex]?.mood || 'neutral';
  };

  return (
    <div className="sara-container">
      <Navbar />
      
      <div className="portfolio-view">
        <div className="portfolio-content">
          <div className="brand-title">
            <h1>SARA</h1>
          </div>
         
          <div className="portfolio-details">
            <div className="detail-section">
              <h3>ROLE / SERVICES</h3>
              <p>AI Voice Assistant & Speech Recognition</p>
            </div>
           
            <div className="detail-section">
              <h3>TECHNOLOGIES</h3>
              <p>Python, Flask, Speech Recognition, NLP, Text-to-speech, GIT.</p>
            </div>
           
            <div className="detail-section">
              <h3>YEAR</h3>
              <p>2023</p>
            </div>
          </div>
          
          <h1>
            Sara is an advanced AI-powered personal voice assistant built using Python. It intelligently understands and processes natural language commands, performs real-time automation tasks, and interacts seamlessly with users. Powered by speech recognition, NLP, and machine learning, Sara demonstrates strong expertise in AI-driven automation, context-aware communication, and smart task execution.
          </h1>
        </div>
      </div>

      <div id="live-view-section" className="home-view">
        <div className="laptop-mockup" ref={laptopRef}>
          <div className={`laptop-screen ${screenGlow ? 'screen-glow' : ''} mood-${getCurrentMood()}`}>
            
            {/* Interactive Cursor Follower */}
            <div 
              className="cursor-follower" 
              style={{
                left: `${mousePosition.x}%`,
                top: `${mousePosition.y}%`
              }}
            />

            {/* Holographic Grid Background */}
            <div className="holographic-grid">
              <div className="grid-lines horizontal"></div>
              <div className="grid-lines vertical"></div>
            </div>

            {/* Neural Network Background */}
            <div className="neural-network">
              {[...Array(12)].map((_, i) => (
                <div key={i} className={`neural-node node-${i + 1}`}>
                  <div className="node-core"></div>
                  {[...Array(3)].map((_, j) => (
                    <div key={j} className={`neural-connection connection-${j + 1}`}></div>
                  ))}
                </div>
              ))}
            </div>

            <div className="chat-interface">
              {/* Advanced AI Avatar */}
              <div className={`ai-avatar phase-${currentPhase} mood-${getCurrentMood()}`}>
                <div className="ai-outer-ring"></div>
                <div className="ai-middle-ring"></div>
                <div className="ai-core">
                  <div className="ai-face-container">
                    <div className="ai-eyes-advanced">
                      <div className={`ai-eye-advanced left ${aiThinking ? 'thinking' : ''}`}>
                        <div className="pupil"></div>
                        <div className="iris"></div>
                      </div>
                      <div className={`ai-eye-advanced right ${aiThinking ? 'thinking' : ''}`}>
                        <div className="pupil"></div>
                        <div className="iris"></div>
                      </div>
                    </div>
                    <div className={`ai-mouth-advanced ${isAiTyping ? 'talking' : ''}`}>
                      <div className="mouth-line"></div>
                    </div>
                  </div>
                  
                  {/* Advanced Thinking Animation */}
                  {aiThinking && (
                    <div className="advanced-thinking">
                      <div className="thinking-orbit orbit-1">
                        <div className="thinking-particle"></div>
                      </div>
                      <div className="thinking-orbit orbit-2">
                        <div className="thinking-particle"></div>
                      </div>
                      <div className="thinking-orbit orbit-3">
                        <div className="thinking-particle"></div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Energy Field */}
                <div className="energy-field">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className={`energy-wave wave-${i + 1}`}></div>
                  ))}
                </div>
              </div>

              {/* Advanced Character Avatar */}
              <div className={`character-avatar-advanced phase-${currentPhase}`}>
                <div className="character-glow"></div>
                <div className="character-body">
                  <div className="character-head">
                    <div className="character-hair-advanced"></div>
                    <div className="character-face-advanced">
                      <div className="character-eyes-advanced">
                        <div className={`character-eye-advanced left ${isUserTyping ? 'focused' : ''}`}>
                          <div className="eye-shine"></div>
                        </div>
                        <div className={`character-eye-advanced right ${isUserTyping ? 'focused' : ''}`}>
                          <div className="eye-shine"></div>
                        </div>
                      </div>
                      <div className={`character-mouth-advanced ${isUserTyping ? 'talking' : ''}`}></div>
                    </div>
                  </div>
                  <div className="character-shoulders"></div>
                </div>
                
                {/* Typing Indicator */}
                {isUserTyping && (
                  <div className="typing-indicator">
                    <div className="typing-bubble"></div>
                  </div>
                )}
              </div>

              {/* Advanced Chat Messages */}
              <div className={`chat-messages-advanced ${currentPhase}`}>
                {currentPhase !== 'idle' && (
                  <div className={`message-container-advanced ${currentPhase === 'userTyping' ? 'user-message' : 'ai-message'}`}>
                    <div className="message-avatar">
                      {currentPhase === 'userTyping' ? '👤' : '🤖'}
                    </div>
                    <div className="message-bubble-advanced">
                      <div className="message-content">
                        <div className="message-text">
                          {displayedText}
                          <span className={`typing-cursor-advanced ${(isUserTyping || isAiTyping) ? 'active' : ''}`}>|</span>
                        </div>
                      </div>
                      <div className="message-decorations">
                        <div className="decoration-1"></div>
                        <div className="decoration-2"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Advanced Voice Waves */}
              {voiceWaves && (
                <div className="advanced-voice-waves">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className={`voice-wave-advanced wave-${i + 1}`}></div>
                  ))}
                </div>
              )}

              {/* Floating Particles System */}
              <div className="particle-system">
                {[...Array(30)].map((_, i) => (
                  <div 
                    key={i} 
                    className="advanced-particle" 
                    style={{
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 5}s`,
                      animationDuration: `${4 + Math.random() * 4}s`
                    }}
                  ></div>
                ))}
              </div>

              {/* Status Indicator */}
              <div className={`status-indicator phase-${currentPhase}`}>
                <div className="status-icon"></div>
                <div className="status-text">
                  {currentPhase === 'idle' && 'Ready to assist'}
                  {currentPhase === 'userTyping' && 'Listening...'}
                  {currentPhase === 'aiThinking' && 'Processing...'}
                  {currentPhase === 'aiResponding' && 'Responding...'}
                </div>
              </div>

              {/* Data Flow Animation */}
              <div className="data-flow">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={`data-stream stream-${i + 1}`}></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sara;