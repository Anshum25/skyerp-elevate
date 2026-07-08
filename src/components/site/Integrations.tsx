import { motion } from "framer-motion";
import { Section, SectionHeader } from "./primitives";

const integrations = [
  "WhatsApp", "Microsoft 365", "Google Workspace", "Power BI",
  "Razorpay", "Stripe", "Shopify", "WooCommerce",
  "Slack", "Microsoft Teams", "Zoom", "Gmail",
  "Outlook", "APIs", "Webhooks", "Salesforce",
];

export function Integrations() {
  return (
    <Section id="integrations" className="bg-secondary/40">
      <SectionHeader
        eyebrow="Integrations"
        title={<>Fits your <span className="text-gradient-brand">tech stack.</span></>}
        description="Prebuilt connectors for the tools your teams already use — plus open APIs and webhooks for anything else."
      />
      <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
        {integrations.map((name, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: (i % 8) * 0.04, duration: 0.35 }}
            whileHover={{ y: -3, scale: 1.03 }}
            className="group relative aspect-square rounded-2xl border border-border bg-card p-3 transition hover:border-sky-brand/40 hover:shadow-elevated"
          >
            <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-sky-brand/20 to-ember/20 text-sm font-bold text-foreground">
                {name.slice(0, 2)}
              </div>
              <div className="text-xs font-medium text-foreground">{name}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
