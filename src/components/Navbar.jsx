import { motion } from 'framer-motion';

export default function Navbar() {
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
      </div>
    </motion.nav>
  );
}
