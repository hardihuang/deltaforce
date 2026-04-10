import { useState } from 'react';
import { Users, ShoppingCart, Star, ExternalLink, BadgeCheck, Swords } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Club } from '../data';

interface ClubCardProps {
  club: Club;
  rank: number;
  sortType: string;
  onClick: () => void;
}

export function ClubCard({ club, rank, sortType, onClick }: ClubCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatNumber = (num: number): string => {
    if (num >= 10000) return (num / 10000).toFixed(1) + 'w';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
  };

  const getRankBadgeClass = () => {
    if (rank === 1) return 'rank-badge-1';
    if (rank === 2) return 'rank-badge-2';
    if (rank === 3) return 'rank-badge-3';
    return 'rank-badge-default';
  };

  const getHighlightValue = () => {
    switch (sortType) {
      case 'fans':
        return { value: formatNumber(club.fans), label: '粉丝', icon: Users };
      case 'orders':
        return { value: formatNumber(club.orders), label: '订单', icon: ShoppingCart };
      case 'rating':
        return { value: club.rating.toFixed(1), label: '评分', icon: Star };
      case 'price':
        return { value: `¥${club.price}`, label: '起', icon: Swords };
      default:
        return { value: formatNumber(club.fans), label: '粉丝', icon: Users };
    }
  };

  const highlight = getHighlightValue();
  const HighlightIcon = highlight.icon;

  return (
    <button
      onClick={onClick}
      className={cn(
        'group relative block w-full text-left tactical-card rounded-xl p-4 transition-all duration-300',
        'hover:border-[#4ade80]/50 hover:shadow-lg hover:shadow-[#4ade80]/10',
        'hover:-translate-y-1'
      )}
      style={{ animationDelay: `${rank * 50}ms` }}
    >
      {/* Rank Badge */}
      <div
        className={cn(
          'absolute -top-2 -left-2 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black z-10',
          getRankBadgeClass()
        )}
      >
        {rank}
      </div>

      {/* Corner Decoration */}
      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#4ade80]/10 to-transparent transform rotate-45 translate-x-8 -translate-y-8" />
      </div>

      <div className="flex gap-4">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-[#1e293b] border border-[#2a3038] group-hover:border-[#4ade80]/30 transition-colors">
            {!imageLoaded && (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-[#4ade80]/30 border-t-[#4ade80] rounded-full animate-spin" />
              </div>
            )}
            <img
              src={club.avatar}
              alt={club.name}
              className={cn(
                'w-full h-full object-cover transition-opacity duration-300',
                imageLoaded ? 'opacity-100' : 'opacity-0'
              )}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
          {club.isVerified && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#4ade80] rounded-full flex items-center justify-center border-2 border-[#14181c]">
              <BadgeCheck className="w-3.5 h-3.5 text-[#0a0c0e]" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-bold text-white text-base sm:text-lg truncate flex items-center gap-2">
                {club.name}
                {club.isVerified && (
                  <BadgeCheck className="w-4 h-4 text-[#4ade80] flex-shrink-0 sm:hidden" />
                )}
              </h3>
              <p className="text-xs sm:text-sm text-[#94a3b8] mt-0.5 line-clamp-1">
                {club.description}
              </p>
            </div>
            
            {/* Highlight Metric */}
            <div className="flex-shrink-0 text-right">
              <div className="flex items-center gap-1 text-[#4ade80]">
                <HighlightIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="font-bold text-sm sm:text-base">{highlight.value}</span>
              </div>
              <span className="text-[10px] sm:text-xs text-[#94a3b8]">{highlight.label}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {club.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 text-[10px] sm:text-xs bg-[#1e293b] text-[#94a3b8] rounded border border-[#2a3038]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Stats Row */}
          <div className="flex items-center gap-3 sm:gap-4 mt-3 pt-3 border-t border-[#2a3038]/50">
            <div className="flex items-center gap-1 text-xs text-[#94a3b8]">
              <Users className="w-3.5 h-3.5" />
              <span>{formatNumber(club.fans)}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-[#94a3b8]">
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>{formatNumber(club.orders)}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-[#fbbf24]">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{club.rating}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-[#4ade80] ml-auto">
              <span className="font-medium">¥{club.price}</span>
              <span className="text-[#94a3b8]">/{club.priceUnit}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hover Action */}
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-1 text-[#4ade80] text-xs font-medium">
          <span>查看详情</span>
          <ExternalLink className="w-3 h-3" />
        </div>
      </div>
    </button>
  );
}
