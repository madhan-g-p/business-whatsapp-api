export declare class WhatsAppError extends Error {
    constructor(message: string);
}
export declare class ValidationError extends WhatsAppError {
    constructor(message: string);
}
export declare class AuthenticationError extends WhatsAppError {
    constructor(message: string);
}
export declare class APIError extends WhatsAppError {
    status?: number | undefined;
    constructor(message: string, status?: number | undefined);
}
