import { useRouter } from "next/router";
import Link from "next/link";

export const ConnectedNav = ({ connected }: { connected: boolean }) => {
  const router = useRouter();
  const isActive = (path: string) => router.pathname === path;

  if(connected) {
    return (
      <div className="flex items-center space-x-4">
        <Link href="/tokens">
          <span className={`px-3 py-2 rounded-lg cursor-pointer transition-colors
            ${isActive('/tokens')
              ? 'bg-blue-500 text-white'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
            }`}>
            Tokens
          </span>
        </Link>

        <Link href={'/wallets'}>
          <span className={`px-3 py-2 rounded-lg cursor-pointer transition-colors
            ${isActive('/wallets')
              ? 'bg-blue-500 text-white'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
            }`}>
            Wallet
          </span>
        </Link>

        <Link href={'/positions'}>
          <span className={`px-3 py-2 rounded-lg cursor-pointer transition-colors
            ${isActive('/positions')
              ? 'bg-blue-500 text-white'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
            }`}>
            Positions
          </span>
        </Link>

        <Link href="/dashboard">
          <span className={`px-3 py-2 rounded-lg cursor-pointer transition-colors
            ${isActive('/dashboard')
              ? 'bg-blue-500 text-white'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
            }`}>
            Stats
          </span>
        </Link>
      </div>
    )
  }
}