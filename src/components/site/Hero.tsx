import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useRef, useState, Suspense, Component, ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, Float, Center, Html, Stage, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import {
  ArrowRight,
  PlayCircle,
  Sparkles,
  TrendingUp,
  Box,
  Filter,
  Building2,
  Wrench,
  Calculator,
  Boxes,
  Tag,
  FileCheck,
  Factory,
  Presentation,
  ShieldCheck,
  ShoppingBag,
  Package,
  RefreshCw,
  Settings,
  UserRound,
  Users,
  Globe,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { Methodology } from "./Methodology";

const trustLogos = ["ACME Corp", "Northwind", "Globex", "Umbrella", "Initech", "Hooli", "Wayne", "Stark"];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const glowX = useSpring(mx, { stiffness: 60, damping: 20 });
  const glowY = useSpring(my, { stiffness: 60, damping: 20 });

  const { isDark } = useTheme();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mx.set(((e.clientX - r.left) / r.width) * 100);
      my.set(((e.clientY - r.top) / r.height) * 100);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  const bgX = useTransform(glowX, (v) => `${v}%`);
  const bgY = useTransform(glowY, (v) => `${v}%`);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32"
    >
      {/* Shader gradient background */}
      <div className="absolute inset-0 -z-10">
        <ShaderGradientCanvas style={{ width: "100%", height: "100%" }} pointerEvents="none">
          {isDark ? (
            <ShaderGradient
              animate="on"
              axesHelper="off"
              brightness={1.2}
              cAzimuthAngle={270}
              cDistance={0.5}
              cPolarAngle={180}
              cameraZoom={15.1}
              color1="#73bfc4"
              color2="#ff810a"
              color3="#0000f7"
              destination="onCanvas"
              embedMode="off"
              envPreset="city"
              format="gif"
              fov={45}
              frameRate={10}
              gizmoHelper="hide"
              grain="on"
              lightType="env"
              pixelDensity={1}
              positionX={-0.1}
              positionY={0}
              positionZ={0}
              range="disabled"
              rangeEnd={40}
              rangeStart={0}
              reflection={0.3}
              rotationX={0}
              rotationY={130}
              rotationZ={70}
              shader="defaults"
              type="sphere"
              uAmplitude={3.2}
              uDensity={0.8}
              uFrequency={5.5}
              uSpeed={0.3}
              uStrength={0.3}
              uTime={0}
              wireframe={false}
            />
          ) : (
            <ShaderGradient
              animate="on"
              axesHelper="off"
              brightness={1.2}
              cAzimuthAngle={270}
              cDistance={0.5}
              cPolarAngle={180}
              cameraZoom={15.6}
              color1="#ffda5e"
              color2="#b3b8ff"
              color3="#001df7"
              destination="onCanvas"
              embedMode="off"
              envPreset="city"
              format="gif"
              fov={45}
              frameRate={10}
              gizmoHelper="hide"
              grain="on"
              lightType="3d"
              pixelDensity={1}
              positionX={-0.1}
              positionY={0}
              positionZ={0}
              range="disabled"
              rangeEnd={40}
              rangeStart={0}
              reflection={0.3}
              rotationX={0}
              rotationY={130}
              rotationZ={70}
              shader="defaults"
              type="sphere"
              uAmplitude={3.2}
              uDensity={0.8}
              uFrequency={5.5}
              uSpeed={0.3}
              uStrength={0.3}
              uTime={0}
              wireframe={false}
            />
          )}
        </ShaderGradientCanvas>
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/10 to-background pointer-events-none" />
      </div>

      <div 
        className="relative grid gap-4 px-4 sm:px-6 lg:grid-cols-2 lg:gap-4 lg:items-center w-full"
        style={{ maxWidth: '1650px', margin: '0 auto' }}
      >

        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-foreground/10 px-3 py-1.5 text-xs font-medium text-foreground/80 backdrop-blur"
          >
            <span className="grid h-4 w-4 place-items-center rounded-full gradient-ember">
              <Sparkles className="h-2.5 w-2.5 text-foreground" />
            </span>
            SkyAI Copilot 3.0 is live — automate 60% of back-office work
            <ArrowRight className="h-3 w-3 opacity-70" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 font-display text-5xl font-bold leading-[1.03] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
          >
            The AI-native ERP <br />
            for{" "}
            <span className="text-gradient-brand animate-gradient-shift">
              modern enterprises
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/80"
          >
            SkyERP unifies finance, supply chain, manufacturing, HR and CRM
            on a single cloud platform — powered by AI copilots that turn
            operations into outcomes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button
              size="lg"
              className="gradient-ember shadow-ember h-12 rounded-xl px-6 text-foreground hover:opacity-95"
            >
              Schedule a live demo
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-xl border-foreground/20 bg-foreground/10 px-6 text-foreground backdrop-blur hover:bg-foreground/10"
            >
              <PlayCircle className="mr-1 h-5 w-5" /> Watch 2-min tour
            </Button>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground/80"
          >
            {["SOC 2 Type II", "GDPR ready", "99.99% uptime SLA", "Deploy in 4 weeks"].map((t) => (
              <li key={t} className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-mint" />
                {t}
              </li>
            ))}
          </motion.ul>

          {/* Trust marquee */}
          <div className="mt-12">
            <div className="text-xs font-medium uppercase tracking-wider text-foreground/80">
              Trusted by 4,200+ global teams
            </div>
            <div className="mask-fade-x mt-4 overflow-hidden">
              <div className="flex w-max animate-marquee gap-10">
                {[...trustLogos, ...trustLogos].map((l, i) => (
                  <div
                    key={i}
                    className="font-display text-lg font-semibold tracking-tight text-foreground/80"
                  >
                    {l}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <RotatingLogo />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-foreground/80"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="flex h-9 w-6 items-start justify-center rounded-full border border-foreground/20 pt-1.5"
        >
          <span className="h-1.5 w-1 rounded-full bg-foreground/10" />
        </motion.div>
      </motion.div>
      <div className="relative mt-24 w-full">
        <Methodology />
      </div>
    </section>
  );
}

/* -------------------------------------------------------
   3D model loading, with error handling
------------------------------------------------------- */

// Preload as early as possible so failures surface in the console right away
useGLTF.preload("/logo.glb");

function RotatingLogoModel({ 
  activeAppIndex, 
  onAppHover,
  onAppClick 
}: { 
  activeAppIndex: number; 
  onAppHover: (index: number) => void;
  onAppClick: (index: number) => void;
}) {
  const { scene } = useGLTF("/logo.glb");
  const controlsRef = useRef<any>(null);
  const isDragging = useRef(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shouldReset = useRef(false);
  const orbitGroupRef = useRef<THREE.Group>(null);

  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  // Calculate Fibonacci sphere positions for the 10 apps
  const sphericalPositions = useMemo(() => {
    const numApps = floatingApps.length;
    // The Golden Angle mathematically MUST use sqrt(5). Changing this breaks the sphere shape!
    const phi = Math.PI * (3 - Math.sqrt(5)); 
    return floatingApps.map((_, i) => {
      const y = 1 - (i / (numApps - 1)) * 2; // y goes from 1 to -1
      const radius = Math.sqrt(1 - y * y); // radius at y
      const theta = phi * i; // golden angle increment
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      // Increased radius to 4.8 so the apps form a large globe completely outside the logo
      return [x * 9.8, y * 9.8, z * 9.8] as [number, number, number];
    });
  }, []);

  // Independent rotation for the holo-sphere (it orbits the logo)
  useFrame((_, delta) => {
    if (orbitGroupRef.current) {
      orbitGroupRef.current.rotation.y -= delta * 0.3; // Rotate the sphere slowly
      orbitGroupRef.current.rotation.x += delta * 0.1; // Add a slight tilt orbit
    }
  });

  // Default polar angle (horizontal view = PI/2)
  const defaultPolar = Math.PI / 2;

  // Smoothly lerp the vertical angle back to default after user stops dragging
  useFrame(() => {
    if (shouldReset.current && controlsRef.current) {
      const controls = controlsRef.current;
      const currentPolar = controls.getPolarAngle();
      const diff = Math.abs(currentPolar - defaultPolar);
      
      if (diff > 0.01) {
        // Lerp toward default
        const newPolar = currentPolar + (defaultPolar - currentPolar) * 0.05;
        controls.minPolarAngle = newPolar;
        controls.maxPolarAngle = newPolar;
      } else {
        // Close enough — snap and unlock
        shouldReset.current = false;
        controls.minPolarAngle = Math.PI / 6;
        controls.maxPolarAngle = Math.PI - Math.PI / 6;
      }
    }
  });

  const handleStart = () => {
    isDragging.current = true;
    shouldReset.current = false;
    if (resetTimer.current) clearTimeout(resetTimer.current);
    // Unlock polar range so user can freely drag
    if (controlsRef.current) {
      controlsRef.current.minPolarAngle = Math.PI / 6;
      controlsRef.current.maxPolarAngle = Math.PI - Math.PI / 6;
    }
  };

  const handleEnd = () => {
    isDragging.current = false;
    // Start resetting after a short delay
    resetTimer.current = setTimeout(() => {
      shouldReset.current = true;
    }, 300);
  };

  return (
    <>
      <Stage environment="city" intensity={1} adjustCamera={1.2}>
        <primitive object={clonedScene} />
      </Stage>
      
      {/* 3D Holo-Sphere App Orbit */}
      <group ref={orbitGroupRef}>
        {floatingApps.map((app, i) => {
          const isActive = i === activeAppIndex;
          const [x, y, z] = sphericalPositions[i];
          return (
            <Html
              key={app.label}
              position={[x, y, z]}
              center
              zIndexRange={[100, 0]}
              className="pointer-events-auto"
            >
              <div 
                className="relative flex items-center justify-center group cursor-pointer"
                onClick={() => onAppClick(i)}
                onPointerEnter={() => {
                  document.body.style.cursor = 'pointer';
                  onAppHover(i); // Pause auto-play and highlight this one
                }}
                onPointerLeave={() => {
                  document.body.style.cursor = 'auto';
                }}
              >
                {/* Large bare icon with drop shadow */}
                <app.icon 
                  className={cn(
                    "transition-all duration-500",
                    isActive ? "scale-150 drop-shadow-[0_0_20px_rgba(255,255,255,0.7)]" : "scale-100 opacity-80 drop-shadow-md hover:opacity-100 hover:scale-110"
                  )} 
                  style={{ color: app.color, width: '48px', height: '48px' }} 
                />
                
                {/* Floating Tooltip strictly beside the icon */}
                <div 
                  className={cn(
                    "absolute left-[130%] top-1/2 -translate-y-1/2 w-48 p-3 rounded-xl border border-foreground/10 bg-background/85 backdrop-blur-xl shadow-2xl transition-all duration-300 pointer-events-none z-50",
                    isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                  )}
                >
                  <h4 className="text-[13px] font-bold text-foreground mb-1 border-b border-foreground/10 pb-1">{app.label}</h4>
                  <p className="text-[10px] leading-relaxed text-foreground/70">{app.description}</p>
                </div>
              </div>
            </Html>
          );
        })}
      </group>

      <OrbitControls 
        ref={controlsRef}
        autoRotate 
        autoRotateSpeed={1.0} 
        enableZoom={false} 
        enablePan={false}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI - Math.PI / 6}
        onStart={handleStart}
        onEnd={handleEnd}
      />
    </>
  );
}

// Simple visible placeholder while the model streams in,
// instead of fallback={null} which hides load failures too
function ModelLoadingFallback() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.6;
  });
  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[0.9, 0.3, 100, 16]} />
      <meshStandardMaterial color="#375DFB" wireframe opacity={0.5} transparent />
    </mesh>
  );
}

