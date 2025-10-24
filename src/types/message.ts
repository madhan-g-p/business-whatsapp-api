import { BaseUpdate } from './base';

export interface Message extends BaseUpdate {
  type: 'text' | 'image' | 'document' | 'audio' | 'video' | 'location' | 'interactive';
  from: string;
  to: string;
  messaging_product: 'whatsapp';
  [key: string]: any;
}

export interface TextMessage extends Message {
  type: 'text';
  text: {
    body: string;
  };
}

export interface ImageMessage extends Message {
  type: 'image';
  image: {
    link?: string;
    caption?: string;
    id?: string;
  };
}

export interface DocumentMessage extends Message {
  type: 'document';
  document: {
    link?: string;
    caption?: string;
    filename?: string;
    id?: string;
  };
}

export interface AudioMessage extends Message {
  type: 'audio';
  audio: {
    link?: string;
    id?: string;
  };
}

export interface VideoMessage extends Message {
  type: 'video';
  video: {
    link?: string;
    caption?: string;
    id?: string;
  };
}

export interface LocationMessage extends Message {
  type: 'location';
  location: {
    longitude: string;
    latitude: string;
    name?: string;
    address?: string;
  };
}

export interface InteractiveMessage extends Message {
  type: 'interactive';
  interactive: {
    type: 'button' | 'list';
    action: any;
    body: {
      text: string;
    };
    header?: {
      type: 'text' | 'image' | 'document' | 'video';
      text?: string;
      link_to_message?: any;
    };
    footer?: {
      text: string;
    };
  };
}
