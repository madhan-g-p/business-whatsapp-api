export interface Media {
    id: string;
    sha256: string;
    mime_type: string;
    file_size: number;
}
export interface MediaResponse {
    messaging_product: 'whatsapp';
    media: Media;
}
export declare class MediaBuilder {
    private media;
    id(id: string): MediaBuilder;
    sha256(sha256: string): MediaBuilder;
    mimeType(mime_type: string): MediaBuilder;
    fileSize(file_size: number): MediaBuilder;
    build(): Media;
}
export declare const media: () => MediaBuilder;
