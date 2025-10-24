"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFlowAction = exports.validateFlowInput = exports.validateFlowScreen = exports.validateFlowDefinition = exports.validateFlow = void 0;
const errors_1 = require("../client/errors.cjs");
function validateFlow(flow) {
    if (!flow.name) {
        throw new errors_1.ValidationError('Flow name is required');
    }
    if (!flow.category) {
        throw new errors_1.ValidationError('Flow category is required');
    }
    if (!flow.token) {
        throw new errors_1.ValidationError('Flow token is required');
    }
    if (!flow.definition) {
        throw new errors_1.ValidationError('Flow definition is required');
    }
    validateFlowDefinition(flow.definition);
}
exports.validateFlow = validateFlow;
function validateFlowDefinition(definition) {
    if (!definition.screens || definition.screens.length === 0) {
        throw new errors_1.ValidationError('Flow must have at least one screen');
    }
    if (!definition.start_screen) {
        throw new errors_1.ValidationError('Flow must have a start screen');
    }
    const startScreenExists = definition.screens.some(screen => screen.name === definition.start_screen);
    if (!startScreenExists) {
        throw new errors_1.ValidationError('Start screen does not exist in flow screens');
    }
    definition.screens.forEach(screen => {
        validateFlowScreen(screen);
    });
}
exports.validateFlowDefinition = validateFlowDefinition;
function validateFlowScreen(screen) {
    if (!screen.name) {
        throw new errors_1.ValidationError('Screen name is required');
    }
    if (!screen.title) {
        throw new errors_1.ValidationError('Screen title is required');
    }
    if (!screen.actions || screen.actions.length === 0) {
        throw new errors_1.ValidationError('Screen must have at least one action');
    }
    screen.actions.forEach(action => {
        validateFlowAction(action);
    });
    if (screen.input) {
        validateFlowInput(screen.input);
    }
}
exports.validateFlowScreen = validateFlowScreen;
function validateFlowInput(input) {
    if (!input.name) {
        throw new errors_1.ValidationError('Input name is required');
    }
    if (!input.label) {
        throw new errors_1.ValidationError('Input label is required');
    }
    if (!['text', 'number', 'date', 'dropdown', 'checkbox'].includes(input.type)) {
        throw new errors_1.ValidationError('Invalid input type');
    }
    if (input.type === 'dropdown' && (!input.options || input.options.length === 0)) {
        throw new errors_1.ValidationError('Dropdown input must have at least one option');
    }
    if (input.options) {
        input.options.forEach(option => {
            if (!option.title || !option.value) {
                throw new errors_1.ValidationError('Option must have both title and value');
            }
        });
    }
}
exports.validateFlowInput = validateFlowInput;
function validateFlowAction(action) {
    if (!['next', 'back', 'submit'].includes(action.type)) {
        throw new errors_1.ValidationError('Invalid action type');
    }
    if (action.type === 'next' || action.type === 'back') {
        if (!action.screen) {
            throw new errors_1.ValidationError(`${action.type} action requires a screen`);
        }
    }
}
exports.validateFlowAction = validateFlowAction;
//# sourceMappingURL=validation.js.map