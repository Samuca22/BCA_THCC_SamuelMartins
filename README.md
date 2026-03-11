# BCA_THCC_SamuelMartins

Constellation Automotive group BCA Take-Home Challenge for 2nd stage interview.

## Prerequisites

- **Node.js** (v18 or later recommended)
- **npm** (included with Node.js)

### Check if Node.js and npm are installed

```bash
node --version   # e.g. v18.x or v20.x
npm --version    # e.g. 9.x or 10.x
```

If either command is not found or the version is too old, install or update Node.js (npm is bundled with it).

### Install Node.js (if needed)

- **Official installer:** [https://nodejs.org/] — download the LTS version and run the installer.
- **With a package manager:**
  - **Windows (winget):** `winget install OpenJS.NodeJS.LTS`
  - **macOS (Homebrew):** `brew install node`
  - **Linux (apt):** `sudo apt update && sudo apt install nodejs npm`

After installing, open a new terminal and run `node --version` and `npm --version` again to confirm.

## Setup (first time on a new machine)

1. **Clone the repository**

   ```bash
   git clone https://github.com/Samuca22/BCA_THCC_SamuelMartins.git
   cd BCA_THCC_SamuelMartins
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

   This installs Playwright, Faker, AJV, dotenv, and the Allure reporter (see `package.json`).

3. **Configure environment variables**

   Copy the example env file and set the values (e.g. API key, UI URL, credentials):

   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your values. Required for:
   - **API tests:** `API_BASE_URL`, `API_KEY`
   - **UI tests:** `UI_BASE_URL`, `VALID_USERNAME`, `VALID_PASSWORD`

4. **Install Playwright browsers (first time only)**

   ```bash
   npx playwright install
   ```

## Running tests

| Command | Description |
|--------|-------------|
| `npm run test` | Run all projects (API + UI) |
| `npm run test:api` | Run API tests only |
| `npm run test:ui-chrome` | Run UI tests only (Chrome, with auth setup) |

Run a specific test file:

```bash
npx playwright test src/api/tests/users.spec.js
npx playwright test src/ui/tests/login.spec.js
```

## Viewing reports

- **Playwright HTML report** (after a run):

  ```bash
  npx playwright show-report
  ```

- **Allure report** (optional): raw results are written to `reports/`. To view the Allure UI, install the Allure CLI and generate the report:

  ```bash
  npm install -D allure-commandline
  npx allure generate reports --clean -o allure-report
  npx allure open allure-report
  ```

---

These steps are enough for the project to run on any machine after clone and `npm install`.
