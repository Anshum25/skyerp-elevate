import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { Eyebrow } from "@/components/site/primitives";
import { motion } from "framer-motion";
import { Globe, Users, Target, Shield, Zap, Heart, Download, FileText, Presentation } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About SkyERP — Our Mission & Team" },
      {
        name: "description",
        content:
          "Learn about the team behind SkyERP, our mission to democratize enterprise software, and our global presence.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const stats = [
    { label: 'Founded', value: '2015' },
    { label: 'Global Employees', value: '450+' },
    { label: 'Active Deployments', value: '4,200+' },
    { label: 'Countries Served', value: '35' },
  ];

  const values = [
    { icon: Target, name: 'Mission-Driven', desc: 'We build software that solves real-world operational challenges.' },
    { icon: Heart, name: 'Customer Obsessed', desc: 'Your success is our only metric for performance.' },
    { icon: Shield, name: 'Uncompromising Quality', desc: 'We never cut corners on security, architecture, or design.' },
    { icon: Zap, name: 'Bias for Action', desc: 'We move fast, iterate quickly, and deliver continuous value.' },
  ];

  const team = [
    { name: 'Sarah Jenkins', role: 'Chief Executive Officer', initial: 'SJ' },
    { name: 'David Chen', role: 'Chief Technology Officer', initial: 'DC' },
    { name: 'Elena Rodriguez', role: 'VP of Engineering', initial: 'ER' },
    { name: 'Marcus Johnson', role: 'VP of Customer Success', initial: 'MJ' },
    { name: 'Alex Patel', role: 'Head of AI Research', initial: 'AP' },
    { name: 'Samantha Lee', role: 'Head of Global Sales', initial: 'SL' },
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
              <Eyebrow className="mx-auto">Our Company</Eyebrow>
              <h1 className="mx-auto mt-6 max-w-4xl font-display text-5xl font-bold tracking-tight text-foreground sm:text-7xl">
                Building the future of <span className="text-gradient-brand">enterprise tech</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-muted-foreground">
                We are a team of engineers, industry experts, and AI researchers on a mission to make world-class ERP software accessible to every ambitious business.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-blue-600">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl font-bold tracking-tight text-white">{stat.value}</div>
                  <div className="mt-2 text-sm font-medium text-blue-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 sm:py-32 bg-zinc-50 dark:bg-zinc-900/20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-blue-600">Our Values</h2>
              <p className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                The principles that guide us
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
                {values.map((value) => (
                  <div key={value.name} className="flex flex-col">
                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                      <value.icon className="h-5 w-5 flex-none text-blue-600" aria-hidden="true" />
                      {value.name}
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                      <p className="flex-auto">{value.desc}</p>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center mb-16">
              <h2 className="text-base font-semibold leading-7 text-blue-600">Leadership</h2>
              <p className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Meet the team
              </p>
            </div>
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((person) => (
                <div key={person.name} className="flex flex-col items-center text-center">
                  <div className="flex h-32 w-32 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6">
                    {person.initial}
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{person.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{person.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Corporate Resources / Downloads */}
        <section className="py-24 border-t border-white/5 bg-zinc-50 dark:bg-zinc-900/20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center mb-16">
              <h2 className="text-base font-semibold leading-7 text-blue-600">Downloads</h2>
              <p className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Corporate Resources
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-4xl mx-auto">
              
              {/* Brochure */}
              <div className="bg-card p-8 rounded-3xl border border-border shadow-elevated flex items-center justify-between group hover:border-blue-500/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-600">
                    <FileText className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Company Brochure</h3>
                    <p className="text-sm text-muted-foreground mt-1">PDF &bull; 4.2 MB &bull; 2026 Edition</p>
                  </div>
                </div>
                <div className="h-10 w-10 rounded-full border border-border flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all">
                  <Download className="h-5 w-5" />
                </div>
              </div>

              {/* Pitch Deck */}
              <div className="bg-card p-8 rounded-3xl border border-border shadow-elevated flex items-center justify-between group hover:border-blue-500/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-600">
                    <Presentation className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Investor Pitch Deck</h3>
                    <p className="text-sm text-muted-foreground mt-1">PDF &bull; 8.1 MB &bull; Q3 Update</p>
                  </div>
                </div>
                <div className="h-10 w-10 rounded-full border border-border flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all">
                  <Download className="h-5 w-5" />
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
