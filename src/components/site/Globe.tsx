import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type ClientMarker = {
  country: string;
  clients: number;
  lat: number;
  lng: number;
};

const clientMarkers: ClientMarker[] = [
  { country: "United States", clients: 1180, lat: 39, lng: -98 },
  { country: "India", clients: 860, lat: 21, lng: 78 },
  { country: "United Kingdom", clients: 410, lat: 54, lng: -2 },
  { country: "Germany", clients: 305, lat: 51, lng: 10 },
  { country: "UAE", clients: 260, lat: 24, lng: 54 },
  { country: "Singapore", clients: 220, lat: 1.35, lng: 103.8 },
  { country: "Australia", clients: 195, lat: -25, lng: 133 },
  { country: "Brazil", clients: 175, lat: -10, lng: -55 },
  { country: "South Africa", clients: 140, lat: -29, lng: 24 },
  { country: "Canada", clients: 130, lat: 56, lng: -106 },
];

// Hardcoded — THREE.Color can't parse the site's oklch() CSS custom
// properties, so reading --ember via getComputedStyle silently fell back
// to white. This is the same orange as --ember in src/styles.css.
const EMBER_HEX = 0xe08a3c;

const GLOBE_RADIUS = 2;
const MIN_ROTATION_X = -0.9;
const MAX_ROTATION_X = 0.4;
const IDLE_RESUME_MS = 2000;
const AUTO_ROTATE_SPEED = 0.0006; // rad/frame — slow, ambient drift
const DRAG_SENSITIVITY = 0.0035; // rad per px dragged

