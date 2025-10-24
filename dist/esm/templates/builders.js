export class TemplateBuilder {
    constructor() {
        this.template = {
            name: '',
            language: ''
        };
    }
    name(name) {
        this.template.name = name;
        return this;
    }
    language(language) {
        this.template.language = language;
        return this;
    }
    addHeader(parameters) {
        if (!this.template.components) {
            this.template.components = [];
        }
        this.template.components.push({
            type: 'header',
            parameters
        });
        return this;
    }
    addBody(parameters) {
        if (!this.template.components) {
            this.template.components = [];
        }
        this.template.components.push({
            type: 'body',
            parameters
        });
        return this;
    }
    addButton(button) {
        if (!this.template.components) {
            this.template.components = [];
        }
        this.template.components.push({
            type: 'button',
            parameters: [{
                    type: 'button',
                    button
                }]
        });
        return this;
    }
    build() {
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
    constructor() {
        this.parameter = {
            type: 'text'
        };
    }
    text(value) {
        this.parameter.type = 'text';
        this.parameter.text = value;
        return this;
    }
    currency(fallback_value, code, amount_1000) {
        this.parameter.type = 'currency';
        const currency = { fallback_value };
        if (code !== undefined) {
            currency.code = code;
        }
        if (amount_1000 !== undefined) {
            currency.amount_1000 = amount_1000;
        }
        this.parameter.currency = currency;
        return this;
    }
    dateTime(fallback_value) {
        this.parameter.type = 'date_time';
        this.parameter.date_time = {
            fallback_value
        };
        return this;
    }
    build() {
        return { ...this.parameter };
    }
}
export class ReplyButtonBuilder {
    constructor() {
        this.button = {
            id: '',
            title: ''
        };
    }
    id(id) {
        this.button.id = id;
        return this;
    }
    title(title) {
        this.button.title = title;
        return this;
    }
    build() {
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
    constructor() {
        this.button = {
            url: ''
        };
    }
    url(url) {
        this.button.url = url;
        return this;
    }
    build() {
        if (!this.button.url) {
            throw new Error('URL button URL is required');
        }
        return { ...this.button };
    }
}
export class ButtonBuilder {
    constructor() {
        this.button = {
            type: 'reply'
        };
    }
    reply(reply) {
        this.button.type = 'reply';
        this.button.reply = reply;
        return this;
    }
    url(url) {
        this.button.type = 'url';
        this.button.url = url;
        return this;
    }
    build() {
        return { ...this.button };
    }
}
// Factory functions
export const template = () => new TemplateBuilder();
export const parameter = () => new TemplateParameterBuilder();
export const replyButton = () => new ReplyButtonBuilder();
export const urlButton = () => new UrlButtonBuilder();
export const button = () => new ButtonBuilder();
//# sourceMappingURL=builders.js.map