"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxProps {
  children: React.ReactNode;
  speed?: number; // 0.0 to 1.0, where 0.5 = 50% speed
  direction?: "up" | "down";
  scale?: boolean; // Optional scale effect
  className?: string;
}

export default function Parallax({
  children,
  speed = 0.5,
  direction = "up",
  scale = false,
  className = "",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState(true);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setShouldAnimate(!mediaQuery.matches);

    const handleChange = () => setShouldAnimate(!mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Calculate parallax offset based on speed
  // Medium intensity: 40-60% speed variation
  const yRange = direction === "up" ? [100, -100] : [-100, 100];
  const adjustedRange = yRange.map((val) => val * (1 - speed));

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldAnimate ? adjustedRange : [0, 0]
  );

  const scaleValue = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    shouldAnimate && scale ? [0.95, 1, 0.95] : [1, 1, 1]
  );

  return (
    <motion.div
      ref={ref}
      style={{
        y: shouldAnimate ? y : 0,
        scale: shouldAnimate && scale ? scaleValue : 1,
        willChange: "transform",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
