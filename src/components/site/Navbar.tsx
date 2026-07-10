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
  Moon,
  Sun,
  Server,
  Download,
  Clock,
  Shield,
  BadgeCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { useTheme } from "@/lib/theme";

type MenuItem = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  to?: string;
  linkText?: string;
};

type FeaturedPanel = {
  title: React.ReactNode;
  desc: string;
};

const erpSolutions: MenuItem[] = [
  { icon: HardHat, title: "SkyERP EPC", desc: "Manage complex EPC projects from estimation to execution with a unified ERP platform. Streamlines project planning, procurement workflows, BOQ tracking, and real-time cost control.", to: "/", linkText: "EPC ERP Software" },
  { icon: Truck, title: "SkyERP DMS", desc: "Optimize your distribution network with an ERP that handles order management, inventory control, route planning, and sales tracking across multiple warehouses. Built for speed and accuracy.", to: "/", linkText: "Distribution ERP Software" },
  { icon: Wallet, title: "SkyERP NBFC", desc: "Digitize your entire lending lifecycle — from loan origination and KYC verification to disbursement, EMI collection, and NPA management. Secure and compliant.", to: "/", linkText: "NBFC ERP Software" },
  { icon: Factory, title: "SkyERP Dairy", desc: "Run your dairy operations from cow-to-consumer on a single platform. Manages milk procurement, fat/SNF-based pricing, processing, and cold chain logistics.", to: "/", linkText: "Dairy ERP Software" },
  { icon: Users, title: "Human Resource", desc: "Simplify your entire employee lifecycle with an HRMS that handles recruitment, onboarding, attendance, payroll, performance appraisals, and separation workflows.", to: "/", linkText: "HRMS Software" },
];

type MenuColumn = {
  groups: {
    header?: string;
    items: { title: string; to: string }[];
  }[];
  bottomBadge?: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    subtitle: string;
    linkText: string;
    to: string;
  };
  bottomImage?: {
    title?: string;
    src: string;
    alt: string;
    to: string;
    download?: boolean;
  };
};

const erpNextColumns: MenuColumn[] = [
  {
    groups: [
      {
        header: "OVERVIEW",
        items: [
          { title: "Why Choose ERPNext", to: "/erpnext" },
          { title: "ERPNext Partner", to: "/erpnext" },
          { title: "ERPNext Pricing", to: "/erpnext" },
          { title: "Frappe Framework", to: "/erpnext" },
        ]
      },
      {
        header: "MIGRATION",
        items: [
          { title: "SAP to ERPNext Migration", to: "/" },
          { title: "Oracle to ERPNext Migration", to: "/" },
          { title: "Dynamics 365 to ERPNext Migration", to: "/" },
        ]
      }
    ],
    bottomBadge: {
      icon: BadgeCheck,
      title: "CERTIFIED",
      subtitle: "Official ERPNext & Frappe Partner",
      linkText: "View Certificate →",
      to: "/"
    }
  },
  {
    groups: [
      {
        items: [
          { title: "ERPNext Apps Marketplace", to: "/" }
        ]
      },
      {
        header: "APPS",
        items: [
          { title: "Sales Follow up app for ERPNext", to: "/" },
          { title: "Loyalty Program Software", to: "/" },
        ]
      },
      {
        header: "INTEGRATIONS",
        items: [
          { title: "ERPNext Whatsapp Integration", to: "/" },
          { title: "ERPNext Facebook Integration", to: "/" },
          { title: "ERPNext Instagram Integration", to: "/" },
          { title: "ERPNext Indiamart Integration", to: "/" },
          { title: "ERPNext Tata Flow Integration", to: "/" },
          { title: "ChatGPT Integration", to: "/" },
        ]
      }
    ]
  }
];

const hireTeamMenu: MenuItem[] = [
  { icon: Users, title: "ERPNext Developers", desc: "Certified experts", to: "/" },
  { icon: Brain, title: "Solution Architects", desc: "System design", to: "/" },
  { icon: HardHat, title: "Project Managers", desc: "Agile delivery", to: "/" },
  { icon: Stethoscope, title: "Support Engineers", desc: "24/7 maintenance", to: "/" },
];

