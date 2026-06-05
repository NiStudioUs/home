const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const config = [
  {
    "file": "Diaries - List.png",
    "newName": "playstore_screen-5-diaries-list.png",
    "title": "Digital Diary",
    "subtitle": "Keep a daily journal of your thoughts with a clean list view."
  },
  {
    "file": "Diaries - PageView.png",
    "newName": "playstore_screen-5-diaries-pageview.png",
    "title": "Book-Like Reading",
    "subtitle": "Flip through your memories just like a real physical book."
  },
  {
    "file": "Diaries - Timeline view.png",
    "newName": "playstore_screen-5-diaries-timeline.png",
    "title": "Timeline Viewer",
    "subtitle": "Scroll through your life's events in a beautiful timeline."
  },
  {
    "file": "Habit - Calendar and Logs.png",
    "newName": "playstore_screen-6-habit-tracker.png",
    "title": "Habit Tracker",
    "subtitle": "Build daily routines and maintain your streaks securely."
  },
  {
    "file": "New Speed Dial for Quick creations.png",
    "newName": "playstore_screen-1-home-speed-dial.png",
    "title": "Quick Capture",
    "subtitle": "Instantly create notes, logs, or habits from anywhere."
  },
  {
    "file": "Note - MD Style Table View.png",
    "newName": "playstore_screen-4-edit-markdown-tables.png",
    "title": "Rich Markdown Tables",
    "subtitle": "Organize detailed data with ease using Markdown tables."
  },
  {
    "file": "Search - New UI.png",
    "newName": "playstore_screen-1-home-search-ui.png",
    "title": "Lightning Fast Search",
    "subtitle": "Powerful new search interface to find what you need."
  },
  {
    "file": "Search - Results.png",
    "newName": "playstore_screen-1-home-search-results.png",
    "title": "Find It Instantly",
    "subtitle": "Advanced search filtering across all your folders and tags."
  },
  {
    "file": "Folders.png",
    "newName": "playstore_screen-2-folders-new.png",
    "title": "Powerful Organization",
    "subtitle": "Neatly arrange your notes with nested folders and tags."
  },
  {
    "file": "Settings - New Manage tags.png",
    "newName": "playstore_screen-3-settings-manage-tags.png",
    "title": "Effortless Tagging",
    "subtitle": "Categorize and filter across all your content seamlessly."
  },
  {
    "file": "Settings - New Font.png",
    "newName": "playstore_screen-3-settings-font.png",
    "title": "Custom Typography",
    "subtitle": "Tailor your writing experience with custom font styles."
  },
  {
    "file": "Settings - New UI.png",
    "newName": "playstore_screen-3-settings-new-ui.png",
    "title": "Refined Settings",
    "subtitle": "Total control over your app's behavior and appearance."
  }
];

const inputDir = '/home/karthik/Downloads/New assests for app1';
const outputDir = '/home/karthik/Development/projects/website/home/assets-ext/app1/images';

(async () => {
  const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });
  
  const templateHtml = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8');

  // Load the template once
  await page.setContent(templateHtml, { waitUntil: 'networkidle0' });

  for (const item of config) {
    const inputPath = path.join(inputDir, item.file);
    const outputPath = path.join(outputDir, item.newName);

    if (!fs.existsSync(inputPath)) {
      console.warn(`Warning: Could not find ${inputPath}`);
      continue;
    }
    const imageBase64 = fs.readFileSync(inputPath).toString('base64');
    const imageSrc = `data:image/png;base64,${imageBase64}`;

    console.log(`Processing: ${item.file} -> ${item.newName}`);

    await page.evaluate((title, subtitle, src) => {
        document.getElementById('titleText').textContent = title;
        document.getElementById('subtitleText').textContent = subtitle;
        document.getElementById('screenshotImage').src = src;
    }, item.title, item.subtitle, imageSrc);

    // Wait a brief moment for the img tag to decode and render the base64 source
    await new Promise(resolve => setTimeout(resolve, 500));

    await page.screenshot({ path: outputPath });
    console.log(`Saved ${outputPath}`);
  }

  await browser.close();
  console.log('All done!');
})();
