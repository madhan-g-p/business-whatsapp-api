"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultFlowRequestHandler = exports.flowResponse = exports.flowRequest = exports.FlowResponseBuilder = exports.FlowRequestBuilder = void 0;
class FlowRequestBuilder {
    constructor() {
        this.request = {
            token: '',
            screen: '',
            data: {},
            raw: {}
        };
    }
    token(token) {
        this.request.token = token;
        return this;
    }
    screen(screen) {
        this.request.screen = screen;
        return this;
    }
    data(data) {
        this.request.data = data;
        return this;
    }
    raw(raw) {
        this.request.raw = raw;
        return this;
    }
    build() {
        if (!this.request.token) {
            throw new Error('Flow request token is required');
        }
        if (!this.request.screen) {
            throw new Error('Flow request screen is required');
        }
        return { ...this.request };
    }
}
exports.FlowRequestBuilder = FlowRequestBuilder;
class FlowResponseBuilder {
    constructor() {
        this.response = {
            id: '',
            token: ''
        };
    }
    id(id) {
        this.response.id = id;
        return this;
    }
    token(token) {
        this.response.token = token;
        return this;
    }
    build() {
        if (!this.response.id) {
            throw new Error('Flow response ID is required');
        }
        if (!this.response.token) {
            throw new Error('Flow response token is required');
        }
        return { ...this.response };
    }
}
exports.FlowResponseBuilder = FlowResponseBuilder;
// Factory functions
const flowRequest = () => new FlowRequestBuilder();
exports.flowRequest = flowRequest;
const flowResponse = () => new FlowResponseBuilder();
exports.flowResponse = flowResponse;
// Default handler
exports.defaultFlowRequestHandler = {
    async handle(request) {
        // Default implementation - just return a success response
        return (0, exports.flowResponse)()
            .id(`flow_${Date.now()}`)
            .token(request.token)
            .build();
    }
};
//# sourceMappingURL=request.js.map