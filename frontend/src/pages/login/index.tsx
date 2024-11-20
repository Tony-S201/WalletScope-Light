// pages/login.tsx
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { useAuth } from './../../hooks/useAuth';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const { address, isConnected } = useAccount();
  const { login, isLoading, error } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Check if user has valid token
    const checkAuth = async () => {
      const token = document.cookie.includes('token');
      if (token && isConnected) {
        router.push('/dashboard');
      }
    };

    checkAuth();
  }, [isConnected]);

  useEffect(() => {
    // When wallet is connected, trigger login
    if (isConnected && address) {
      handleLogin();
    }
  }, [isConnected, address]);

  const handleLogin = async () => {
    try {
      await login();
      router.push('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="mb-8 text-2xl font-bold">Login</h1>
      <ConnectButton />
      {error && (
        <p className="mt-4 text-red-500">{error}</p>
      )}
      {isLoading && (
        <p className="mt-4">Loading...</p>
      )}
    </div>
  );
}