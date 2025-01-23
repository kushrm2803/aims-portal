import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css'; 
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

function MyApp({ Component, pageProps }) {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-700 to-slate-500 min-h-screen flex flex-col`}
    >
      <Header />
      <main className="flex-grow">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}

export default MyApp;
