"use client";

import { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';

// Easing function: easeOutExpo for a smooth fast-to-slow down curve
function easeOutExpo(x: number): number {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

export function Counter({ 
  from = 0, 
  to, 
  duration = 1500, 
  suffix = "" 
}: { 
  from?: number, 
  to: number, 
  duration?: number, 
  suffix?: string 
}) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    let animationFrameId: number;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const elapsedTime = time - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Apply easing
      const easedProgress = easeOutExpo(progress);
      
      setCount(Math.floor(from + (to - from) * easedProgress));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(to);
      }
    };
    
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isInView, from, to, duration]);

  return <span ref={nodeRef}>{count}{suffix}</span>;
}
