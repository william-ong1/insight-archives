'use client'

import React from "react";
import { useQueryDate } from "../utilities";
import data from '../../data/data.json';
import './quote.css';

// Function to delay code execution.
const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

// Delays for typewriter effect.
const quote_delay: number = 35;
const author_delay: number = 50;

// Displays the quote and author with a typewriter effect.
const displayQuote = async (quote: string, author: string) => {
  const quote_elem = document.getElementById("quote");
  const author_elem = document.getElementById("author");

  if (quote_elem) {
    quote_elem.classList.add("active");
    quote_elem.textContent = "\"";

    for (const letter of quote) {
      await delay(quote_delay);
      quote_elem.textContent += letter;
    }

    quote_elem.textContent += "\"";
  }

  if (author_elem) {
    author_elem.classList.add("active");
    author_elem.textContent = "- ";

    for (const letter of author) {
      await delay(author_delay);
      author_elem.textContent += letter;
    }
  }
};

// Retrieves the desired quote and displays it.
const Quote = () => {
  const hasRendered = React.useRef(false);
  const query_date: string = useQueryDate();

  React.useEffect(() => {
    if (hasRendered.current) {
      return;
    }
    hasRendered.current = true;

    // Retrieves the quote from json file.
    const quote_data = data.filter(item => item.date === query_date);
    
    displayQuote(quote_data[0].quote, quote_data[0].author);
  });

  return (
    <div>
      <p className="quote" id="quote"> </p>
      <p className="author" id="author"> </p>
    </div>
  )
};

export default Quote;