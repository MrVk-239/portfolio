"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    // Only enable on pointer: fine devices (mouse/trackpad, not touch)
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches || shouldReduce) return;

    let raf = 0;
    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const onPointerOver = (e: PointerEvent) => {
      const target = e.target as Element;
      const isInteractive = target.closest("a, button, [role='button'], [data-cursor-expand]");
      setExpanded(!!isInteractive);
    };

    const animate = () => {
      // Dot snaps instantly; ring follows with lerp for trailing feel
      dotX = mouseX;
      dotY = mouseY;
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      raf = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("pointerover", onPointerOver);
    document.body.classList.add("custom-cursor-active");

    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("pointerover", onPointerOver);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [shouldReduce, visible]);

  if (shouldReduce) return null;

  return (
    <>
      {/* Dot — snaps to cursor instantly */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary transition-[width,height,opacity]"
        style={{
          width: expanded ? 8 : 5,
          height: expanded ? 8 : 5,
          opacity: visible ? 1 : 0,
          transitionDuration: "var(--duration-fast)",
          willChange: "transform",
        }}
      />
      {/* Ring — lags slightly behind */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full border border-primary/50 transition-[width,height,opacity]"
        style={{
          width: expanded ? 44 : 28,
          height: expanded ? 44 : 28,
          opacity: visible ? 1 : 0,
          transitionDuration: "var(--duration-fast)",
          willChange: "transform",
        }}
      />
    </>
  );
}
