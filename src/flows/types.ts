export interface Flow {
  name: string;
  category: string;
  definition: FlowDefinition;
  token: string;
}

export interface FlowDefinition {
  screens: FlowScreen[];
  start_screen: string;
}

export interface FlowScreen {
  name: string;
  title: string;
  subtitle?: string;
  input?: FlowInput;
  actions: FlowAction[];
}

export interface FlowInput {
  type: 'text' | 'number' | 'date' | 'dropdown' | 'checkbox';
  name: string;
  label: string;
  required?: boolean;
  options?: FlowOption[];
}

export interface FlowOption {
  title: string;
  value: string;
}

export interface FlowAction {
  type: 'next' | 'back' | 'submit';
  screen?: string;
}

export interface FlowResponse {
  id: string;
  token: string;
}

export interface FlowCompletion {
  token: string;
  data: any;
  raw: any;
}

export interface FlowRequest {
  token: string;
  screen: string;
  data: any;
  raw: any;
}

export interface FlowRequestHandler {
  handle(request: FlowRequest): Promise<FlowResponse>;
}

export interface FlowRequestCallbackWrapper {
  handle(request: FlowRequest): Promise<FlowResponse>;
  on_init?(request: FlowRequest): void;
  on_data_exchange?(request: FlowRequest): void;
  on_back?(request: FlowRequest): void;
  on_completion?(request: FlowRequest): void;
}

export enum FlowRequestActionType {
  NEXT = 'next',
  BACK = 'back',
  SUBMIT = 'submit'
}