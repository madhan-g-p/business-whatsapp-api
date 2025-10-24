import { FlowRequest, FlowResponse, FlowRequestHandler, FlowRequestCallbackWrapper } from './types';

export class FlowRequestBuilder {
  private request: FlowRequest = {
    token: '',
    screen: '',
    data: {},
    raw: {}
  };

  token(token: string): FlowRequestBuilder {
    this.request.token = token;
    return this;
  }

  screen(screen: string): FlowRequestBuilder {
    this.request.screen = screen;
    return this;
  }

  data(data: any): FlowRequestBuilder {
    this.request.data = data;
    return this;
  }

  raw(raw: any): FlowRequestBuilder {
    this.request.raw = raw;
    return this;
  }

  build(): FlowRequest {
    if (!this.request.token) {
      throw new Error('Flow request token is required');
    }
    
    if (!this.request.screen) {
      throw new Error('Flow request screen is required');
    }
    
    return { ...this.request };
  }
}

export class FlowResponseBuilder {
  private response: FlowResponse = {
    id: '',
    token: ''
  };

  id(id: string): FlowResponseBuilder {
    this.response.id = id;
    return this;
  }

  token(token: string): FlowResponseBuilder {
    this.response.token = token;
    return this;
  }

  build(): FlowResponse {
    if (!this.response.id) {
      throw new Error('Flow response ID is required');
    }
    
    if (!this.response.token) {
      throw new Error('Flow response token is required');
    }
    
    return { ...this.response };
  }
}

// Factory functions
export const flowRequest = () => new FlowRequestBuilder();
export const flowResponse = () => new FlowResponseBuilder();

// Default handler
export const defaultFlowRequestHandler: FlowRequestHandler = {
  async handle(request: FlowRequest): Promise<FlowResponse> {
    // Default implementation - just return a success response
    return flowResponse()
      .id(`flow_${Date.now()}`)
      .token(request.token)
      .build();
  }
};