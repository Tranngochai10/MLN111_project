import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Sparkles, AlertCircle } from 'lucide-react';

export default function Navbar() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const audioRef = useRef(null);

  const toggleMusic = () => {
    if (!audioRef.current) {
      const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3');
      audio.loop = true;
      audio.volume = 0.25;
      audioRef.current = audio;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setAlertMsg("");
        })
        .catch((err) => {
          console.warn("Lỗi phát nhạc:", err);
          setAlertMsg("Hãy click một điểm bất kỳ trên màn hình trước để kích hoạt âm thanh!");
          setTimeout(() => setAlertMsg(""), 4000);
        });
    }
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10 shadow-lg shadow-black/25 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-red-500 flex items-center justify-center text-sm font-bold text-white shadow-md shadow-red-600/30">
            ★
          </div>
          <span className="font-display font-black text-white tracking-wider text-base uppercase">
            Marx<span className="text-red-500">Mind</span>
          </span>
        </div>

        {/* Music Control & Status alert */}
        <div className="flex items-center gap-3 relative">
          <AnimatePresence>
            {alertMsg && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-red-950/90 border border-red-500/30 px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-[10px] text-red-300 font-semibold w-56 shadow-xl"
              >
                <AlertCircle size={12} className="shrink-0" />
                <span>{alertMsg}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleMusic}
            className="p-2 px-4 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white flex items-center gap-2 transition-all text-xs font-bold"
          >
            {isPlaying ? (
              <Volume2 size={14} className="text-red-500 animate-pulse" />
            ) : (
              <VolumeX size={14} className="text-gray-400" />
            )}
            <span>{isPlaying ? "Tắt Nhạc" : "Nhạc Đệm"}</span>
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}
