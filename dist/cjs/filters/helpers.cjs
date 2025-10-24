"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchesTo = exports.matchesFrom = exports.matchesCallback = exports.matchesCommand = exports.matchesText = exports.isCall = exports.isUserPreferences = exports.isChatOpened = exports.isStatusUpdate = exports.isIdentityChange = exports.isPhoneNumberChange = exports.isSystemUpdate = exports.isCallback = exports.isMessage = void 0;
function isMessage(update) {
    return (update.type &&
        ['text', 'image', 'document', 'audio', 'video', 'location', 'interactive'].includes(update.type));
}
exports.isMessage = isMessage;
function isCallback(update) {
    return update.type === 'callback';
}
exports.isCallback = isCallback;
function isSystemUpdate(update) {
    return update.type === 'system';
}
exports.isSystemUpdate = isSystemUpdate;
function isPhoneNumberChange(update) {
    return update.type === 'phone_number_change';
}
exports.isPhoneNumberChange = isPhoneNumberChange;
function isIdentityChange(update) {
    return update.type === 'identity_change';
}
exports.isIdentityChange = isIdentityChange;
function isStatusUpdate(update) {
    return update.type === 'status';
}
exports.isStatusUpdate = isStatusUpdate;
function isChatOpened(update) {
    return update.type === 'chat_opened';
}
exports.isChatOpened = isChatOpened;
function isUserPreferences(update) {
    return update.type === 'user_preferences';
}
exports.isUserPreferences = isUserPreferences;
function isCall(update) {
    return update.type === 'call';
}
exports.isCall = isCall;
function matchesText(update, text) {
    if (!isMessage(update))
        return false;
    if (Array.isArray(text)) {
        return text.some(t => update.text?.body?.includes(t));
    }
    return update.text?.body?.includes(text);
}
exports.matchesText = matchesText;
function matchesCommand(update, command) {
    if (!isMessage(update))
        return false;
    const commands = Array.isArray(command) ? command : [command];
    return commands.some(cmd => update.text?.body?.startsWith(`/${cmd}`) || update.text?.body?.startsWith(`!${cmd}`));
}
exports.matchesCommand = matchesCommand;
function matchesCallback(update, callback_data) {
    if (!isCallback(update))
        return false;
    const data = Array.isArray(callback_data) ? callback_data : [callback_data];
    return data.some(d => update.callback_data?.includes(d));
}
exports.matchesCallback = matchesCallback;
function matchesFrom(update, phone_number) {
    return update.from === phone_number;
}
exports.matchesFrom = matchesFrom;
function matchesTo(update, phone_number) {
    return update.to === phone_number;
}
exports.matchesTo = matchesTo;
//# sourceMappingURL=helpers.js.map