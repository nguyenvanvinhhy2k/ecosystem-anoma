import React from "react";

export default function AnomaEnglishLanding() {
  const features = [
    {
      title: "Intent‑Oriented UX",
      desc: "Users declare what they want — the protocol resolves the how. Build apps focused on intent, not low‑level transactions.",
      icon: (
        <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3" />
        </svg>
      ),
    },
    {
      title: "Interoperable",
      desc: "Designed to work across multiple chains and environments, enabling composable cross‑chain experiences.",
      icon: (
        <svg className="w-6 h-6 text-fuchsia-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h4l3 8 4-16 3 8h4" />
        </svg>
      ),
    },
    {
      title: "Privacy & Data Sovereignty",
      desc: "Users control who can access their data and for what purpose — privacy built in at the protocol level.",
      icon: (
        <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c1.657 0 3-1.567 3-3.5S13.657 4 12 4 9 5.567 9 7.5 10.343 11 12 11z" />
        </svg>
      ),
    },
    {
      title: "Scalable & Cost‑Efficient",
      desc: "Architecture optimized for throughput and low cost while keeping composability and security in mind.",
      icon: (
        <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M3 12h18M3 17h18" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-slate-100 antialiased">
      <main>
        <section className="pt-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-10">
            <div className="w-full lg:w-1/2">
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-indigo-400 bg-clip-text text-transparent">Anoma — an intent‑oriented distributed OS for web3</h1>
              <p className="mt-6 text-lg text-slate-300">Declare what you want, and let the protocol handle execution across chains, privacy boundaries, and composability seams. Build higher‑order applications without wrestling low‑level transactions.</p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#docs" className="px-5 py-3 rounded-md bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-medium hover:opacity-90 shadow-lg">Read the Docs</a>
                <a href="#how" className="px-5 py-3 rounded-md border border-slate-700 text-slate-300 hover:bg-slate-800">How it works</a>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 text-sm text-slate-400">
                <div className="bg-slate-900/60 rounded-lg p-4 shadow-inner border border-slate-800">
                  <div className="font-semibold text-cyan-400">Use Case</div>
                  <div className="mt-1">Cross‑chain privacy marketplace</div>
                </div>
                <div className="bg-slate-900/60 rounded-lg p-4 shadow-inner border border-slate-800">
                  <div className="font-semibold text-fuchsia-400">Model</div>
                  <div className="mt-1">Intent abstraction & composable interpreter</div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-900/80">
                <img alt="anoma hero" src="https://anoma.net/_next/static/media/intent-machine-dark.c9bb7cbd.png" className="w-full h-80 object-cover opacity-90 bg-white"/>
                <div className="p-6">
                  <div className="text-sm text-slate-400">Protocol Snapshot</div>
                  <div className="mt-3 grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-xl font-semibold text-cyan-400">Intents</div>
                      <div className="text-xs text-slate-500">Expressive actions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-semibold text-fuchsia-400">Privacy</div>
                      <div className="text-xs text-slate-500">Data ownership</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-semibold text-indigo-400">Cross‑chain</div>
                      <div className="text-xs text-slate-500">Composable</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="mt-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-cyan-400">Core Features</h2>
            <p className="mt-2 text-slate-400">What makes Anoma different.</p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((f) => (
                <div key={f.title} className="bg-slate-900/70 p-6 rounded-lg border border-slate-800 hover:shadow-lg hover:shadow-fuchsia-500/20 transition">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-md bg-slate-800">{f.icon}</div>
                    <div className="font-semibold text-slate-100">{f.title}</div>
                  </div>
                  <p className="mt-4 text-sm text-slate-400">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="how" className="mt-20 py-16 bg-gradient-to-b from-slate-950 via-slate-900 to-black">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <h3 className="text-xl font-bold text-fuchsia-400">How it works — at a glance</h3>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900/70 rounded-lg p-6 border border-slate-800">
                <div className="font-semibold text-cyan-400">1. Express intent</div>
                <p className="mt-2 text-sm text-slate-400">Client declares desired outcome in a high‑level intent language.</p>
              </div>
              <div className="bg-slate-900/70 rounded-lg p-6 border border-slate-800">
                <div className="font-semibold text-fuchsia-400">2. Protocol resolution</div>
                <p className="mt-2 text-sm text-slate-400">Anoma interprets intents, coordinates across services and chains, and enforces privacy constraints.</p>
              </div>
              <div className="bg-slate-900/70 rounded-lg p-6 border border-slate-800">
                <div className="font-semibold text-indigo-400">3. Settlement & feedback</div>
                <p className="mt-2 text-sm text-slate-400">Settlement occurs where necessary, feedback updates intent state and UX is notified.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="docs" className="mt-20 pb-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h3 className="text-2xl font-bold text-cyan-400">Documentation & Resources</h3>
            <p className="mt-3 text-slate-400">Explore the whitepaper, technical docs, and developer examples to get started building on Anoma.</p>

            <div className="mt-6 flex justify-center gap-4 flex-wrap">
              <a href="https://github.com/anoma/whitepaper/blob/main/whitepaper.pdf" target="_blank" className="px-4 py-2 rounded-md border border-slate-700 hover:bg-slate-800 text-slate-300">Whitepaper</a>
              <a href="https://anoma.net/build" target="_blank" className="px-4 py-2 rounded-md border border-slate-700 hover:bg-slate-800 text-slate-300">Build</a>
              <a href="https://github.com/anoma" target="_blank" className="px-4 py-2 rounded-md border border-slate-700 hover:bg-slate-800 text-slate-300">API Reference</a>
            </div>
          </div>
        </section>

        {/* <section id="team" className="mt-20 pb-20">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <h3 className="text-2xl font-bold text-fuchsia-400">Team & Partners</h3>
            <p className="mt-2 text-slate-400">A small team of researchers and engineers focused on protocol design, privacy, and developer ergonomics.</p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-slate-900/70 p-6 rounded-lg text-center border border-slate-800">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-cyan-500 to-fuchsia-500 text-white flex items-center justify-center font-bold shadow-lg">JL</div>
                <div className="mt-4 font-semibold">Jordan Lee</div>
                <div className="text-sm text-slate-400">Protocol Researcher</div>
              </div>
              <div className="bg-slate-900/70 p-6 rounded-lg text-center border border-slate-800">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-fuchsia-500 to-indigo-500 text-white flex items-center justify-center font-bold shadow-lg">AM</div>
                <div className="mt-4 font-semibold">Amina Moore</div>
                <div className="text-sm text-slate-400">Systems Engineer</div>
              </div>
              <div className="bg-slate-900/70 p-6 rounded-lg text-center border border-slate-800">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 text-white flex items-center justify-center font-bold shadow-lg">RK</div>
                <div className="mt-4 font-semibold">Ravi Kapoor</div>
                <div className="text-sm text-slate-400">Privacy Engineer</div>
              </div>
            </div>
          </div>
        </section> */}
      </main>
    </div>
  );
}
