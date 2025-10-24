import { api_version } from ".";

export class Authentication {
  private access_token: string;

  constructor(access_token: string) {
    this.access_token = access_token;
  }

  /**
   * Get the access token
   * @returns The access token
   */
  getToken(): string {
    return this.access_token;
  }

  /**
   * Validate the access token
   * @returns Promise resolving to validation result
   */
  async validateToken(): Promise<boolean> {
    try {
      const response = await fetch(`https://graph.facebook.com/${api_version}/me`, {
        headers: {
          'Authorization': `Bearer ${this.access_token}`
        }
      });
      
      return response.ok;
    } catch (error) {
      return false;
    }
  }
}