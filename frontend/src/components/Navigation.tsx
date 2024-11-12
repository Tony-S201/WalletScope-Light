import Link from 'next/link';
import { useAccount } from 'wagmi';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ThemeToggle } from './ThemeToggle';
import { ConnectedNav } from './NavigationConnected';

import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAuth } from '../hooks/useAuth';

const Navigation: React.FunctionComponent = (): JSX.Element => {
  const { isConnected } = useAccount();
  const { login } = useAuth();
  const { openConnectModal } = useConnectModal();

  // Custom connect button component
  const CustomConnectButton = () => (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={async () => {
                      openConnectModal();
                      // Wait for connection
                      const checkConnection = setInterval(async () => {
                        if (isConnected) {
                          clearInterval(checkConnection);
                          try {
                            await login();
                          } catch (error) {
                            console.error('Login failed:', error);
                          }
                        }
                      }, 1000);
                      // Clean interval if not connected
                      setTimeout(() => clearInterval(checkConnection), 30000);
                    }}
                    type="button"
                  >
                    Connect Wallet
                  </button>
                );
              }

              return (
                <div style={{ display: 'flex', gap: 12 }}>
                  <button onClick={openChainModal} type="button">
                    {chain.name}
                  </button>

                  <button onClick={openAccountModal} type="button">
                    {account.displayName}
                    {account.displayBalance ? ` (${account.displayBalance})` : ''}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );

  return (
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <Link href="/">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white cursor-pointer">
              WSL
            </h1>
          </Link>
          <ConnectedNav connected={isConnected} />
        </div>
        <div className="flex space-x-8">
          <CustomConnectButton/>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}

export default Navigation;