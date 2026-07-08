import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={cn("shrink-0", className)}
      aria-label="SkyERP logo"
    >
      <defs>
        <linearGradient id="skyerp-lg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.82 0.14 235)" />
          <stop offset="100%" stopColor="oklch(0.62 0.17 250)" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="36" height="36" rx="10" fill="url(#skyerp-lg)" />
      <path
        d="M11 24 Q11 15 20 15 Q29 15 29 22 M15 24 H25 M20 24 V30"
        fill="none"
        stroke="white"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="11" r="1.8" fill="oklch(0.78 0.18 45)" />
    </svg>
  );
}
