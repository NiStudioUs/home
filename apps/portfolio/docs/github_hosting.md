# Hosting on GitHub Pages

This project is a Flutter Web application, which can be easily hosted on GitHub Pages for free.

## Prerequisites

1.  A GitHub Account.
2.  A new GitHub Repository (Public or Private).
3.  Git installed and configured.

## Step 1: Configure Base Href

GitHub Pages usually hosts your site at `https://<username>.github.io/<repo-name>/`.
Flutter needs to know this `<repo-name>` to load assets correctly.

You have two options:

### Option A: Build with Flag (Recommended)

When building, simply pass the repo name:

```bash
flutter build web --base-href "/<repo-name>/" --release
```

*Example*: If your repo is `my-repo`, run:
```bash
flutter build web --base-href "/my-repo/" --release
```

### Option B: Hardcode in index.html

Edit `web/index.html`:
```html
<base href="/<repo-name>/">
```
*(Remember to change this back if you deploy somewhere else).*

## Step 2: Deploy

We will use the manual "gh-pages branch" method, as it's simple and reliable.

1.  **Build the Project**:
    Run the build command from Step 1.

    ```bash
    flutter build web --base-href "/<repo-name>/" --release
    ```

2.  **Navigate to Build Directory**:
    ```bash
    cd build/web
    ```

3.  **Initialize a temporary Git repo**:
    ```bash
    git init
    # Rename master to main if needed
    git checkout -b main 
    ```

4.  **Commit the build files**:
    ```bash
    git add .
    git commit -m "Deploy to GitHub Pages"
    ```

5.  **Push to `gh-pages` branch**:
    Link to your remote repository and push to a branch named `gh-pages`.

    ```bash
    git remote add origin https://github.com/<username>/<repo-name>.git
    git push -f origin main:gh-pages
    ```

6.  **Enable GitHub Pages**:
    *   Go to your Repository on GitHub.
    *   Click **Settings** > **Pages** (sidebar).
    *   Under **Build and deployment**, set **Source** to `Deploy from a branch`.
    *   Select **Branch**: `gh-pages` / `/root`.
    *   Click **Save**.

## Step 3: Verify

Visit `https://<username>.github.io/<repo-name>/`.
Your site should be live!

---

## Automating with GitHub Actions (Optional)

You can automate this so it deploys every time you push code.
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: subosito/flutter-action@v2
        with:
          channel: 'stable'
      - run: flutter pub get
      - run: flutter build web --base-href "/<repo-name>/" --release
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build/web
```
*(Remember to replace `<repo-name>` with your actual repository name)*.
