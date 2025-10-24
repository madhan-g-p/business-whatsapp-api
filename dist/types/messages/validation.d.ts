import { Message, TextMessage, ImageMessage, DocumentMessage, AudioMessage, VideoMessage, LocationMessage } from './types';
export declare function validateMessage(message: Message): void;
export declare function validateTextMessage(message: TextMessage): void;
export declare function validateImageMessage(message: ImageMessage): void;
export declare function validateDocumentMessage(message: DocumentMessage): void;
export declare function validateAudioMessage(message: AudioMessage): void;
export declare function validateVideoMessage(message: VideoMessage): void;
export declare function validateLocationMessage(message: LocationMessage): void;
