import { useState, useEffect } from 'react';

export default function Preloader({ onComplete }) {
  const [count, setCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount < 100) {
          return prevCount + 1;
        } else {
          clearInterval(timer);
          // Start slide up animation after a brief pause
          setTimeout(() => {
            setIsComplete(true);
            // Call onComplete callback after animation finishes
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 1000);
          }, 500);
          return prevCount;
        }
      });
    }, 30); // Adjust speed here (lower = faster)
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 bg-black z-50 transition-transform duration-1000 ease-out ${
        isComplete ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      {/* Counter in bottom right */}
      <div className="absolute bottom-8 right-8">
        <div 
          className="text-6xl md:text-7xl font-bold tracking-tight transition-all duration-200 ease-out"
          style={{
            color: 'transparent',
            WebkitTextStroke: '2px white',
            textStroke: '2px white'
          }}
        >
          {count}%
        </div>
      </div>
    </div>
  );
}