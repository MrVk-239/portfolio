"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Menu, X, Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";

function useScrolled(threshold = 20) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, [threshold]);
  return scrolled;
}

function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState("");
  useEffect(() => {
    if (!enabled) return;
    const sections = Array.from(document.querySelectorAll("section[id]"));
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [enabled]);
  return active;
}

const mobileMenuVariants: Variants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.2, ease: [0.4, 0, 1, 1] },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.04, duration: 0.2 },
  }),
};

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => { setMounted(true); }, []);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const scrolled = useScrolled();
  const isHome = pathname === "/";
  const activeSection = useActiveSection(isHome);

  // Close mobile menu on route change
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // ESC closes menu, focus returns to trigger
  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuBtnRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isActive = useCallback(
    (href: string) => {
      if (href.startsWith("/#")) {
        return isHome && activeSection === href.slice(2);
      }
      return pathname.startsWith(href) && href !== "/";
    },
    [isHome, activeSection, pathname]
  );

  // Cycle: light → dark → system → light
  const cycleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  // Before mounted: server and client first render both use Monitor/"Toggle theme" — no hydration mismatch.
  // After mount: correct theme-aware values are shown.
  const ThemeIcon = mounted
    ? (resolvedTheme === "light" ? Sun : resolvedTheme === "dark" ? Moon : Monitor)
    : Monitor;
  const themeLabel = mounted && theme
    ? `Switch to ${theme === "light" ? "dark" : theme === "dark" ? "system" : "light"} mode`
    : "Toggle theme";

  const allMobileLinks = [
    ...siteConfig.nav,
    { label: "Resume", href: siteConfig.resumeUrl, external: true },
  ];

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all",
        scrolled
          ? "border-border/60 bg-card/80 backdrop-blur-md"
          : "border-transparent bg-transparent"
      )}
      style={{ transitionDuration: "var(--duration-base)" }}
    >
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm font-semibold tracking-tight transition-opacity hover:opacity-75"
          style={{ transitionDuration: "var(--duration-fast)" }}
          aria-label="V Krishnan — home"
        >
          <span className="font-mono text-primary" aria-hidden="true">{"<"}</span>
          <span>V Krishnan</span>
          <span className="font-mono text-primary" aria-hidden="true">{" />"}</span>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-0.5" role="list">
          {siteConfig.nav.map((link) => {
            const active = isActive(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "relative px-3 py-2 text-sm rounded-md transition-colors",
                    "hover:text-foreground hover:bg-accent",
                    active ? "text-foreground font-medium" : "text-muted-foreground"
                  )}
                  style={{ transitionDuration: "var(--duration-fast)" }}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                  {active && (
                    <span
                      className="absolute inset-x-3 bottom-0.5 h-px rounded-full bg-primary"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Resume — desktop */}
          <a
            href={siteConfig.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "hidden md:inline-flex items-center px-3 py-1.5 rounded-md",
              "text-sm font-medium border transition-colors hover:bg-accent",
            )}
            style={{ transitionDuration: "var(--duration-fast)" }}
          >
            Resume
          </a>

          {/* Theme toggle */}
          <button
            onClick={cycleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-md border transition-colors hover:bg-accent"
            style={{ transitionDuration: "var(--duration-fast)" }}
            aria-label={themeLabel}
          >
            <ThemeIcon size={15} strokeWidth={1.5} aria-hidden="true" />
          </button>

          {/* Mobile menu button */}
          <button
            ref={menuBtnRef}
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-md border transition-colors hover:bg-accent"
            style={{ transitionDuration: "var(--duration-fast)" }}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen
              ? <X size={15} strokeWidth={1.5} aria-hidden="true" />
              : <Menu size={15} strokeWidth={1.5} aria-hidden="true" />
            }
          </button>
        </div>
      </nav>

      {/* Mobile menu — Framer Motion for enter/exit */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
            className="overflow-hidden border-t border-border/60 bg-card/95 backdrop-blur-md md:hidden"
          >
            <ul
              className="flex flex-col gap-0.5 px-4 py-3"
              role="list"
              aria-label="Mobile navigation"
            >
              {allMobileLinks.map((link, i) => {
                const active = isActive(link.href);
                return (
                  <motion.li
                    key={link.href}
                    custom={i}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className={cn(
                        "flex items-center px-3 py-2.5 text-sm rounded-md transition-colors",
                        "hover:bg-accent hover:text-foreground",
                        active
                          ? "text-primary font-medium bg-primary/8"
                          : "text-muted-foreground"
                      )}
                      style={{ transitionDuration: "var(--duration-fast)" }}
                      aria-current={active ? "page" : undefined}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
