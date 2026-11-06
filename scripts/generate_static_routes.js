#!/usr/bin/env node

/**
 * generate_static_routes.js
 * 
 * Generates static HTML folders (with route-specific meta, OG tags, canonical URLs,
 * and pre-rendered plain-text fallback content) for every child route in the site.
 * This guarantees HTTP 200 responses to search engines (Googlebot, Bingbot),
 * social cards, and Google Play Console privacy policy checks on GitHub Pages.
 * 
 * Also generates a complete, up-to-date sitemap.xml.
 */

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const dataJsonPath = path.join(repoRoot, 'apps/portfolio/assets/data.json');
const howtoJsonPath = path.join(repoRoot, 'apps/portfolio/assets/howto.json');
const templateHtmlPath = path.join(repoRoot, 'apps/portfolio/web/index.html');
const webSitemapPath = path.join(repoRoot, 'apps/portfolio/web/sitemap.xml');

// Determine target directory (command line arg, or default to apps/portfolio/web)
const targetDir = process.argv[2] 
  ? path.resolve(process.argv[2]) 
  : path.join(repoRoot, 'apps/portfolio/web');

console.log(`Generating static routes for target directory: ${targetDir}`);

if (!fs.existsSync(dataJsonPath)) {
  console.error(`data.json not found at ${dataJsonPath}`);
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(dataJsonPath, 'utf8'));
const howtoData = fs.existsSync(howtoJsonPath) ? JSON.parse(fs.readFileSync(howtoJsonPath, 'utf8')) : { apps: [] };
const actualTemplatePath = fs.existsSync(path.join(targetDir, 'index.html'))
  ? path.join(targetDir, 'index.html')
  : templateHtmlPath;
const templateHtml = fs.readFileSync(actualTemplatePath, 'utf8');

const BASE_URL = 'https://nistudious.github.io/home';
const DEFAULT_IMAGE = `${BASE_URL}/icons/og-image.png`;
const BRAND_TITLE = 'Ni Studio Us';

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function markdownToSimpleHtml(md) {
  if (!md) return '';
  let html = escapeHtml(md);
  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // Inline code
  html = html.replace(/`(.*?)`/g, '<code>$1</code>');
  // Lists
  const lines = html.split('\n');
  let inList = false;
  const resultLines = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('* ') || trimmed.startsWith('- ') || /^\d+\.\s+/.test(trimmed)) {
      if (!inList) {
        resultLines.push('<ul>');
        inList = true;
      }
      const itemContent = trimmed.replace(/^(\*|-|\d+\.)\s+/, '');
      resultLines.push(`<li>${itemContent}</li>`);
    } else {
      if (inList) {
        resultLines.push('</ul>');
        inList = false;
      }
      if (trimmed.length > 0) {
        resultLines.push(`<p>${line}</p>`);
      }
    }
  }
  if (inList) resultLines.push('</ul>');
  return resultLines.join('\n');
}

function createHtmlPage(options) {
  const {
    title,
    description,
    canonicalPath,
    imageUrl,
    staticContentHtml
  } = options;

  let page = templateHtml;

  // Replace Title
  page = page.replace(
    /<title>.*?<\/title>/,
    `<title>${escapeHtml(title)}</title>`
  );

  // Replace Description
  page = page.replace(
    /<meta name="description" content=".*?">/,
    `<meta name="description" content="${escapeHtml(description)}">`
  );

  // Canonical tag
  const canonicalUrl = `${BASE_URL}/${canonicalPath}`.replace(/\/+$/, '');
  if (page.includes('<link rel="canonical"')) {
    page = page.replace(
      /<link rel="canonical" href=".*?">/,
      `<link rel="canonical" href="${canonicalUrl}">`
    );
  } else {
    page = page.replace(
      '</head>',
      `  <link rel="canonical" href="${canonicalUrl}">\n</head>`
    );
  }

  // OpenGraph URL, Title, Description, Image
  page = page.replace(
    /<meta property="og:url" content=".*?">/,
    `<meta property="og:url" content="${canonicalUrl}">`
  );
  page = page.replace(
    /<meta property="og:title" content=".*?">/,
    `<meta property="og:title" content="${escapeHtml(title)}">`
  );
  page = page.replace(
    /<meta property="og:description" content=".*?">/,
    `<meta property="og:description" content="${escapeHtml(description)}">`
  );
  page = page.replace(
    /<meta property="og:image" content=".*?">/,
    `<meta property="og:image" content="${imageUrl || DEFAULT_IMAGE}">`
  );

  // Twitter tags
  page = page.replace(
    /<meta name="twitter:url" content=".*?">/,
    `<meta name="twitter:url" content="${canonicalUrl}">`
  );
  page = page.replace(
    /<meta name="twitter:title" content=".*?">/,
    `<meta name="twitter:title" content="${escapeHtml(title)}">`
  );
  page = page.replace(
    /<meta name="twitter:description" content=".*?">/,
    `<meta name="twitter:description" content="${escapeHtml(description)}">`
  );
  page = page.replace(
    /<meta name="twitter:image" content=".*?">/,
    `<meta name="twitter:image" content="${imageUrl || DEFAULT_IMAGE}">`
  );

  // Inject crawler-visible fallback text inside #static-footer or a dedicated noscript container
  if (staticContentHtml) {
    const staticContainer = `
    <noscript>
      <div style="max-width: 800px; margin: 40px auto; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e1e24;">
        ${staticContentHtml}
      </div>
    </noscript>`;
    page = page.replace('</body>', `${staticContainer}\n</body>`);
  }

  return page;
}

