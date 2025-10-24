import { Update } from '../filters';

export interface Handler {
  type: 'message' | 'callback' | 'system' | 'phone_number_change' | 'identity_change' | 'status' | 'chat_opened' | 'user_preferences' | 'call';
  filter?: any;
  callback: (update: Update) => void | Promise<void>;
  priority?: number;
}

export interface MessageHandler extends Handler {
  type: 'message';
  callback: (message: any) => void | Promise<void>;
}

export interface CallbackHandler extends Handler {
  type: 'callback';
  callback: (callback: any) => void | Promise<void>;
}

export interface SystemHandler extends Handler {
  type: 'system';
  callback: (system: any) => void | Promise<void>;
}

export interface PhoneNumberChangeHandler extends Handler {
  type: 'phone_number_change';
  callback: (change: any) => void | Promise<void>;
}

export interface IdentityChangeHandler extends Handler {
  type: 'identity_change';
  callback: (change: any) => void | Promise<void>;
}

export interface StatusHandler extends Handler {
  type: 'status';
  callback: (status: any) => void | Promise<void>;
}

export interface ChatOpenedHandler extends Handler {
  type: 'chat_opened';
  callback: (chat: any) => void | Promise<void>;
}

export interface UserPreferencesHandler extends Handler {
  type: 'user_preferences';
  callback: (preferences: any) => void | Promise<void>;
}

export interface CallHandler extends Handler {
  type: 'call';
  callback: (call: any) => void | Promise<void>;
}

export type HandlerType = MessageHandler | CallbackHandler | SystemHandler | 
                         PhoneNumberChangeHandler | IdentityChangeHandler | 
                         StatusHandler | ChatOpenedHandler | 
                         UserPreferencesHandler | CallHandler;