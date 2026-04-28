"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";

type ModalState = "idle" | "loading" | "success" | "error";

interface WaitlistButtonProps {
  className?: string;
  label?: string;
}

export default function WaitlistButton({
  className,
  label = "Join the Waitlist",
}: WaitlistButtonProps) {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<ModalState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const firstInputRef = useRef<HTMLInputElement>(null);

  const handleClose = useCallback(() => {
    setOpen(false);
    setTimeout(() => {
      setState("idle");
      setName("");
      setEmail("");
      setMessage("");
      setErrorMsg("");
    }, 300);
  }, []);

  // ESC key
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, handleClose]);

  // Freeze scroll without hiding the scrollbar:
  // position:fixed locks the body in place while keeping the scrollbar track
  // visible and the layout completely stable.
  useEffect(() => {
    if (!open) return;

    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflowY = "scroll"; // keep scrollbar visible

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflowY = "";
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  // Auto-focus first input when modal opens
  useEffect(() => {
    if (open && state !== "success") {
      const t = setTimeout(() => firstInputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [open, state]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = (await res.json()) as { success?: boolean; error?: string };
      if (!res.ok) {
        setState("error");
        setErrorMsg(data.error ?? "Something went wrong. Please try again.");
      } else {
        setState("success");
      }
    } catch {
      setState("error");
      setErrorMsg("Network error. Please check your connection and try again.");
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={className}
        aria-haspopup="dialog"
      >
        {label}
      </button>

      {open && createPortal(
        <div
          className="backdrop-enter fixed inset-0 z-[200] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="waitlist-modal-title"
        >
          {/* Backdrop — full viewport including behind navbar */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <div className="modal-enter relative z-10 w-full max-w-md bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl shadow-black/30 p-8 focus:outline-none">
            {state === "success" ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                  <svg
                    className="text-amber-500"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  You&#39;re on the list!
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-7 leading-relaxed">
                  We&#39;ll reach out the moment early access opens. Keep an eye
                  on your inbox — and thanks for believing in what we&#39;re
                  building.
                </p>
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 rounded-lg bg-amber-500 text-white font-bold text-sm hover:bg-amber-400 transition"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 mb-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                      <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 tracking-widest uppercase">
                        Pilot — Early Access
                      </span>
                    </div>
                    <h3
                      id="waitlist-modal-title"
                      className="text-xl font-bold text-slate-900 dark:text-white"
                    >
                      Join the CanaryBox Waitlist
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      Be first in line when we launch.
                    </p>
                  </div>
                  <button
                    onClick={handleClose}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition ml-4 mt-1 shrink-0"
                    aria-label="Close modal"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div>
                    <label
                      htmlFor="wl-name"
                      className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide"
                    >
                      Name <span className="text-amber-500">*</span>
                    </label>
                    <input
                      ref={firstInputRef}
                      id="wl-name"
                      type="text"
                      required
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      maxLength={200}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="wl-email"
                      className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide"
                    >
                      Work Email <span className="text-amber-500">*</span>
                    </label>
                    <input
                      id="wl-email"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      maxLength={320}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="wl-message"
                      className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide"
                    >
                      What are you building?{" "}
                      <span className="text-slate-400 font-normal normal-case tracking-normal">
                        (optional)
                      </span>
                    </label>
                    <textarea
                      id="wl-message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us about your project — your team size, stack, and biggest QA pain points."
                      rows={3}
                      maxLength={1000}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition resize-none"
                    />
                  </div>

                  {errorMsg && (
                    <p
                      role="alert"
                      className="text-xs text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-lg px-3 py-2"
                    >
                      {errorMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={state === "loading"}
                    className="w-full px-6 py-3 rounded-lg bg-amber-500 text-white font-bold text-sm hover:bg-amber-400 disabled:opacity-60 disabled:cursor-not-allowed transition shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
                  >
                    {state === "loading" ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                          />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      "Request Early Access →"
                    )}
                  </button>

                  <p className="text-xs text-center text-slate-400 dark:text-slate-500">
                    No spam, ever. We&#39;ll only contact you about CanaryBox.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      , document.body)}
    </>
  );
}
