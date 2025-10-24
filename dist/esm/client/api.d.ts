/// <reference types="node" />
/// <reference types="node" />
export declare class WhatsAppAPI {
    private access_token;
    private base_url;
    constructor(access_token: string);
    /**
     * Send a message to a recipient
     * @param phone_number_id The phone number ID
     * @param message The message to send
     * @returns Promise resolving to the message response
     */
    sendMessage(phone_number_id: string, message: any): Promise<any>;
    /**
     * Send a template message to a recipient
     * @param phone_number_id The phone number ID
     * @param template The template to send
     * @returns Promise resolving to the message response
     */
    sendTemplate(phone_number_id: string, template: any): Promise<any>;
    /**
     * Get messages with optional filtering
     * @param phone_number_id The phone number ID
     * @param filter Optional filter criteria
     * @returns Promise resolving to an array of messages
     */
    getMessages(phone_number_id: string, filter?: any): Promise<any[]>;
    /**
     * Upload media to WhatsApp
     * @param file The file to upload (path or buffer)
     * @param phone_number_id The phone number ID
     * @returns Promise resolving to the media object
     */
    uploadMedia(file: string | Buffer, phone_number_id: string): Promise<any>;
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
    createFlow(flow: any): Promise<any>;
    /**
     * Get business phone numbers
     * @returns Promise resolving to an array of business phone numbers
     */
    getBusinessPhoneNumbers(): Promise<any[]>;
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
     * @param phone_number_id The phone number ID
     * @returns Promise resolving to success result
     */
    markMessageAsRead(message_id: string, phone_number_id: string): Promise<any>;
    /**
     * Indicate typing status
     * @param phone_number_id The phone number ID
     * @param to The recipient's phone number
     * @returns Promise resolving to success result
     */
    indicateTyping(phone_number_id: string, to: string): Promise<any>;
}
