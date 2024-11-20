import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/router";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function LoginPage() {
  const { isConnected } = useAccount();
  const { login } = useAuth();
  const router = useRouter();
  const [loginState, setLoginState] = useState<'idle' | 'processing' | 'success'>('idle');

  useEffect(() => {
    let isMounted = true;

    const handleLogin = async () => {
      // Ne rien faire si on n'est pas connecté ou si login déjà en cours/réussi
      if (!isConnected || loginState !== 'idle') {
        return;
      }

      try {
        console.log('🚀 Starting login process');
        setLoginState('processing');
        
        await login();
        
        if (isMounted) {
          setLoginState('success');
          console.log('✅ Login successful');
          // Petit délai avant la redirection pour éviter les problèmes de state
          setTimeout(() => {
            if (isMounted) {
              router.replace('/dashboard');
            }
          }, 100);
        }
      } catch (error) {
        console.error('❌ Login failed:', error);
        if (isMounted) {
          setLoginState('idle');
        }
      }
    };

    handleLogin();

    return () => {
      isMounted = false;
    };
  }, [isConnected, login, loginState, router]);

  // Reset login state when disconnected
  useEffect(() => {
    if (!isConnected) {
      setLoginState('idle');
    }
  }, [isConnected]);

  // Protection contre les rendus multiples
  if (loginState === 'success') {
    return <div>Redirecting...</div>;
  }

  return (
    <div>
      {loginState === 'processing' ? (
        <div>Processing login...</div>
      ) : (
        // ... reste du JSX de login
        <ConnectButton/>
      )}
    </div>
  );
}