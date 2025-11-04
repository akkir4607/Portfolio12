import { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Portfolio from './pages/Portfolio';
import Work from './pages/Work';
import Work2 from './pages/Work2';
import About from './pages/About';
import Sara from './pages/Sara';
import Phish from './pages/Phish';
import Mgshare from './pages/mgshare';
import Airguard from './pages/Airguard';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import './App.css';

// ---------------------------
// Page Labels Mapping
// ---------------------------
const pageLabels = {
  '/portfolio': 'Home',
  '/work': 'Work',
  '/work2': 'Work 2',
  '/about': 'About',
  '/contact': 'Contact',
  '/sara': 'SARA',
  '/phish': 'Phish',
  '/mgshare': 'MGShare',
  '/airguard': 'AirGuard',
};

// ---------------------------
// PageTransition Component
// ---------------------------
const PageTransition = ({ children }) => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentLabel, setCurrentLabel] = useState('');
  const [displayLocation, setDisplayLocation] = useState(location);

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setIsTransitioning(true);
      setCurrentLabel(pageLabels[location.pathname] || 'Page');

      const timer = setTimeout(() => {
        setDisplayLocation(location);

        const exitTimer = setTimeout(() => {
          setIsTransitioning(false);
        }, 100);

        return () => clearTimeout(exitTimer);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [location, displayLocation]);

  return (
    <>
      {/* Black overlay transition */}
      <div
        className={`fixed inset-0 bg-zinc-950 z-[9998] flex items-center justify-center transition-transform duration-[800ms] ease-in-out ${
          isTransitioning ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div
          className={`text-white text-5xl md:text-7xl font-light tracking-wider transition-all duration-500 ${
            isTransitioning ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{
            transitionDelay: isTransitioning ? '200ms' : '0ms',
          }}
        >
          {currentLabel}
        </div>
      </div>

      {/* Page content fade */}
      <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </div>
    </>
  );
};

// ---------------------------
// Preloader Component
// ---------------------------
const Preloader = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount < 100) {
          return prevCount + 1;
        } else {
          clearInterval(timer);
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 1000);
          }, 500);
          return prevCount;
        }
      });
    }, 30);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 bg-black z-50 transition-transform duration-1000 ease-out ${
        isComplete ? '-translate-y-full' : 'translate-y-0'
      }`}
      style={{ zIndex: 10000 }}
    >
      <div className="absolute bottom-8 right-8">
        <div
          className="text-6xl md:text-7xl font-bold tracking-tight transition-all duration-200 ease-out"
          style={{
            color: 'transparent',
            WebkitTextStroke: '2px white',
            textStroke: '2px white',
          }}
        >
          {count}%
        </div>
      </div>
    </div>
  );
};

// ---------------------------
// Cursor Context + Custom Cursor
// ---------------------------
const CursorContext = createContext();

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (!context) throw new Error('useCursor must be used within a CursorProvider');
  return context;
};

const IOSCursor = ({ children }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    const updateMousePosition = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.type === 'submit' ||
        target.role === 'button' ||
        target.classList.contains('cursor-pointer') ||
        window.getComputedStyle(target).cursor === 'pointer';
      setIsHovering(isInteractive);
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  const contextValue = { setHovering: setIsHovering };

  return (
    <CursorContext.Provider value={contextValue}>
      {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}

      <style>{`
        * { cursor: none !important; }
        body { cursor: none !important; }
      `}</style>

      {/* White dot cursor */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          transform: `translate(${mousePosition.x - 8}px, ${mousePosition.y - 8}px)`,
          transition: 'transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full transition-all duration-200 ease-out ${
            isClicking ? 'scale-75' : isHovering ? 'scale-125' : 'scale-100'
          }`}
          style={{
            boxShadow: `0 0 0 1px rgba(255, 255, 255, 0.3)${
              isHovering ? ', 0 0 20px rgba(255, 255, 255, 0.2)' : ''
            }`,
          }}
        />
      </div>

      {children}
    </CursorContext.Provider>
  );
};

// ---------------------------
// Main App Component
// ---------------------------
function App() {
  return (
    <Router>
      <IOSCursor>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/portfolio" replace />} />
          <Route path="/portfolio" element={<PageTransition><Portfolio /></PageTransition>} />
          <Route path="/work" element={<PageTransition><Work /></PageTransition>} />
          <Route path="/work2" element={<PageTransition><Work2 /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="/sara" element={<PageTransition><Sara /></PageTransition>} />
          <Route path="/phish" element={<PageTransition><Phish /></PageTransition>} />
          <Route path="/mgshare" element={<PageTransition><Mgshare /></PageTransition>} />
          <Route path="/airguard" element={<PageTransition><Airguard /></PageTransition>} />
          <Route path="*" element={<Navigate to="/portfolio" replace />} />
        </Routes>
      </IOSCursor>
    </Router>
  );
}

export default App;
