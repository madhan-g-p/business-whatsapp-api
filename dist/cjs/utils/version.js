"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Version = exports.FLOW_JSON_VERSION = exports.GRAPH_API_VERSION = void 0;
exports.GRAPH_API_VERSION = '21.0';
exports.FLOW_JSON_VERSION = '7.3';
class Version {
    static get graphApi() {
        return exports.GRAPH_API_VERSION;
    }
    static get flowJson() {
        return exports.FLOW_JSON_VERSION;
    }
    static checkMinGraphApi(version) {
        const current = this.parseVersion(exports.GRAPH_API_VERSION);
        const provided = this.parseVersion(version);
        for (let i = 0; i < Math.min(current.length, provided.length); i++) {
            if (current[i] > provided[i])
                return true;
            if (current[i] < provided[i])
                return false;
        }
        return current.length >= provided.length;
    }
    static checkMinFlowJson(version) {
        const current = this.parseVersion(exports.FLOW_JSON_VERSION);
        const provided = this.parseVersion(version);
        for (let i = 0; i < Math.min(current.length, provided.length); i++) {
            if (current[i] > provided[i])
                return true;
            if (current[i] < provided[i])
                return false;
        }
        return current.length >= provided.length;
    }
    static parseVersion(version) {
        return version.split('.').map(Number);
    }
}
exports.Version = Version;
//# sourceMappingURL=version.js.map