const routesToGenerate = [];

// 1. Sitemap page
routesToGenerate.push({
  route: 'sitemap',
  title: `Sitemap | ${BRAND_TITLE}`,
  description: `Sitemap and page index for ${BRAND_TITLE} apps, guides, privacy policies, and terms.`,
  canonicalPath: 'sitemap',
  imageUrl: DEFAULT_IMAGE,
  staticContentHtml: `
    <h1>Sitemap</h1>
    <p>Index of applications and legal documents published by ${BRAND_TITLE}:</p>
    <ul>
      ${data.apps.map(a => `
        <li>
          <strong>${escapeHtml(a.name)}</strong>
          <ul>
            <li><a href="${BASE_URL}/apps/${a.id}">Overview</a></li>
            <li><a href="${BASE_URL}/apps/${a.id}/how-to">How-to Guide</a></li>
            <li><a href="${BASE_URL}/apps/${a.id}/privacy">Privacy Policy</a></li>
            <li><a href="${BASE_URL}/apps/${a.id}/terms">Terms & Conditions</a></li>
          </ul>
        </li>
      `).join('')}
      <li><a href="${BASE_URL}/howto">Guides & How-To Hub</a></li>
    </ul>
  `
});

// 2. Howto Hub
routesToGenerate.push({
  route: 'howto',
  title: `Guides & How-To Hub | ${BRAND_TITLE}`,
  description: `Step-by-step documentation and feature guides for ${BRAND_TITLE} mobile apps.`,
  canonicalPath: 'howto',
  imageUrl: DEFAULT_IMAGE,
  staticContentHtml: `
    <h1>Guides & How-To Hub</h1>
    <p>Learn how to use features across our private, offline-first mobile apps.</p>
    <ul>
      ${data.apps.map(a => `
        <li><a href="${BASE_URL}/apps/${a.id}/how-to">${escapeHtml(a.name)} Guide</a></li>
      `).join('')}
    </ul>
  `
});

