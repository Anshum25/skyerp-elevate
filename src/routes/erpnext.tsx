import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { Eyebrow } from "@/components/site/primitives";
import { motion } from "framer-motion";
import { CheckCircle2, Server, Shield, Zap } from "lucide-react";

export const Route = createFileRoute("/erpnext")({
  head: () => ({
    meta: [
      { title: "ERPNext Implementation & Customization — SkyERP" },
      {
        name: "description",
        content:
          "SkyERP's dedicated ERPNext services. Transform your business with tailored open-source ERP solutions built for agility, scalability, and performance.",
      },
    ],
  }),
  component: ERPNextPage,
});

const features = [
  {
    name: 'Rapid Deployment',
    description: 'Get your core modules live in weeks, not months, using our proprietary blueprints.',
    icon: Zap,
  },
  {
    name: 'Enterprise Security',
    description: 'Bank-grade encryption, role-based access control, and automated compliance.',
    icon: Shield,
  },
  {
    name: 'Scalable Architecture',
    description: 'Built to grow with you. Handle 10x transaction volumes without performance degradation.',
    icon: Server,
  },
];

function ERPNextPage() {
  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <Navbar />
      <main className="min-h-screen bg-background pt-24">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24 sm:py-32">
          {/* Background Glow */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.15),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.15),rgba(0,0,0,0))]" />
          
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Eyebrow className="mx-auto">Official Partner Services</Eyebrow>
              <h1 className="mx-auto mt-6 max-w-4xl font-display text-5xl font-bold tracking-tight text-foreground sm:text-7xl">
                Unleash the full power of <span className="text-gradient-brand">ERPNext</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-muted-foreground">
                We provide end-to-end implementation, custom module development, and managed cloud support for the world's most agile open-source ERP.
              </p>
              
              <div className="mt-10 flex items-center justify-center gap-4">
                <a
                  href="/contact"
                  className="rounded-full bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
                >
                  Consult with an Expert
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="py-24 sm:py-32 border-t border-white/5 bg-zinc-50 dark:bg-zinc-900/20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-blue-600">Built for Scale</h2>
              <p className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Everything you need to run your business
              </p>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                ERPNext is 100% open-source and customizable. We tailor it specifically to your industry workflows so you never have to change how you work to fit the software.
              </p>
            </div>
            
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                {features.map((feature) => (
                  <div key={feature.name} className="flex flex-col bg-card rounded-3xl p-8 border border-border shadow-elevated">
                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/10">
                        <feature.icon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                      </div>
                      {feature.name}
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                      <p className="flex-auto">{feature.description}</p>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
