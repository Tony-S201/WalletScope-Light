import { useAccount, useSignMessage } from "wagmi";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [token, setToken] = useState<string | null>(null);

  // Get token from localstorage when is load
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) setToken(storedToken);
  }, []);

  const login = async () => {
    try {
      // Create a server nonce
      const nonceRes = await fetch('/api/auth/nonce');
      const nonce = await nonceRes.text();

      // Message to sign
      const message = `Login to App Nonce: ${nonce}`;

      // Sign message with wallet
      const signature = await signMessageAsync({ message });

      // Check server side
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ address, signature, message })
      });

      const { token } = await response.json();

      // Save token in localstorage and state
      localStorage.setItem('token', token);
      setToken(token);

      return token;

    } catch(error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.remove('token');
    setToken(null);
  };

  const authFetch = async (url: string, options: RequestInit = {}) => {
    if (!token) throw new Error('Not Authenticated');

    const headers = {
      ...options.headers,
      'Authorization': `Bearer ${token}`
    };

    return fetch(url, { ...options, headers });
  };

  return {
    token,
    login,
    logout,
    authFetch,
    isAuthenticated: !!token,
    address
  }
};