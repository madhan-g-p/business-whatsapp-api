import { Template, TemplateParameter, Button, ReplyButton, UrlButton } from './types';
export declare class TemplateBuilder {
    private template;
    name(name: string): TemplateBuilder;
    language(language: string): TemplateBuilder;
    addHeader(parameters: TemplateParameter[]): TemplateBuilder;
    addBody(parameters: TemplateParameter[]): TemplateBuilder;
    addButton(button: Button): TemplateBuilder;
    build(): Template;
}
export declare class TemplateParameterBuilder {
    private parameter;
    text(value: string): TemplateParameterBuilder;
    currency(fallback_value: string, code?: string, amount_1000?: number): TemplateParameterBuilder;
    dateTime(fallback_value: string): TemplateParameterBuilder;
    build(): TemplateParameter;
}
export declare class ReplyButtonBuilder {
    private button;
    id(id: string): ReplyButtonBuilder;
    title(title: string): ReplyButtonBuilder;
    build(): ReplyButton;
}
export declare class UrlButtonBuilder {
    private button;
    url(url: string): UrlButtonBuilder;
    build(): UrlButton;
}
export declare class ButtonBuilder {
    private button;
    reply(reply: ReplyButton): ButtonBuilder;
    url(url: UrlButton): ButtonBuilder;
    build(): Button;
}
export declare const template: () => TemplateBuilder;
export declare const parameter: () => TemplateParameterBuilder;
export declare const replyButton: () => ReplyButtonBuilder;
export declare const urlButton: () => UrlButtonBuilder;
export declare const button: () => ButtonBuilder;
