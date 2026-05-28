import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const FULL_QUOTE = '"Không phải ý thức quyết định đời sống,\nmà chính đời sống xã hội quyết định ý thức."';
const AUTHOR = '— Karl Marx, Lời tựa Phê phán Kinh tế Chính trị học (1859)';

function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.size = Math.random() * 2 + 0.5;
        this.opacity = Math.random() * 0.6 + 0.1;
        const colors = ['rgba(239,68,68', 'rgba(139,92,246', 'rgba(6,182,212', 'rgba(255,255,255'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `${this.color},${this.opacity})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < 120; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(139,92,246,${0.08 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
        p.update();
        p.draw();
      });
      
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}

function useTypingAnimation(text, speed = 40, delay = 1200) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1));
          i++;
        } else {
          setDone(true);
          clearInterval(interval);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  return { displayed, done };
}

export default function Hero() {
  const { displayed, done } = useTypingAnimation(FULL_QUOTE, 35, 1000);
  const [showSubtitle, setShowSubtitle] = useState(false);

  useEffect(() => {
    if (done) {
      setTimeout(() => setShowSubtitle(true), 400);
    }
  }, [done]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cover bg-center"
      style={{ 
        backgroundImage: `linear-gradient(to bottom, rgba(10,10,15,0.7) 0%, rgba(10,10,15,0.9) 100%), url('/assets/bg_war.jpg')`
      }}
    >
      {/* Animated background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.2) 0%, transparent 70%)', filter: 'blur(60px)' }}
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.12, 0.2, 0.12] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)', filter: 'blur(50px)' }}
        />
      </div>

      {/* Grid background */}
      <div className="absolute inset-0 bg-grid opacity-20" style={{ zIndex: 0 }} />

      {/* Particles */}
      <ParticleCanvas />

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-red-500/30 text-red-400 text-sm font-medium mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
          Triết học Marx-Lenin · Chủ Nghĩa Duy Vật Lịch Sử
        </motion.div>

        {/* Large decorative quote mark */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="quote-mark select-none mb-[-2rem]"
          style={{ color: 'rgba(239,68,68,0.15)' }}
        >
          "
        </motion.div>

        {/* Main quote with typing effect */}
        <div className="min-h-[8rem] sm:min-h-[6rem] mb-4">
          <h1
            className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #e0e0e0 50%, #c0c0d0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              whiteSpace: 'pre-line'
            }}
          >
            {displayed}
            {!done && (
              <span
                className="inline-block w-0.5 h-8 sm:h-10 bg-red-400 ml-1 align-middle"
                style={{ animation: 'blink 1s ease-in-out infinite' }}
              />
            )}
          </h1>
        </div>

        {/* Author */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: showSubtitle ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          className="text-gray-400 text-sm sm:text-base font-medium italic mb-10"
        >
          {AUTHOR}
        </motion.p>

        {/* Subtitle description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showSubtitle ? 1 : 0, y: showSubtitle ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            Khám phá mối quan hệ sâu sắc giữa{' '}
            <span className="text-red-400 font-semibold">tồn tại xã hội</span>{' '}
            và{' '}
            <span className="text-cyan-400 font-semibold">ý thức xã hội</span>{' '}
            — nền tảng của triết học Marxist và chìa khóa để hiểu thế giới hiện đại.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: showSubtitle ? 1 : 0, y: showSubtitle ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(239,68,68,0.5)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('theory')}
            className="btn-primary w-full sm:w-auto flex items-center gap-2 justify-center"
          >
            <span>🔍</span>
            Khám Phá Xã Hội
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(6,182,212,0.4)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('characters')}
            className="btn-secondary w-full sm:w-auto flex items-center gap-2 justify-center"
          >
            <span>🚀</span>
            Bắt Đầu Trải Nghiệm
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 10 }}
      >
        <span className="text-gray-500 text-xs tracking-widest uppercase">Cuộn xuống</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border border-gray-600 flex items-start justify-center p-1.5"
        >
          <div className="w-1 h-3 bg-gradient-to-b from-red-400 to-transparent rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
