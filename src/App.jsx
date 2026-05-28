import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Quote, Sparkles, ArrowUpRight, Award, Compass, Smartphone, HelpCircle } from 'lucide-react';
import Navbar from './components/Navbar';

// CẤU HÌNH CỐT TRUYỆN MỚI: ĐA DẠNG BỐ CỤC (LAYOUT), BACKGROUND BIẾN ĐỔI THEO TỪNG CẢM XÚC STAGE
const STORY_PAGES = [
  {
    type: "landing",
    chapter: "LỜI MỞ ĐẦU",
    title: "Bạn có thực sự tự do đưa ra quyết định?",
    subtitle: "Tâm trí bạn tự do, hay chỉ là phản ánh của hoàn cảnh vật chất?",
    content: "Mỗi sáng thức dậy, bạn tự chọn ly cà phê, chọn trang phục, chọn ước mơ và tin rằng bản thân đang làm chủ suy nghĩ. Nhưng triết học Marx chỉ ra một sự thật trần trụi: Tâm trí của bạn thực chất chỉ là tấm gương phản chiếu môi trường sống, điều kiện kinh tế và những áp lực vật chất xung quanh.",
    bgImage: "/assets/stage1.jpg",
    accentColor: "border-red-500/20",
    glowColor: "rgba(239, 68, 68, 0.1)",
    layout: "center", // Bố cục quote chính giữa màn hình
    author: "KARL MARX"
  },
  {
    type: "story",
    chapter: "STAGE I: TỒN TẠI VẬT CHẤT",
    title: "Cái nôi định hình sự sống",
    subtitle: "Bạn ăn gì, ở đâu, kiếm bao nhiêu tiền?",
    content: "Trước khi con người bàn về lý tưởng tự do, nghệ thuật hay triết học, họ buộc phải ăn, uống, có chỗ che mưa nắng và mưu sinh hàng ngày. Đây chính là 'Tồn tại xã hội' — hạ tầng vật chất khách quan không thể chối bỏ. Nó là chiếc khuôn đầu tiên đúc nên tư duy của bạn.",
    bgImage: "/assets/stage2.jpg",
    accentColor: "border-amber-500/20",
    glowColor: "rgba(245, 158, 11, 0.1)",
    layout: "split-left", // Bố cục tách đôi, nội dung bên trái, ảnh mờ bên phải
    author: "THỰC TẾ SINH TỒN"
  },
  {
    type: "story",
    chapter: "STAGE II: NHỮNG LĂNG KÍNH KHÁC BIỆT",
    title: "Vị thế xã hội chia rẽ nhận thức thế nào?",
    subtitle: "Chúng ta không suy nghĩ giống nhau khi hầu bao khác nhau.",
    content: "Một sinh viên nghèo lo toan học phí sẽ ưu tiên công việc ổn định để tồn tại. Một CEO sinh ra trong đủ đầy sẵn sàng chấp nhận rủi ro và tin tưởng vào chủ nghĩa cá nhân. Một người công nhân tăng ca 12 tiếng không còn sức để mộng mơ. Hoàn cảnh vật chất đã chia rẽ và định hình ý thức của từng người.",
    bgImage: "/assets/stage3.jpg",
    accentColor: "border-purple-500/20",
    glowColor: "rgba(168, 85, 247, 0.1)",
    layout: "split-right", // Bố cục tách đôi, nội dung bên phải, ảnh bên trái
    author: "KHỦNG HOẢNG TẦNG LỚP"
  },
  {
    type: "story",
    chapter: "STAGE III: DÒNG CHẢY THỜI ĐẠI",
    title: "Ý thức hệ thay đổi theo lịch sử sản xuất",
    subtitle: "Xã hội chuyển mình, tư duy dịch chuyển.",
    content: "Chiến tranh nghèo đói tôi luyện nên lòng yêu nước và ý thức hy sinh vì tập thể. Thời bao cấp đề cao tính cộng đồng, chia sẻ tem phiếu. Đến thời đại AI và Internet, con người lại quay cuồng trong sự cô đơn, chứng FOMO và thói quen khẳng định bản thân ảo. Lịch sử vật chất thay đổi, ý thức hệ thay đổi.",
    bgImage: "/assets/stage4.jpg",
    accentColor: "border-blue-500/20",
    glowColor: "rgba(59, 130, 246, 0.1)",
    layout: "minimalist", // Bố cục tối giản, chữ siêu lớn và thoáng
    author: "DÒNG CHẢY BIỆN CHỨNG"
  },
  {
    type: "story",
    chapter: "STAGE IV: THỰC TẠI SỐ HÓA 4.0",
    title: "Thuật toán đang âm thầm lập trình tư duy",
    subtitle: "Khi không gian ảo trở thành 'tồn tại xã hội' mới.",
    content: "Bạn nghĩ bạn tự chọn nội dung giải trí? Không, thuật toán TikTok gợi ý những gì bạn nghĩ. Bạn lo sợ mất việc vì AI? Phương thức sản xuất kỹ thuật số mới đang đe dọa sinh kế vật chất, từ đó tạo ra một làn sóng lo âu và định nghĩa lại chuẩn mực hạnh phúc của cả một thế hệ.",
    bgImage: "/assets/stage5.jpg",
    accentColor: "border-cyan-500/20",
    glowColor: "rgba(6, 182, 212, 0.1)",
    layout: "center",
    author: "TỒN TẠI SỐ HÓA"
  }
];

