import { WhatsAppAPI } from './api';
import { WebhooksHandler } from './webhooks';
import { Authentication } from './auth';
import { WhatsAppError } from './errors';
export class WhatsAppClient {
    /**
     * Initializes a new WhatsApp client instance
     * @param phone_number_id Your phone number ID
     * @param access_token Your WhatsApp API access token
     * @param app_id Your app ID (for partner solutions)
     * @param app_secret Your app secret (for partner solutions)
     */
    constructor(phone_number_id, access_token, app_id, app_secret) {
        this.app_id = app_id;
        this.app_secret = app_secret;
        this.handlers = [];
        this.listeners = [];
        this.phone_number_id = phone_number_id;
        this.access_token = access_token;
        this.api = new WhatsAppAPI(access_token);
        this.webhooks = new WebhooksHandler();
        this.auth = new Authentication(this.access_token);
    }
    /**
     * Send a message to a recipient
     * @param message The message to send
     * @returns Promise resolving to the message response
     */
    async sendMessage(message) {
        try {
            return await this.api.sendMessage(this.phone_number_id, message);
        }
        catch (error) {
            throw new WhatsAppError(`Failed to send message: ${error}`);
        }
    }
    /**
     * Send a template message to a recipient
     * @param template The template to send
     * @returns Promise resolving to the message response
     */
    async sendTemplate(template) {
        try {
            return await this.api.sendTemplate(this.phone_number_id, template);
        }
        catch (error) {
            throw new WhatsAppError(`Failed to send template: ${error}`);
        }
    }
    /**
     * Get messages with optional filtering
     * @param filter Optional filter criteria
     * @returns Promise resolving to an array of messages
     */
    async getMessages(filter) {
        try {
            return await this.api.getMessages(this.phone_number_id, filter);
        }
        catch (error) {
            throw new WhatsAppError(`Failed to get messages: ${error}`);
        }
    }
    /**
     * Upload media to WhatsApp
     * @param file The file to upload (path or buffer)
     * @param phone_number_id Optional phone number ID (for multi-account setups)
     * @returns Promise resolving to the media object
     */
    async uploadMedia(file, phone_number_id) {
        try {
            return await this.api.uploadMedia(file, phone_number_id || this.phone_number_id);
        }
        catch (error) {
            throw new WhatsAppError(`Failed to upload media: ${error}`);
        }
    }
    /**
     * Delete media from WhatsApp
     * @param media_id The ID of the media to delete
     * @returns Promise resolving to success result
     */
    async deleteMedia(media_id) {
        try {
            return await this.api.deleteMedia(media_id);
        }
        catch (error) {
            throw new WhatsAppError(`Failed to delete media: ${error}`);
        }
    }
    /**
     * Create a new flow
     * @param flow The flow to create
     * @returns Promise resolving to the flow response
     */
    async createFlow(flow) {
        try {
            return await this.api.createFlow(flow);
        }
        catch (error) {
            throw new WhatsAppError(`Failed to create flow: ${error}`);
        }
    }
    /**
     * Get business phone numbers
     * @returns Promise resolving to an array of business phone numbers
     */
    async getBusinessPhoneNumbers() {
        try {
            return await this.api.getBusinessPhoneNumbers();
        }
        catch (error) {
            throw new WhatsAppError(`Failed to get business phone numbers: ${error}`);
        }
    }
    /**
     * Get business phone number settings
     * @param phone_number_id The phone number ID
     * @returns Promise resolving to the phone number settings
     */
    async getBusinessPhoneNumberSettings(phone_number_id) {
        try {
            return await this.api.getBusinessPhoneNumberSettings(phone_number_id);
        }
        catch (error) {
            throw new WhatsAppError(`Failed to get business phone number settings: ${error}`);
        }
    }
    /**
     * Update business phone number settings
     * @param phone_number_id The phone number ID
     * @param settings The settings to update
     * @returns Promise resolving to the updated settings
     */
    async updateBusinessPhoneNumberSettings(phone_number_id, settings) {
        try {
            return await this.api.updateBusinessPhoneNumberSettings(phone_number_id, settings);
        }
        catch (error) {
            throw new WhatsAppError(`Failed to update business phone number settings: ${error}`);
        }
    }
    /**
     * Update display name
     * @param display_name The new display name
     * @returns Promise resolving to success result
     */
    async updateDisplayName(display_name) {
        try {
            return await this.api.updateDisplayName(display_name);
        }
        catch (error) {
            throw new WhatsAppError(`Failed to update display name: ${error}`);
        }
    }
    /**
     * Get business account
     * @returns Promise resolving to the business account
     */
    async getBusinessAccount() {
        try {
            return await this.api.getBusinessAccount();
        }
        catch (error) {
            throw new WhatsAppError(`Failed to get business account: ${error}`);
        }
    }
    /**
     * Register phone number
     * @param phone_number The phone number to register
     * @returns Promise resolving to registration result
     */
    async registerPhoneNumber(phone_number) {
        try {
            return await this.api.registerPhoneNumber(phone_number);
        }
        catch (error) {
            throw new WhatsAppError(`Failed to register phone number: ${error}`);
        }
    }
    /**
     * Deregister phone number
     * @param phone_number_id The phone number ID to deregister
     * @returns Promise resolving to deregistration result
     */
    async deregisterPhoneNumber(phone_number_id) {
        try {
            return await this.api.deregisterPhoneNumber(phone_number_id);
        }
        catch (error) {
            throw new WhatsAppError(`Failed to deregister phone number: ${error}`);
        }
    }
    /**
     * Mark message as read
     * @param message_id The ID of the message to mark as read
     * @param phone_number_id Optional phone number ID
     * @returns Promise resolving to success result
     */
    async markMessageAsRead(message_id, phone_number_id) {
        try {
            return await this.api.markMessageAsRead(message_id, phone_number_id || this.phone_number_id);
        }
        catch (error) {
            throw new WhatsAppError(`Failed to mark message as read: ${error}`);
        }
    }
    /**
     * Indicate typing status
     * @param phone_number_id The phone number ID
     * @param to The recipient's phone number
     * @returns Promise resolving to success result
     */
    async indicateTyping(phone_number_id, to) {
        try {
            return await this.api.indicateTyping(phone_number_id, to);
        }
        catch (error) {
            throw new WhatsAppError(`Failed to indicate typing: ${error}`);
        }
    }
    /**
     * Add a handler for incoming updates
     * @param handler The handler to add
     */
    addHandler(handler) {
        this.handlers.push(handler);
    }
    /**
     * Add a listener for incoming updates
     * @param listener The listener to add
     */
    addListener(listener) {
        this.listeners.push(listener);
    }
    /**
     * Register a callback for incoming messages
     * @param callback Function to handle incoming messages
     */
    onMessage(callback) {
        this.webhooks.onMessage(callback);
    }
    /**
     * Register a callback for message status updates
     * @param callback Function to handle status updates
     */
    onMessageStatus(callback) {
        this.webhooks.onMessageStatus(callback);
    }
    /**
     * Register a callback for authentication errors
     * @param callback Function to handle auth errors
     */
    onAuthError(callback) {
        this.webhooks.onAuthError(callback);
    }
    /**
     * Verify a webhook request
     * @param mode The verification mode
     * @param token The verification token
     * @param challenge The challenge string
     * @returns The challenge response
     */
    verifyWebhook(mode, token, challenge) {
        return this.webhooks.verifyWebhook(mode, token, challenge);
    }
    /**
     * Handle an incoming webhook request
     * @param req The request object
     * @param res The response object
     */
    handleWebhook(req, res) {
        this.webhooks.handleWebhook(req, res);
    }
    /**
     * Get all registered handlers
     * @returns Array of handlers
     */
    getHandlers() {
        return [...this.handlers];
    }
    /**
     * Get all registered listeners
     * @returns Array of listeners
     */
    getListeners() {
        return [...this.listeners];
    }
}
//# sourceMappingURL=client.js.map