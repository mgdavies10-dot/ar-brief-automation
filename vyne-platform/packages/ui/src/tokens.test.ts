import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { color, typeScale } from "./tokens";

const css = readFileSync(fileURLToPath(new URL("./tokens.css", import.meta.url)), "utf8");

describe("design tokens", () => {
  it("matches the canonical BRAND_TOKENS palette (Architecture §11 / C-3)", () => {
    expect(color.navy).toBe("#12233F");
    expect(color.ivory).toBe("#F7F4ED");
    expect(color.forest).toBe("#214E3B");
    expect(color.gold).toBe("#B48A35");
    expect(color.slate).toBe("#425066");
    expect(color.warning).toBe("#8A672C");
    expect(color.danger).toBe("#A54747");
  });

  it("keeps tokens.css in lockstep with tokens.ts colors", () => {
    for (const [name, hex] of Object.entries(color)) {
      const varName = `--vyne-${name === "hairline" ? "hairline" : name}`;
      expect(css.toUpperCase()).toContain(`${varName.toUpperCase()}: ${hex.toUpperCase()}`);
    }
  });

  it("keeps the UX §1.3 desktop type scale", () => {
    expect(typeScale.display).toEqual({ size: 32, lineHeight: 40 });
    expect(typeScale.title).toEqual({ size: 24, lineHeight: 32 });
    expect(typeScale.body).toEqual({ size: 15, lineHeight: 24 });
  });
});
