import { FilterMessage, Callback, SystemUpdate, PhoneNumberChange, IdentityChange, StatusUpdate, ChatOpened, UserPreferences, Call } from './types';

export function isMessage(update: any): update is FilterMessage {
  return update.type && ['text', 'image', 'document', 'audio', 'video', 'location', 'interactive'].includes(update.type);
}

export function isCallback(update: any): update is Callback {
  return update.type === 'callback';
}

export function isSystemUpdate(update: any): update is SystemUpdate {
  return update.type === 'system';
}

export function isPhoneNumberChange(update: any): update is PhoneNumberChange {
  return update.type === 'phone_number_change';
}

export function isIdentityChange(update: any): update is IdentityChange {
  return update.type === 'identity_change';
}

export function isStatusUpdate(update: any): update is StatusUpdate {
  return update.type === 'status';
}

export function isChatOpened(update: any): update is ChatOpened {
  return update.type === 'chat_opened';
}

export function isUserPreferences(update: any): update is UserPreferences {
  return update.type === 'user_preferences';
}

export function isCall(update: any): update is Call {
  return update.type === 'call';
}

export function matchesText(update: FilterMessage, text: string | string[]): boolean {
  if (!isMessage(update)) return false;
  
  if (Array.isArray(text)) {
    return text.some(t => update.text?.body?.includes(t));
  }
  
  return update.text?.body?.includes(text);
}

export function matchesCommand(update: FilterMessage, command: string | string[]): boolean {
  if (!isMessage(update)) return false;
  
  const commands = Array.isArray(command) ? command : [command];
  return commands.some(cmd => update.text?.body?.startsWith(`/${cmd}`) || update.text?.body?.startsWith(`!${cmd}`));
}

export function matchesCallback(update: Callback, callback_data: string | string[]): boolean {
  if (!isCallback(update)) return false;
  
  const data = Array.isArray(callback_data) ? callback_data : [callback_data];
  return data.some(d => update.callback_data?.includes(d));
}

export function matchesFrom(update: any, phone_number: string): boolean {
  return update.from === phone_number;
}

export function matchesTo(update: any, phone_number: string): boolean {
  return update.to === phone_number;
}