import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles, PhoneCall, ExternalLink, Clock } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const FloatingConcierge: React.FC = () => {
  const { navigateTo, setIsSizeGuideOpen } = useShop();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'concierge' | 'user'; text: string; time: string }>>([
    {
      sender: 'concierge',
      text: 'Good day. Welcome to Maison Aura Client Concierge. How may I assist your style curation today?',
      time: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');

  const quickPrompts = [
    { label: 'Sizing Advice', action: () => handleSendPrompt('Could you advise on sizing measurements?') },
    { label: 'Shipping & Delivery', action: () => handleSendPrompt('What are your delivery timelines for Mumbai and Delhi?') },
    { label: 'Book Atelier Visit', action: () => handleSendPrompt('I would like to book a private styling session at the atelier.') }
  ];

  const handleSendPrompt = (text: string) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMessages = [
      ...messages,
      { sender: 'user' as const, text, time: timeStr }
    ];
    setMessages(newMessages);

    setTimeout(() => {
      let reply = 'Thank you for your enquiry. Our client advisors are at your service.';
      if (text.toLowerCase().includes('sizing') || text.toLowerCase().includes('size')) {
        reply = 'Our garments are crafted to relaxed contemporary proportions. We recommend your true size, or consult our interactive Size Guide for precise bust, waist, and hip specifications.';
      } else if (text.toLowerCase().includes('shipping') || text.toLowerCase().includes('deliver')) {
        reply = 'Orders above ₹2,999 receive complimentary express delivery. Metro orders are delivered in 2–3 business days via Blue Dart Luxury Express.';
      } else if (text.toLowerCase().includes('atelier') || text.toLowerCase().includes('visit')) {
        reply = 'Our private styling salons in Mumbai Colaba, Delhi Chanakya, and Bengaluru Indiranagar welcome guests daily. Would you like to view our Store Locator?';
      }

      setMessages(prev => [
        ...prev,
        {
          sender: 'concierge' as const,
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userText = input;
    setInput('');
    handleSendPrompt(userText);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <button
        id="floating-concierge-btn"
        onClick={() => setIsOpen(true)}
        aria-label="Open Boutique Concierge"
        className={`fixed bottom-20 lg:bottom-8 right-5 z-40 p-3.5 bg-[#1C1B1A] text-[#FAF8F5] rounded-full shadow-2xl hover:bg-[#322F2D] hover:scale-105 transition-all duration-300 border border-[#3E3A37] flex items-center space-x-2 ${
          isOpen ? 'scale-0 pointer-events-none' : 'scale-100'
        }`}
      >
        <MessageCircle className="w-5 h-5 text-[#DFCFBE]" />
        <span className="hidden sm:inline text-xs tracking-wider uppercase font-medium pr-1 text-[#FAF8F5]">
          Concierge
        </span>
      </button>

      {/* Concierge Drawer / Modal */}
      {isOpen && (
        <div className="fixed bottom-6 right-4 sm:right-6 w-[92vw] sm:w-[380px] bg-[#FAF8F5] rounded-lg shadow-2xl border border-[#E8DFC8] z-50 overflow-hidden flex flex-col h-[520px] transition-all animate-slide-up">
          {/* Header */}
          <div className="bg-[#1C1B1A] text-[#FAF8F5] p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-[#322F2D] border border-[#524B46] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#DFCFBE]" />
              </div>
              <div>
                <h4 className="font-serif text-base tracking-wide font-medium">Maison Aura Concierge</h4>
                <p className="text-[10px] text-[#DFCFBE] flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] inline-block mr-1.5" />
                  Stylist Active • Online
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#8E8279] hover:text-[#FAF8F5] p-1"
              aria-label="Close Concierge"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs bg-[#FAF8F5]">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3 max-w-[85%] rounded-lg leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#1C1B1A] text-[#FAF8F5]'
                      : 'bg-[#F3EFEA] text-[#1C1B1A] border border-[#E8DFC8]'
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[9px] text-[#8E8279] mt-1 px-1">
                  {m.time}
                </span>
              </div>
            ))}
          </div>

          {/* Quick Prompts */}
          <div className="px-4 py-2 border-t border-[#EDE7DF] bg-[#F9F7F4] flex flex-wrap gap-1.5">
            {quickPrompts.map((p, i) => (
              <button
                key={i}
                onClick={p.action}
                className="text-[11px] px-2.5 py-1 bg-white border border-[#E5DDD2] rounded-full text-[#1C1B1A] hover:border-[#1C1B1A] transition-colors"
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Quick Action Shortcuts */}
          <div className="px-4 py-2 bg-[#FAF8F5] border-t border-[#EDE7DF] flex items-center justify-between text-[11px]">
            <button
              onClick={() => { setIsSizeGuideOpen(true); setIsOpen(false); }}
              className="text-[#8E8279] hover:text-[#1C1B1A] underline underline-offset-2"
            >
              Open Size Guide
            </button>
            <a
              href="https://wa.me/919820089201"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#15803d] hover:underline flex items-center font-medium"
            >
              WhatsApp Concierge <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </div>

          {/* Input Box */}
          <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-[#EDE7DF] flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about fabrics, styling, or fit..."
              className="flex-1 text-xs px-3 py-2 border border-[#E5DDD2] rounded focus:outline-none focus:border-[#1C1B1A]"
            />
            <button
              type="submit"
              className="p-2 bg-[#1C1B1A] text-[#FAF8F5] rounded hover:bg-[#3A3734] transition-colors shrink-0"
              aria-label="Send message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
