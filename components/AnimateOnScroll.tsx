"use client";

import { useEffect } from "react";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  rootMargin?: string;
  threshold?: number;
}

export default function AnimateOnScroll({
  children,
  rootMargin = "0px 0px -10% 0px",
  threshold = 0.15,
}: AnimateOnScrollProps) {
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(".animate-on-scroll")
    );

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin, threshold }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return <>{children}</>;
}


