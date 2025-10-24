"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Re-export named exports from sub-modules so ESM consumers can do:
// import WaBAPI, { someUtil } from 'business-whatsapp-api'
__exportStar(require("./client/index.cjs"), exports);
__exportStar(require("./messages/index.cjs"), exports);
__exportStar(require("./templates/index.cjs"), exports);
__exportStar(require("./flows/index.cjs"), exports);
__exportStar(require("./filters/index.cjs"), exports);
__exportStar(require("./handlers/index.cjs"), exports);
__exportStar(require("./listeners/index.cjs"), exports);
__exportStar(require("./utils/index.cjs"), exports);
// Note: we intentionally do NOT `export * from './types'` here because many
// sub-modules already re-export overlapping type names which would cause
// duplicate-export compile errors. Consumers can import types from the
// sub-module paths or from the package's `./types` entrypoint (see package.json).
// Import modules to build a single aggregated default export for convenience
const Client = __importStar(require("./client/index.cjs"));
const Messages = __importStar(require("./messages/index.cjs"));
const Templates = __importStar(require("./templates/index.cjs"));
const Flows = __importStar(require("./flows/index.cjs"));
const Filters = __importStar(require("./filters/index.cjs"));
const Handlers = __importStar(require("./handlers/index.cjs"));
const Listeners = __importStar(require("./listeners/index.cjs"));
const Utils = __importStar(require("./utils/index.cjs"));
const WaBAPITypes = __importStar(require("./types/index.cjs"));
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
exports.default = defaultExport;
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