// Catches any error thrown while loading/parsing the glb
// (wrong path, corrupt file, unsupported format, etc.)
class ModelErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    // Check your browser console for this — it'll tell you exactly
    // why the model failed (404, parse error, etc.)
    console.error("Failed to load /logo.glb:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <mesh>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="#ef4444" wireframe />
        </mesh>
      );
    }
    return this.props.children;
  }
}

// Floating app icons that orbit the 3D logo (Mapped to Frappe ecosystem)
const floatingApps = [
  { icon: Box, label: "Framework", color: "#64748b", description: "The underlying rapid application development architecture powering SkyERP." },
  { icon: Filter, label: "Frappe CRM", color: "#d946ef", description: "Manage leads, opportunities, pipelines, and customer relationships in one place." },
  { icon: Building2, label: "Organization", color: "#3b82f6", description: "Manage company structure, multiple branches, and complex multi-company setups." },
  { icon: Wrench, label: "Tools", color: "#3b82f6", description: "Core system utilities, data import/export, and background job management." },
  { icon: Calculator, label: "Accounting", color: "#0ea5e9", description: "General ledger, automated billing, invoicing, and real-time financial reporting." },
  { icon: Boxes, label: "Assets", color: "#3b82f6", description: "Track fixed assets, calculate automated depreciation, and manage value lifecycles." },
  { icon: Tag, label: "Buying", color: "#3b82f6", description: "Automate supplier management, purchase orders, and procure-to-pay processes." },
  { icon: FileCheck, label: "India Compliance", color: "#0ea5e9", description: "Seamless GST integration, automated e-way bills, and strict local tax compliance." },
  { icon: Factory, label: "Manufacturing", color: "#3b82f6", description: "Streamline production planning, bill of materials (BOM), and shop floor routing." },
  { icon: Presentation, label: "Projects", color: "#3b82f6", description: "Track project tasks, employee timesheets, and overall project profitability." },
  { icon: ShieldCheck, label: "Quality", color: "#3b82f6", description: "Enforce strict quality control standards, inspections, and compliance tracking." },
  { icon: ShoppingBag, label: "Selling", color: "#3b82f6", description: "Omnichannel sales management from initial quotation to final order fulfillment." },
  { icon: Package, label: "Stock", color: "#3b82f6", description: "Optimize inventory levels with AI forecasting and multi-warehouse management." },
  { icon: RefreshCw, label: "Subcontracting", color: "#3b82f6", description: "Easily manage outsourced manufacturing processes and vendor materials." },
  { icon: Settings, label: "ERPNext Settings", color: "#3b82f6", description: "Global core system configurations, permissions, and domain preferences." },
  { icon: UserRound, label: "Frappe HR", color: "#10b981", description: "Manage the complete employee lifecycle, recruitment, and performance reviews." },
  { icon: Users, label: "HRMS", color: "#10b981", description: "Automated payroll processing, shift attendance, and complex leave management." },
  { icon: Globe, label: "Website", color: "#3b82f6", description: "Integrated web CMS, blogging, and seamless e-commerce portal generation." },
];

