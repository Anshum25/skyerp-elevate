import { useState } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  ShoppingCart,
  Calculator,
  Truck,
  BarChart,
  MessageSquare,
  Zap,
  ArrowRight
} from "lucide-react";
import { Section } from "./primitives";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const categories = [
  { id: "all", label: "All Integrations", icon: Zap },
  { id: "payments", label: "Payments Automated", icon: CreditCard },
  { id: "ecommerce", label: "E-commerce Connected", icon: ShoppingCart },
  { id: "finance", label: "Finance & Accounting Tools", icon: Calculator },
  { id: "logistics", label: "Logistics Streamlined", icon: Truck },
  { id: "analytics", label: "Analytics Integrations", icon: BarChart },
  { id: "comms", label: "Communications Synced", icon: MessageSquare },
];

const integrations = [
  { name: "PayPal", domain: "paypal.com", cat: "payments" },
  { name: "Razorpay", domain: "razorpay.com", cat: "payments" },
  { name: "Stripe", domain: "stripe.com", cat: "payments" },
  { name: "Shopify", domain: "shopify.com", cat: "ecommerce" },
  { name: "Magento", domain: "magento.com", cat: "ecommerce" },
  { name: "WooCommerce", domain: "woocommerce.com", cat: "ecommerce" },
  { name: "Tally", domain: "tallysolutions.com", cat: "finance" },
  { name: "AWS", domain: "aws.amazon.com", cat: "finance" },
  { name: "Unicommerce", domain: "unicommerce.com", cat: "logistics" },
  { name: "Google", domain: "google.com", cat: "analytics" },
  { name: "Slack", domain: "slack.com", cat: "comms" },
  { name: "WhatsApp", domain: "whatsapp.com", cat: "comms" },
  { name: "SendGrid", domain: "sendgrid.com", cat: "comms" },
  { name: "LinkedIn", domain: "linkedin.com", cat: "analytics" },
  { name: "Dropbox", domain: "dropbox.com", cat: "finance" },
  { name: "Instagram", domain: "instagram.com", cat: "analytics" },
  { name: "Twitter", domain: "twitter.com", cat: "analytics" },
];

export function Integrations() {
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <Section id="integrations" className="bg-secondary/20 overflow-hidden">
      <div className="text-center mx-auto max-w-4xl mb-16 px-4">
        <h4 className="text-xs font-bold uppercase tracking-widest text-sky-brand mb-4">
          Integrations
        </h4>
        <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl text-foreground mb-4 leading-tight">
          Access All your Tools in One Place.<br/>
          <span className="text-gradient-brand">Connect every tool. Automate every workflow.</span>
        </h2>
        <p className="mt-4 text-muted-foreground sm:text-lg">
          Let SkyERP streamline your business operations with on-the-go enterprise integration services.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_2.5fr] gap-12 items-start mt-16">
        {/* Left Side: Categories */}
        <div className="flex flex-col gap-2 relative z-10">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onMouseEnter={() => setActiveCategory(cat.id)}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "flex items-center gap-4 px-5 py-4 rounded-xl text-left transition-all duration-300",
                  isActive 
                    ? "bg-card shadow-elevated border border-sky-brand/20 text-sky-brand" 
                    : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
                )}
              >
                <cat.icon className={cn("h-5 w-5", isActive ? "text-sky-brand" : "text-foreground/50")} />
                <span className="font-semibold text-sm sm:text-base">{cat.label}</span>
                {isActive && (
                  <motion.div layoutId="active-indicator" className="ml-auto w-1.5 h-1.5 rounded-full bg-sky-brand" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Side: Logo Cloud */}
        <div className="relative rounded-[2.5rem] bg-card border border-border p-8 sm:p-12 shadow-sm min-h-[500px] flex items-center justify-center overflow-hidden">
          {/* Subtle background mesh to make it feel premium */}
          <div className="absolute inset-0 bg-mesh opacity-10 pointer-events-none" />
          
          <div className="relative z-10 flex flex-wrap justify-center gap-6 sm:gap-10">
            {integrations.map((integration, idx) => {
              const isHighlighted = activeCategory === "all" || activeCategory === integration.cat;
              
              return (
                <motion.div
                  key={integration.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.03, duration: 0.5 }}
                  animate={{
                    opacity: isHighlighted ? 1 : 0.2,
                    scale: isHighlighted ? 1 : 0.9,
                    filter: isHighlighted ? "grayscale(0%) blur(0px)" : "grayscale(100%) blur(2px)",
                  }}
                  className={cn(
                    "relative flex h-20 w-36 sm:h-24 sm:w-44 items-center justify-center rounded-2xl bg-background border transition-colors duration-500",
                    isHighlighted ? "border-sky-brand/20 shadow-brand/10 hover:border-sky-brand hover:shadow-brand" : "border-border shadow-none"
                  )}
                >
                  <img
                    src={`https://logo.clearbit.com/${integration.domain}`}
                    alt={integration.name}
                    className="max-h-10 max-w-[100px] sm:max-h-12 sm:max-w-[120px] object-contain"
                    onError={(e) => {
                      // Fallback if clearbit fails
                      (e.target as HTMLImageElement).style.display = 'none';
                      (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  {/* Fallback Text */}
                  <span className="hidden font-display font-bold text-lg text-foreground">
                    {integration.name}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="mt-20 text-center flex flex-col items-center">
        <p className="text-muted-foreground text-sm font-medium tracking-wide">
          Other third-party integrations and many more solutions...
        </p>
        <p className="mt-6 text-foreground/80 font-medium sm:text-lg max-w-2xl text-balance">
          From eCommerce and payments to logistics, messaging, accounting, and BI. 
          We integrate everything into one unified system.
        </p>
        <Button className="mt-8 h-12 px-8 gradient-brand text-white shadow-brand hover:scale-105 transition-transform rounded-full font-bold tracking-wide">
          WE CAN HELP!
        </Button>
      </div>
    </Section>
  );
}
