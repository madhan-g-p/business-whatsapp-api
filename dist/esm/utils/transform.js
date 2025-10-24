export function toSnakeCase(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
}
export function toCamelCase(str) {
    return str.replace(/([-_][a-z])/g, group => group.toUpperCase()
        .replace('-', '')
        .replace('_', ''));
}
export function formatDate(date) {
    return date.toISOString().split('T')[0];
}
export function formatDateTime(date) {
    return date.toISOString();
}
export function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
        return text;
    }
    return text.substring(0, maxLength - 3) + '...';
}
//# sourceMappingURL=transform.js.map