# BCA_THCC_SamuelMartins

Constellation Automotive group BCA Take-Home Challenge for 2nd stage interview.

## Prerequisites

- **Node.js** (v18 or later)
- **npm** (included with Node.js)
- **Java** (optional: used only to view the Allure report)

### Check if Node.js and npm are installed

```bash
node --version
npm --version
```

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

   Create the .env and copy the example env file and set the values (API key, URLs and credentials):

   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your values. Required for:
   - **API tests:** `API_BASE_URL`, `API_KEY`
   - **UI tests:** `UI_BASE_URL`, `VALID_USERNAME`, `VALID_PASSWORD`

   **! IMPORTANT !** 
   Check project documentation folder the pdf `Reqres API Key config` file on how to configure: API_KEY, VALID_USERNAME and VALID_PASSWORD

4. **Install Playwright browsers (first time only)**

   ```bash
   npx playwright install
   ```

## Running tests

| Command | Description |
|---------|-------------|
| `npx playwright test` | Run all projects (API + UI) |
| `npx playwright test --project=api` | Run API tests only |
| `npx playwright test --project=ui-chrome` | Run UI tests only (Chrome, with auth setup) |

Run ui sanity tests in ui headed mode use:

```bash
   npx playwright test --headed --grep '@sanity'
```

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

- **Allure report (OPTIONAL)**:

!!IMPORTANT!! 
For viewing allure reports make sure Java is installed **Java** (JDK) and `JAVA_HOME` env variable is configured.
If not, follow the instructions in the pdf file inside `documentation/` folder in the project root

To run allure reports, after test runs input the following commands:

  ```bash
  npx allure generate allure-results --clean -o allure-report
  npx allure open allure-report
  ```

  If Java is not installed, you can still run all tests; only viewing this report requires Java.

**Portability:** The project runs on any machine with Node.js (clone, `npm install`, configure `.env`, `npx playwright install`). Running tests does **not** require Java. Viewing the Allure report is optional and requires Java and `JAVA_HOME`.
