import Image from "next/image";
import logo from "@vyne/ui/assets/brand/vyne-logo-primary.png";
import { meta } from "@/content/copy";

/**
 * The approved VYNE mark.
 *
 * LOGO_USAGE.md is binding: use this exact file · preserve 3:2 proportions ·
 * never recolour, crop, trace, redraw, or extract the monogram · place only on
 * white, or let its white ground read as an intentional plate.
 *
 * The asset has NO alpha channel, so it cannot appear on navy. Navy sections
 * carry no mark until a reversed variant exists (BRAND_ASSET_CONSOLIDATION §5).
 */
export function Logo({ height = 64 }: { height?: number }) {
  return (
    <span className="logo-plate" style={{ ["--logo-h" as string]: `${height}px` }}>
      <Image
        src={logo}
        alt={meta.name}
        height={height}
        width={Math.round(height * 1.5)}
        priority
        unoptimized
      />
    </span>
  );
}

/**
 * Branching decision-path motif — Direction C.
 *
 * Parallel rules set at the angle already present in the approved mark, fanning
 * from a single origin like paths diverging from a decision point. Pure CSS
 * geometry: nothing is traced, extracted, or derived from the glyph itself, so
 * the do-not-recreate rule holds.
 *
 * MAXIMUM TWO MAJOR PLACEMENTS PER PAGE (founder direction).
 */
export function Branching({
  tone = "light",
  className = "",
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div className={`branching branching-${tone} ${className}`} aria-hidden="true">
      <i /><i /><i /><i /><i /><i /><i />
    </div>
  );
}
