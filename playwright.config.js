// @ts-check
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    // Set BASE_URL to run the suite against a deployed site instead of the local copy
    baseURL: process.env.BASE_URL || "http://localhost:4173",
    trace: "on-first-retry",
    video: "retain-on-failure",
    // SLOWMO=<ms> pauses between every browser action so runs are watchable
    launchOptions: { slowMo: Number(process.env.SLOWMO || 0) },
  },
  webServer: process.env.BASE_URL ? undefined : {
    command: "npx serve . -l 4173",
    url: "http://localhost:4173",
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
});
