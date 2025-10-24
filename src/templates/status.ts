import { TemplateStatus } from './types';

export class TemplateStatusBuilder {
  private status: TemplateStatus = {
    id: '',
    status: 'PENDING',
    category: '',
    language: '',
    created_at: '',
    updated_at: '',
  };

  id(id: string): TemplateStatusBuilder {
    this.status.id = id;
    return this;
  }

  setStatus(status: TemplateStatus['status']): TemplateStatusBuilder {
    this.status.status = status;
    return this;
  }

  category(category: string): TemplateStatusBuilder {
    this.status.category = category;
    return this;
  }

  language(language: string): TemplateStatusBuilder {
    this.status.language = language;
    return this;
  }

  createdAt(created_at: string): TemplateStatusBuilder {
    this.status.created_at = created_at;
    return this;
  }

  updatedAt(updated_at: string): TemplateStatusBuilder {
    this.status.updated_at = updated_at;
    return this;
  }

  build(): TemplateStatus {
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
