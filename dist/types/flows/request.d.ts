import { FlowRequest, FlowResponse, FlowRequestHandler } from './types';
export declare class FlowRequestBuilder {
    private request;
    token(token: string): FlowRequestBuilder;
    screen(screen: string): FlowRequestBuilder;
    data(data: any): FlowRequestBuilder;
    raw(raw: any): FlowRequestBuilder;
    build(): FlowRequest;
}
export declare class FlowResponseBuilder {
    private response;
    id(id: string): FlowResponseBuilder;
    token(token: string): FlowResponseBuilder;
    build(): FlowResponse;
}
export declare const flowRequest: () => FlowRequestBuilder;
export declare const flowResponse: () => FlowResponseBuilder;
export declare const defaultFlowRequestHandler: FlowRequestHandler;
