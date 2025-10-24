import { Message, TextMessage, ImageMessage, DocumentMessage, AudioMessage, VideoMessage, LocationMessage } from './types';
import { ValidationError } from '../client/errors';

function isValidPhoneNumber(phoneNumber: string): boolean {
  return /^\d{10,15}$/.test(phoneNumber.replace(/\D/g, ''));
}

export function validateMessage(message: Message): void {
  if (!isValidPhoneNumber(message.to)) {
    throw new ValidationError('Invalid phone number');
  }
  
  if (!message.messaging_product || message.messaging_product !== 'whatsapp') {
    throw new ValidationError('Invalid messaging product');
  }
  
  if (!message.type) {
    throw new ValidationError('Message type is required');
  }
}

export function validateTextMessage(message: TextMessage): void {
  validateMessage(message);
  
  if (!message.text || !message.text.body) {
    throw new ValidationError('Text message body is required');
  }
  
  if (message.text.body.length > 1024) {
    throw new ValidationError('Text message body must be less than 1024 characters');
  }
}

export function validateImageMessage(message: ImageMessage): void {
  validateMessage(message);
  
  if (!message.image || (!message.image.link && !message.image.id)) {
    throw new ValidationError('Image message requires either link or id');
  }
  
  if (message.image.link && !isValidUrl(message.image.link)) {
    throw new ValidationError('Invalid image URL');
  }
  
  if (message.image.caption && message.image.caption.length > 1024) {
    throw new ValidationError('Image caption must be less than 1024 characters');
  }
}

export function validateDocumentMessage(message: DocumentMessage): void {
  validateMessage(message);
  
  if (!message.document || (!message.document.link && !message.document.id)) {
    throw new ValidationError('Document message requires either link or id');
  }
  
  if (message.document.link && !isValidUrl(message.document.link)) {
    throw new ValidationError('Invalid document URL');
  }
  
  if (message.document.filename && message.document.filename.length > 256) {
    throw new ValidationError('Document filename must be less than 256 characters');
  }
  
  if (message.document.caption && message.document.caption.length > 1024) {
    throw new ValidationError('Document caption must be less than 1024 characters');
  }
}

export function validateAudioMessage(message: AudioMessage): void {
  validateMessage(message);
  
  if (!message.audio || (!message.audio.link && !message.audio.id)) {
    throw new ValidationError('Audio message requires either link or id');
  }
  
  if (message.audio.link && !isValidUrl(message.audio.link)) {
    throw new ValidationError('Invalid audio URL');
  }
}

export function validateVideoMessage(message: VideoMessage): void {
  validateMessage(message);
  
  if (!message.video || (!message.video.link && !message.video.id)) {
    throw new ValidationError('Video message requires either link or id');
  }
  
  if (message.video.link && !isValidUrl(message.video.link)) {
    throw new ValidationError('Invalid video URL');
  }
  
  if (message.video.caption && message.video.caption.length > 1024) {
    throw new ValidationError('Video caption must be less than 1024 characters');
  }
}

export function validateLocationMessage(message: LocationMessage): void {
  validateMessage(message);
  
  if (!message.location || !message.location.longitude || !message.location.latitude) {
    throw new ValidationError('Location message requires longitude and latitude');
  }
  
  if (!isValidLongitude(message.location.longitude)) {
    throw new ValidationError('Invalid longitude value');
  }
  
  if (!isValidLatitude(message.location.latitude)) {
    throw new ValidationError('Invalid latitude value');
  }
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

function isValidLongitude(lon: string): boolean {
  const num = parseFloat(lon);
  return !isNaN(num) && num >= -180 && num <= 180;
}

function isValidLatitude(lat: string): boolean {
  const num = parseFloat(lat);
  return !isNaN(num) && num >= -90 && num <= 90;
}