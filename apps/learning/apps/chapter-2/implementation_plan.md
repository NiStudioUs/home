# Chapter 2: React HR Portal Implementation Plan

## Objective
To build a modern, responsive, minimalist HR Portal using **React, Vite, and TypeScript**, styled with a **Material 3 (MUI v5)** aesthetic.

## Tech Stack
- **Core**: React 18, TypeScript, Vite
- **Styling**: MUI (Material-UI) configured with a custom Material 3 minimalist token set (generous whitespace, rounded components, subtle elevation, crisp typography using the 'Inter' font).
- **Routing**: `react-router-dom`
- **Data/State**: React Context API and browser `localStorage` to simulate the required "JSON data storage" requirement.

## Architecture & Features
### 1. Authentication & RBAC (Role-Based Access Control)
- **Login/Signup Views**: Based tightly on your provided wireframes but heavily modernized with a polished aesthetic. Options to identify as 'Employee' or 'HR'.
- **Protected Routing**: A robust `RequireAuth` wrapper to lock HR pages from Employees, and vice-versa.

### 2. Route Structure (Pages)
We are planning to create **3 distinct App Views (Pages)**, relying heavily on modern tabbed navigation to prevent jarring page reloads.

1. **The Auth Page (`/login` & `/register`)**:
   - Toggles between Login and Sign Up.
   - Determines role and redirects to the correct dashboard upon success.

2. **The HR Dashboard Page (`/hr-dashboard`)**:
   - Contains a top navigation bar (matching your reference image).
   - *Tab 1*: The Employee Directory and "Add New Employee" trigger.
   - *Tab 2*: The Leave Management system (Approve/Reject requests).

3. **The Employee Dashboard Page (`/employee-dashboard`)**:
   - Contains exactly what your employees need to see.
   - *Tab 1*: User's personal details / Profile.
   - *Tab 2*: Leave History and "Submit New Leave Request" Form.

### 3. HR Portal (HR Role)
- **HR Dashboard**: A clean, scannable data table displaying the organization's workforce.
- **Add Employee Dialog**: A sleek modal containing Name, Department, and Email (matching the reference image), persisting to our local JSON database.
- **Leave Management System**: A dedicated tab for HR to review, approve, or reject incoming employee leave requests.

### 4. Employee Portal (Employee Role)
- **Employee Dashboard**: A personalized view showing the employee's profile information.
- **Leave Requests**: An intuitive form allowing employees to submit leave dates and reasons, which instantly route to the HR dashboard for approval.

## Verification Plan
### Development Verification
- Compile and run via `npm run dev` to ensure Vite + TypeScript builds synchronously.
- Verify TypeScript types (`tsc --noEmit`) to ensure enterprise-level code quality.

### Deployment Verification
- Once complete, we will link `chapter-2` to the main Hub array in `src/App.jsx`.
- When pushed, our previously built GitHub Action will detect the new `package.json` in `apps/chapter-2`, automatically build the TS/React app, and deploy it to GitHub pages.

## User Review Required
- Since there is no physical backend server Node.js requirement in the description (only frontend UI requirements), I will implement the "JSON data storage" entirely in the frontend using the browser's `localStorage` parsed to/from JSON. Does this approach work for you? 
- Please approve this plan so we can begin execution!
