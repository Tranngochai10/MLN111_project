import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { timelineData } from '../data/timeline';

export default function Timeline() {
  const [activeStep, setActiveStep] = useState(0);

  const activePeriod = timelineData[activeStep];

  return (
    <section id="timeline" className="relative min-h-screen py-24 bg-bg-secondary overflow-hidden">
      {/* Background visual elements */}
      <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none" />
      <div className="absolute -bottom-20 left-1/4 w-96 h-96 rounded-full bg-red-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold tracking-widest text-red-500 uppercase mb-3">
            Dòng Chảy Lịch Sử
          </h2>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white">
            Biến Đổi Điều Kiện Xã Hội Qua Các Thời Kỳ
          </h1>
          <p className="max-w-2xl mx-auto text-text-secondary text-base sm:text-lg">
            Sự phát triển của lực lượng sản xuất và sự thay đổi của quan hệ sản xuất 
            qua từng mốc lịch sử đã thay đổi cách con người tư duy và cảm nhận thực tại.
          </p>
        </div>

        {/* Timeline navigation */}
        <div className="relative mb-12 sm:mb-16">
          {/* Connector Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -translate-y-1/2 z-0" />
          <div 
            className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-red-500 to-purple-600 -translate-y-1/2 z-0 transition-all duration-500" 
            style={{ width: `${(activeStep / (timelineData.length - 1)) * 100}%` }}
          />

          {/* Stepper Buttons */}
          <div className="relative flex justify-between items-center z-10">
            {timelineData.map((step, idx) => {
              const isActive = idx === activeStep;
              const isPassed = idx < activeStep;
              return (
                <div key={step.id} className="flex flex-col items-center">
                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setActiveStep(idx)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg border transition-all duration-300 ${
                      isActive 
                        ? 'bg-red-600 border-red-500 text-white shadow-lg shadow-red-500/50 scale-110' 
                        : isPassed
                          ? 'bg-purple-950/60 border-purple-500 text-purple-300'
                          : 'bg-bg-card border-white/10 text-gray-400'
                    }`}
                  >
                    <span>{step.icon}</span>
                  </motion.button>
                  <span className={`text-xs sm:text-sm font-semibold mt-2.5 transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-500'}`}>
                    {step.period}
                  </span>
                  <span className="text-[10px] text-gray-600 font-medium">
                    {step.years}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Period Info Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className={`glass-card p-6 sm:p-10 rounded-2xl border border-white/10 relative overflow-hidden`}
          >
            {/* Visual gradient overlay matching the step */}
            <div className={`absolute inset-0 bg-gradient-to-br ${activePeriod.bgGradient} opacity-20 pointer-events-none`} />

            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
                <div>
                  <span className="text-xs font-bold text-red-400 uppercase tracking-widest block mb-1">Thời đại</span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white font-display flex items-center gap-2">
                    <span>{activePeriod.icon}</span>
                    {activePeriod.period} ({activePeriod.years})
                  </h2>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Social Conditions Column */}
                <div className="bg-black/20 p-5 rounded-xl border border-white/5">
                  <h3 className="text-sm font-bold text-red-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span>📍</span> {activePeriod.socialConditions.title}
                  </h3>
                  <ul className="space-y-3">
                    {activePeriod.socialConditions.items.map((item, idx) => (
                      <li key={idx} className="text-sm sm:text-base text-gray-300 flex items-start gap-2.5">
                        <span className="text-red-500 mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Consciousness Column */}
                <div className="bg-black/20 p-5 rounded-xl border border-white/5">
                  <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span>🧠</span> {activePeriod.consciousness.title}
                  </h3>
                  <ul className="space-y-3">
                    {activePeriod.consciousness.items.map((item, idx) => (
                      <li key={idx} className="text-sm sm:text-base text-gray-300 flex items-start gap-2.5">
                        <span className="text-cyan-400 mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Philosopher's Summary Quote */}
              <div className="mt-8 border-t border-white/10 pt-6 flex flex-col items-center text-center">
                <span className="text-xs text-gray-500 uppercase tracking-wider mb-2">Đúc kết thực tiễn</span>
                <p className="text-base sm:text-lg text-gray-300 font-medium italic max-w-3xl">
                  "{activePeriod.quote}"
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
