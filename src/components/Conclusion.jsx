import { motion } from 'framer-motion';

export default function Conclusion() {
  const scrollToTop = () => {
    const el = document.getElementById('hero');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[70vh] py-24 bg-bg-primary overflow-hidden flex items-center">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-red-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8"
        >
          🔑 Chìa khóa cải tạo xã hội
        </motion.div>

        {/* Major quote statement */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-8"
        >
          “Muốn thay đổi ý thức xã hội, trước hết cần thay đổi điều kiện sống của con người.”
        </motion.h1>

        {/* Deep commentary description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-text-secondary text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-12"
        >
          Để xây dựng một xã hội văn minh, tiến bộ với tư duy lành mạnh, chúng ta không thể chỉ rao giảng đạo đức hay kêu gọi thay đổi ý chí. Hãy cùng nhau hành động để cải thiện chất lượng đời sống vật chất, nâng cao bình đẳng và kiến tạo môi trường sống tốt đẹp hơn.
        </motion.p>

        {/* Buttons / Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(239,68,68,0.4)' }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="btn-primary w-full sm:w-auto text-sm"
          >
            Trở lại đầu trang ↑
          </motion.button>
          <a
            href="https://vi.wikipedia.org/wiki/Ch%E1%BB%A7_ngh%C4%A9a_duy_v%E1%BA%ADt_l%E1%BB%8Bch_s%E1%BB%AD"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary w-full sm:w-auto text-sm block text-center"
          >
            Tìm hiểu thêm về Duy vật Lịch sử
          </a>
        </motion.div>

        {/* Footer info */}
        <div className="mt-20 pt-8 border-t border-white/5 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} MarxConsciousness. Dự án học tập & nghiên cứu Triết học Marxist.</p>
        </div>
      </div>
    </section>
  );
}
