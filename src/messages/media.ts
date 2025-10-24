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

export class MediaBuilder {
  private media: Media = {
    id: '',
    sha256: '',
    mime_type: '',
    file_size: 0,
  };

  id(id: string): MediaBuilder {
    this.media.id = id;
    return this;
  }

  sha256(sha256: string): MediaBuilder {
    this.media.sha256 = sha256;
    return this;
  }

  mimeType(mime_type: string): MediaBuilder {
    this.media.mime_type = mime_type;
    return this;
  }

  fileSize(file_size: number): MediaBuilder {
    this.media.file_size = file_size;
    return this;
  }

  build(): Media {
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

// Factory function
export const media = () => new MediaBuilder();
