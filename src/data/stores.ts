import { StoreLocation } from '../types';

export const STORE_LOCATIONS: StoreLocation[] = [
  {
    id: 'store-kolkata-ballygunge',
    name: 'Maison Aura Ballygunge Flagship (বালিগঞ্জ ফ্ল্যাগশিপ)',
    city: 'Kolkata',
    area: 'Ballygunge Circular Road',
    address: '18/A Ballygunge Circular Road, Near Tripura Castle, Ballygunge',
    postalCode: 'Kolkata, West Bengal 700019',
    phone: '+91 33 2461 8800',
    email: 'kolkata@maisonaura.com',
    hours: 'Monday – Sunday: 10:30 AM – 8:30 PM',
    image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=1000&auto=format&fit=crop',
    features: ['Royal Jamdani & Baluchari Vault', 'Private Bonedi Bari Styling Suite', 'Darjeeling First Flush & Nolen Gur Adda Lounge', 'Master Drapist & Tailor On-Site'],
    coordinates: { lat: 22.5284, lng: 88.3582 }
  },
  {
    id: 'store-kolkata-parkstreet',
    name: 'Maison Aura Park Street Heritage Mansion (পার্ক স্ট্রিট)',
    city: 'Kolkata',
    area: 'Park Street Cultural District',
    address: 'Stephen Court, 18 Park Street, Heritage Corridor',
    postalCode: 'Kolkata, West Bengal 700016',
    phone: '+91 33 2229 4400',
    email: 'parkstreet@maisonaura.com',
    hours: 'Monday – Sunday: 11:00 AM – 9:00 PM',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop',
    features: ['Festive Sharodutsav Preview Salon', 'Gold & Dokra Jewellery Vault', 'Personal Bridal Concierge', 'Express Blouse & Fall Hemming'],
    coordinates: { lat: 22.5519, lng: 88.3524 }
  },
  {
    id: 'store-shantiniketan',
    name: 'Maison Aura Shantiniketan Craft Atelier (শান্তিনিকেতন)',
    city: 'Shantiniketan',
    area: 'Ratan Palli & Sonajhurir Haat Corridor',
    address: 'The Red Earth Studio, Ratan Palli, Bolpur',
    postalCode: 'Birbhum, West Bengal 731235',
    phone: '+91 3463 261 200',
    email: 'shantiniketan@maisonaura.com',
    hours: 'Tuesday – Sunday: 10:00 AM – 7:00 PM (Closed Mondays)',
    image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=1000&auto=format&fit=crop',
    features: ['Live Pit Loom & Kantha Stitch Demonstration', 'Natural Indigo Vat Garden', 'Organic Botanical Dye Archive', 'Artisan Guild Direct Sales'],
    coordinates: { lat: 23.6789, lng: 87.6893 }
  },
  {
    id: 'store-mumbai',
    name: 'Maison Aura Colaba Atelier',
    city: 'Mumbai',
    area: 'Colaba Heritage Precinct',
    address: '14/B B.K. Boman Behram Marg, Next to Taj Mahal Palace, Colaba',
    postalCode: 'Mumbai, Maharashtra 400001',
    phone: '+91 22 6902 4800',
    email: 'colaba@maisonaura.com',
    hours: 'Monday – Sunday: 11:00 AM – 8:30 PM',
    image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=1000&auto=format&fit=crop',
    features: ['Private Styling Salon', 'Bengal Handloom Exhibition', 'Champagne Bar', 'Artisanal Archive'],
    coordinates: { lat: 18.922, lng: 72.8347 }
  },
  {
    id: 'store-delhi',
    name: 'Maison Aura The Chanakya',
    city: 'New Delhi',
    area: 'Chanakyapuri Diplomatic Enclave',
    address: 'Ground Level, The Chanakya, Yashwant Place Commercial Complex',
    postalCode: 'New Delhi 110021',
    phone: '+91 11 4120 7700',
    email: 'chanakya@maisonaura.com',
    hours: 'Monday – Sunday: 11:00 AM – 9:00 PM',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop',
    features: ['Royal Baluchari & Jamdani Concierge', 'Personal VIP Fitting Suites', 'Jewellery Vault', 'Valet Parking'],
    coordinates: { lat: 28.591, lng: 77.1925 }
  },
  {
    id: 'store-london',
    name: 'Maison Aura Mayfair Flagship',
    city: 'London',
    area: 'Mayfair',
    address: '22 Mount Street, Mayfair',
    postalCode: 'London W1K 2RQ, United Kingdom',
    phone: '+44 20 7946 0912',
    email: 'mayfair@maisonaura.com',
    hours: 'Monday – Saturday: 10:00 AM – 7:00 PM',
    image: 'https://images.unsplash.com/photo-1555529771-835f59fc5efe?q=80&w=1000&auto=format&fit=crop',
    features: ['International Couture Orders', 'Bengal Diaspora VIP Concierge', 'Bespoke Atelier Tailoring'],
    coordinates: { lat: 51.5098, lng: -0.1506 }
  }
];
