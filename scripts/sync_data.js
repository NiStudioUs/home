const fs = require('fs');
const path = require('path');

const learningDataPath = path.join(__dirname, '../learning/src/data.json');
const homeDataPath = path.join(__dirname, '../assets/data.json');

try {
  const learningData = JSON.parse(fs.readFileSync(learningDataPath, 'utf8'));
  const homeData = JSON.parse(fs.readFileSync(homeDataPath, 'utf8'));

  // Adjust paths to account for the new monorepo layout (/home/learning/...)
  const adjustedApps = learningData.apps.map(app => {
    let newPath = app.path;
    if (newPath.startsWith('./')) {
      newPath = 'learning/' + newPath.slice(2);
    } else if (newPath.startsWith('/')) {
      newPath = 'learning' + newPath;
    }
    return { ...app, path: newPath };
  });

  homeData.learningProjects = adjustedApps;

  fs.writeFileSync(homeDataPath, JSON.stringify(homeData, null, 2));
  console.log('Successfully synced learning projects to home data.json');
} catch (error) {
  console.error('Error syncing data:', error);
  process.exit(1);
}
