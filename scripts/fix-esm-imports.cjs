const fs = require('fs');
const path = require('path');

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full);
    else if (stat.isFile() && (full.endsWith('.js') || full.endsWith('.mjs')) && !full.endsWith('.d.ts')) {
      fixFile(full);
    }
  }
}

function fixFile(file) {
  let src = fs.readFileSync(file, 'utf8');
  
  // Fix bare directory imports first (e.g., from '..' or from '../parent')
  // These need to become from '../index.mjs' or from '../parent/index.mjs'
  src = src.replace(/from\s+(['"])(\.\.?)(?!\/)\1/gm, (m, q) => {
    // Bare .. or . without trailing slash - need to add /index.mjs
    const path_part = m.match(/(['"])(\.\.?)(['"])/)[2]; // Extract .. or .
    return `from ${q}${path_part}/index.mjs${q}`;
  });
  
  // Fix relative imports by adding .mjs extension if not already present
  src = src.replace(/from\s+(['"])(\.\.?\/[^'"]+?)\1/gm, (m, q, p) => {
    // Skip if already has .mjs, .cjs, .json, or .js
    if (/\.[a-zA-Z0-9]+$/.test(p)) {
      return m;
    }
    // Add .mjs extension
    return m.replace(p, p + '.mjs');
  });
  
  fs.writeFileSync(file, src, 'utf8');
  console.log('Fixed ESM imports in', file);
}

const target = path.join(__dirname, '..', 'dist', 'esm');
if (!fs.existsSync(target)) {
  console.error('dist/esm not found, run build first');
  process.exit(1);
}
walk(target);
console.log('ESM import fixes complete');
