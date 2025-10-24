import {
  Template,
  TemplateComponent,
  TemplateParameter,
  Currency,
  DateTime,
  Button,
  ReplyButton,
  UrlButton,
} from './types';

export class TemplateBuilder {
  private template: Template = {
    name: '',
    language: '',
  };

  name(name: string): TemplateBuilder {
    this.template.name = name;
    return this;
  }

  language(language: string): TemplateBuilder {
    this.template.language = language;
    return this;
  }

  addHeader(parameters: TemplateParameter[]): TemplateBuilder {
    if (!this.template.components) {
      this.template.components = [];
    }
    this.template.components.push({
      type: 'header',
      parameters,
    });
    return this;
  }

  addBody(parameters: TemplateParameter[]): TemplateBuilder {
    if (!this.template.components) {
      this.template.components = [];
    }
    this.template.components.push({
      type: 'body',
      parameters,
    });
    return this;
  }

  addButton(button: Button): TemplateBuilder {
    if (!this.template.components) {
      this.template.components = [];
    }
    this.template.components.push({
      type: 'button',
      parameters: [
        {
          type: 'button',
          button,
        },
      ],
    });
    return this;
  }

  build(): Template {
    if (!this.template.name) {
      throw new Error('Template name is required');
    }

    if (!this.template.language) {
      throw new Error('Template language is required');
    }

    return { ...this.template };
  }
}

export class TemplateParameterBuilder {
  private parameter: TemplateParameter = {
    type: 'text',
  };

  text(value: string): TemplateParameterBuilder {
    this.parameter.type = 'text';
    this.parameter.text = value;
    return this;
  }

  currency(fallback_value: string, code?: string, amount_1000?: number): TemplateParameterBuilder {
    this.parameter.type = 'currency';
    const currency: Currency = { fallback_value };
    if (code !== undefined) {
      currency.code = code;
    }
    if (amount_1000 !== undefined) {
      currency.amount_1000 = amount_1000;
    }
    this.parameter.currency = currency;
    return this;
  }

  dateTime(fallback_value: string): TemplateParameterBuilder {
    this.parameter.type = 'date_time';
    this.parameter.date_time = {
      fallback_value,
    };
    return this;
  }

  build(): TemplateParameter {
    return { ...this.parameter };
  }
}

export class ReplyButtonBuilder {
  private button: ReplyButton = {
    id: '',
    title: '',
  };

  id(id: string): ReplyButtonBuilder {
    this.button.id = id;
    return this;
  }

  title(title: string): ReplyButtonBuilder {
    this.button.title = title;
    return this;
  }

  build(): ReplyButton {
    if (!this.button.id) {
      throw new Error('Reply button ID is required');
    }

    if (!this.button.title) {
      throw new Error('Reply button title is required');
    }

    return { ...this.button };
  }
}

export class UrlButtonBuilder {
  private button: UrlButton = {
    url: '',
  };

  url(url: string): UrlButtonBuilder {
    this.button.url = url;
    return this;
  }

  build(): UrlButton {
    if (!this.button.url) {
      throw new Error('URL button URL is required');
    }

    return { ...this.button };
  }
}

export class ButtonBuilder {
  private button: Button = {
    type: 'reply',
  };

  reply(reply: ReplyButton): ButtonBuilder {
    this.button.type = 'reply';
    this.button.reply = reply;
    return this;
  }

  url(url: UrlButton): ButtonBuilder {
    this.button.type = 'url';
    this.button.url = url;
    return this;
  }

  build(): Button {
    return { ...this.button };
  }
}

// Factory functions
export const template = () => new TemplateBuilder();
export const parameter = () => new TemplateParameterBuilder();
export const replyButton = () => new ReplyButtonBuilder();
export const urlButton = () => new UrlButtonBuilder();
export const button = () => new ButtonBuilder();
