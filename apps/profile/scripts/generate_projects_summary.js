import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcPath = path.resolve(__dirname, '../src/content/projects.json');
const destPath = path.resolve(__dirname, '../src/content/projects_summary.json');

try {
  const fileData = fs.readFileSync(srcPath, 'utf8');
  const projects = JSON.parse(fileData);

  const summary = projects.map(p => ({
    id: p.id,
    name: p.name,
    description: p.description,
    status: p.status,
    version: p.version,
    tags: p.tags,
    githubUrl: p.githubUrl,
    liveUrl: p.liveUrl
  }));

  fs.writeFileSync(destPath, JSON.stringify(summary, null, 2));
  console.log('Successfully generated projects_summary.json');
} catch (error) {
  console.error('Error generating projects summary:', error);
}
