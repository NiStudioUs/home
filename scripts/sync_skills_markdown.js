const fs = require('fs');
const path = require('path');

const skillsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../apps/profile/src/content/skills.json'), 'utf8'));
const resumesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../apps/profile/src/content/resumes.json'), 'utf8'));

resumesData.forEach(resume => {
  if (!resume.file || resume.skillTypes.length === 0) return;
  const filePath = path.join(__dirname, '../apps/profile/public', resume.file);
  if (!fs.existsSync(filePath)) {
    console.log(`Not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Build the new table
  let table = '| | |\n| --- | --- |\n';
  resume.skillTypes.forEach(catName => {
    const cat = skillsData.categories.find(c => c.name === catName);
    if (cat) {
      table += `| **${cat.name}** | ${cat.skills.join(', ')} |\n`;
    }
  });

  // Regex to match existing markdown table.
  const tableRegex = /\|.*\|\n\| [:\- ]+ \| [:\- ]+ \|\n(\| \*\*.*?\*\* \| .*? \|\n)+/g;
  
  if (tableRegex.test(content)) {
    content = content.replace(tableRegex, table);
    fs.writeFileSync(filePath, content);
    console.log(`Updated table in ${path.basename(filePath)}`);
  } else {
    console.log(`Could not find table in ${path.basename(filePath)}`);
  }
});
