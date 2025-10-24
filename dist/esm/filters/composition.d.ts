import { FilterTypeMessageFilter, FilterOperator } from './types';
export declare class MessageFilterComposer {
    private filter;
    from(phone_number: string): MessageFilterComposer;
    to(phone_number: string): MessageFilterComposer;
    since(date: string): MessageFilterComposer;
    before(date: string): MessageFilterComposer;
    limit(count: number): MessageFilterComposer;
    fields(fields: string[]): MessageFilterComposer;
    build(): FilterTypeMessageFilter;
}
export declare class FilterOperatorComposer {
    private operator;
    and(filters: FilterTypeMessageFilter[]): FilterOperatorComposer;
    or(filters: FilterTypeMessageFilter[]): FilterOperatorComposer;
    not(filter: FilterTypeMessageFilter): FilterOperatorComposer;
    build(): FilterOperator;
}
export declare const filter: () => MessageFilterComposer;
export declare const operator: () => FilterOperatorComposer;
