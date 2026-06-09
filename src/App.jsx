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
  elderlySaver: '/assets/accumulation-pattern.png',
  youngShopper: '/assets/digital-consumption-pattern.png',
  smartphone: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80&auto=format&fit=crop',
  tiktok: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d?w=1200&q=80&auto=format&fit=crop',
  ai: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80&auto=format&fit=crop',
  // AI step images
  aiBrain: '/assets/ai-step-1.png',
  aiStudent: '/assets/ai-step-2.png',
  aiBusiness: '/assets/ai-step-3.png',
  aiEngineer: '/assets/ai-step-4.png',
  aiWorkplace: '/assets/ai-step-5.png',
  aiSociety: '/assets/ai-step-6.png',
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
// SECTION 4B: CONDITIONED THOUGHT EXPERIMENT
// ══════════════════════════════════════════════════════════════════════════

// Pattern card modal data
const PATTERN_DATA = {
  saving: {
    key: 'saving',
    label: 'Mẫu hình tích lũy',
    tagline: 'An toàn trước, tiêu dùng sau',
    icon: ShieldCheck,
    accentColor: '#b45309', // amber-700
    accentBg: 'from-amber-900/80 via-stone-900/70 to-stone-950/90',
    pillBg: 'bg-amber-900/30',
    pillBorder: 'border-amber-400/30',
    pillText: 'text-amber-200',
    badgeIcon: ShieldCheck,
    image: null, // set at runtime via IMAGES
    desc: 'Hình ảnh gợi liên tưởng đến thế hệ coi tiết kiệm là nền tảng của ổn định: ưu tiên sổ tiết kiệm, khoản dự phòng và kế hoạch lâu dài.',
    details: [
      {
        icon: TrendingUp,
        label: 'Hoàn cảnh vật chất',
        text: 'Thu nhập phải chắt chiu, kinh nghiệm thiếu thốn khiến việc dự phòng trở thành phản xạ sống còn.',
        color: 'text-amber-700',
        bg: 'bg-amber-50',
        border: 'border-amber-200',
      },
      {
        icon: ShieldCheck,
        label: 'Ý thức dễ hình thành',
        text: 'Đề cao bền vững, sợ rủi ro, xem tiết kiệm là đạo đức và trách nhiệm gia đình.',
        color: 'text-stone-700',
        bg: 'bg-stone-50',
        border: 'border-stone-200',
      },
    ],
    tags: ['Tiết kiệm', 'Bền vững', 'An toàn', 'Dự phòng', 'Dài hạn'],
  },
  digital: {
    key: 'digital',
    label: 'Mẫu hình tiêu dùng số',
    tagline: 'Trải nghiệm ngay, quyết định nhanh',
    icon: Smartphone,
    accentColor: '#cc1717',
    accentBg: 'from-primary/80 via-primary/60 to-stone-950/80',
    pillBg: 'bg-primary/30',
    pillBorder: 'border-red-300/30',
    pillText: 'text-red-200',
    badgeIcon: Smartphone,
    image: null,
    desc: 'Hình ảnh gợi đến thế hệ lớn lên cùng thương mại điện tử, mạng xã hội và nhịp sống số: tiêu dùng gắn với cảm xúc, tốc độ và nhận diện cá nhân.',
    details: [
      {
        icon: Zap,
        label: 'Môi trường sống',
        text: 'Thuật toán, flash sale, KOL và nhịp mua sắm liên tục khiến lựa chọn tiêu dùng trở nên tức thời.',
        color: 'text-primary',
        bg: 'bg-primary/5',
        border: 'border-primary/15',
      },
      {
        icon: Sparkles,
        label: 'Ý thức dễ hình thành',
        text: 'Đề cao trải nghiệm cá nhân, sự tiện lợi, tính cập nhật và cảm giác "không bỏ lỡ cơ hội".',
        color: 'text-stone-600',
        bg: 'bg-stone-50',
        border: 'border-stone-200',
      },
    ],
    tags: ['Tức thời', 'Flash Sale', 'YOLO', 'KOL', 'Trải nghiệm'],
  },
};

