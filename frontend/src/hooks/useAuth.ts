import { useAccount, useSignMessage } from "wagmi";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [token, setToken] = useState<string | null>(null);

  // Get token from localstorage when is load
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) setToken(storedToken);
  }, []);

  const login = async () => {
    try {
      // 1. Use timestamp as a nonce
      const timestamp = Date.now();

      // 2. Create and sign the message
      const message = `Login to App at Timestamp: ${timestamp}`;
      const signature = await signMessageAsync({ message });

      // 3. Check signature on server side
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ address, signature, message })
      });

      const { data } = await response.json();

      // 4. Save token in localstorage and state
      localStorage.setItem('token', data.token);
      setToken(data.token);

      return data.token;

    } catch(error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.remove('token');
    setToken(null);
  };

  return {
    token,
    login,
    logout,
    isAuthenticated: !!token,
    address
  }
};