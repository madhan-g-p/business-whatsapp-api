"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTemplateParameter = exports.validateTemplateComponent = exports.validateTemplate = void 0;
const errors_1 = require("../client/errors.cjs");
function validateTemplate(template) {
    if (!template.name) {
        throw new errors_1.ValidationError('Template name is required');
    }
    if (!template.language) {
        throw new errors_1.ValidationError('Template language is required');
    }
    if (template.components) {
        template.components.forEach(component => {
            validateTemplateComponent(component);
        });
    }
}
exports.validateTemplate = validateTemplate;
function validateTemplateComponent(component) {
    if (!component.type) {
        throw new errors_1.ValidationError('Template component type is required');
    }
    if (!['header', 'body', 'button'].includes(component.type)) {
        throw new errors_1.ValidationError('Invalid template component type');
    }
    if (component.parameters) {
        component.parameters.forEach(parameter => {
            validateTemplateParameter(parameter);
        });
    }
}
exports.validateTemplateComponent = validateTemplateComponent;
function validateTemplateParameter(parameter) {
    if (!parameter.type) {
        throw new errors_1.ValidationError('Template parameter type is required');
    }
    if (!['text', 'currency', 'date_time', 'button'].includes(parameter.type)) {
        throw new errors_1.ValidationError('Invalid template parameter type');
    }
    switch (parameter.type) {
        case 'text':
            if (!parameter.text) {
                throw new errors_1.ValidationError('Text parameter requires text value');
            }
            break;
        case 'currency':
            if (!parameter.currency || !parameter.currency.fallback_value) {
                throw new errors_1.ValidationError('Currency parameter requires fallback value');
            }
            break;
        case 'date_time':
            if (!parameter.date_time || !parameter.date_time.fallback_value) {
                throw new errors_1.ValidationError('DateTime parameter requires fallback value');
            }
            break;
        case 'button':
            if (!parameter.button) {
                throw new errors_1.ValidationError('Button parameter requires button object');
            }
            break;
    }
}
exports.validateTemplateParameter = validateTemplateParameter;
//# sourceMappingURL=validation.js.map