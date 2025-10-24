import { TextMessage, ImageMessage, DocumentMessage, AudioMessage, VideoMessage, LocationMessage } from './types';
export declare class TextMessageBuilder {
    private message;
    to(phone_number: string): TextMessageBuilder;
    body(text: string): TextMessageBuilder;
    build(): TextMessage;
}
export declare class ImageMessageBuilder {
    private message;
    to(phone_number: string): ImageMessageBuilder;
    link(url: string): ImageMessageBuilder;
    caption(text: string): ImageMessageBuilder;
    build(): ImageMessage;
}
export declare class DocumentMessageBuilder {
    private message;
    to(phone_number: string): DocumentMessageBuilder;
    link(url: string): DocumentMessageBuilder;
    filename(name: string): DocumentMessageBuilder;
    caption(text: string): DocumentMessageBuilder;
    build(): DocumentMessage;
}
export declare class AudioMessageBuilder {
    private message;
    to(phone_number: string): AudioMessageBuilder;
    link(url: string): AudioMessageBuilder;
    build(): AudioMessage;
}
export declare class VideoMessageBuilder {
    private message;
    to(phone_number: string): VideoMessageBuilder;
    link(url: string): VideoMessageBuilder;
    caption(text: string): VideoMessageBuilder;
    build(): VideoMessage;
}
export declare class LocationMessageBuilder {
    private message;
    to(phone_number: string): LocationMessageBuilder;
    longitude(lon: string): LocationMessageBuilder;
    latitude(lat: string): LocationMessageBuilder;
    name(name: string): LocationMessageBuilder;
    address(address: string): LocationMessageBuilder;
    build(): LocationMessage;
}
export declare const text: () => TextMessageBuilder;
export declare const image: () => ImageMessageBuilder;
export declare const document: () => DocumentMessageBuilder;
export declare const audio: () => AudioMessageBuilder;
export declare const video: () => VideoMessageBuilder;
export declare const location: () => LocationMessageBuilder;
