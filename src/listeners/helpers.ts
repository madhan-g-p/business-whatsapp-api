import { WhatsAppClient } from '../client/client';
import { ListenerType } from './types';
import { Update } from '../filters';

export function createListener(
  client: WhatsAppClient,
  type: ListenerType['type'],
  filter?: any,
  timeout?: number,
  callback?: (update: Update) => boolean | Promise<boolean>
): string {
  const id = `${type}_${Date.now()}`;

  const listener: ListenerType = {
    id,
    type,
    filter,
    ...(timeout !== undefined ? { timeout } : {}),
    callback: callback || (() => true),
  };

  client.addListener(listener);
  return id;
}

export function removeListener(client: WhatsAppClient, id: string): void {
  const listeners = client.getListeners();
  const index = listeners.findIndex(l => l.id === id);

  if (index !== -1) {
    listeners.splice(index, 1);
  }
}

export async function waitForUpdate(
  client: WhatsAppClient,
  type: ListenerType['type'],
  filter?: any,
  timeout?: number
): Promise<Update> {
  return new Promise((resolve, reject) => {
    const id = createListener(client, type, filter, timeout, update => {
      removeListener(client, id);
      resolve(update);
      return true;
    });

    if (timeout) {
      setTimeout(() => {
        removeListener(client, id);
        reject(new Error(`Timeout waiting for ${type} update`));
      }, timeout);
    }
  });
}
