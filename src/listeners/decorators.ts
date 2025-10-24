import { WhatsAppClient } from '../client/client';
import { ListenerType } from './types';

export function waitForReply(filter?: any, timeout?: number): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = function (client: WhatsAppClient, ...args: any[]) {
      const listener: ListenerType = {
        id: `reply_${Date.now()}`,
        type: 'message',
        filter,
        ...(timeout !== undefined ? { timeout } : {}),
        callback: async (update: any) => {
          // Check if this is a reply to the original message
          if (update.reply_to_message && update.reply_to_message.id === args[0].id) {
            return await originalMethod.call(this, update);
          }
          return false;
        }
      };
      
      client.addListener(listener);
    };
    
    return descriptor;
  };
}

export function waitForClick(filter?: any, timeout?: number): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = function (client: WhatsAppClient, ...args: any[]) {
      const listener: ListenerType = {
        id: `click_${Date.now()}`,
        type: 'callback',
        filter,
        ...(timeout !== undefined ? { timeout } : {}),
        callback: async (update: any) => {
          // Check if this is a callback from the original message
          if (update.callback_data && update.callback_data.includes(args[0].callback_data)) {
            return await originalMethod.call(this, update);
          }
          return false;
        }
      };
      
      client.addListener(listener);
    };
    
    return descriptor;
  };
}

export function waitForReaction(filter?: any, timeout?: number): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = function (client: WhatsAppClient, ...args: any[]) {
      const listener: ListenerType = {
        id: `reaction_${Date.now()}`,
        type: 'callback',
        filter,
        ...(timeout !== undefined ? { timeout } : {}),
        callback: async (update: any) => {
          // Check if this is a reaction to the original message
          if (update.reaction && update.reaction.message_id === args[0].id) {
            return await originalMethod.call(this, update);
          }
          return false;
        }
      };
      
      client.addListener(listener);
    };
    
    return descriptor;
  };
}

export function waitForStatus(filter?: any, timeout?: number): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = function (client: WhatsAppClient, ...args: any[]) {
      const listener: ListenerType = {
        id: `status_${Date.now()}`,
        type: 'status',
        filter,
        ...(timeout !== undefined ? { timeout } : {}),
        callback: async (update: any) => {
          // Check if this is a status update for the original message
          if (update.status && update.status.id === args[0].id) {
            return await originalMethod.call(this, update);
          }
          return false;
        }
      };
      
      client.addListener(listener);
    };
    
    return descriptor;
  };
}

export function waitForCall(filter?: any, timeout?: number): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = function (client: WhatsAppClient, ...args: any[]) {
      const listener: ListenerType = {
        id: `call_${Date.now()}`,
        type: 'call',
        filter,
        ...(timeout !== undefined ? { timeout } : {}),
        callback: async (update: any) => {
          // Check if this is a call related to the original message
          if (update.call && update.call.id === args[0].id) {
            return await originalMethod.call(this, update);
          }
          return false;
        }
      };
      
      client.addListener(listener);
    };
    
    return descriptor;
  };
}