const deliveryMenu: MenuItem[] = [
  { icon: Sparkles, title: "Our Methodology", desc: "Proven implementation steps", to: "/delivery-excellence" },
  { icon: Shield, title: "Quality Assurance", desc: "ISO certified processes", to: "/delivery-excellence" },
  { icon: Clock, title: "Support SLAs", desc: "Guaranteed uptime", to: "/delivery-excellence" },
];

const companyColumns: MenuColumn[] = [
  {
    groups: [
      {
        items: [
          { title: "About", to: "/about" },
          { title: "Blog", to: "/" },
          { title: "Events", to: "/" },
          { title: "Career", to: "/" },
          { title: "Life @ SkyERP", to: "/" },
        ]
      }
    ],
    bottomImage: {
      title: "COMPANY PROFILE",
      src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      alt: "SkyERP Company Profile Brochure",
      to: "/ERP_Skydot_Brochure.pdf",
      download: true
    }
  }
];

type NavItem = 
  | { type: 'dropdown'; label: string; items: MenuItem[]; cols: number; featured?: FeaturedPanel; align?: 'left' | 'right' | 'center' }
  | { type: 'link-columns'; label: string; columns: MenuColumn[]; align?: 'left' | 'right' | 'center' }
  | { type: 'link'; label: string; to: string };

