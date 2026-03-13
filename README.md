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

- **Official installer:** [https://nodejs.org/] — download the LTS version for the desired system and run the installer.

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

- - **!IMPORTANT!** 
For  allure reports to work make sure Java is installed **Java** (JDK) and `JAVA_HOME` env variable is configured.
Follow the instructions in the pdf file named `JAVA JDK installation` guide inside `documentation/` folder in the project root.
After installation if finished run the tests again and generate the allure report with the commands below


To run allure reports, after test runs input the following commands:

  ```bash
  npx allure generate allure-results --clean -o allure-report
  npx allure open allure-report
  ```

  If Java is not installed, you can still run all tests; only viewing this report requires Java.

**Portability:** The project runs on any machine with Node.js (clone, `npm install`, configure `.env`, `npx playwright install`). Running tests does **not** require Java. Viewing the Allure report is optional and requires Java and `JAVA_HOME`.


## ======================================================================== ##
##                  Project structure and design decisions
## ======================================================================== ##

- **High-level structure**
  - `src/api`: API tests, clients, schemas, payload builders, and shared utilities.
  - `src/ui`: UI tests, page objects (POM), fixtures, and UI test data.
  - `playwright.config.js`: Central Playwright configuration, projects (API/UI), and reporters (including Allure).
  - `documentation/`: PDF guides for environment setup (API keys, Java/JAVA_HOME, etc.).

- **API tests (`src/api`)**
  - **Goal**: Keep tests readable and focused on behaviour, pushing HTTP and schema details into helpers.
  - **Clients** (for example `UserClient`) wrap raw HTTP calls with clear methods (`getUsersList`, `createUser`, etc.).
  - **Schemas** (`schemas/*.schema.js`) plus **AJV** (`validateSchema` utility) centralise response validation and avoid repeating field-by-field assertions.
  - **Builders** (for example `userPayloadBuilder`) create payloads so tests express *what* is being tested, not *how* the JSON is shaped.
  - **Data generation** uses `DataGenerator` + `@faker-js/faker` to create realistic, randomised inputs while still being deterministic at the test level.

- **UI tests (`src/ui`)**
  - **Goal**: Use a Page Object Model to keep locators and interactions in one place and make tests read like user flows.
  - `pages/`: Page objects such as `DashboardPage`, `AddEmployeePage`, and `EmployeeDetailsPage` encapsulate locators and actions.
  - `fixtures/fixtures.js`: Custom Playwright fixtures that bootstrap authenticated sessions and provide ready-to-use page objects in tests.
  - `tests/`: High-level scenarios (navigation, PIM search, add-employee flows) that read as business scenarios instead of low-level clicks.
  - `test-data/`: Static JSON and other inputs (for example employee data) to clearly separate test logic from test data.

- **Cross-cutting utilities**
  - `src/utils/DataGenerator.js`: Centralised random/test data generation for both API and UI tests.
  - `src/utils/SchemaValidator.js`: Single place for JSON schema validation logic, making it easy to change validation rules or libraries later.

- **Design principles**
  - **Separation of concerns**: Test files describe *what* is being verified; helpers, clients, and page objects implement *how*.
  - **Reusability**: Shared clients, builders, schemas, and page objects minimise duplication and make new tests faster to write.
  - **Maintainability**: Clear directory boundaries (API vs UI, tests vs utilities vs data) make it easy to locate and update related code.
  - **Portability & onboarding**: Combined with the setup instructions and documentation PDFs, a new contributor can understand the layout and start writing tests quickly.
