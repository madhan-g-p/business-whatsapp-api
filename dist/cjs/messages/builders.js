"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.location = exports.video = exports.audio = exports.document = exports.image = exports.text = exports.LocationMessageBuilder = exports.VideoMessageBuilder = exports.AudioMessageBuilder = exports.DocumentMessageBuilder = exports.ImageMessageBuilder = exports.TextMessageBuilder = void 0;
class TextMessageBuilder {
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
exports.TextMessageBuilder = TextMessageBuilder;
class ImageMessageBuilder {
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
exports.ImageMessageBuilder = ImageMessageBuilder;
class DocumentMessageBuilder {
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
exports.DocumentMessageBuilder = DocumentMessageBuilder;
class AudioMessageBuilder {
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
exports.AudioMessageBuilder = AudioMessageBuilder;
class VideoMessageBuilder {
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
exports.VideoMessageBuilder = VideoMessageBuilder;
class LocationMessageBuilder {
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
exports.LocationMessageBuilder = LocationMessageBuilder;
// Factory functions
const text = () => new TextMessageBuilder();
exports.text = text;
const image = () => new ImageMessageBuilder();
exports.image = image;
const document = () => new DocumentMessageBuilder();
exports.document = document;
const audio = () => new AudioMessageBuilder();
exports.audio = audio;
const video = () => new VideoMessageBuilder();
exports.video = video;
const location = () => new LocationMessageBuilder();
exports.location = location;
//# sourceMappingURL=builders.js.map