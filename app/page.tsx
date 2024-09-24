import './page.css';
import Footer from './components/footer/footer';
import Quote from './components/quote';

export default function Home() {
  return (
    <div className="page-wrapper">
      <header className="header">
        <div className="insight"> Insight </div>
        <div className="archives"> Archives </div>
      </header>
      
      <main className="content">
        <Quote/>
      </main>

      <footer className="footer">
        <Footer/>
      </footer>
    </div>
  );
}