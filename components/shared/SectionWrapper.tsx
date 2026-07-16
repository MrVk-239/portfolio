"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  delay?: number;
  /** Set to false to disable fade-in (e.g., hero — already above the fold) */
  animate?: boolean;
}

export function SectionWrapper({
  children,
  id,
  className,
  delay = 0,
  animate = true,
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  const shouldReduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  const isAnimated = animate && !shouldReduce;

  return (
    <section
      ref={ref}
      id={id}
      className={cn("scroll-mt-20", className)}
    >
      <motion.div
        initial={isAnimated ? { opacity: 0, y: 16 } : false}
        animate={isAnimated ? (inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }) : undefined}
        transition={{
          duration: 0.4,
          delay,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        {children}
      </motion.div>
    </section>
  );
}
