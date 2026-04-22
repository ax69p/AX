"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { type ReactNode } from "react";

interface FadeUpProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function FadeUp({
  children,
  className = "",
  delay = 0,
  ...props
}: FadeUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
