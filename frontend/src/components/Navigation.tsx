import Link from 'next/link';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ThemeToggle } from './ThemeToggle';
import { ConnectedNav } from './NavigationConnected';

const Navigation: React.FunctionComponent = (): JSX.Element => {
  const { isConnected } = useAccount();

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
          <ConnectButton />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;