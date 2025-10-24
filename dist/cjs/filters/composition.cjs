"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.operator = exports.filter = exports.FilterOperatorComposer = exports.MessageFilterComposer = void 0;
class MessageFilterComposer {
    constructor() {
        this.filter = {};
    }
    from(phone_number) {
        this.filter.from = phone_number;
        return this;
    }
    to(phone_number) {
        this.filter.to = phone_number;
        return this;
    }
    since(date) {
        this.filter.since = date;
        return this;
    }
    before(date) {
        this.filter.before = date;
        return this;
    }
    limit(count) {
        this.filter.limit = count;
        return this;
    }
    fields(fields) {
        this.filter.fields = fields;
        return this;
    }
    build() {
        return { ...this.filter };
    }
}
exports.MessageFilterComposer = MessageFilterComposer;
class FilterOperatorComposer {
    constructor() {
        this.operator = {};
    }
    and(filters) {
        this.operator.AND = filters;
        return this;
    }
    or(filters) {
        this.operator.OR = filters;
        return this;
    }
    not(filter) {
        this.operator.NOT = filter;
        return this;
    }
    build() {
        return { ...this.operator };
    }
}
exports.FilterOperatorComposer = FilterOperatorComposer;
// Factory functions
const filter = () => new MessageFilterComposer();
exports.filter = filter;
const operator = () => new FilterOperatorComposer();
exports.operator = operator;
//# sourceMappingURL=composition.js.map