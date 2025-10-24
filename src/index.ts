// Re-export named exports from sub-modules so ESM consumers can do:
// import WaBAPI, { someUtil } from 'business-whatsapp-api'
export * from './client/index';
export * from './messages/index';
export * from './templates/index';
export * from './flows/index';
export * from './filters/index';
export * from './handlers/index';
export * from './listeners/index';
export * from './utils/index';
// Note: we intentionally do NOT `export * from './types'` here because many
// sub-modules already re-export overlapping type names which would cause
// duplicate-export compile errors. Consumers can import types from the
// sub-module paths or from the package's `./types` entrypoint (see package.json).

// Import modules to build a single aggregated default export for convenience
import * as Client from './client/index';
import * as Messages from './messages/index';
import * as Templates from './templates/index';
import * as Flows from './flows/index';
import * as Filters from './filters/index';
import * as Handlers from './handlers/index';
import * as Listeners from './listeners/index';
import * as Utils from './utils/index';
import * as WaBAPITypes from './types/index';

const defaultExport = {
  ...Client,
  ...Messages,
  ...Templates,
  ...Flows,
  ...Filters,
  ...Handlers,
  ...Listeners,
  ...Utils,
  WaBAPITypes,
};

export default defaultExport;

// Ensure CommonJS consumers using `require('business-whatsapp-api')` get the
// aggregated default object with a .default property for ESM interop
// (so `const pkg = require('business-whatsapp-api')` returns the same shape).
// This block will only run in the CJS build where `module`/`module.exports` exist.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const module: any;
if (typeof module !== 'undefined' && module.exports) {
  // Assign the aggregated object as default and as the module.exports itself
  // This allows:
  //   const pkg = require('business-whatsapp-api');         // gets all named exports
  //   const Main = require('business-whatsapp-api').default; // gets the default
  //   const { subModule } = require('business-whatsapp-api'); // destructure named exports
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  module.exports = defaultExport;
  module.exports.default = defaultExport;
}
