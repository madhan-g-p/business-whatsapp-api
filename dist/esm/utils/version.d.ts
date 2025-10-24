export declare const GRAPH_API_VERSION = "21.0";
export declare const FLOW_JSON_VERSION = "7.3";
export declare class Version {
    static get graphApi(): string;
    static get flowJson(): string;
    static checkMinGraphApi(version: string): boolean;
    static checkMinFlowJson(version: string): boolean;
    private static parseVersion;
}
