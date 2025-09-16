import React, {useState} from "react";
import Home from "./Home"
import Swap from "./Swap"
import NFT from "./NFT"
import Blog from "./Blog"
import Bot from "./Bot"
import logo from "./images/anoma.jpg"
export default function AnomaEnglishLanding() {
  const [select, setSelect] = useState("Home")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-slate-100 antialiased">
      <header className="bg-slate-950/80 backdrop-blur border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-fuchsia-500 to-cyan-400 flex items-center justify-center text-white font-bold shadow-lg shadow-fuchsia-500/40">
              <img src={logo.src} className="rounded-full"/>
              </div>
              <div className="hidden md:block">
                <div className="text-lg cursor-pointer font-semibold bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent" onClick={() => setSelect("Home")}>Anoma</div>
                <div className="text-xs text-slate-400">Intent-Oriented Distributed OS</div>
              </div>
            </div>

            <nav className="flex items-center gap-6 text-sm text-slate-300">
              <div className={`hover:text-cyan-400 cursor-pointer ${select === "Home" && "text-cyan-400"}`} onClick={() => setSelect("Home")}>Home</div>
              <div className={`hover:text-cyan-400 cursor-pointer ${select === "Swap" && "text-cyan-400"}`}  onClick={() => setSelect("Swap")}>Intents</div>
              <div className={`hover:text-cyan-400 cursor-pointer ${select === "NFT" && "text-cyan-400"}`}  onClick={() => setSelect("NFT")}>NFT</div>
              <div className={`hover:text-cyan-400 cursor-pointer ${select === "Bot" && "text-cyan-400"}`}  onClick={() => setSelect("Bot")}>Assistant</div>
              <div className={`hover:text-cyan-400 cursor-pointer ${select === "Blog" && "text-cyan-400"}`}  onClick={() => setSelect("Blog")}>Blog</div>
              <a href="https://anoma.net/" target="_blank" className="hidden md:flex px-4 py-2 rounded-md bg-gradient-to-r from-fuchsia-500 to-cyan-400 text-white text-sm hover:opacity-90 shadow-lg">Get Started</a>
            </nav>

            <div className="hidden">
              <button aria-label="Open menu" className="p-2 rounded-md border border-slate-700">
                <svg className="w-5 h-5 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
      {select === "Home" && <Home />}
      {select === "Swap" && <Swap />}
      {select === "NFT" && <NFT />}
      {select === "Blog" && <Blog />}
      {select === "Bot" && <Bot />}
      

      <footer className="bg-slate-950 text-slate-400 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-lg font-semibold bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">Anoma</div>
            <div className="mt-2 text-sm">Intent‑oriented distributed OS for private, composable web3 apps.</div>
          </div>

          <div>
            <div className="font-semibold text-slate-200">Resources</div>
            <ul className="mt-2 text-sm space-y-2">
              <li><a href="https://github.com/anoma/whitepaper/blob/main/whitepaper.pdf" target="_blank" className="hover:text-cyan-400">Whitepaper</a></li>
              <li><a href="https://anoma.net/build" target="_blank" className="hover:text-cyan-400">Build</a></li>
              <li><a href="https://github.com/anoma" target="_blank" className="hover:text-cyan-400">GitHub</a></li>
            </ul>
          </div>

          <div>
            <div className="font-semibold text-slate-200">Contact</div>
            <div className="flex items-center gap-4">
            <div className="mt-2 text-sm hover:scale-[1.05] cursor-pointer"><a href="https://x.com/anoma" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-twitter h-5 w-5 text-gray-400 group-hover:text-white transition-colors duration-200" aria-hidden="true"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg></a></div>
            <div className="mt-2 text-sm hover:scale-[1.05] cursor-pointer"><a href="https://www.youtube.com/@anoma" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-youtube h-5 w-5 text-gray-400 group-hover:text-white transition-colors duration-200" aria-hidden="true"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path><path d="m10 15 5-3-5-3z"></path></svg></a></div>
            <div className="mt-2 text-sm hover:scale-[1.05] cursor-pointer"><a href="https://discord.gg/anoma" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle h-5 w-5 text-gray-400 group-hover:text-white transition-colors duration-200" aria-hidden="true"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"></path></svg></a></div>
            <div className="mt-2 text-sm hover:scale-[1.05] cursor-pointer"><a href="https://github.com/anoma" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github h-5 w-5 text-gray-400 group-hover:text-white transition-colors duration-200" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg></a></div>
            </div>
            <div className="mt-4 text-xs text-slate-500">© {new Date().getFullYear()} Anoma — All rights reserved</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
