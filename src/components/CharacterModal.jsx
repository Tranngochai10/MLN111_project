import { motion } from 'framer-motion';

export default function CharacterModal({ character, onClose }) {
  if (!character) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-card w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl relative border border-white/10"
      >
        {/* Top colorful band */}
        <div className={`h-2 bg-gradient-to-r ${character.color}`} />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white bg-white/5 hover:bg-white/15 w-8 h-8 rounded-full flex items-center justify-center transition-colors text-lg"
        >
          ✕
        </button>

        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-5xl">{character.emoji}</span>
            <div>
              <h2 className="text-2xl font-bold text-white font-display">{character.name}</h2>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/10 text-gray-300">
                {character.role}
              </span>
            </div>
          </div>

          {/* Social existence details */}
          <div className="mb-6">
            <h3 className="text-xs uppercase tracking-widest text-red-400 font-semibold mb-3">
              📍 Tồn tại xã hội (Điều kiện thực tế)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
              <div>
                <span className="text-gray-500 text-xs block mb-0.5">Thu nhập</span>
                <span className="text-white text-sm font-medium">{character.income}</span>
              </div>
              <div>
                <span className="text-gray-500 text-xs block mb-0.5">Nơi sinh sống</span>
                <span className="text-white text-sm font-medium">{character.living}</span>
              </div>
              <div>
                <span className="text-gray-500 text-xs block mb-0.5">Áp lực lớn nhất</span>
                <span className="text-white text-sm font-medium">{character.pressure}</span>
              </div>
              <div>
                <span className="text-gray-500 text-xs block mb-0.5">Môi trường hàng ngày</span>
                <span className="text-white text-sm font-medium">{character.environment}</span>
              </div>
            </div>
          </div>

          {/* Consciousness analysis */}
          <div className="mb-6">
            <h3 className="text-xs uppercase tracking-widest text-cyan-400 font-semibold mb-3">
              🧠 Ý thức xã hội được hình thành
            </h3>
            <ul className="space-y-2 text-sm sm:text-base text-gray-300">
              {character.consciousness.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-cyan-400 mt-1 shrink-0">✦</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Philosopher's Commentary */}
          <div className="border-t border-white/10 pt-6">
            <div className="bg-red-950/20 border border-red-500/20 p-4 rounded-xl">
              <span className="text-xs font-semibold text-red-400 uppercase tracking-widest block mb-2">
                Phân tích Marxist
              </span>
              <p className="text-sm text-gray-300 italic leading-relaxed">
                "{character.quote}"
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
