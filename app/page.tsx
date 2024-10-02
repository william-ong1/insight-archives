import Footer from './components/footer/footer';
import Quote from './components/quote';
import { Suspense } from 'react';
import logo from './images/insight-archives-logo.png';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <header className="font-cinzel relative flex flex-row items-center justify-center font-bold text-3xl lg:text-5xl mt-8 leading-none">
        <Image className="w-16 h-16 lg:w-24 lg:h-24"
          src={logo}
          alt=""
        />
        <div className="relative flex flex-col ml-4 text-left">
          <div> Insight </div>
          <div className="relative right-2"> Archives </div>
        </div>
      </header>
      
      <main className="flex flex-col flex-1 justify-center items-center text-center font-libre mx-6 lg:mx-24">
        <Suspense fallback={<div>...</div>}>
          <Quote/>
        </Suspense>
      </main>

      <footer className="flex flex-row gap-2 pb-24 text-lg md:pb-6 lg:text-xl text-center font-montserrat justify-center cursor-default">
        <Suspense fallback={<div>...</div>}>
          <Footer />
        </Suspense>
      </footer>
    </div>
  );
}