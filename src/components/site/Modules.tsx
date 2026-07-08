import { motion } from "framer-motion";
import {
  Wallet,
  Users,
  Boxes,
  Factory,
  Truck,
  ShoppingCart,
  BarChart3,
  Briefcase,
  Wrench,
  HardHat,
  GraduationCap,
  Stethoscope,
  Store,
  Building2,
  ClipboardCheck,
  BadgeDollarSign,
  Headphones,
  Package,
  Cpu,
  LineChart,
  ArrowUpRight,
} from "lucide-react";
import { Section, SectionHeader } from "./primitives";
import { cn } from "@/lib/utils";

type Mod = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  features: string[];
  accent: "sky" | "ember" | "mint" | "violet";
};

const modules: Mod[] = [
  { icon: Wallet, title: "Accounting", desc: "Multi-entity GL, IFRS, tax, close.", features: ["AP / AR", "Bank recon", "Consolidation"], accent: "sky" },
  { icon: LineChart, title: "Finance", desc: "Budgets, treasury, cost centers.", features: ["Cash flow", "FX", "Scenario"], accent: "sky" },
  { icon: Users, title: "CRM", desc: "Leads to loyalty, on one graph.", features: ["Pipelines", "Playbooks", "Insights"], accent: "ember" },
  { icon: BadgeDollarSign, title: "Sales", desc: "Quotes, orders, subscriptions.", features: ["CPQ", "Contracts", "Renewals"], accent: "ember" },
  { icon: ShoppingCart, title: "Purchase", desc: "Vendors, RFQs, approvals.", features: ["3-way match", "Portals", "Spend AI"], accent: "mint" },
  { icon: Boxes, title: "Inventory", desc: "Multi-warehouse, batch, serial.", features: ["Cycle count", "Lots", "Barcoding"], accent: "mint" },
  { icon: Factory, title: "Manufacturing", desc: "Discrete, process, MTO, MTS.", features: ["MRP", "BOM", "Shop floor"], accent: "violet" },
  { icon: ClipboardCheck, title: "Quality", desc: "SOPs, NCR, CAPA, audits.", features: ["QMS", "SPC", "Compliance"], accent: "violet" },
  { icon: Users, title: "HRMS", desc: "People ops from hire to retire.", features: ["Attendance", "Perf", "OKRs"], accent: "sky" },
  { icon: BadgeDollarSign, title: "Payroll", desc: "Global payroll & tax filings.", features: ["Multi-country", "Tax", "Payslips"], accent: "sky" },
  { icon: Briefcase, title: "Projects", desc: "Deliver on time, on margin.", features: ["Gantt", "Time", "Billing"], accent: "ember" },
  { icon: Package, title: "Assets", desc: "Track, depreciate, maintain.", features: ["Lifecycle", "IoT", "Depreciation"], accent: "ember" },
  { icon: Wrench, title: "Maintenance", desc: "Preventive & predictive.", features: ["Work orders", "PM", "AI alerts"], accent: "mint" },
  { icon: Headphones, title: "Help Desk", desc: "Omnichannel service ops.", features: ["SLAs", "Tickets", "KB"], accent: "mint" },
  { icon: Store, title: "POS", desc: "In-store selling, unified stock.", features: ["Offline", "Loyalty", "Kiosk"], accent: "violet" },
  { icon: GraduationCap, title: "Education", desc: "Campus to classroom to fees.", features: ["LMS", "Admissions", "Fees"], accent: "violet" },
  { icon: Stethoscope, title: "Healthcare", desc: "Patient records, pharmacy, ops.", features: ["EMR", "OPD/IPD", "Pharmacy"], accent: "sky" },
  { icon: HardHat, title: "Construction", desc: "Sites, subcontractors, safety.", features: ["BOQ", "Sites", "Safety"], accent: "sky" },
  { icon: Building2, title: "Retail", desc: "Omnichannel commerce OS.", features: ["Ecom", "Stores", "Marketplaces"], accent: "ember" },
  { icon: Truck, title: "Distribution", desc: "Route, cover, fulfill fast.", features: ["Routing", "DMS", "SFA"], accent: "ember" },
];

const accents: Record<Mod["accent"], string> = {
  sky: "from-sky-brand to-sky-brand-2",
  ember: "from-ember to-ember-2",
  mint: "from-mint to-sky-brand",
  violet: "from-[oklch(0.6_0.2_300)] to-sky-brand-2",
};

export function Modules() {
  return (
    <Section id="modules" className="bg-secondary/40">
      <SectionHeader
        eyebrow="20+ modules · one platform"
        title={<>One integrated ERP. <span className="text-gradient-brand">Every workflow.</span></>}
        description="Ship any process on the same data model — from a single warehouse to a global supply chain — without brittle integrations."
      />

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {modules.map((m, i) => (
          <motion.a
            key={m.title}
            href="#"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: (i % 8) * 0.04 }}
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-elevated"
          >
            <div
              className={cn(
                "grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br text-white shadow-lg",
                accents[m.accent],
              )}
            >
              <m.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
              {m.title}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">{m.desc}</p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {m.features.map((f) => (
                <li
                  key={f}
                  className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                >
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-sky-brand opacity-0 transition-opacity group-hover:opacity-100">
              Learn more <ArrowUpRight className="h-3.5 w-3.5" />
            </div>

            <div
              aria-hidden
              className={cn(
                "pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30 bg-gradient-to-br",
                accents[m.accent],
              )}
            />
          </motion.a>
        ))}
      </div>
    </Section>
  );
}
