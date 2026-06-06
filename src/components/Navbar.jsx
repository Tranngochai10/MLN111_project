import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Menu, X } from 'lucide-react';

const navSections = [
  { id: 'hero', label: 'Mở đầu' },
  { id: 'opening', label: 'Câu hỏi' },
  { id: 'marx-quote', label: 'Marx' },
  { id: 'social-existence', label: 'Tồn tại xã hội' },
  { id: 'social-consciousness', label: 'Ý thức xã hội' },
  { id: 'dialectical', label: 'Biện chứng' },
  { id: 'social-media', label: 'Mạng xã hội' },
  { id: 'ai-example', label: 'AI' },
  { id: 'feedback', label: 'Phản hồi' },
  { id: 'conclusion', label: 'Kết luận' },
  { id: 'appendix', label: 'Phụ lục' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      const sectionEls = navSections.map(s => document.getElementById(s.id)).filter(Boolean);
      const scrollPos = window.scrollY + window.innerHeight / 3;
      for (let i = sectionEls.length - 1; i >= 0; i--) {
        if (scrollPos >= sectionEls[i].offsetTop) {
          setActiveSection(navSections[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl border-b border-border shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-2.5 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-md">
              <Star size={14} className="text-gold fill-gold" />
            </div>
            <span className="font-heading text-lg text-text-heading tracking-tight">
              Marx<span className="gradient-text-red">Mind</span>
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navSections.slice(0, 10).map((section) => (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                  activeSection === section.id
                    ? 'text-primary bg-primary/8'
                    : 'text-muted hover:text-text-heading hover:bg-stone-100'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>

          {/* Mobile menu */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center text-muted hover:text-text-heading hover:bg-stone-100 transition-all cursor-pointer"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="fixed top-16 left-0 right-0 z-40 lg:hidden bg-white border-b border-border shadow-lg rounded-b-2xl mx-4"
          >
            <div className="p-3 space-y-0.5">
              {navSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollTo(section.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                    activeSection === section.id
                      ? 'text-primary bg-primary/8'
                      : 'text-muted hover:text-text-heading hover:bg-stone-50'
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side progress indicator */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col items-center gap-3">
        {navSections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollTo(section.id)}
            className="group relative flex items-center gap-2 cursor-pointer"
            title={section.label}
          >
            <span className={`text-[10px] font-semibold tracking-wider uppercase transition-all duration-300 origin-right scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 ${
              activeSection === section.id ? 'text-primary' : 'text-muted'
            }`}>
              {section.label}
            </span>
            <div className={`w-2 h-2 rounded-full border-2 transition-all duration-400 ${
              activeSection === section.id
                ? 'bg-primary border-primary scale-125'
                : 'border-border-light bg-transparent group-hover:border-primary/40'
            }`} />
          </button>
        ))}
      </div>
    </>
  );
}
