import Head from 'next/head';
import Navigation from "./Navigation"
import Footer from "./Footer"

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
          <title>WSL App</title>
          <meta
            content="By TS"
            name="Personal Wallet Tracker"
          />
          <link href="/favicon.ico" rel="icon" />
      </Head>
      <div className="min-h-screen flex flex-col dark:bg-slate-600 light:bg-slate-100">
        <header className="dark:bg-slate-500 light:bg-slate-200 shadow">
          <Navigation />
        </header>
        <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="dark:text-white light:text-gray-900">
            {children}
          </div>
        </main>
        <footer className="dark:bg-gray-800 light:bg-gray-100 mt-auto">
          <Footer />
        </footer>
      </div>
    </>
  );
}