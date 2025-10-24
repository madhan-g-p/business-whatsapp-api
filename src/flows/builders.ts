import { Flow, FlowDefinition, FlowScreen, FlowInput, FlowOption, FlowAction } from './types';

export class FlowBuilder {
  private flow: Flow = {
    name: '',
    category: '',
    definition: {
      screens: [],
      start_screen: ''
    },
    token: ''
  };

  name(name: string): FlowBuilder {
    this.flow.name = name;
    return this;
  }

  category(category: string): FlowBuilder {
    this.flow.category = category;
    return this;
  }

  token(token: string): FlowBuilder {
    this.flow.token = token;
    return this;
  }

  addScreen(screen: FlowScreen): FlowBuilder {
    this.flow.definition.screens.push(screen);
    return this;
  }

  setStartScreen(screenName: string): FlowBuilder {
    this.flow.definition.start_screen = screenName;
    return this;
  }

  build(): Flow {
    if (!this.flow.name) {
      throw new Error('Flow name is required');
    }
    
    if (!this.flow.category) {
      throw new Error('Flow category is required');
    }
    
    if (!this.flow.token) {
      throw new Error('Flow token is required');
    }
    
    if (this.flow.definition.screens.length === 0) {
      throw new Error('Flow must have at least one screen');
    }
    
    if (!this.flow.definition.start_screen) {
      throw new Error('Flow must have a start screen');
    }
    
    return { ...this.flow };
  }
}

export class FlowScreenBuilder {
  private screen: FlowScreen = {
    name: '',
    title: '',
    actions: []
  };

  name(name: string): FlowScreenBuilder {
    this.screen.name = name;
    return this;
  }

  title(title: string): FlowScreenBuilder {
    this.screen.title = title;
    return this;
  }

  subtitle(subtitle: string): FlowScreenBuilder {
    this.screen.subtitle = subtitle;
    return this;
  }

  addInput(input: FlowInput): FlowScreenBuilder {
    if (!this.screen.input) {
      this.screen.input = input;
    } else {
      throw new Error('Screen can only have one input');
    }
    return this;
  }

  addAction(action: FlowAction): FlowScreenBuilder {
    this.screen.actions.push(action);
    return this;
  }

  build(): FlowScreen {
    if (!this.screen.name) {
      throw new Error('Screen name is required');
    }
    
    if (!this.screen.title) {
      throw new Error('Screen title is required');
    }
    
    if (this.screen.actions.length === 0) {
      throw new Error('Screen must have at least one action');
    }
    
    return { ...this.screen };
  }
}

export class FlowInputBuilder {
  private input: FlowInput = {
    type: 'text',
    name: '',
    label: ''
  };

  type(type: 'text' | 'number' | 'date' | 'dropdown' | 'checkbox'): FlowInputBuilder {
    this.input.type = type;
    return this;
  }

  name(name: string): FlowInputBuilder {
    this.input.name = name;
    return this;
  }

  label(label: string): FlowInputBuilder {
    this.input.label = label;
    return this;
  }

  required(required: boolean = true): FlowInputBuilder {
    this.input.required = required;
    return this;
  }

  addOption(option: FlowOption): FlowInputBuilder {
    if (!this.input.options) {
      this.input.options = [];
    }
    this.input.options.push(option);
    return this;
  }

  build(): FlowInput {
    if (!this.input.name) {
      throw new Error('Input name is required');
    }
    
    if (!this.input.label) {
      throw new Error('Input label is required');
    }
    
    if (this.input.type === 'dropdown' && (!this.input.options || this.input.options.length === 0)) {
      throw new Error('Dropdown input must have at least one option');
    }
    
    return { ...this.input };
  }
}

export class FlowOptionBuilder {
  private option: FlowOption = {
    title: '',
    value: ''
  };

  title(title: string): FlowOptionBuilder {
    this.option.title = title;
    return this;
  }

  value(value: string): FlowOptionBuilder {
    this.option.value = value;
    return this;
  }

  build(): FlowOption {
    if (!this.option.title) {
      throw new Error('Option title is required');
    }
    
    if (!this.option.value) {
      throw new Error('Option value is required');
    }
    
    return { ...this.option };
  }
}

export class FlowActionBuilder {
  private action: FlowAction = {
    type: 'next'
  };

  type(type: 'next' | 'back' | 'submit'): FlowActionBuilder {
    this.action.type = type;
    return this;
  }

  screen(screen: string): FlowActionBuilder {
    this.action.screen = screen;
    return this;
  }

  build(): FlowAction {
    if (this.action.type === 'next' || this.action.type === 'back') {
      if (!this.action.screen) {
        throw new Error(`${this.action.type} action requires a screen`);
      }
    }
    
    return { ...this.action };
  }
}

// Factory functions
export const flow = () => new FlowBuilder();
export const screen = () => new FlowScreenBuilder();
export const input = () => new FlowInputBuilder();
export const option = () => new FlowOptionBuilder();
export const action = () => new FlowActionBuilder();