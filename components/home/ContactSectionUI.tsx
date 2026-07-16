"use client";

import { useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Mail,
  Phone,
  FileText,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { GithubIcon, LinkedinIcon } from "@/components/shared/social-icons";
import { PlatformLogo } from "@/components/shared/platform-logos";
import { AvailabilityBadge } from "@/components/shared/AvailabilityBadge";
import { Button } from "@/components/ui/Button";

/* ── Types ────────────────────────────────────────────────────────────── */

export interface ContactPlatform {
  id: string;
  platform: string;
  handle: string;
  profileUrl: string;
}

export interface ContactSectionUIProps {
  email: string;
  resumeUrl: string;
  githubUrl?: string;
  linkedinUrl?: string;
  platforms: ContactPlatform[];
}

/* ── Animation variants ───────────────────────────────────────────────── */

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  },
};

/* ── Form ─────────────────────────────────────────────────────────────── */

type FormState = "idle" | "loading" | "success" | "error";

interface Fields {
  name: string;
  email: string;
  message: string;
}

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

function validateFields(fields: Fields): FieldErrors {
  const errs: FieldErrors = {};
  if (!fields.name.trim()) errs.name = "Name is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
    errs.email = "Please enter a valid email address.";
  if (fields.message.trim().length < 10)
    errs.message = "Message must be at least 10 characters.";
  return errs;
}

const inputCls = cn(
  "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm",
  "text-foreground placeholder:text-muted-foreground/50",
  "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
  "disabled:opacity-50 transition-colors duration-150",
);

function ContactForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [fields, setFields] = useState<Fields>({ name: "", email: "", message: "" });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [trap, setTrap] = useState("");
  const [attempted, setAttempted] = useState(false);

  const loading = formState === "loading";

  function handleFieldChange(key: keyof Fields) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      setFields((prev) => ({ ...prev, [key]: value }));
      // Live re-validate after first submit attempt
      if (attempted) {
        setFieldErrors((prev) => {
          const updatedFields = { ...fields, [key]: value };
          const errs = validateFields(updatedFields);
          const next = { ...prev };
          if (errs[key]) next[key] = errs[key];
          else delete next[key];
          return next;
        });
      }
    };
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAttempted(true);

    const errs = validateFields(fields);
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      return;
    }

    setFieldErrors({});
    setServerError(null);
    setFormState("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, _trap: trap }),
      });

      if (res.ok) {
        setFormState("success");
      } else {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setServerError(
          data.error ?? "Something went wrong. Please try again or email me directly.",
        );
        setFormState("error");
      }
    } catch {
      setServerError("Network error — please check your connection and try again.");
      setFormState("error");
    }
  }

  if (formState === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center gap-4 py-14 text-center"
      >
        <div className="rounded-full bg-green-500/10 p-4">
          <CheckCircle size={32} className="text-green-500" aria-hidden="true" />
        </div>
        <div>
          <p className="font-semibold text-foreground">Message sent.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            I&apos;ll get back to you as soon as possible.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {/* Honeypot — visually hidden; bots fill it, real users never see it */}
      <input
        aria-hidden="true"
        tabIndex={-1}
        autoComplete="off"
        name="_trap"
        value={trap}
        onChange={(e) => setTrap(e.target.value)}
        className="absolute left-[-9999px] top-0 h-px w-px overflow-hidden opacity-0"
      />

      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-name" className="text-sm font-medium text-foreground">
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          name="name"
          autoComplete="name"
          placeholder="Your name"
          disabled={loading}
          aria-invalid={fieldErrors.name ? true : undefined}
          aria-describedby={fieldErrors.name ? "contact-name-err" : undefined}
          value={fields.name}
          onChange={handleFieldChange("name")}
          className={cn(inputCls, fieldErrors.name && "border-destructive")}
        />
        {fieldErrors.name && (
          <p id="contact-name-err" role="alert" className="text-xs text-destructive">
            {fieldErrors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-email" className="text-sm font-medium text-foreground">
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@example.com"
          disabled={loading}
          aria-invalid={fieldErrors.email ? true : undefined}
          aria-describedby={fieldErrors.email ? "contact-email-err" : undefined}
          value={fields.email}
          onChange={handleFieldChange("email")}
          className={cn(inputCls, fieldErrors.email && "border-destructive")}
        />
        {fieldErrors.email && (
          <p id="contact-email-err" role="alert" className="text-xs text-destructive">
            {fieldErrors.email}
          </p>
        )}
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-message" className="text-sm font-medium text-foreground">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          placeholder="Tell me about the role, project, or collaboration you have in mind."
          disabled={loading}
          aria-invalid={fieldErrors.message ? true : undefined}
          aria-describedby={fieldErrors.message ? "contact-message-err" : undefined}
          value={fields.message}
          onChange={handleFieldChange("message")}
          className={cn(inputCls, "resize-none", fieldErrors.message && "border-destructive")}
        />
        {fieldErrors.message && (
          <p id="contact-message-err" role="alert" className="text-xs text-destructive">
            {fieldErrors.message}
          </p>
        )}
      </div>

      {/* Server error */}
      {formState === "error" && serverError && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
        >
          <AlertCircle size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
          <span>{serverError}</span>
        </div>
      )}

      {/* Submit */}
      <div>
        <Button type="submit" size="lg" disabled={loading} className="gap-2">
          {loading ? (
            <>
              <Loader2 size={14} className="animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              Send message
              <ArrowRight size={14} aria-hidden="true" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

/* ── Links panel ──────────────────────────────────────────────────────── */

function LinksPanel({
  email,
  resumeUrl,
  githubUrl,
  linkedinUrl,
  platforms,
}: ContactSectionUIProps) {
  return (
    <div className="flex flex-col gap-8">
      {/* Direct contact */}
      <div className="flex flex-col gap-3">
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          Direct
        </p>

        <a
          href={`mailto:${email}`}
          className="group flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <Mail
            size={15}
            className="shrink-0 text-primary/50 transition-colors group-hover:text-primary"
            aria-hidden="true"
          />
          <span className="link-underline">{email}</span>
        </a>

        <a
          href="tel:+918985715179"
          aria-label="Call V Krishnan"
          className="group flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <Phone
            size={15}
            className="shrink-0 text-primary/50 transition-colors group-hover:text-primary"
            aria-hidden="true"
          />
          <span className="link-underline">+91 89857 15179</span>
        </a>

        <a
          href={resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          <FileText size={14} aria-hidden="true" />
          View resume
          <ArrowRight
            size={12}
            className="transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </a>
      </div>

      {/* Social */}
      {(githubUrl || linkedinUrl) && (
        <div className="flex flex-col gap-3">
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            Social
          </p>

          <div className="flex flex-col gap-2.5">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <GithubIcon size={15} className="shrink-0" />
                <span>GitHub</span>
              </a>
            )}
            {linkedinUrl && (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <LinkedinIcon size={15} className="shrink-0" />
                <span>LinkedIn</span>
              </a>
            )}
          </div>
        </div>
      )}

      {/* Competitive Programming platforms */}
      {platforms.length > 0 && (
        <div className="flex flex-col gap-3">
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            Competitive Programming
          </p>

          <div className="grid grid-cols-2 gap-2">
            {platforms.map((p) => (
              <a
                key={p.id}
                href={p.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${p.platform} profile`}
                className={cn(
                  "group flex items-center gap-2 rounded-lg px-3 py-2.5 text-xs",
                  "border border-border/50 bg-card/40",
                  "text-muted-foreground transition-all duration-150",
                  "hover:border-border hover:bg-card hover:text-foreground",
                )}
              >
                <span className="shrink-0 opacity-50 transition-opacity group-hover:opacity-100">
                  <PlatformLogo platformId={p.id} size={14} />
                </span>
                <span className="min-w-0 truncate font-medium">{p.platform}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Section ──────────────────────────────────────────────────────────── */

export function ContactSectionUI({
  email,
  resumeUrl,
  githubUrl,
  linkedinUrl,
  platforms,
}: ContactSectionUIProps) {
  const ref = useRef<HTMLElement>(null);
  const shouldReduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  const animate = !shouldReduce;

  return (
    <section
      ref={ref}
      id="contact"
      aria-label="Contact"
      className="relative scroll-mt-20 overflow-hidden border-t border-border/60 py-24 sm:py-32"
    >
      {/* Background glow — bottom-right echo of the hero's top-left glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 65% at 88% 100%, var(--primary-glow), transparent 75%)",
        }}
      />

      <motion.div
        variants={animate ? containerVariants : undefined}
        initial={animate ? "hidden" : false}
        animate={animate ? (inView ? "show" : "hidden") : undefined}
        className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"
      >
        {/* Closing statement — full width */}
        <motion.div
          variants={animate ? itemVariants : undefined}
          className="mb-14 sm:mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Let&apos;s build something meaningful.
          </h2>

          <AvailabilityBadge className="mt-5" />

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            I&apos;m always interested in challenging work in Software
            Engineering, Backend Systems, and Research. If you think we&apos;d
            build something meaningful together — I&apos;d love to hear from
            you.
          </p>
        </motion.div>

        {/* Two-column: links (left) | form card (right) */}
        <div className="grid gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16">
          {/* Links panel */}
          <motion.div variants={animate ? itemVariants : undefined}>
            <LinksPanel
              email={email}
              resumeUrl={resumeUrl}
              githubUrl={githubUrl}
              linkedinUrl={linkedinUrl}
              platforms={platforms}
            />
          </motion.div>

          {/* Form card */}
          <motion.div variants={animate ? itemVariants : undefined}>
            <div className="rounded-2xl border border-border/60 bg-card/80 p-6 shadow-sm backdrop-blur-sm sm:p-8">
              <p className="mb-6 text-sm font-semibold text-foreground">
                Send a message
              </p>
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
