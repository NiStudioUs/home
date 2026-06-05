# Chapter 4: Inventory Management

## Overview
An Enterprise RBAC Inventory Management SPA with deferred stock approvals, dynamic unit conversion, Recharts analytics, and mock localStorage state engine. This project serves as a comprehensive example of building a robust, state-driven application with Role-Based Access Control and a premium "Liquid Glass" design schema.

## Key Features
- **Role-Based Access Control (RBAC):** Distinct workflows for Admin, Supervisor, and Worker roles.
- **Approval Workflow:** Workers propose stock changes, which must be approved by Admins or Supervisors.
- **Dynamic Unit Conversion:** Seamless toggling between US and UK measurement units throughout the application.
- **Interactive Dashboards & Analytics:** Live data visualizations generated with Recharts (Bar Charts, Pie Charts, KPI summaries).
- **Responsive "Liquid Glass" Theme:** A modern UI blending glassmorphism, flat design, and deep gradients.
- **Full Offline Capability:** Completely powered by a `localStorage` state simulation with mock data injection.

## Tech Stack
- **Framework:** React 18
- **Build Tool:** Vite 5
- **Styling:** Vanilla CSS + Material UI (MUI) v5
- **Icons**: Material Icons
- **Visualizations**: Recharts
- **Language:** TypeScript 
- **Routing:** React Router v6
- **Architecture**: Context API + `localStorage` backend simulation.

## Design Philosophy
Hybrid approach combining Liquid Glass cards heavily utilizing backdrop filtering, Neo-Brutalism for focused alerts, and Minimalist typography with an animated Aurora background for visual depth.

## How to Run Locally
1. Run `npm run install` in `apps/chapter-4/` or run a root build.
2. From the repo root: `npm run build && npm run preview`
3. Alternatively, navigate to `apps/chapter-4/` and run `npm run dev`

## Demo Credentials (if applicable)
- Admin: `admin` / `admin123`
- Supervisor: `supervisor` / `super123`
- Worker: `worker` / `work123`
