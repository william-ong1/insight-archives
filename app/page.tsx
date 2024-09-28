import './page.css';
import Footer from './components/footer/footer';
import Quote from './components/quote';
import { Suspense } from 'react';
import logo from './images/insight-archives-logo.png';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="page-wrapper">
      <header className="header">
        <Image className="w-24 h-24"
          src={logo}
          alt=""
        />
        <div className="title">
          <div className="insight"> Insight </div>
          <div className="archives"> Archives </div>
        </div>
      </header>
      
      <main className="content">
        <Suspense fallback={<div>...</div>}>
          <Quote/>
        </Suspense>
      </main>

      <footer className="footer">
        <Suspense fallback={<div>...</div>}>
          <Footer />
        </Suspense>
      </footer>
    </div>
  );
}