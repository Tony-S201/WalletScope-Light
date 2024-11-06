import { ThemeToggle } from './ThemeToggle';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Navigation: React.FunctionComponent = (): JSX.Element => {
  const router = useRouter();
  const isActive = (path: string) => router.pathname === path;

  return (
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <Link href="/">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white cursor-pointer">
              WalletScope Light
            </h1>
          </Link>

          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <span className={`px-3 py-2 rounded-lg cursor-pointer transition-colors
                ${isActive('/dashboard')
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                }`}>
                Dashboard
              </span>
            </Link>

            <Link href="/tokens">
              <span className={`px-3 py-2 rounded-lg cursor-pointer transition-colors
                ${isActive('/tokens')
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                }`}>
                Tokens
              </span>
            </Link>

            {/* Wallet Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search wallet address..."
                className="w-64 px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-700 
                         text-gray-900 dark:text-white focus:outline-none focus:ring-2 
                         focus:ring-blue-500 transition-colors"
                onChange={(e) => {
                  if (e.target.value) {
                    router.push(`/wallet/${e.target.value}`);
                  }
                }}
              />
              <svg
                className="w-5 h-5 absolute right-3 top-2.5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <ThemeToggle />
      </div>
    </nav>
  )
}

export default Navigation;