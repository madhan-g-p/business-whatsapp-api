export declare class Authentication {
    private access_token;
    constructor(access_token: string);
    /**
     * Get the access token
     * @returns The access token
     */
    getToken(): string;
    /**
     * Validate the access token
     * @returns Promise resolving to validation result
     */
    validateToken(): Promise<boolean>;
}
