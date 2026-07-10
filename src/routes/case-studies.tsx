import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { Eyebrow } from "@/components/site/primitives";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, TrendingUp, Zap } from "lucide-react";

export const Route = createFileRoute("/case-studies")({
  head: () => ({
    meta: [
      { title: "Case Studies & Success Stories — SkyERP" },
      {
        name: "description",
        content:
          "See how SkyERP has transformed finance, operations, and manufacturing for modern enterprises worldwide.",
      },
    ],
  }),
  component: CaseStudiesPage,
});

function CaseStudiesPage() {
  const caseStudies = [
    {
      company: 'Global Manufacturing Co.',
      industry: 'Manufacturing',
      metric: '32%',
      metricLabel: 'Reduction in operational costs',
      desc: 'Replaced 5 legacy systems with a single instance of SkyERP. Automated shop floor data collection and unified their global supply chain.',
      icon: TrendingUp,
    },
    {
      company: 'FinTech Innovators Inc.',
      industry: 'Financial Services',
      metric: '12x',
      metricLabel: 'Faster financial close',
      desc: 'Automated multi-currency accounting and consolidated financial reporting across 12 international subsidiaries seamlessly.',
      icon: Zap,
    },
    {
      company: 'NextGen Retail Partners',
      industry: 'Retail & E-commerce',
      metric: '99.9%',
      metricLabel: 'Inventory accuracy',
      desc: 'Implemented real-time omnichannel inventory syncing, eliminating stockouts and improving customer satisfaction scores.',
      icon: BarChart3,
    },
    {
      company: 'Apex Healthcare',
      industry: 'Healthcare',
      metric: '400+',
      metricLabel: 'Hours saved monthly',
      desc: 'Digitized patient billing and procurement workflows with HIPAA-compliant infrastructure and AI-driven data extraction.',
      icon: TrendingUp,
    },
    {
      company: 'BuildRight Construction',
      industry: 'Construction',
      metric: '15%',
      metricLabel: 'Increase in project margins',
      desc: 'Gained real-time visibility into project costs, subcontractor billing, and equipment utilization from the job site.',
      icon: BarChart3,
    },
    {
      company: 'EduTech Global',
      industry: 'Education',
      metric: '2M+',
      metricLabel: 'Students managed',
      desc: 'Scaled their campus management system to support rapid international expansion without adding administrative headcount.',
      icon: Zap,
    },
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
              <Eyebrow className="mx-auto">Customer Success</Eyebrow>
              <h1 className="mx-auto mt-6 max-w-4xl font-display text-5xl font-bold tracking-tight text-foreground sm:text-7xl">
                Real results from <span className="text-gradient-brand">real companies</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-muted-foreground">
                Discover how organizations across manufacturing, retail, and technology use SkyERP to automate workflows and accelerate growth.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="py-24 border-t border-white/5 bg-zinc-50 dark:bg-zinc-900/20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.map((study, i) => (
                <div key={i} className="bg-card rounded-3xl p-8 border border-border shadow-elevated flex flex-col justify-between group hover:border-blue-500/50 transition-colors">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-600/10 px-3 py-1 rounded-full">{study.industry}</span>
                      <study.icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">{study.company}</h3>
                    
                    <div className="mt-6 mb-6 pb-6 border-b border-border">
                      <div className="text-4xl font-black text-foreground">{study.metric}</div>
                      <div className="text-sm font-medium text-muted-foreground mt-1">{study.metricLabel}</div>
                    </div>
                    
                    <p className="text-muted-foreground line-clamp-4">
                      {study.desc}
                    </p>
                  </div>
                  <div className="mt-8 text-blue-600 font-semibold group-hover:text-blue-500 flex items-center cursor-pointer">
                    Read full story <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Simple Trusted By */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-base font-semibold leading-7 text-muted-foreground mb-12">Trusted by industry leaders globally</h2>
            <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              {/* Placeholders for logos */}
              {['Acme Corp', 'Globex', 'Soylent Corp', 'Initech', 'Umbrella Corp', 'Stark Ind'].map((logo) => (
                <div key={logo} className="text-2xl font-display font-bold text-foreground">
                  {logo}
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
