export class TemplateStatusBuilder {
    constructor() {
        this.status = {
            id: '',
            status: 'PENDING',
            category: '',
            language: '',
            created_at: '',
            updated_at: ''
        };
    }
    id(id) {
        this.status.id = id;
        return this;
    }
    setStatus(status) {
        this.status.status = status;
        return this;
    }
    category(category) {
        this.status.category = category;
        return this;
    }
    language(language) {
        this.status.language = language;
        return this;
    }
    createdAt(created_at) {
        this.status.created_at = created_at;
        return this;
    }
    updatedAt(updated_at) {
        this.status.updated_at = updated_at;
        return this;
    }
    build() {
        if (!this.status.id) {
            throw new Error('Template status ID is required');
        }
        if (!this.status.category) {
            throw new Error('Template status category is required');
        }
        if (!this.status.language) {
            throw new Error('Template status language is required');
        }
        return { ...this.status };
    }
}
// Factory function
export const templateStatus = () => new TemplateStatusBuilder();
//# sourceMappingURL=status.js.map