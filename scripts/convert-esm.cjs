const fs = require('fs');
const path = require('path');

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full);
    else if (stat.isFile() && full.endsWith('.js') && !full.endsWith('.d.ts')) {
      const newName = full.replace(/\.js$/, '.mjs');
      try {
        fs.renameSync(full, newName);
        console.log('Renamed', full, '->', newName);
      } catch (err) {
        console.error('Failed to rename', full, err);
      }
    }
  }
}

const target = path.join(__dirname, '..', 'dist', 'esm');
if (!fs.existsSync(target)) {
  console.error('dist/esm not found, run build first');
  process.exit(1);
}
walk(target);
console.log('ESM conversion to .mjs complete');