function latLngToVector3(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

function fibonacciSpherePoints(count: number, radius: number) {
  const points: THREE.Vector3[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    points.push(new THREE.Vector3(Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius));
  }
  return points;
}

function StaticFallback({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeOpacity="0.35" />
      {[-60, -30, 0, 30, 60].map((y) => (
        <ellipse key={y} cx="100" cy={100 - y} rx={Math.sqrt(Math.max(0, 90 * 90 - y * y))} ry="10" fill="none" stroke="currentColor" strokeOpacity="0.2" />
      ))}
      {[0, 30, 60, 90, 120, 150].map((r) => (
        <ellipse key={r} cx="100" cy="100" rx={r} ry="90" fill="none" stroke="currentColor" strokeOpacity="0.2" />
      ))}
      {clientMarkers.slice(0, 6).map((m, i) => (
        <circle
          key={m.country}
          cx={100 + Math.cos((i / 6) * Math.PI * 2) * 55}
          cy={100 + Math.sin((i / 6) * Math.PI * 2) * 55}
          r="3"
          className="fill-ember"
        />
      ))}
    </svg>
  );
}

export function Globe() {
  const mountRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setShowFallback(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (showFallback) return;
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const wireframeGeo = new THREE.SphereGeometry(GLOBE_RADIUS, 28, 18);
    const wireframeMat = new THREE.MeshBasicMaterial({ color: EMBER_HEX, wireframe: true, transparent: true, opacity: 0.4 });
    globeGroup.add(new THREE.Mesh(wireframeGeo, wireframeMat));

    const dotPositions = fibonacciSpherePoints(900, GLOBE_RADIUS * 1.002);
    const dotGeo = new THREE.BufferGeometry().setFromPoints(dotPositions);
    const dotMat = new THREE.PointsMaterial({ color: EMBER_HEX, size: 0.02, transparent: true, opacity: 0.45 });
    globeGroup.add(new THREE.Points(dotGeo, dotMat));

    const markerMeshes: THREE.Mesh[] = [];
    const markerGeo = new THREE.SphereGeometry(0.055, 14, 14);
    clientMarkers.forEach((m) => {
      const mat = new THREE.MeshBasicMaterial({ color: EMBER_HEX });
      const mesh = new THREE.Mesh(markerGeo, mat);
      mesh.position.copy(latLngToVector3(m.lat, m.lng, GLOBE_RADIUS * 1.02));
      mesh.userData = m;
      markerMeshes.push(mesh);
      globeGroup.add(mesh);
    });

    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let idleTimer: ReturnType<typeof setTimeout> | null = null;
    let autoRotate = true;

    const scheduleIdleResume = () => {
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        autoRotate = true;
      }, IDLE_RESUME_MS);
    };

    const clampRotationX = () => {
      globeGroup.rotation.x = Math.max(MIN_ROTATION_X, Math.min(MAX_ROTATION_X, globeGroup.rotation.x));
    };

    // Drag-to-rotate listens on the whole window while a drag is active, so
    // the globe keeps spinning even if the cursor slides off the canvas
    // mid-drag instead of only reacting over the sphere's drawn pixels.
    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      autoRotate = false;
      lastX = e.clientX;
      lastY = e.clientY;
      if (idleTimer) clearTimeout(idleTimer);
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      globeGroup.rotation.y += dx * DRAG_SENSITIVITY;
      globeGroup.rotation.x += dy * DRAG_SENSITIVITY;
      clampRotationX();
    };

    const onPointerUp = () => {
      dragging = false;
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      scheduleIdleResume();
    };

    renderer.domElement.addEventListener("pointerdown", onPointerDown);

    const resize = () => {
      const { width, height } = mount.getBoundingClientRect();
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);

    const worldPos = new THREE.Vector3();
    const centerToCamera = new THREE.Vector3();

    let rafId: number;
    const animate = () => {
      if (autoRotate) {
        globeGroup.rotation.y += AUTO_ROTATE_SPEED;
      }

      renderer.render(scene, camera);

      // Keep each label pinned to its marker's projected screen position,
      // and fade it out once the marker rotates onto the far side of the globe.
      const rect = renderer.domElement.getBoundingClientRect();
      globeGroup.getWorldPosition(centerToCamera);
      centerToCamera.subVectors(camera.position, centerToCamera).normalize();

      markerMeshes.forEach((mesh, i) => {
        const label = labelRefs.current[i];
        if (!label) return;

        mesh.getWorldPosition(worldPos);
        const normal = worldPos.clone().sub(globeGroup.position).normalize();
        const facing = normal.dot(centerToCamera);

        if (facing < 0.05) {
          label.style.opacity = "0";
          label.style.pointerEvents = "none";
          return;
        }

        const projected = worldPos.clone().project(camera);
        const x = ((projected.x + 1) / 2) * rect.width;
        const y = ((1 - projected.y) / 2) * rect.height;
        label.style.transform = `translate(${x}px, ${y}px) translate(-50%, -130%)`;
        label.style.opacity = String(Math.min(1, facing * 2));
        label.style.pointerEvents = "none";
      });

      rafId = requestAnimationFrame(animate);
    };
    scheduleIdleResume();
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      if (idleTimer) clearTimeout(idleTimer);
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      wireframeGeo.dispose();
      wireframeMat.dispose();
      dotGeo.dispose();
      dotMat.dispose();
      markerGeo.dispose();
      markerMeshes.forEach((m) => (m.material as THREE.Material).dispose());
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [showFallback]);

  if (showFallback) {
    return (
      <div className="relative flex h-full w-full items-center justify-center text-ember">
        <StaticFallback className="h-4/5 w-4/5" />
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <div ref={mountRef} className="h-full w-full cursor-grab touch-none active:cursor-grabbing" />
      {clientMarkers.map((m, i) => (
        <div
          key={m.country}
          ref={(el) => { labelRefs.current[i] = el; }}
          className="pointer-events-none absolute left-0 top-0 z-10 flex items-center gap-1.5 whitespace-nowrap rounded-full border border-ember/30 bg-card px-3 py-1.5 text-xs shadow-elevated"
          style={{ opacity: 0, willChange: "transform, opacity" }}
        >
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />
          <span className="font-semibold text-foreground">{m.country}</span>
          <span className="text-muted-foreground">{m.clients.toLocaleString()} clients</span>
        </div>
      ))}
    </div>
  );
}
