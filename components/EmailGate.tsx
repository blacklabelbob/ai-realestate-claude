"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Lock, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "reai_unlocked_email";
const UNLOCK_EVENT = "reai:unlock";

/** Has the visitor already unlocked anywhere this session/device? */
export function useUnlocked() {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    setUnlocked(Boolean(localStorage.getItem(STORAGE_KEY)));
    const handler = () => setUnlocked(Boolean(localStorage.getItem(STORAGE_KEY)));
    window.addEventListener(UNLOCK_EVENT, handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener(UNLOCK_EVENT, handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  return unlocked;
}

export async function captureLead(input: {
  email: string;
  source: string;
  address?: string;
  reportSlug?: string;
  ref?: string; // partner attribution id (?ref= deep-link)
}) {
  localStorage.setItem(STORAGE_KEY, input.email);
  window.dispatchEvent(new Event(UNLOCK_EVENT));
  try {
    await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
  } catch {
    // Unlock the content regardless — capture is best-effort.
  }
}

interface EmailGateProps {
  children: React.ReactNode;
  source: string;
  address?: string;
  reportSlug?: string;
  title?: string;
  subtitle?: string;
  /** approx height of the blurred teaser behind the overlay */
  previewHeight?: string;
}

export function EmailGate({
  children,
  source,
  address,
  reportSlug,
  title = "Unlock the full analysis",
  subtitle = "Enter your email to reveal cash flow, investment scenarios, and the final recommendation — right here, no inbox required.",
  previewHeight = "26rem",
}: EmailGateProps) {
  const unlocked = useUnlocked();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Before hydration completes, render unlocked markup to avoid SSR mismatch flash.
  if (!mounted || unlocked) {
    return <>{children}</>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      toast.error("Please enter a valid email");
      return;
    }
    setSubmitting(true);
    await captureLead({ email: email.trim(), source, address, reportSlug });
    toast.success("Unlocked. The full report is below — yours to keep.");
    setSubmitting(false);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border">
      {/* Blurred teaser */}
      <div
        className="pointer-events-none select-none blur-[6px] opacity-50"
        style={{ maxHeight: previewHeight, overflow: "hidden" }}
        aria-hidden
      >
        {children}
      </div>

      {/* Unlock overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-navy/40 via-navy/80 to-navy p-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md rounded-xl border border-gold/30 bg-card/95 p-6 text-center shadow-2xl backdrop-blur"
        >
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold/15">
            <Lock className="h-6 w-6 text-gold" />
          </div>
          <h3 className="text-xl font-bold text-foreground">{title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          <form onSubmit={handleSubmit} className="mt-5 space-y-3">
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 text-center"
            />
            <Button type="submit" variant="gold" className="w-full h-12 text-base" disabled={submitting}>
              {submitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Unlocking…
                </span>
              ) : (
                "Show Me the Full Report"
              )}
            </Button>
          </form>
          <p className="mt-3 text-xs text-muted-foreground/70">
            No spam. We unlock instantly — the report stays on this page.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
