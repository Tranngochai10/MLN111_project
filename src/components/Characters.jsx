import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { characters } from '../data/characters';
import CharacterModal from './CharacterModal';

export default function Characters() {
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <section id="characters" className="relative min-h-screen py-24 bg-bg-primary overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold tracking-widest text-red-500 uppercase mb-3">
            Góc Nhìn Thực Tế
          </h2>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white">
            Nhân Vật & Trải Nghiệm Xã Hội
          </h1>
          <p className="max-w-2xl mx-auto text-text-secondary text-base sm:text-lg">
            Mỗi con người ở vị thế xã hội khác nhau sẽ có những điều kiện sinh hoạt vật chất khác biệt. 
            Hãy bấm vào để xem hoàn cảnh đó đã định hình ý thức của họ như thế nào.
          </p>
        </div>

        {/* Characters Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {characters.map((char) => (
            <motion.div
              key={char.id}
              variants={cardVariants}
              whileHover={{ 
                y: -10, 
                boxShadow: `0 15px 30px ${char.glowColor}`,
                borderColor: 'rgba(255,255,255,0.2)'
              }}
              onClick={() => setSelectedCharacter(char)}
              className="glass-card p-6 rounded-2xl border border-white/5 cursor-pointer transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-4xl p-2 bg-white/5 rounded-xl block">{char.emoji}</span>
                  <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Chi tiết ➔</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1 font-display">{char.name}</h3>
                <p className="text-xs text-gray-400 font-medium mb-3">{char.role}</p>
                
                <div className="space-y-2 mt-4 pt-4 border-t border-white/5">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Môi trường:</span>
                    <span className="text-gray-300 font-medium text-right truncate max-w-[180px]">{char.environment.split(',')[0]}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Thu nhập:</span>
                    <span className="text-gray-300 font-medium">{char.income.split('(')[0]}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-3">
                <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/5 text-red-400 w-full inline-block text-center hover:bg-white/10 transition-colors">
                  Phân tích ý thức
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedCharacter && (
          <CharacterModal
            character={selectedCharacter}
            onClose={() => setSelectedCharacter(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
