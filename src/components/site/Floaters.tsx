import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUp, Bot, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ScrollToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 800);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 left-6 z-40 grid h-11 w-11 place-items-center rounded-full glass-dark text-white shadow-elevated"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export function AIAssistantFAB() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <motion.button
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full gradient-ember shadow-ember text-white"
        aria-label="Open SkyAI assistant"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-ember/30" />
        <Bot className="relative h-6 w-6" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-40 w-[min(360px,calc(100vw-3rem))] overflow-hidden rounded-2xl border border-border bg-card shadow-elevated"
          >
            <div className="flex items-center justify-between gradient-brand p-4 text-white">
              <div className="flex items-center gap-2">
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-white/20">
                  <Bot className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-bold">SkyAI Copilot</div>
                  <div className="text-[10px] opacity-80">Online · avg reply 8s</div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg p-1 hover:bg-white/10"
                aria-label="Close assistant"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="max-h-64 space-y-3 overflow-y-auto p-4 text-sm">
              <div className="rounded-2xl rounded-tl-sm bg-muted p-3">
                👋 Hi! I'm SkyAI. Ask me anything about SkyERP — pricing, modules, migration, integrations.
              </div>
              <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm gradient-brand p-3 text-white">
                Show me manufacturing features
              </div>
              <div className="rounded-2xl rounded-tl-sm bg-muted p-3">
                Sure — SkyERP Manufacturing includes MRP, BOM management, shop-floor control, quality, and OEE. Want a live demo?
              </div>
            </div>
            <div className="flex items-center gap-2 border-t border-border p-3">
              <input
                type="text"
                placeholder="Ask SkyAI…"
                className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-sky-brand"
              />
              <Button size="icon" className="gradient-brand text-white">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => {
      if (typeof window !== "undefined" && !localStorage.getItem("skyerp-cookie")) {
        setShow(true);
      }
    }, 1800);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    localStorage.setItem("skyerp-cookie", "1");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 left-1/2 z-40 w-[min(560px,calc(100vw-2rem))] -translate-x-1/2 rounded-2xl border border-border bg-card p-4 shadow-elevated"
          role="dialog"
          aria-label="Cookie consent"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <p className="flex-1 text-xs text-muted-foreground">
              We use cookies to improve your experience and analyze usage. See our{" "}
              <a href="#" className="font-semibold text-sky-brand hover:underline">
                privacy policy
              </a>.
            </p>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={dismiss}>
                Reject
              </Button>
              <Button size="sm" className="gradient-brand text-white" onClick={dismiss}>
                Accept all
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
