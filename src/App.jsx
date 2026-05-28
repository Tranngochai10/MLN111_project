import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Quote, Sparkles, ArrowUpRight, Award, Compass, Smartphone } from 'lucide-react';
import Navbar from './components/Navbar';

const STORY_PAGES = [
  {
    type: "story",
    quote: '"Không phải ý thức quyết định đời sống,\nmà chính đời sống xã hội quyết định ý thức."',
    translation: "Không phải nhận thức tạo ra hoàn cảnh, mà chính hoàn cảnh vật chất thực tế tạo dựng nên nhận thức của con người.",
    author: "KARL MARX"
  },
  {
    type: "story",
    quote: '"Nếu được lựa chọn số phận,\nbạn chọn Giàu sang cô độc hay Nghèo khó ấm áp?"',
    translation: "Một thử nghiệm giả định kinh điển về hạnh phúc tinh thần và giới hạn của vật chất.",
    author: "TRẢI NGHIỆM ĐỒNG THUẬN"
  },
  {
    type: "story",
    quote: '"Có thể có Một túp lều tranh hai trái tim vàng,\nkhi tiền nhà và đói nghèo đè nặng mỗi đêm?"',
    translation: "Marx chỉ ra: Áp lực sinh tồn vật chất (tồn tại xã hội) luôn âm thầm định hình giới hạn của hạnh phúc tình cảm.",
    author: "THỰC TẾ CUỘC SỐNG"
  },
  {
    type: "story",
    quote: '"Trên đỉnh cao danh vọng,\nngười giàu có thực sự tự do khỏi nỗi cô đơn?"',
    translation: "Đủ đầy vật chất giải phóng cơ thể, nhưng môi trường cạnh tranh khốc liệt lại kiến tạo một ý thức hoài nghi cô độc.",
    author: "KHỦNG HOẢNG TẦNG LỚP"
  },
  {
    type: "story",
    quote: '"Muốn thay đổi ý thức xã hội,\ntrước hết cần thay đổi điều kiện sống vật chất."',
    translation: "Đúc kết triết học biện chứng: Để tâm trí con người lành mạnh và hạnh phúc, trước hết hãy kiến tạo một thế giới công bằng hơn.",
    author: "KARL MARX"
  },
  {
    type: "game",
    title: "THỬ NGHIỆM ĐỒNG THUẬN GIÁ TRỊ SỐNG",
    subtitle: "Câu hỏi 1: Giữa hai cuộc đời này, bạn thực lòng muốn chọn bên nào hơn?"
  },
  {
    type: "shake_trigger",
    title: "KÍCH HOẠT BIỆN CHỨNG QUY LUẬT",
    subtitle: "Lắc nhẹ điện thoại hoặc Click mạnh vào nút kích hoạt để giải mã ý thức của bạn."
  },
  {
    type: "result",
    title: "ĐỊNH VỊ NHẬN THỨC CỦA BẠN"
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
    desc: "Bạn đặt nền tảng an toàn tài chính và điều kiện vật chất lên hàng đầu. Bạn hiểu rõ rằng không có thực lực kinh tế vững chắc, mọi giá trị tinh thần đều trở nên mong manh.",
    marx: "Karl Marx viết: 'Đời sống xã hội quyết định ý thức'. Nhận thức của bạn phản ánh sự cần thiết của cơ sở vật chất đối với đời sống con người."
  },
  poor_happy: {
    title: "Chủ Nghĩa Lý Tưởng Tinh Thần",
    desc: "Bạn coi trọng cảm xúc, sự gắn kết gia đình và giá trị đạo đức hơn là của cải vật chất thuần túy. Bạn là người hướng nội và giàu tình cảm.",
    marx: "Dù đề cao tinh thần, Marx vẫn cảnh báo: Nếu điều kiện vật chất quá thiếu thốn, ý thức lý tưởng này sẽ dễ dàng bị lung lay trước sóng gió kinh tế đời thực."
  },
  balanced: {
    title: "Tư Duy Biện Chứng Hài Hòa",
    desc: "Bạn không lựa chọn cực đoan. Bạn thấu hiểu mối quan hệ qua lại: Vật chất là nền tảng quyết định, nhưng tinh thần có tính độc lập tương đối và tác động ngược lại đời sống vật chất.",
    marx: "Đây chính là cốt lõi của duy vật biện chứng: Tồn tại xã hội quyết định ý thức xã hội, nhưng ý thức xã hội cũng có thể thúc đẩy cải tạo tồn tại xã hội."
  }
};