const QUIZ_QUESTIONS = [
  {
    question: "1. Giữa hai cuộc đời này, bạn thực lòng muốn chọn bên nào hơn?",
    options: [
      { text: "Giàu có vượt trội, tự do tài chính nhưng chấp nhận cô đơn lạnh lẽo", value: "rich_lonely" },
      { text: "Nghèo khó, vất vả mưu sinh nhưng gia đình luôn hạnh phúc, ấm áp", value: "poor_happy" },
      { text: "Nỗ lực hành động để cân bằng cả hai, không chấp nhận cực đoan nào", value: "balanced" }
    ]
  },
  {
    question: "2. Bạn nghĩ yếu tố nào có sức mạnh lớn nhất để thay đổi tư duy một con người?",
    options: [
      { text: "Tăng thu nhập, cải thiện điều kiện sống và nhà ở tốt hơn (Thay đổi Vật chất)", value: "rich_lonely" },
      { text: "Đọc sách, giáo dục đạo đức và rèn luyện ý chí tinh thần (Thay đổi Ý thức)", value: "poor_happy" },
      { text: "Kết hợp cả cải tạo môi trường sống lẫn giáo dục nhận thức học tập", value: "balanced" }
    ]
  },
  {
    question: "3. Khi gặp áp lực lớn trong cuộc sống, bạn thường tìm kiếm sự giải tỏa từ đâu?",
    options: [
      { text: "Mua sắm, ăn uống xa xỉ hoặc tập trung đi kiếm tiền nhiều hơn", value: "rich_lonely" },
      { text: "Tìm đến người thân chia sẻ, trò chuyện hoặc khóc để vơi đi", value: "poor_happy" },
      { text: "Đi du lịch một mình, thiền định hoặc nghe nhạc để suy ngẫm", value: "balanced" }
    ]
  }
];

const QUIZ_RESULTS = {
  rich_lonely: {
    title: "Chủ Nghĩa Thực Tế Vật Chất",
    spectrum: { material: 90, spiritual: 10 },
    desc: "Bạn đặt nền tảng an toàn tài chính và điều kiện vật chất lên hàng đầu. Bạn hiểu rõ rằng không có thực lực kinh tế vững chắc, mọi giá trị tinh thần đều trở nên mong manh.",
    marx: "Karl Marx viết: 'Đời sống xã hội quyết định ý thức'. Nhận thức của bạn phản ánh sự cần thiết của cơ sở vật chất đối với đời sống con người."
  },
  poor_happy: {
    title: "Chủ Nghĩa Lý Tưởng Tinh Thần",
    spectrum: { material: 20, spiritual: 80 },
    desc: "Bạn coi trọng cảm xúc, sự gắn kết gia đình và giá trị đạo đức hơn là của cải vật chất thuần túy. Bạn là người hướng nội và giàu tình cảm.",
    marx: "Dù đề cao tinh thần, Marx vẫn cảnh báo: Nếu điều kiện vật chất quá thiếu thốn, ý thức lý tưởng này sẽ dễ dàng bị lung lay trước sóng gió kinh tế đời thực."
  },
  balanced: {
    title: "Tư Duy Biện Chứng Hài Hòa",
    spectrum: { material: 55, spiritual: 45 },
    desc: "Bạn không lựa chọn cực đoan. Bạn thấu hiểu mối quan hệ qua lại: Vật chất là nền tảng quyết định, nhưng tinh thần có tính độc lập tương đối và tác động ngược lại đời sống vật chất.",
    marx: "Đây chính là cốt lõi của duy vật biện chứng: Tồn tại xã hội quyết định ý thức xã hội, nhưng ý thức xã hội cũng có thể thúc đẩy cải tạo tồn tại xã hội."
  }
};

