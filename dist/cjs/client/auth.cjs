"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authentication = void 0;
const __1 = require("../index.cjs");
class Authentication {
    constructor(access_token) {
        this.access_token = access_token;
    }
    /**
     * Get the access token
     * @returns The access token
     */
    getToken() {
        return this.access_token;
    }
    /**
     * Validate the access token
     * @returns Promise resolving to validation result
     */
    async validateToken() {
        try {
            const response = await fetch(`https://graph.facebook.com/${__1.api_version}/me`, {
                headers: {
                    Authorization: `Bearer ${this.access_token}`,
                },
            });
            return response.ok;
        }
        catch (error) {
            return false;
        }
    }
}
exports.Authentication = Authentication;
//# sourceMappingURL=auth.js.map