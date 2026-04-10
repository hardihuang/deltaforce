import { useState } from 'react';
import { NavBar } from './components/nav-bar';
import { HeroSection } from './components/hero-section';
import { ClubList } from './components/club-list';
import { FooterSection } from './components/footer-section';
import type { SortType } from './data';

export default function HomePage() {
  const [activeSort, setActiveSort] = useState<SortType>('fans');

  return (
    <div className="min-h-screen bg-[#0a0c0e] tactical-grid-bg">
      {/* Navigation */}
      <NavBar activeSort={activeSort} onSortChange={setActiveSort} />
      
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection />
        
        {/* Clubs Section */}
        <section id="clubs" className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#2a3038] to-[#2a3038]" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#4ade80] rounded-full" />
              <span className="text-sm font-bold text-white tracking-wide">俱乐部榜单</span>
            </div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#2a3038] to-[#2a3038]" />
          </div>
          
          {/* Club List */}
          <ClubList sortType={activeSort} />
        </section>
      </main>
      
      {/* Footer */}
      <div id="sponsor">
        <FooterSection />
      </div>
    </div>
  );
}
