import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 120_000,
  outputDir: "/tmp/five-spirits-playwright-results",
  use: { baseURL: "http://127.0.0.1:3100" },
  webServer: {
    command: "npm start -- --hostname 127.0.0.1 --port 3100",
    url: "http://127.0.0.1:3100",
    reuseExistingServer: true,
  },
});
