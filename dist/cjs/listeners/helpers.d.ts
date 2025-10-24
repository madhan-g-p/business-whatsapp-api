import { WhatsAppClient } from '../client/client';
import { ListenerType } from './types';
import { Update } from '../filters';
export declare function createListener(client: WhatsAppClient, type: ListenerType['type'], filter?: any, timeout?: number, callback?: (update: Update) => boolean | Promise<boolean>): string;
export declare function removeListener(client: WhatsAppClient, id: string): void;
export declare function waitForUpdate(client: WhatsAppClient, type: ListenerType['type'], filter?: any, timeout?: number): Promise<Update>;
