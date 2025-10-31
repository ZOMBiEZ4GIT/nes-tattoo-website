"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.8,
  distance = 80,
  className = "",
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: distance,
        scale: 0.9,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true, // Animation happens only once
        margin: "0px", // Trigger when element enters viewport
        amount: 0.3, // Trigger when 30% of element is visible
      }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // More dramatic easing
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
