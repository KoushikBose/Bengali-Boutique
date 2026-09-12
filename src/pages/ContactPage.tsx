import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, Clock, MapPin, Send, CheckCircle2, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ContactPage: React.FC = () => {
  const { addToast } = useShop();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Order & Sizing Inquiries');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    addToast('Message Transmitted', 'Our private client concierge will respond within 2 business hours.', 'success');
  };

  return (
    <div id="contact-page-root" className="min-h-screen bg-[#FAF8F5] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#8E8279] font-medium block mb-2">
            Private Client Relations
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#1C1B1A] font-normal">
            CONTACT CONCIERGE
          </h1>
          <p className="text-xs sm:text-sm text-[#7B726B] mt-2 font-light">
            Our atelier specialists are available 7 days a week to advise on garment sizing, bespoke styling, and orders.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: Direct Contact Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-[#EDE7DF] p-6 sm:p-8 space-y-6">
              <h3 className="font-serif text-xl text-[#1C1B1A] pb-3 border-b border-[#EDE7DF]">
                Atelier Channels
              </h3>

              <div className="space-y-4 text-xs text-[#524B46]">
                <div className="flex items-start space-x-3">
                  <MessageSquare className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#1C1B1A] block">WhatsApp Concierge</span>
                    <p className="text-[#8E8279]">Immediate stylist chat & order updates</p>
                    <a
                      href="https://wa.me/919820012345"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1C1B1A] font-medium underline mt-1 inline-block"
                    >
                      Open WhatsApp Chat (+91 98200 12345)
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 pt-4 border-t border-[#EDE7DF]">
                  <Phone className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#1C1B1A] block">Telephone Concierge</span>
                    <p className="text-[#8E8279]">Monday through Sunday • 10:00 AM – 8:30 PM IST</p>
                    <a href="tel:+912222884100" className="text-[#1C1B1A] font-medium underline mt-1 inline-block">
                      +91 (0) 22 2288 4100
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 pt-4 border-t border-[#EDE7DF]">
                  <Mail className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#1C1B1A] block">Electronic Correspondence</span>
                    <p className="text-[#8E8279]">Guaranteed response within 2 hours</p>
                    <a href="mailto:concierge@maisonaura.com" className="text-[#1C1B1A] font-medium underline mt-1 inline-block">
                      concierge@maisonaura.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 pt-4 border-t border-[#EDE7DF]">
                  <Clock className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#1C1B1A] block">Response Commitment</span>
                    <p className="text-[#7B726B]">
                      Messages received outside operating hours will be prioritized first upon morning atelier opening at 10:00 AM IST.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Press / Wholesale Card */}
            <div className="p-6 bg-[#F3EFEA] border border-[#E8DFC8]">
              <h4 className="font-serif text-base text-[#1C1B1A] mb-1">Press & Editorial Inquiries</h4>
              <p className="text-xs text-[#7B726B] mb-2">
                For fashion editors, stylists, and celebrity dressing requests:
              </p>
              <a href="mailto:press@maisonaura.com" className="text-xs font-semibold text-[#1C1B1A] underline">
                press@maisonaura.com
              </a>
            </div>
          </div>

          {/* RIGHT: Contact Form */}
          <div className="lg:col-span-7 bg-white border border-[#EDE7DF] p-6 sm:p-10 shadow-xs">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="font-serif text-2xl text-[#1C1B1A] pb-3 border-b border-[#EDE7DF]">
                  Send a Message to the Atelier
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block uppercase tracking-wider text-[#8E8279] text-[11px] mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="e.g. Ananya Sharma"
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#DDD5C9] focus:outline-none focus:border-[#1C1B1A]"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-[#8E8279] text-[11px] mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="ananya@example.com"
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#DDD5C9] focus:outline-none focus:border-[#1C1B1A]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block uppercase tracking-wider text-[#8E8279] text-[11px] mb-1">Inquiry Subject</label>
                    <select
                      value={subject}
                      onChange={e => setSubject(e.target.value)}
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#DDD5C9]"
                    >
                      <option>Order & Sizing Inquiries</option>
                      <option>Private Salon Appointment</option>
                      <option>Made-to-Measure Custom Tailoring</option>
                      <option>International Shipping / Customs</option>
                      <option>Corporate Gifting</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block uppercase tracking-wider text-[#8E8279] text-[11px] mb-1">Your Message</label>
                    <textarea
                      rows={5}
                      required
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="How may our stylists assist you today? Please include any garment names or order numbers..."
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#DDD5C9] focus:outline-none focus:border-[#1C1B1A]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#1C1B1A] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#333130] transition-colors flex items-center justify-center space-x-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Inquiry</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-12 space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#ecfdf5] text-[#15803d] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl text-[#1C1B1A]">
                  Thank You, {name || 'Client'}
                </h3>
                <p className="text-xs text-[#7B726B] max-w-sm mx-auto leading-relaxed">
                  Your inquiry regarding <em>{subject}</em> has been routed directly to our senior client concierge. We will respond to {email} promptly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setMessage('');
                  }}
                  className="mt-4 px-6 py-2.5 border border-[#DDD5C9] text-xs uppercase tracking-wider font-medium text-[#1C1B1A]"
                >
                  Send Another Inquiry
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
