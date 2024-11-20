// hooks/useAuth.ts
import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export const useAuth = () => {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async () => {
    if (!address) return;
    
    setIsLoading(true);
    setError(null);

    try {
      // Generate timestamp for the message
      const timestamp = Date.now();
      const message = `Login to App at Timestamp: ${timestamp}`;

      // Get signature using wagmi
      const signature = await signMessageAsync({ 
        message: message
      });

      console.log('just before the call')

      // Call login API
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address,
          signature,
          timestamp
        }),
        credentials: 'include'
      });

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error);
      }

      localStorage.setItem('user', JSON.stringify(data.data.user));
      
      return data.data;

    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};