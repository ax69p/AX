"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef, type ReactNode } from "react";

interface IOSButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: "primary" | "ghost";
  children: ReactNode;
  href?: string;
  className?: string;
}

const IOSButton = forwardRef<HTMLButtonElement, IOSButtonProps>(
  ({ variant = "primary", children, className = "", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 rounded-[14px] text-[17px] font-semibold tracking-[-0.3px] px-8 py-4 cursor-pointer transition-colors duration-200";

    const variantStyles = {
      primary:
        "bg-[#00D4FF]/20 backdrop-blur-[20px] border border-[#00D4FF]/40 shadow-[0_0_30px_rgba(0,212,255,0.25)] text-white",
      ghost:
        "bg-white/[0.08] backdrop-blur-[20px] border border-white/20 text-white/90",
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.94 }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

IOSButton.displayName = "IOSButton";

export default IOSButton;
