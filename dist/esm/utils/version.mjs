export const GRAPH_API_VERSION = '21.0';
export const FLOW_JSON_VERSION = '7.3';
export class Version {
    static get graphApi() {
        return GRAPH_API_VERSION;
    }
    static get flowJson() {
        return FLOW_JSON_VERSION;
    }
    static checkMinGraphApi(version) {
        const current = this.parseVersion(GRAPH_API_VERSION);
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
        const current = this.parseVersion(FLOW_JSON_VERSION);
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
//# sourceMappingURL=version.js.map