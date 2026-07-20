import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    testTimeout: 60_000,
    hookTimeout: 120_000,
    // Each file uses its own scratch database; files may run in parallel,
    // but tests within a file share a session and must run serially.
    fileParallelism: true,
    sequence: { concurrent: false },
  },
});
