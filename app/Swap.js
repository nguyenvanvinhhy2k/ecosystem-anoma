import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Repeat,
  Send,
  Coins,
  Download,
  Upload,
} from "lucide-react";

// ================== Helpers ==================
function formatAmount(amount, decimals = 18) {
  if (!amount || isNaN(amount)) return "0";
  const fixed = decimals > 6 ? 6 : decimals;
  return Number(amount).toFixed(fixed);
}

function shortenAddress(addr) {
  return addr.slice(0, 6) + "..." + addr.slice(-4);
}

function validAddress(addr) {
  return /^0x[a-fA-F0-9]{6,}$/.test(addr);
}

// ================== Confirm Modal ==================
function ConfirmModal({ open, action, details, onConfirm, onClose }) {
  if (!open) return null;

  const renderDetails = () => {
    if (action === "Swap") {
      const [ , ,from, ,amount, to] = details.split(" ");

      console.log('', details.split(" "))
      return (
        <div className="text-left space-y-2">
          <p><span className="font-semibold">Action:</span> Swap</p>
          <p><span className="font-semibold">From:</span> {amount} {from}</p>
          <p><span className="font-semibold">To:</span> {to}</p>
        </div>
      );
    }
    if (action === "Send") {
      const [,amount, token, ,address] = details.split(" ");
      return (
        <div className="text-left space-y-2">
          <p><span className="font-semibold">Action:</span> Send</p>
          <p><span className="font-semibold">Token:</span> {token}</p>
          <p><span className="font-semibold">Amount:</span> {amount}</p>
          <p><span className="font-semibold">To Address:</span> {address}</p>
        </div>
      );
    }
    if (action === "Stake") {
      const [, amount,token,] = details.split(" ");
      return (
        <div className="text-left space-y-2">
          <p><span className="font-semibold">Action:</span> Stake</p>
          <p><span className="font-semibold">Token:</span> {token}</p>
          <p><span className="font-semibold">Amount:</span> {amount}</p>
        </div>
      );
    }
    return <p>{details}</p>;
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-2xl shadow-xl w-96">
        <h2 className="text-lg font-bold mb-4 text-center">
          Confirm {action}
        </h2>
        {renderDetails()}
        <div className="mt-6 flex justify-end space-x-3">
          <button variant="outline" onClick={onClose}>
            Cancel
          </button>
          <button onClick={() => { onConfirm(); onClose(); }}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}


// ================== Logs ==================
function ActivityLog({ logs }) {
  const icons = {
    Swap: <Repeat className="w-4 h-4 text-blue-400" />,
    Send: <Send className="w-4 h-4 text-pink-400" />,
    Stake: <Coins className="w-4 h-4 text-green-400" />,
    Topup: <Download className="w-4 h-4 text-yellow-400" />,
    Receive: <Upload className="w-4 h-4 text-purple-400" />,
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 mt-4 max-w-5xl m-auto">
      <h3 className="font-bold mb-3">Activity Log</h3>
      <ul className="space-y-2 text-sm">
        {logs.map((log, i) => (
          <li key={i} className="flex items-center gap-2">
            {icons[log.type] || null}
            <span>
              {log.type}: {log.amount} {log.token}
              {log.extra ? ` → ${log.extra}` : ""}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Toast({ message }) {
  if (!message) return null;
  return (
    <motion.div
      className="fixed bot-1 right-5 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {message}
    </motion.div>
  );
}

const generateRandomAddress = () => {
  const chars = "abcdef0123456789";
  let addr = "0x";
  for (let i = 0; i < 40; i++) {
    addr += chars[Math.floor(Math.random() * chars.length)];
  }
  return addr;
};

// ================== Main App ==================
export default function App() {
  const [tokens, setTokens] = useState({
    XAN: { balance: 1000, decimals: 18 },
    BTC: { balance: 500, decimals: 12 },
    ETH: { balance: 2000, decimals: 8 },
  });

  const [logs, setLogs] = useState([]);
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  // Swap state
  const [fromToken, setFromToken] = useState("XAN");
  const [toToken, setToToken] = useState("BTC");
  const [swapAmount, setSwapAmount] = useState("");

  // Send state
  const [sendToken, setSendToken] = useState("XAN");
  const [sendAmount, setSendAmount] = useState("");
  const [sendTo, setSendTo] = useState("");

  // Stake state
  const [stakeToken, setStakeToken] = useState("XAN");
  const [stakeAmount, setStakeAmount] = useState("");
  const [staked, setStaked] = useState({ XAN: 0, BTC: 0, ETH: 0 });

  // Receive
  const myAddress = "0xc0910abd53e946fc9814fe21dd05e0d828c3eb07";

  // Confirm modal
  const [confirm, setConfirm] = useState({
    open: false,
    action: "",
    details: "",
    onConfirm: null,
  });

  // Rates
  const rates = {
    "XAN->BTC": 2,
    "XAN->XAN": 1,
    "BTC->XAN": 0.5,
    "BTC->BTC": 1,
    "XAN->ETH": 1.5,
    "ETH->XAN": 0.66,
    "ETH->ETH": 1,
    "BTC->ETH": 0.75,
    "ETH->BTC": 1.33,
  };

  // Estimate
  const estimate = useMemo(() => {
    if (!swapAmount) return 0;
    const key = `${fromToken}->${toToken}`;
    return rates[key] ? swapAmount * rates[key] : 0;
  }, [swapAmount, fromToken, toToken]);

  // Add log
  const addLog = (type, token, amount, extra = "") => {
    setLogs((prev) => [
      { type, token, amount: formatAmount(amount), extra },
      ...prev.slice(0, 19),
    ]);
  };

  // Actions
  const doSwap = () => {
    if (!swapAmount || isNaN(swapAmount)) return;
    if (fromToken === toToken) return;
    if (swapAmount > tokens[fromToken].balance) return;

    setTokens((prev) => ({
      ...prev,
      [fromToken]: {
        ...prev[fromToken],
        balance: prev[fromToken].balance - +swapAmount,
      },
      [toToken]: {
        ...prev[toToken],
        balance: prev[toToken].balance + estimate,
      },
    }));

    addLog("Swap", fromToken, swapAmount, `→ ${estimate} ${toToken}`);
    showToast(`Swapped ${swapAmount} ${fromToken} → ${estimate} ${toToken}`);
    setSwapAmount("");
  };

  const doSend = () => {
    if (!sendAmount || isNaN(sendAmount)) return;
    if (!validAddress(sendTo)) return;
    if (sendAmount > tokens[sendToken].balance) return;

    setTokens((prev) => ({
      ...prev,
      [sendToken]: {
        ...prev[sendToken],
        balance: prev[sendToken].balance - +sendAmount,
      },
    }));

    addLog("Send", sendToken, sendAmount, shortenAddress(sendTo));
    showToast(`Sent ${sendAmount} ${sendToken} to ${shortenAddress(sendTo)}`);
    setSendAmount("");
    setSendTo("");
  };

  const doStake = () => {
    if (!stakeAmount || isNaN(stakeAmount)) return;
    if (stakeAmount > tokens[stakeToken].balance) return;

    setTokens((prev) => ({
      ...prev,
      [stakeToken]: {
        ...prev[stakeToken],
        balance: prev[stakeToken].balance - +stakeAmount,
      },
    }));

    setStaked((prev) => ({
      ...prev,
      [stakeToken]: prev[stakeToken] + +stakeAmount,
    }));

    addLog("Stake", stakeToken, stakeAmount);
    showToast(`Staked ${stakeAmount} ${stakeToken}`);
    setStakeAmount("");
  };

  const doTopup = (token) => {
    setTokens((prev) => ({
      ...prev,
      [token]: { ...prev[token], balance: prev[token].balance + 100 },
    }));
    addLog("Topup", token, 100);
  };

  const doReceive = () => {
    navigator.clipboard.writeText(myAddress);
    showToast("Copied address");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
      <div className="max-w-5xl mx-auto mb-[30px] font-bold text-center mt-[20px] text-[26px]">Anoma Multichain Intents — swap, staking, sending, receiving</div>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Balances */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h2 className="font-bold mb-3">Balances</h2>
          <ul className="space-y-2">
            {Object.entries(tokens).map(([sym, { balance, decimals }]) => (
              <li key={sym} className="flex justify-between">
                <span>{sym}</span>
                <span>
                  {formatAmount(balance, decimals)} {sym}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Swap */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h2 className="font-bold mb-3 flex items-center gap-2">
            <Repeat className="w-4 h-4" /> Swap
          </h2>
          <div className="flex gap-2 mb-2">
            <input
              type="number"
              placeholder="Amount"
              value={swapAmount}
              onChange={(e) => setSwapAmount(e.target.value)}
              className="sm:flex-1 w-[40%] bg-white/10 p-2 rounded"
            />
            <select
              value={fromToken}
              onChange={(e) => setFromToken(e.target.value)}
              className="bg-white/10 p-2 rounded"
            >
              {Object.keys(tokens).map((t) => (
                <option className="bg-white/10 p-2 rounded text-black" key={t}>{t}</option>
              ))}
            </select>
            <button
              className="px-2 bg-white/10 rounded"
              onClick={() => {
                setFromToken(toToken);
                setToToken(fromToken);
              }}
            >
              🔄
            </button>
            <select
              value={toToken}
              onChange={(e) => setToToken(e.target.value)}
              className="bg-white/10 p-2 rounded"
            >
              {Object.keys(tokens).map((t) => (
                <option className="bg-white/10 p-2 rounded text-black" key={t}>{t}</option>
              ))}
            </select>
          </div>
          <p className="text-xs mb-2">You get: {formatAmount(estimate)}</p>
          <button
            className="w-full bg-blue-500 rounded p-2 hover:opacity-90"
            onClick={() =>
              setConfirm({
                open: true,
                action: "Swap",
                details: `Swap ${swapAmount} ${fromToken} → ${estimate} ${toToken}`,
                onConfirm: () => {
                  doSwap();
                  setConfirm({ ...confirm, open: false });
                },
              })
            }
          >
            Swap
          </button>
        </div>

        {/* Send */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h2 className="font-bold mb-3 flex items-center gap-2">
            <Send className="w-4 h-4" /> Send
          </h2>
          <input
            type="text"
            placeholder="Recipient (0x..)"
            value={sendTo}
            onChange={(e) => setSendTo(e.target.value)}
            className="w-full bg-white/10 p-2 rounded mb-2"
          />
          <div className="flex gap-2 mb-2">
            <input
              type="number"
              placeholder="Amount"
              value={sendAmount}
              onChange={(e) => setSendAmount(e.target.value)}
              className="flex-1 bg-white/10 p-2 rounded"
            />
            <select
              value={sendToken}
              onChange={(e) => setSendToken(e.target.value)}
              className="bg-white/10 p-2 rounded"
            >
              {Object.keys(tokens).map((t) => (
                <option className="bg-white/10 p-2 rounded text-black" key={t}>{t}</option>
              ))}
            </select>
          </div>
          <button
            className="w-full bg-pink-500 rounded p-2 hover:opacity-90"
            onClick={() =>
              setConfirm({
                open: true,
                action: "Send",
                details: `Send ${sendAmount} ${sendToken} → ${shortenAddress(
                  sendTo
                )}`,
                onConfirm: () => {
                  doSend();
                  setConfirm({ ...confirm, open: false });
                },
              })
            }
          >
            Send
          </button>
        </div>

        {/* Stake */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h2 className="font-bold mb-3 flex items-center gap-2">
            <Coins className="w-4 h-4" /> Stake
          </h2>
          <div className="flex gap-2 mb-2">
            <input
              type="number"
              placeholder="Amount"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              className="flex-1 bg-white/10 p-2 rounded"
            />
            <select
              value={stakeToken}
              onChange={(e) => setStakeToken(e.target.value)}
              className="bg-white/10 p-2 rounded"
            >
              {Object.keys(tokens).map((t) => (
                <option className="bg-white/10 p-2 rounded text-black" key={t}>{t}</option>
              ))}
            </select>
          </div>
          <p className="text-xs mb-2">
            Staked {stakeToken}: {staked[stakeToken]}
          </p>
          <button
            className="w-full bg-green-500 rounded p-2 hover:opacity-90"
            onClick={() =>
              setConfirm({
                open: true,
                action: "Stake",
                details: `Stake ${stakeAmount} ${stakeToken}`,
                onConfirm: () => {
                  doStake();
                  setConfirm({ ...confirm, open: false });
                },
              })
            }
          >
            Stake
          </button>
        </div>

        {/* Topup & Receive */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h2 className="font-bold mb-3">Top Up & Receive</h2>
          <div className="flex gap-2 mb-2">
            {Object.keys(tokens).map((t) => (
              <button
                key={t}
                className="flex-1 bg-yellow-500 rounded p-2 hover:opacity-90"
                onClick={() => doTopup(t)}
              >
                +100 {t}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <button
            className="w-full bg-purple-500 rounded p-2 hover:opacity-90"
            onClick={doReceive}
          >
            Copy My Address
          </button>

          <button
           className="w-full bg-purple-500 rounded p-2 hover:opacity-90 mt-[10px]"
            variant="outline"
           onClick={() => setSendTo(generateRandomAddress())}
            >
            Random Address
           </button>

        </div>
      </div>

      

      <ActivityLog logs={logs} />

      <ConfirmModal
        open={confirm.open}
        action={confirm.action}
        details={confirm.details}
        onConfirm={confirm.onConfirm}
        onClose={() => setConfirm({ ...confirm, open: false })}
      />

       <Toast message={toast} />
    </div>
  );
}
