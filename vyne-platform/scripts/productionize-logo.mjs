/**
 * VYNE logo productionization — alpha extraction, NOT redrawing.
 *
 * The approved asset is navy artwork on an opaque white ground. This script
 * derives an alpha channel from the artwork's own luminance and recolours the
 * ink, producing transparent, reversed and monochrome variants.
 *
 * WHAT THIS DOES NOT DO: it does not trace, vectorise, redraw, simplify or
 * reinterpret the mark. Every output is the SAME PIXEL GEOMETRY as the approved
 * asset — only the background is removed and the ink recoloured. Geometry is
 * preserved by construction, not by care.
 *
 * A true SVG master still requires a designer working from source. That remains
 * an open production deliverable (BRAND_ASSET_REGISTER P-1).
 */
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const SRC = "packages/ui/assets/brand/vyne-logo-primary.png";
const OUT = "packages/ui/assets/brand/derived";
mkdirSync(OUT, { recursive: true });

const NAVY = [0x08, 0x1b, 0x36];
const IVORY = [0xf8, 0xf5, 0xef];
const BLACK = [0x1a, 0x1a, 0x1a];
const WHITE = [0xff, 0xff, 0xff];

const { data, info } = await sharp(SRC)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const px = width * height;

// Derive alpha from luminance: white ground -> 0, navy ink -> opaque.
const alpha = new Uint8Array(px);
let maxA = 0;
for (let i = 0; i < px; i++) {
  const o = i * channels;
  const lum = 0.2126 * data[o] + 0.7152 * data[o + 1] + 0.0722 * data[o + 2];
  const a = Math.max(0, Math.min(255, Math.round(255 - lum)));
  alpha[i] = a;
  if (a > maxA) maxA = a;
}
// Normalise so the densest ink is fully opaque.
const scale = maxA > 0 ? 255 / maxA : 1;
for (let i = 0; i < px; i++) {
  alpha[i] = Math.min(255, Math.round(alpha[i] * scale));
}

function compose([r, g, b]) {
  const out = Buffer.alloc(px * 4);
  for (let i = 0; i < px; i++) {
    const o = i * 4;
    out[o] = r; out[o + 1] = g; out[o + 2] = b; out[o + 3] = alpha[i];
  }
  return sharp(out, { raw: { width, height, channels: 4 } }).png();
}

// Bounding box of visible ink, so the lockups have no dead canvas.
let minX = width, minY = height, maxX = 0, maxY = 0;
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    if (alpha[y * width + x] > 8) {
      if (x < minX) minX = x; if (x > maxX) maxX = x;
      if (y < minY) minY = y; if (y > maxY) maxY = y;
    }
  }
}
const pad = Math.round(Math.max(maxX - minX, maxY - minY) * 0.04);
const box = {
  left: Math.max(0, minX - pad),
  top: Math.max(0, minY - pad),
  width: Math.min(width, maxX - minX + pad * 2),
  height: Math.min(height, maxY - minY + pad * 2),
};

// Split point between the VE monogram and the VYNE wordmark: the widest
// horizontal band of empty rows inside the ink bounding box.
const rowInk = new Array(height).fill(0);
for (let y = 0; y < height; y++) {
  let n = 0;
  for (let x = 0; x < width; x++) if (alpha[y * width + x] > 8) n++;
  rowInk[y] = n;
}
let gapStart = -1, gapLen = 0, bestStart = -1, bestLen = 0;
for (let y = minY; y <= maxY; y++) {
  if (rowInk[y] === 0) {
    if (gapStart < 0) { gapStart = y; gapLen = 0; }
    gapLen++;
    if (gapLen > bestLen) { bestLen = gapLen; bestStart = gapStart; }
  } else { gapStart = -1; gapLen = 0; }
}
const splitY = bestStart > 0 ? bestStart + Math.round(bestLen / 2) : Math.round((minY + maxY) / 2);

const monoBox = {
  left: box.left, top: box.top,
  width: box.width, height: Math.max(1, splitY - box.top),
};

const jobs = [];
const write = (p, pipeline) => jobs.push(pipeline.toFile(join(OUT, p)));

// Primary stacked — transparent, navy ink
write("vyne-stacked-navy.png", compose(NAVY).extract(box));
write("vyne-stacked-navy@2x.png", compose(NAVY).extract(box).resize({ height: 240 }));
write("vyne-stacked-navy-360.png", compose(NAVY).extract(box).resize({ height: 360 }));

// Reversed — ivory ink for navy surfaces
write("vyne-stacked-ivory.png", compose(IVORY).extract(box));
write("vyne-stacked-ivory-360.png", compose(IVORY).extract(box).resize({ height: 360 }));

// Monochrome
write("vyne-stacked-black.png", compose(BLACK).extract(box));
write("vyne-stacked-white.png", compose(WHITE).extract(box));

// VE monogram — the mark alone, cropped at the natural gap. No redrawing.
write("vyne-monogram-navy.png", compose(NAVY).extract(monoBox));
write("vyne-monogram-ivory.png", compose(IVORY).extract(monoBox));

// Favicon sources — square canvas around the monogram
for (const s of [512, 180, 64, 32, 16]) {
  write(
    `favicon-${s}.png`,
    compose(NAVY).extract(monoBox).resize({
      width: s, height: s, fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
  );
}

// Open Graph lockup — navy field, ivory mark, 1200x630
write(
  "og-lockup.png",
  sharp({
    create: { width: 1200, height: 630, channels: 4, background: { r: 8, g: 27, b: 54, alpha: 1 } },
  })
    .composite([{ input: await compose(IVORY).extract(box).resize({ height: 300 }).toBuffer(), gravity: "centre" }])
    .png()
);

await Promise.all(jobs);

console.log("Derived from the approved asset — geometry unchanged:");
console.log(`  source        ${width}x${height}, opaque RGB`);
console.log(`  ink bbox      ${box.width}x${box.height} at ${box.left},${box.top}`);
console.log(`  monogram      ${monoBox.width}x${monoBox.height} (split at y=${splitY}, gap ${bestLen}px)`);
console.log(`  written       ${jobs.length} files -> ${OUT}`);
