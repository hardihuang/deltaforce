import { useState, useEffect, useMemo } from 'react';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ClubCard } from './club-card';
import { ClubDetailModal } from './club-detail-modal';
import { fetchClubs, type Club, type SortType } from '../data';

interface ClubListProps {
  sortType: SortType;
}

export function ClubList({ sortType }: ClubListProps) {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchClubs();
      setClubs(data);
    } catch (err) {
      setError('数据加载失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const sortedClubs = useMemo(() => {
    const sorted = [...clubs];
    switch (sortType) {
      case 'fans':
        return sorted.sort((a, b) => b.fans - a.fans);
      case 'orders':
        return sorted.sort((a, b) => b.orders - a.orders);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'price':
        return sorted.sort((a, b) => a.price - b.price);
      default:
        return sorted;
    }
  }, [clubs, sortType]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setTimeout(() => setRefreshing(false), 500);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative">
          <Loader2 className="w-10 h-10 text-[#4ade80] animate-spin" />
          <div className="absolute inset-0 w-10 h-10 border-2 border-[#4ade80]/20 rounded-full" />
        </div>
        <p className="mt-4 text-[#94a3b8] text-sm">正在加载俱乐部数据...</p>
        <div className="mt-2 flex gap-1">
          <span className="w-1.5 h-1.5 bg-[#4ade80]/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-1.5 h-1.5 bg-[#4ade80]/40 rounded-full animate-bounce" style={{ animationDelay: '100ms' }} />
          <span className="w-1.5 h-1.5 bg-[#4ade80]/40 rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-16 h-16 bg-[#ef4444]/10 rounded-full flex items-center justify-center border border-[#ef4444]/30">
          <AlertCircle className="w-8 h-8 text-[#ef4444]" />
        </div>
        <p className="mt-4 text-[#f87171] text-sm">{error}</p>
        <button
          onClick={handleRefresh}
          className="mt-4 px-4 py-2 bg-[#2a3038] text-white text-sm rounded-lg hover:bg-[#3a4048] transition-colors flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          重新加载
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header Stats */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#94a3b8]">
            共找到 <span className="text-[#4ade80] font-bold">{sortedClubs.length}</span> 家俱乐部
          </span>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className={cn(
            'p-2 text-[#94a3b8] hover:text-[#4ade80] transition-colors rounded-lg hover:bg-[#2a3038]/50',
            refreshing && 'animate-spin'
          )}
          title="刷新数据"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Club Cards */}
      <div className="grid gap-3">
        {sortedClubs.map((club, index) => (
          <ClubCard
            key={club.id}
            club={club}
            rank={index + 1}
            sortType={sortType}
            onClick={() => {
              setSelectedClub(club);
              setIsModalOpen(true);
            }}
          />
        ))}
      </div>

      {/* Bottom Spacer */}
      <div className="h-8" />

      {/* Detail Modal */}
      <ClubDetailModal
        club={selectedClub}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setTimeout(() => setSelectedClub(null), 300);
        }}
      />
    </div>
  );
}
