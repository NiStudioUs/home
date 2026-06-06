# Flutter Web Obfuscation Workflow Prompt

You can use the following prompt to easily set up automated obfuscated builds for any of your other Flutter Web repositories:

---

> Please create a GitHub Actions workflow `.github/workflows/deploy-to-portfolio.yml` that builds our Flutter Web application with industry-standard obfuscation. The build command should use `--release --obfuscate --split-debug-info=build/web/debug-info --no-source-maps --dart2js-optimization O4`. After building, use the `peaceiris/actions-gh-pages@v3` action to deploy the build output to the `gh-pages` branch of the `NiStudioUs/home` repository. Use the `HOME_REPO_TOKEN` secret for authentication, set `keep_files: true`, and ensure the base-href is correctly set to `/home/<app-name>/`.
