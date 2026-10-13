# Dicoding Jobs

A full-stack job portal application built with a Next.js frontend and a Laravel backend. This application features job listings, dynamic searching, role-based dashboards (Jobseeker and Recruiter), and a complete job application flow.

## Setup Instructions

### 1. How to run the Laravel backend

Prerequisites: PHP 8.x, Composer, and MySQL.

1. Navigate to the backend directory:
   ```bash
   cd job-api
   ```
2. Install PHP dependencies:
   ```bash
   composer install
   ```
3. Set up the environment variables:
   - Copy the `.env.example` file and rename it to `.env`.
   - Open `.env` and configure your database credentials (e.g., `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`).
4. Generate the application key:
   ```bash
   php artisan key:generate
   ```
5. Run database migrations and seed the dummy data:
   ```bash
   php artisan migrate --seed
   ```
6. Start the Laravel development server:
   ```bash
   php artisan serve
   ```
   The backend API will run at `http://localhost:8000`.

### 2. How to run the Next.js frontend

Prerequisites: Node.js (v18.x or newer) and npm.

1. Navigate to the frontend directory:
   ```bash
   cd job-ui
   ```
2. Install JavaScript dependencies:
   ```bash
   npm install
   ```
3. Start the Next.js development server:
   ```bash
   npm run dev
   ```
   The frontend application will be accessible at `http://localhost:3000`.

### 3. How to run all tests (unit, integration, and end-to-end)

To ensure the application functions correctly, you must run both the backend and frontend test suites.

**Backend Tests (Unit & Integration)**
The backend uses PHPUnit to test Model logic and API endpoint responses.
1. Ensure you are in the backend directory.
2. Run the tests using Artisan:
   ```bash
   php artisan test
   ```

**Frontend Tests (End-to-End)**
The frontend uses Playwright to simulate user interactions such as opening pages, searching for jobs, and viewing details.
1. Ensure you are in the frontend directory.
2. Make sure both the Laravel backend and Next.js frontend servers are currently running.
3. Install Playwright browsers (if this is your first time):
   ```bash
   npx playwright install
   ```
4. Run the end-to-end test suite:
   ```bash
   npx playwright test
   ```
   To run the tests with a visible browser UI, use: `npx playwright test --ui`
