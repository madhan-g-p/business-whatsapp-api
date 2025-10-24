import { WhatsAppClient } from '../client/client';
import { HandlerType } from './types';

export function onMessage(filter?: any): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (client: WhatsAppClient, ...args: any[]) {
      const handler: HandlerType = {
        type: 'message',
        filter,
        callback: originalMethod.bind(this, ...args),
      };

      client.addHandler(handler);
    };

    return descriptor;
  };
}

export function onCallback(filter?: any): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (client: WhatsAppClient, ...args: any[]) {
      const handler: HandlerType = {
        type: 'callback',
        filter,
        callback: originalMethod.bind(this, ...args),
      };

      client.addHandler(handler);
    };

    return descriptor;
  };
}

export function onSystem(filter?: any): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (client: WhatsAppClient, ...args: any[]) {
      const handler: HandlerType = {
        type: 'system',
        filter,
        callback: originalMethod.bind(this, ...args),
      };

      client.addHandler(handler);
    };

    return descriptor;
  };
}

export function onPhoneNumberChange(filter?: any): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (client: WhatsAppClient, ...args: any[]) {
      const handler: HandlerType = {
        type: 'phone_number_change',
        filter,
        callback: originalMethod.bind(this, ...args),
      };

      client.addHandler(handler);
    };

    return descriptor;
  };
}

export function onIdentityChange(filter?: any): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (client: WhatsAppClient, ...args: any[]) {
      const handler: HandlerType = {
        type: 'identity_change',
        filter,
        callback: originalMethod.bind(this, ...args),
      };

      client.addHandler(handler);
    };

    return descriptor;
  };
}

export function onStatus(filter?: any): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (client: WhatsAppClient, ...args: any[]) {
      const handler: HandlerType = {
        type: 'status',
        filter,
        callback: originalMethod.bind(this, ...args),
      };

      client.addHandler(handler);
    };

    return descriptor;
  };
}

export function onChatOpened(filter?: any): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (client: WhatsAppClient, ...args: any[]) {
      const handler: HandlerType = {
        type: 'chat_opened',
        filter,
        callback: originalMethod.bind(this, ...args),
      };

      client.addHandler(handler);
    };

    return descriptor;
  };
}

export function onUserPreferences(filter?: any): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (client: WhatsAppClient, ...args: any[]) {
      const handler: HandlerType = {
        type: 'user_preferences',
        filter,
        callback: originalMethod.bind(this, ...args),
      };

      client.addHandler(handler);
    };

    return descriptor;
  };
}

export function onCall(filter?: any): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (client: WhatsAppClient, ...args: any[]) {
      const handler: HandlerType = {
        type: 'call',
        filter,
        callback: originalMethod.bind(this, ...args),
      };

      client.addHandler(handler);
    };

    return descriptor;
  };
}
