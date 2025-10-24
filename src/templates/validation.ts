import { Template, TemplateComponent, TemplateParameter } from './types';
import { ValidationError } from '../client/errors';

export function validateTemplate(template: Template): void {
  if (!template.name) {
    throw new ValidationError('Template name is required');
  }

  if (!template.language) {
    throw new ValidationError('Template language is required');
  }

  if (template.components) {
    template.components.forEach(component => {
      validateTemplateComponent(component);
    });
  }
}

export function validateTemplateComponent(component: TemplateComponent): void {
  if (!component.type) {
    throw new ValidationError('Template component type is required');
  }

  if (!['header', 'body', 'button'].includes(component.type)) {
    throw new ValidationError('Invalid template component type');
  }

  if (component.parameters) {
    component.parameters.forEach(parameter => {
      validateTemplateParameter(parameter);
    });
  }
}

export function validateTemplateParameter(parameter: TemplateParameter): void {
  if (!parameter.type) {
    throw new ValidationError('Template parameter type is required');
  }

  if (!['text', 'currency', 'date_time', 'button'].includes(parameter.type)) {
    throw new ValidationError('Invalid template parameter type');
  }

  switch (parameter.type) {
    case 'text':
      if (!parameter.text) {
        throw new ValidationError('Text parameter requires text value');
      }
      break;

    case 'currency':
      if (!parameter.currency || !parameter.currency.fallback_value) {
        throw new ValidationError('Currency parameter requires fallback value');
      }
      break;

    case 'date_time':
      if (!parameter.date_time || !parameter.date_time.fallback_value) {
        throw new ValidationError('DateTime parameter requires fallback value');
      }
      break;

    case 'button':
      if (!parameter.button) {
        throw new ValidationError('Button parameter requires button object');
      }
      break;
  }
}
