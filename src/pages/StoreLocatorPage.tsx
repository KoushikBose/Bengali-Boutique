import React, { useState } from 'react';
import { MapPin, Phone, Clock, Calendar, CheckCircle2, Sparkles, Navigation } from 'lucide-react';
import { useShop } from '../context/ShopContext';

interface Store {
  id: string;
  name: string;
  city: string;
  address: string;
  hours: string;
  phone: string;
  image: string;
  features: string[];
}

export const StoreLocatorPage: React.FC = () => {
  const { addToast } = useShop();

  const stores: Store[] = [
    {
      id: 'kolkata-ballygunge',
      name: 'Maison Aura Ballygunge Flagship Salon (বালিগঞ্জ ফ্ল্যাগশিপ)',
      city: 'Kolkata',
      address: '48/1 Ballygunge Circular Road, Near Tripura House, Kolkata 700019',
      hours: 'Mon – Sun: 10:30 AM – 8:30 PM',
      phone: '+91 33 2461 8800',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop',
      features: [
        'Private Bonedi Bari Draping Suite',
        'Live Pit-Loom Weaving Demonstration',
        'Complimentary Darjeeling First-Flush Tea Service',
        'Bengal Handloommark Authentication Desk',
        'Kolkata 24-Hour Express Concierge'
      ]
    },
    {
      id: 'shantiniketan',
      name: 'Maison Aura Bolpur Crafts Atelier (শান্তিনিকেতন কুটির)',
      city: 'Shantiniketan',
      address: 'Ratan Palli, Opp. Sriniketan Crafts Village, Bolpur, Birbhum 731235',
      hours: 'Tue – Sun: 10:00 AM – 7:00 PM (Closed Wed)',
      phone: '+91 3463 252 400',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop',
      features: [
        'Live Nakshi Kantha Needlework Guild',
        'Dokra Lost-Wax Casting Demonstrations',
        'Open Terracotta Tea Courtyard',
        'Custom Monogramming on Bengal Silk'
      ]
    },
    {
      id: 'kolkata-parkstreet',
      name: 'Maison Aura Park Street Heritage Suite (পার্ক স্ট্রিট)',
      city: 'Kolkata',
      address: 'Suite 4, Heritage Arcade, 18 Park Street, Kolkata 700071',
      hours: 'Mon – Sun: 11:00 AM – 9:00 PM',
      phone: '+91 33 2229 5540',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop',
      features: [
        'Festive & Cocktail Draping Studio',
        'Master Tailor Fitting & Custom Blouse Atelier',
        'Same-Day Saree Polishing & Fall-Pico Service'
      ]
    },
    {
      id: 'mumbai',
      name: 'Maison Aura Colaba Salon',
      city: 'Mumbai',
      address: 'Vakil Chambers, Apollo Bunder, Colaba, Mumbai 400001',
      hours: 'Mon – Sun: 11:00 AM – 8:30 PM',
      phone: '+91 22 2288 4100',
      image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=800&auto=format&fit=crop',
      features: ['Private VIP Fitting Salons', 'Bengal Silk Care Concierge', 'Valet Parking']
    }
  ];

  const [selectedStore, setSelectedStore] = useState<Store>(stores[0]);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState('2025-04-18');
  const [appointmentTime, setAppointmentTime] = useState('03:00 PM');
  const [clientName, setClientName] = useState('Ananya Sharma');
  const [clientPhone, setClientPhone] = useState('+91 98200 12345');

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAppointmentModal(false);
    addToast(
      'Private Fitting Confirmed',
      `Salon appointment reserved at ${selectedStore.name} on ${appointmentDate} at ${appointmentTime}.`,
      'success'
    );
  };

  return (
    <div id="stores-page-root" className="min-h-screen bg-[#FAF8F5] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#9E2A2B] font-medium block mb-2">
            আমাদের ফ্ল্যাগশিপ সেলুন • Artisanal Boutiques
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#1C1B1A] font-normal">
            OUR SALONS & ATELIERS
          </h1>
          <p className="text-xs sm:text-sm text-[#7B726B] mt-2 font-light">
            Experience our Bengal handloom silks, live pit-loom draping, and private bridal consultations in our heritage salons.
          </p>
        </div>

        {/* Store selector tabs */}
        <div className="flex justify-center space-x-2 sm:space-x-4 mb-10 overflow-x-auto pb-2">
          {stores.map(store => (
            <button
              key={store.id}
              onClick={() => setSelectedStore(store)}
              className={`px-5 py-2.5 text-xs uppercase tracking-wider font-medium transition-colors whitespace-nowrap ${
                selectedStore.id === store.id
                  ? 'bg-[#1C1B1A] text-[#FAF8F5]'
                  : 'bg-white text-[#7B726B] border border-[#DDD5C9] hover:border-[#1C1B1A]'
              }`}
            >
              {store.city} • {store.id.includes('ballygunge') ? 'Ballygunge' : store.id.includes('shantiniketan') ? 'Bolpur' : store.id.includes('parkstreet') ? 'Park Street' : 'Colaba'}
            </button>
          ))}
        </div>

        {/* Selected Store Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white border border-[#EDE7DF] p-6 sm:p-10 shadow-xs">
          
          <div className="lg:col-span-7 aspect-[16/10] bg-[#F3EFEA] overflow-hidden">
            <img
              src={selectedStore.image}
              alt={selectedStore.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold">
                {selectedStore.city} Boutique
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#1C1B1A] font-normal mt-1 mb-4">
                {selectedStore.name}
              </h2>

              <div className="space-y-3 text-xs text-[#524B46]">
                <div className="flex items-start space-x-2.5">
                  <MapPin className="w-4 h-4 text-[#8E8279] shrink-0 mt-0.5" />
                  <span>{selectedStore.address}</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Clock className="w-4 h-4 text-[#8E8279] shrink-0" />
                  <span>{selectedStore.hours}</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Phone className="w-4 h-4 text-[#8E8279] shrink-0" />
                  <span>{selectedStore.phone}</span>
                </div>
              </div>

              {/* Atelier Amenities */}
              <div className="mt-6 pt-6 border-t border-[#EDE7DF]">
                <span className="text-[11px] uppercase tracking-wider text-[#8E8279] font-medium block mb-3">
                  Salon Amenities
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs text-[#524B46]">
                  {selectedStore.features.map((feat, i) => (
                    <div key={i} className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-[#EDE7DF] space-y-3">
              <button
                onClick={() => setShowAppointmentModal(true)}
                className="w-full py-3.5 bg-[#1C1B1A] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#333130] transition-colors"
              >
                Book Private Salon Fitting
              </button>

              <button
                onClick={() => window.open(`https://maps.google.com?q=${encodeURIComponent(selectedStore.address)}`, '_blank')}
                className="w-full py-3 bg-[#FAF8F5] text-[#1C1B1A] border border-[#DDD5C9] text-xs uppercase tracking-wider font-medium hover:bg-white transition-colors flex items-center justify-center space-x-2"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Driving Directions</span>
              </button>
            </div>

          </div>

        </div>

        {/* Appointment Modal */}
        {showAppointmentModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-[#FAF8F5] border border-[#E8DFC8] max-w-md w-full p-6 sm:p-8 relative shadow-2xl">
              <h3 className="font-serif text-2xl text-[#1C1B1A] mb-1">
                Reserve Salon Appointment
              </h3>
              <p className="text-xs text-[#7B726B] mb-6">
                {selectedStore.name}
              </p>

              <form onSubmit={handleBookAppointment} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[#8E8279] uppercase tracking-wider text-[11px] mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={e => setClientName(e.target.value)}
                    className="w-full p-2.5 bg-white border border-[#DDD5C9] focus:outline-none focus:border-[#1C1B1A]"
                  />
                </div>

                <div>
                  <label className="block text-[#8E8279] uppercase tracking-wider text-[11px] mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={e => setClientPhone(e.target.value)}
                    className="w-full p-2.5 bg-white border border-[#DDD5C9] focus:outline-none focus:border-[#1C1B1A]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#8E8279] uppercase tracking-wider text-[11px] mb-1">Preferred Date</label>
                    <input
                      type="date"
                      required
                      value={appointmentDate}
                      onChange={e => setAppointmentDate(e.target.value)}
                      className="w-full p-2.5 bg-white border border-[#DDD5C9]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#8E8279] uppercase tracking-wider text-[11px] mb-1">Time Slot</label>
                    <select
                      value={appointmentTime}
                      onChange={e => setAppointmentTime(e.target.value)}
                      className="w-full p-2.5 bg-white border border-[#DDD5C9]"
                    >
                      <option>11:30 AM</option>
                      <option>01:00 PM</option>
                      <option>03:00 PM</option>
                      <option>05:30 PM</option>
                      <option>07:00 PM</option>
                    </select>
                  </div>
                </div>

                <p className="text-[11px] text-[#8E8279]">
                  A senior atelier stylist will prepare selected garments and arrange complimentary refreshments.
                </p>

                <div className="pt-2 flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAppointmentModal(false)}
                    className="flex-1 py-3 border border-[#DDD5C9] text-xs uppercase tracking-wider font-medium text-[#7B726B]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-[#1C1B1A] text-white text-xs uppercase tracking-wider font-medium hover:bg-[#333130]"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
