# Chapter 2: HR Portal (React SPA)

## Overview
This project is a fully responsive, web-based HR Portal application designed to streamline human resources operations within an organization. It represents the "Chapter 2" milestone of the learning repository, upgrading from static HTML interfaces to a dynamic **React 18 Single Page Application (SPA)**.

The overall objective of this project is to enhance workforce management, reduce administrative burden, and improve the employee experience through a centralized digital solution.

**GitHub Page**: [Live Demo](https://nistudious.github.io/learning/apps/chapter-2/index.html)

## Key Features

### 🔐 Authentication System 
- Secure login mechanism utilizing dynamic routing.
- **Strict Role-Based Access Control (RBAC)**: Differentiates between `Hr` and `Employee` accounts.
- Local validation preventing unauthorized cross-role access.

### 🏢 HR Dashboard (Admin)
- **Employee Directory**: Visualize all registered employees within the organization.
- **Add New Employee**: A dedicated, fully-validated modal allowing HR to mock the insertion of new records (Name, Department, Email).
- **Leave Requests Approval Engine**: A unified dashboard where HR administrators can review, **Approve**, or **Reject** leave requests submitted by any employee across the network.

### 👤 Employee Dashboard
- **Profile Overview**: A secure, isolated view for individual employees.
- **Leave History**: A real-time timeline of all past leave applications, annotated with dynamic status indicators (`Pending`, `Approved`, `Rejected`).
- **Leave Application Tool**: A clean interface for employees to request time off (Start Date, End Date, Reason).

## Tech Stack
- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: `react-router-dom` (HashRouter for robust artifact deployment)
- **Styling**: Vanilla CSS + Material-UI (MUI v5)
- **Language**: TypeScript (Strict typing for components and interfaces)
- **State Management**: React Hooks (`useState`, `useEffect`) and native browser `localStorage` to simulate a cross-session persistence database.

## Design Philosophy
This project adopts the **Material Design 3** aesthetic with a strong focus on *minimalism*. Instead of relying on heavy custom CSS sheets, it utilizes MUI's highly optimized, pre-styled React Component library (`<Container>`, `<Box>`, `<Paper>`, `<TextField>`, `<Modal>`, `<Tabs>`) to construct a stunning, premium user interface out of the box.

## How to Run Locally

1. Navigate to the root directory of the repository (`learning/`).
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server (which spins up the Hub and compiles Chapter 2):
   ```bash
   npm run dev
   ```
4. Or, to simulate the production CI compilation:
   ```bash
   npm run build && npm run preview
   ```

*You can open this project by clicking the "Chapter 2" project link natively from the Learning Hub homepage!*
