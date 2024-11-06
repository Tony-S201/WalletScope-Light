import { ThemeToggle } from './ThemeToggle';

const Navigation: React.FunctionComponent = (): JSX.Element => {

  return (
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          WalletScope Light
        </h1>
        <ThemeToggle />
      </div>
    </nav>
  )
}

export default Navigation;