const navItems: NavItem[] = [
  { 
    type: 'dropdown', 
    label: 'ERP Solutions', 
    items: erpSolutions, 
    cols: 3,
    featured: {
      title: <>AI-Ready.<br/>Process-Intelligent.<br/>Future-Built.</>,
      desc: "Every SkyERP solution is engineered with AI enablement at its core — transforming data into predictive insights, automating workflows, and empowering smarter business decisions across industries."
    }
  },
  { type: 'link-columns', label: 'ERPNext', columns: erpNextColumns, align: 'left' },
  { type: 'dropdown', label: 'Hire Team', items: hireTeamMenu, cols: 1, align: 'center' },
  { type: 'link', label: 'Case Studies', to: '/case-studies' },
  { type: 'dropdown', label: 'Delivery Excellence', items: deliveryMenu, cols: 1, align: 'center' },
  { type: 'link-columns', label: 'Company', columns: companyColumns, align: 'right' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const { isDark, toggleTheme } = useTheme();

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
              : "border border-foreground/10 bg-foreground/[0.03] backdrop-blur-md",
          )}
          onMouseLeave={() => setOpen(null)}
        >
          <Link to="/" className="flex items-center shrink-0">
            <img src="/erpnextlogo.png" alt="SKY ERP" className="h-8 w-auto" />
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              if (item.type === 'dropdown' || item.type === 'link-columns') {
                const isFeatured = item.type === 'dropdown' && !!item.featured;
                const alignClass = isFeatured 
                  ? "left-0 right-0 w-full" 
                  : item.align === 'right' 
                    ? "right-0" 
                    : item.align === 'center'
                      ? "left-1/2 -translate-x-1/2"
                      : "left-0";

                return (
                  <div 
                    key={item.label} 
                    className={cn(isFeatured ? "" : "relative")}
                    onMouseEnter={() => setOpen(item.label)}
                    onMouseLeave={() => setOpen(null)}
                  >
                    <button
                      onFocus={() => setOpen(item.label)}
                      className={cn(
                        "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition hover:bg-foreground/5 hover:text-foreground",
                        open === item.label && "bg-foreground/5 text-foreground",
                      )}
                      aria-expanded={open === item.label}
                      aria-haspopup="true"
                    >
                      {item.label}
                      <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                    </button>

                    <AnimatePresence>
                      {open === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className={cn(
                            "absolute top-full pt-4 hidden lg:block z-50",
                            alignClass,
                            !isFeatured && "min-w-[max-content]"
                          )}
                        >
                          <div className={cn(isFeatured ? "mx-auto max-w-7xl px-4 sm:px-6" : "")}>
                            <div className="glass-dark rounded-3xl p-2 shadow-elevated border border-white/10 overflow-hidden">
                              {item.type === 'dropdown' ? (
                                <MegaGrid items={item.items} cols={item.cols} featured={item.featured} />
                              ) : (
                                <LinkColumnsMenu columns={item.columns} />
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition hover:bg-foreground/5 hover:text-foreground"
                  onMouseEnter={() => setOpen(null)}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <button
              onClick={toggleTheme}
              className="mr-2 rounded-full border border-foreground/10 bg-foreground/5 p-2 text-foreground/80 transition hover:bg-foreground/10 hover:text-foreground"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <Button
              variant="ghost"
              className="text-foreground/80 hover:bg-foreground/10 hover:text-foreground"
              size="sm"
            >
              Login
            </Button>
            <Button
              size="sm"
              className="gradient-ember shadow-ember text-foreground hover:opacity-95"
            >
              Schedule Demo
            </Button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleTheme}
              className="rounded-lg border border-foreground/10 bg-foreground/5 p-2 text-foreground"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setMobile((v) => !v)}
              className="rounded-lg border border-foreground/10 bg-foreground/5 p-2 text-foreground"
              aria-label={mobile ? "Close menu" : "Open menu"}
            >
              {mobile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

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
              {navItems.map((item) => {
                if (item.type === 'dropdown' || item.type === 'link-columns') {
                  return (
                    <details key={item.label} className="group rounded-lg">
                      <summary className="flex cursor-pointer items-center justify-between px-3 py-2 text-sm font-medium text-foreground/90">
                        {item.label}
                        <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
                      </summary>
                      <div className="mt-1 grid gap-1 px-1 pb-2">
                        {item.type === 'dropdown' && item.items.map((it) => (
                          <Link
                            key={it.title}
                            to={it.to || "/"}
                            className="flex items-start gap-3 rounded-lg px-3 py-2 text-sm text-foreground/80 hover:bg-foreground/5"
                          >
                            <it.icon className="mt-0.5 h-4 w-4 text-sky-brand" />
                            <div>
                              <div className="font-medium text-foreground">{it.title}</div>
                              <div className="text-xs text-foreground/60">{it.desc}</div>
                            </div>
                          </Link>
                        ))}
                        {item.type === 'link-columns' && item.columns.flatMap(col => col.groups).flatMap(group => group.items).map((it) => (
                          <Link
                            key={it.title}
                            to={it.to}
                            className="flex items-center rounded-lg px-3 py-2 text-sm text-foreground/80 hover:bg-foreground/5"
                          >
                            <div className="font-medium text-foreground">{it.title}</div>
                          </Link>
                        ))}
                      </div>
                    </details>
                  );
                }
                return (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/90 hover:bg-foreground/5"
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="mt-2 grid grid-cols-2 gap-2">
                <Button variant="outline" className="border-foreground/20 bg-foreground/5 text-foreground hover:bg-foreground/10">
                  Login
                </Button>
                <Button className="gradient-ember text-foreground">
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

function MegaGrid({ items, cols, featured }: { items: MenuItem[]; cols: number; featured?: FeaturedPanel }) {
  if (featured) {
    return (
      <div className="flex w-full min-h-[400px]">
        {/* Featured Left Panel */}
        <div className="w-1/3 p-10 rounded-2xl gradient-brand text-white flex flex-col justify-center relative overflow-hidden shrink-0">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
          <div className="relative z-10">
            <h3 className="text-3xl font-display font-bold leading-tight mb-6">
              {featured.title}
            </h3>
            <p className="text-white/80 text-sm leading-relaxed">
              {featured.desc}
            </p>
          </div>
        </div>

        {/* Items Right Grid */}
        <div className="w-2/3 p-8">
          <div className="grid grid-cols-2 gap-x-8 gap-y-10">
            {items.map((it, i) => (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link to={it.to || "/"} className="block group">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                    <it.icon className="h-6 w-6 stroke-[1.5]" />
                  </div>
                  <h4 className="text-base font-bold text-foreground mb-2 group-hover:text-blue-600 transition-colors">{it.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                    {it.desc}
                  </p>
                  {it.linkText && (
                    <div className="text-sm font-semibold text-blue-600 flex items-center group-hover:text-blue-500">
                      {it.linkText} <span className="ml-1 transition-transform group-hover:translate-x-1">&rarr;</span>
                    </div>
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Standard Compact Grid (for non-featured menus like ERPNext, Hire Team, etc.)
  return (
    <div className={cn("grid gap-2 p-3", cols === 2 ? "grid-cols-2" : "grid-cols-1", "max-w-sm mx-auto")}>
      {items.map((it, i) => (
        <motion.div
          key={it.title}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.03 }}
        >
          <Link
            to={it.to || "/"}
            className="group flex items-start gap-3 rounded-xl border border-transparent p-3 transition hover:border-sky-brand/30 hover:bg-foreground/5"
          >
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg gradient-brand text-white shadow-brand">
              <it.icon className="h-4.5 w-4.5" />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-foreground">{it.title}</div>
              <div className="text-xs text-foreground/60">{it.desc}</div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

function LinkColumnsMenu({ columns }: { columns: MenuColumn[] }) {
  return (
    <div className="flex gap-8 p-6 bg-background/50">
      {columns.map((col, cIdx) => (
        <div key={cIdx} className="flex-1 flex flex-col gap-8 min-w-[240px]">
          <div className="flex flex-col gap-6">
            {col.groups.map((group, gIdx) => (
              <div key={gIdx} className="flex flex-col gap-3">
                {group.header && (
                  <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
                    {group.header}
                  </h4>
                )}
                <div className="flex flex-col gap-2.5">
                  {group.items.map((it, iIdx) => (
                    <Link
                      key={iIdx}
                      to={it.to}
                      className="text-sm text-foreground/80 hover:text-blue-500 transition-colors"
                    >
                      {it.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {col.bottomBadge && (
            <div className="mt-auto pt-6">
              <Link to={col.bottomBadge.to} className="group block bg-card border border-border rounded-xl p-4 shadow-sm hover:border-blue-500/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 text-white shrink-0">
                    <col.bottomBadge.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-foreground mb-0.5 flex items-center gap-1 group-hover:text-blue-500 transition-colors">
                      {col.bottomBadge.title} <col.bottomBadge.icon className="h-3 w-3" />
                    </div>
                    <div className="text-[11px] leading-tight text-muted-foreground mb-1">
                      {col.bottomBadge.subtitle}
                    </div>
                    <div className="text-[11px] font-semibold text-blue-600 group-hover:text-blue-500 transition-colors">
                      {col.bottomBadge.linkText}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {col.bottomImage && (
            <div className="mt-auto pt-4 flex flex-col gap-3">
              {col.bottomImage.title && (
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  {col.bottomImage.title}
                </h4>
              )}
              {col.bottomImage.download ? (
                <a href={col.bottomImage.to} download className="group block overflow-hidden rounded-xl border border-border/50 hover:border-blue-500/50 shadow-sm transition-all duration-300 relative">
                  <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors z-10" />
                  <img 
                    src={col.bottomImage.src} 
                    alt={col.bottomImage.alt}
                    className="w-full h-32 object-cover object-center group-hover:scale-105 transition-transform duration-500" 
                  />
                </a>
              ) : (
                <Link to={col.bottomImage.to} className="group block overflow-hidden rounded-xl border border-border/50 hover:border-blue-500/50 shadow-sm transition-all duration-300 relative">
                  <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors z-10" />
                  <img 
                    src={col.bottomImage.src} 
                    alt={col.bottomImage.alt}
                    className="w-full h-32 object-cover object-center group-hover:scale-105 transition-transform duration-500" 
                  />
                </Link>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
