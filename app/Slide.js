import React, { useEffect, useState } from "react";

export default function Slide() {
  const slides = [
    {
      id: 1,
      img: "https://cdn.prod.website-files.com/67116d0daddc92483c812e88/681cac21c3c411239028d02f_cpn-bridge.jpg",
      alt: "Decentralized Consensus",
      title: "Circle Payments Network",
      desc: "Helping financial institutions achieve seamless, near-instant, global money movement across previously fragmented networks.",
      buttonText: "Discover CPN",
      buttonLink: "https://www.circle.com/cpn",
    },
    {
      id: 2,
      img: "https://cdn.prod.website-files.com/67116d0daddc92483c812e88/689a494a7890583da6626c73_arc-carousel-p-1080.jpg",
      alt: "The home for stablecoin finance",
      title: "The home for stablecoin finance",
      desc: "An open Layer-1 blockchain purpose-built for stablecoin payments, FX, and capital markets.",
      buttonText: "Explore Now",
      buttonLink: "https://www.arc.network/",
    },
    {
      id: 3,
      img: "https://cdn.prod.website-files.com/67116d0daddc92483c812e88/686e6a09f105a48e72a39d2d_genius-feature-m.webp",
      alt: "We’ve been building for this moment",
      title: "We’ve been building for this moment",
      desc: "With US stablecoin law in place, Circle and USDC are primed for what comes next.",
      buttonText: "Learn more",
      buttonLink: "https://www.circle.com/genius-act",
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-full h-64 sm:h-[360px] lg:h-[460px] overflow-hidden rounded-2xl shadow-lg">
      {/* Track */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((s) => (
          <div
            key={s.id}
            className="relative w-full flex-shrink-0 h-full border-none"
          >
            <img
              src={s.img}
              alt={s.alt}
              className="w-full h-full object-cover"
            />

            {/* Overlay nội dung */}
            <div className="absolute inset-0 flex flex-col justify-center items-start px-6 sm:px-12 text-black">
              <h1 className="text-lg sm:text-2xl lg:text-[48px] mb-[20px] font-bold drop-shadow-lg">
                {s.title}
              </h1>
              <p className="text-sm sm:text-base lg:text-xl mb-4 max-w-lg drop-shadow">
                {s.desc}
              </p>
              <a
                href={s.buttonLink} target="_blank"
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 rounded-lg text-sm mt-[40px] sm:text-base transition font-bold text-white"
              >
                {s.buttonText}
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Dots indicator */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full transition ${
              i === index ? "bg-amber-500 scale-110" : "bg-white/60 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
