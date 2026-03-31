"use client";

import { useState, useEffect } from 'react';

interface UrgencyTimerProps {
  initialSeconds?: number;
  textPrefix?: string;
}

export default function UrgencyTimer({ initialSeconds = 8073, textPrefix = "Special launch pricing ends in:" }: UrgencyTimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check if we have a saved end time in localStorage
    const savedEndTime = localStorage.getItem('axentrix_launch_end');
    
    if (savedEndTime) {
      const remaining = Math.max(0, Math.floor((parseInt(savedEndTime) - Date.now()) / 1000));
      setTimeLeft(remaining);
    } else {
      const endTime = Date.now() + initialSeconds * 1000;
      localStorage.setItem('axentrix_launch_end', endTime.toString());
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [initialSeconds]);

  if (!mounted) return null; // Avoid hydration mismatch

  const h = Math.floor(timeLeft / 3600).toString().padStart(2, '0');
  const m = Math.floor((timeLeft % 3600) / 60).toString().padStart(2, '0');
  const s = (timeLeft % 60).toString().padStart(2, '0');

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 p-3 bg-cyan-950/40 border border-cyan-800 rounded-lg backdrop-blur-md w-full max-w-lg mx-auto">
      <span className="text-cyan-200 text-sm font-medium">{textPrefix}</span>
      <div className="flex items-center gap-2 text-cyan-50 font-mono text-lg font-bold">
        <div className="bg-[#070b12] px-2 py-1 rounded border border-cyan-700 glow-primary">{h}</div>
        <span className="text-cyan-500 animate-pulse">:</span>
        <div className="bg-[#070b12] px-2 py-1 rounded border border-cyan-700 glow-primary">{m}</div>
        <span className="text-cyan-500 animate-pulse">:</span>
        <div className="bg-[#070b12] px-2 py-1 rounded border border-cyan-700 glow-primary">{s}</div>
      </div>
    </div>
  );
}
