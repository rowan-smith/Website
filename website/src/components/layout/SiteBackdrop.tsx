const planetClass = 'absolute rounded-full bg-[radial-gradient(circle_at_70%_75%,oklch(0.32_0.12_277),oklch(0.16_0.05_276)_55%,oklch(0.12_0.03_276))] shadow-[inset_-10px_-14px_40px_oklch(0.62_0.2_277/0.55),0_0_80px_-10px_oklch(0.6_0.2_277/0.45)]';

export function SiteBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[56rem] overflow-hidden opacity-25 dark:opacity-100" aria-hidden="true">
      <div className={`${planetClass} -top-48 -left-56 size-[26rem] max-md:size-72`} />
      <div className={`${planetClass} -top-64 -right-48 size-[30rem] rotate-[-60deg] max-md:hidden`} />

      <svg
        className="absolute inset-x-0 top-[16rem] h-[30rem] w-full [mask-image:linear-gradient(to_bottom,black_45%,transparent)]"
        viewBox="0 0 1440 480"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="backdrop-ridge-far" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.45 0.16 277)" stopOpacity="0.45" />
            <stop offset="100%" stopColor="oklch(0.2 0.06 276)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="backdrop-ridge-near" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.35 0.12 277)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="oklch(0.16 0.04 276)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0 170 L90 120 L170 160 L260 70 L330 130 L420 90 L470 150 L560 200 L1000 210 L1080 150 L1150 180 L1230 90 L1290 140 L1360 60 L1440 110 L1440 480 L0 480 Z"
          fill="url(#backdrop-ridge-far)"
        />
        <path
          d="M0 260 L80 200 L150 240 L230 170 L300 230 L380 210 L460 270 L980 280 L1060 220 L1140 250 L1210 180 L1290 230 L1370 170 L1440 210 L1440 480 L0 480 Z"
          fill="url(#backdrop-ridge-near)"
          stroke="oklch(0.62 0.2 277 / 0.35)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
