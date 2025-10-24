export function isMessage(update) {
    return (update.type &&
        ['text', 'image', 'document', 'audio', 'video', 'location', 'interactive'].includes(update.type));
}
export function isCallback(update) {
    return update.type === 'callback';
}
export function isSystemUpdate(update) {
    return update.type === 'system';
}
export function isPhoneNumberChange(update) {
    return update.type === 'phone_number_change';
}
export function isIdentityChange(update) {
    return update.type === 'identity_change';
}
export function isStatusUpdate(update) {
    return update.type === 'status';
}
export function isChatOpened(update) {
    return update.type === 'chat_opened';
}
export function isUserPreferences(update) {
    return update.type === 'user_preferences';
}
export function isCall(update) {
    return update.type === 'call';
}
export function matchesText(update, text) {
    if (!isMessage(update))
        return false;
    if (Array.isArray(text)) {
        return text.some(t => update.text?.body?.includes(t));
    }
    return update.text?.body?.includes(text);
}
export function matchesCommand(update, command) {
    if (!isMessage(update))
        return false;
    const commands = Array.isArray(command) ? command : [command];
    return commands.some(cmd => update.text?.body?.startsWith(`/${cmd}`) || update.text?.body?.startsWith(`!${cmd}`));
}
export function matchesCallback(update, callback_data) {
    if (!isCallback(update))
        return false;
    const data = Array.isArray(callback_data) ? callback_data : [callback_data];
    return data.some(d => update.callback_data?.includes(d));
}
export function matchesFrom(update, phone_number) {
    return update.from === phone_number;
}
export function matchesTo(update, phone_number) {
    return update.to === phone_number;
}
//# sourceMappingURL=helpers.js.map