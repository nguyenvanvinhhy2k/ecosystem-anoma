import React, { useEffect, useRef, useState } from 'react';
import botchat from "./images/botchat-new.png"

export default function Bot() {
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { id: "init-msg", role: "bot", text: "Hello 👋 I am a Virtual Assistant supporter. How can I help you?" }
  ]);

  const scrollRef = useRef(null);
  const textareaRef = useRef(null);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isSending) return;

    const userMsg = { id: crypto.randomUUID(), role: "user", text: trimmed };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setIsSending(true);
    setLoading(true)

    const botId = crypto.randomUUID();
    setMessages((m) => [...m, { id: botId, role: "bot", text: "" }]);

    try {
      const res = await fetch(
        "https://api.fireworks.ai/inference/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_FIREWORKS_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "accounts/sentientfoundation/models/dobby-unhinged-llama-3-3-70b-new",
            max_tokens: 1024,
            temperature: 0.5,
            top_p: 0.95,
            messages: [
              {
                role: "system",
                content:
                  "You are a Virtual Assistant, Can answer everything",
              },
              {
                role: "user",
                content: trimmed,
              },
            ],
          }),
        }
      );

      const data = await res.json();

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botId ? { ...msg, text: data?.choices[0]?.message?.content } : msg
        )
      );
    } catch (err) {
      console.error(err);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botId ? { ...msg, text: "Error occurred while fetching response" } : msg
        )
      );
    } finally {
      setLoading(false);
      setIsSending(false)
    }
  };


  function onKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  
  useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [open, messages]);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "0px";
    const next = Math.min(144, el.scrollHeight);
    el.style.height = next + "px";
  }, [input, open]);

  return (
    <div className="h-screen flex pt-[40px] justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white p-6">
      <div className="w-full max-w-2xl h-[80vh] flex flex-col border-2 border-indigo-500 rounded-2xl shadow-[0_0_20px_rgba(99,102,241,0.7)] bg-black/40 backdrop-blur">
        {/* Header */}
        <header className="p-4 border-b border-indigo-500 bg-black/30 font-semibold text-indigo-300 shadow-lg rounded-t-2xl flex items-center gap-2"> <img className='h-10 w-10' src={botchat.src} /> Virtual Assistant</header>

        {/* Messages */}
        <div className="flex-1 overflow-auto p-4" style={{ WebkitOverflowScrolling: 'touch' }} ref={scrollRef} >
          <div className="max-w-full">
          {messages.map((m, i) => {
                const isLast = i === m.length - 1;
                return (
                <div key={i} className={`flex mb-2 ${m.role === "user" ? 'justify-end' : 'justify-start'}`}>
                {m.role === "user" ? (
                <div className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white rounded-tr-xl rounded-bl-xl rounded-tl-xl max-w-[70%] p-2 shadow-lg text-sm backdrop-blur">
                  {m.text}
                </div> ) : loading && isLast ? (
                        <div className="flex items-center space-x-1 text-whitep-3 rounded-xl">
                          <span className="w-2 h-2 rounded-full bg-white animate-dot1"></span>
                          <span className="w-2 h-2 rounded-full bg-white animate-dot2"></span>
                          <span className="w-2 h-2 rounded-full bg-white animate-dot3"></span>
                        </div>
                      ) : (
                        <div className='bg-black/40 border border-indigo-700 text-indigo-200 rounded-tl-xl rounded-br-xl rounded-tr-xl max-w-[70%] p-3 shadow-lg text-sm backdrop-blur'>
                        {m.text}
                        </div>
                      )}
                {m.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-indigo-500 text-white flex items-center justify-center ml-2 text-sm">U</div>
                )}
              </div>
              );
            })}
          </div>
        </div>

        {/* Input */}
        <div className="p-3 border-t border-indigo-700 bg-black/40 rounded-b-2xl">
          <div className="flex items-end gap-3">
            <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
              placeholder="Enter message... (Enter to send)"
              className="flex-1 resize-none rounded-xl border border-indigo-700 bg-black/60 px-3 py-2 min-h-[44px] max-h-36 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-white placeholder-indigo-300"
            />
            <button
                  onClick={handleSend}
                  disabled={!input.trim() || isSending}
              className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white px-5 py-2 rounded-xl shadow hover:opacity-90 transition"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

