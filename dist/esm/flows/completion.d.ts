import { FlowCompletion } from './types';
export declare class FlowCompletionBuilder {
    private completion;
    token(token: string): FlowCompletionBuilder;
    data(data: any): FlowCompletionBuilder;
    raw(raw: any): FlowCompletionBuilder;
    build(): FlowCompletion;
}
export declare const flowCompletion: () => FlowCompletionBuilder;
