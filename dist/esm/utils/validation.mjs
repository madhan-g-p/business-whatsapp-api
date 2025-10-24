import { ValidationError } from '../client/errors.mjs';
export function isValidPhoneNumber(phoneNumber) {
    return /^\d{10,15}$/.test(phoneNumber.replace(/\D/g, ''));
}
export function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    }
    catch (e) {
        return false;
    }
}
export function validateRequired(value, fieldName) {
    if (value === undefined || value === null || value === '') {
        throw new ValidationError(`${fieldName} is required`);
    }
}
export function validateMinLength(value, minLength, fieldName) {
    if (value.length < minLength) {
        throw new ValidationError(`${fieldName} must be at least ${minLength} characters`);
    }
}
export function validateMaxLength(value, maxLength, fieldName) {
    if (value.length > maxLength) {
        throw new ValidationError(`${fieldName} must be at most ${maxLength} characters`);
    }
}
export function validateRange(value, min, max, fieldName) {
    if (value < min || value > max) {
        throw new ValidationError(`${fieldName} must be between ${min} and ${max}`);
    }
}
export function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
//# sourceMappingURL=validation.js.map