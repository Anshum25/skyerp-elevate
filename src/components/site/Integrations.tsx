import {
  BadgeCheck,
  Box,
  Building2,
  Calculator,
  Factory,
  Filter,
  Kanban,
  Layers,
  Package,
  RefreshCw,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Store,
  UserCircle,
  Users,
  Wrench,
} from "lucide-react";
import { Section, SectionHeader } from "./primitives";
import { GravityPills, type StackPill } from "./GravityPills";

const stackModules: StackPill[] = [
  { name: "Framework", icon: Box, accent: "sky" },
  { name: "Frappe CRM", icon: Filter, accent: "ember" },
  { name: "Organization", icon: Building2, accent: "sky" },
  { name: "Tools", icon: Wrench, accent: "sky" },
  { name: "Accounting", icon: Calculator, accent: "sky" },
  { name: "Assets", icon: Layers, accent: "sky" },
  { name: "Buying", icon: ShoppingBag, accent: "sky" },
  { name: "India Compliance", icon: ShieldCheck, accent: "sky" },
  { name: "Manufacturing", icon: Factory, accent: "sky" },
  { name: "Projects", icon: Kanban, accent: "sky" },
  { name: "Quality", icon: BadgeCheck, accent: "sky" },
  { name: "Selling", icon: Store, accent: "sky" },
  { name: "Stock", icon: Package, accent: "sky" },
  { name: "Subcontracting", icon: RefreshCw, accent: "sky" },
  { name: "ERPNext Settings", icon: Settings, accent: "sky" },
  { name: "Frappe HR", icon: UserCircle, accent: "mint" },
  { name: "HRMS", icon: Users, accent: "mint" },
];

export function Integrations() {
  return (
    <Section id="integrations" className="bg-secondary/40">
      <SectionHeader
        eyebrow="Platform"
        title={
          <>
            Fits your <span className="text-gradient-brand">tech stack.</span>
          </>
        }
        description="Every module you need — accounting, manufacturing, HR, and more — unified on one platform."
      />
      <GravityPills modules={stackModules} />
    </Section>
  );
}
