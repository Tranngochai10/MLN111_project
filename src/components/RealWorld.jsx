import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { realWorldData } from '../data/realworld';

export default function RealWorld() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id="realworld" className="relative min-h-screen py-24 bg-bg-primary overflow-hidden">
      {/* Background visual elements */}
      <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold tracking-widest text-red-500 uppercase mb-3">
            Góc Nhìn Hiện Đại
          </h2>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white">
            Hiện Thực Đời Sống Số & Xã Hội 4.0
          </h1>
          <p className="max-w-2xl mx-auto text-text-secondary text-base sm:text-lg">
            Thế giới xung quanh chúng ta thay đổi nhanh hơn bao giờ hết. 
            Xem cách các yếu tố công nghệ và kinh tế mới đang định hình lại ý thức của chúng ta từng phút.
          </p>
        </div>

        {/* Real World Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {realWorldData.map((item, index) => {
            const isHovered = hoveredIndex === index;
            return (
              <motion.div
                key={item.id}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                whileHover={{ y: -8 }}
                className="glass-card rounded-2xl border border-white/5 p-6 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group"
                style={{
                  boxShadow: isHovered ? `0 15px 30px ${item.glow}` : 'none',
                  borderColor: isHovered ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)'
                }}
              >
                {/* Accent line top */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1 transition-all duration-300"
                  style={{ backgroundColor: item.color, opacity: isHovered ? 1 : 0.4 }}
                />

                <div>
                  {/* Icon & Title */}
                  <div className="flex items-center gap-4 mb-5">
                    <span className="text-4xl p-2 bg-white/5 rounded-xl block shrink-0">{item.icon}</span>
                    <div>
                      <h3 className="text-lg font-bold text-white leading-tight font-display">{item.title}</h3>
                      <span className="text-xs text-gray-500 font-medium block mt-0.5">{item.subtitle}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-text-secondary leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* Stats list */}
                  <div className="space-y-2 mb-6">
                    {item.stats.map((stat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-gray-400 font-semibold">{stat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Connection Theory footer */}
                <div className="mt-auto pt-4 border-t border-white/5">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold block mb-1">
                    Liên kết triết học
                  </span>
                  <div className="flex items-start gap-1.5 text-xs text-red-400 font-medium">
                    <span className="shrink-0 mt-0.5">➔</span>
                    <span>{item.marxConnection}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
