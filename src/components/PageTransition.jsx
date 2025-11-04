import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Page labels mapping
const pageLabels = {
  '/portfolio': 'Portfolio',
  '/mkg': 'MKG',
  '/work': 'Work',
  '/work2': 'Work 2',
  '/projectx': 'Project X',
  '/sara': 'Sara',
  '/mgshare': 'MGShare',
  '/phis': 'Phis',
  '/phish': 'Phish',
  '/vynkkr': 'Vynkkr',
  '/about': 'About',
  '/contact': 'Contact',
};

const PageTransition = ({ children }) => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentLabel, setCurrentLabel] = useState('');
  const [displayLocation, setDisplayLocation] = useState(location);

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setIsTransitioning(true);
      setCurrentLabel(pageLabels[location.pathname] || 'Page');
      
      // Wait for enter animation
      const timer = setTimeout(() => {
        setDisplayLocation(location);
        
        // Wait a bit then start exit animation
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
      {/* Transition Overlay */}
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

      {/* Page Content */}
      <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </div>
    </>
  );
};

export default PageTransition;