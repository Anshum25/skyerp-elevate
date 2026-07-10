import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { Eyebrow } from "@/components/site/primitives";
import { motion } from "framer-motion";
import { ShieldCheck, Clock, Activity, Target, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/delivery-excellence")({
  head: () => ({
    meta: [
      { title: "Delivery Excellence — SkyERP" },
      {
        name: "description",
        content:
          "Discover SkyERP's commitment to flawless implementation, quality assurance, and ongoing enterprise support.",
      },
    ],
  }),
  component: DeliveryExcellencePage,
});

function DeliveryExcellencePage() {
  const methodologySteps = [
    { name: '1. Discovery & Blueprinting', desc: 'We map your existing processes to SkyERP architecture, identifying optimization opportunities and avoiding customization traps.' },
    { name: '2. Agile Configuration', desc: 'Our certified engineers configure your environment in two-week sprints, giving you continuous visibility into the build.' },
    { name: '3. Data Migration & QA', desc: 'Secure, automated data transfer from legacy systems followed by rigorous end-to-end automated testing.' },
    { name: '4. Training & Go-Live', desc: 'Comprehensive change management, user training, and a white-glove go-live experience.' },
  ];

  const slas = [
    { icon: Activity, title: '99.99% Guaranteed Uptime', desc: 'Financially backed SLAs for your core ERP services.' },
    { icon: Clock, title: '15-Minute Response Time', desc: 'For critical P1 issues, our global support team responds immediately.' },
    { icon: ShieldCheck, title: '24/7 Global Support', desc: 'Follow-the-sun support model with Tier 3 engineers available around the clock.' },
  ];

  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <Navbar />
      <main className="min-h-screen bg-background pt-24">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24 sm:py-32">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.15),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.15),rgba(0,0,0,0))]" />
          
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Eyebrow className="mx-auto">Our Methodology</Eyebrow>
              <h1 className="mx-auto mt-6 max-w-4xl font-display text-5xl font-bold tracking-tight text-foreground sm:text-7xl">
                The standard for <span className="text-gradient-brand">flawless delivery</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-muted-foreground">
                We believe software is only as good as its implementation. Learn how our certified experts guarantee project success.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Methodology */}
        <section className="py-24 bg-zinc-50 dark:bg-zinc-900/20 border-t border-white/5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center mb-16">
              <h2 className="text-base font-semibold leading-7 text-blue-600">Implementation</h2>
              <p className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Predictable, accelerated time-to-value
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {methodologySteps.map((step, i) => (
                <div key={i} className="bg-card p-8 rounded-3xl border border-border shadow-elevated relative overflow-hidden group hover:border-blue-500/50 transition-colors">
                  <div className="text-blue-600 font-bold text-lg mb-4">{step.name}</div>
                  <p className="text-muted-foreground">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SLAs */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {slas.map((sla, i) => (
                <div key={i} className="flex flex-col items-start">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 mb-6">
                    <sla.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{sla.title}</h3>
                  <p className="text-muted-foreground">{sla.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-16 bg-blue-600">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-xl font-semibold text-white mb-8">Enterprise-Grade Compliance & Certifications</h2>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center">
              {['ISO 27001', 'SOC 2 Type II', 'GDPR Compliant', 'HIPAA Ready'].map((cert) => (
                <div key={cert} className="flex items-center gap-2 text-white/90 font-bold text-xl">
                  <CheckCircle2 className="h-6 w-6 text-blue-300" />
                  {cert}
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
