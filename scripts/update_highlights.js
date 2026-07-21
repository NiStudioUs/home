const fs = require('fs');
const path = require('path');

const resumesDir = path.join(__dirname, '../apps/profile/public/resumes');

function updateMarkdown(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  const replaceMap = [
    {
      old: "- Built and published Flutter-based Android applications through **Google Play Store**",
      new: "- Engineered and published cross-platform mobile apps (Flutter/Android) and architected a self-hosted Docker ecosystem on Raspberry Pi deploying personal apps alongside Immich, Pi-Hole, and Jellyfin"
    },
    {
      old: "- Built and published Flutter-based Android applications through Google Play Store",
      new: "- Engineered and published cross-platform mobile apps (Flutter/Android) and architected a self-hosted Docker ecosystem on Raspberry Pi deploying personal apps alongside Immich, Pi-Hole, and Jellyfin"
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
    console.log(`Updated highlights in ${path.basename(filePath)}`);
  }
}

const files = fs.readdirSync(resumesDir);
files.forEach(file => {
  if (file.endsWith('.md')) {
    updateMarkdown(path.join(resumesDir, file));
  }
});
