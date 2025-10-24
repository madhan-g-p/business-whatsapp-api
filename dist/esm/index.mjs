// Re-export named exports from sub-modules so ESM consumers can do:
// import WaBAPI, { someUtil } from 'business-whatsapp-api'
export * from './client/index.mjs';
export * from './messages/index.mjs';
export * from './templates/index.mjs';
export * from './flows/index.mjs';
export * from './filters/index.mjs';
export * from './handlers/index.mjs';
export * from './listeners/index.mjs';
export * from './utils/index.mjs';
// Note: we intentionally do NOT `export * from './types.mjs'` here because many
// sub-modules already re-export overlapping type names which would cause
// duplicate-export compile errors. Consumers can import types from the
// sub-module paths or from the package's `./types` entrypoint (see package.json).
// Import modules to build a single aggregated default export for convenience
import * as Client from './client/index.mjs';
import * as Messages from './messages/index.mjs';
import * as Templates from './templates/index.mjs';
import * as Flows from './flows/index.mjs';
import * as Filters from './filters/index.mjs';
import * as Handlers from './handlers/index.mjs';
import * as Listeners from './listeners/index.mjs';
import * as Utils from './utils/index.mjs';
import * as WaBAPITypes from './types/index.mjs';
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
//# sourceMappingURL=index.js.map