export default function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [hasSensorPermission, setHasSensorPermission] = useState(false);
  const audioRef = useRef(null);

  // Kích hoạt xin quyền cảm biến trên các dòng máy bảo mật / iOS
  const requestSensorPermission = () => {
    // Kiểm tra API xin quyền đặc thù của Safari/iOS
    if (
      typeof DeviceMotionEvent !== 'undefined' &&
      typeof DeviceMotionEvent.requestPermission === 'function'
    ) {
      DeviceMotionEvent.requestPermission()
        .then((permissionState) => {
          if (permissionState === 'granted') {
            setHasSensorPermission(true);
            alert("Đã cấp quyền cảm biến thành công! Hãy lắc điện thoại của bạn.");
          } else {
            alert("Quyền truy cập cảm biến bị từ chối. Bạn có thể sử dụng nút giả lập để tiếp tục.");
          }
        })
        .catch((err) => {
          console.error("Lỗi yêu cầu quyền cảm biến:", err);
          alert("Trình duyệt yêu cầu kết nối bảo mật HTTPS để dùng cảm biến. Hãy dùng nút giả lập.");
        });
    } else {
      // Đối với các dòng máy Android thường hoặc PC, quyền tự động kích hoạt
      setHasSensorPermission(true);
      triggerShakeAction();
    }
  };

  // Phát hiện cử chỉ lắc điện thoại (Device Motion)
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

        // Nhận diện chuyển động đột ngột hai chiều trở lên
        if ((deltaX > SHAKE_THRESHOLD && deltaY > SHAKE_THRESHOLD) || (deltaX > SHAKE_THRESHOLD && deltaZ > SHAKE_THRESHOLD) || (deltaY > SHAKE_THRESHOLD && deltaZ > SHAKE_THRESHOLD)) {
          triggerShakeAction();
        }
      }

      lastX = x;
      lastY = y;
      lastZ = z;
    };

    window.addEventListener('devicemotion', handleMotion);
    return () => {
      window.removeEventListener('devicemotion', handleMotion);
    };
  }, [currentPage]);

  const triggerShakeAction = () => {
    if (isShaking) return;
    setIsShaking(true);
    
    // Phản hồi rung vật lý của thiết bị
    if (navigator.vibrate) {
      navigator.vibrate([150, 100, 150]);
    }

    setTimeout(() => {
      setIsShaking(false);
      setCurrentPage(7); // Đi tới kết quả
    }, 1500);
  };

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
        .then(() => setIsPlaying(true))
        .catch(err => {
          console.warn(err);
          alert("Click nhẹ vào bất kỳ điểm nào trên màn hình trước để kích hoạt âm thanh trình duyệt nhé!");
        });
    }
  };

  const nextStory = () => {
    if (currentPage < STORY_PAGES.length - 1) {
      if (currentPage === 5 && !result) {
        alert("Vui lòng hoàn thành 3 câu hỏi trắc nghiệm trước nhé!");
        return;
      }
      setCurrentPage(currentPage + 1);
    } else {
      handleReset();
    }
  };

  const prevStory = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
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

  return (
    <div 
      className="relative min-h-screen bg-black text-white flex flex-col justify-between p-8 sm:p-12 font-sans select-none"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.96) 100%), url('/assets/bg_war.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      
      {/* 1. THANH ĐIỀU HƯỚNG CHẤM TRÒN GÓC PHẢI TRÊN */}
      <div className="absolute top-8 right-8 flex items-center gap-3 z-50">
        
        {/* Nút nhạc đệm */}
        <button 
          onClick={toggleMusic}
          className="p-2 rounded-full hover:bg-white/10 transition-colors mr-2 text-gray-400 hover:text-white cursor-pointer"
          title="Nhạc đệm"
        >
          {isPlaying ? <Volume2 size={16} className="text-cyan-400 animate-pulse" /> : <VolumeX size={16} />}
        </button>

        {STORY_PAGES.map((page, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (idx === 5) {
                setQuizIdx(0);
                setQuizAnswers([]);
              }
              setCurrentPage(idx);
            }}
            className={`w-3.5 h-3.5 rounded-full transition-all duration-300 cursor-pointer ${
              idx === currentPage 
                ? 'bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)] scale-110' 
                : 'bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>

      {/* Tên thương hiệu nhỏ gọn tinh tế góc trái */}
      <div className="absolute top-8 left-8 text-xs tracking-widest font-sans font-black uppercase text-gray-500">
        MARX<span className="text-cyan-400">MIND</span>
      </div>

      {/* 2. KHU VỰC HIỂN THỊ CHÍNH */}
      <div className="flex-1 flex flex-col items-center justify-center text-center max-w-4xl mx-auto my-auto relative">
        <AnimatePresence mode="wait">
          
          {/* TRANG CỐT TRUYỆN THƯỜNG (0 - 4) */}
          {currentPage <= 4 && (
            <motion.div
              key={`story-${currentPage}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="space-y-8"
            >
              <h1 
                className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-wide text-cyan-400 font-sans leading-snug text-glow-blue select-text"
                style={{
                  textShadow: '0 0 25px rgba(34, 211, 238, 0.6), 0 0 50px rgba(34, 211, 238, 0.2)',
                  whiteSpace: 'pre-line'
                }}
              >
                {STORY_PAGES[currentPage].quote}
              </h1>

              <p className="text-gray-300 text-sm sm:text-lg italic font-serif leading-relaxed max-w-3xl mx-auto px-4 select-text">
                {STORY_PAGES[currentPage].translation}
              </p>

              <div className="text-xs sm:text-sm tracking-widest text-gray-500 font-sans font-bold uppercase pt-6">
                — {STORY_PAGES[currentPage].author} —
              </div>
            </motion.div>
          )}

          {/* TRANG TRÒ CHƠI TƯƠNG TÁC LỰA CHỌN (TRANG 5) */}
          {currentPage === 5 && (
            <motion.div
              key="game-stage"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8 w-full max-w-2xl"
            >
              <span className="text-xs font-black tracking-widest text-red-500 uppercase block font-sans">
                TRÒ CHƠI HOÁ THÂN LỰA CHỌN GIÁ TRỊ SỐNG
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug font-sans">
                {QUIZ_QUESTIONS[quizIdx].question}
              </h2>
              <p className="text-xs text-gray-400 font-sans">
                Hãy lựa chọn hoàn cảnh sống phản ánh đúng mong ước sâu thẳm của bạn:
              </p>

              <div className="space-y-4 pt-4">
                {QUIZ_QUESTIONS[quizIdx].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(opt.value)}
                    className="w-full text-left p-4 rounded-xl border border-white/10 bg-white/5 hover:border-white/30 transition-all text-sm sm:text-base text-gray-300 font-semibold flex items-center justify-between font-sans cursor-pointer"
                  >
                    <span>{opt.text}</span>
                    <span className="text-cyan-400">➔</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* TRANG LẮC ĐIỆN THOẠI TRUNG GIAN KÍCH HOẠT (TRANG 6) */}
          {currentPage === 6 && (
            <motion.div
              key="shake-stage"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8 w-full max-w-xl text-center"
            >
              <motion.div
                animate={isShaking ? {
                  x: [0, -20, 20, -20, 20, 0],
                  y: [0, 10, -10, 10, -10, 0]
                } : { y: [0, -10, 0] }}
                transition={isShaking ? { duration: 0.8, repeat: Infinity } : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-24 h-24 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto text-4xl text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
              >
                <Smartphone size={40} className={isShaking ? "animate-bounce" : ""} />
              </motion.div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug font-sans">
                KÍCH HOẠT BIỆN CHỨNG QUY LUẬT
              </h2>
              
              <div className="space-y-2 text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                <p>
                  {isShaking 
                    ? "Đang giải mã và định hình dữ liệu ý thức của bạn..." 
                    : "Lắc nhẹ điện thoại của bạn ngay bây giờ để mở khóa kết quả phân tích hệ tư tưởng!"
                  }
                </p>
                <p className="text-xs text-gray-500">
                  (Nếu dùng iPhone/Safari, bạn cần nhấn nút xin quyền cảm biến ở dưới trước)
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                {/* Nút xin cấp quyền cảm biến (Dành riêng cho các hệ điều hành bảo mật cao/iOS) */}
                <button
                  onClick={requestSensorPermission}
                  className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 text-xs font-bold transition-all cursor-pointer font-sans"
                >
                  Xin quyền cảm biến (iOS)
                </button>

                {/* Nút giả lập lắc máy cho PC/Android hoặc nếu không muốn lắc */}
                <button
                  onClick={triggerShakeAction}
                  disabled={isShaking}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-500 hover:from-cyan-500 hover:to-blue-400 text-white font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer font-sans shadow-lg shadow-cyan-500/20"
                >
                  {isShaking ? "Đang xử lý..." : "Giả lập lắc máy ➔"}
                </button>
              </div>
            </motion.div>
          )}

          {/* TRANG KẾT QUẢ PHÂN TÍCH HỆ GIÁ TRỊ (TRANG 7) */}
          {currentPage === 7 && result && (
            <motion.div
              key="result-stage"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-8 w-full max-w-2xl flex flex-col items-center justify-center font-sans"
            >
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block font-sans">
                ĐỊNH VỊ NHẬN THỨC BẢN THÂN
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-sans">
                {result.title}
              </h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-sans max-w-lg">
                {result.desc}
              </p>

              <div className="bg-white/5 p-5 rounded-xl border border-white/10 text-left w-full">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block mb-2 font-sans flex items-center gap-1.5">
                  <Quote size={12} /> Phân tích Marxist
                </span>
                <p className="text-sm text-gray-300 italic leading-relaxed font-serif">
                  "{result.marx}"
                </p>
              </div>

              {/* KHU VỰC CÁC NÚT TRUY CẬP WIKIPEDIA VÀ CREDIT AI NẰM Ở CHÍNH GIỮA MÀN HÌNH */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full pt-6">
                
                {/* Nút Wikipedia */}
                <a
                  href="https://vi.wikipedia.org/wiki/Ch%E1%BB%A7_ngh%C4%A9a_duy_v%E1%BA%ADt_l%E1%BB%8Bch_s%E1%BB%AD"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-4 bg-white/5 hover:bg-white/10 text-cyan-400 hover:text-white rounded-xl border border-white/10 transition-all cursor-pointer font-sans font-bold text-xs uppercase tracking-wider"
                >
                  <Compass size={14} />
                  <span>Xem Trích Dẫn Wikipedia</span>
                  <ArrowUpRight size={12} />
                </a>

                {/* Hộp Thông Tin Antigravity AI Hỗ Trợ */}
                <div className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-cyan-950/20 to-black/50 border border-cyan-500/20 rounded-xl font-sans text-center">
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
                  className="px-6 py-3 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 rounded-xl border border-cyan-500/30 text-xs font-extrabold uppercase transition-all font-sans cursor-pointer"
                >
                  Trải nghiệm lại câu chuyện
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* 3. ĐIỀU HƯỚNG TRANG DƯỚI CHÂN TRANG */}
      <div className="w-full flex items-center justify-between text-xs tracking-widest text-gray-600 font-sans font-bold uppercase relative z-10 pt-4 border-t border-white/5">
        {currentPage > 0 ? (
          <button 
            onClick={prevStory}
            className="hover:text-white transition-colors cursor-pointer"
          >
            ← BƯỚC TRƯỚC
          </button>
        ) : <div />}

        <div>
          {currentPage + 1} / {STORY_PAGES.length}
        </div>

        {currentPage < STORY_PAGES.length - 1 ? (
          <button 
            onClick={nextStory}
            className="hover:text-white transition-colors cursor-pointer"
          >
            TIẾP THEO →
          </button>
        ) : (
          <button 
            onClick={handleReset}
            className="text-cyan-400 hover:text-white transition-colors animate-pulse cursor-pointer"
          >
            TRẢI NGHIỆM LẠI ↺
          </button>
        )}
      </div>

    </div>
  );
}
