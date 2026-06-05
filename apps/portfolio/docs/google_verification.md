# Google Verification Guide

This guide covers how to verify your website ownership for Google Search Console and how to verify your app for Google Drive access.

## 1. Google Site Verification (Ownership)

To prove you own `https://your-site.com`, you usually need to add a meta tag to your website's `<head>`.

### Steps (Meta Tag Method):

1.  Go to [Google Search Console](https://search.google.com/search-console).
2.  Add your property (your website URL).
3.  Choose **HTML Tag** as the verification method.
4.  Copy the meta tag provided, which looks like:
    ```html
    <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
    ```
5.  Open `web/index.html` in your project.
6.  Paste the tag inside the `<head>` section, just before `</head>`.
7.  **Re-deploy** your website.
8.  Click **Verify** in Search Console.

### Steps (HTML File Method):

1.  Go to [Google Search Console](https://search.google.com/search-console).
2.  Choose **HTML File** as the verification method.
3.  Download the file (e.g., `google188a82e5af12d6fb.html`).
4.  Place this file in the **`web/`** directory of your project.
5.  **Re-deploy** your website.
6.  Google will look for the file at `https://your-site.com/google188a82e5af12d6fb.html`.
7.  Click **Verify** in Search Console.

---https://nistudious.github.io/home/

## 2. Google Drive App Verification (OAuth)

If your app accesses sensitive scopes like `drive.file` or `drive.appdata`, you may need verification to avoid the "Unverified App" warning.

### Steps:

1.  **Google Cloud Console**:
    *   Go to [console.cloud.google.com](https://console.cloud.google.com/).
    *   Select your project.
    *   Navigate to **APIs & Services > OAuth consent screen**.

2.  **Consent Screen Configuration**:
    *   **User Type**: Select **External**.
    *   **App Information**: Fill in App Name ("Scribble Notes"), Support Email (your developer email from `data.json`).
    *   **App Logo**: Upload your app icon (`assets/images/app1/icon.png`).
    *   **App Domain**:
        *   **Home Page**: Your website home URL.
        *   **Privacy Policy**: `https://your-site.com/#/app/scribble_notes/privacy` (Ensure this link works on your live site).
        *   **Terms of Service**: `https://your-site.com/#/app/scribble_notes/terms`.
    *   **Authorized Domains**: Add your website domain (e.g., `ni-studios.web.app`).

3.  **Scopes**:
    *   Click "Add or Removal Scopes".
    *   Select the Drive scopes your app uses (e.g., `.../auth/drive.file`).
    *   Justify *why* you need them if asked (e.g., "To allow users to backup their notes securely to their own Drive").

4.  **Test Users (Development)**:
    *   While in "Testing" mode, add your own email as a Test User. This lets you login without verification during dev.

5.  **Submit for Verification**:
    *   Once ready, click **Publish App** to push to Production (makes it available to any user but might show warning until verified).
    *   Google may ask for a **YouTube video** demonstrating the OAuth flow. Record a screen capture showing:
        1.  Clicking "Cloud Backup" or "Login".
        2.  The OAuth popup URL bar (showing the Client ID).
        3.  The user granting permission.
        4.  The app successfully backing up/restoring data.
