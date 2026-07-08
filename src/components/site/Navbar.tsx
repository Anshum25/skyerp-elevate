import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Boxes,
  Factory,
  Building2,
  Users,
  BarChart3,
  ShoppingCart,
  Truck,
  GraduationCap,
  Stethoscope,
  HardHat,
  Store,
  Wallet,
  Wrench,
  Zap,
  Brain,
  Cloud,
  Smartphone,
  FileText,
  Rocket,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

type MenuItem = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  href?: string;
};

const solutions: MenuItem[] = [
  { icon: Wallet, title: "Finance & Accounting", desc: "GL, AP/AR, tax, consolidation" },
  { icon: Factory, title: "Manufacturing", desc: "MRP, BOM, shop floor control" },
  { icon: Boxes, title: "Inventory & Warehouse", desc: "Real-time stock intelligence" },
  { icon: Users, title: "CRM & Sales", desc: "Pipeline, quotes, forecasts" },
  { icon: BarChart3, title: "Business Intelligence", desc: "AI dashboards & reports" },
  { icon: HardHat, title: "Projects", desc: "Time, cost, delivery tracking" },
];

const industries: MenuItem[] = [
  { icon: Factory, title: "Manufacturing", desc: "Discrete, process & MTO" },
  { icon: ShoppingCart, title: "Retail & POS", desc: "Omnichannel commerce" },
  { icon: Truck, title: "Logistics", desc: "Fleet, routes, last-mile" },
  { icon: GraduationCap, title: "Education", desc: "Campuses & academies" },
  { icon: Stethoscope, title: "Healthcare", desc: "Clinics, hospitals, pharma" },
  { icon: Building2, title: "Construction", desc: "Sites, subcontractors" },
];

const products: MenuItem[] = [
  { icon: Cloud, title: "SkyERP Cloud", desc: "Fully-managed multi-tenant" },
  { icon: Smartphone, title: "Mobile ERP", desc: "iOS & Android apps" },
  { icon: Brain, title: "SkyAI Copilot", desc: "Agents for every module" },
  { icon: Zap, title: "Workflow Studio", desc: "No-code automations" },
];

const resources: MenuItem[] = [
  { icon: FileText, title: "Documentation", desc: "Guides, APIs, SDKs" },
  { icon: Rocket, title: "Case Studies", desc: "Real outcomes at scale" },
  { icon: Sparkles, title: "Product Blog", desc: "Roadmap & releases" },
  { icon: Wrench, title: "Migration Center", desc: "SAP, Oracle, Odoo" },
];

const menus: { label: string; items: MenuItem[]; cols: number }[] = [
  { label: "Solutions", items: solutions, cols: 2 },
  { label: "Industries", items: industries, cols: 2 },
  { label: "Products", items: products, cols: 1 },
  { label: "Resources", items: resources, cols: 1 },
];

const flat = [
  { label: "Services", to: "/" },
  { label: "Pricing", to: "/" },
  { label: "Blog", to: "/" },
  { label: "Contact", to: "/" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobile(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav
          className={cn(
            "flex items-center justify-between gap-4 rounded-2xl px-4 py-2.5 transition-all duration-500",
            scrolled
              ? "glass-dark shadow-elevated"
              : "border border-white/10 bg-white/[0.03] backdrop-blur-md",
          )}
          onMouseLeave={() => setOpen(null)}
        >
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <Logo className="h-8 w-8" />
            <span className="font-display text-lg font-bold tracking-tight text-white">
              Sky<span className="text-gradient-brand">ERP</span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {menus.map((m) => (
              <button
                key={m.label}
                onMouseEnter={() => setOpen(m.label)}
                onFocus={() => setOpen(m.label)}
                className={cn(
                  "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-white/80 transition hover:bg-white/5 hover:text-white",
                  open === m.label && "bg-white/5 text-white",
                )}
                aria-expanded={open === m.label}
                aria-haspopup="true"
              >
                {m.label}
                <ChevronDown className="h-3.5 w-3.5 opacity-60" />
              </button>
            ))}
            {flat.map((f) => (
              <Link
                key={f.label}
                to={f.to}
                className="rounded-lg px-3 py-2 text-sm font-medium text-white/80 transition hover:bg-white/5 hover:text-white"
                onMouseEnter={() => setOpen(null)}
              >
                {f.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <Button
              variant="ghost"
              className="text-white/80 hover:bg-white/10 hover:text-white"
              size="sm"
            >
              Login
            </Button>
            <Button
              size="sm"
              className="gradient-ember shadow-ember text-white hover:opacity-95"
            >
              Schedule Demo
            </Button>
          </div>

          <button
            onClick={() => setMobile((v) => !v)}
            className="rounded-lg border border-white/10 bg-white/5 p-2 text-white lg:hidden"
            aria-label={mobile ? "Close menu" : "Open menu"}
          >
            {mobile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Mega menu */}
          <AnimatePresence>
            {open && (
              <motion.div
                key={open}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute left-4 right-4 top-full mt-2 hidden lg:block"
              >
                <div className="glass-dark rounded-2xl p-5 shadow-elevated">
                  <MegaGrid items={menus.find((m) => m.label === open)!.items} cols={menus.find((m) => m.label === open)!.cols} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-4 mt-2 rounded-2xl glass-dark p-4 shadow-elevated lg:hidden"
          >
            <div className="grid gap-1">
              {menus.map((m) => (
                <details key={m.label} className="group rounded-lg">
                  <summary className="flex cursor-pointer items-center justify-between px-3 py-2 text-sm font-medium text-white/90">
                    {m.label}
                    <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
                  </summary>
                  <div className="mt-1 grid gap-1 px-1 pb-2">
                    {m.items.map((it) => (
                      <a
                        key={it.title}
                        href="#"
                        className="flex items-start gap-3 rounded-lg px-3 py-2 text-sm text-white/80 hover:bg-white/5"
                      >
                        <it.icon className="mt-0.5 h-4 w-4 text-sky-brand" />
                        <div>
                          <div className="font-medium text-white">{it.title}</div>
                          <div className="text-xs text-white/60">{it.desc}</div>
                        </div>
                      </a>
                    ))}
                  </div>
                </details>
              ))}
              {flat.map((f) => (
                <Link
                  key={f.label}
                  to={f.to}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/5"
                >
                  {f.label}
                </Link>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-2">
                <Button variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10">
                  Login
                </Button>
                <Button className="gradient-ember text-white">
                  <Phone className="mr-1 h-4 w-4" /> Demo
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function MegaGrid({ items, cols }: { items: MenuItem[]; cols: number }) {
  return (
    <div className={cn("grid gap-2", cols === 2 ? "grid-cols-2" : "grid-cols-1")}>
      {items.map((it, i) => (
        <motion.a
          key={it.title}
          href="#"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.03 }}
          className="group flex items-start gap-3 rounded-xl border border-transparent p-3 transition hover:border-sky-brand/30 hover:bg-white/5"
        >
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg gradient-brand text-white shadow-brand">
            <it.icon className="h-4.5 w-4.5" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold text-white">{it.title}</div>
            <div className="text-xs text-white/60">{it.desc}</div>
          </div>
        </motion.a>
      ))}
    </div>
  );
}
