"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhooksHandler = void 0;
const express_1 = __importDefault(require("express"));
class WebhooksHandler {
    constructor() {
        this.messageCallbacks = [];
        this.statusCallbacks = [];
        this.authErrorCallbacks = [];
        this.app = (0, express_1.default)();
        this.app.use(express_1.default.json());
        this.setupRoutes();
    }
    /**
     * Register a callback for incoming messages
     * @param callback Function to handle incoming messages
     */
    onMessage(callback) {
        this.messageCallbacks.push(callback);
    }
    /**
     * Register a callback for message status updates
     * @param callback Function to handle status updates
     */
    onMessageStatus(callback) {
        this.statusCallbacks.push(callback);
    }
    /**
     * Register a callback for authentication errors
     * @param callback Function to handle auth errors
     */
    onAuthError(callback) {
        this.authErrorCallbacks.push(callback);
    }
    /**
     * Verify a webhook request
     * @param mode The verification mode
     * @param token The verification token
     * @param challenge The challenge string
     * @returns The challenge response
     */
    verifyWebhook(mode, token, challenge) {
        return mode === 'subscribe' && token === challenge ? challenge : '';
    }
    /**
     * Handle an incoming webhook request
     * @param req The request object
     * @param res The response object
     */
    handleWebhook(req, res) {
        try {
            const body = req.body;
            if (body.object === 'whatsapp_business_account') {
                if (body.entry && body.entry[0].changes && body.entry[0].changes[0].value.messages) {
                    // Handle incoming messages
                    const messages = body.entry[0].changes[0].value.messages;
                    messages.forEach((message) => {
                        this.messageCallbacks.forEach(callback => callback(message));
                    });
                }
                if (body.entry && body.entry[0].changes && body.entry[0].changes[0].value.statuses) {
                    // Handle status updates
                    const statuses = body.entry[0].changes[0].value.statuses;
                    statuses.forEach((status) => {
                        this.statusCallbacks.forEach(callback => callback(status));
                    });
                }
            }
            res.status(200).send('EVENT_RECEIVED');
        }
        catch (error) {
            this.authErrorCallbacks.forEach(callback => callback(error));
            res.status(500).send('ERROR');
        }
    }
    /**
     * Get the Express app for webhook handling
     * @returns Express application
     */
    getApp() {
        return this.app;
    }
    /**
     * Setup webhook routes
     */
    setupRoutes() {
        this.app.get('/webhook', (req, res) => {
            const mode = req.query['hub.mode'];
            const token = req.query['hub.verify_token'];
            const challenge = req.query['hub.challenge'];
            const verifyToken = process.env.WEBHOOK_VERIFY_TOKEN || 'YOUR_VERIFY_TOKEN';
            if (mode && token) {
                if (mode === 'subscribe' && token === verifyToken) {
                    console.log('WEBHOOK_VERIFIED');
                    res.status(200).send(challenge);
                }
                else {
                    res.status(403).send('Forbidden');
                }
            }
            else {
                res.status(400).send('Bad Request');
            }
        });
        this.app.post('/webhook', (req, res) => {
            this.handleWebhook(req, res);
        });
    }
}
exports.WebhooksHandler = WebhooksHandler;
//# sourceMappingURL=webhooks.js.map