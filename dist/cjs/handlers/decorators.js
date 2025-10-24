"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onCall = exports.onUserPreferences = exports.onChatOpened = exports.onStatus = exports.onIdentityChange = exports.onPhoneNumberChange = exports.onSystem = exports.onCallback = exports.onMessage = void 0;
function onMessage(filter) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (client, ...args) {
            const handler = {
                type: 'message',
                filter,
                callback: originalMethod.bind(this, ...args)
            };
            client.addHandler(handler);
        };
        return descriptor;
    };
}
exports.onMessage = onMessage;
function onCallback(filter) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (client, ...args) {
            const handler = {
                type: 'callback',
                filter,
                callback: originalMethod.bind(this, ...args)
            };
            client.addHandler(handler);
        };
        return descriptor;
    };
}
exports.onCallback = onCallback;
function onSystem(filter) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (client, ...args) {
            const handler = {
                type: 'system',
                filter,
                callback: originalMethod.bind(this, ...args)
            };
            client.addHandler(handler);
        };
        return descriptor;
    };
}
exports.onSystem = onSystem;
function onPhoneNumberChange(filter) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (client, ...args) {
            const handler = {
                type: 'phone_number_change',
                filter,
                callback: originalMethod.bind(this, ...args)
            };
            client.addHandler(handler);
        };
        return descriptor;
    };
}
exports.onPhoneNumberChange = onPhoneNumberChange;
function onIdentityChange(filter) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (client, ...args) {
            const handler = {
                type: 'identity_change',
                filter,
                callback: originalMethod.bind(this, ...args)
            };
            client.addHandler(handler);
        };
        return descriptor;
    };
}
exports.onIdentityChange = onIdentityChange;
function onStatus(filter) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (client, ...args) {
            const handler = {
                type: 'status',
                filter,
                callback: originalMethod.bind(this, ...args)
            };
            client.addHandler(handler);
        };
        return descriptor;
    };
}
exports.onStatus = onStatus;
function onChatOpened(filter) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (client, ...args) {
            const handler = {
                type: 'chat_opened',
                filter,
                callback: originalMethod.bind(this, ...args)
            };
            client.addHandler(handler);
        };
        return descriptor;
    };
}
exports.onChatOpened = onChatOpened;
function onUserPreferences(filter) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (client, ...args) {
            const handler = {
                type: 'user_preferences',
                filter,
                callback: originalMethod.bind(this, ...args)
            };
            client.addHandler(handler);
        };
        return descriptor;
    };
}
exports.onUserPreferences = onUserPreferences;
function onCall(filter) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (client, ...args) {
            const handler = {
                type: 'call',
                filter,
                callback: originalMethod.bind(this, ...args)
            };
            client.addHandler(handler);
        };
        return descriptor;
    };
}
exports.onCall = onCall;
//# sourceMappingURL=decorators.js.map