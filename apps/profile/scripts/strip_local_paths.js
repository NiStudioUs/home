import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.resolve(__dirname, '../src/content/projects.json');

try {
  const fileData = fs.readFileSync(filePath, 'utf8');
  const projects = JSON.parse(fileData);

  projects.forEach(project => {
    if (project.packages && Array.isArray(project.packages)) {
      project.packages = project.packages.map(pkg => {
        // Create a shallow copy and delete the file property
        const cleanedPkg = { ...pkg };
        delete cleanedPkg.file;
        return cleanedPkg;
      });
    }
  });

  fs.writeFileSync(filePath, JSON.stringify(projects, null, 2));
  console.log('Successfully stripped local paths from projects.json');
} catch (error) {
  console.error('Error stripping local paths:', error);
}
