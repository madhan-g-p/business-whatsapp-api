/// <reference types="node" />
/// <reference types="node" />
import { Message, MessageResponse, MessageFilter } from '../messages';
import { Template } from '../templates';
import { Flow } from '../flows';
import { Handler } from '../handlers';
import { Listener } from '../listeners';
import { BusinessPhoneNumber } from '../types';
export declare class WhatsAppClient {
    private app_id?;
    private app_secret?;
    private phone_number_id;
    private access_token;
    private api;
    private webhooks;
    private auth;
    private handlers;
    private listeners;
    /**
     * Initializes a new WhatsApp client instance
     * @param phone_number_id Your phone number ID
     * @param access_token Your WhatsApp API access token
     * @param app_id Your app ID (for partner solutions)
     * @param app_secret Your app secret (for partner solutions)
     */
    constructor(phone_number_id: string, access_token: string, app_id?: string | undefined, app_secret?: string | undefined);
    /**
     * Send a message to a recipient
     * @param message The message to send
     * @returns Promise resolving to the message response
     */
    sendMessage(message: Message): Promise<MessageResponse>;
    /**
     * Send a template message to a recipient
     * @param template The template to send
     * @returns Promise resolving to the message response
     */
    sendTemplate(template: Template): Promise<MessageResponse>;
    /**
     * Get messages with optional filtering
     * @param filter Optional filter criteria
     * @returns Promise resolving to an array of messages
     */
    getMessages(filter?: MessageFilter): Promise<Message[]>;
    /**
     * Upload media to WhatsApp
     * @param file The file to upload (path or buffer)
     * @param phone_number_id Optional phone number ID (for multi-account setups)
     * @returns Promise resolving to the media object
     */
    uploadMedia(file: string | Buffer, phone_number_id?: string): Promise<any>;
    /**
     * Delete media from WhatsApp
     * @param media_id The ID of the media to delete
     * @returns Promise resolving to success result
     */
    deleteMedia(media_id: string): Promise<any>;
    /**
     * Create a new flow
     * @param flow The flow to create
     * @returns Promise resolving to the flow response
     */
    createFlow(flow: Flow): Promise<any>;
    /**
     * Get business phone numbers
     * @returns Promise resolving to an array of business phone numbers
     */
    getBusinessPhoneNumbers(): Promise<BusinessPhoneNumber[]>;
    /**
     * Get business phone number settings
     * @param phone_number_id The phone number ID
     * @returns Promise resolving to the phone number settings
     */
    getBusinessPhoneNumberSettings(phone_number_id: string): Promise<any>;
    /**
     * Update business phone number settings
     * @param phone_number_id The phone number ID
     * @param settings The settings to update
     * @returns Promise resolving to the updated settings
     */
    updateBusinessPhoneNumberSettings(phone_number_id: string, settings: any): Promise<any>;
    /**
     * Update display name
     * @param display_name The new display name
     * @returns Promise resolving to success result
     */
    updateDisplayName(display_name: string): Promise<any>;
    /**
     * Get business account
     * @returns Promise resolving to the business account
     */
    getBusinessAccount(): Promise<any>;
    /**
     * Register phone number
     * @param phone_number The phone number to register
     * @returns Promise resolving to registration result
     */
    registerPhoneNumber(phone_number: string): Promise<any>;
    /**
     * Deregister phone number
     * @param phone_number_id The phone number ID to deregister
     * @returns Promise resolving to deregistration result
     */
    deregisterPhoneNumber(phone_number_id: string): Promise<any>;
    /**
     * Mark message as read
     * @param message_id The ID of the message to mark as read
     * @param phone_number_id Optional phone number ID
     * @returns Promise resolving to success result
     */
    markMessageAsRead(message_id: string, phone_number_id?: string): Promise<any>;
    /**
     * Indicate typing status
     * @param phone_number_id The phone number ID
     * @param to The recipient's phone number
     * @returns Promise resolving to success result
     */
    indicateTyping(phone_number_id: string, to: string): Promise<any>;
    /**
     * Add a handler for incoming updates
     * @param handler The handler to add
     */
    addHandler(handler: Handler): void;
    /**
     * Add a listener for incoming updates
     * @param listener The listener to add
     */
    addListener(listener: Listener): void;
    /**
     * Register a callback for incoming messages
     * @param callback Function to handle incoming messages
     */
    onMessage(callback: (message: Message) => void): void;
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
    handleWebhook(req: any, res: any): void;
    /**
     * Get all registered handlers
     * @returns Array of handlers
     */
    getHandlers(): Handler[];
    /**
     * Get all registered listeners
     * @returns Array of listeners
     */
    getListeners(): Listener[];
}
