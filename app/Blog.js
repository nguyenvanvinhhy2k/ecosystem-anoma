import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Single-file React + Tailwind page that mimics a tech/blog listing like https://anoma.net/blog
// Drop into a Create React App / Vite + Tailwind project. Tailwind must be configured.

const samplePosts = [
  {
    id: 1,
    title: "Upward: Shifting Innovation to the Application Layer",
    excerpt:
      "It's time to aim upward. ",
    date: "2025-08-05",
    tags: ["Anoma Basics"],
    link: "https://anoma.net/blog/upward",
    image: "https://blog.anoma.net/content/images/size/w720/2025/09/Anoma-Upward.jpg",
  },
  {
    id: 2,
    title: "Introducing AnomaPay: A Secure, Global Stablecoin Router and Payments Network",
    excerpt:
      "AnomaPay is the first global stablecoin router and payments network offering enterprise-grade data protection. ",
    date: "2025-06-18",
    tags: ["NEWS"],
    link: "https://anoma.net/blog/introducing-anomapay",
    image: "https://blog.anoma.net/content/images/size/w720/2025/08/AnomaPayBlog--1-.jpg",
  },
  {
    id: 3,
    title: "The Anoma Testnet is Live!",
    excerpt:
      "The Anoma Testnet is an interactive, gamified visualization of what Anoma’s Distributed Operating System enables. The testnet is dedicated to the Anoma community, who can learn about Anoma’s architecture and vision by exploring, playing, and earning points.",
    date: "2025-05-10",
    tags: ["Community"],
    link: "https://anoma.net/blog/the-anoma-testnet-is-live",
    image: "https://blog.anoma.net/content/images/size/w720/2025/07/Blog-hero-3.jpg",
  },
  {
    id: 4,
    title: "Build Apps, Not Chains: Introducing Web3’s OS",
    excerpt:
      "Why is it that we see an endless rollout of new blockchains, but so few apps and app developers? Where are all the apps? How do we create a thriving application layer for Web3? ",
    date: "2025-01-22",
    tags: ["Anoma Basics"],
    link: "https://anoma.net/blog/build-apps-not-chains-introducing-web3s-os",
    image: "https://blog.anoma.net/content/images/size/w720/2025/06/Anoma-Blog.jpg",
  },
  {
    id: 5,
    title: "Announcing Intents Initiates Cohort 01",
    excerpt:
      "After a competitive application process, a first cohort of 15 projects have been selected for the Intents Initiates program. These teams have demonstrated the vision, technical expertise, and commitment necessary to help build the intent-centric future of Web3. ",
    date: "2025-01-22",
    tags: ["Community"],
    link: "https://anoma.net/blog/announcing-intents-initiates-cohort-01",
    image: "https://blog.anoma.net/content/images/size/w720/2025/03/Cohort-01.jpg",
  },
  {
    id: 6,
    title: "Introducing Intents Initiates",
    excerpt:
      "The Intents Initiates Program supports projects building with Anoma and in the broader intents ecosystem with exclusive resources and benefits.",
    date: "2025-01-22",
    tags: ["Community"],
    link: "https://anoma.net/blog/introducing-intents-initiates",
    image: "https://blog.anoma.net/content/images/size/w720/2025/02/Intents_Initiates--1-.jpg",
  },
  {
    id: 7,
    title: "HelloWorld: Anoma's First Devnet is Live!",
    excerpt:
      "After years of research and development, today the first phase of Anoma’s roadmap to mainnet begins with the launch of Anoma’s first devnet. Anoma is open for the very first builders of intent-centric applications. ",
    date: "2025-01-22",
    tags: ["News"],
    link: "https://anoma.net/blog/upward",
    image: "https://blog.anoma.net/content/images/size/w720/2025/01/Anoma-Devnet3-1.jpg",
  },
  {
    id: 8,
    title: "Anoma's Roadmap to Mainnet",
    excerpt:
      "Anoma's roadmap to mainnet consists of three basic phases: devnets, testnets, and mainnet. Anoma will launch first on Ethereum, followed by other chains and ecosystems.",
    date: "2025-01-22",
    tags: ["Anoma Basics"],
    link: "https://anoma.net/blog/anomas-roadmap-to-mainnet",
    image: "https://blog.anoma.net/content/images/size/w720/2024/11/Anoma-Mainnet.jpg",
  },
  {
    id: 9,
    title: "TL;DW: Intents Discussions' Most Intents Takeaways",
    excerpt:
      "Missed Intents Discussions but don’t have seven hours to watch all the videos? We’ve got you covered with the best takeaways from the very intents day of panels on protocols, distributed systems, cryptography, and applications related to intents.",
    date: "2025-01-22",
    tags: ["Community"],
    link: "https://anoma.net/blog/tl-dw-intents-discussions-most-intents-takeaways",
    image: "https://blog.anoma.net/content/images/size/w720/2024/09/image6.jpg",
  },
];

export default function AnomaBlogClone() {
  const [activeTag, setActiveTag] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);

  const allTags = useMemo(() => {
    const s = new Set();
    samplePosts.forEach((p) => p.tags.forEach((t) => s.add(t)));
    return Array.from(s);
  }, []);

  const filtered = useMemo(() => {
    return samplePosts
      .filter((p) => (activeTag ? p.tags.includes(activeTag) : true))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [activeTag]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white font-sans">
      <main className="max-w-6xl mx-auto px-6 pt-8 pb-20">
      <div className="mt-2 flex gap-2 flex-wrap items-center mb-[20px]">
                <button
                  onClick={() => setActiveTag(null)}
                  className={`text-xs px-2 py-1 rounded-md border hover:bg-white/10 border-white/6 ${activeTag === null ? "bg-white/10" : "bg-transparent"}`}
                >
                  All
                </button>
                {allTags.map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTag((s) => (s === t ? null : t))}
                    className={`text-xs px-2 py-1 rounded-md border uppercase hover:bg-white/10 border-white/6 ${activeTag === t ? "bg-white/10" : "bg-transparent"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          <section className="md:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <AnimatePresence>
                {filtered.slice(0, visibleCount).map((post) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    whileHover={{ scale: 1.01 }}
                    className="rounded-2xl overflow-hidden bg-white/3 border border-white/6"
                  >
                    <div className="h-40 sm:h-44 md:h-36 lg:h-44 overflow-hidden">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div className="text-xs text-white/60">{new Date(post.date).toLocaleDateString()}</div>
                        <div className="flex gap-2">
                          {post.tags.map((t) => (
                            <span key={t} className="text-xs bg-white/6 px-2 py-1 rounded-md">{t}</span>
                          ))}
                        </div>
                      </div>

                      <h3 className="mt-3 font-semibold text-lg leading-tight">{post.title}</h3>
                      <p className="mt-2 text-sm text-white/70">{post.excerpt}</p>

                      <div className="mt-4 flex items-center justify-between">
                        <a href={post.link} target="_blank" className="text-sm text-indigo-200 underline decoration-indigo-400/30 hover:text-cyan-500">Read article →</a>
                        <div className="text-xs text-white/60">3 min read</div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>

            {filtered.length === 0 && (
              <div className="mt-8 text-center text-white/70">No posts match your search or filters.</div>
            )}

            {visibleCount < filtered.length && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => setVisibleCount((c) => c + 6)}
                  className="px-4 py-2 rounded-lg bg-white/6 hover:bg-white/8 underline hover:opacity-90"
                >
                  Load more
                </button>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
