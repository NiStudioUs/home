const fs = require('fs');
const path = require('path');

const resumesDir = path.join(__dirname, '../apps/profile/public/resumes');

function updateMarkdown(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  const replaceMap = [
    {
      old: "Spearheaded advanced framework architectures, including **Cypress Data Management with State Events** and dynamic API mocking without static fixtures.",
      new: "Engineered advanced TypeScript-based framework architectures, including **Cypress Data Management with State Events** and dynamic API mocking without static fixtures."
    }
  ];

  replaceMap.forEach(({ old: oldText, new: newText }) => {
    if (content.includes(oldText)) {
      content = content.replace(oldText, newText);
      changed = true;
    }
  });

  if (changed) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated experience in ${path.basename(filePath)}`);
  }
}

const files = fs.readdirSync(resumesDir);
files.forEach(file => {
  if (file.endsWith('.md')) {
    updateMarkdown(path.join(resumesDir, file));
  }
});
