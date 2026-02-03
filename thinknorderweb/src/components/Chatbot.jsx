"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend } from "react-icons/fi";
import { Minus, Utensils, Zap, CheckCircle2, QrCode, Clock, Star } from "lucide-react";
import Image from "next/image";

// Creative Bot Profile matching ThinkNOrder
const thinkBot = {
  name: "ThinkBot",
  tagline: "Your Digital Concierge",
  accentColor: "#f97316", // Orange-500
};

export default function ThinkBot({ open, onClose, onOpen }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [collectedData, setCollectedData] = useState({
    name: "",
    phone: "",
    businessType: "", // Restaurant, Hotel, Cafe
    interest: "",
    scale: "",
  });
  const [conversationStep, setConversationStep] = useState("greeting");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (open && messages.length === 0) {
      addBotMessage(
        `Welcome to the future of dining! 🍔 I'm ThinkBot. I'm here to help you synchronize your venue with our QR-ordering ecosystem. What can I do for you today?`
      );
      setConversationStep("interest");
    }
  }, [open]);

  const addBotMessage = (text) => {
    const message = {
      id: Date.now().toString(),
      sender: "bot",
      text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, message]);
  };

  const addUserMessage = (text) => {
    const message = {
      id: Date.now().toString(),
      sender: "user",
      text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, message]);
  };

  const simulateBotTyping = async (text, delay = 800) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, delay));
    addBotMessage(text);
    setIsLoading(false);
  };

  // --- Creative Option Data ---
  const interestOptions = [
    "🚀 Book a Free Demo",
    "💰 Pricing & ROI",
    "🛠️ Technical Features",
    "📞 Talk to an Expert",
  ];
  
  const businessOptions = ["🍽️ Restaurant", "🏨 Hotel / Stay", "☕ Cafe / Bar", "🏢 Cloud Kitchen"];
  const scaleOptions = ["1-5 Tables", "5-20 Tables", "20+ Tables / Multi-floor"];

  // --- Handlers ---
  const handleInterestSelect = async (interest) => {
    addUserMessage(interest);
    setCollectedData({ ...collectedData, interest });
    await simulateBotTyping(`Excellent! 🎯 To give you the best experience, what type of venue do you manage?`);
    setConversationStep("businessType");
  };

  const handleBusinessSelect = async (type) => {
    addUserMessage(type);
    setCollectedData({ ...collectedData, businessType: type });
    await simulateBotTyping(`Got it. A ${type} needs precision! 📏 Roughly how many tables are we looking to digitize?`);
    setConversationStep("scale");
  };

  const handleScaleSelect = async (scale) => {
    addUserMessage(scale);
    setCollectedData({ ...collectedData, scale });
    await simulateBotTyping(`Perfect. We can definitely optimize that! ⚡ Before I connect you with our setup team, what is your name?`);
    setConversationStep("name");
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    const val = inputValue;
    setInputValue("");
    addUserMessage(val);

    if (conversationStep === "name") {
      setCollectedData({ ...collectedData, name: val });
      await simulateBotTyping(`Nice to meet you, ${val}! 👋 Almost done. Please share your 10-digit contact number for the demo link.`);
      setConversationStep("phone");
    } else if (conversationStep === "phone") {
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(val)) {
        addBotMessage("❌ Oops! That doesn't look like a valid 10-digit number. Try again?");
        return;
      }
      setCollectedData({ ...collectedData, phone: val });
      await simulateBotTyping(`Order Confirmed! 🥂 (Just kidding). Your request for ${collectedData.interest} has been sent to our founders. We'll reach out in a flash!`);
      setConversationStep("confirmation");
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[1000]">
      <AnimatePresence mode="wait">
        {open ? (
          /* --- THINKBOT WINDOW --- */
          <motion.div
            key="thinkbot-window"
            initial={{ opacity: 0, scale: 0.9, y: 50, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="lg:w-[400px] w-[340px] bg-[#0a0a0a] rounded-3xl shadow-[0_20px_50px_rgba(249,115,22,0.15)] border border-white/10 overflow-hidden flex flex-col h-[550px]"
          >
            {/* Header: Dark & Glossy */}
            <div className="p-4 bg-gradient-to-r from-orange-600 to-orange-500 text-white flex items-center gap-4 shrink-0 shadow-lg">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center border border-white/20">
                  <QrCode size={24} className="text-orange-500" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-orange-400 border-2 border-[#0a0a0a] rounded-full animate-pulse" />
              </div>
              <div className="flex-1">
                <h3 className="font-black text-lg tracking-tighter">
                  THINK<span className="text-black">BOT</span>
                </h3>
                <div className="flex items-center gap-1.5 opacity-80">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <p className="text-[10px] uppercase tracking-widest font-bold">Synchronizing...</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-black/20 rounded-xl transition-all">
                <Minus size={24} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]">
              {messages.map((msg) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-3 text-sm leading-relaxed shadow-md ${
                      msg.sender === "user"
                        ? "bg-orange-500 text-black font-bold rounded-2xl rounded-tr-none"
                        : "bg-zinc-900 text-slate-300 rounded-2xl rounded-tl-none border border-white/5"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex gap-1.5 p-3 bg-zinc-900 w-16 rounded-2xl border border-white/5">
                  <span className="w-2 h-2 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2 h-2 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input / Options Area */}
            <div className="p-4 bg-black/80 border-t border-white/10 backdrop-blur-xl">
              <AnimatePresence mode="popLayout">
                {conversationStep === "interest" && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 gap-2">
                    {interestOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleInterestSelect(opt)}
                        className="text-left px-3 py-3 rounded-xl border border-white/5 bg-zinc-900 text-white hover:bg-orange-500 hover:text-black text-[11px] font-black transition-all flex items-center gap-2"
                      >
                         {opt}
                      </button>
                    ))}
                  </motion.div>
                )}

                {conversationStep === "businessType" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-2 gap-2">
                    {businessOptions.map((b) => (
                      <button
                        key={b}
                        onClick={() => handleBusinessSelect(b)}
                        className="py-3 text-[11px] font-bold rounded-xl border border-white/5 bg-zinc-900 text-slate-300 hover:border-orange-500 hover:text-orange-500 transition-all"
                      >
                        {b}
                      </button>
                    ))}
                  </motion.div>
                )}

                {conversationStep === "scale" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-2">
                    {scaleOptions.map((s) => (
                      <button
                        key={s}
                        onClick={() => handleScaleSelect(s)}
                        className="w-full py-3 text-xs font-black rounded-xl border border-orange-500/20 bg-orange-500/5 text-orange-500 hover:bg-orange-500 hover:text-black transition-all"
                      >
                        {s}
                      </button>
                    ))}
                  </motion.div>
                )}

                {["name", "phone"].includes(conversationStep) && (
                  <div className="flex gap-2">
                    <input
                      type={conversationStep === "phone" ? "tel" : "text"}
                      autoFocus
                      className="flex-1 px-4 py-3 text-sm bg-zinc-900 border border-white/10 text-white rounded-2xl outline-none focus:border-orange-500 transition-all placeholder:text-zinc-600"
                      placeholder={conversationStep === "name" ? "Your Name..." : "Mobile Number..."}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    />
                    <button
                      onClick={handleSendMessage}
                      className="w-12 h-12 bg-orange-600 text-black rounded-2xl flex items-center justify-center shadow-lg hover:bg-orange-500 transition-all"
                    >
                      <FiSend size={20} />
                    </button>
                  </div>
                )}

                {conversationStep === "confirmation" && (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-6 px-4 bg-orange-500/10 rounded-2xl border border-orange-500/20 text-orange-500 font-black text-sm flex flex-col items-center gap-3"
                  >
                    <CheckCircle2 size={32} />
                    SYSTEM SYNCHRONIZED!
                    <p className="text-[10px] uppercase opacity-60">We'll contact you within 2 hours.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          /* --- CREATIVE ORANGE LAUNCHER --- */
          <motion.div
            key="chat-launcher"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5, scale: 1.05 }}
            className="relative cursor-pointer group"
            onClick={onOpen}
          >
            {/* Tooltip */}
            <div className="absolute -top-14 right-0 bg-orange-600 text-black px-4 py-2 rounded-2xl shadow-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
              <p className="font-black text-xs flex items-center gap-2">
                <Zap size={14} fill="currentColor" /> Let's Digitize Your Menu!
              </p>
              <div className="absolute -bottom-1 right-6 w-2 h-2 bg-orange-600 rotate-45" />
            </div>

            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-orange-600 rounded-[2rem] flex items-center justify-center shadow-[0_10px_30px_rgba(249,115,22,0.4)] border-4 border-black relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-400 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Utensils size={32} className="text-black relative z-10 group-hover:scale-110 transition-transform" />
              
              {/* Notification Badge */}
              <div className="absolute top-2 right-2 w-3 h-3 bg-white rounded-full border-2 border-orange-600" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}