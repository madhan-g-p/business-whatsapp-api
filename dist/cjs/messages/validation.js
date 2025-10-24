"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLocationMessage = exports.validateVideoMessage = exports.validateAudioMessage = exports.validateDocumentMessage = exports.validateImageMessage = exports.validateTextMessage = exports.validateMessage = void 0;
const errors_1 = require("../client/errors");
function isValidPhoneNumber(phoneNumber) {
    return /^\d{10,15}$/.test(phoneNumber.replace(/\D/g, ''));
}
function validateMessage(message) {
    if (!isValidPhoneNumber(message.to)) {
        throw new errors_1.ValidationError('Invalid phone number');
    }
    if (!message.messaging_product || message.messaging_product !== 'whatsapp') {
        throw new errors_1.ValidationError('Invalid messaging product');
    }
    if (!message.type) {
        throw new errors_1.ValidationError('Message type is required');
    }
}
exports.validateMessage = validateMessage;
function validateTextMessage(message) {
    validateMessage(message);
    if (!message.text || !message.text.body) {
        throw new errors_1.ValidationError('Text message body is required');
    }
    if (message.text.body.length > 1024) {
        throw new errors_1.ValidationError('Text message body must be less than 1024 characters');
    }
}
exports.validateTextMessage = validateTextMessage;
function validateImageMessage(message) {
    validateMessage(message);
    if (!message.image || (!message.image.link && !message.image.id)) {
        throw new errors_1.ValidationError('Image message requires either link or id');
    }
    if (message.image.link && !isValidUrl(message.image.link)) {
        throw new errors_1.ValidationError('Invalid image URL');
    }
    if (message.image.caption && message.image.caption.length > 1024) {
        throw new errors_1.ValidationError('Image caption must be less than 1024 characters');
    }
}
exports.validateImageMessage = validateImageMessage;
function validateDocumentMessage(message) {
    validateMessage(message);
    if (!message.document || (!message.document.link && !message.document.id)) {
        throw new errors_1.ValidationError('Document message requires either link or id');
    }
    if (message.document.link && !isValidUrl(message.document.link)) {
        throw new errors_1.ValidationError('Invalid document URL');
    }
    if (message.document.filename && message.document.filename.length > 256) {
        throw new errors_1.ValidationError('Document filename must be less than 256 characters');
    }
    if (message.document.caption && message.document.caption.length > 1024) {
        throw new errors_1.ValidationError('Document caption must be less than 1024 characters');
    }
}
exports.validateDocumentMessage = validateDocumentMessage;
function validateAudioMessage(message) {
    validateMessage(message);
    if (!message.audio || (!message.audio.link && !message.audio.id)) {
        throw new errors_1.ValidationError('Audio message requires either link or id');
    }
    if (message.audio.link && !isValidUrl(message.audio.link)) {
        throw new errors_1.ValidationError('Invalid audio URL');
    }
}
exports.validateAudioMessage = validateAudioMessage;
function validateVideoMessage(message) {
    validateMessage(message);
    if (!message.video || (!message.video.link && !message.video.id)) {
        throw new errors_1.ValidationError('Video message requires either link or id');
    }
    if (message.video.link && !isValidUrl(message.video.link)) {
        throw new errors_1.ValidationError('Invalid video URL');
    }
    if (message.video.caption && message.video.caption.length > 1024) {
        throw new errors_1.ValidationError('Video caption must be less than 1024 characters');
    }
}
exports.validateVideoMessage = validateVideoMessage;
function validateLocationMessage(message) {
    validateMessage(message);
    if (!message.location || !message.location.longitude || !message.location.latitude) {
        throw new errors_1.ValidationError('Location message requires longitude and latitude');
    }
    if (!isValidLongitude(message.location.longitude)) {
        throw new errors_1.ValidationError('Invalid longitude value');
    }
    if (!isValidLatitude(message.location.latitude)) {
        throw new errors_1.ValidationError('Invalid latitude value');
    }
}
exports.validateLocationMessage = validateLocationMessage;
function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    }
    catch (e) {
        return false;
    }
}
function isValidLongitude(lon) {
    const num = parseFloat(lon);
    return !isNaN(num) && num >= -180 && num <= 180;
}
function isValidLatitude(lat) {
    const num = parseFloat(lat);
    return !isNaN(num) && num >= -90 && num <= 90;
}
//# sourceMappingURL=validation.js.map