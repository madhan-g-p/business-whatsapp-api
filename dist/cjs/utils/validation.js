"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmail = exports.validateRange = exports.validateMaxLength = exports.validateMinLength = exports.validateRequired = exports.isValidUrl = exports.isValidPhoneNumber = void 0;
const errors_1 = require("../client/errors");
function isValidPhoneNumber(phoneNumber) {
    return /^\d{10,15}$/.test(phoneNumber.replace(/\D/g, ''));
}
exports.isValidPhoneNumber = isValidPhoneNumber;
function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    }
    catch (e) {
        return false;
    }
}
exports.isValidUrl = isValidUrl;
function validateRequired(value, fieldName) {
    if (value === undefined || value === null || value === '') {
        throw new errors_1.ValidationError(`${fieldName} is required`);
    }
}
exports.validateRequired = validateRequired;
function validateMinLength(value, minLength, fieldName) {
    if (value.length < minLength) {
        throw new errors_1.ValidationError(`${fieldName} must be at least ${minLength} characters`);
    }
}
exports.validateMinLength = validateMinLength;
function validateMaxLength(value, maxLength, fieldName) {
    if (value.length > maxLength) {
        throw new errors_1.ValidationError(`${fieldName} must be at most ${maxLength} characters`);
    }
}
exports.validateMaxLength = validateMaxLength;
function validateRange(value, min, max, fieldName) {
    if (value < min || value > max) {
        throw new errors_1.ValidationError(`${fieldName} must be between ${min} and ${max}`);
    }
}
exports.validateRange = validateRange;
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
exports.validateEmail = validateEmail;
//# sourceMappingURL=validation.js.map