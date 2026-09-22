import { TYPE_ICON } from "./PromoBadges";
import { typeColorVar, type Promo } from "@/lib/promos";

/**
 * Every promotion gets a campaign banner, not just the ones with real
 * marketing photography: a generated poster-style graphic (type color,
 * dot texture, watermark icon, name + prize pool) stands in until real
 * creative exists, so the calendar reads as gaming campaigns rather than
 * plain corporate list rows. When a promo has a real bannerImage, that
 * takes over instead.
 */
export function PromoBanner({
  promo,
  className = "",
  compact = false,
}: {
  promo: Promo;
  className?: string;
  /** Smaller type scale for thumbnail-sized uses (asset rows, list rows, cards). */
  compact?: boolean;
}) {
  if (promo.bannerImage) {
    return (
      <img
        src={promo.bannerImage}
        alt={`${promo.name} campaign banner`}
        className={`object-cover ${className}`}
      />
    );
  }

  const color = typeColorVar[promo.type];
  const Icon = TYPE_ICON[promo.type];

  return (
    <div
      className={`relative flex items-end overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(120% 140% at 100% -10%, color-mix(in oklch, ${color} 50%, transparent), transparent 60%),
          radial-gradient(120% 140% at -10% 120%, color-mix(in oklch, ${color} 28%, transparent), transparent 55%),
          linear-gradient(135deg, color-mix(in oklch, ${color} 20%, var(--color-surface)), var(--color-surface) 70%)`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(circle, color-mix(in oklch, ${color} 70%, transparent) 1.4px, transparent 1.4px)`,
          backgroundSize: compact ? "8px 8px" : "16px 16px",
          maskImage: "linear-gradient(135deg, black, transparent 72%)",
          WebkitMaskImage: "linear-gradient(135deg, black, transparent 72%)",
        }}
      />
      <Icon
        className={
          compact
            ? "pointer-events-none absolute -right-1.5 -top-2 size-8 rotate-12 opacity-20"
            : "pointer-events-none absolute -right-4 -top-6 size-28 rotate-12 opacity-[0.14] sm:size-36"
        }
        style={{ color }}
      />
      {compact ? (
        <div className="relative z-10 w-full truncate p-1.5">
          <p className="truncate text-[8px] font-medium uppercase tracking-wide opacity-80" style={{ color }}>
            {promo.type}
          </p>
          <p className="truncate font-display text-[11px] font-bold" style={{ color }}>
            {promo.prizePool}
          </p>
        </div>
      ) : (
        <div className="relative z-10 flex w-full items-end justify-between gap-3 p-3 sm:p-4">
          <div className="min-w-0">
            <p className="text-eyebrow truncate" style={{ color }}>
              {promo.type}
            </p>
            <p className="truncate font-display text-base font-semibold sm:text-xl">{promo.name}</p>
          </div>
          <p className="shrink-0 font-display text-lg font-bold sm:text-2xl" style={{ color }}>
            {promo.prizePool}
          </p>
        </div>
      )}
    </div>
  );
}
