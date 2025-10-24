"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flowCompletion = exports.FlowCompletionBuilder = void 0;
class FlowCompletionBuilder {
    constructor() {
        this.completion = {
            token: '',
            data: {},
            raw: {}
        };
    }
    token(token) {
        this.completion.token = token;
        return this;
    }
    data(data) {
        this.completion.data = data;
        return this;
    }
    raw(raw) {
        this.completion.raw = raw;
        return this;
    }
    build() {
        if (!this.completion.token) {
            throw new Error('Flow completion token is required');
        }
        return { ...this.completion };
    }
}
exports.FlowCompletionBuilder = FlowCompletionBuilder;
// Factory function
const flowCompletion = () => new FlowCompletionBuilder();
exports.flowCompletion = flowCompletion;
//# sourceMappingURL=completion.js.map