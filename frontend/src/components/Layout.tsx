import Head from 'next/head';
import Navigation from "./Navigation"
import Footer from "./Footer"
import styles from '../styles/Home.module.css';

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
      <main className={styles.main}>
        <Navigation />
        <div className={styles.container}>
          {children}
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}