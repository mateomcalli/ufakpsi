"use client"

import { useEffect, useState } from 'react';

const BreakpointIndicator = () => {
  const [breakpoint, setBreakpoint] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width < 640) setBreakpoint('xs');
      else if (width >= 640 && width < 768) setBreakpoint('sm');
      else if (width >= 768 && width < 1024) setBreakpoint('md');
      else if (width >= 1024 && width < 1280) setBreakpoint('lg');
      else if (width >= 1280 && width < 1536) setBreakpoint('xl');
      else setBreakpoint('2xl');
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 left-4 z-50 bg-black text-white p-2 rounded-lg font-mono text-xs font-bold shadow-lg hover:bg-gray-800 transition-colors"
      >
        bp
      </button>
    );
  }

  return (
    <div
      onClick={() => setIsVisible(false)}
      className="fixed bottom-4 left-4 z-50 bg-black text-white px-2.5 py-1.5 rounded-lg font-mono text-sm font-bold shadow-lg cursor-pointer hover:bg-gray-800 transition-colors"
    >
      <span className="text-gray-400">Breakpoint: </span>
      <span className="text-green-400">{breakpoint}</span>
    </div>
  );
}

export default BreakpointIndicator