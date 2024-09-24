'use client'

import React from "react";
import { getQueryDate } from "../utilities";
import './quote.css';

type QuoteRecord = {quote: string, author: string};

const dateToQuoteMap: Map<String, QuoteRecord> = new Map<String, QuoteRecord>([
  ["2024-09-17", { quote: "We are all in the gutter, but some of us are looking at the stars.", author: "Oscar Wilde" }],
  ["2024-09-18", { quote: "The wound is the place where the Light enters you.", author: "Rumi" }],
  ["2024-09-19", { quote: "Life shrinks or expands in proportion to one’s courage.", author: "Anaïs Nin" }],
  ["2024-09-20", { quote: "The only journey is the one within.", author: "Rainer Maria Rilke" }],
  ["2024-09-21", { quote: "The universe is under no obligation to make sense to you.", author: "Neil deGrasse Tyson" }],
  ["2024-09-22", { quote: "A ship in harbor is safe, but that is not what ships are built for.", author: "John A. Shedd" }],
  ["2024-09-23", { quote: "To live is the rarest thing in the world. Most people exist, that is all.", author: "Oscar Wilde" }],
  ["2024-09-24", { quote: "You must do the things you think you cannot do.", author: "Eleanor Roosevelt" }]
]);

let quoteRec: QuoteRecord = {quote: "", author: ""};

const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));
const quote_delay = 35;
const author_delay = 50;

const displayQuote = async () => {
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

  quoteRec = dateToQuoteMap.get(getQueryDate()) ?? {quote: "", author: ""};

  React.useEffect(() => {
    if (hasRendered.current) {
      return;
    }
    hasRendered.current = true;
    displayQuote();
  });

  return (
    <div>
      <p className="quote" id="quote"> </p>
      <p className="author" id="author"> </p>
    </div>
  )
};

export default Quote;