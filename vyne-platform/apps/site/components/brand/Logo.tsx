import Image from "next/image";
import logo from "@vyne/ui/assets/brand/vyne-logo-primary.png";
import { meta } from "@/content/copy";

/**
 * The approved VYNE mark, displayed NATURALLY on a white ground.
 *
 * The asset carries its own white ground and no alpha. Rather than boxing it in a
 * bordered plate, the surfaces that host it are white — so the ground disappears
 * and the mark reads as placed, not framed. No border. No card.
 *
 * LOGO_USAGE binding: exact file · 3:2 preserved · no recolour, crop, trace,
 * redraw or monogram extraction · white ground only.
 */
export function Logo({ height = 60 }: { height?: number }) {
  return (
    <Image
      className="logo"
      src={logo}
      alt={meta.name}
      height={height}
      width={Math.round(height * 1.5)}
      priority
      unoptimized
    />
  );
}

/**
 * Branching decision-path geometry — STRUCTURAL ONLY.
 * Section transitions and a single hero anchor. Never ornament.
 * Pure CSS: nothing traced, extracted or derived from the glyph.
 */
export function Branching({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <div className={`branching branching-${tone}`} aria-hidden="true">
      <i /><i /><i /><i /><i /><i /><i />
    </div>
  );
}
