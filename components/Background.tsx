const NOISE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`;

export default function Background() {
    return (
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            {/* Soft accent glow at the top of the page */}
            <div className="absolute -top-48 left-1/2 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-accent-strong/10 blur-3xl" />

            {/* Very subtle noise texture */}
            <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: NOISE }} />
        </div>
    );
}
