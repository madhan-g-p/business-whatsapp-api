export interface Template {
  name: string;
  language: string;
  components?: TemplateComponent[];
}

export interface TemplateComponent {
  type: 'header' | 'body' | 'button';
  parameters?: TemplateParameter[];
}

export interface TemplateParameter {
  type: 'text' | 'currency' | 'date_time' | 'button';
  text?: string;
  currency?: Currency;
  date_time?: DateTime;
  button?: Button;
}

export interface Currency {
  fallback_value: string;
  code?: string;
  amount_1000?: number;
}

export interface DateTime {
  fallback_value: string;
}

export interface Button {
  type: 'url' | 'reply';
  reply?: ReplyButton;
  url?: UrlButton;
}

export interface ReplyButton {
  id: string;
  title: string;
}

export interface UrlButton {
  url: string;
}

export interface TemplateStatus {
  id: string;
  status: 'APPROVED' | 'PENDING' | 'REJECTED' | 'DISABLED';
  category: string;
  language: string;
  created_at: string;
  updated_at: string;
}

// export interface SentTemplate extends SentMessage {
//   template: {
//     name: string;
//     status: SentTemplateStatus;
//   };
// }

// export enum SentTemplateStatus {
//   PENDING = 'PENDING',
//   SENT = 'SENT',
//   DELIVERED = 'DELIVERED',
//   READ = 'READ',
//   FAILED = 'FAILED'
// }
