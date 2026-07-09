import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState, Suspense, Component, ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, Float, Center } from "@react-three/drei";
import * as THREE from "three";
import {
  ArrowRight,
  PlayCircle,
  Sparkles,
  TrendingUp,
  Users,
  ShoppingCart,
  Boxes,
  BarChart3,
  Bot,
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

import { Stage, OrbitControls } from "@react-three/drei";

function RotatingLogoModel() {
  const { scene } = useGLTF("/logo.glb");
  const groupRef = useRef<THREE.Group>(null);

  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  return (
    <group ref={groupRef}>
      <Stage environment="city" intensity={1} adjustCamera={1.2}>
        <primitive object={clonedScene} />
      </Stage>
      {/* 
        OrbitControls autoRotate naturally pauses when the user grabs it, 
        and seamlessly resumes rotating from the exact angle they leave it at.
      */}
      <OrbitControls 
        autoRotate 
        autoRotateSpeed={1.5} 
        enableZoom={false} 
        enablePan={false} 
      />
    </group>
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

function RotatingLogo() {
  // Defer canvas creation so the ShaderGradientCanvas has time to
  // initialise its WebGL context first, avoiding context-limit races
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      className="relative flex aspect-square w-full max-w-[600px] min-h-[400px] items-center justify-center mx-auto mt-10 lg:mt-0"
    >
      <div className="absolute inset-0 z-10 rounded-3xl overflow-hidden">
        {ready && (
          <Canvas
            camera={{ position: [0, 0, 6], fov: 45 }}
            gl={{
              powerPreference: "default",
              alpha: true,
              antialias: true,
              preserveDrawingBuffer: true
            }}
          >
            <ModelErrorBoundary>
              <Suspense fallback={<ModelLoadingFallback />}>
                <RotatingLogoModel />
              </Suspense>
            </ModelErrorBoundary>
          </Canvas>
        )}
      </div>

      {/* Glow halo behind the 3D model */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-full bg-sky-brand/20 blur-[100px] pointer-events-none -z-10" />
    </motion.div>
  );
}