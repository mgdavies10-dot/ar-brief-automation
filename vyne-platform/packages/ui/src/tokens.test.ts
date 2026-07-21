import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { color, typeScale } from "./tokens";

const css = readFileSync(fileURLToPath(new URL("./tokens.css", import.meta.url)), "utf8");

/** camelCase token key -> --vyne-kebab-case custom property name. */
const cssVar = (name: string) => `--vyne-${name.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}`;

describe("design tokens", () => {
  it("matches the official VYNE brand palette (docs/brand/BRAND_TOKENS.md)", () => {
    expect(color.navy).toBe("#081B36");
    expect(color.ivory).toBe("#F8F5EF");
    expect(color.white).toBe("#FFFFFF");
    expect(color.bronze).toBe("#B88A5A");
    expect(color.stoneGray).toBe("#D7D2C6");
    expect(color.charcoal).toBe("#1A1A1A");
  });

  it("keeps the functional and semantic tokens", () => {
    expect(color.slate).toBe("#425066"); // secondary text (functional)
    expect(color.bronzeText).toBe("#8A6234"); // accessible bronze for text (WCAG AA)
    expect(color.hairline).toBe("#D7D2C6"); // border/hairline = stone gray
    expect(color.forest).toBe("#214E3B");
    expect(color.warning).toBe("#8A672C");
    expect(color.danger).toBe("#A54747");
  });

  it("keeps tokens.css in lockstep with tokens.ts colors", () => {
    for (const [name, hex] of Object.entries(color)) {
      expect(css.toUpperCase()).toContain(`${cssVar(name).toUpperCase()}: ${hex.toUpperCase()}`);
    }
  });

  it("keeps the UX §1.3 desktop type scale", () => {
    expect(typeScale.display).toEqual({ size: 32, lineHeight: 40 });
    expect(typeScale.title).toEqual({ size: 24, lineHeight: 32 });
    expect(typeScale.body).toEqual({ size: 15, lineHeight: 24 });
  });
});
