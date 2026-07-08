'use client';

import { useEffect } from 'react';

export default function RouterLogger() {
  useEffect(() => {
    const handleErr = (e) => {
      console.error('🔥 FATAL ROUTER/REACT ERROR:', e.error || e.message || e);
    };
    const handleRej = (e) => {
      console.error('🔥 FATAL PROMISE REJECTION:', e.reason);
    };
    window.addEventListener('error', handleErr);
    window.addEventListener('unhandledrejection', handleRej);
    return () => {
      window.removeEventListener('error', handleErr);
      window.removeEventListener('unhandledrejection', handleRej);
    };
  }, []);
  return null;
}
