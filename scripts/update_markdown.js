const fs = require('fs');
const path = require('path');

const resumesDir = path.join(__dirname, '../apps/profile/public/resumes');

function updateMarkdown(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Update Headlines with Color
  const headersToStyle = ['Summary', 'Key Skills', 'Skills', 'Experience', 'Mobile & Web Development Projects', 'Projects', 'Education', 'Professional Highlights'];
  
  headersToStyle.forEach(header => {
    // Regex to match "## Header"
    const regex = new RegExp(`^## ${header}$`, 'gm');
    content = content.replace(regex, `<h2 style="color: #1a4b8c; border-bottom: 2px solid #1a4b8c; padding-bottom: 4px; margin-top: 20px;">${header}</h2>`);
  });

  // 2. Add Home Lab Project
  const homeLabProject = `
### Raspberry Pi Home Lab
- **Architected a self-hosted client-server ecosystem on a Raspberry Pi 5** using Docker and an **Nginx reverse proxy**, deploying privacy-focused applications including Immich (photo management), Pi-Hole (network-wide ad blocking and local DNS routing), and Jellyfin (media content management).`;
  
  // If projects section exists and doesn't have homelab, insert it after the first project or before SMS stack
  if (content.includes('### Flutter Notes App') && !content.includes('Raspberry Pi Home Lab')) {
    content = content.replace('### Flutter Notes App', homeLabProject.trim() + '\n\n### Flutter Notes App');
  }

  // 3. Update Allica Experience with JMeter / GDPR
  const allicaOld = `- Delivered exhaustive automation for complex banking flows including CDD API, CRA Phase 1, Safeguarding, Pension Profiles, and Business Rewards.`;
  const allicaNew = `- Delivered exhaustive automation for complex banking flows including CDD API, CRA Phase 1, Safeguarding, Pension Profiles, and Business Rewards.
- Conducted **JMeter performance testing** for Allica Onboarding Microservices and ensured **Security & Compliance with GDPR** for onboarding applications.`;
  if (content.includes(allicaOld)) {
    content = content.replace(allicaOld, allicaNew);
  }

  // 4. Update Maveric Experience Mentorship
  const maveric1Old = `- Implemented POCs and frameworks using **Docker Test Containers**, **MSSQL**, and **Liquibase** for microservices.`;
  const maveric1New = `- Implemented POCs and frameworks using **Docker Test Containers**, **MSSQL**, and **Liquibase** for microservices.
- **Mentored junior engineers** and integrated automated test suites into **CI/CD pipelines**, enabling continuous testing and faster release cadences.`;
  if (content.includes(maveric1Old)) {
    content = content.replace(maveric1Old, maveric1New);
  }

  const maveric2Old = `- Created Data Creation frameworks to hasten release testing, and managed Sauce Labs compatibility and regression testing.`;
  const maveric2New = `- Created Data Creation frameworks to hasten release testing, and managed Sauce Labs compatibility and regression testing.
- **Collaborated closely with product owners and developers** to ensure defect-free releases for core banking modules.`;
  if (content.includes(maveric2Old)) {
    content = content.replace(maveric2Old, maveric2New);
  }

  // 5. Update Skills Table Format (if "Key Skills" or "Skills" is present in standard format)
  // Look for the block of skills. They usually start with "**Automation / QE:**"
  if (content.includes('**Automation / QE:**')) {
    const skillsTable = `
| Category | Technologies & Tools |
| :--- | :--- |
| **Languages** | Java, Kotlin, Dart, TypeScript |
| **Development Frameworks** | Flutter BLoC, Flutter Riverpod, Vite (Front-end) |
| **Automation / QE** | Selenium, Cypress, Playwright, REST Assured, Karate, Bruno, Appium, Winium, BDD Cucumber, Mocha Cypress Tests, Playwright Test, TestNG, Kotlin BDD REST Assured, JUnit, JMeter Groovy |
| **Mobile** | Flutter Development (Mobile, Web), Android Development |
| **Release / DevOps** | App Bundling (APK/AAB), Android Flavors, Azure DevOps & Pipelines, Azure Key Vault, Jenkins, Git/GitHub Actions, CODEOWNERS, Docker, Maven/Gradle |
| **Data / Platform** | SQLite, Drift, Room, Coroutines, Liquibase, MSSQL Test Containers |
| **IDE / Tools** | IntelliJ IDE, Eclipse IDE, Postman, JMeter, Sauce Labs |
| **Domain** | Banking, Lending, Deposits, Customer Onboarding, Mobile Channels, CDD / CRA / Risk Assessment |
`;

    // Regex to match the entire skills block and replace it
    const skillsBlockRegex = /\| \*\*Languages\*\*[\s\S]*?\| \*\*Domain\*\*.*(\n|$)/;
    if(skillsBlockRegex.test(content)) {
        content = content.replace(skillsBlockRegex, skillsTable.trim().replace('| Category | Technologies & Tools |\n| :--- | :--- |\n', '') + '\n');
    }
  }

  // If there's an ATS target skills block:
  if (content.includes('**Languages / Mobile:**')) {
     // similar logic if needed, but the main ones use the standard format.
  }

  fs.writeFileSync(filePath, content);
  console.log(`Updated ${path.basename(filePath)}`);
}

const files = fs.readdirSync(resumesDir);
files.forEach(file => {
  if (file.endsWith('.md')) {
    updateMarkdown(path.join(resumesDir, file));
  }
});
