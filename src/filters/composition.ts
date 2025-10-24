import { FilterTypeMessageFilter, FilterOperator } from './types';

export class MessageFilterComposer {
  private filter: FilterTypeMessageFilter = {};

  from(phone_number: string): MessageFilterComposer {
    this.filter.from = phone_number;
    return this;
  }

  to(phone_number: string): MessageFilterComposer {
    this.filter.to = phone_number;
    return this;
  }

  since(date: string): MessageFilterComposer {
    this.filter.since = date;
    return this;
  }

  before(date: string): MessageFilterComposer {
    this.filter.before = date;
    return this;
  }

  limit(count: number): MessageFilterComposer {
    this.filter.limit = count;
    return this;
  }

  fields(fields: string[]): MessageFilterComposer {
    this.filter.fields = fields;
    return this;
  }

  build(): FilterTypeMessageFilter {
    return { ...this.filter };
  }
}

export class FilterOperatorComposer {
  private operator: FilterOperator = {} as FilterOperator;

  and(filters: FilterTypeMessageFilter[]): FilterOperatorComposer {
    this.operator.AND = filters;
    return this;
  }

  or(filters: FilterTypeMessageFilter[]): FilterOperatorComposer {
    this.operator.OR = filters;
    return this;
  }

  not(filter: FilterTypeMessageFilter): FilterOperatorComposer {
    this.operator.NOT = filter;
    return this;
  }

  build(): FilterOperator {
    return { ...this.operator };
  }
}

// Factory functions
export const filter = () => new MessageFilterComposer();
export const operator = () => new FilterOperatorComposer();
