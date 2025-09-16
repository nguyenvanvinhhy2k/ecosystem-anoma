import React, { useState, useRef } from "react";
import Confetti from "react-confetti";
import useSound from "use-sound";
import html2canvas from "html2canvas";
import logo from "../app/images/anoma.jpg"
import reward1 from "../app/images/s1.jpg"
import reward2 from "../app/images/s2.jpg"
import reward3 from "../app/images/s3.jpg"
import reward4 from "../app/images/s4.jpg"
import reward5 from "../app/images/s5.jpg"
import reward6 from "../app/images/s6.jpg"
import reward7 from "../app/images/s7.jpg"
import reward8 from "../app/images/s8.jpg"
import reward9 from "../app/images/s9.jpg"
import reward11 from "../app/images/s10.jpg"
import reward12 from "../app/images/s11.jpg"
import reward13 from "../app/images/s12.jpg"
import reward14 from "../app/images/s13.jpg"
import reward16 from "../app/images/s14.jpg"
import r1 from "../app/images/s1.jpg"
import r2 from "../app/images/s3.jpg"
import r3 from "../app/images/s5.jpg"
import r4 from "../app/images/s6.jpg"
import r5 from "../app/images/s8.jpg"
import r6 from "../app/images/s2.jpg"
import r7 from "../app/images/s10.jpg"

const symbols = [r5.src, r7.src, r2.src, r4.src, r6.src, r3.src, r1.src]
const images = [reward1, reward2, reward3, reward4, reward5, reward6, reward7, reward8, reward9, reward11, reward12, reward13, reward14, reward16];

