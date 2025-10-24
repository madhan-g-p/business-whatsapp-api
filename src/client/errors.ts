export class WhatsAppError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'WhatsAppError';
  }
}

export class ValidationError extends WhatsAppError {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends WhatsAppError {
  constructor(message: string) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export class APIError extends WhatsAppError {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'APIError';
  }
}