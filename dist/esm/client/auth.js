import { api_version } from ".";
export class Authentication {
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
            const response = await fetch(`https://graph.facebook.com/${api_version}/me`, {
                headers: {
                    'Authorization': `Bearer ${this.access_token}`
                }
            });
            return response.ok;
        }
        catch (error) {
            return false;
        }
    }
}
//# sourceMappingURL=auth.js.map