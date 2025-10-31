"use client";

import { motion } from "framer-motion";
import { ReactNode, Children, cloneElement, isValidElement } from "react";

interface StaggerGridProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export default function StaggerGrid({
  children,
  className = "",
  staggerDelay = 0.1,
}: StaggerGridProps) {
  const childrenArray = Children.toArray(children);

  return (
    <div className={className}>
      {childrenArray.map((child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 60, scale: 0.85 }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          viewport={{ once: true, margin: "0px", amount: 0.2 }}
          transition={{
            duration: 0.7,
            delay: index * staggerDelay,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ display: "contents" }} // This preserves grid layout!
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
