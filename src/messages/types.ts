export interface Message {
  to: string;
  messaging_product: 'whatsapp';
  type: 'text' | 'image' | 'document' | 'audio' | 'video' | 'location' | 'interactive';
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

export interface MessageResponse {
  messaging_product: 'whatsapp';
  contacts: Array<{
    input: string;
    wa_id: string;
  }>;
  messages: Array<{
    id: string;
  }>;
}

export interface MessageFilter {
  from?: string;
  to?: string;
  since?: string;
  before?: string;
  limit?: number;
  fields?: string[];
}

export interface SentMessage {
  id: string;
  to: string;
  timestamp: string;
  messaging_product: 'whatsapp';
  [key: string]: any;
}

export interface SentTemplate extends SentMessage {
  template: {
    name: string;
    status: SentTemplateStatus;
  };
}

export enum SentTemplateStatus {
  PENDING = 'PENDING',
  SENT = 'SENT',
  DELIVERED = 'DELIVERED',
  READ = 'READ',
  FAILED = 'FAILED'
}