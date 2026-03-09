# BCA_THCC_SamuelMartins
Constellation Automotive group BCA Take-Home Challenge for 2nd stage interview

## Setup & Running Tests 🚀

0. **Create project scaffold (if starting fresh)**

   ```bash
   npm init playwright@latest
   ```

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Install ajv library for schema validation **

   ``` bash
      npm install ajv ajv-formats
   ```

2. **Install faker library **

``` bash
   npm install @faker-js/faker
```

2. **Install Playwright browsers (first time only or after clearing)**

   ```bash
   npx playwright install
   ```

3. **Run tests**

   - To execute all tests in headed mode:

     ```bash
     npx playwright test        # runs both API and UI projects by default
     npx playwright test --project=ui-chrome    # or --project=api to limit to one
     ```

   - To run a specific test file (example):

     ```bash
     npx playwright test tests/api/tests/example.spec.ts
     # or tests/ui/tests/example.spec.ts
     ```

4. **View test report**

   After a run completes, open the HTML report with:

   ```bash
   npx playwright show-report
   ```

> ℹ️ These commands assume Node.js and npm are installed on your system. Playwright projects typically use `package.json` scripts; you can also add custom npm scripts if desired.

---

