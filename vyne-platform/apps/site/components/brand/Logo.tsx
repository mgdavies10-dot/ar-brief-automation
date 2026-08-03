import Image from "next/image";
import navy from "@vyne/ui/assets/brand/derived/vyne-stacked-navy-360.png";
import ivory from "@vyne/ui/assets/brand/derived/vyne-stacked-ivory-360.png";
import { meta } from "@/content/copy";

/**
 * The approved VYNE mark, now TRANSPARENT.
 *
 * Derived from the approved asset by alpha extraction, not redrawing: the ink's
 * own luminance became the alpha channel and the ink was recoloured. Geometry is
 * identical to the approved mark by construction.
 * See scripts/productionize-logo.mjs and BRAND_ASSET_REGISTER.
 */
export function Logo({ height = 56, tone = "navy" }: { height?: number; tone?: "navy" | "ivory" }) {
  const src = tone === "ivory" ? ivory : navy;
  return (
    <Image className="logo" src={src} alt={meta.name} height={height}
      width={Math.round(height * (src.width / src.height))} priority unoptimized />
  );
}

/** Branching decision-path geometry — structural only, never ornament. */
export function Branching({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <div className={`branching branching-${tone}`} aria-hidden="true">
      <i /><i /><i /><i /><i /><i /><i />
    </div>
  );
}
