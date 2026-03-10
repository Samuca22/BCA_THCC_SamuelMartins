// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './src',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  /* Shared settings for all the projects below. */
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    //video: 'retain-on-failure',
    trace: 'on-first-retry',
    actionTimeout: 15 * 1000, // 15 seconds
    navigationTimeout: 30 * 1000, // 30 seconds
  },

  /* Configure projects for major browsers */
  projects: [
    // Part A - API tests
    {
      name: 'api',
      testMatch: 'api/tests/*.spec.js',
      use: { 
        baseURL: process.env.API_BASE_URL,
        extraHTTPHeaders: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.API_KEY ?? ''
        }
       },
    },

    
    // Part B - UI tests
    {
      name: 'setup',
      testMatch: 'ui/fixtures/auth.setup.js',
      use: { baseURL: process.env.UI_BASE_URL },
    },
    {
      name: 'ui-chrome',
      testMatch: 'ui/tests/*.spec.js',
      use: { 
        baseURL: process.env.UI_BASE_URL, 
        ...devices['Desktop Chrome'],
        storageState: path.join(__dirname, 'playwright/.auth/user.json'),
      },
      dependencies: ['setup'],
    }

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },


  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

