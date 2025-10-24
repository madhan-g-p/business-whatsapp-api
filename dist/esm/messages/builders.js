export class TextMessageBuilder {
    constructor() {
        this.message = {
            messaging_product: 'whatsapp',
            type: 'text',
            text: { body: '' },
            to: ''
        };
    }
    to(phone_number) {
        this.message.to = phone_number;
        return this;
    }
    body(text) {
        this.message.text.body = text;
        return this;
    }
    build() {
        return { ...this.message };
    }
}
export class ImageMessageBuilder {
    constructor() {
        this.message = {
            messaging_product: 'whatsapp',
            type: 'image',
            image: {},
            to: ''
        };
    }
    to(phone_number) {
        this.message.to = phone_number;
        return this;
    }
    link(url) {
        this.message.image.link = url;
        return this;
    }
    caption(text) {
        this.message.image.caption = text;
        return this;
    }
    build() {
        return { ...this.message };
    }
}
export class DocumentMessageBuilder {
    constructor() {
        this.message = {
            messaging_product: 'whatsapp',
            type: 'document',
            document: {},
            to: ''
        };
    }
    to(phone_number) {
        this.message.to = phone_number;
        return this;
    }
    link(url) {
        this.message.document.link = url;
        return this;
    }
    filename(name) {
        this.message.document.filename = name;
        return this;
    }
    caption(text) {
        this.message.document.caption = text;
        return this;
    }
    build() {
        return { ...this.message };
    }
}
export class AudioMessageBuilder {
    constructor() {
        this.message = {
            messaging_product: 'whatsapp',
            type: 'audio',
            audio: {},
            to: ''
        };
    }
    to(phone_number) {
        this.message.to = phone_number;
        return this;
    }
    link(url) {
        this.message.audio.link = url;
        return this;
    }
    build() {
        return { ...this.message };
    }
}
export class VideoMessageBuilder {
    constructor() {
        this.message = {
            messaging_product: 'whatsapp',
            type: 'video',
            video: {},
            to: ''
        };
    }
    to(phone_number) {
        this.message.to = phone_number;
        return this;
    }
    link(url) {
        this.message.video.link = url;
        return this;
    }
    caption(text) {
        this.message.video.caption = text;
        return this;
    }
    build() {
        return { ...this.message };
    }
}
export class LocationMessageBuilder {
    constructor() {
        this.message = {
            messaging_product: 'whatsapp',
            type: 'location',
            location: {
                longitude: '',
                latitude: ''
            },
            to: ''
        };
    }
    to(phone_number) {
        this.message.to = phone_number;
        return this;
    }
    longitude(lon) {
        this.message.location.longitude = lon;
        return this;
    }
    latitude(lat) {
        this.message.location.latitude = lat;
        return this;
    }
    name(name) {
        this.message.location.name = name;
        return this;
    }
    address(address) {
        this.message.location.address = address;
        return this;
    }
    build() {
        return { ...this.message };
    }
}
// Factory functions
export const text = () => new TextMessageBuilder();
export const image = () => new ImageMessageBuilder();
export const document = () => new DocumentMessageBuilder();
export const audio = () => new AudioMessageBuilder();
export const video = () => new VideoMessageBuilder();
export const location = () => new LocationMessageBuilder();
//# sourceMappingURL=builders.js.map