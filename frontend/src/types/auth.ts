export interface AuthResponse {
  token: string;
  expiresAt: number;
}

export interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  login: () => Promise<boolean>;
  logout: () => void;
}

export interface ApiResponse<T> {
  data: T | null;
  error?: string | null;
}