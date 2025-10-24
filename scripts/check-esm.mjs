// ESM runner to verify the compiled ESM bundle exports
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

(async () => {
  try {
    // Use file:// URL to import ESM files even when package.json has "type": "commonjs"
    const esmPath = path.resolve(__dirname, '../dist/esm/index.mjs');
    const fileUrl = new URL(`file://${esmPath}`).href;
    const pkg = await import(fileUrl);
    console.log('ESM keys:', Object.keys(pkg).slice(0, 40));
    console.log('Has default:', !!pkg.default);
    // Check a known named export
    if (pkg && typeof pkg.createClient !== 'undefined') {
      console.log('createClient is present');
    }
  } catch (err) {
    console.error('Failed to import ESM:', err.message);
  }
})();
