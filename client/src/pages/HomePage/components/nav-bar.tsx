import { useState, useEffect } from 'react';
import { Users, Wallet, ShoppingCart, Star, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { sortOptions, type SortType } from '../data';

interface NavBarProps {
  activeSort: SortType;
  onSortChange: (sort: SortType) => void;
}

const iconMap = {
  Users,
  Wallet,
  ShoppingCart,
  Star,
};

export function NavBar({ activeSort, onSortChange }: NavBarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeOption = sortOptions.find(opt => opt.value === activeSort);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-[#0a0c0e]/95 backdrop-blur-md border-b border-[#2a3038] shadow-lg shadow-black/20'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12">
              <div className="absolute inset-0 bg-gradient-to-br from-[#4ade80]/20 to-[#f97316]/20 rounded-lg rotate-3" />
              <div className="absolute inset-0 bg-[#14181c] border border-[#4ade80]/50 rounded-lg flex items-center justify-center">
                <span className="text-lg sm:text-xl font-black text-[#4ade80] tracking-tighter">Δ</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#4ade80] rounded-full animate-pulse" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-white tracking-wide">
                <span className="text-[#4ade80]">三角洲</span>陪玩导航
              </h1>
              <p className="text-xs text-[#94a3b8] tracking-wider">DELTA FORCE ESCORT</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {sortOptions.map((option) => {
              const Icon = iconMap[option.icon as keyof typeof iconMap];
              const isActive = activeSort === option.value;
              
              return (
                <button
                  key={option.value}
                  onClick={() => onSortChange(option.value)}
                  className={cn(
                    'relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2',
                    isActive
                      ? 'text-[#4ade80] bg-[#4ade80]/10 border border-[#4ade80]/30'
                      : 'text-[#94a3b8] hover:text-white hover:bg-[#2a3038]/50'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {option.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#4ade80] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Mobile Dropdown */}
          <div className="md:hidden relative">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-[#14181c] border border-[#2a3038] rounded-lg text-white text-sm"
            >
              {activeOption && (() => {
                const Icon = iconMap[activeOption.icon as keyof typeof iconMap];
                return <Icon className="w-4 h-4 text-[#4ade80]" />;
              })()}
              <span>{activeOption?.label}</span>
              <ChevronDown className={cn('w-4 h-4 transition-transform', isMobileMenuOpen && 'rotate-180')} />
            </button>

            {isMobileMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-[#14181c] border border-[#2a3038] rounded-lg shadow-xl overflow-hidden">
                {sortOptions.map((option) => {
                  const Icon = iconMap[option.icon as keyof typeof iconMap];
                  const isActive = activeSort === option.value;
                  
                  return (
                    <button
                      key={option.value}
                      onClick={() => {
                        onSortChange(option.value);
                        setIsMobileMenuOpen(false);
                      }}
                      className={cn(
                        'w-full px-4 py-3 text-left text-sm flex items-center gap-3 transition-colors',
                        isActive
                          ? 'text-[#4ade80] bg-[#4ade80]/10'
                          : 'text-[#94a3b8] hover:text-white hover:bg-[#2a3038]'
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {option.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
