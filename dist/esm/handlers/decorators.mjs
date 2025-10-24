export function onMessage(filter) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (client, ...args) {
            const handler = {
                type: 'message',
                filter,
                callback: originalMethod.bind(this, ...args),
            };
            client.addHandler(handler);
        };
        return descriptor;
    };
}
export function onCallback(filter) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (client, ...args) {
            const handler = {
                type: 'callback',
                filter,
                callback: originalMethod.bind(this, ...args),
            };
            client.addHandler(handler);
        };
        return descriptor;
    };
}
export function onSystem(filter) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (client, ...args) {
            const handler = {
                type: 'system',
                filter,
                callback: originalMethod.bind(this, ...args),
            };
            client.addHandler(handler);
        };
        return descriptor;
    };
}
export function onPhoneNumberChange(filter) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (client, ...args) {
            const handler = {
                type: 'phone_number_change',
                filter,
                callback: originalMethod.bind(this, ...args),
            };
            client.addHandler(handler);
        };
        return descriptor;
    };
}
export function onIdentityChange(filter) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (client, ...args) {
            const handler = {
                type: 'identity_change',
                filter,
                callback: originalMethod.bind(this, ...args),
            };
            client.addHandler(handler);
        };
        return descriptor;
    };
}
export function onStatus(filter) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (client, ...args) {
            const handler = {
                type: 'status',
                filter,
                callback: originalMethod.bind(this, ...args),
            };
            client.addHandler(handler);
        };
        return descriptor;
    };
}
export function onChatOpened(filter) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (client, ...args) {
            const handler = {
                type: 'chat_opened',
                filter,
                callback: originalMethod.bind(this, ...args),
            };
            client.addHandler(handler);
        };
        return descriptor;
    };
}
export function onUserPreferences(filter) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (client, ...args) {
            const handler = {
                type: 'user_preferences',
                filter,
                callback: originalMethod.bind(this, ...args),
            };
            client.addHandler(handler);
        };
        return descriptor;
    };
}
export function onCall(filter) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (client, ...args) {
            const handler = {
                type: 'call',
                filter,
                callback: originalMethod.bind(this, ...args),
            };
            client.addHandler(handler);
        };
        return descriptor;
    };
}
//# sourceMappingURL=decorators.js.map