import type { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div className="min-h-screen dark:bg-slate-800 light:bg-slate-100 dark:text-white light:text-slate-900">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-emerald-500">
              CryptoTracker
            </span>
          </h1>
          <p className="text-xl md:text-2xl dark:text-gray-300 light:text-gray-600 mb-12 max-w-2xl mx-auto">
            Track and manage your crypto portfolio in real-time. 
            A simple yet powerful platform for your investments.
          </p>
          <Link href="/dashboard" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300">
            Get Started Now
          </Link>
        </div>

        {/* Features */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center p-6 rounded-xl dark:bg-slate-700 light:bg-white shadow-lg">
            <div className="bg-emerald-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Real-Time Tracking</h3>
            <p className="dark:text-gray-300 light:text-gray-600">
              Monitor your assets with instant updates and live market data
            </p>
          </div>

          <div className="text-center p-6 rounded-xl dark:bg-slate-700 light:bg-white shadow-lg">
            <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Detailed Analytics</h3>
            <p className="dark:text-gray-300 light:text-gray-600">
              Access advanced charts and statistics for better decision making
            </p>
          </div>

          <div className="text-center p-6 rounded-xl dark:bg-slate-700 light:bg-white shadow-lg">
            <div className="bg-purple-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Maximum Security</h3>
            <p className="dark:text-gray-300 light:text-gray-600">
              Your data is encrypted and protected at all times
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center">
          <div className="p-8 rounded-2xl dark:bg-slate-700 light:bg-white shadow-lg">
            <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
            <p className="dark:text-gray-300 light:text-gray-600 mb-6">
              Join thousands of investors who trust CryptoTracker
            </p>
            <Link href="/dashboard" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300">
              Create Free Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
