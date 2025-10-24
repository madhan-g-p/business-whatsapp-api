import { WhatsAppClient } from '../client/client';
import { Update } from '../filters';

export interface Listener {
  id: string;
  type: 'message' | 'callback' | 'status' | 'call';
  filter?: any;
  timeout?: number;
  callback: (update: Update) => boolean | Promise<boolean>;
}

export interface MessageListener extends Listener {
  type: 'message';
  callback: (message: any) => boolean | Promise<boolean>;
}

export interface CallbackListener extends Listener {
  type: 'callback';
  callback: (callback: any) => boolean | Promise<boolean>;
}

export interface StatusListener extends Listener {
  type: 'status';
  callback: (status: any) => boolean | Promise<boolean>;
}

export interface CallListener extends Listener {
  type: 'call';
  callback: (call: any) => boolean | Promise<boolean>;
}

export type ListenerType = MessageListener | CallbackListener | StatusListener | CallListener;
