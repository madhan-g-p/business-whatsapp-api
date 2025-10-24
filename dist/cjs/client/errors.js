"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIError = exports.AuthenticationError = exports.ValidationError = exports.WhatsAppError = void 0;
class WhatsAppError extends Error {
    constructor(message) {
        super(message);
        this.name = 'WhatsAppError';
    }
}
exports.WhatsAppError = WhatsAppError;
class ValidationError extends WhatsAppError {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}
exports.ValidationError = ValidationError;
class AuthenticationError extends WhatsAppError {
    constructor(message) {
        super(message);
        this.name = 'AuthenticationError';
    }
}
exports.AuthenticationError = AuthenticationError;
class APIError extends WhatsAppError {
    constructor(message, status) {
        super(message);
        this.status = status;
        this.name = 'APIError';
    }
}
exports.APIError = APIError;
//# sourceMappingURL=errors.js.map