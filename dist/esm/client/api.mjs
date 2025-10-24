import { api_version } from '../index.mjs';
export class WhatsAppAPI {
    constructor(access_token) {
        this.base_url = `https://graph.facebook.com/${api_version}`;
        this.access_token = access_token;
    }
    /**
     * Send a message to a recipient
     * @param phone_number_id The phone number ID
     * @param message The message to send
     * @returns Promise resolving to the message response
     */
    async sendMessage(phone_number_id, message) {
        const url = `${this.base_url}/${phone_number_id}/messages`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.access_token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }
    /**
     * Send a template message to a recipient
     * @param phone_number_id The phone number ID
     * @param template The template to send
     * @returns Promise resolving to the message response
     */
    async sendTemplate(phone_number_id, template) {
        const url = `${this.base_url}/${phone_number_id}/messages`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.access_token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(template),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }
    /**
     * Get messages with optional filtering
     * @param phone_number_id The phone number ID
     * @param filter Optional filter criteria
     * @returns Promise resolving to an array of messages
     */
    async getMessages(phone_number_id, filter) {
        let url = `${this.base_url}/${phone_number_id}/messages`;
        if (filter) {
            const params = new URLSearchParams();
            Object.keys(filter).forEach(key => {
                if (filter[key] !== undefined) {
                    params.append(key, filter[key]);
                }
            });
            url += `?${params.toString()}`;
        }
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${this.access_token}`,
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }
    /**
     * Upload media to WhatsApp
     * @param file The file to upload (path or buffer)
     * @param phone_number_id The phone number ID
     * @returns Promise resolving to the media object
     */
    async uploadMedia(file, phone_number_id) {
        const url = `${this.base_url}/${phone_number_id}/media`;
        const formData = new FormData();
        if (typeof file === 'string') {
            // If it's a file path, read the file
            const fs = await import('fs');
            const buffer = fs.readFileSync(file);
            formData.append('file', buffer, file.split('/').pop());
        }
        else {
            // If it's a buffer
            formData.append('file', file, 'file');
        }
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.access_token}`,
            },
            body: formData,
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }
    /**
     * Delete media from WhatsApp
     * @param media_id The ID of the media to delete
     * @returns Promise resolving to success result
     */
    async deleteMedia(media_id) {
        const url = `${this.base_url}/${media_id}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${this.access_token}`,
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }
    /**
     * Create a new flow
     * @param flow The flow to create
     * @returns Promise resolving to the flow response
     */
    async createFlow(flow) {
        const url = `${this.base_url}/whatsapp_business_management/flows`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.access_token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(flow),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }
    /**
     * Get business phone numbers
     * @returns Promise resolving to an array of business phone numbers
     */
    async getBusinessPhoneNumbers() {
        const url = `${this.base_url}/me/phone_numbers`;
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${this.access_token}`,
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }
    /**
     * Get business phone number settings
     * @param phone_number_id The phone number ID
     * @returns Promise resolving to the phone number settings
     */
    async getBusinessPhoneNumberSettings(phone_number_id) {
        const url = `${this.base_url}/${phone_number_id}/whatsapp_business_profile`;
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${this.access_token}`,
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }
    /**
     * Update business phone number settings
     * @param phone_number_id The phone number ID
     * @param settings The settings to update
     * @returns Promise resolving to the updated settings
     */
    async updateBusinessPhoneNumberSettings(phone_number_id, settings) {
        const url = `${this.base_url}/${phone_number_id}/whatsapp_business_profile`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.access_token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(settings),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }
    /**
     * Update display name
     * @param display_name The new display name
     * @returns Promise resolving to success result
     */
    async updateDisplayName(display_name) {
        const url = `${this.base_url}/me/whatsapp_business_profile`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.access_token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ about: { display_name } }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }
    /**
     * Get business account
     * @returns Promise resolving to the business account
     */
    async getBusinessAccount() {
        const url = `${this.base_url}/me`;
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${this.access_token}`,
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }
    /**
     * Register phone number
     * @param phone_number The phone number to register
     * @returns Promise resolving to registration result
     */
    async registerPhoneNumber(phone_number) {
        const url = `${this.base_url}/me/phone_numbers`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.access_token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phone_number }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }
    /**
     * Deregister phone number
     * @param phone_number_id The phone number ID to deregister
     * @returns Promise resolving to deregistration result
     */
    async deregisterPhoneNumber(phone_number_id) {
        const url = `${this.base_url}/${phone_number_id}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${this.access_token}`,
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }
    /**
     * Mark message as read
     * @param message_id The ID of the message to mark as read
     * @param phone_number_id The phone number ID
     * @returns Promise resolving to success result
     */
    async markMessageAsRead(message_id, phone_number_id) {
        const url = `${this.base_url}/${phone_number_id}/messages`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.access_token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                messaging_product: 'whatsapp',
                status: 'read',
                message_id: message_id,
            }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }
    /**
     * Indicate typing status
     * @param phone_number_id The phone number ID
     * @param to The recipient's phone number
     * @returns Promise resolving to success result
     */
    async indicateTyping(phone_number_id, to) {
        const url = `${this.base_url}/${phone_number_id}/messages`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.access_token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                messaging_product: 'whatsapp',
                to: to,
                typing: { status: 'typing' },
            }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }
}
//# sourceMappingURL=api.js.map