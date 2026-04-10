import { useEffect, useState } from 'react';
import { Target, Shield, Swords, Zap } from 'lucide-react';

const stats = [
  { label: '入驻俱乐部', value: '50+', icon: Target },
  { label: '累计订单', value: '10w+', icon: Swords },
  { label: '好评率', value: '98%', icon: Shield },
  { label: '平均响应', value: '<30s', icon: Zap },
];

export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative pt-24 sm:pt-32 pb-8 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 tactical-grid-bg opacity-50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-b from-[#4ade80]/5 to-transparent rounded-full blur-3xl" />
      
      {/* Scan Line */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="scan-line" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
        {/* Badge */}
        <div 
          className={`flex justify-center mb-6 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#4ade80]/10 border border-[#4ade80]/30 rounded-full">
            <span className="w-2 h-2 bg-[#4ade80] rounded-full animate-pulse" />
            <span className="text-xs font-medium text-[#4ade80] tracking-wide">三角洲行动专属</span>
          </div>
        </div>

        {/* Main Title */}
        <div 
          className={`text-center mb-6 transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            <span className="text-[#4ade80]">三角洲</span>陪玩俱乐部
            <span className="block text-2xl sm:text-3xl md:text-4xl mt-2 bg-gradient-to-r from-white via-[#4ade80] to-[#4ade80] bg-clip-text text-transparent">
              导航排行榜
            </span>
          </h1>
          <p className="text-sm sm:text-base text-[#94a3b8] max-w-lg mx-auto leading-relaxed">
            专业陪玩平台，汇集三角洲行动顶级俱乐部
            <br className="hidden sm:block" />
            战术配合 · 高效撤离 · 实力认证
          </p>
        </div>

        {/* CTA Buttons */}
        <div 
          className={`flex flex-wrap justify-center gap-3 mb-10 transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <a
            href="#clubs"
            className="px-6 py-3 bg-[#4ade80] text-[#0a0c0e] font-bold text-sm rounded-lg hover:bg-[#22c55e] transition-all hover:shadow-lg hover:shadow-[#4ade80]/25 active:scale-95"
          >
            查看排行榜
          </a>
          <a
            href="#sponsor"
            className="px-6 py-3 bg-[#14181c] border border-[#2a3038] text-white font-medium text-sm rounded-lg hover:border-[#4ade80]/50 hover:bg-[#1a2024] transition-all"
          >
            入驻申请
          </a>
        </div>

        {/* Stats */}
        <div 
          className={`grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="tactical-card rounded-xl p-4 text-center group hover:border-[#4ade80]/30 transition-all"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-10 h-10 mx-auto mb-2 bg-[#1e293b] rounded-lg flex items-center justify-center group-hover:bg-[#4ade80]/10 transition-colors">
                  <Icon className="w-5 h-5 text-[#4ade80]" />
                </div>
                <div className="text-xl sm:text-2xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-xs text-[#94a3b8]">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-4 w-20 h-20 border-l-2 border-t-2 border-[#4ade80]/20 rounded-tl-3xl" />
        <div className="absolute top-20 right-4 w-20 h-20 border-r-2 border-t-2 border-[#4ade80]/20 rounded-tr-3xl" />
      </div>
    </section>
  );
}
