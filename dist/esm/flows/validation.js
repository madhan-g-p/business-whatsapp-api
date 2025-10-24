import { ValidationError } from '../client/errors';
export function validateFlow(flow) {
    if (!flow.name) {
        throw new ValidationError('Flow name is required');
    }
    if (!flow.category) {
        throw new ValidationError('Flow category is required');
    }
    if (!flow.token) {
        throw new ValidationError('Flow token is required');
    }
    if (!flow.definition) {
        throw new ValidationError('Flow definition is required');
    }
    validateFlowDefinition(flow.definition);
}
export function validateFlowDefinition(definition) {
    if (!definition.screens || definition.screens.length === 0) {
        throw new ValidationError('Flow must have at least one screen');
    }
    if (!definition.start_screen) {
        throw new ValidationError('Flow must have a start screen');
    }
    const startScreenExists = definition.screens.some(screen => screen.name === definition.start_screen);
    if (!startScreenExists) {
        throw new ValidationError('Start screen does not exist in flow screens');
    }
    definition.screens.forEach(screen => {
        validateFlowScreen(screen);
    });
}
export function validateFlowScreen(screen) {
    if (!screen.name) {
        throw new ValidationError('Screen name is required');
    }
    if (!screen.title) {
        throw new ValidationError('Screen title is required');
    }
    if (!screen.actions || screen.actions.length === 0) {
        throw new ValidationError('Screen must have at least one action');
    }
    screen.actions.forEach(action => {
        validateFlowAction(action);
    });
    if (screen.input) {
        validateFlowInput(screen.input);
    }
}
export function validateFlowInput(input) {
    if (!input.name) {
        throw new ValidationError('Input name is required');
    }
    if (!input.label) {
        throw new ValidationError('Input label is required');
    }
    if (!['text', 'number', 'date', 'dropdown', 'checkbox'].includes(input.type)) {
        throw new ValidationError('Invalid input type');
    }
    if (input.type === 'dropdown' && (!input.options || input.options.length === 0)) {
        throw new ValidationError('Dropdown input must have at least one option');
    }
    if (input.options) {
        input.options.forEach(option => {
            if (!option.title || !option.value) {
                throw new ValidationError('Option must have both title and value');
            }
        });
    }
}
export function validateFlowAction(action) {
    if (!['next', 'back', 'submit'].includes(action.type)) {
        throw new ValidationError('Invalid action type');
    }
    if (action.type === 'next' || action.type === 'back') {
        if (!action.screen) {
            throw new ValidationError(`${action.type} action requires a screen`);
        }
    }
}
//# sourceMappingURL=validation.js.map