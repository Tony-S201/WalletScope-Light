// hooks/useAuth.ts
import { useAccount, useSignMessage } from 'wagmi';
import { useState, useCallback } from 'react';

export const useAuth = () => {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async () => {
    if (isLoading) {
      console.log('Login already in progress, skipping');
      return;
    }

    console.log('🔄 Login attempt');
    
    if (!address) {
      throw new Error('No wallet address found');
    }
    
    setIsLoading(true);
    setError(null);

    try {
      const timestamp = Date.now();
      const message = `Login to App at Timestamp: ${timestamp}`;

      const signature = await signMessageAsync({ 
        message: message
      });

      console.log('Calling login API');

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
      
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Login failed');
      }

      localStorage.setItem('user', JSON.stringify(data.data.user));
      console.log('✅ Login success');
      
      return data.data;

    } catch (err: any) {
      const errorMessage = err.message || 'Login failed';
      console.error('Login error:', errorMessage);
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [address, signMessageAsync, isLoading]);

  return { login, isLoading, error };
};