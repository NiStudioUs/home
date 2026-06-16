const fs = require('fs');
const path = require('path');

const resumesDir = path.join(__dirname, '../apps/profile/public/resumes');

function cleanup(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix Allica duplicate
  const allicaDup = `- Conducted **JMeter performance testing** for Allica Onboarding Microservices and ensured **Security & Compliance with GDPR** for onboarding applications.\n- Conducted **JMeter performance testing** for Allica Onboarding Microservices and ensured **Security & Compliance with GDPR** for onboarding applications.`;
  content = content.replace(allicaDup, `- Conducted **JMeter performance testing** for Allica Onboarding Microservices and ensured **Security & Compliance with GDPR** for onboarding applications.`);

  // Fix Maveric 1 duplicate
  const mav1Dup = `- **Mentored junior engineers** and integrated automated test suites into **CI/CD pipelines**, enabling continuous testing and faster release cadences.\n- **Mentored junior engineers** and integrated automated test suites into **CI/CD pipelines**, enabling continuous testing and faster release cadences.`;
  content = content.replace(mav1Dup, `- **Mentored junior engineers** and integrated automated test suites into **CI/CD pipelines**, enabling continuous testing and faster release cadences.`);

  // Fix Maveric 2 duplicate
  const mav2Dup = `- **Collaborated closely with product owners and developers** to ensure defect-free releases for core banking modules.\n- **Collaborated closely with product owners and developers** to ensure defect-free releases for core banking modules.`;
  content = content.replace(mav2Dup, `- **Collaborated closely with product owners and developers** to ensure defect-free releases for core banking modules.`);

  fs.writeFileSync(filePath, content);
  console.log(`Cleaned up ${path.basename(filePath)}`);
}

const files = fs.readdirSync(resumesDir);
files.forEach(file => {
  if (file.endsWith('.md')) {
    cleanup(path.join(resumesDir, file));
  }
});
