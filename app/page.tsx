import './page.css';
import SubscribeButton from './SubscribeButton';

type QuoteRecord = {quote: string, author: string};

let quoteRec = {quote: "Life is really simple, but we insist on making it complicated.", author: "Confucius"};

export default function Home() {
  return (
    <div className="page-wrapper">
      <header className="header">
        <div className="insight"> Insight </div>
        <div className="archives"> Archives </div>
      </header>
      
      <main className="content">
        <div className="quote"> { "\"" + quoteRec.quote + "\"" } </div>
        <div className="author"> {"- " + quoteRec.author} </div>
      </main>

      <footer className="footer">
        <SubscribeButton/>
        |
        <button> Subscribe </button>
        |
        <button> View Archive </button>
      </footer>
    </div>
  );
}
