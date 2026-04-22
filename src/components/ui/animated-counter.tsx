"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

function easeOutExpo(x: number): number {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  duration?: number;
}

export default function AnimatedCounter({
  target,
  suffix = "",
  duration = 2000,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrameId: number;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);

      setCount(Math.floor(target * easedProgress));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}
