export class AuthManager {
  private static readonly TOKEN_KEY = 'auth_token';
  private static readonly EXPIRY_KEY = 'token_expiry';

  static setAuth(token: string, expiresAt: number) {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.EXPIRY_KEY, expiresAt.toString());
  }

  static clearAuth() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.EXPIRY_KEY);
  }

  static isAuthenticated(): boolean {
    const token = localStorage.getItem(this.TOKEN_KEY);
    const expiry = localStorage.getItem(this.EXPIRY_KEY);
    if (!token || !expiry) return false;
    return Date.now() < parseInt(expiry);
  }

  static getToken(): string | null {
    if (!this.isAuthenticated()) {
      this.clearAuth();
      return null;
    }
    return localStorage.getItem(this.TOKEN_KEY);
  }
}