"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.media = exports.MediaBuilder = void 0;
class MediaBuilder {
    constructor() {
        this.media = {
            id: '',
            sha256: '',
            mime_type: '',
            file_size: 0
        };
    }
    id(id) {
        this.media.id = id;
        return this;
    }
    sha256(sha256) {
        this.media.sha256 = sha256;
        return this;
    }
    mimeType(mime_type) {
        this.media.mime_type = mime_type;
        return this;
    }
    fileSize(file_size) {
        this.media.file_size = file_size;
        return this;
    }
    build() {
        if (!this.media.id) {
            throw new Error('Media ID is required');
        }
        if (!this.media.sha256) {
            throw new Error('Media SHA256 is required');
        }
        if (!this.media.mime_type) {
            throw new Error('Media MIME type is required');
        }
        return { ...this.media };
    }
}
exports.MediaBuilder = MediaBuilder;
// Factory function
const media = () => new MediaBuilder();
exports.media = media;
//# sourceMappingURL=media.js.map