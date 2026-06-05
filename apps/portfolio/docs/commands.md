# Useful Commands

This guide provides a reference for the common commands used for data migration, asset generation, and project maintenance.

## Building & Running Locally

To build and test the project locally, ensure you're in the project root and run:

```bash
# 1. First, make sure you migrate any new data changes
./scripts/migrate.sh

# 2. Run the application locally on a local web server (Chrome)
flutter run -d chrome

# Alternatively, if you want to explicitly run on localhost over a specific port:
flutter run -d web-server --web-hostname localhost --web-port 8080
```

> [!TIP]
> Use `r` to hot-reload and `R` to hot-restart while the `flutter run` terminal is active.

## Data Migration

The website dynamically loads content from a master `assets/data.json` file. Because we manage each app's raw data independently within `assets-ext/app1` and `assets-ext/app2`, we must *migrate* this data before running or building the app.

> [!NOTE]
> The app will **not** update by default when you just edit files inside `assets-ext`. You must run the migration script first.

**To compile external assets and generate `assets/data.json`:**
```bash
# Execute from the project root
./scripts/migrate.sh
```

**What this does:**
1. Scans `assets-ext/app1` and `assets-ext/app2`.
2. Copies all necessary images and documents into the `assets/images/app*` directory.
3. Consolidates individual `data.json` files and creates the master payload at `assets/data.json`.

## Generating Play Store Screenshots

If you have raw screenshots and want to format them perfectly into device mockups with titles and subtitles:

```bash
# Execute from the project root
cd scripts/playstore_screenshots
node index.js
```

**What this does:**
1. Runs a headless browser (Puppeteer).
2. Wraps the raw screenshots (from the designated input folder) into an HTML template with the app's predefined fonts (`Roboto`) and background color (`#212121`).
3. Saves the polished Play Store-ready images back into `assets-ext/app1/images`. 
*(Note: Remember to run the Migration script afterward so these new images are copied to the active `assets/` directory!)*
