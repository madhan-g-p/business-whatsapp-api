export class FlowCompletionBuilder {
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
// Factory function
export const flowCompletion = () => new FlowCompletionBuilder();
//# sourceMappingURL=completion.js.map