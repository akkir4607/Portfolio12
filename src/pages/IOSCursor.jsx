import React, { useState, useEffect } from 'react';

const IOSCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>
      
      <div
        className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference"
        style={{
          transform: `translate(${mousePosition.x - 8}px, ${mousePosition.y - 8}px)`,
          transition: 'transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full transition-transform duration-150 ease-out ${
            isClicking ? 'scale-75' : 'scale-100'
          }`}
          style={{
            boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.3)',
          }}
        />
      </div>
    </>
  );
};

export default IOSCursor;