# Chapter 3: URide

## Overview
A frontend starter code for a taxi ride booking application called "URide". Built following an Uber-like premium aesthetic, this project provides a multi-page setup and fully functional visual booking flow with interactive maps.

**GitHub Page**: [Live Demo](https://nistudious.github.io/learning/apps/chapter-3/index.html)

## Key Features
- **5-Page Navigation Flow**: Home, About, Services, Contact, and Booking
- **Interactive Map Integration**: Integrated OpenStreetMap using Leaflet and react-leaflet for setting pick-up and drop-off points.
- **Dynamic Routing**: Powered by `react-router-dom` with a sliding Drawer for mobile.
- **Premium Design System**: Implements Glassmorphism cards over dynamic Aurora-style animated background blobs, coupled with custom MUI Material 3 themed components.
- **Real-time Form Validation**: Strict input constraints for bookings.

## Tech Stack
- **Framework**: React 18
- **Build Tool**: Vite 5
- **Styling**: Material UI (MUI) v5 + Vanilla CSS Animations
- **Language**: TypeScript (strict)
- **Map Tools**: Leaflet & React-Leaflet
- **Animations**: Framer Motion

## Design Philosophy
This application uses a "Hybrid" approach, seamlessly combining:
1. **Aurora Backgrounds**: Fluid and animated colorful blobs providing a sense of depth and energy to the entire interface.
2. **Glassmorphism**: Transparent, blurred UI wrapper cards and AppBars, so that the energetic Aurora background slightly shines through.
3. **Flat 2.0**: The specific components (text fields, primary buttons) implement clean, solid styles mimicking Uber's functional and distraction-free usability.

## How to Run Locally
1. From the repo root: `npm run dev` and navigate to the Chapter 3 tile in the Hub.
2. Or navigate to `apps/chapter-3/` and run `npm run dev` directly.

## Demo Flow Notes
- Use the map to select random pickup and dropoff points.
- Real-world interaction with the contact and booking forms generates error states for invalid inputs or success states when valid. 
