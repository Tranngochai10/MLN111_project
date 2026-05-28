import { motion } from 'framer-motion';

const theoryData = {
  tonTaiXaHoi: {
    title: 'Tồn tại xã hội',
    subtitle: 'Phương diện sinh hoạt vật chất và các điều kiện sinh hoạt vật chất của xã hội.',
    items: [
      { label: 'Điều kiện sống', desc: 'Môi trường tự nhiên xung quanh và cách con người duy trì cuộc sống sinh học hàng ngày.' },
      { label: 'Hoàn cảnh kinh tế', desc: 'Phương thức sản xuất vật chất, bao gồm lực lượng sản xuất và quan hệ sản xuất.' },
      { label: 'Môi trường sống', desc: 'Không gian sống vật lý, mật độ dân số, và các hạ tầng cơ sở thiết yếu.' },
      { label: 'Giai cấp xã hội', desc: 'Vị thế của cá nhân trong hệ thống phân công lao động xã hội và phân phối tài sản.' },
      { label: 'Thời đại lịch sử', desc: 'Bối cảnh lịch sử cụ thể, trình độ phát triển của công nghệ và lực lượng sản xuất.' },
    ],
    accent: 'border-red-500/30 hover:border-red-500/80 shadow-red-950/20 glow-red',
    iconColor: 'text-red-500',
    titleColor: 'from-white to-red-400',
    buttonColor: 'bg-red-500/10 text-red-400 border-red-500/30'
  },
  yThucXaHoi: {
    title: 'Ý thức xã hội',
    subtitle: 'Phương diện sinh hoạt tinh thần của xã hội, nảy sinh từ tồn tại xã hội và phản ánh tồn tại xã hội.',
    items: [
      { label: 'Suy nghĩ', desc: 'Những nhận thức, trăn trở cá nhân phát sinh từ thực tế đời sống hàng ngày.' },
      { label: 'Đạo đức', desc: 'Hệ thống các chuẩn mực ứng xử, quan niệm về đúng/sai trong cộng đồng.' },
      { label: 'Quan điểm', desc: 'Thái độ chính trị, pháp quyền, thẩm mỹ trước các vấn đề thực tiễn.' },
      { label: 'Lối sống', desc: 'Thói quen sinh hoạt, cách thức tương tác giữa các cá nhân trong đời sống.' },
      { label: 'Tư tưởng', desc: 'Hệ tư tưởng học thuật, triết học, tôn giáo mang tính hệ thống của thời đại.' },
    ],
    accent: 'border-cyan-500/30 hover:border-cyan-500/80 shadow-cyan-950/20 glow-blue',
    iconColor: 'text-cyan-400',
    titleColor: 'from-white to-cyan-400',
    buttonColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
  }
};

export default function TheorySection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  };

  const listVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <section id="theory" className="relative min-h-screen py-24 bg-bg-secondary overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-red-500/5 blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-cyan-500/5 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-sm font-semibold tracking-widest text-red-500 uppercase mb-3"
          >
            Nền Tảng Lý Thuyết Marxist
          </motion.h2>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white"
          >
            Tồn Tại Quyết Định Ý Thức
          </motion.h1>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-24 h-1 bg-gradient-to-r from-red-500 to-cyan-500 mx-auto rounded-full"
          />
        </div>

        {/* Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-8 lg:gap-12"
        >
          {/* Card A: Ton Tai Xa Hoi */}
          <motion.div 
            variants={cardVariants}
            className={`glass-card p-8 sm:p-10 rounded-2xl border transition-all duration-500 shadow-xl ${theoryData.tonTaiXaHoi.accent}`}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className={`text-4xl ${theoryData.tonTaiXaHoi.iconColor}`}>🛠️</span>
              <div>
                <h3 className={`font-display text-2xl font-bold bg-gradient-to-r ${theoryData.tonTaiXaHoi.titleColor} bg-clip-text text-transparent`}>
                  {theoryData.tonTaiXaHoi.title}
                </h3>
                <span className="text-xs text-red-400 uppercase tracking-widest font-semibold">Khách quan / Vật chất</span>
              </div>
            </div>

            <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-8">
              {theoryData.tonTaiXaHoi.subtitle}
            </p>

            <motion.div variants={listVariants} className="space-y-4">
              {theoryData.tonTaiXaHoi.items.map((item, idx) => (
                <motion.div 
                  key={idx} 
                  variants={itemVariants}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0 group-hover:scale-150 transition-transform" />
                  <div>
                    <h4 className="font-semibold text-text-primary text-sm sm:text-base">{item.label}</h4>
                    <p className="text-xs sm:text-sm text-text-secondary mt-1">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Card B: Y Thuc Xa Hoi */}
          <motion.div 
            variants={cardVariants}
            className={`glass-card p-8 sm:p-10 rounded-2xl border transition-all duration-500 shadow-xl ${theoryData.yThucXaHoi.accent}`}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className={`text-4xl ${theoryData.yThucXaHoi.iconColor}`}>🧠</span>
              <div>
                <h3 className={`font-display text-2xl font-bold bg-gradient-to-r ${theoryData.yThucXaHoi.titleColor} bg-clip-text text-transparent`}>
                  {theoryData.yThucXaHoi.title}
                </h3>
                <span className="text-xs text-cyan-400 uppercase tracking-widest font-semibold">Chủ quan / Tinh thần</span>
              </div>
            </div>

            <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-8">
              {theoryData.yThucXaHoi.subtitle}
            </p>

            <motion.div variants={listVariants} className="space-y-4">
              {theoryData.yThucXaHoi.items.map((item, idx) => (
                <motion.div 
                  key={idx} 
                  variants={itemVariants}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0 group-hover:scale-150 transition-transform" />
                  <div>
                    <h4 className="font-semibold text-text-primary text-sm sm:text-base">{item.label}</h4>
                    <p className="text-xs sm:text-sm text-text-secondary mt-1">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Dynamic connection arrow/visual */}
        <div className="mt-12 text-center hidden md:block">
          <span className="text-xs text-gray-500 uppercase tracking-wider">Mối quan hệ biện chứng</span>
          <div className="flex items-center justify-center gap-4 mt-2">
            <span className="text-red-400 text-sm">Tồn tại xã hội</span>
            <div className="h-[2px] w-24 bg-gradient-to-r from-red-500 to-cyan-500 relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-cyan-400 rotate-45" />
            </div>
            <span className="text-cyan-400 text-sm">Ý thức xã hội</span>
          </div>
        </div>
      </div>
    </section>
  );
}
