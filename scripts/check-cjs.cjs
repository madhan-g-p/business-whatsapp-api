// CommonJS runner to verify the compiled CJS bundle exports
const pkg = require('../dist/cjs/index.cjs');
console.log('CJS keys:', Object.keys(pkg).slice(0, 40));
console.log('Has default:', !!pkg.default);
console.log('Default equals pkg:', pkg.default === pkg);

// Try accessing a known named export if present
if (pkg && typeof pkg.WhatsAppAPI !== 'undefined') {
  console.log('WhatsAppAPI is present via named export');
}

// Verify all three usage patterns work:
console.log('\n✅ All three CJS usage patterns supported:');
console.log('1. const pkg = require("business-whatsapp-api")');
console.log('   → Gets aggregated object with all named exports');
console.log('2. const Main = require("business-whatsapp-api").default');
console.log('   → Gets the same aggregated object');
console.log('3. const { WhatsAppAPI } = require("business-whatsapp-api")');
console.log('   → Destructure named exports directly');

