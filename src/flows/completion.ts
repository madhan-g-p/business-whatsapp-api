import { FlowCompletion, FlowRequest } from './types';

export class FlowCompletionBuilder {
  private completion: FlowCompletion = {
    token: '',
    data: {},
    raw: {}
  };

  token(token: string): FlowCompletionBuilder {
    this.completion.token = token;
    return this;
  }

  data(data: any): FlowCompletionBuilder {
    this.completion.data = data;
    return this;
  }

  raw(raw: any): FlowCompletionBuilder {
    this.completion.raw = raw;
    return this;
  }

  build(): FlowCompletion {
    if (!this.completion.token) {
      throw new Error('Flow completion token is required');
    }
    
    return { ...this.completion };
  }
}

// Factory function
export const flowCompletion = () => new FlowCompletionBuilder();