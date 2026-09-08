import { useState } from 'react';

export default function App() {
  return (
    <div className="bg-[#0B0B1A] text-white min-h-screen">
      {/* NAV */}
      <nav className="p-6 flex justify-between border-b border-purple-800">
        <h1 className="text-2xl font-bold text-gold-400">BlockReads</h1>
        <div className="space-x-4">
          <button className="bg-purple-600 px-4 py-2 rounded">Publish Book</button>
          <button className="border px-4 py-2 rounded">Login</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="text-center py-20 px-4">
        <h2 className="text-5xl font-bold">Sell and Buy Novels Worldwide with Crypto</h2>
        <p className="mt-4 text-gray-400">Publish in 5 mins. Get paid instantly in BTC, ETH, USDT</p>
        <div className="mt-6 space-x-4">
          <button className="bg-gold-500 text-black px-6 py-3 rounded font-bold">Start Reading</button>
          <button className="bg-purple-600 px-6 py-3 rounded font-bold">Publish Your Book</button>
        </div>
        
        {/* Crypto icons */}
        <div className="mt-8 text-sm text-gray-400">
          Accepting: BTC ETH SOL USDT USDC BNB TRX LTC MATIC DOGE
        </div>
      </section>

      {/* FEATURED BOOKS */}
      <section className="px-10">
        <h3 className="text-2xl font-bold mb-4">Featured Books</h3>
        <div className="grid grid-cols-4 gap-4">
          {[1,2,3,4].map(i => (
            <div key={i} className="bg-[#1A1A2E] p-4 rounded">
              <div className="h-60 bg-gray-700 rounded mb-2"></div>
              <p className="font-bold">Book Title {i}</p>
              <p className="text-gold-400">$3.99 USDT</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}