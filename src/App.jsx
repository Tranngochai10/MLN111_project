import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Volume2, VolumeX, Quote, 
  ArrowLeftRight
} from 'lucide-react';
import Navbar from './components/Navbar';

// Dynamic Materialist Dialectics Canvas Background
function DialecticsCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 100;
        this.size = Math.random() * 2 + 1;
        this.speedY = -(Math.random() * 0.5 + 0.2);
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.color = Math.random() > 0.5 ? 'rgba(239, 68, 68, ' : 'rgba(6, 182, 212, ';
        this.alpha = Math.random() * 0.35 + 0.1;
      }

      update(scrollSpeed) {
        this.y += this.speedY - scrollSpeed * 0.4;
        this.x += this.speedX;

        if (this.y < -10) {
          this.y = height + Math.random() * 20;
          this.x = Math.random() * width;
        }
        if (this.x < 0 || this.x > width) {
          this.speedX = -this.speedX;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color + this.alpha + ')';
        ctx.fill();
      }
    }

    const particleCount = Math.min(50, Math.floor((width * height) / 30000));
    const particles = Array.from({ length: particleCount }, () => new Particle());

    let lastScrollY = window.scrollY;
    let scrollSpeed = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollSpeed = Math.abs(currentScrollY - lastScrollY) * 0.08;
      lastScrollY = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      scrollSpeed *= 0.93;

      particles.forEach((p) => {
        p.update(scrollSpeed);
        p.draw();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const alpha = (1 - dist / 130) * 0.07 * (particles[i].y / height);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
}

export default function App() {
  const [isMuted, setIsMuted] = useState(true);
  const [activePillar, setActivePillar] = useState(0); 
  const [activeLogicStep, setActiveLogicStep] = useState(0); 
  const [sliderPosition, setSliderPosition] = useState(50); 
  const [isDraggingSlider, setIsDraggingSlider] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef(null);

  // Audio refs
  const audioCtxRef = useRef(null);
  const oscillatorsRef = useRef([]);

  const toggleSound = () => {
    if (!isMuted) {
      stopAmbientMusic();
      setIsMuted(true);
    } else {
      playAmbientMusic();
      setIsMuted(false);
    }
  };

  const playAmbientMusic = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioCtx = new AudioContext();
      audioCtxRef.current = audioCtx;

      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, audioCtx.currentTime);

      const gainNode = audioCtx.createGain();
      gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime);

      filter.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      const freqs = [65.41, 98.00, 130.81, 155.56]; 
      oscillatorsRef.current = freqs.map(freq => {
        const osc = audioCtx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        
        const oscGain = audioCtx.createGain();
        oscGain.gain.setValueAtTime(0.12 / freqs.length, audioCtx.currentTime);
        
        osc.connect(oscGain);
        oscGain.connect(filter);
        osc.start();
        return osc;
      });
    } catch (e) {
      console.warn(e);
    }
  };

  const stopAmbientMusic = () => {
    if (oscillatorsRef.current.length > 0) {
      oscillatorsRef.current.forEach(osc => {
        try { osc.stop(); } catch(e) {}
      });
      oscillatorsRef.current = [];
    }
    if (audioCtxRef.current) {
      try { audioCtxRef.current.close(); } catch(e) {}
      audioCtxRef.current = null;
    }
  };

  useEffect(() => {
    const handleScrollDetect = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      const sections = document.querySelectorAll('section');
      sections.forEach((sec, idx) => {
        if (scrollPosition >= sec.offsetTop && scrollPosition < sec.offsetTop + sec.offsetHeight) {
          setActiveSection(idx);
        }
      });
    };
    window.addEventListener('scroll', handleScrollDetect, { passive: true });
    return () => {
      stopAmbientMusic();
      window.removeEventListener('scroll', handleScrollDetect);
    };
  }, []);

  const handleSliderMouseMove = (e) => {
    if (!isDraggingSlider || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.max(15, Math.min(85, (x / rect.width) * 100));
    setSliderPosition(pct);
  };

  const handleSliderTouchMove = (e) => {
    if (!containerRef.current || e.touches.length === 0) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const pct = Math.max(15, Math.min(85, (x / rect.width) * 100));
    setSliderPosition(pct);
  };

  const scrollToSection = (idx) => {
    const sections = document.querySelectorAll('section');
    if (sections[idx]) {
      sections[idx].scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Pillars for Section 4 - EXACT user Vietnamese wording
  const pillars = [
    {
      title: "Phương thức sản xuất vật chất",
      subtitle: "Cách chúng ta làm ra của cải - Yếu tố quyết định nhất",
      desc: "Cách chúng ta làm ra của cải - Yếu tố quyết định nhất đối với sự sinh tồn, vận động và phát triển của toàn bộ cấu trúc đời sống xã hội.",
      icon: "⚙️"
    },
    {
      title: "Điều kiện tự nhiên - Địa lý",
      subtitle: "Khí hậu, môi trường",
      desc: "Khí hậu, môi trường tự nhiên bao quanh, đóng vai trò là tiền đề vật chất tự nhiên bắt buộc cho sự sinh tồn và sản xuất của con người.",
      icon: "🌍"
    },
    {
      title: "Dân số và mật độ dân số",
      subtitle: "Quy mô và sự phân bố dân cư",
      desc: "Quy mô, tốc độ tăng trưởng và mật độ phân bố dân số - điều kiện thiết yếu cho sự tồn tại và phát triển của xã hội.",
      icon: "👥"
    }
  ];

  // Logic steps for Section 6 - EXACT user content
  const logicSteps = [
    {
      title: "Điều kiện sống",
      desc: "Hoàn cảnh môi trường tự nhiên, xã hội ban đầu bao quanh đời sống con người.",
      icon: "🌡️"
    },
    {
      title: "Hoàn cảnh kinh tế",
      desc: "Cơ cấu kinh tế, thu nhập, phương thức sản xuất thay đổi dưới tác động của điều kiện sống.",
      icon: "📊"
    },
    {
      title: "Quan hệ xã hội",
      desc: "Mối tương tác giữa người với người trong lao động sản xuất và sinh hoạt cộng đồng.",
      icon: "🤝"
    },
    {
      title: "Cách suy nghĩ",
      desc: "Nhận thức, thế giới quan riêng biệt hình thành trong đầu óc của mỗi cá nhân.",
      icon: "💡"
    },
    {
      title: "Ý thức xã hội",
      desc: "Đúc kết chung thành các hệ tư tưởng, thói quen và tâm lý cộng đồng của toàn bộ xã hội.",
      icon: "🔮"
    }
  ];

  const sectionNames = [
    "Tiêu đề",
    "Tương tác phản biện",
    "Marx Nhận định",
    "Tồn tại xã hội",
    "Ý thức xã hội",
    "Sơ đồ logic",
    "Mạng xã hội",
    "Trí tuệ nhân tạo (AI)"
  ];

  return (
    <div 
      className="relative min-h-screen text-gray-200 overflow-x-hidden bg-black flex flex-col justify-between selection:bg-red-500 selection:text-white"
      onMouseMove={handleSliderMouseMove}
      onMouseUp={() => setIsDraggingSlider(false)}
      onTouchMove={handleSliderTouchMove}
      onTouchEnd={() => setIsDraggingSlider(false)}
    >
      {/* Dialectics Background + Atmospheric overlays */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <DialecticsCanvas />
        <div className="absolute inset-0 bg-grid opacity-[0.06]" />
        <div className="film-grain" />
        
        {/* Soft atmospheric background lights */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-red-500/[0.03] blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] rounded-full bg-cyan-500/[0.03] blur-[180px]" />
      </div>

      <Navbar />

      {/* Dynamic Vertical Flow Axis Line */}
      <div className="fixed left-12 md:left-24 top-0 bottom-0 w-[1px] bg-gradient-to-b from-red-500/20 via-white/10 to-cyan-500/20 z-10 hidden lg:block">
        <div className="absolute w-[5px] h-[50px] bg-gradient-to-b from-red-500 to-cyan-500 -left-2 rounded-full shadow-lg shadow-red-500/50" style={{
          top: `${(activeSection / 7) * 90 + 5}%`,
          transition: 'top 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
        }} />
      </div>

      {/* Floating Side Exhibition Navigator */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4 bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/5 shadow-2xl">
        {sectionNames.map((name, idx) => (
          <button
            key={idx}
            onClick={() => scrollToSection(idx)}
            className="group flex items-center justify-end gap-3 text-right cursor-pointer"
          >
            <span className={`text-[10px] tracking-widest font-bold uppercase transition-all duration-300 origin-right scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 ${
              activeSection === idx ? "text-cyan-400 opacity-80" : "text-gray-500"
            }`}>
              {name}
            </span>
            <div className={`w-2.5 h-2.5 rounded-full border transition-all duration-300 ${
              activeSection === idx 
              ? "bg-cyan-400 border-cyan-400 scale-125 shadow-lg shadow-cyan-400/50" 
              : "border-white/25 bg-transparent hover:border-white"
            }`} />
          </button>
        ))}
      </div>

      {/* Ambient Music Control Button */}
      <div className="fixed top-4 right-6 z-50 flex items-center gap-3">
        <button
          onClick={toggleSound}
          className="w-10 h-10 rounded-full border border-white/10 bg-black/60 backdrop-blur-md flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition-all cursor-pointer shadow-lg animate-float-subtle"
          title={isMuted ? "Bật nhạc nền Ambient" : "Tắt nhạc nền Ambient"}
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} className="text-cyan-400 animate-pulse" />}
        </button>
      </div>

      {/* Main content container */}
      <div className="relative z-10 w-full flex flex-col items-center pl-0 lg:pl-32 pr-0 lg:pr-12">
        
        {/* SLIDE 1: Title */}
        <section className="min-h-screen w-full max-w-5xl mx-auto flex flex-col justify-center px-6 py-24 space-y-12 relative">
          

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-left space-y-8"
          >
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-8 bg-red-500" />
              <span className="text-[10px] tracking-[0.4em] text-red-500 font-bold uppercase">
                BẠN NGHĨ RA SUY NGHĨ CỦA MÌNH, HAY HOÀN CẢNH ĐÃ "LẬP TRÌNH" NÓ?
              </span>
            </div>
            
            <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl text-white leading-none font-black select-text text-glow-red">
              BẠN NGHĨ RA SUY NGHĨ CỦA MÌNH,<br />
              HAY HOÀN CẢNH ĐÃ <span className="text-red-500">"LẬP TRÌNH"</span> NÓ?
            </h1>
          </motion.div>

          <div className="flex justify-start pt-6">
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="text-xs text-gray-600 font-sans tracking-widest flex items-center gap-3 cursor-pointer"
              onClick={() => scrollToSection(1)}
            >
              <span className="text-red-500">↓</span>
              <span>CUỘN XUỐNG ĐỂ TIẾP TỤC</span>
            </motion.div>
          </div>
        </section>

        {/* SLIDE 2: Interactive Question */}
        <section className="min-h-screen w-full max-w-5xl mx-auto flex flex-col justify-center px-6 py-24 space-y-12 relative">
          

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-left space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-8 bg-cyan-400" />
              <span className="text-xs tracking-[0.3em] text-cyan-400 font-bold uppercase block">
                CÂU HỎI TƯƠNG TÁC PHẢN BIỆN
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading text-white leading-snug">
              “Tại sao cùng là con người, nhưng tư duy, lối sống, cách nhìn nhận về thành công của người sống ở thành thị và nông thôn lại thường khác nhau?”
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 font-sans">
              Kéo thanh trượt bên dưới để trực quan sự khác biệt bối cảnh sống
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.99 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            ref={containerRef}
            className="relative h-[400px] w-full rounded-2xl overflow-hidden border border-white/5 select-none shadow-cinematic-cyan bg-black"
          >
            {/* Left view (City) */}
            <div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-950/40 via-blue-950/15 to-transparent p-10 flex flex-col justify-end space-y-3 z-0"
              style={{ width: `${sliderPosition}%` }}
            >
              <div className="max-w-[320px] transition-all">
                <span className="text-[10px] font-bold text-cyan-400 tracking-widest block uppercase font-sans">LỐI SỐNG THÀNH THỊ</span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">Chung cư & Thăng tiến</h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mt-2 font-sans">
                  Áp lực bởi công việc, kẹt xe, thuê nhà, họ sẽ nghĩ về việc làm sao để thăng tiến, mua chung cư.
                </p>
              </div>
            </div>

            {/* Right view (Country) */}
            <div 
              className="absolute inset-y-0 right-0 bg-gradient-to-l from-amber-950/30 via-stone-900/15 to-transparent p-10 flex flex-col justify-end items-end text-right space-y-3 z-0"
              style={{ width: `${100 - sliderPosition}%` }}
            >
              <div className="max-w-[320px] transition-all">
                <span className="text-[10px] font-bold text-amber-400 tracking-widest block uppercase font-sans">LỐI SỐNG NÔNG THÔN</span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">Ổn định & Tình làng nghĩa xóm</h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mt-2 font-sans">
                  Lo lắng về thời tiết, mùa màng, giá phân bón, họ hướng đến sự ổn định, tình làng nghĩa xóm.
                </p>
              </div>
            </div>

            {/* Handle bar */}
            <div 
              className="absolute inset-y-0 w-1 bg-white/10 cursor-ew-resize flex items-center justify-center z-10"
              style={{ left: `${sliderPosition}%` }}
              onMouseDown={() => setIsDraggingSlider(true)}
              onTouchStart={() => setIsDraggingSlider(true)}
            >
              <div className="w-10 h-10 rounded-full bg-white text-black font-bold flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                <ArrowLeftRight size={16} />
              </div>
            </div>
          </motion.div>
        </section>

        {/* SLIDE 3: Karl Marx quote */}
        <section className="min-h-screen w-full max-w-4xl mx-auto flex flex-col justify-center items-center px-6 py-24 text-center space-y-8 relative">
          

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            <Quote size={40} className="text-red-500/80 mx-auto" />
            <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl text-white font-black leading-tight max-w-3xl text-glow-red">
              "Không phải ý thức quyết định đời sống mà chính <span className="text-red-500">đời sống quyết định ý thức</span>."
            </h1>
            <div className="w-20 h-[3px] bg-gradient-to-r from-red-600 to-red-400 mx-auto rounded-full my-6" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center gap-4 bg-white/5 border border-white/5 px-6 py-4 rounded-2xl backdrop-blur-md"
          >
            <div className="w-12 h-12 rounded-full bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400 font-serif font-bold text-lg shadow-lg">
              ★
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-white uppercase tracking-wider font-sans">Karl Marx</p>
              <p className="text-xs text-gray-400 font-sans">Duy vật lịch sử</p>
            </div>
          </motion.div>
        </section>

        {/* SLIDE 4: Khái niệm "Tồn tại xã hội" */}
        <section className="min-h-screen w-full max-w-5xl mx-auto flex flex-col justify-center px-6 py-24 space-y-12 relative">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-left space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-8 bg-red-500" />
              <span className="text-xs tracking-[0.3em] text-red-500 font-bold uppercase block">
                TỒN TẠI XÃ HỘI (SOCIAL EXISTENCE)
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading text-white">Khái niệm "Tồn tại xã hội"</h2>
            <p className="text-sm sm:text-base text-gray-400 max-w-3xl font-sans leading-relaxed">
              Biểu thị sinh hoạt vật chất và các điều kiện sinh hoạt vật chất của xã hội. Di chuột hoặc chạm để xem chi tiết 3 chân kiềng:
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                onClick={() => setActivePillar(idx)}
                className={`p-8 rounded-2xl border transition-all duration-300 cursor-pointer backdrop-blur-sm flex flex-col justify-between min-h-[220px] group ${
                  activePillar === idx 
                  ? "border-red-500/50 bg-red-500/10 shadow-lg shadow-red-500/5 scale-[1.03]" 
                  : "border-white/5 bg-white/5 hover:border-white/10 hover:bg-white/10"
                }`}
              >
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-3xl">{pillar.icon}</span>
                    <span className={`text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded ${
                      activePillar === idx ? "bg-red-500/20 text-red-400" : "bg-white/5 text-gray-500"
                    }`}>
                      Chân kiềng {idx + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white group-hover:text-red-400 transition-colors">{pillar.title}</h3>
                    <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mt-1">{pillar.subtitle}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* <motion.div 
            key={activePillar}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-2xl bg-gradient-to-r from-neutral-950 to-neutral-900 border border-white/5 backdrop-blur-md text-left"
          >
            <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest block mb-2 font-sans">Chi tiết nội dung:</span>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-sans">
              {pillars[activePillar].desc}
            </p>
          </motion.div> */}
        </section>

        {/* SLIDE 5: Khái niệm "Ý thức xã hội" */}
        <section className="min-h-screen w-full max-w-5xl mx-auto flex flex-col justify-center px-6 py-24 space-y-12 relative">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-left space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-8 bg-cyan-400" />
              <span className="text-xs tracking-[0.3em] text-cyan-400 font-bold uppercase block">
                Ý THỨC XÃ HỘI (SOCIAL CONSCIOUSNESS)
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading text-white">Khái niệm "Ý thức xã hội"</h2>
            <p className="text-sm sm:text-base text-gray-400 max-w-3xl font-sans leading-relaxed">
              Biểu thị sinh hoạt tinh thần của xã hội, nảy sinh và phản ánh lại tồn tại xã hội. Cấu trúc tinh thần gồm:
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Tam ly xa hoi */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-neutral-950 to-neutral-900 border border-cyan-500/10 hover:border-cyan-500/30 transition-all duration-500 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-lg">
                    🧠
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-white">Tâm lý xã hội</h3>
                    <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider font-sans">Tầng nổi / Dễ thay đổi</span>
                  </div>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed font-sans">
                  Tình cảm, tâm trạng, thói quen hàng ngày (bề nổi, dễ thay đổi).
                </p>
              </div>
            </motion.div>

            {/* He tu tuong */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-neutral-950 to-neutral-900 border border-purple-500/10 hover:border-purple-500/30 transition-all duration-500 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 text-lg">
                    ⚖️
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-white">Hệ tư tưởng</h3>
                    <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider font-sans">Bề sâu / Có hệ thống</span>
                  </div>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed font-sans">
                  Đường lối chính trị, pháp luật, đạo đức, tôn giáo (bề sâu, có hệ thống).
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SLIDE 6: Sơ đồ logic mối quan hệ quyết định */}
        <section className="min-h-screen w-full max-w-5xl mx-auto flex flex-col justify-center px-6 py-24 space-y-12 relative">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-left space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-8 bg-red-500" />
              <span className="text-xs tracking-[0.3em] text-red-500 font-bold uppercase block">
                SƠ ĐỒ BIỆN CHỨNG CHUYỂN DỊCH
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading text-white">Sơ đồ logic mối quan hệ quyết định</h2>
            <p className="text-sm sm:text-base text-gray-400 max-w-3xl font-sans leading-relaxed">
              Nhấp vào từng bước để theo dõi dòng chuyển đổi biện chứng:
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 relative py-6">
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-red-500/20 to-cyan-500/20 -translate-y-1/2 hidden md:block z-0" />

            {logicSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => setActiveLogicStep(idx)}
                className={`relative z-10 p-6 rounded-2xl border flex md:flex-col items-center gap-4 md:gap-3 cursor-pointer transition-all duration-300 w-full md:w-[18%] ${
                  activeLogicStep === idx
                  ? "border-red-500/50 bg-red-950/30 text-white shadow-xl scale-105"
                  : "border-white/5 bg-white/5 hover:border-white/10 hover:bg-white/10 text-gray-400"
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                  activeLogicStep === idx ? "bg-red-600 text-white shadow-md" : "bg-white/5 text-gray-400"
                }`}>
                  {step.icon}
                </div>
                <h4 className="font-bold text-xs uppercase tracking-widest font-sans text-center">{step.title}</h4>
              </motion.div>
            ))}
          </div>

          <motion.div 
            key={activeLogicStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-2xl bg-gradient-to-r from-neutral-950 to-neutral-900 border border-white/5 text-left min-h-[110px]"
          >
            <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest block mb-2 font-sans">Chi tiết chuyển dịch:</span>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-sans">
              {logicSteps[activeLogicStep].desc}
            </p>
          </motion.div>
        </section>

        {/* SLIDE 7: Ví dụ 1 */}
        <section className="min-h-screen w-full max-w-5xl mx-auto flex flex-col justify-center px-6 py-24 space-y-12 relative">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-left space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-8 bg-cyan-400" />
              <span className="text-xs tracking-[0.3em] text-cyan-400 font-bold uppercase block">
                VÍ DỤ THỰC TIỄN 1
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading text-white">Mạng xã hội và sự thay đổi nhận thức giới trẻ</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-neutral-900 to-black border border-white/5 hover:border-red-500/20 transition-all duration-500 space-y-4"
            >
              <span className="text-xs font-bold text-red-400 tracking-wider block font-sans">🛠️ TỒN TẠI XÃ HỘI THAY ĐỔI</span>
              <p className="text-sm text-gray-300 leading-relaxed font-sans">
                Cơ sở hạ tầng internet phát triển vượt bậc, smartphone trở thành vật bất ly thân, các nền tảng thuật toán video ngắn (TikTok, Reels) bùng nổ. Con người chuyển từ giao tiếp trực tiếp sang tương tác số.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-neutral-900 to-black border border-white/5 hover:border-cyan-500/20 transition-all duration-500 space-y-4"
            >
              <span className="text-xs font-bold text-cyan-400 tracking-wider block font-sans">🧠 Ý THỨC XÃ HỘI THAY ĐỔI CHI PHỐI</span>
              <p className="text-sm text-gray-300 leading-relaxed font-sans">
                Giới trẻ hình thành tư duy "nhanh và ngắn", tiếp thu kiến thức dạng mì ăn liền. Xuất hiện các hội chứng tâm lý mới như FOMO (sợ bỏ lỡ), áp lực đồng lứa (peer pressure) khi chứng kiến sự hào nhoáng trên mạng, và định nghĩa mới về người nổi tiếng (KOLs/KOCs).
              </p>
            </motion.div>
          </div>
        </section>

        {/* SLIDE 8: Ví dụ 4 */}
        <section className="min-h-screen w-full max-w-5xl mx-auto flex flex-col justify-center px-6 py-24 space-y-12 relative mb-16">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-left space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-8 bg-cyan-400" />
              <span className="text-xs tracking-[0.3em] text-cyan-400 font-bold uppercase block">
                VÍ DỤ THỰC TIỄN 2
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading text-white">Chuyển đổi số và Trí tuệ nhân tạo (AI)</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-neutral-900 to-black border border-white/5 hover:border-red-500/20 transition-all duration-500 space-y-4"
            >
              <span className="text-xs font-bold text-red-400 tracking-wider block font-sans">🛠️ TỒN TẠI XÃ HỘI THAY ĐỔI</span>
              <p className="text-sm text-gray-300 leading-relaxed font-sans">
                Sự xuất hiện của AI tạo sinh, ChatGPT, các hệ thống tự động hóa thay thế lao động thủ công và một phần lao động trí óc trong các nhà máy, văn phòng.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-neutral-900 to-black border border-white/5 hover:border-cyan-500/20 transition-all duration-500 space-y-4"
            >
              <span className="text-xs font-bold text-cyan-400 tracking-wider block font-sans">🧠 Ý THỨC XÃ HỘI THAY ĐỔI CHI PHỐI</span>
              <p className="text-sm text-gray-300 leading-relaxed font-sans">
                Khái niệm về "năng lực cạnh tranh" của con người thay đổi. Thay vì học thuộc lòng, xã hội đề cao tư duy phản biện và kỹ năng ra lệnh cho AI (Prompt Engineering). Xuất hiện tâm lý lo âu bị thay thế (AI anxiety) và các cuộc thảo luận đạo đức về bản quyền của AI.
              </p>
            </motion.div>
          </div>
        </section>

      </div>

      {/* Simplified, neat artistic footer */}
      <footer className="w-full text-center py-8 border-t border-white/5 bg-black/60 backdrop-blur-md relative z-10 text-[10px] text-gray-600 font-sans tracking-widest">
        <span>★ BIỆN CHỨNG DUY VẬT LỊCH SỬ — THUYẾT TRÌNH TƯƠNG TÁC CAO CẤP ★</span>
      </footer>
    </div>
  );
}
