import './page.css';
import Footer from './components/footer/footer';
import Quote from './components/quote';
import { Suspense } from 'react';

export default function Home() {
  return (
    <div className="page-wrapper">
      <header className="header">
        <div className="insight"> Insight </div>
        <div className="archives"> Archives </div>
      </header>
      
      <main className="content">
        <Suspense fallback={<div>Loading...</div>}>
          <Quote/>
        </Suspense>
      </main>

      <footer className="footer">
        <Suspense fallback={<div>Loading...</div>}>
          <Footer />
        </Suspense>
      </footer>
    </div>
  );
}