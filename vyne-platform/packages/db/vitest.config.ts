import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    testTimeout: 60_000,
    hookTimeout: 120_000,
    // Shim mode: each file uses its own scratch database, so files may run in
    // parallel. Real-stack mode (VYNE_REAL_STACK=1) shares the one managed
    // database and must run files serially.
    fileParallelism: process.env.VYNE_REAL_STACK !== "1",
    sequence: { concurrent: false },
  },
});
