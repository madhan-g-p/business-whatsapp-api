import express, { Request, Response } from 'express';
export declare class WebhooksHandler {
    private app;
    private messageCallbacks;
    private statusCallbacks;
    private authErrorCallbacks;
    constructor();
    /**
     * Register a callback for incoming messages
     * @param callback Function to handle incoming messages
     */
    onMessage(callback: (message: any) => void): void;
    /**
     * Register a callback for message status updates
     * @param callback Function to handle status updates
     */
    onMessageStatus(callback: (status: any) => void): void;
    /**
     * Register a callback for authentication errors
     * @param callback Function to handle auth errors
     */
    onAuthError(callback: (error: any) => void): void;
    /**
     * Verify a webhook request
     * @param mode The verification mode
     * @param token The verification token
     * @param challenge The challenge string
     * @returns The challenge response
     */
    verifyWebhook(mode: string, token: string, challenge: string): string;
    /**
     * Handle an incoming webhook request
     * @param req The request object
     * @param res The response object
     */
    handleWebhook(req: Request, res: Response): void;
    /**
     * Get the Express app for webhook handling
     * @returns Express application
     */
    getApp(): express.Application;
    /**
     * Setup webhook routes
     */
    private setupRoutes;
}
