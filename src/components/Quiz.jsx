import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { quizQuestions, quizResults } from '../data/quiz';

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const handleSelectOption = (value) => {
    const nextAnswers = [...answers, value];
    setAnswers(nextAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate result profile
      const counts = nextAnswers.reduce((acc, val) => {
        acc[val] = (acc[val] || 0) + 1;
        return acc;
      }, {});

      // Find the most chosen profile
      let maxVal = '';
      let maxCount = 0;
      Object.entries(counts).forEach(([val, count]) => {
        if (count > maxCount) {
          maxCount = count;
          maxVal = val;
        }
      });

      setResult(quizResults[maxVal || 'survival']);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
  };

  const progressPercentage = ((currentQuestion + (result ? 1 : 0)) / quizQuestions.length) * 100;

  return (
    <section id="quiz" className="relative min-h-screen py-24 bg-bg-secondary overflow-hidden flex items-center">
      {/* Background visual elements */}
      <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-red-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10 w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-sm font-semibold tracking-widest text-red-500 uppercase mb-3">
            Trải Nghiệm Tương Tác
          </h2>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-4 text-white">
            Môi Trường Sống Ảnh Hưởng Bạn Thế Nào?
          </h1>
          <p className="text-sm text-text-secondary">
            Khám phá xem hoàn cảnh sống thực tiễn hiện tại đang âm thầm định hình nhận thức, tư tưởng và lối sống của bạn ra sao.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/10 h-1.5 rounded-full mb-8 overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-red-500 to-purple-600 rounded-full"
            style={{ width: `${progressPercentage}%` }}
            layout
            transition={{ duration: 0.3 }}
          />
        </div>

        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="glass-card p-6 sm:p-10 rounded-2xl border border-white/10"
            >
              <span className="text-xs font-bold text-red-400 uppercase tracking-widest block mb-2">
                Câu hỏi {currentQuestion + 1} / {quizQuestions.length}
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-6 font-display">
                {quizQuestions[currentQuestion].question}
              </h2>

              <div className="space-y-4">
                {quizQuestions[currentQuestion].options.map((opt, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.01, x: 6, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleSelectOption(opt.value)}
                    className="w-full text-left p-4 rounded-xl border border-white/5 bg-white/5 hover:border-white/20 transition-all text-sm sm:text-base text-gray-300 font-medium flex items-center justify-between"
                  >
                    <span>{opt.text}</span>
                    <span className="text-gray-600 text-xs">➔</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="glass-card p-6 sm:p-10 rounded-2xl border border-white/10 text-center relative overflow-hidden"
            >
              {/* Glow accent */}
              <div 
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{ backgroundColor: result.color }}
              />

              <span className="text-5xl mb-4 block animate-bounce">{result.emoji}</span>
              <span className="text-xs font-bold uppercase tracking-widest block mb-1" style={{ color: result.color }}>
                Nhóm nhận thức nổi trội
              </span>
              <h2 className="text-3xl font-bold text-white mb-4 font-display">
                {result.title}
              </h2>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                {result.description}
              </p>

              {/* Analysis callout */}
              <div className="bg-black/30 p-5 rounded-xl border border-white/5 text-left mb-6">
                <span className="text-xs font-bold text-red-400 uppercase tracking-widest block mb-2">
                  Phân tích triết học Marxist
                </span>
                <p className="text-sm text-gray-300 italic leading-relaxed">
                  "{result.marxAnalysis}"
                </p>
              </div>

              {/* Suggestion */}
              <p className="text-xs text-gray-400 mb-8 leading-relaxed">
                💡 <span className="font-semibold text-gray-300">Gợi ý phát triển:</span> {result.suggestion}
              </p>

              {/* Reset action */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReset}
                className="px-6 py-2.5 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-full border border-white/10 text-sm transition-colors"
              >
                Làm lại Quiz
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
