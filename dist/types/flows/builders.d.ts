import { Flow, FlowScreen, FlowInput, FlowOption, FlowAction } from './types';
export declare class FlowBuilder {
    private flow;
    name(name: string): FlowBuilder;
    category(category: string): FlowBuilder;
    token(token: string): FlowBuilder;
    addScreen(screen: FlowScreen): FlowBuilder;
    setStartScreen(screenName: string): FlowBuilder;
    build(): Flow;
}
export declare class FlowScreenBuilder {
    private screen;
    name(name: string): FlowScreenBuilder;
    title(title: string): FlowScreenBuilder;
    subtitle(subtitle: string): FlowScreenBuilder;
    addInput(input: FlowInput): FlowScreenBuilder;
    addAction(action: FlowAction): FlowScreenBuilder;
    build(): FlowScreen;
}
export declare class FlowInputBuilder {
    private input;
    type(type: 'text' | 'number' | 'date' | 'dropdown' | 'checkbox'): FlowInputBuilder;
    name(name: string): FlowInputBuilder;
    label(label: string): FlowInputBuilder;
    required(required?: boolean): FlowInputBuilder;
    addOption(option: FlowOption): FlowInputBuilder;
    build(): FlowInput;
}
export declare class FlowOptionBuilder {
    private option;
    title(title: string): FlowOptionBuilder;
    value(value: string): FlowOptionBuilder;
    build(): FlowOption;
}
export declare class FlowActionBuilder {
    private action;
    type(type: 'next' | 'back' | 'submit'): FlowActionBuilder;
    screen(screen: string): FlowActionBuilder;
    build(): FlowAction;
}
export declare const flow: () => FlowBuilder;
export declare const screen: () => FlowScreenBuilder;
export declare const input: () => FlowInputBuilder;
export declare const option: () => FlowOptionBuilder;
export declare const action: () => FlowActionBuilder;
