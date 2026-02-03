'use client';

import { useState } from 'react'; // Added state for the bot
import Hero from '@/components/Hero';
import MenuManagement from '@/components/MenuManagement';
import FloorAndLogistics from '@/components/FloorAndLogistics';   
import KitchenCall from '@/components/KitchenCall';
import Billing from '@/components/Billing';
import Kitchen from '@/components/Kitchen';
import Waiter from '@/components/Waiter';
import ProductStats from '@/components/ProductStats';
import Features from '@/components/Features';
import AdminDesk from '@/components/AdminDesk';
import VisualShowcase from '@/components/VisualShowcase';
import Chatbot from '@/components/Chatbot';

export default function Home() {
  // Logic to control the ThinkBot's visibility
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <main className="relative min-h-screen">
      {/* 1. Brand & Hero */}
      <Hero />
      
      {/* 2. Core Value Proposition */}
      <Features />
      
      {/* 3. Deep Dive into Features */}
      <MenuManagement />
      <FloorAndLogistics />
      
      {/* 4. Operations Flow (Kitchen -> Waiter -> Billing) */}
      <Kitchen />
      <Waiter />
      <Billing />
      
      {/* 5. Admin Control */}
      <AdminDesk />
      
      {/* 6. Visual Impact & Final CTA */}
      <VisualShowcase />

        {/* 7. Proof & Performance */}
      <ProductStats />

      <KitchenCall />

      {/* 8. Interactive Layer: ThinkBot */}
      <Chatbot 
        open={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
        onOpen={() => setIsChatOpen(true)} 
      />
    </main>
  );
}