export default function App() {
  const [currentPage, setCurrentPage] = useState(0); // 0-4: Stages, 5: Quiz, 6: Shake, 7: Results
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [isShaking, setIsShaking] = useState(false);

  const nextStory = () => {
    if (currentPage < 4) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevStory = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Tự động xin cấp quyền cảm biến chuyển động (iOS 13+) ngay khi chạm/click màn hình lần đầu
  useEffect(() => {
    const requestMotionPermission = async () => {
      if (
        typeof DeviceMotionEvent !== 'undefined' &&
        typeof DeviceMotionEvent.requestPermission === 'function'
      ) {
        try {
          const state = await DeviceMotionEvent.requestPermission();
          if (state === 'granted') {
            console.log('Quyền cảm biến chuyển động đã được cấp.');
          }
        } catch (err) {
          console.warn('Lỗi xin quyền cảm biến:', err);
        }
      }
    };

    const handleFirstInteraction = () => {
      requestMotionPermission();
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  // Cảm biến rung điện thoại
  useEffect(() => {
    let lastX = null, lastY = null, lastZ = null;
    const SHAKE_THRESHOLD = 14; 

    const handleMotion = (event) => {
      if (currentPage !== 6) return; 
      const acceleration = event.accelerationIncludingGravity;
      if (!acceleration) return;
      const { x, y, z } = acceleration;

      if (lastX !== null) {
        const deltaX = Math.abs(x - lastX);
        const deltaY = Math.abs(y - lastY);
        const deltaZ = Math.abs(z - lastZ);

        if ((deltaX > SHAKE_THRESHOLD && deltaY > SHAKE_THRESHOLD) || (deltaX > SHAKE_THRESHOLD && deltaZ > SHAKE_THRESHOLD) || (deltaY > SHAKE_THRESHOLD && deltaZ > SHAKE_THRESHOLD)) {
          triggerShakeAction();
        }
      }
      lastX = x;
      lastY = y;
      lastZ = z;
    };

    window.addEventListener('devicemotion', handleMotion);
    return () => window.removeEventListener('devicemotion', handleMotion);
  }, [currentPage]);

  const triggerShakeAction = () => {
    if (isShaking) return;
    setIsShaking(true);
    if (navigator.vibrate) {
      navigator.vibrate([150, 100, 150]);
    }
    setTimeout(() => {
      setIsShaking(false);
      setCurrentPage(7);
    }, 1500);
  };

  const handleSelectOption = (val) => {
    const nextAnswers = [...quizAnswers, val];
    setQuizAnswers(nextAnswers);

    if (quizIdx < QUIZ_QUESTIONS.length - 1) {
      setQuizIdx(quizIdx + 1);
    } else {
      const counts = nextAnswers.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
      }, {});
      
      let maxVal = "balanced";
      let maxCount = 0;
      Object.entries(counts).forEach(([k, v]) => {
        if (v > maxCount) {
          maxCount = v;
          maxVal = k;
        }
      });
      setResult(QUIZ_RESULTS[maxVal]);
      setCurrentPage(6); 
    }
  };

  const handleReset = () => {
    setCurrentPage(0);
    setQuizIdx(0);
    setQuizAnswers([]);
    setResult(null);
  };

  const currentStageInfo = STORY_PAGES[currentPage <= 4 ? currentPage : 0];

  return (
    <div 
      className="relative min-h-screen text-gray-200 overflow-hidden select-none flex flex-col justify-between"
    >
      {/* 1. LAYER ẢNH NỀN HỖ TRỢ HIỆU ỨNG PARALLAX & CINEMATIC ZOOM CHẬM */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage <= 4 ? currentStageInfo.bgImage : "/assets/stage5.jpg"}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.35, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center w-full h-full animate-slow-zoom"
            style={{
              backgroundImage: `url('${currentPage <= 4 ? currentStageInfo.bgImage : "/assets/stage5.jpg"}')`
            }}
          />
        </AnimatePresence>
        {/* Lớp gradient đè tạo chiều sâu điện ảnh tối tối giản */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/60" />
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="film-grain" />
      </div>

      <Navbar />

      {/* 2. NỘI DUNG CHÍNH - BIẾN ĐỔI BỐ CỤC THEO TỪNG STAGE */}
      <div className="flex-1 flex items-center justify-center px-6 sm:px-12 py-24 relative z-10 w-full">
        <AnimatePresence mode="wait">
          
          {/* CỐT TRUYỆN DẪN DẮT (STAGE 0 - 4) */}
          {currentPage <= 4 && (
            <motion.div
              key={`stage-layout-${currentPage}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-6xl"
            >
              {/* LAYOUT 1: CENTER (Chương mở đầu và kết) */}
              {currentStageInfo.layout === "center" && (
                <div className="text-center max-w-4xl mx-auto space-y-8">
                  <span className="text-[10px] tracking-widest text-cyan-400 font-bold font-sans uppercase">
                    {currentStageInfo.chapter}
                  </span>
                  <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl text-white leading-tight select-text">
                    {currentStageInfo.title}
                  </h1>
                  <p className="text-gray-400 text-sm sm:text-base font-quote italic tracking-wide select-text">
                    {currentStageInfo.subtitle}
                  </p>
                  <p className="text-gray-300 text-sm sm:text-lg leading-relaxed font-quote px-4 select-text">
                    {currentStageInfo.content}
                  </p>
                  <div className="text-[10px] tracking-widest text-gray-500 font-sans font-semibold pt-6">
                    — {currentStageInfo.author} —
                  </div>
                </div>
              )}

              {/* LAYOUT 2: SPLIT LEFT */}
              {currentStageInfo.layout === "split-left" && (
                <div className="grid md:grid-cols-12 gap-8 items-center text-left">
                  <div className="md:col-span-8 space-y-6">
                    <span className="text-[10px] tracking-widest text-cyan-400 font-bold font-sans uppercase">
                      {currentStageInfo.chapter}
                    </span>
                    <h1 className="font-heading text-3xl sm:text-5xl text-white leading-tight select-text">
                      {currentStageInfo.title}
                    </h1>
                    <p className="text-gray-400 text-xs sm:text-sm font-quote italic select-text">
                      {currentStageInfo.subtitle}
                    </p>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-quote select-text">
                      {currentStageInfo.content}
                    </p>
                  </div>
                  <div className="md:col-span-4 hidden md:flex justify-center">
                    <div className="w-full h-64 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-8xl grayscale opacity-30 shadow-cinematic-cyan animate-float-subtle">
                      🏭
                    </div>
                  </div>
                </div>
              )}

              {/* LAYOUT 3: SPLIT RIGHT */}
              {currentStageInfo.layout === "split-right" && (
                <div className="grid md:grid-cols-12 gap-8 items-center text-left">
                  <div className="md:col-span-4 hidden md:flex justify-center">
                    <div className="w-full h-64 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-8xl grayscale opacity-30 shadow-cinematic-red animate-float-subtle">
                      💎
                    </div>
                  </div>
                  <div className="md:col-span-8 space-y-6">
                    <span className="text-[10px] tracking-widest text-cyan-400 font-bold font-sans uppercase">
                      {currentStageInfo.chapter}
                    </span>
                    <h1 className="font-heading text-3xl sm:text-5xl text-white leading-tight select-text">
                      {currentStageInfo.title}
                    </h1>
                    <p className="text-gray-400 text-xs sm:text-sm font-quote italic select-text">
                      {currentStageInfo.subtitle}
                    </p>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-quote select-text">
                      {currentStageInfo.content}
                    </p>
                  </div>
                </div>
              )}

              {/* LAYOUT 4: MINIMALIST TYPOGRAPHY */}
              {currentStageInfo.layout === "minimalist" && (
                <div className="text-center max-w-3xl mx-auto space-y-12">
                  <span className="text-[10px] tracking-widest text-gray-500 font-sans font-bold uppercase">
                    {currentStageInfo.chapter}
                  </span>
                  <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl text-cyan-400 leading-none select-text text-glow-blue" style={{ textShadow: '0 0 15px rgba(34,211,238,0.4)' }}>
                    {currentStageInfo.title}
                  </h1>
                  <p className="text-gray-300 text-base sm:text-xl font-quote leading-relaxed select-text">
                    {currentStageInfo.content}
                  </p>
                </div>
              )}

            </motion.div>
          )}

          {/* TRANG QUIZ (STAGE 5) */}
          {currentPage === 5 && (
            <motion.div
              key="quiz-cinematic"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-3xl text-left space-y-8"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-black tracking-widest text-red-500 uppercase block font-sans">
                  THỬ NGHIỆM ĐỒNG THUẬN GIÁ TRỊ SỐNG
                </span>
                <h2 className="text-2xl sm:text-4xl font-heading text-white leading-snug">
                  {QUIZ_QUESTIONS[quizIdx].question}
                </h2>
                <p className="text-xs text-gray-500 font-sans">
                  Hãy đưa ra lựa chọn thành thật nhất đại diện cho thế giới quan hiện tại của bạn:
                </p>
              </div>

              <div className="space-y-4 pt-4">
                {QUIZ_QUESTIONS[quizIdx].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(opt.value)}
                    className="w-full text-left p-5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-cyan-500/20 transition-all duration-300 text-sm sm:text-base text-gray-300 font-sans cursor-pointer flex items-center justify-between"
                  >
                    <span>{opt.text}</span>
                    <span className="text-cyan-400 font-bold">➔</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* TRANG SHAKE TRUNG GIAN (STAGE 6) */}
          {currentPage === 6 && (
            <motion.div
              key="shake-cinematic"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8 w-full max-w-xl text-center"
            >
              <motion.div
                animate={isShaking ? {
                  x: [0, -15, 15, -15, 15, 0],
                  y: [0, 8, -8, 8, -8, 0]
                } : { y: [0, -8, 0] }}
                transition={isShaking ? { duration: 0.8, repeat: Infinity } : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-20 h-20 rounded-full bg-cyan-500/5 border border-cyan-500/20 flex items-center justify-center mx-auto text-3xl text-cyan-400 shadow-cinematic-cyan"
              >
                <Smartphone size={32} className={isShaking ? "animate-bounce" : ""} />
              </motion.div>

              <h2 className="font-heading text-2xl sm:text-3xl text-white leading-snug">
                KÍCH HOẠT BIỆN CHỨNG QUY LUẬT
              </h2>
              
              <div className="space-y-2 text-sm text-gray-400 max-w-md mx-auto leading-relaxed font-sans">
                <p>
                  {isShaking 
                    ? "Đang phân tích các dữ liệu sinh tồn..." 
                    : "Hãy lắc nhẹ thiết bị của bạn hoặc dùng nút giả lập bên dưới để kích hoạt quá trình định hình ý thức."
                  }
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={triggerShakeAction}
                  disabled={isShaking}
                  className="px-8 py-4 bg-gradient-to-r from-cyan-600 via-cyan-500 to-blue-600 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer font-sans shadow-lg shadow-cyan-500/10"
                >
                  {isShaking ? "Đang xử lý..." : "Kích hoạt định hình ➔"}
                </button>
              </div>
            </motion.div>
          )}

          {/* TRANG KẾT QUẢ VỚI RADAR CHART / SPECTUMS VÀ AI ANALYSIS (STAGE 7) */}
          {currentPage === 7 && result && (
            <motion.div
              key="result-cinematic"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-8 w-full max-w-4xl text-center flex flex-col items-center justify-center"
            >
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest block font-sans">
                ĐỊNH VỊ NHẬN THỨC BẢN THÂN
              </span>
              <h2 className="font-heading text-3xl sm:text-5xl text-white">
                {result.title}
              </h2>
              
              {/* 1. HỘP HIỂN THỊ PHỔ QUÁT TƯ TƯỞNG (IDEOLOGY SPECTRUM DYNAMIC BAR) */}
              <div className="w-full max-w-lg glass p-4 rounded-xl border border-white/5 space-y-3 font-sans">
                <div className="flex justify-between text-xs text-gray-400 font-bold uppercase">
                  <span>Vật chất ({result.spectrum.material}%)</span>
                  <span>Tinh thần ({result.spectrum.spiritual}%)</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden flex">
                  <div className="bg-red-500 h-full transition-all duration-1000" style={{ width: `${result.spectrum.material}%` }} />
                  <div className="bg-cyan-500 h-full transition-all duration-1000" style={{ width: `${result.spectrum.spiritual}%` }} />
                </div>
                <p className="text-[10px] text-gray-500 italic">Biểu đồ biểu thị sự tác động qua lại biện chứng giữa hai yếu tố.</p>
              </div>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl font-quote">
                {result.desc}
              </p>

              <div className="bg-white/5 p-5 rounded-xl border border-white/5 text-left w-full max-w-3xl">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block mb-2 font-sans flex items-center gap-1.5">
                  <Quote size={12} /> Phân tích Marxist
                </span>
                <p className="text-sm text-gray-300 italic leading-relaxed font-quote">
                  "{result.marx}"
                </p>
              </div>

              {/* 2. CÁC NÚT VÀ CREDIT AI NẰM CHÍNH GIỮA MÀN HÌNH */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl pt-6 font-sans">
                
                {/* Nút Wikipedia */}
                <a
                  href="https://vi.wikipedia.org/wiki/Ch%E1%BB%A7_ngh%C4%A9a_duy_v%E1%BA%ADt_l%E1%BB%8Bch_s%E1%BB%AD"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-4 bg-white/5 hover:bg-white/10 text-cyan-400 hover:text-white rounded-xl border border-white/10 transition-all cursor-pointer font-bold text-xs uppercase tracking-wider"
                >
                  <Compass size={14} />
                  <span>Xem Trích Dẫn Wikipedia</span>
                  <ArrowUpRight size={12} />
                </a>

                {/* Hộp Trợ Lý AI Antigravity */}
                <div className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-cyan-950/20 to-black/50 border border-cyan-500/20 rounded-xl text-center">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-cyan-400 uppercase tracking-wider mb-1">
                    <Sparkles size={12} /> Trợ lý phát triển AI
                  </div>
                  <p className="text-[10px] text-gray-400 leading-normal">
                    Trang web được tạo sinh bởi trợ lý lập trình <b>Antigravity AI</b>: Hỗ trợ tự động thiết kế UI, lập trình logic phản ứng và cấu hình animation 3D.
                  </p>
                </div>

              </div>

              <div className="flex justify-center gap-4 pt-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 rounded-xl border border-cyan-500/20 text-xs font-bold uppercase transition-all font-sans cursor-pointer"
                >
                  Trải nghiệm lại từ đầu
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* 3. ĐIỀU HƯỚNG TRANG DƯỚI CHÂN TRANG */}
      <div className="w-full flex items-center justify-between text-[10px] sm:text-xs tracking-widest text-gray-500 font-sans font-bold uppercase relative z-10 p-5 sm:p-6 border-t border-white/5 bg-black/40 backdrop-blur-sm">
        {currentPage > 0 && currentPage < 5 ? (
          <button 
            onClick={prevStory}
            className="hover:text-white transition-colors cursor-pointer"
          >
            <span className="hidden sm:inline">← BƯỚC TRƯỚC</span>
            <span className="sm:hidden">← LÙI LẠI</span>
          </button>
        ) : <div />}

        <div>
          {currentPage <= 4 ? `${currentPage + 1} / ${STORY_PAGES.length}` : ""}
        </div>

        {currentPage < 4 ? (
          <button 
            onClick={nextStory}
            className="hover:text-white transition-colors cursor-pointer"
          >
            <span className="hidden sm:inline">TIẾP THEO →</span>
            <span className="sm:hidden">TIẾP →</span>
          </button>
        ) : currentPage === 4 ? (
          <button 
            onClick={() => setCurrentPage(5)}
            className="text-cyan-400 hover:text-white transition-colors animate-pulse cursor-pointer"
          >
            <span className="hidden sm:inline">BẮT ĐẦU ĐỒNG THUẬN ➔</span>
            <span className="sm:hidden">ĐỒNG THUẬN ➔</span>
          </button>
        ) : <div />}
      </div>

    </div>
  );
}
