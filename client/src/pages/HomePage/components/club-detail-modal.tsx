import { useEffect, useState } from 'react';
import { X, ExternalLink, Users, ShoppingCart, Star, BadgeCheck, Swords, Video, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Club } from '../data';

interface ClubDetailModalProps {
  club: Club | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ClubDetailModal({ club, isOpen, onClose }: ClubDetailModalProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!club || !isOpen) return null;

  const formatNumber = (num: number): string => {
    if (num >= 10000) return (num / 10000).toFixed(1) + 'w';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={cn(
          'relative w-full sm:w-[600px] sm:max-w-[90vw]',
          'bg-gradient-to-b from-[#14181c]/98 to-[#0a0c0e]/98',
          'backdrop-blur-xl',
          'border border-[#2a3038] sm:rounded-2xl rounded-t-2xl',
          'shadow-2xl shadow-black/50',
          'max-h-[90vh] sm:max-h-[85vh]',
          'flex flex-col',
          'animate-in slide-in-from-bottom-10 duration-300'
        )}
      >
        {/* Scan Line Effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-t-2xl sm:rounded-2xl">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4ade80]/30 to-transparent" />
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 bg-[#2a3038]/80 hover:bg-[#3a4048] rounded-lg flex items-center justify-center transition-colors border border-[#3a4048]"
        >
          <X className="w-4 h-4 text-[#94a3b8]" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-6">
          {/* Header Section */}
          <div className="flex gap-4 mb-6">
            {/* Logo */}
            <div className="relative flex-shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-[#1e293b] border-2 border-[#4ade80]/30 shadow-lg shadow-[#4ade80]/10">
                {!imageLoaded && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-[#4ade80]/30 border-t-[#4ade80] rounded-full animate-spin" />
                  </div>
                )}
                <img
                  src={club.avatar}
                  alt={club.name}
                  className={cn(
                    'w-full h-full object-cover',
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  )}
                  onLoad={() => setImageLoaded(true)}
                />
              </div>
              {club.isVerified && (
                <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#4ade80] rounded-full flex items-center justify-center border-2 border-[#14181c]">
                  <BadgeCheck className="w-4 h-4 text-[#0a0c0e]" />
                </div>
              )}
            </div>

            {/* Club Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl sm:text-2xl font-black text-white truncate">
                  {club.name}
                </h2>
                {club.isVerified && (
                  <BadgeCheck className="w-5 h-5 text-[#4ade80] flex-shrink-0 hidden sm:block" />
                )}
              </div>
              <p className="text-sm text-[#94a3b8] mb-3 line-clamp-2">
                {club.description}
              </p>

              {/* Douyin Link */}
              <a
                href={club.douyinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#1e293b] hover:bg-[#2a3038] rounded-lg text-sm transition-colors group border border-[#2a3038] hover:border-[#4ade80]/30"
              >
                <Video className="w-4 h-4 text-[#4ade80]" />
                <span className="text-[#94a3b8] group-hover:text-white transition-colors">抖音主页</span>
                <ExternalLink className="w-3 h-3 text-[#64748b] group-hover:text-[#4ade80]" />
              </a>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-6">
            <div className="bg-[#1e293b]/50 rounded-xl p-3 text-center border border-[#2a3038]/50">
              <div className="flex items-center justify-center gap-1 text-[#94a3b8] mb-1">
                <Users className="w-3.5 h-3.5" />
              </div>
              <div className="text-sm sm:text-base font-bold text-white">{formatNumber(club.fans)}</div>
              <div className="text-[10px] text-[#64748b]">粉丝</div>
            </div>
            <div className="bg-[#1e293b]/50 rounded-xl p-3 text-center border border-[#2a3038]/50">
              <div className="flex items-center justify-center gap-1 text-[#94a3b8] mb-1">
                <ShoppingCart className="w-3.5 h-3.5" />
              </div>
              <div className="text-sm sm:text-base font-bold text-white">{formatNumber(club.orders)}</div>
              <div className="text-[10px] text-[#64748b]">订单</div>
            </div>
            <div className="bg-[#1e293b]/50 rounded-xl p-3 text-center border border-[#2a3038]/50">
              <div className="flex items-center justify-center gap-1 text-[#fbbf24] mb-1">
                <Star className="w-3.5 h-3.5 fill-current" />
              </div>
              <div className="text-sm sm:text-base font-bold text-[#fbbf24]">{club.rating}</div>
              <div className="text-[10px] text-[#64748b]">评分</div>
            </div>
            <div className="bg-[#1e293b]/50 rounded-xl p-3 text-center border border-[#2a3038]/50">
              <div className="flex items-center justify-center gap-1 text-[#4ade80] mb-1">
                <Swords className="w-3.5 h-3.5" />
              </div>
              <div className="text-sm sm:text-base font-bold text-[#4ade80]">¥{club.price}</div>
              <div className="text-[10px] text-[#64748b]">起/{club.priceUnit}</div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {club.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-xs bg-[#4ade80]/10 text-[#4ade80] rounded-full border border-[#4ade80]/30"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Services Section */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 bg-[#4ade80] rounded-full" />
              <h3 className="text-base font-bold text-white">陪玩服务价格</h3>
            </div>

            <div className="space-y-2">
              {club.services.map((service, idx) => (
                <div
                  key={idx}
                  className="bg-[#1e293b]/50 rounded-xl p-4 border border-[#2a3038]/50 hover:border-[#4ade80]/30 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold text-white">{service.type}</span>
                      </div>
                      <p className="text-xs text-[#94a3b8]">{service.description}</p>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <span className="text-base font-black text-[#4ade80]">{service.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer - Order Button */}
        <div className="p-4 sm:p-5 border-t border-[#2a3038] bg-[#0a0c0e]/50">
          <a
            href={club.orderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'w-full flex items-center justify-center gap-2',
              'py-4 rounded-xl',
              'bg-gradient-to-r from-[#4ade80] to-[#22c55e]',
              'text-[#0a0c0e] font-bold text-base',
              'shadow-lg shadow-[#4ade80]/25',
              'hover:shadow-xl hover:shadow-[#4ade80]/30',
              'hover:from-[#22c55e] hover:to-[#16a34a]',
              'active:scale-[0.98]',
              'transition-all duration-200'
            )}
          >
            <span>立即下单</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
