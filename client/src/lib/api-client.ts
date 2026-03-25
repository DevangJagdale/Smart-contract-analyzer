// API client for Gemini-backed services
export class APIClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = '';
  }

  async parseDocument(file: File) {
    const formData = new FormData();
    formData.append('document', file);

    const response = await fetch('/api/document-parse', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Document parse failed: ${response.status}`);
    }

    return response.json();
  }

  async extractInformation(file: File, schema: object) {
    const formData = new FormData();
    formData.append('document', file);
    formData.append('schema', JSON.stringify(schema));

    const response = await fetch('/api/information-extract', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Information extraction failed: ${response.status}`);
    }

    return response.json();
  }

  async chatWithSolar(messages: any[], reasoningEffort: string = 'medium') {
    const response = await fetch('/api/solar-chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages,
        reasoningEffort,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Gemini chat failed: ${response.status}`);
    }

    return response.json();
  }

  async healthCheck() {
    const response = await fetch('/api/health');
    return response.json();
  }
}

export const apiClient = new APIClient();