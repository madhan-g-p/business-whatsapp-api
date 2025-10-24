export class FlowBuilder {
    constructor() {
        this.flow = {
            name: '',
            category: '',
            definition: {
                screens: [],
                start_screen: ''
            },
            token: ''
        };
    }
    name(name) {
        this.flow.name = name;
        return this;
    }
    category(category) {
        this.flow.category = category;
        return this;
    }
    token(token) {
        this.flow.token = token;
        return this;
    }
    addScreen(screen) {
        this.flow.definition.screens.push(screen);
        return this;
    }
    setStartScreen(screenName) {
        this.flow.definition.start_screen = screenName;
        return this;
    }
    build() {
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
    constructor() {
        this.screen = {
            name: '',
            title: '',
            actions: []
        };
    }
    name(name) {
        this.screen.name = name;
        return this;
    }
    title(title) {
        this.screen.title = title;
        return this;
    }
    subtitle(subtitle) {
        this.screen.subtitle = subtitle;
        return this;
    }
    addInput(input) {
        if (!this.screen.input) {
            this.screen.input = input;
        }
        else {
            throw new Error('Screen can only have one input');
        }
        return this;
    }
    addAction(action) {
        this.screen.actions.push(action);
        return this;
    }
    build() {
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
    constructor() {
        this.input = {
            type: 'text',
            name: '',
            label: ''
        };
    }
    type(type) {
        this.input.type = type;
        return this;
    }
    name(name) {
        this.input.name = name;
        return this;
    }
    label(label) {
        this.input.label = label;
        return this;
    }
    required(required = true) {
        this.input.required = required;
        return this;
    }
    addOption(option) {
        if (!this.input.options) {
            this.input.options = [];
        }
        this.input.options.push(option);
        return this;
    }
    build() {
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
    constructor() {
        this.option = {
            title: '',
            value: ''
        };
    }
    title(title) {
        this.option.title = title;
        return this;
    }
    value(value) {
        this.option.value = value;
        return this;
    }
    build() {
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
    constructor() {
        this.action = {
            type: 'next'
        };
    }
    type(type) {
        this.action.type = type;
        return this;
    }
    screen(screen) {
        this.action.screen = screen;
        return this;
    }
    build() {
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
//# sourceMappingURL=builders.js.map