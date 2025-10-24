export class WhatsAppError extends Error {
    constructor(message) {
        super(message);
        this.name = 'WhatsAppError';
    }
}
export class ValidationError extends WhatsAppError {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}
export class AuthenticationError extends WhatsAppError {
    constructor(message) {
        super(message);
        this.name = 'AuthenticationError';
    }
}
export class APIError extends WhatsAppError {
    constructor(message, status) {
        super(message);
        this.status = status;
        this.name = 'APIError';
    }
}
//# sourceMappingURL=errors.js.map