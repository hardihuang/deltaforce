import { useState } from 'react';
import { Heart, Coffee, Zap, Gift, ExternalLink, QrCode } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SponsorOption {
  id: string;
  amount: number;
  label: string;
  icon: typeof Heart;
  description: string;
}

const sponsorOptions: SponsorOption[] = [
  { id: 'coffee', amount: 10, label: '请杯咖啡', icon: Coffee, description: '支持平台运营' },
  { id: 'zap', amount: 30, label: '加速开发', icon: Zap, description: '功能迭代更快' },
  { id: 'gift', amount: 50, label: '豪华赞助', icon: Gift, description: '专属感谢名单' },
  { id: 'heart', amount: 100, label: '超级支持', icon: Heart, description: '永久荣誉会员' },
];

export function FooterSection() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showQrCode, setShowQrCode] = useState(false);

  return (
    <footer className="mt-8 border-t border-[#2a3038] bg-gradient-to-b from-transparent to-[#0a0c0e]">
      {/* Sponsor Section */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#4ade80]/10 border border-[#4ade80]/30 rounded-full mb-4">
            <Heart className="w-4 h-4 text-[#4ade80]" />
            <span className="text-sm font-medium text-[#4ade80]">支持我们</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">赞助打赏</h3>
          <p className="text-sm text-[#94a3b8]">
            您的支持将帮助我们持续优化平台，为更多玩家提供优质陪玩服务
          </p>
        </div>

        {/* Sponsor Options */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {sponsorOptions.map((option) => {
            const Icon = option.icon;
            const isSelected = selectedOption === option.id;
            
            return (
              <button
                key={option.id}
                onClick={() => {
                  setSelectedOption(option.id);
                  setShowQrCode(true);
                }}
                className={cn(
                  'relative p-4 rounded-xl border transition-all duration-300 text-left',
                  isSelected
                    ? 'bg-[#4ade80]/10 border-[#4ade80] shadow-lg shadow-[#4ade80]/20'
                    : 'bg-[#14181c] border-[#2a3038] hover:border-[#4ade80]/50 hover:bg-[#1a2024]'
                )}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={cn(
                      'w-8 h-8 rounded-lg flex items-center justify-center transition-colors',
                      isSelected ? 'bg-[#4ade80]' : 'bg-[#2a3038]'
                    )}
                  >
                    <Icon className={cn('w-4 h-4', isSelected ? 'text-[#0a0c0e]' : 'text-[#4ade80]')} />
                  </div>
                  <span className={cn('font-bold', isSelected ? 'text-[#4ade80]' : 'text-white')}>
                    ¥{option.amount}
                  </span>
                </div>
                <p className="text-xs font-medium text-white">{option.label}</p>
                <p className="text-[10px] text-[#94a3b8] mt-0.5">{option.description}</p>
              </button>
            );
          })}
        </div>

        {/* QR Code Display */}
        {showQrCode && selectedOption && (
          <div className="bg-[#14181c] border border-[#2a3038] rounded-2xl p-6 mb-8">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* QR Code Placeholder */}
              <div className="relative w-40 h-40 bg-white rounded-xl flex items-center justify-center overflow-hidden">
                <div className="absolute inset-2 bg-[#0a0c0e] rounded-lg flex items-center justify-center">
                  <QrCode className="w-24 h-24 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent animate-pulse" />
              </div>
              
              <div className="flex-1 text-center sm:text-left">
                <h4 className="text-lg font-bold text-white mb-2">
                  扫码支付 ¥{sponsorOptions.find(o => o.id === selectedOption)?.amount}
                </h4>
                <p className="text-sm text-[#94a3b8] mb-4">
                  感谢您的支持！您的赞助将用于平台维护和功能开发
                </p>
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  <span className="px-2 py-1 bg-[#2a3038] text-[#94a3b8] text-xs rounded">支付宝</span>
                  <span className="px-2 py-1 bg-[#2a3038] text-[#94a3b8] text-xs rounded">微信支付</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Links & Info */}
        <div className="border-t border-[#2a3038] pt-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
            <div>
              <h5 className="text-sm font-bold text-white mb-3">平台</h5>
              <ul className="space-y-2">
                <li><a href="#" className="text-xs text-[#94a3b8] hover:text-[#4ade80] transition-colors">关于我们</a></li>
                <li><a href="#" className="text-xs text-[#94a3b8] hover:text-[#4ade80] transition-colors">联系客服</a></li>
                <li><a href="#" className="text-xs text-[#94a3b8] hover:text-[#4ade80] transition-colors">入驻申请</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-sm font-bold text-white mb-3">帮助</h5>
              <ul className="space-y-2">
                <li><a href="#" className="text-xs text-[#94a3b8] hover:text-[#4ade80] transition-colors">使用指南</a></li>
                <li><a href="#" className="text-xs text-[#94a3b8] hover:text-[#4ade80] transition-colors">常见问题</a></li>
                <li><a href="#" className="text-xs text-[#94a3b8] hover:text-[#4ade80] transition-colors">安全中心</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-sm font-bold text-white mb-3">条款</h5>
              <ul className="space-y-2">
                <li><a href="#" className="text-xs text-[#94a3b8] hover:text-[#4ade80] transition-colors">服务协议</a></li>
                <li><a href="#" className="text-xs text-[#94a3b8] hover:text-[#4ade80] transition-colors">隐私政策</a></li>
                <li><a href="#" className="text-xs text-[#94a3b8] hover:text-[#4ade80] transition-colors">免责声明</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-sm font-bold text-white mb-3">社区</h5>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-xs text-[#94a3b8] hover:text-[#4ade80] transition-colors flex items-center gap-1">
                    抖音号
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a href="#" className="text-xs text-[#94a3b8] hover:text-[#4ade80] transition-colors flex items-center gap-1">
                    QQ群
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a href="#" className="text-xs text-[#94a3b8] hover:text-[#4ade80] transition-colors flex items-center gap-1">
                    微信群
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#2a3038]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#14181c] border border-[#4ade80]/30 rounded-lg flex items-center justify-center">
                <span className="text-sm font-black text-[#4ade80]">Δ</span>
              </div>
              <span className="text-xs text-[#94a3b8]">
                © 2025 三角洲陪玩导航 · All rights reserved
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-[#64748b]">Made with</span>
              <Heart className="w-3 h-3 text-[#ef4444] fill-current" />
              <span className="text-xs text-[#64748b]">for Delta Force players</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
