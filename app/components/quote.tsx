'use client'

import React from "react";
import { useQueryDate } from "../utilities";
import data from '../../data/data.json';
import './quote.css';

interface Quote {
  date: string;
  quote: string;
  author: string;
}

let quoteRec: Quote = {date: "", quote: "", author: ""};

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
  const query_date = useQueryDate();

  React.useEffect(() => {
    if (hasRendered.current) {
      return;
    }
    hasRendered.current = true;

    const quote_data = data.filter(item => item.date === query_date);
    quoteRec = {date: quote_data[0].date, quote: quote_data[0].quote, author: quote_data[0].author};

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