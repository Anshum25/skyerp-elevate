import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Twitter, Youtube, Mail, ArrowRight } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const cols = [
  {
    title: "Product",
    links: ["Finance", "Manufacturing", "Inventory", "CRM", "HRMS", "Projects", "Mobile ERP"],
  },
  {
    title: "Industries",
    links: ["Manufacturing", "Retail", "Distribution", "Healthcare", "Education", "Construction", "Logistics"],
  },
  {
    title: "Resources",
    links: ["Documentation", "Blog", "Case studies", "Webinars", "Community", "Migration center", "Trust"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Partners", "Press", "Contact", "Security", "Legal"],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden gradient-navy text-white">
      <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-25" />
      <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-sky-brand/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <Logo className="h-9 w-9" />
              <span className="font-display text-xl font-bold tracking-tight">
                Sky<span className="text-gradient-brand">ERP</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              The AI-native ERP unifying finance, operations, HR and CX for
              modern enterprises across 42 countries.
            </p>

            <form
              className="mt-6 max-w-sm"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Newsletter signup"
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-white/50">
                Get the SkyERP newsletter
              </div>
              <div className="mt-2 flex gap-2">
                <Input
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="border-white/15 bg-white/5 text-white placeholder:text-white/40"
                />
                <Button type="submit" className="gradient-ember text-white shadow-ember">
                  <Mail className="mr-1 h-4 w-4" /> Join
                </Button>
              </div>
            </form>

            <div className="mt-6 flex gap-2">
              {[Twitter, Linkedin, Github, Youtube].map((I, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
                  aria-label={`Social link ${i + 1}`}
                >
                  <I className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {cols.map((c) => (
              <div key={c.title}>
                <div className="text-xs font-semibold uppercase tracking-wider text-white/50">
                  {c.title}
                </div>
                <ul className="mt-4 space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-sm text-white/80 hover:text-white">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <div className="text-xs text-white/50">
            © {new Date().getFullYear()} SkyERP Technologies. All rights reserved.
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/60">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Cookies</a>
            <a href="#" className="hover:text-white">Status</a>
            <a href="#" className="hover:text-white">Trust</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
