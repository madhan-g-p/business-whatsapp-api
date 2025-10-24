import { ValidationError } from '../client/errors';
export function validateMessageFilter(filter) {
    if (filter.limit && (filter.limit < 1 || filter.limit > 100)) {
        throw new ValidationError('Limit must be between 1 and 100');
    }
    if (filter.since && filter.before) {
        if (new Date(filter.since) > new Date(filter.before)) {
            throw new ValidationError('Since date must be before before date');
        }
    }
}
export function validateFilterOperator(operator) {
    const keys = Object.keys(operator);
    if (keys.length !== 1) {
        throw new ValidationError('Filter operator must have exactly one key (AND, OR, or NOT)');
    }
    const key = keys[0] || "";
    if (!['AND', 'OR', 'NOT'].includes(key)) {
        throw new ValidationError('Invalid filter operator key');
    }
    if (key === 'AND' || key === 'OR') {
        if (key === 'AND') {
            const list = operator.AND ?? [];
            if (!Array.isArray(list)) {
                throw new ValidationError(`${key} operator must be an array of filters`);
            }
            list.forEach((filter) => {
                validateMessageFilter(filter);
            });
        }
        else {
            const list = operator.OR ?? [];
            if (!Array.isArray(list)) {
                throw new ValidationError(`${key} operator must be an array of filters`);
            }
            list.forEach((filter) => {
                validateMessageFilter(filter);
            });
        }
    }
    else {
        if (key === "NOT") {
            const notFilter = operator.NOT;
            if (!notFilter) {
                throw new ValidationError('NOT operator requires at least one filter');
            }
            validateMessageFilter(notFilter);
        }
    }
}
//# sourceMappingURL=validation.js.map