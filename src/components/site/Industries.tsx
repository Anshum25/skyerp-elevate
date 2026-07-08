import { motion } from "framer-motion";
import {
  Factory,
  Truck,
  Store,
  GraduationCap,
  Stethoscope,
  Pill,
  Shirt,
  UtensilsCrossed,
  Milk,
  HardHat,
  Package,
  Car,
  FlaskConical,
  Hotel,
  Building2,
  HeartHandshake,
  Landmark,
  Cog,
  Briefcase,
  ShoppingCart,
  ArrowUpRight,
} from "lucide-react";
import { Section, SectionHeader } from "./primitives";

const industries = [
  { icon: Factory, name: "Manufacturing", tag: "MRP + shop floor" },
  { icon: Briefcase, name: "Trading", tag: "Multi-branch ops" },
  { icon: Package, name: "Distribution", tag: "Route to market" },
  { icon: ShoppingCart, name: "Retail", tag: "Omnichannel" },
  { icon: GraduationCap, name: "Education", tag: "Campus OS" },
  { icon: Stethoscope, name: "Healthcare", tag: "Clinical + admin" },
  { icon: Pill, name: "Pharma", tag: "GxP compliant" },
  { icon: Shirt, name: "Textile", tag: "Style to season" },
  { icon: UtensilsCrossed, name: "Food", tag: "Batch + FEFO" },
  { icon: Milk, name: "Dairy", tag: "Farm to fridge" },
  { icon: HardHat, name: "Construction", tag: "Sites + BOQ" },
  { icon: Truck, name: "Logistics", tag: "Fleet + TMS" },
  { icon: Car, name: "Automobile", tag: "Dealer + service" },
  { icon: FlaskConical, name: "Chemical", tag: "Process + safety" },
  { icon: Hotel, name: "Hospitality", tag: "Property + guest" },
  { icon: Building2, name: "Real Estate", tag: "Project + broker" },
  { icon: HeartHandshake, name: "NGO", tag: "Grants + impact" },
  { icon: Landmark, name: "Government", tag: "Citizen services" },
  { icon: Cog, name: "Engineering", tag: "ETO + services" },
  { icon: Store, name: "Services", tag: "PSA + billing" },
];

export function Industries() {
  return (
    <Section id="industries">
      <SectionHeader
        eyebrow="Industry blueprints"
        title={<>Ready for <span className="text-gradient-brand">your industry</span> on day one.</>}
        description="Preconfigured processes, KPIs and compliance packs for 20+ industries — so you go live in weeks, not years."
      />
      <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {industries.map((it, i) => (
          <motion.a
            href="#"
            key={it.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: (i % 10) * 0.03, duration: 0.4 }}
            whileHover={{ y: -3 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-4 transition hover:border-sky-brand/40 hover:shadow-elevated"
          >
            <div>
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-sky-brand/10 text-sky-brand transition group-hover:gradient-brand group-hover:text-white">
                <it.icon className="h-5 w-5" />
              </div>
              <div className="mt-3 text-sm font-semibold text-foreground">{it.name}</div>
              <div className="text-xs text-muted-foreground">{it.tag}</div>
            </div>
            <ArrowUpRight className="mt-3 h-4 w-4 self-end text-muted-foreground opacity-0 transition group-hover:opacity-100" />
          </motion.a>
        ))}
      </div>
    </Section>
  );
}
