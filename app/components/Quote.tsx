'use client'

import React from "react";
import './quote.css';

type QuoteRecord = {quote: string, author: string};

let quoteRec: QuoteRecord = {quote: "Life is really simple, but we insist on making it complicated.", author: "Confucius"};

const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));
const quote_delay = 35;
const author_delay = 50;

const DisplayQuote = async () => {
  const quote = document.getElementById("quote");
  const author = document.getElementById("author");

  if (quote) {
    quote.classList.add("active");
    quote.textContent = "\"";

    for (const letter of quoteRec.quote) {
      await delay(quote_delay);
      quote.textContent += letter;
    }

    quote.textContent += "\"";
  }

  if (author) {
    author.classList.add("active");
    author.textContent = "- ";

    for (const letter of quoteRec.author) {
      await delay(author_delay);
      author.textContent += letter;
    }
  }
};

const Quote = () => {
  const hasRendered = React.useRef(false);

  React.useEffect(() => {
    if (hasRendered.current) {
      return;
    }
    hasRendered.current = true;
    DisplayQuote();
  });

  return (
    <div>
      <div className="quote" id="quote"> </div>
      <div className="author" id="author"> </div>
    </div>
  )
};

export default Quote;