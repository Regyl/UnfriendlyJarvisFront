/**
 * Скрипт для скачивания иконок сервисов с Icons8
 * 
 * Использование:
 * node scripts/download-icons.js
 * 
 * Требуется: npm install node-fetch
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const ICONS_DIR = path.join(__dirname, '..', 'public', 'icons');

// Icons8 API endpoints для SVG иконок
const ICONS_CONFIG = [
  { name: 'soundcloud', url: 'https://img.icons8.com/color/96/soundcloud.png' },
  { name: 'steam', url: 'https://img.icons8.com/color/96/steam.png' },
  { name: 'yandex-music', url: 'https://img.icons8.com/color/96/yandex-music.png' },
  { name: 'telegram', url: 'https://img.icons8.com/color/96/telegram-app.png' },
  { name: 'fitbit', url: 'https://img.icons8.com/color/96/fitbit.png' },
  { name: 'strava', url: 'https://img.icons8.com/color/96/strava.png' },
  { name: 'tinkoff', url: 'https://img.icons8.com/color/96/tinkoff.png' },
  { name: 'sber', url: 'https://img.icons8.com/color/96/sberbank.png' }
];

// Для SVG используем другой формат URL
const SVG_URLS = {
  soundcloud: 'https://img.icons8.com/color/96/soundcloud.svg',
  steam: 'https://img.icons8.com/color/96/steam.svg',
  'yandex-music': 'https://img.icons8.com/color/96/yandex-music.svg',
  telegram: 'https://img.icons8.com/color/96/telegram-app.svg',
  fitbit: 'https://img.icons8.com/color/96/fitbit.svg',
  strava: 'https://img.icons8.com/color/96/strava.svg',
  tinkoff: 'https://img.icons8.com/color/96/tinkoff.svg',
  sber: 'https://img.icons8.com/color/96/sberbank.svg'
};

function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // Handle redirect
        return downloadFile(response.headers.location, filepath).then(resolve).catch(reject);
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`✓ Downloaded: ${path.basename(filepath)}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function downloadIcons() {
  // Create icons directory if it doesn't exist
  if (!fs.existsSync(ICONS_DIR)) {
    fs.mkdirSync(ICONS_DIR, { recursive: true });
  }

  console.log('Downloading icons from Icons8...\n');

  for (const config of ICONS_CONFIG) {
    const svgUrl = SVG_URLS[config.name];
    if (!svgUrl) {
      console.log(`⚠ Skipping ${config.name}: SVG URL not found`);
      continue;
    }

    const filepath = path.join(ICONS_DIR, `${config.name}.svg`);
    
    try {
      await downloadFile(svgUrl, filepath);
    } catch (error) {
      console.error(`✗ Failed to download ${config.name}:`, error.message);
      // Try PNG as fallback
      try {
        const pngPath = path.join(ICONS_DIR, `${config.name}.png`);
        await downloadFile(config.url, pngPath);
      } catch (pngError) {
        console.error(`✗ Failed to download PNG fallback for ${config.name}`);
      }
    }
  }

  console.log('\n✓ Download complete!');
  console.log(`Icons saved to: ${ICONS_DIR}`);
}

downloadIcons().catch(console.error);

