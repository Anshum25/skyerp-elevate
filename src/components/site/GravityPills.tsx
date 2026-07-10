import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ComponentType,
} from "react";
import Matter from "matter-js";
import { cn } from "@/lib/utils";

export type StackPill = {
  name: string;
  icon: ComponentType<{ className?: string }>;
  accent: "sky" | "ember" | "mint";
};

const accentIcon: Record<StackPill["accent"], string> = {
  sky: "bg-gradient-to-br from-sky-brand/25 to-sky-brand-2/20 text-sky-brand",
  ember: "bg-gradient-to-br from-ember/25 to-ember-2/20 text-ember",
  mint: "bg-gradient-to-br from-mint/25 to-mint/20 text-mint",
};

function PillBadge({ mod }: { mod: StackPill }) {
  const Icon = mod.icon;
  return (
    <div className="inline-flex select-none items-center gap-3 whitespace-nowrap rounded-full border border-border bg-card px-4 py-2.5 shadow-sm">
      <div
        className={cn(
          "grid h-8 w-8 shrink-0 place-items-center rounded-lg",
          accentIcon[mod.accent],
        )}
      >
        <Icon className="h-4 w-4" />
      </div>
      <span className="text-[15px] font-medium text-foreground">{mod.name}</span>
    </div>
  );
}

function StaticPills({ modules }: { modules: StackPill[] }) {
  return (
    <div className="mt-12 flex flex-wrap justify-center gap-3">
      {modules.map((mod) => (
        <PillBadge key={mod.name} mod={mod} />
      ))}
    </div>
  );
}

function useMotionPreference() {
  const [staticFallback, setStaticFallback] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 767px)");
    const update = () =>
      setStaticFallback(reduced.matches || mobile.matches);
    update();
    reduced.addEventListener("change", update);
    mobile.addEventListener("change", update);
    return () => {
      reduced.removeEventListener("change", update);
      mobile.removeEventListener("change", update);
    };
  }, []);

  return staticFallback;
}

export function GravityPills({ modules }: { modules: StackPill[] }) {
  const staticFallback = useMotionPreference();
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const mouseConstraintRef = useRef<Matter.MouseConstraint | null>(null);
  const rafRef = useRef(0);
  const startedRef = useRef(false);

  useLayoutEffect(() => {
    if (staticFallback) return;

    const scene = sceneRef.current;
    const container = containerRef.current;
    const measure = measureRef.current;
    if (!scene || !container || !measure) return;

    const pillEls = Array.from(
      measure.querySelectorAll<HTMLDivElement>("[data-pill-measure]"),
    );
    if (!pillEls.length) return;

    const sizes = pillEls.map((el) => {
      const { width, height } = el.getBoundingClientRect();
      return { width, height };
    });

    scene.replaceChildren();
    const bodies: Array<{
      body: Matter.Body;
      el: HTMLDivElement;
      w: number;
      h: number;
    }> = [];

    modules.forEach((mod, i) => {
      const { width: w, height: h } = sizes[i];
      const el = document.createElement("div");
      el.className =
        "absolute left-0 top-0 cursor-grab touch-none will-change-transform active:cursor-grabbing";
      el.style.width = `${w}px`;
      el.style.height = `${h}px`;
      el.style.pointerEvents = "auto";
      el.innerHTML = pillEls[i]?.innerHTML ?? "";
      scene.appendChild(el);
      bodies.push({ body: null!, el, w, h });
    });

    const initPhysics = () => {
      const { width, height } = scene.getBoundingClientRect();
      if (width < 100 || height < 100) return;

      const engine = Matter.Engine.create({ gravity: { x: 0, y: 1.15 } });
      engineRef.current = engine;

      const wall = 120;
      const groundY = height - 8;
      const ground = Matter.Bodies.rectangle(
        width / 2,
        groundY + wall / 2,
        width + wall * 2,
        wall,
        { isStatic: true, friction: 0.9 },
      );
      const left = Matter.Bodies.rectangle(
        -wall / 2,
        height / 2,
        wall,
        height * 3,
        { isStatic: true },
      );
      const right = Matter.Bodies.rectangle(
        width + wall / 2,
        height / 2,
        wall,
        height * 3,
        { isStatic: true },
      );
      Matter.Composite.add(engine.world, [ground, left, right]);

      const mouse = Matter.Mouse.create(scene);
      const mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse,
        constraint: {
          stiffness: 0.22,
          damping: 0.08,
        },
      });
      mouseConstraintRef.current = mouseConstraint;
      Matter.Composite.add(engine.world, mouseConstraint);

      Matter.Events.on(mouseConstraint, "startdrag", () => {
        scene.style.cursor = "grabbing";
        if (mouseConstraint.body) {
          Matter.Body.setStatic(mouseConstraint.body, false);
          Matter.Sleeping.set(mouseConstraint.body, false);
        }
      });
      Matter.Events.on(mouseConstraint, "enddrag", () => {
        scene.style.cursor = "grab";
      });

      bodies.forEach(({ el, w, h }, i) => {
        const x = 40 + Math.random() * Math.max(40, width - w - 80);
        const y = -(h + 20 + i * (h * 0.55) + Math.random() * 60);

        const body = Matter.Bodies.rectangle(x + w / 2, y + h / 2, w, h, {
          chamfer: { radius: h / 2 },
          restitution: 0.32,
          friction: 0.55,
          frictionAir: 0.018,
          density: 0.0018,
        });

        Matter.Composite.add(engine.world, body);
        bodies[i].body = body;
        el.style.transform = `translate(${x}px, ${y}px)`;
      });

      const tick = () => {
        Matter.Engine.update(engine, 1000 / 60);
        bodies.forEach(({ body, el, w, h }) => {
          const { x, y } = body.position;
          el.style.transform = `translate(${x - w / 2}px, ${y - h / 2}px) rotate(${body.angle}rad)`;
        });
        rafRef.current = requestAnimationFrame(tick);
      };
      tick();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          initPhysics();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(container);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
      if (mouseConstraintRef.current) {
        Matter.Events.off(mouseConstraintRef.current);
        mouseConstraintRef.current = null;
      }
      if (engineRef.current) {
        Matter.Composite.clear(engineRef.current.world, false);
        Matter.Engine.clear(engineRef.current);
        engineRef.current = null;
      }
      startedRef.current = false;
    };
  }, [modules, staticFallback]);

  if (staticFallback) {
    return <StaticPills modules={modules} />;
  }

  return (
    <>
      <div
        ref={measureRef}
        className="pointer-events-none fixed -left-[9999px] top-0 opacity-0"
        aria-hidden
      >
        {modules.map((mod) => (
          <div key={mod.name} data-pill-measure>
            <PillBadge mod={mod} />
          </div>
        ))}
      </div>

      <div
        ref={containerRef}
        className="relative mt-12 h-[min(360px,46vh)] overflow-hidden rounded-2xl border border-border/70 bg-secondary/30"
      >
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-16 bg-gradient-to-t from-secondary/90 via-secondary/40 to-transparent" />
        <div className="pointer-events-none absolute inset-x-6 bottom-5 z-0 space-y-1.5 opacity-25">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-px bg-border" />
          ))}
        </div>

        <div
          ref={sceneRef}
          className="relative z-10 h-full w-full cursor-grab touch-none"
        />
      </div>
    </>
  );
}