function PatternModal({ patternKey, onClose }) {
  const data = PATTERN_DATA[patternKey];
  if (!data) return null;
  const IconComp = data.icon;
  return (
    <AnimatePresence>
      <motion.div
        key="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        className="fixed inset-0 z-[9999] flex items-end justify-center sm:items-center"
        onClick={onClose}
        style={{ background: 'rgba(10,10,15,0.72)', backdropFilter: 'blur(12px)' }}
      >
        <motion.div
          key="modal-card"
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.97 }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-lg mx-4 mb-4 sm:mb-0 rounded-[2rem] overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.5)]"
          style={{ maxHeight: '90vh' }}
        >
          {/* Hero image area */}
          <div className="relative h-56 sm:h-64 overflow-hidden">
            <img
              src={patternKey === 'saving' ? IMAGES.elderlySaver : IMAGES.youngShopper}
              alt={data.label}
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${data.accentBg}`} />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 border border-white/20 flex items-center justify-center text-white hover:bg-black/60 transition-colors backdrop-blur-sm"
              aria-label="Đóng"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>

            {/* Badge */}
            <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/35 px-3.5 py-1.5 backdrop-blur-md">
              <IconComp size={14} className="text-white" />
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-white">{data.label}</span>
            </div>

            {/* Bottom label */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white leading-tight">{data.tagline}</h3>
            </div>
          </div>

          {/* Content area */}
          <div className="bg-white px-6 pb-6 pt-5 overflow-y-auto" style={{ maxHeight: '55vh' }}>
            <p className="text-sm leading-7 text-stone-600 mb-5">{data.desc}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-5">
              {data.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-semibold border"
                  style={{ borderColor: data.accentColor + '33', color: data.accentColor, background: data.accentColor + '12' }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Detail cards */}
            <div className="grid gap-3">
              {data.details.map((item, i) => {
                const DIcon = item.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.3 }}
                    className={`flex items-start gap-3 rounded-xl border ${item.border} ${item.bg} p-4`}
                  >
                    <div className={`mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border ${item.border} bg-white ${item.color}`}>
                      <DIcon size={14} />
                    </div>
                    <div>
                      <p className={`mb-1 text-xs font-bold uppercase tracking-[0.15em] ${item.color} opacity-80`}>{item.label}</p>
                      <p className="text-sm leading-relaxed text-stone-700">{item.text}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Marx note */}
            <div className="mt-5 rounded-xl border border-stone-200 bg-stone-50 p-4 flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-stone-200 text-stone-500">
                <Quote size={13} />
              </div>
              <p className="text-xs leading-6 text-stone-500 italic">
                Tồn tại xã hội quyết định ý thức xã hội — hoàn cảnh vật chất {patternKey === 'saving' ? '"lập trình"' : '"định hướng"'} cách người này suy nghĩ và lựa chọn.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function ConditionedThoughtSection() {
  const [activeModal, setActiveModal] = useState(null);
  const valuePairs = [
    {
      label: 'Lối sống tiêu dùng nhanh',
      left: 'Tích lũy, ưu tiên an toàn dài hạn',
      right: 'Mua sắm tức thời, trải nghiệm ngắn hạn',
      icon: ShieldCheck,
    },
    {
      label: 'Hình mẫu thành công',
      left: 'Ổn định tài chính, có khoản dự phòng',
      right: 'Bắt trend, thể hiện bản thân trên nền tảng số',
      icon: TrendingUp,
    },
    {
      label: 'Khẩu hiệu sống',
      left: '"Tích cốc phòng cơ"',
      right: '"Bạn chỉ sống một lần" (YOLO)',
      icon: MessageSquare,
    },
  ];

  return (
    <section id="conditioned-thought" className="relative overflow-hidden bg-[linear-gradient(180deg,#f8f5ef_0%,#fff8f4_46%,#fffdfb_100%)] py-36 lg:py-40">
      <div className="absolute inset-0 dot-grid opacity-25" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
      <div className="absolute left-0 top-24 h-72 w-72 rounded-full bg-primary/8 blur-3xl" />
      <div className="absolute right-0 bottom-16 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />

      {/* Modal */}
      <AnimatePresence>
        {activeModal && (
          <PatternModal patternKey={activeModal} onClose={() => setActiveModal(null)} />
        )}
      </AnimatePresence>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-20 max-w-5xl text-center">
          <SectionLabel icon={Eye}>Tình huống gợi mở</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading mt-6 mb-6 text-4xl leading-[1.04] text-text-heading sm:text-5xl lg:text-6xl"
          >
            BẠN NGHĨ RA SUY NGHĨ CỦA MÌNH,
            <br />
            <span className="gradient-text-red">HAY HOÀN CẢNH ĐÃ "LẬP TRÌNH" NÓ?</span>
          </motion.h2>
            <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12, duration: 0.6 }}
            className="mx-auto max-w-4xl text-lg leading-8 text-text-heading/78 sm:text-xl"
          >
            Cùng một cá nhân, nhưng nếu lớn lên trong những điều kiện vật chất và môi trường sống khác nhau, hệ giá trị và cách lựa chọn thường cũng khác nhau. Đây là một minh họa trực quan cho luận điểm: tồn tại xã hội định hình ý thức xã hội.
          </motion.p>
        </div>

        {/* ── Two pattern cards + center question ── */}
        <div className="mb-16 grid items-center gap-8 xl:grid-cols-[1fr_auto_1fr] xl:gap-10">

          {/* CARD 1 — Mẫu hình tích lũy */}
          <motion.button
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, scale: 1.015 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveModal('saving')}
            className="group relative overflow-hidden rounded-[2rem] cursor-pointer focus:outline-none text-left"
            aria-label="Xem phân tích: Mẫu hình tích lũy"
          >
            {/* Image */}
            <div className="relative h-[22rem] sm:h-[26rem] overflow-hidden rounded-[2rem]">
              <img
                src={IMAGES.elderlySaver}
                alt="Người lớn tuổi đại diện cho lối sống tiết kiệm và tích lũy tài chính"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-107"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-900/25 to-transparent transition-opacity duration-300" />
              {/* Hover tint */}
              <div className="absolute inset-0 bg-amber-900/0 group-hover:bg-amber-900/15 transition-colors duration-500" />

              {/* Top badge */}
              <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/40 bg-black/32 px-4 py-2 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-lg backdrop-blur-md">
                <ShieldCheck size={15} className="text-amber-300" />
                <span>Mẫu hình tích lũy</span>
              </div>

              {/* Bottom info */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-2 leading-tight">An toàn trước, tiêu dùng sau</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['Tiết kiệm', 'Dài hạn', 'An toàn'].map(t => (
                    <span key={t} className="px-2.5 py-1 rounded-full bg-amber-400/20 border border-amber-300/30 text-amber-200 text-xs font-semibold">{t}</span>
                  ))}
                </div>
                {/* Tap CTA */}
                <motion.div
                  className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/25 px-4 py-2 backdrop-blur-sm group-hover:bg-white/25 transition-colors duration-300"
                >
                  <span className="text-sm font-semibold text-white">Click để xem phân tích</span>
                  <ArrowRight size={14} className="text-white/80 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.div>
              </div>

              {/* Shimmer on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)' }}
              />
            </div>
          </motion.button>

          {/* Center — Question */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="flex items-center justify-center gap-4 xl:flex-col"
            aria-hidden="true"
          >
            <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-4 border-primary/15 bg-white shadow-[0_18px_40px_rgba(204,23,23,0.12)]">
              <span className="font-heading text-7xl leading-none text-primary">?</span>
              {/* pulse ring */}
              <span className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping" style={{ animationDuration: '2.4s' }} />
            </div>
            <div className="rounded-2xl border border-primary/10 bg-white/95 px-5 py-4 text-center shadow-[0_10px_25px_rgba(204,23,23,0.08)] backdrop-blur-sm max-w-[180px] xl:max-w-[200px]">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary mb-1">Cùng câu hỏi</p>
              <p className="text-sm leading-6 text-text-heading/75 font-medium">Nên sống để dành hay sống để tận hưởng?</p>
            </div>
          </motion.div>

          {/* CARD 2 — Mẫu hình tiêu dùng số */}
          <motion.button
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, scale: 1.015 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveModal('digital')}
            className="group relative overflow-hidden rounded-[2rem] cursor-pointer focus:outline-none text-left"
            aria-label="Xem phân tích: Mẫu hình tiêu dùng số"
          >
            <div className="relative h-[22rem] sm:h-[26rem] overflow-hidden rounded-[2rem]">
              <img
                src={IMAGES.youngShopper}
                alt="Người trẻ gắn với tiêu dùng số, điện thoại và văn hóa mua sắm trực tuyến"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-107"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/75 via-primary/25 to-transparent transition-opacity duration-300" />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500" />

              {/* Top badge */}
              <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/40 bg-black/32 px-4 py-2 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-lg backdrop-blur-md">
                <Smartphone size={15} className="text-red-300" />
                <span>Mẫu hình tiêu dùng số</span>
              </div>

              {/* Bottom info */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-2 leading-tight">Trải nghiệm ngay, quyết định nhanh</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['Flash Sale', 'YOLO', 'Tức thời'].map(t => (
                    <span key={t} className="px-2.5 py-1 rounded-full bg-white/15 border border-white/25 text-white/90 text-xs font-semibold">{t}</span>
                  ))}
                </div>
                <motion.div
                  className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/25 px-4 py-2 backdrop-blur-sm group-hover:bg-white/25 transition-colors duration-300"
                >
                  <span className="text-sm font-semibold text-white">Click để xem phân tích</span>
                  <ArrowRight size={14} className="text-white/80 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.div>
              </div>

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)' }}
              />
            </div>
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="rounded-[2rem] border border-stone-200/80 bg-white/95 p-7 shadow-[0_20px_70px_rgba(15,23,42,0.06)] md:p-10"
        >
            <div className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4 py-2">
                <Target size={15} className="text-primary" />
                <span className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Đối chiếu giá trị</span>
              </div>
              <h3 className="font-heading mb-4 text-3xl leading-tight text-text-heading sm:text-4xl">Cùng là lựa chọn cá nhân, nhưng được nuôi dưỡng từ những nền sống khác nhau</h3>
              <p className="text-lg leading-8 text-text-heading/78">
                Những khẩu hiệu sống không xuất hiện trong khoảng không trung tính. Chúng thường kết tinh từ nhịp sống kinh tế, chuẩn mực thế hệ, áp lực xã hội và hệ sinh thái truyền thông bao quanh mỗi người.
              </p>
            </div>

            <div className="space-y-5">
              {valuePairs.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -4 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.08 * idx }}
                    className="rounded-[1.5rem] border border-stone-200 bg-[linear-gradient(180deg,rgba(255,255,255,1),rgba(248,245,239,0.92))] p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)]"
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/10 bg-primary/10 text-primary">
                        <Icon size={18} strokeWidth={1.7} />
                      </div>
                      <p className="text-base font-bold uppercase tracking-[0.16em] text-text-heading">{item.label}</p>
                    </div>
                    <div className="grid items-center gap-3 md:grid-cols-[1fr_auto_1fr]">
                      <div className="rounded-xl border border-gold/20 bg-gold/10 px-4 py-4 text-base font-medium leading-7 text-text-heading">{item.left}</div>
                      <div className="text-center text-sm font-bold uppercase tracking-[0.18em] text-text-heading/45">vs</div>
                      <div className="rounded-xl border border-primary/10 bg-primary/5 px-4 py-4 text-base font-medium leading-7 text-text-heading">{item.right}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
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
// SECTION 9: SOCIAL CONSCIOUSNESS FEEDBACK EFFECT — REFACTORED
// ══════════════════════════════════════════════════════════════════════════

// ── Left column: 4-node flow diagram data ──────────────────────────────────

const FLOW_NODES = [
  {
    id: 'existence',
    label: 'Tồn tại xã hội',
    sub: 'Điều kiện vật chất quyết định',
    icon: Home,
    color: '#1D4ED8',      // primary blue
    bgLight: 'bg-blue-50',
    border: 'border-blue-200',
    iconBg: 'bg-blue-600',
    ring: 'ring-blue-300',
    dot: 'bg-blue-600',
  },
  {
    id: 'consciousness',
    label: 'Ý thức xã hội',
    sub: 'Hình thành từ tồn tại xã hội',
    icon: Brain,
    color: '#0EA5E9',      // secondary sky
    bgLight: 'bg-sky-50',
    border: 'border-sky-200',
    iconBg: 'bg-sky-500',
    ring: 'ring-sky-300',
    dot: 'bg-sky-500',
  },
  {
    id: 'action',
    label: 'Hành động thực tiễn',
    sub: 'Ý thức dẫn dắt hành động',
    icon: Zap,
    color: '#F59E0B',      // accent amber
    bgLight: 'bg-amber-50',
    border: 'border-amber-200',
    iconBg: 'bg-amber-500',
    ring: 'ring-amber-300',
    dot: 'bg-amber-500',
  },
  {
    id: 'newExistence',
    label: 'Xã hội thay đổi',
    sub: 'Tồn tại xã hội mới được tạo ra',
    icon: Layers,
    color: '#1D4ED8',
    bgLight: 'bg-blue-50',
    border: 'border-blue-200',
    iconBg: 'bg-blue-700',
    ring: 'ring-blue-300',
    dot: 'bg-blue-700',
  },
];

// ── Right column: AI step data ─────────────────────────────────────────────
const AI_STEPS = [
  {
    step: 1,
    label: 'AI xuất hiện',
    image: null,
    imgKey: 'aiBrain',
    imgAlt: 'Slide minh hoạ AI và ChatGPT xuất hiện trong đời sống',
  },
  {
    step: 2,
    label: 'Con người nhận thức được lợi ích của AI',
    imgKey: 'aiStudent',
    imgAlt: 'Slide nội dung học thuật về AI và nhận thức con người',
  },
  {
    step: 3,
    label: 'Trường học và doanh nghiệp ứng dụng AI',
    imgKey: 'aiBusiness',
    imgAlt: 'Slide minh hoạ công nghệ và ứng dụng AI trong đời sống',
  },
  {
    step: 4,
    label: 'Xuất hiện kỹ năng và ngành nghề mới',
    imgKey: 'aiEngineer',
    imgAlt: 'Slide minh hoạ dữ liệu và sự thay đổi thị trường lao động',
  },
  {
    step: 5,
    label: 'Thị trường lao động thay đổi',
    imgKey: 'aiWorkplace',
    imgAlt: 'Slide biểu đồ thay đổi xã hội do AI',
  },
  {
    step: 6,
    label: 'Xã hội thay đổi',
    imgKey: 'aiSociety',
    imgAlt: 'Slide minh hoạ xã hội thay đổi toàn diện',
  },
];

function FeedbackSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  // flow diagram: which node is active (-1 = none)
  const [activeNode, setActiveNode] = useState(-1);

  // AI steps: how many steps revealed (1 = step 1 shown, 6 = all shown)
  const [revealedSteps, setRevealedSteps] = useState(1);
  const allRevealed = revealedSteps >= AI_STEPS.length;

  const handleNextStep = () => {
    if (!allRevealed) setRevealedSteps((s) => s + 1);
  };

  const handlePrevStep = () => {
    if (revealedSteps > 1) setRevealedSteps((s) => s - 1);
  };
  const nodeForStep = Math.min(Math.floor(((revealedSteps - 1) / (AI_STEPS.length - 1)) * (FLOW_NODES.length - 1)), FLOW_NODES.length - 1);

  return (
    <section
      id="feedback"
      ref={ref}
      className="relative py-24 lg:py-36 overflow-hidden"
      style={{ background: '#F8FAFC' }}
    >
      {/* subtle dot grid */}
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* ── Header ── */}
        <div className="text-center mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-label uppercase font-semibold tracking-widest mb-8"
          >
            <GitBranch size={12} strokeWidth={2.5} />
            <span>Tính độc lập tương đối</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl leading-[1.06] text-[#0F172A] mb-6"
          >
            Ý THỨC XÃ HỘI CÓ
            <br />
            <span style={{ color: '#1D4ED8' }}>HOÀN TOÀN THỤ ĐỘNG KHÔNG?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="text-lg text-stone-500 max-w-2xl mx-auto leading-8"
          >
            Tồn tại xã hội giữ vai trò quyết định. Tuy nhiên ý thức xã hội không hoàn toàn thụ động —
            sau khi hình thành, nó có thể tác động trở lại đời sống xã hội thông qua hoạt động thực tiễn của con người.
          </motion.p>
        </div>

        {/* ── 2-column body ── */}
        <div className="grid lg:grid-cols-[1fr_1fr] gap-10 xl:gap-14 items-start">

          {/* ════════════════════════════════════════════
              LEFT: Interactive flow diagram
              ════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:sticky lg:top-24"
          >
            <div className="rounded-[2rem] border border-slate-200 bg-white shadow-[0_20px_70px_rgba(29,78,216,0.08)] p-6 sm:p-8">
              {/* diagram header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#1D4ED8' }}>
                  <Layers size={18} className="text-white" strokeWidth={1.8} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">Sơ đồ tương tác</p>
                  <h3 className="font-bold text-[#0F172A] text-lg">Dòng chảy biện chứng</h3>
                </div>
              </div>

              {/* nodes */}
              <div className="flex flex-col items-stretch gap-0">
                {FLOW_NODES.map((node, idx) => {
                  const Icon = node.icon;
                  const isActive = nodeForStep >= idx;
                  const isExact = nodeForStep === idx;

                  return (
                    <div key={node.id} className="flex flex-col items-center">
                      <motion.button
                        onClick={() => setActiveNode(activeNode === idx ? -1 : idx)}
                        whileHover={{ scale: 1.015 }}
                        whileTap={{ scale: 0.99 }}
                        animate={isExact ? { scale: [1, 1.02, 1] } : {}}
                        transition={{ duration: 0.4 }}
                        className={`w-full text-left rounded-2xl border-2 transition-all duration-500 p-5 ${
                          isActive
                            ? `${node.bgLight} ${node.border} shadow-md`
                            : 'bg-slate-50 border-slate-200 opacity-40'
                        } ${isExact ? `ring-2 ${node.ring} ring-offset-2` : ''}`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${isActive ? node.iconBg : 'bg-slate-200'}`}>
                            <Icon size={22} className="text-white" strokeWidth={1.8} />
                          </div>
                          <div className="flex-1">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: isActive ? node.color : '#94a3b8' }}>
                              Bước {idx + 1}
                            </span>
                            <h4 className={`font-bold text-base leading-tight transition-colors duration-300 ${isActive ? 'text-[#0F172A]' : 'text-slate-400'}`}>
                              {node.label}
                            </h4>
                            <p className={`text-xs mt-0.5 transition-colors duration-300 ${isActive ? 'text-slate-500' : 'text-slate-300'}`}>
                              {node.sub}
                            </p>
                          </div>
                          {isExact && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-3 h-3 rounded-full"
                              style={{ background: node.color }}
                            />
                          )}
                        </div>
                      </motion.button>

                      {/* connector arrow */}
                      {idx < FLOW_NODES.length - 1 && (
                        <div className="flex flex-col items-center py-2">
                          <motion.div
                            className="w-0.5 h-6 rounded-full transition-all duration-500"
                            style={{ background: nodeForStep > idx ? node.color : '#e2e8f0' }}
                            initial={{ scaleY: 0 }}
                            animate={isInView ? { scaleY: 1 } : {}}
                            transition={{ delay: 0.3 + idx * 0.1, duration: 0.4 }}
                          />
                          <motion.div
                            animate={nodeForStep > idx ? { y: [0, 3, 0] } : {}}
                            transition={{ duration: 1.2, repeat: Infinity }}
                          >
                            <ChevronDown
                              size={16}
                              strokeWidth={2.5}
                              style={{ color: nodeForStep > idx ? node.color : '#cbd5e1' }}
                            />
                          </motion.div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Bottom note */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 1 }}
                className="text-center text-xs text-slate-400 mt-6 font-medium tracking-wide"
              >
                Nhấn từng bước bên phải để xem sơ đồ thay đổi
              </motion.p>
            </div>
          </motion.div>

          {/* ════════════════════════════════════════════
              RIGHT: AI step-by-step cards
              ════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Panel header */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 mb-6 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center">
                <Bot size={18} className="text-white" strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">Ví dụ thực tế</p>
                <p className="text-sm font-bold text-[#0F172A]">AI &amp; ChatGPT</p>
              </div>
              <div className="ml-auto text-xs font-semibold text-amber-600 bg-white border border-amber-200 px-3 py-1 rounded-full">
                {revealedSteps}/{AI_STEPS.length}
              </div>
            </div>

            {/* Step cards — 2-column flow, reveal one step at a time */}
            <div className="flex flex-col gap-0">

              {/* ── Row 1: step 1 → step 2 ── */}
              <div className="grid grid-cols-2 gap-3">
                {/* Step 1 */}
                <AnimatePresence>
                  {revealedSteps >= 1 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="relative overflow-hidden rounded-2xl border bg-white shadow-[0_6px_24px_rgba(15,23,42,0.06)]"
                    >
                      <div className="relative w-full bg-slate-100">
                        <img
                          src={IMAGES[AI_STEPS[0].imgKey]}
                          alt={AI_STEPS[0].imgAlt}
                          className="w-full object-contain"
                          style={{ height: 'auto', maxHeight: '14rem' }}
                        />
                      </div>
                      <div className="p-3 sm:p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 text-xs font-black">
                            {AI_STEPS[0].step}
                          </div>
                          <p className="font-bold text-[#0F172A] text-sm leading-tight">{AI_STEPS[0].label}</p>
                        </div>
                        <div className="flex items-center justify-end gap-2">
                          {revealedSteps > 1 && (
                            <motion.button
                              onClick={handlePrevStep}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-xs text-slate-400 hover:text-blue-600 transition-colors"
                            >
                              ← Trước
                            </motion.button>
                          )}
                          {revealedSteps === 1 && !allRevealed && (
                            <motion.button
                              onClick={handleNextStep}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="ml-auto text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg transition-colors"
                            >
                              Tiếp →
                            </motion.button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Step 2 */}
                <AnimatePresence>
                  {revealedSteps >= 2 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="relative overflow-hidden rounded-2xl border bg-white shadow-[0_6px_24px_rgba(15,23,42,0.06)]"
                    >
                      <div className="relative w-full bg-slate-100">
                        <img
                          src={IMAGES[AI_STEPS[1].imgKey]}
                          alt={AI_STEPS[1].imgAlt}
                          className="w-full object-contain"
                          style={{ height: 'auto', maxHeight: '14rem' }}
                        />
                      </div>
                      <div className="p-3 sm:p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 text-xs font-black">
                            {AI_STEPS[1].step}
                          </div>
                          <p className="font-bold text-[#0F172A] text-sm leading-tight">{AI_STEPS[1].label}</p>
                        </div>
                        <div className="flex items-center justify-end gap-2">
                          {revealedSteps > 2 ? (
                            <motion.button
                              onClick={handlePrevStep}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-xs text-slate-400 hover:text-blue-600 transition-colors"
                            >
                              ← Trước
                            </motion.button>
                          ) : (
                            <div className="flex-1" />
                          )}
                          {revealedSteps === 2 && !allRevealed && (
                            <motion.button
                              onClick={handleNextStep}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="ml-auto text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg transition-colors"
                            >
                              Tiếp →
                            </motion.button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ── Row 2: step 4 ← step 3 ── */}
              {revealedSteps > 2 && (
                <AnimatePresence>
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    {/* Step 4 (left) */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="relative overflow-hidden rounded-2xl border bg-white shadow-[0_6px_24px_rgba(15,23,42,0.06)]"
                    >
                      <div className="relative w-full bg-slate-100">
                        <img
                          src={IMAGES[AI_STEPS[3].imgKey]}
                          alt={AI_STEPS[3].imgAlt}
                          className="w-full object-contain"
                          style={{ height: 'auto', maxHeight: '14rem' }}
                        />
                      </div>
                      <div className="p-3 sm:p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 text-xs font-black">
                            {AI_STEPS[3].step}
                          </div>
                          <p className="font-bold text-[#0F172A] text-sm leading-tight">{AI_STEPS[3].label}</p>
                        </div>
                        <div className="flex items-center justify-end gap-2">
                          {revealedSteps > 4 ? (
                            <motion.button
                              onClick={handlePrevStep}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-xs text-slate-400 hover:text-blue-600 transition-colors"
                            >
                              ← Trước
                            </motion.button>
                          ) : (
                            <div className="flex-1" />
                          )}
                          {revealedSteps === 4 && !allRevealed && (
                            <motion.button
                              onClick={handleNextStep}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="ml-auto text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg transition-colors"
                            >
                              Tiếp →
                            </motion.button>
                          )}
                        </div>
                      </div>
                    </motion.div>

                    {/* Step 3 (right) */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="relative overflow-hidden rounded-2xl border bg-white shadow-[0_6px_24px_rgba(15,23,42,0.06)]"
                    >
                      <div className="relative w-full bg-slate-100">
                        <img
                          src={IMAGES[AI_STEPS[2].imgKey]}
                          alt={AI_STEPS[2].imgAlt}
                          className="w-full object-contain"
                          style={{ height: 'auto', maxHeight: '14rem' }}
                        />
                      </div>
                      <div className="p-3 sm:p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 text-xs font-black">
                            {AI_STEPS[2].step}
                          </div>
                          <p className="font-bold text-[#0F172A] text-sm leading-tight">{AI_STEPS[2].label}</p>
                        </div>
                        <div className="flex items-center justify-end gap-2">
                          {revealedSteps > 4 ? (
                            <motion.button
                              onClick={handlePrevStep}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-xs text-slate-400 hover:text-blue-600 transition-colors"
                            >
                              ← Trước
                            </motion.button>
                          ) : (
                            <div className="flex-1" />
                          )}
                          {revealedSteps === 3 && !allRevealed && (
                            <motion.button
                              onClick={handleNextStep}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="ml-auto text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg transition-colors"
                            >
                              Tiếp →
                            </motion.button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </AnimatePresence>
              )}

              {/* ── Row 3: step 5 → step 6 ── */}
              {revealedSteps > 4 && (
                <AnimatePresence>
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    {/* Step 5 */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="relative overflow-hidden rounded-2xl border bg-white shadow-[0_6px_24px_rgba(15,23,42,0.06)]"
                    >
                      <div className="relative w-full bg-slate-100">
                        <img
                          src={IMAGES[AI_STEPS[4].imgKey]}
                          alt={AI_STEPS[4].imgAlt}
                          className="w-full object-contain"
                          style={{ height: 'auto', maxHeight: '14rem' }}
                        />
                      </div>
                      <div className="p-3 sm:p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 text-xs font-black">
                            {AI_STEPS[4].step}
                          </div>
                          <p className="font-bold text-[#0F172A] text-sm leading-tight">{AI_STEPS[4].label}</p>
                        </div>
                        <div className="flex items-center justify-end gap-2">
                          {revealedSteps > 6 ? (
                            <motion.button
                              onClick={handlePrevStep}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-xs text-slate-400 hover:text-blue-600 transition-colors"
                            >
                              ← Trước
                            </motion.button>
                          ) : (
                            <div className="flex-1" />
                          )}
                          {revealedSteps === 5 && !allRevealed && (
                            <motion.button
                              onClick={handleNextStep}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="ml-auto text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg transition-colors"
                            >
                              Tiếp →
                            </motion.button>
                          )}
                        </div>
                      </div>
                    </motion.div>

                    {/* Step 6 */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="relative overflow-hidden rounded-2xl border bg-white shadow-[0_6px_24px_rgba(15,23,42,0.06)]"
                    >
                      <div className="relative w-full bg-slate-100">
                        <img
                          src={IMAGES[AI_STEPS[5].imgKey]}
                          alt={AI_STEPS[5].imgAlt}
                          className="w-full object-contain"
                          style={{ height: 'auto', maxHeight: '14rem' }}
                        />
                      </div>
                      <div className="p-3 sm:p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 text-xs font-black">
                            {AI_STEPS[5].step}
                          </div>
                          <p className="font-bold text-[#0F172A] text-sm leading-tight">{AI_STEPS[5].label}</p>
                        </div>
                        <div className="flex items-center justify-end gap-2">
                          {revealedSteps > 6 && (
                            <motion.button
                              onClick={handlePrevStep}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-xs text-slate-400 hover:text-blue-600 transition-colors"
                            >
                              ← Trước
                            </motion.button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </AnimatePresence>
              )}

            </div>

            {/* ── Conclusion — fades in after all steps revealed ── */}
            <AnimatePresence>
              {allRevealed && (
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-6 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-sky-50 p-6 shadow-[0_16px_50px_rgba(29,78,216,0.10)]"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
                      <BookMarked size={16} className="text-white" strokeWidth={1.8} />
                    </div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">Thông điệp</p>
                  </div>
                  <p className="text-[#0F172A] font-semibold text-base leading-7 mb-2">
                    Ý thức xã hội không chỉ phản ánh hiện thực.
                  </p>
                  <p className="text-slate-600 text-sm leading-7">
                    Khi được nhiều người tiếp nhận và biến thành hành động thực tiễn, nó có thể tạo ra những thay đổi thực sự trong đời sống xã hội.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// SECTION 10: CONCLUSION
// ══════════════════════════════════════════════════════════════════════════

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
        <ConditionedThoughtSection />
        <OpeningQuestion />
        <MarxQuote />
        <SocialExistence />
        <SocialConsciousness />
        <DialecticalRelationship />
        <SocialMediaSection />

        <FeedbackSection />
        <AppendixSection />
      </main>
      <Footer />
    </div>
  );
}
