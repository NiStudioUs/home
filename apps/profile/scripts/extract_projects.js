import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectsConfig = [
  {
    id: 'scribble',
    name: 'Scribble: Notes, Diary & Tasks',
    path: '/home/karthik/Development/projects/app/Flutter_notesApp',
    status: 'Published',
    tags: ['Flutter', 'Mobile App', 'Published']
  },
  {
    id: 'sms-stack',
    name: 'SMS Stack',
    path: '/home/karthik/Development/projects/app/sms_stack_manager',
    status: 'Under Internal Testing',
    tags: ['Flutter', 'Utility', 'Beta']
  },
  {
    id: 'iky',
    name: 'IKY',
    path: '/home/karthik/Development/projects/app/people-app-iky-v2',
    status: 'Under Development, client server architecture',
    tags: ['Flutter', 'Node.js', 'Client-Server', 'Fullstack']
  },
  {
    id: 'dev-home',
    name: 'Developer Home',
    path: '/home/karthik/Development/projects/website/home',
    status: 'Hosted but Under Development',
    tags: ['Flutter Web', 'Portfolio']
  },
  {
    id: 'learning-gen-ai',
    name: 'Learning gen-AI',
    path: '/home/karthik/Development/projects/website/learning',
    status: 'React Native, hosted',
    tags: ['React Native', 'Gen-AI']
  }
];

function findMetadataFiles(dir, filesList = []) {
  if (!fs.existsSync(dir)) return filesList;
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    if (file === 'node_modules' || file === '.git' || file === 'build') continue;
    
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findMetadataFiles(filePath, filesList);
    } else if (file === 'pubspec.yaml' || file === 'package.json') {
      filesList.push(filePath);
    }
  }
  return filesList;
}

function parseMetadata(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    if (filePath.endsWith('package.json')) {
      const data = JSON.parse(content);
      return {
        type: 'npm',
        name: data.name,
        description: data.description || '',
        version: data.version,
        dependencies: Object.keys(data.dependencies || {}).concat(Object.keys(data.devDependencies || {})),
        file: filePath
      };
    } else if (filePath.endsWith('pubspec.yaml')) {
      const data = yaml.load(content);
      return {
        type: 'pub',
        name: data.name,
        description: data.description || '',
        version: data.version,
        dependencies: Object.keys(data.dependencies || {}).concat(Object.keys(data.dev_dependencies || {})),
        file: filePath
      };
    }
  } catch (err) {
    console.error(`Error parsing ${filePath}:`, err.message);
  }
  return null;
}

const allProjectsData = projectsConfig.map(project => {
  console.log(`Processing project: ${project.name}`);
  const metadataFiles = findMetadataFiles(project.path);
  
  const parsedFiles = metadataFiles
    .map(parseMetadata)
    .filter(data => data !== null)
    .map(data => ({
      ...data,
      relativePath: path.relative(project.path, data.file)
    }));

  // Find root config
  const rootConfig = parsedFiles.find(f => f.relativePath === 'pubspec.yaml' || f.relativePath === 'package.json');
  
  // Get all unique dependencies
  const allDeps = new Set();
  parsedFiles.forEach(f => {
    f.dependencies.forEach(d => allDeps.add(d));
  });

  return {
    ...project,
    description: rootConfig ? rootConfig.description : '',
    version: rootConfig ? rootConfig.version : '1.0.0',
    packages: parsedFiles,
    techStack: Array.from(allDeps)
  };
});

const contentDir = path.join(__dirname, '..', 'src', 'content');
if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true });
}

fs.writeFileSync(
  path.join(contentDir, 'projects.json'), 
  JSON.stringify(allProjectsData, null, 2)
);

console.log('Successfully extracted project metadata to src/content/projects.json');
