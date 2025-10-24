const fs = require('fs');
const path = require('path');

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full);
    else if (stat.isFile() && full.endsWith('.cjs')) {
      fixFile(full);
    }
  }
}

function fixFile(file) {
  let src = fs.readFileSync(file, 'utf8');
  
  // Match require("..") or require("../something") or require("./something")
  // This handles all relative require paths
  src = src.replace(/require\((['"])(\.\.?(?:\/[^)'"]+)?)\1\)/g, (m, q, p) => {
    // if already has an extension (.cjs, .js, .json), skip
    if (/\.[a-zA-Z0-9]+$/.test(p)) return `require(${q}${p}${q})`;
    
    // Build candidate paths
    const candidate = path.join(path.dirname(file), p + '.cjs');
    const candidateIndex = path.join(path.dirname(file), p, 'index.cjs');
    
    // Check which file exists
    if (fs.existsSync(candidate)) {
      return `require(${q}${p}.cjs${q})`;
    }
    if (fs.existsSync(candidateIndex)) {
      return `require(${q}${p}/index.cjs${q})`;
    }
    
    // If neither exists, check if this is a parent directory ref
    // (e.g., ".." or "../something/index")
    if (p.endsWith('/index')) {
      // Already has /index, just add .cjs
      return `require(${q}${p}.cjs${q})`;
    }
    
    // Try appending /index.cjs as fallback (for bare .. or ../path refs to parent index)
    const fallbackIndex = path.join(path.dirname(file), p, 'index.cjs');
    if (fs.existsSync(fallbackIndex)) {
      return `require(${q}${p}/index.cjs${q})`;
    }
    
    // If still nothing, assume it needs /index.cjs appended
    return `require(${q}${p}/index.cjs${q})`;
  });
  
  fs.writeFileSync(file, src, 'utf8');
  console.log('Fixed requires in', file);
}

const target = path.join(__dirname, '..', 'dist', 'cjs');
if (!fs.existsSync(target)) {
  console.error('dist/cjs not found, run build first');
  process.exit(1);
}
walk(target);
console.log('Require fixes complete');
