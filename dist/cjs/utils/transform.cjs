"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.truncateText = exports.formatDateTime = exports.formatDate = exports.toCamelCase = exports.toSnakeCase = void 0;
function toSnakeCase(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
}
exports.toSnakeCase = toSnakeCase;
function toCamelCase(str) {
    return str.replace(/([-_][a-z])/g, group => group.toUpperCase().replace('-', '').replace('_', ''));
}
exports.toCamelCase = toCamelCase;
function formatDate(date) {
    return date.toISOString().split('T')[0];
}
exports.formatDate = formatDate;
function formatDateTime(date) {
    return date.toISOString();
}
exports.formatDateTime = formatDateTime;
function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
        return text;
    }
    return text.substring(0, maxLength - 3) + '...';
}
exports.truncateText = truncateText;
//# sourceMappingURL=transform.js.map