const NFT = () => {
  const [spinning, setSpinning] = useState(false);
  const [popupStep, setPopupStep] = useState(0);
  const [winnerName, setWinnerName] = useState('');
  const reelsRef = useRef([]);
  const finalSymbols = useRef([]);
  const certRef = useRef(null);
  const [currentImage, setCurrentImage] = useState(images[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [spinCount, setSpinCount] = useState(0);

  const [playSpin, { stop }] = useSound("https://chiennvtodolist.runasp.net/api/FileAudio/get/1c44c052-8c01-4619-bc97-793c211f3d2e.mp3", {
    loop: true,
    from: [ 3000, 100000],
    volume: 0.8,  
    onplay: () => setIsPlaying(true),
    onend: () => setIsPlaying(false),
  });
  const [playWin] = useSound("https://anomageidcard.xyz/audio/yayy.mp3", { volume: 0.8 });

  const handleRandom = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setCurrentImage(images[randomIndex]);
  };

  const handleDownload = async () => {
    if (!certRef.current) return;
  

    await document.fonts.ready;
  
    const src = certRef.current;
    const rect = src.getBoundingClientRect();
  
 
    const clone = src.cloneNode(true);
  

    clone.style.position = "fixed";
    clone.style.left = "-100000px";
    clone.style.top = "0";
    clone.style.width = rect.width + "px";
    clone.style.height = rect.height + "px";
    clone.style.margin = "0";
    clone.style.transform = "none";
    clone.style.opacity = "1";      
    clone.style.pointerEvents = "none";
    clone.style.zIndex = "-1";
  

    const target = clone.querySelector("#winner");
    if (target) {
      const parent = target.offsetParent || clone;
      parent.getBoundingClientRect();
  

      const curPos = window.getComputedStyle(target).position;
      if (curPos === "static" || !curPos) {
        target.style.position = "absolute";
      }
  

      target.style.top = "53%";
    }
  

    document.body.appendChild(clone);
  
    const canvas = await html2canvas(clone, {
      useCORS: true,
      scale: window.devicePixelRatio,
      backgroundColor: null,
    });
  

    document.body.removeChild(clone);
  

    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "jackpot-check.png";
    link.click();
  };
  

  const handleShareX = () => {
    const text = encodeURIComponent(
      `🎉 I just won the SHRIMPERS NFT in NFT MACHINE!
      @anoma #NFTMACHINE`
    );
    const url = `https://twitter.com/intent/tweet?text=${text}`;
    window.open(url, "_blank");
  };

 // đảm bảo bạn có: const [spinCount, setSpinCount] = useState(0);
// và reelsRef.current là array 3 reel DOM nodes
const spin = () => {
  if (spinning) return;

  setSpinning(true);
  setPopupStep(0);

  const nextCount = (typeof spinCount === "number" ? spinCount + 1 : 1);
  setSpinCount(nextCount);

  const isForced = nextCount > 8;
  const forcedIndex = isForced ? Math.floor(Math.random() * symbols.length) : -1;

  if (!isPlaying) {
    playSpin();
  }

  const firstReel = reelsRef.current.find(Boolean);
  const sampleItem = firstReel?.querySelector(".symbol-item");
  const itemHeight = sampleItem ? sampleItem.offsetHeight : (window.innerWidth <= 767 ? 61 : 93);

  reelsRef.current.forEach((reel, i) => {
    if (!reel) return;

    reel.style.transition = "none";
    reel.style.transform = "translateY(0)";
    reel.classList.add("animate-spinReel");

    setTimeout(() => {
      reel.classList.remove("animate-spinReel");

      const finalIndex = isForced ? forcedIndex : Math.floor(Math.random() * symbols.length);

      reel.style.transition = "transform 1s ease-out";
      reel.style.transform = `translateY(-${finalIndex * itemHeight}px)`;

      finalSymbols.current[i] = symbols[finalIndex];

      if (i === reelsRef.current.length - 1) {
        setTimeout(() => {
          setSpinning(false);


          if (isForced) {
            const forcedSymbol = symbols[forcedIndex];
            finalSymbols.current = [forcedSymbol, forcedSymbol, forcedSymbol];
            setPopupStep(1);
            playWin();
            setSpinCount(0);
            return;
          }

          const isWin =
            finalSymbols.current[0] === finalSymbols.current[1] &&
            finalSymbols.current[1] === finalSymbols.current[2];

          if (isWin) {
            setPopupStep(1);
            playWin();
            setSpinCount(0);
          }
        }, 1200);
      }
    }, 800 + i * 500);
  });
};


  return (
    <>
      <div className="min-h-screen flex pt-[60px] justify-center bg-gradient-to-b  via-indigo-900 to-blue-900 relative px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="w-full h-full bg-transparent"></div>
        </div>

        <div className="flex h-[70%] z-10 flex-col items-center gap-6 p-6 sm:p-8 rounded-[30px] sm:rounded-[40px] border-4 border-yellow-400 shadow-[0_0_40px_rgba(255,215,0,0.8)] bg-gradient-to-b from-[#1a0033] to-[#25004d] relative w-full max-w-xl">
          <h1 className="text-4xl sm:text-6xl font-bold text-yellow-400 drop-shadow-[0_0_20px_rgba(255,255,0,0.9)] text-center">
          NFT
          </h1>
          <h2 className="text-5xl sm:text-7xl font-extrabold text-pink-500 drop-shadow-[0_0_20px_rgba(255,0,150,0.9)]">
          MACHINE
          </h2>

          <div
            className={`flex gap-2 sm:gap-4 bg-black rounded-2xl border-4 border-cyan-400 shadow-[0_0_30px_rgba(0,255,255,0.6)] px-3 sm:px-6 py-4 sm:py-6 ${spinning ? "animate-glow" : ""
              }`}
          >
            {[...Array(3)].map((_, col) => (
              <div
                key={col}
                className="w-[80px] sm:w-[100px] md:w-[120px] h-[180px] sm:h-[220px] md:h-[280px] bg-white rounded-xl overflow-hidden flex flex-col justify-center items-center shadow-inner relative"
              >
                <div
                  ref={(el) => (reelsRef.current[col] = el)}
                  className="absolute top-0 left-0 w-full"
                >
                  {Array(50)
                    .fill(null)
                    .map((_, idx) => (
                      <div
                        key={idx}
                        className="h-[61px] sm:h-[93px] md:h-[93px] flex justify-center items-center"
                      >
                        <img
                          src={symbols[idx % symbols.length]}
                          className="w-[50px] sm:w-[65px] md:w-[80px] h-[50px] sm:h-[65px] md:h-[80px] rounded-full"
                        />
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>

          <button onClick={spin} disabled={spinning} className={` ${!spinning ? "cursor-pointer hover:scale-105" : ""} mt-6 px-8 sm:px-12 py-4 sm:py-6 text-xl sm:text-2xl font-bold rounded-full bg-gradient-to-b from-yellow-400 to-orange-600 text-black shadow-[0_0_30px_rgba(255,165,0,0.9)] border-4 border-orange-500  transition`} >
            {spinning ? "Spinning..." : "SPIN"}
          </button>
        </div>
      </div>

      {popupStep > 0 && (
        <>
          <Confetti />
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-50 px-4">
            {popupStep === 1 && (
              <div className="bg-yellow-200 p-6 rounded-2xl text-center border-yellow-400 shadow-[0_0_40px_rgba(255,215,0,0.8)] w-full max-w-sm">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-red-600">
                  🎉 Congratulations! 🎉
                </h2>
                <p className="mb-4 text-sm sm:text-base text-red-600">
                  Enter your name to receive your reward:
                </p>
                <input
                  type="text"
                  value={winnerName}
                  onChange={(e) => setWinnerName(e.target.value)}
                  className="border p-2 w-full rounded mb-4 focus:border-none text-black"
                  placeholder="Your Name"
                />
                <button
                  onClick={() => {
                    if (winnerName) {
                       setPopupStep(2)
                       handleRandom() 
                      };
                  }}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-bold"
                >
                  OK
                </button>
              </div>
            )}

            {popupStep === 2 && (
              <div className="bg-[#fdfaf3] p-6 sm:px-12 sm:py-8 rounded-2xl text-center border-4 sm:border-8 border-yellow-400 shadow-[0_0_40px_rgba(255,215,0,0.8)] relative w-full max-w-[38rem]">
                <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-red-500 mb-6 flex items-center gap-2 justify-center drop-shadow-[0_0_20px_rgba(255,0,150,0.9)]">
                  <img
                    src={logo.src}
                    className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 rounded-full"
                    alt="logo"
                  />
                  Jackpot Big Win
                </h2>
                <div className=" rounded-[30px] w-full h-[380px] sm:h-[480px] relative  bg-gradient-to-r border-4 border-yellow-400 shadow-[0_0_40px_rgba(255,215,0,0.8)]  overflow-hidden"  ref={certRef}>
                  <img src={currentImage.src} className="object-cover w-full h-full" />
                  <p id="winner" className="absolute text-[4vw] sm:text-[37px] top-[60%] left-[12%] font-signature text-black font-bold capitalize ">
                     {winnerName}
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <button
                    onClick={handleDownload}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 duration-300 hover:scale-[1.05]"
                  >
                    Download
                  </button>
                  <button
                    onClick={handleShareX}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 duration-300 hover:scale-[1.05]"
                  >
                    Share on X
                  </button>
                  <button
                    onClick={() => (setPopupStep(0), stop(), setWinnerName(""), setIsPlaying(false))}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 duration-300 hover:scale-[1.05]"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default NFT;