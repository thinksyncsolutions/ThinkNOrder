'use client';

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

export default function Home() {

  return (
    <>
      <Hero />
      <MenuManagement />
      <FloorAndLogistics />
      <Billing />
      <Kitchen />
      <Waiter />
      <ProductStats />
      <Features />
      <AdminDesk />
      <VisualShowcase />
      <KitchenCall />
    </>
  );
}