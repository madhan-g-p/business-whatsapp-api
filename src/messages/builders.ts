import {
  Message,
  TextMessage,
  ImageMessage,
  DocumentMessage,
  AudioMessage,
  VideoMessage,
  LocationMessage,
  InteractiveMessage,
  SentMessage,
  SentTemplate,
} from './types';

export class TextMessageBuilder {
  private message: TextMessage = {
    messaging_product: 'whatsapp',
    type: 'text',
    text: { body: '' },
    to: '',
  };

  to(phone_number: string): TextMessageBuilder {
    this.message.to = phone_number;
    return this;
  }

  body(text: string): TextMessageBuilder {
    this.message.text.body = text;
    return this;
  }

  build(): TextMessage {
    return { ...this.message };
  }
}

export class ImageMessageBuilder {
  private message: ImageMessage = {
    messaging_product: 'whatsapp',
    type: 'image',
    image: {},
    to: '',
  };

  to(phone_number: string): ImageMessageBuilder {
    this.message.to = phone_number;
    return this;
  }

  link(url: string): ImageMessageBuilder {
    this.message.image.link = url;
    return this;
  }

  caption(text: string): ImageMessageBuilder {
    this.message.image.caption = text;
    return this;
  }

  build(): ImageMessage {
    return { ...this.message };
  }
}

export class DocumentMessageBuilder {
  private message: DocumentMessage = {
    messaging_product: 'whatsapp',
    type: 'document',
    document: {},
    to: '',
  };

  to(phone_number: string): DocumentMessageBuilder {
    this.message.to = phone_number;
    return this;
  }

  link(url: string): DocumentMessageBuilder {
    this.message.document.link = url;
    return this;
  }

  filename(name: string): DocumentMessageBuilder {
    this.message.document.filename = name;
    return this;
  }

  caption(text: string): DocumentMessageBuilder {
    this.message.document.caption = text;
    return this;
  }

  build(): DocumentMessage {
    return { ...this.message };
  }
}

export class AudioMessageBuilder {
  private message: AudioMessage = {
    messaging_product: 'whatsapp',
    type: 'audio',
    audio: {},
    to: '',
  };

  to(phone_number: string): AudioMessageBuilder {
    this.message.to = phone_number;
    return this;
  }

  link(url: string): AudioMessageBuilder {
    this.message.audio.link = url;
    return this;
  }

  build(): AudioMessage {
    return { ...this.message };
  }
}

export class VideoMessageBuilder {
  private message: VideoMessage = {
    messaging_product: 'whatsapp',
    type: 'video',
    video: {},
    to: '',
  };

  to(phone_number: string): VideoMessageBuilder {
    this.message.to = phone_number;
    return this;
  }

  link(url: string): VideoMessageBuilder {
    this.message.video.link = url;
    return this;
  }

  caption(text: string): VideoMessageBuilder {
    this.message.video.caption = text;
    return this;
  }

  build(): VideoMessage {
    return { ...this.message };
  }
}

export class LocationMessageBuilder {
  private message: LocationMessage = {
    messaging_product: 'whatsapp',
    type: 'location',
    location: {
      longitude: '',
      latitude: '',
    },
    to: '',
  };

  to(phone_number: string): LocationMessageBuilder {
    this.message.to = phone_number;
    return this;
  }

  longitude(lon: string): LocationMessageBuilder {
    this.message.location.longitude = lon;
    return this;
  }

  latitude(lat: string): LocationMessageBuilder {
    this.message.location.latitude = lat;
    return this;
  }

  name(name: string): LocationMessageBuilder {
    this.message.location.name = name;
    return this;
  }

  address(address: string): LocationMessageBuilder {
    this.message.location.address = address;
    return this;
  }

  build(): LocationMessage {
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