// 3. Per-app routes
for (const app of data.apps) {
  const shortName = app.shortName || app.name.split('—')[0].trim();

  // App Overview
  routesToGenerate.push({
    route: `apps/${app.id}`,
    title: `${app.name} | ${BRAND_TITLE}`,
    description: app.shortDescription || app.fullDescription.slice(0, 160),
    canonicalPath: `apps/${app.id}`,
    imageUrl: DEFAULT_IMAGE,
    staticContentHtml: `
      <h1>${escapeHtml(app.name)}</h1>
      <p><em>${escapeHtml(app.shortDescription || '')}</em></p>
      <p>${escapeHtml(app.fullDescription)}</p>
      <h2>Key Features</h2>
      <ul>
        ${(app.features || []).map(f => `
          <li><strong>${escapeHtml(f.title)}</strong>: ${escapeHtml(f.subtitle || '')}</li>
        `).join('')}
      </ul>
      <p><a href="${BASE_URL}/apps/${app.id}/privacy">Privacy Policy</a> · <a href="${BASE_URL}/apps/${app.id}/terms">Terms & Conditions</a> · <a href="${BASE_URL}/apps/${app.id}/how-to">How-to Guide</a></p>
    `
  });

  // App Privacy Policy
  const privacySectionsHtml = (app.privacyPolicy?.features || []).map(f => {
    return `
      <h2>${escapeHtml(f.title)}</h2>
      ${(f.sections || []).map(s => `
        ${s.title ? `<h3>${escapeHtml(s.title)}</h3>` : ''}
        ${markdownToSimpleHtml(s.content)}
      `).join('')}
    `;
  }).join('');

  routesToGenerate.push({
    route: `apps/${app.id}/privacy`,
    title: `${app.name} – Privacy Policy | ${BRAND_TITLE}`,
    description: `Official Privacy Policy for ${app.name} published by ${BRAND_TITLE}. Offline-first, no tracking, full transparency.`,
    canonicalPath: `apps/${app.id}/privacy`,
    imageUrl: DEFAULT_IMAGE,
    staticContentHtml: `
      <h1>Privacy Policy: ${escapeHtml(app.name)}</h1>
      <p><strong>Published by:</strong> ${BRAND_TITLE}</p>
      ${privacySectionsHtml}
      <hr />
      <p><a href="${BASE_URL}/apps/${app.id}">Back to ${escapeHtml(shortName)}</a> · <a href="${BASE_URL}/">Home</a></p>
    `
  });

  // App Terms & Conditions
  const termsSectionsHtml = (app.termsAndConditions?.features || []).map(f => {
    return `
      <h2>${escapeHtml(f.title)}</h2>
      ${(f.sections || []).map(s => `
        ${s.title ? `<h3>${escapeHtml(s.title)}</h3>` : ''}
        ${markdownToSimpleHtml(s.content)}
      `).join('')}
    `;
  }).join('');

  routesToGenerate.push({
    route: `apps/${app.id}/terms`,
    title: `${app.name} – Terms & Conditions | ${BRAND_TITLE}`,
    description: `Terms & Conditions for using ${app.name} published by ${BRAND_TITLE}.`,
    canonicalPath: `apps/${app.id}/terms`,
    imageUrl: DEFAULT_IMAGE,
    staticContentHtml: `
      <h1>Terms & Conditions: ${escapeHtml(app.name)}</h1>
      <p><strong>Published by:</strong> ${BRAND_TITLE}</p>
      ${termsSectionsHtml}
      <hr />
      <p><a href="${BASE_URL}/apps/${app.id}">Back to ${escapeHtml(shortName)}</a> · <a href="${BASE_URL}/">Home</a></p>
    `
  });

  // App How-To
  routesToGenerate.push({
    route: `apps/${app.id}/how-to`,
    title: `How to use ${shortName} | ${BRAND_TITLE}`,
    description: `Comprehensive setup instructions, features, and tutorials for ${app.name}.`,
    canonicalPath: `apps/${app.id}/how-to`,
    imageUrl: DEFAULT_IMAGE,
    staticContentHtml: `
      <h1>How to use ${escapeHtml(app.name)}</h1>
      <p>${escapeHtml(app.shortDescription || '')}</p>
      <p>Explore full guides and documentation for ${escapeHtml(shortName)}.</p>
      <p><a href="${BASE_URL}/apps/${app.id}">App Details</a> · <a href="${BASE_URL}/apps/${app.id}/privacy">Privacy Policy</a></p>
    `
  });
}

// Write files to targetDir
for (const item of routesToGenerate) {
  const dirPath = path.join(targetDir, item.route);
  fs.mkdirSync(dirPath, { recursive: true });
  const htmlContent = createHtmlPage(item);
  const filePath = path.join(dirPath, 'index.html');
  fs.writeFileSync(filePath, htmlContent, 'utf8');
  console.log(`Generated: ${path.relative(repoRoot, filePath)}`);
}

// Generate sitemap.xml
const today = new Date().toISOString().split('T')[0];
const sitemapUrls = [
  { loc: `${BASE_URL}/`, changefreq: 'weekly', priority: '1.0' },
  { loc: `${BASE_URL}/sitemap`, changefreq: 'monthly', priority: '0.6' },
  { loc: `${BASE_URL}/howto`, changefreq: 'monthly', priority: '0.8' },
];

for (const app of data.apps) {
  sitemapUrls.push({ loc: `${BASE_URL}/apps/${app.id}`, changefreq: 'monthly', priority: '0.9' });
  sitemapUrls.push({ loc: `${BASE_URL}/apps/${app.id}/how-to`, changefreq: 'monthly', priority: '0.8' });
  sitemapUrls.push({ loc: `${BASE_URL}/apps/${app.id}/privacy`, changefreq: 'yearly', priority: '0.5' });
  sitemapUrls.push({ loc: `${BASE_URL}/apps/${app.id}/terms`, changefreq: 'yearly', priority: '0.5' });
}

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

fs.writeFileSync(webSitemapPath, sitemapXml, 'utf8');
console.log(`Updated sitemap.xml at ${path.relative(repoRoot, webSitemapPath)} with ${sitemapUrls.length} URLs.`);

if (targetDir !== path.join(repoRoot, 'apps/portfolio/web')) {
  const targetSitemap = path.join(targetDir, 'sitemap.xml');
  fs.writeFileSync(targetSitemap, sitemapXml, 'utf8');
  console.log(`Also wrote sitemap.xml to ${path.relative(repoRoot, targetSitemap)}`);
}

console.log('Static route generation completed successfully!');