function RotatingLogo() {
  const [ready, setReady] = useState(false);
  const [activeAppIndex, setActiveAppIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Initialise WebGL
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Auto-play interval sequence
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveAppIndex((prev) => (prev + 1) % floatingApps.length);
    }, 2500); // 2.5 seconds per app gives enough time to read
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleAppHover = (index: number) => {
    setIsAutoPlaying(false);
    setActiveAppIndex(index);
  };

  const handleAppClick = (index: number) => {
    setIsAutoPlaying(false);
    setActiveAppIndex(index);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      className="relative flex aspect-square w-full max-w-[600px] min-h-[400px] items-center justify-center mx-auto mt-10 lg:mt-0"
    >
      {/* Orbit rings to suggest a sphere (visual only) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75%] h-[75%] rounded-full border border-foreground/[0.04] pointer-events-none transform -rotate-45 scale-y-50 opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] h-[95%] rounded-full border border-foreground/[0.03] pointer-events-none transform rotate-45 scale-y-50 opacity-50" />

      {/* 3D Canvas in the center */}
      <div className="absolute inset-0 z-10 rounded-full overflow-hidden pointer-events-none">
        <div className="absolute inset-0 pointer-events-auto">
          {ready && (
            <Canvas
              camera={{ position: [0, 0, 6.5], fov: 45 }}
              gl={{
                powerPreference: "default",
                alpha: true,
                antialias: true,
                preserveDrawingBuffer: true
              }}
            >
              <ModelErrorBoundary>
                <Suspense fallback={<ModelLoadingFallback />}>
                  <RotatingLogoModel 
                    activeAppIndex={activeAppIndex} 
                    onAppHover={handleAppHover}
                    onAppClick={handleAppClick} 
                  />
                </Suspense>
              </ModelErrorBoundary>
            </Canvas>
          )}
        </div>
      </div>

      {/* Glow halo behind the 3D model */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full bg-sky-brand/15 blur-[80px] pointer-events-none -z-10" />

      {/* Subtle particle dots */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * 2 * Math.PI;
        const r = 30 + (i % 3) * 15;
        return (
          <div
            key={`dot-${i}`}
            className="absolute w-1 h-1 rounded-full bg-foreground/10 pointer-events-none"
            style={{
              left: `${50 + r * Math.cos(angle)}%`,
              top: `${50 + r * Math.sin(angle)}%`,
              animation: `float-app ${4 + (i % 4)}s ease-in-out ${i * 0.3}s infinite`,
            }}
          />
        );
      })}
    </motion.div>
  );
}