import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import {
  ChevronDown, Quote, ArrowRight, Brain, Layers,
  Users, Globe, Wifi, Bot,
  DollarSign, Home, Target,
  Star, Factory,
  Cpu, MessageSquare, TrendingUp,
  Smartphone, Building2, Sparkles,
  BookOpen, CheckCircle2, ShieldCheck,
  FileText, Zap, Code2, BookMarked,
  ScrollText, GitBranch,
  Eye
} from 'lucide-react';
import Navbar from './components/Navbar';

// ─── Image sources ─────────────────────────────────────────────────────────
const IMAGES = {
  students: '/hero-bg.png',
  urban: '/images/thanh-thi.png',
  rural: '/images/nong-thon.png',
  factory: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1200&q=80&auto=format&fit=crop',
  agriculture: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80&auto=format&fit=crop',
  community: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&q=80&auto=format&fit=crop',
  smartphone: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80&auto=format&fit=crop',
  tiktok: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d?w=1200&q=80&auto=format&fit=crop',
  ai: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80&auto=format&fit=crop',
};

// ─── Shared Animation Variants ─────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

// ─── Section Label ────────────────────────────────────────────────────────
function SectionLabel({ children, icon: Icon, dark = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-label uppercase font-semibold tracking-widest mb-8 ${
        dark
          ? 'bg-white/10 border-white/20 text-white/80'
          : 'bg-primary/8 border-primary/20 text-primary'
      }`}
    >
      {Icon && <Icon size={12} strokeWidth={2.5} />}
      <span>{children}</span>
    </motion.div>
  );
}

// ─── Animated Word-by-Word ────────────────────────────────────────────────
function AnimatedQuote({ text, className = '', textClass = '' }) {
  const words = text.split(' ');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className={`font-serif italic text-quote leading-snug ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          className={textClass}
        >
          {word}{' '}
        </motion.span>
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// SECTION 1: HERO
// ══════════════════════════════════════════════════════════════════════════
function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section id="hero" ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src={IMAGES.students}
          alt="Lớp học triết học Marx với sinh viên đại học"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/70 via-stone-900/60 to-stone-900/85" />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-cream to-transparent pointer-events-none" />

      <motion.div style={{ opacity }} className="relative z-10 max-w-5xl mx-auto px-6 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm font-medium mb-10 backdrop-blur-sm"
        >
          <Star size={14} className="text-gold fill-gold" />
          Chương III — Triết học Marx Lenin
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading text-hero text-white leading-tight mb-8"
        >
          Tồn tại xã hội
          <br />
          <span className="text-gold">quyết định</span> ý thức xã hội
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-body-lg text-white/70 max-w-2xl mx-auto mb-14 leading-relaxed"
        >
          Một hành trình khám phá mối quan hệ biện chứng giữa điều kiện sống vật chất và cách con người nhận thức thế giới — qua góc nhìn triết học duy vật lịch sử.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => document.getElementById('opening')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-white rounded-xl font-semibold text-sm shadow-button hover:shadow-lg transition-all duration-200 cursor-pointer"
          >
            Bắt đầu khám phá
            <ArrowRight size={16} />
          </button>
          <button
            onClick={() => document.getElementById('social-existence')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 border border-white/25 text-white rounded-xl font-semibold text-sm hover:bg-white/20 transition-all duration-200 cursor-pointer backdrop-blur-sm"
          >
            Tìm hiểu lý thuyết
          </button>
        </motion.div>

        <motion.button
          onClick={() => document.getElementById('opening')?.scrollIntoView({ behavior: 'smooth' })}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 hover:text-white/80 transition-colors cursor-pointer"
        >
          <span className="text-xs font-medium tracking-widest uppercase">Cuộn xuống</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}>
            <ChevronDown size={20} />
          </motion.div>
        </motion.button>
      </motion.div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// SECTION 2: OPENING QUESTION
// ══════════════════════════════════════════════════════════════════════════
function OpeningQuestion() {
  return (
    <section id="opening" className="relative py-36 bg-cream overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-40" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <SectionLabel icon={MessageSquare}>Câu hỏi mở đầu</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-display-xl text-text-heading mt-6 mb-6 leading-tight"
          >
            Cùng là con người,
            <br />
            tại sao suy nghĩ lại <span className="gradient-text-red">khác nhau</span>?
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Urban */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-3xl overflow-hidden group h-[480px]"
          >
            <img
              src={IMAGES.urban}
              alt="Ho Chi Minh City skyline"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/30 to-transparent" />
            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex items-center gap-3 mb-4">
                <Building2 size={20} className="text-gold" />
                <span className="text-label text-gold uppercase tracking-widest">Thành thị</span>
              </div>
              <h3 className="font-heading text-2xl text-white mb-3">Sống ở đô thị lớn</h3>
              <p className="text-base text-white/70 leading-relaxed mb-5">
                Áp lực công việc, kẹt xe, thuê nhà. Tư duy hướng đến thăng tiến, đầu tư, khẳng định bản thân trong xã hội cạnh tranh.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Thăng tiến', 'Đầu tư', 'Cạnh tranh', 'Cá nhân'].map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-white/15 text-white/80 text-sm font-medium">{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Rural */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-3xl overflow-hidden group h-[480px]"
          >
            <img
              src={IMAGES.rural}
              alt="Vietnamese countryside rice fields"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/30 to-transparent" />
            <div className="absolute inset-0 bg-emerald-900/10 mix-blend-multiply" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex items-center gap-3 mb-4">
                <Factory size={20} className="text-gold" />
                <span className="text-label text-gold uppercase tracking-widest">Nông thôn</span>
              </div>
              <h3 className="font-heading text-2xl text-white mb-3">Sống ở nông thôn</h3>
              <p className="text-base text-white/70 leading-relaxed mb-5">
                Lo lắng về thời tiết, mùa màng, giá phân bón. Tư duy hướng đến sự ổn định, tình làng nghĩa xóm và cuộc sống cộng đồng.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Ổn định', 'Cộng đồng', 'Tự nhiên', 'Truyền thống'].map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-white/15 text-white/80 text-sm font-medium">{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// SECTION 3: MARX QUOTE
// ══════════════════════════════════════════════════════════════════════════
function MarxQuote() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-150px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0.8, 1], [0.95, 1]);

  return (
    <section id="marx-quote" ref={ref} className="relative py-40 bg-stone-900 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/10 to-transparent mt-1" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="absolute top-12 left-16 font-serif text-[220px] leading-none text-white/5 select-none pointer-events-none" aria-hidden="true">"</div>

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <SectionLabel icon={Quote} dark>Karl Marx</SectionLabel>

        <motion.div style={{ scale }} className="mb-12">
          <AnimatedQuote
            text='"Không phải ý thức quyết định đời sống mà chính đời sống quyết định ý thức."'
            textClass="text-white"
          />
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-10 rounded-full origin-center"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="inline-flex items-center gap-4 bg-white/5 border border-white/10 px-7 py-4 rounded-2xl backdrop-blur-sm"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-gold">
            <Star size={18} className="text-gold fill-gold" />
          </div>
          <div className="text-left">
            <p className="text-sm font-bold text-white uppercase tracking-wider">Karl Marx</p>
            <p className="text-sm text-white/40">Duy vật biện chứng lịch sử</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// SECTION 4: SOCIAL EXISTENCE
// ══════════════════════════════════════════════════════════════════════════
function SocialExistence() {
  const [activePillar, setActivePillar] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const pillars = [
    {
      title: 'Phương thức sản xuất vật chất',
      subtitle: 'Yếu tố quyết định nhất',
      desc: 'Cách chúng ta làm ra của cải — yếu tố quyết định nhất đối với sự sinh tồn, vận động và phát triển của toàn bộ cấu trúc đời sống xã hội.',
      icon: Factory,
      image: IMAGES.factory,
      imageAlt: 'Nhà máy sản xuất hiện đại',
    },
    {
      title: 'Điều kiện tự nhiên & Địa lý',
      subtitle: 'Môi trường bao quanh',
      desc: 'Khí hậu, địa hình, môi trường tự nhiên bao quanh — đóng vai trò tiền đề vật chất tự nhiên bắt buộc cho sự sinh tồn và sản xuất của con người.',
      icon: Globe,
      image: IMAGES.agriculture,
      imageAlt: 'Cảnh đồng lúa nông thôn Việt Nam',
    },
    {
      title: 'Dân số và mật độ dân cư',
      subtitle: 'Quy mô cộng đồng',
      desc: 'Quy mô, tốc độ tăng trưởng và mật độ phân bố dân số — điều kiện thiết yếu ảnh hưởng đến cấu trúc xã hội và cách con người tương tác.',
      icon: Users,
      image: IMAGES.community,
      imageAlt: 'Cộng đồng người dân tụ tập',
    },
  ];

  return (
    <section id="social-existence" ref={ref} className="relative py-36 bg-cream overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <SectionLabel icon={Layers}>Khái niệm nền tảng</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-display-xl text-text-heading mt-6 mb-5"
          >
            Tồn tại xã hội
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-body-lg text-muted max-w-2xl mx-auto"
          >
            Sinh hoạt vật chất và các điều kiện sinh hoạt vật chất của xã hội — ba chân kiềng tạo nên cái nôi định hình con người.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isActive = activePillar === idx;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.button
                  onClick={() => setActivePillar(idx)}
                  whileHover={{ y: -4 }}
                  className={`w-full text-left rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer ${
                    isActive ? 'border-primary shadow-card-active' : 'border-border hover:border-primary/30'
                  }`}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={pillar.image}
                      alt={pillar.imageAlt}
                      className="w-full h-full object-cover transition-transform duration-500"
                      style={{ transform: isActive ? 'scale(1.05)' : 'scale(1)' }}
                    />
                    <div className={`absolute inset-0 transition-opacity duration-300 ${isActive ? 'bg-primary/30' : 'bg-stone-900/20'}`} />
                    <div className="absolute bottom-4 left-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-sm ${isActive ? 'bg-primary text-white' : 'bg-white/90 text-primary'}`}>
                        <Icon size={20} strokeWidth={1.5} />
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className={`font-bold text-lg ${isActive ? 'text-primary' : 'text-text-heading'}`}>{pillar.title}</h3>
                      <span className={`text-label px-2.5 py-1 rounded-lg ${isActive ? 'bg-primary/12 text-primary' : 'bg-stone-100 text-muted'}`}>
                        {idx + 1}/3
                      </span>
                    </div>
                    <p className="text-sm text-muted font-medium mb-3">{pillar.subtitle}</p>

                    <AnimatePresence>
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="text-sm text-muted leading-relaxed pt-3 border-t border-border"
                        >
                          {pillar.desc}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// SECTION 5: SOCIAL CONSCIOUSNESS
// ══════════════════════════════════════════════════════════════════════════
function SocialConsciousness() {
  return (
    <section id="social-consciousness" className="relative py-36 bg-surface overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <SectionLabel icon={Brain} color="secondary">Khái niệm đối lập</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-display-xl text-text-heading mt-6 mb-5"
          >
            Ý thức xã hội
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-body-lg text-muted max-w-2xl mx-auto"
          >
            Sinh hoạt tinh thần của xã hội, nảy sinh và phản ánh lại tồn tại xã hội. Cấu trúc tinh thần gồm hai tầng nổi bật.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="card p-10"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Brain size={28} className="text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-heading text-2xl text-text-heading">Tâm lý xã hội</h3>
                <span className="text-label text-primary uppercase">Tầng nổi · Dễ thay đổi</span>
              </div>
            </div>
            <p className="text-body-md text-muted leading-relaxed mb-6">
              Tình cảm, tâm trạng, thói quen, tập quán hàng ngày. Đây là tầng bề mặt của ý thức xã hội — dễ thay đổi khi điều kiện sống thay đổi.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Cảm xúc', 'Thói quen', 'Tâm trạng', 'Tập quán', 'Nguyện vọng'].map(tag => (
                <span key={tag} className="px-3.5 py-1.5 rounded-full bg-primary/8 text-primary text-sm font-semibold border border-primary/15">{tag}</span>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm text-muted italic font-serif">
                "Bề mặt — phản ánh trực tiếp điều kiện vật chất hàng ngày."
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="card p-10"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/25 flex items-center justify-center">
                <Layers size={28} className="text-gold" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-heading text-2xl text-text-heading">Hệ tư tưởng</h3>
                <span className="text-label text-gold uppercase tracking-widest">Bề sâu · Có hệ thống</span>
              </div>
            </div>
            <p className="text-body-md text-muted leading-relaxed mb-6">
              Đường lối chính trị, pháp luật, đạo đức, tôn giáo, triết học. Đây là tầng sâu của ý thức xã hội — có hệ thống và khó thay đổi hơn.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Chính trị', 'Pháp luật', 'Đạo đức', 'Tôn giáo', 'Triết học'].map(tag => (
                <span key={tag} className="px-3.5 py-1.5 rounded-full bg-gold/8 text-gold text-sm font-semibold border border-gold/20">{tag}</span>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm text-muted italic font-serif">
                "Bề sâu — hệ thống hóa từ thực tiễn qua thời gian dài."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// SECTION 6: DIALECTICAL RELATIONSHIP (renamed from Flow)
// ══════════════════════════════════════════════════════════════════════════
function DialecticalRelationship() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-150px' });
  const [activeStep, setActiveStep] = useState(-1);

  const steps = [
    {
      title: 'Điều kiện sống',
      subtitle: 'Nền tảng vật chất',
      desc: 'Hoàn cảnh môi trường tự nhiên, xã hội ban đầu bao quanh đời sống con người. Đây là điểm xuất phát — nơi mọi thứ bắt đầu.',
      icon: Home,
      label: '01',
      tag: 'Vật chất',
    },
    {
      title: 'Hoàn cảnh kinh tế',
      subtitle: 'Quan hệ sản xuất',
      desc: 'Cơ cấu kinh tế, thu nhập, phương thức sản xuất thay đổi dưới tác động của điều kiện sống. Tiền tệ, việc làm, giai cấp — tất cả được định hình ở đây.',
      icon: DollarSign,
      label: '02',
      tag: 'Kinh tế',
    },
    {
      title: 'Quan hệ xã hội',
      subtitle: 'Con người với con người',
      desc: 'Mối tương tác giữa người với người trong lao động sản xuất và sinh hoạt cộng đồng. Gia đình, bạn bè, đồng nghiệp — mạng lưới kết nối xã hội.',
      icon: Users,
      label: '03',
      tag: 'Xã hội',
    },
    {
      title: 'Cách suy nghĩ',
      subtitle: 'Nhận thức cá nhân',
      desc: 'Nhận thức, thế giới quan riêng biệt hình thành trong đầu óc của mỗi cá nhân. Từ kinh nghiệm sống, con người bắt đầu hình thành cách nhìn riêng về thế giới.',
      icon: Brain,
      label: '04',
      tag: 'Nhận thức',
    },
    {
      title: 'Ý thức xã hội',
      subtitle: 'Đỉnh cao biện chứng',
      desc: 'Đúc kết chung thành các hệ tư tưởng, thói quen và tâm lý cộng đồng của toàn bộ xã hội. Từ cá nhân đến tập thể — đây là sản phẩm cuối cùng của dòng chảy.',
      icon: Globe,
      label: '05',
      tag: 'Tinh thần',
    },
  ];

  const nodePositions = [
    [12, 8],
    [88, 26],
    [12, 44],
    [88, 62],
    [50, 82],
  ];

  const pathD = steps.map((_, i) => {
    const [x1, y1] = nodePositions[i];
    const [x2, y2] = nodePositions[Math.min(i + 1, steps.length - 1)];
    return `M ${x1} ${y1} C ${x1} ${(y1 + y2) / 2}, ${x2} ${(y1 + y2) / 2}, ${x2} ${y2}`;
  }).join(' ');

  return (
    <section id="dialectical" ref={containerRef} className="relative py-36 bg-cream overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-25" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.04] blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionLabel icon={TrendingUp}>Sơ đồ biện chứng</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-display-xl text-text-heading mt-6 mb-5"
          >
            Mối quan hệ biện chứng
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-body-lg text-muted max-w-2xl mx-auto"
          >
            Từ điều kiện sống vật chất đến ý thức tinh thần — mỗi bước là kết quả và nguyên nhân của nhau.
          </motion.p>
        </div>

        <div className="relative" style={{ height: '600px' }}>
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ overflow: 'visible' }}
          >
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#B91C1C" stopOpacity="0.5" />
                <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#B91C1C" stopOpacity="0.5" />
              </linearGradient>
              <filter id="pathGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="0.8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <path d={pathD} fill="none" stroke="#E5E1D8" strokeWidth="0.4" strokeDasharray="2 1.5" />

            <motion.path
              d={pathD}
              fill="none"
              stroke="url(#pathGradient)"
              strokeWidth="0.5"
              strokeLinecap="round"
              filter="url(#pathGlow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 2.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />

            {isInView && [0, 1, 2].map((offset) => (
              <motion.circle
                key={offset}
                r="0.6"
                fill="#D4AF37"
                initial={{ offsetDistance: `${offset * 33}%` }}
                animate={{ offsetDistance: ['0%', '100%'] }}
                transition={{ duration: 4, delay: offset * 1.3, repeat: Infinity, ease: 'linear' }}
                style={{ offsetPath: `path('${pathD}')` }}
              />
            ))}
          </svg>

          <div className="relative w-full h-full" style={{ overflow: 'visible' }}>
            {steps.map((step, idx) => {
              const [xPct, yPct] = nodePositions[idx];
              const Icon = step.icon;
              const isActive = activeStep === idx;
              const isPast = activeStep !== -1 && idx < activeStep;

              const nodeColors = {
                active: { border: 'border-primary shadow-card-active', iconBg: 'bg-primary', iconText: 'text-white', title: 'text-primary', tagText: 'text-primary', subText: 'text-primary/70', bar: 'from-primary to-gold' },
                past: { border: 'border-gold/50 shadow-gold/10', iconBg: 'bg-gold/15', iconText: 'text-gold', title: 'text-gold', tagText: 'text-gold', subText: 'text-gold/70', bar: 'from-gold to-gold-light' },
                default: { border: 'border-border hover:border-primary/40', iconBg: 'bg-stone-50 hover:bg-primary/8', iconText: 'text-stone-400 hover:text-primary', title: 'text-text-heading', tagText: 'text-muted', subText: 'text-muted', bar: 'from-stone-200 to-stone-100' },
              };

              const nc = isActive ? nodeColors.active : isPast ? nodeColors.past : nodeColors.default;
              const isLeft = idx % 2 === 0;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: idx * 0.15 + 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute"
                  style={{
                    left: isLeft ? '0%' : 'auto',
                    right: isLeft ? 'auto' : '0%',
                    top: `${yPct}%`,
                    transform: `translateY(-50%)`,
                    width: '320px',
                    zIndex: isActive ? 20 : 10,
                  }}
                >
                  <motion.button
                    onClick={() => setActiveStep(isActive ? -1 : idx)}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.99 }}
                    layout
                    className={`w-full bg-surface rounded-2xl border-2 ${nc.border} transition-all duration-300 cursor-pointer text-left`}
                    style={{ boxShadow: isActive ? '0 12px 40px rgba(185,28,28,0.12), 0 4px 12px rgba(0,0,0,0.04)' : undefined }}
                  >
                    <div className={`h-1.5 bg-gradient-to-r ${nc.bar} rounded-t-xl`} />
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`w-10 h-10 rounded-xl ${nc.iconBg} flex items-center justify-center transition-colors duration-300 shrink-0 ${nc.iconText}`}>
                            <Icon size={20} strokeWidth={1.5} />
                          </div>
                          <div className="min-w-0">
                            <span className={`text-[10px] font-bold tracking-widest uppercase block ${nc.tagText}`}>
                              {step.tag}
                            </span>
                            <h3 className={`font-bold text-base leading-tight truncate ${nc.title}`}>{step.title}</h3>
                          </div>
                        </div>
                        <div className={`shrink-0 ml-2 text-[10px] font-bold tracking-widest px-2 py-1 rounded-lg ${
                          isActive ? 'bg-primary/12 text-primary' : isPast ? 'bg-gold/12 text-gold' : 'bg-stone-100 text-stone-400'
                        }`}>
                          {step.label}
                        </div>
                      </div>

                      <p className={`text-sm font-medium ${nc.subText} mb-0`}>
                        {step.subtitle}
                      </p>

                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: 'auto', marginTop: 10 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="pt-3 mt-3 border-t border-border">
                              <p className="text-sm text-muted leading-relaxed">
                                {step.desc}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className={`mt-3 flex items-center ${isLeft ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${isActive ? 'bg-primary' : isPast ? 'bg-gold' : 'bg-stone-300'} transition-colors duration-300`} />
                        <div className={`h-px flex-1 ${isActive || isPast ? 'bg-gradient-to-r from-primary/50 to-transparent' : 'bg-stone-200'}`} />
                      </div>
                    </div>
                  </motion.button>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/20 via-gold/10 to-primary/20 -translate-x-1/2 hidden md:block origin-top"
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 2.2 }}
            className="text-center mt-4"
          >
            <p className="text-sm text-muted italic font-serif">
              "Tồn tại xã hội quyết định ý thức xã hội" — Marx
            </p>
            <p className="text-[10px] text-muted/50 mt-1 tracking-widest uppercase">
              Nhấn vào mỗi bước để xem chi tiết
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// SECTION 7: SOCIAL MEDIA EXAMPLE
// ══════════════════════════════════════════════════════════════════════════
function SocialMediaSection() {
  return (
    <section id="social-media" className="relative py-36 bg-stone-900 overflow-hidden">
      <div className="absolute inset-0">
        <img src={IMAGES.tiktok} alt="" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/90 via-stone-900/80 to-stone-900/95" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <SectionLabel icon={Wifi} dark>Ví dụ thực tiễn</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-display-xl text-white mt-6 mb-5"
          >
            Mạng xã hội &
            <br />
            <span className="gradient-text-red">sự thay đổi nhận thức</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-body-lg text-white/60 max-w-2xl mx-auto"
          >
            Cách internet và thuật toán đang viết lại bản đồ ý thức của thế hệ trẻ.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Smartphone size={24} className="text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">Tồn tại xã hội thay đổi</h3>
                <p className="text-label text-primary uppercase">Hạ tầng số hóa</p>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed mb-5">
              Cơ sở hạ tầng internet phát triển vượt bậc, smartphone trở thành vật bất ly thân, các nền tảng thuật toán video ngắn (TikTok, Reels) bùng nổ. Con người chuyển từ giao tiếp trực tiếp sang tương tác số.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Smartphone', 'Thuật toán', 'Video ngắn', 'Tương tác số'].map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-sm font-medium">{tag}</span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center">
                <Brain size={24} className="text-gold" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">Ý thức xã hội thay đổi</h3>
                <p className="text-label text-gold uppercase">Chi phối nhận thức</p>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed mb-5">
              Giới trẻ hình thành tư duy "nhanh và ngắn", tiếp thu kiến thức dạng mì ăn liền. Xuất hiện các hội chứng tâm lý mới như FOMO, áp lực đồng lứa khi chứng kiến sự hào nhoáng trên mạng.
            </p>
            <div className="flex flex-wrap gap-2">
              {['FOMO', 'Peer pressure', 'Tư duy ngắn', 'Thương hiệu cá nhân'].map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-sm font-medium">{tag}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// SECTION 8: AI EXAMPLE
// ══════════════════════════════════════════════════════════════════════════
function AISection() {
  return (
    <section id="ai-example" className="relative py-36 bg-cream overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <SectionLabel icon={Bot}>Ví dụ thực tiễn</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-display-xl text-text-heading mt-6 mb-5"
          >
            Chuyển đổi số &{' '}
            <span className="gradient-text-red">Trí tuệ nhân tạo</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-body-lg text-muted max-w-2xl mx-auto"
          >
            Sự xuất hiện của AI đang tạo ra những thay đổi chưa từng có trong cách con người học, làm việc và nhìn nhận bản thân.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="card p-8"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Cpu size={24} className="text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-bold text-text-heading text-lg">Tồn tại xã hội thay đổi</h3>
                <p className="text-label text-primary uppercase">Lực lượng sản xuất mới</p>
              </div>
            </div>
            <p className="text-sm text-muted leading-relaxed mb-5">
              AI tạo sinh, ChatGPT, các hệ thống tự động hóa thay thế lao động thủ công và một phần lao động trí óc trong các nhà máy, văn phòng. Hàng triệu việc làm đang bị tái cấu trúc.
            </p>
            <div className="flex flex-wrap gap-2">
              {['ChatGPT', 'Tự động hóa', 'Robot', 'Gig economy'].map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full bg-primary/8 text-primary text-sm font-semibold">{tag}</span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="card p-8"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                <Sparkles size={24} className="text-gold" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-bold text-text-heading text-lg">Ý thức xã hội thay đổi</h3>
                <p className="text-label text-gold uppercase">Chi phối nhận thức</p>
              </div>
            </div>
            <p className="text-sm text-muted leading-relaxed mb-5">
              Khái niệm về "năng lực cạnh tranh" của con người thay đổi. Thay vì học thuộc lòng, xã hội đề cao tư duy phản biện và kỹ năng ra lệnh cho AI. Xuất hiện tâm lý AI anxiety và các cuộc thảo luận đạo đức về bản quyền AI.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Prompt Engineering', 'AI Anxiety', 'Tư duy phản biện', 'Đạo đức AI'].map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full bg-gold/8 text-gold text-sm font-semibold">{tag}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// SECTION 9: SOCIAL CONSCIOUSNESS FEEDBACK EFFECT
// ══════════════════════════════════════════════════════════════════════════
function FeedbackSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="feedback" ref={ref} className="relative py-36 bg-stone-900 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6">
        <div className="text-center mb-20">
          <SectionLabel icon={GitBranch} dark>Tương tác hai chiều</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-display-xl text-white mt-6 mb-5"
          >
            Ý thức xã hội phản hồi
            <br />
            <span className="gradient-text-gold">trở lại tồn tại xã hội</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-body-lg text-white/60 max-w-2xl mx-auto"
          >
            Mối quan hệ biện chứng không chỉ một chiều. Ý thức xã hội — một khi đã hình thành — lại tác động trở lại, cải tạo tồn tại xã hội.
          </motion.p>
        </div>

        {/* Bidirectional arrow visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-6 mb-20"
        >
          <div className="grid grid-cols-3 items-center gap-4 w-full max-w-3xl">
            {/* Left: Tồn tại */}
            <div className="col-start-1 col-end-2 flex justify-end">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 }}
                className="bg-primary/15 border border-primary/30 rounded-2xl p-6 text-center"
              >
                <Home size={28} className="text-primary mx-auto mb-2" strokeWidth={1.5} />
                <p className="text-sm font-bold text-white">Tồn tại xã hội</p>
                <p className="text-xs text-white/40 mt-1">Điều kiện vật chất</p>
              </motion.div>
            </div>

            {/* Center: Bidirectional arrows */}
            <div className="col-start-2 col-end-3 flex flex-col items-center gap-3">
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.5 }}
                className="flex flex-col items-center gap-1"
              >
                <TrendingUp size={20} className="text-primary" />
                <div className="w-0.5 h-8 bg-gradient-to-b from-primary to-gold" />
                <TrendingUp size={20} className="text-gold rotate-180" />
              </motion.div>
            </div>

            {/* Right: Ý thức */}
            <div className="col-start-3 col-end-4 flex justify-start">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 }}
                className="bg-gold/10 border border-gold/30 rounded-2xl p-6 text-center"
              >
                <Brain size={28} className="text-gold mx-auto mb-2" strokeWidth={1.5} />
                <p className="text-sm font-bold text-white">Ý thức xã hội</p>
                <p className="text-xs text-white/40 mt-1">Tư tưởng, giá trị</p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Explanation cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <TrendingUp size={20} className="text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="font-bold text-white text-lg">Tác động xuôi</h3>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Tồn tại xã hội quyết định ý thức xã hội. Điều kiện sống vật chất định hình cách con người nhìn nhận thế giới, hình thành tư tưởng và giá trị của cả cộng đồng.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center">
                <TrendingUp size={20} className="text-gold rotate-180" strokeWidth={1.5} />
              </div>
              <h3 className="font-bold text-white text-lg">Tác động ngược</h3>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Ý thức xã hội phản hồi trở lại tồn tại xã hội. Con người dùng ý thức đã có để cải tạo điều kiện sống — tạo ra phương thức sản xuất mới, thay đổi quan hệ xã hội, thay đổi chính tồn tại của mình.
            </p>
          </motion.div>
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <blockquote className="font-serif italic text-display-sm text-white/70 leading-snug mb-4">
            "Thực tiễn xã hội là tiêu chuẩn kiểm nghiệm duy nhất cho tính chân lý của nhận thức."
          </blockquote>
          <p className="text-sm text-white/40">— Triết học Marx Lenin</p>
        </motion.div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// SECTION 10: CONCLUSION
// ══════════════════════════════════════════════════════════════════════════
function ConclusionSection() {
  return (
    <section id="conclusion" className="relative py-36 bg-cream overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-primary/4 blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <SectionLabel icon={Eye}>Suy ngẫm</SectionLabel>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-display-xl text-text-heading mt-6 mb-8 leading-tight"
        >
          Bao nhiêu phần trăm suy nghĩ của bạn
          <br />
          <span className="gradient-text-red">thực sự là của bạn?</span>
        </motion.h2>

        <div className="flex flex-col items-center gap-3 mb-20">
          {[
            { label: 'Ý thức xã hội', sublabel: 'Hệ tư tưởng, giá trị, tâm lý', icon: Globe, color: 'bg-gold/10 border-gold/25 text-gold' },
            { label: 'Kinh nghiệm sống', sublabel: 'Quan hệ, sự kiện, môi trường', icon: Users, color: 'bg-primary/10 border-primary/20 text-primary' },
            { label: 'Hoàn cảnh vật chất', sublabel: 'Thu nhập, nhà ở, công việc', icon: DollarSign, color: 'bg-stone-100 border-stone-200 text-text-heading' },
            { label: 'Tồn tại xã hội', sublabel: 'Phương thức sản xuất, địa lý, dân số', icon: Layers, color: 'bg-stone-200 border-stone-300 text-text-heading' },
          ].map((item, idx) => {
            const Icon = item.icon;
            const widths = ['w-64', 'w-72', 'w-80', 'w-96'];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: -16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {idx < 3 && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex items-center justify-center">
                    <motion.div
                      animate={{ y: [-2, 2, -2] }}
                      transition={{ repeat: Infinity, duration: 1.5, delay: idx * 0.2 }}
                    >
                      <ChevronDown size={16} className="text-primary/50" />
                    </motion.div>
                  </div>
                )}
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  className={`${widths[idx]} mx-auto px-6 py-4 rounded-2xl border transition-all duration-200 ${item.color}`}
                >
                  <div className="flex items-center justify-center gap-3">
                    <Icon size={18} strokeWidth={1.5} />
                    <div className="text-left">
                      <p className="font-bold text-sm">{item.label}</p>
                      <p className="text-sm opacity-70">{item.sublabel}</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <Quote size={32} className="text-primary/30 mx-auto mb-4" />
          <blockquote className="font-serif italic text-display-sm text-muted leading-snug mb-6">
            "Con người là sản phẩm của hoàn cảnh và giáo dục."
          </blockquote>
          <p className="text-sm text-muted">— Karl Marx</p>
        </motion.div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// SECTION 11: APPENDIX — AI USAGE & ACADEMIC INTEGRITY
// ══════════════════════════════════════════════════════════════════════════
function AppendixSection() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 'tools', label: 'Công cụ AI', icon: Bot },
    { id: 'prompts', label: 'Prompt sử dụng', icon: MessageSquare },
    { id: 'output', label: 'Kết quả AI', icon: FileText },
    { id: 'modify', label: 'Chỉnh sửa', icon: Code2 },
    { id: 'verify', label: 'Kiểm chứng', icon: ShieldCheck },
    { id: 'integrity', label: 'Cam kết', icon: CheckCircle2 },
  ];

  const content = [
    // Tab 0: AI Tools
    {
      title: 'Công cụ AI được sử dụng',
      items: [
        {
          tool: 'Cursor AI Agent',
          purpose: 'Hỗ trợ viết code, tái cấu trúc component, tối ưu UI/UX và fix bugs',
          note: 'Sử dụng trong quá trình phát triển website và cải thiện trải nghiệm người dùng.',
        },
        {
          tool: 'Claude AI',
          purpose: 'Hỗ trợ phân tích nội dung, kiểm tra logic, viết trích dẫn và kiểm tra tính nhất quán',
          note: 'Chỉ dùng để kiểm tra nội dung học thuật, không sinh nội dung chính.',
        },
        {
          tool: 'Google Gemini / ChatGPT',
          purpose: 'Tra cứu tài liệu tham khảo, tìm kiếm trích dẫn gốc từ tác phẩm của Marx và Engels',
          note: 'Kết quả được đối chiếu với nguồn gốc trước khi sử dụng.',
        },
      ],
    },
    // Tab 1: Main Prompts
    {
      title: 'Các prompt chính đã sử dụng',
      items: [
        {
          tool: 'Tạo cấu trúc website',
          purpose: '"Thiết kế website thuyết trình về Chương III triết học Marx Lenin: Tồn tại xã hội quyết định ý thức xã hội, gồm 10 sections..."',
          note: 'Prompt mô tả yêu cầu tổng quan, không sinh nội dung nội bài.',
        },
        {
          tool: 'Refactor cấu trúc',
          purpose: '"Tái cấu trúc presentation thành 10 sections với appendix về AI usage..."',
          note: 'Chỉ dùng để sắp xếp lại cấu trúc, nội dung giữ nguyên từ giáo trình.',
        },
        {
          tool: 'Kiểm tra nội dung',
          purpose: '"Đọc và kiểm tra nội dung App.jsx — đảm bảo nội dung đúng với giáo trình Triết học Marx Lenin..."',
          note: 'AI chỉ kiểm tra, không tạo nội dung mới.',
        },
      ],
    },
    // Tab 2: AI Output
    {
      title: 'Kết quả đầu ra từ AI',
      items: [
        {
          tool: 'Code structure',
          purpose: 'AI gợi ý cấu trúc component React, cách sử dụng Framer Motion, và tổ chức file.',
          note: 'Toàn bộ code được viết và kiểm tra bởi sinh viên.',
        },
        {
          tool: 'UI/UX suggestions',
          purpose: 'AI gợi ý cải thiện typography, spacing, và tương tác người dùng.',
          note: 'Sinh viên quyết định cuối cùng về mặt thẩm mỹ và nội dung.',
        },
        {
          tool: 'Bug fixing',
          purpose: 'AI hỗ trợ debug các lỗi animation và layout khi phát triển.',
          note: 'Nguyên nhân lỗi và cách fix được sinh viên hiểu và ghi nhận.',
        },
      ],
    },
    // Tab 3: Student Modifications
    {
      title: 'Những gì sinh viên đã chỉnh sửa',
      items: [
        {
          tool: 'Nội dung học thuật',
          purpose: 'Toàn bộ nội dung triết học được viết dựa trên Giáo trình Triết học Marx Lenin của Đại học Quốc gia Hà Nội.',
          note: 'AI không tạo nội dung học thuật. Mỗi khái niệm đều có nguồn trong giáo trình.',
        },
        {
          tool: 'Hình ảnh minh họa',
          purpose: 'Chọn và chèn ảnh minh họa phù hợp với nội dung từng phần.',
          note: 'Hình ảnh được chọn bởi sinh viên để phản ánh đúng bối cảnh.',
        },
        {
          tool: 'Thiết kế tổng thể',
          purpose: 'Quyết định về màu sắc chủ đạo (đỏ vàng — gam màu cách mạng), layout, và phong cách trình bày.',
          note: 'Toàn bộ quyết định thiết kế thuộc về sinh viên.',
        },
        {
          tool: 'Ví dụ thực tiễn',
          purpose: 'Các ví dụ về mạng xã hội, AI, và dòng chảy thời đại được sinh viên chọn lọc và viết dựa trên quan sát thực tế.',
          note: 'Các ví dụ này dùng để minh họa cho lý thuyết Marx, không phải nội dung chính.',
        },
      ],
    },
    // Tab 4: Verification
    {
      title: 'Nguồn kiểm chứng',
      items: [
        {
          tool: 'Giáo trình',
          purpose: 'Giáo trình Triết học Marx Lenin, Trường Đại học Kinh tế Quốc dân — Bộ môn Lý luận Chính trị.',
          note: 'Nguồn chính thức cho toàn bộ nội dung lý thuyết.',
        },
        {
          tool: 'Tác phẩm gốc',
          purpose: 'Karl Marx & Friedrich Engels — "Đức quốc tư sản duy vật biện chứng và triết học duy vật lịch sử" (German Ideology).',
          note: 'Dùng để kiểm tra độ chính xác của các trích dẫn.',
        },
        {
          tool: 'Nguồn bổ sung',
          purpose: 'Các bài giảng của giảng viên, tài liệu tham khảo từ thư viện trường.',
          note: 'Nội dung được xác nhận qua nhiều nguồn trước khi đưa vào.',
        },
      ],
    },
    // Tab 5: Academic Integrity
    {
      title: 'Cam kết liêm chính học thuật',
      items: [
        {
          tool: 'Cam kết 1',
          purpose: 'Nội dung triết học trong website này được viết dựa trên Giáo trình Triết học Marx Lenin do Trường Đại học Kinh tế Quốc dân biên soạn.',
          note: 'Đây là nguồn chính thức và duy nhất cho lý thuyết.',
        },
        {
          tool: 'Cam kết 2',
          purpose: 'AI chỉ được sử dụng như công cụ hỗ trợ kỹ thuật (code, UI) và kiểm tra logic. Không một nội dung học thuật nào được sinh ra hoàn toàn bởi AI.',
          note: 'Sinh viên chịu trách nhiệm hoàn toàn về nội dung.',
        },
        {
          tool: 'Cam kết 3',
          purpose: 'Các trích dẫn từ Marx và Engels đã được kiểm tra với nguồn gốc. Mọi thông tin lịch sử đều có thể kiểm chứng qua tài liệu chính thức.',
          note: 'Tính chính xác là ưu tiên hàng đầu.',
        },
        {
          tool: 'Cam kết 4',
          purpose: 'Website này được tạo nhằm phục vụ mục đích học tập và trình bày kiến thức triết học, không nhằm mục đích thương mại hay đánh giá năng lực AI.',
          note: 'Mục tiêu là hiểu và truyền đạt tư tưởng Marx một cách trung thực.',
        },
      ],
    },
  ];

  return (
    <section id="appendix" className="relative py-36 bg-surface overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="relative max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionLabel icon={BookMarked}>Phụ lục</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-display-xl text-text-heading mt-6 mb-5"
          >
            AI Usage & Academic Integrity
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-body-lg text-muted max-w-2xl mx-auto"
          >
            Minh bạch về việc sử dụng AI trong quá trình xây dựng bài thuyết trình.
          </motion.p>
        </div>

        {/* Tab navigation */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {tabs.map((tab, idx) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(idx)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeTab === idx
                    ? 'bg-primary text-white shadow-button'
                    : 'bg-stone-100 text-muted hover:bg-stone-200 hover:text-text-heading border border-border'
                }`}
              >
                <Icon size={14} strokeWidth={2} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                {(() => { const Icon = tabs[activeTab].icon; return <Icon size={20} className="text-primary" strokeWidth={1.5} />; })()}
              </div>
              <h3 className="font-heading text-2xl text-text-heading">{content[activeTab].title}</h3>
            </div>

            <div className="space-y-4">
              {content[activeTab].items.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.06 }}
                  className="bg-cream rounded-2xl border border-border p-6"
                >
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                    <h4 className="font-bold text-text-heading text-base">{item.tool}</h4>
                  </div>
                  <p className="text-sm text-muted leading-relaxed ml-5 mb-2">{item.purpose}</p>
                  {item.note && (
                    <div className="ml-5 flex items-start gap-2">
                      <BookOpen size={12} className="text-primary mt-0.5 shrink-0" strokeWidth={1.5} />
                      <p className="text-xs text-muted/70 italic">{item.note}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// FOOTER
// ══════════════════════════════════════════════════════════════════════════
function Footer() {
  return (
    <footer className="bg-stone-900 border-t border-white/5 py-12">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-2.5 mb-6">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-gold">
            <Star size={14} className="text-gold fill-gold" />
          </div>
          <span className="font-heading text-lg text-white">MarxMind</span>
        </div>
        <p className="text-sm text-white/40 mb-3">
          Lý thuyết Duy vật Biện chứng Lịch sử — Triết học Marx Lenin
        </p>
        <p className="text-xs text-white/20">
          Chương III: Ý thức xã hội · Dự án thuyết trình tương tác
        </p>
      </div>
    </footer>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// MAIN APP
// ══════════════════════════════════════════════════════════════════════════
export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden grain-texture">
      <Navbar />
      <main>
        <HeroSection />
        <OpeningQuestion />
        <MarxQuote />
        <SocialExistence />
        <SocialConsciousness />
        <DialecticalRelationship />
        <SocialMediaSection />
        <AISection />
        <FeedbackSection />
        <ConclusionSection />
        <AppendixSection />
      </main>
      <Footer />
    </div>
  );
}
