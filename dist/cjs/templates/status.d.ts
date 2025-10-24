import { TemplateStatus } from './types';
export declare class TemplateStatusBuilder {
    private status;
    id(id: string): TemplateStatusBuilder;
    setStatus(status: TemplateStatus['status']): TemplateStatusBuilder;
    category(category: string): TemplateStatusBuilder;
    language(language: string): TemplateStatusBuilder;
    createdAt(created_at: string): TemplateStatusBuilder;
    updatedAt(updated_at: string): TemplateStatusBuilder;
    build(): TemplateStatus;
}
export declare const templateStatus: () => TemplateStatusBuilder;
