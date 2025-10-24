import { BaseUpdate } from './base';

export interface Callback extends BaseUpdate {
  type: 'callback';
  from: string;
  to: string;
  messaging_product: 'whatsapp';
  [key: string]: any;
}

export interface CallbackButton {
  id: string;
  title: string;
  is_quick_reply?: boolean;
}

export interface CallbackData {
  [key: string]: any;
}
