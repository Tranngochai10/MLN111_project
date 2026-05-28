// Quiz questions and result profiles
export const quizQuestions = [
  {
    id: 1,
    question: "Khi gặp khó khăn tài chính, phản ứng đầu tiên của bạn là gì?",
    options: [
      { text: "Cắt giảm chi tiêu ngay lập tức, tiết kiệm từng đồng", value: "survival" },
      { text: "Tìm cách kiếm thêm thu nhập, nghĩ đến cơ hội mới", value: "growth" },
      { text: "Nhờ gia đình hoặc bạn bè hỗ trợ tạm thời", value: "community" },
      { text: "Không quá lo, tin rằng mọi thứ sẽ ổn thôi", value: "privilege" }
    ]
  },
  {
    id: 2,
    question: "Bạn định nghĩa thành công như thế nào?",
    options: [
      { text: "Có việc làm ổn định, không lo về tương lai", value: "survival" },
      { text: "Đạt được mục tiêu cá nhân và sự công nhận xã hội", value: "growth" },
      { text: "Gia đình hạnh phúc và mối quan hệ tốt đẹp", value: "community" },
      { text: "Tự do làm những gì mình muốn, không bị ràng buộc", value: "privilege" }
    ]
  },
  {
    id: 3,
    question: "Điều gì khiến bạn lo lắng nhất trong cuộc sống hiện tại?",
    options: [
      { text: "Chi phí sinh hoạt và khả năng kiếm tiền", value: "survival" },
      { text: "Không phát triển đủ nhanh so với người khác", value: "growth" },
      { text: "Các mối quan hệ xung quanh bị tổn thương", value: "community" },
      { text: "Mất đi cơ hội hoặc trải nghiệm thú vị", value: "privilege" }
    ]
  },
  {
    id: 4,
    question: "Khi nhìn thấy người thành công trên mạng xã hội, bạn cảm thấy gì?",
    options: [
      { text: "Tự ti và cảm thấy mình đang tụt hậu", value: "survival" },
      { text: "Có cảm hứng và muốn học hỏi từ họ", value: "growth" },
      { text: "Tò mò về cuộc sống thực sự của họ", value: "community" },
      { text: "Cũng bình thường thôi, mình có con đường riêng", value: "privilege" }
    ]
  },
  {
    id: 5,
    question: "Môi trường nào ảnh hưởng đến bạn nhiều nhất?",
    options: [
      { text: "Hoàn cảnh gia đình và điều kiện kinh tế lúc nhỏ", value: "survival" },
      { text: "Cộng đồng và môi trường làm việc hiện tại", value: "growth" },
      { text: "Những người thầy, mentor và bạn bè thân thiết", value: "community" },
      { text: "Nội dung mạng xã hội và xu hướng văn hóa", value: "privilege" }
    ]
  }
];

export const quizResults = {
  survival: {
    title: "Ý Thức Sinh Tồn",
    emoji: "🛡️",
    color: "#ef4444",
    description: "Bạn chịu ảnh hưởng sâu sắc bởi áp lực kinh tế và điều kiện sống. Ý thức của bạn được định hình bởi nhu cầu sinh tồn và sự an toàn. Đây là phản ứng hoàn toàn tự nhiên của con người trong hoàn cảnh khó khăn.",
    marxAnalysis: "Marx sẽ nói rằng: tồn tại xã hội của bạn — với những áp lực kinh tế hiện hữu — đang quyết định cách bạn nhìn thế giới, ưu tiên sự an toàn hơn tự do sáng tạo.",
    suggestion: "Nhận thức được điều này là bước đầu tiên để thoát khỏi vòng lặp. Thay đổi điều kiện sống sẽ dần thay đổi tư duy của bạn."
  },
  growth: {
    title: "Ý Thức Phát Triển",
    emoji: "🚀",
    color: "#8b5cf6",
    description: "Bạn bị thúc đẩy bởi sự phát triển cá nhân và cạnh tranh. Môi trường xung quanh bạn có nhiều cơ hội, điều này đã hình thành một tư duy tập trung vào thành tích và tiến bộ.",
    marxAnalysis: "Marx sẽ chỉ ra rằng: bạn đang sống trong môi trường xã hội đề cao chủ nghĩa cá nhân và cạnh tranh, điều này đã 'cài đặt' vào ý thức bạn niềm tin rằng nỗ lực cá nhân là yếu tố quyết định.",
    suggestion: "Hãy đặt câu hỏi: liệu cơ hội bạn có được có đến từ nỗ lực riêng hay từ điều kiện xã hội thuận lợi hơn người khác?"
  },
  community: {
    title: "Ý Thức Cộng Đồng",
    emoji: "🤝",
    color: "#22c55e",
    description: "Bạn được định hình mạnh mẽ bởi các mối quan hệ và cộng đồng. Tồn tại xã hội của bạn gắn liền với con người xung quanh, dẫn đến ý thức đặt nặng tình người và sự kết nối.",
    marxAnalysis: "Marx sẽ đồng ý: quan hệ sản xuất và quan hệ xã hội của bạn đã định hình một ý thức tập thể — đây là nền tảng của tư tưởng cộng đồng mà ông đề cao.",
    suggestion: "Sức mạnh của bạn nằm ở khả năng kết nối. Hãy dùng nó để tạo ra thay đổi xã hội, không chỉ cho cá nhân mình."
  },
  privilege: {
    title: "Ý Thức Đặc Quyền",
    emoji: "✨",
    color: "#06b6d4",
    description: "Bạn có xu hướng tiếp cận cuộc sống từ vị thế tự do và ít lo lắng. Điều kiện sống tốt hơn mức trung bình đã tạo ra một tư duy thoải mái, ít bị áp lực sinh tồn.",
    marxAnalysis: "Marx sẽ phân tích: điều kiện vật chất thuận lợi của bạn đã tạo ra một ý thức ít nhạy cảm với bất bình đẳng. Đây không phải lỗi của bạn — mà là hệ quả tự nhiên của tồn tại xã hội.",
    suggestion: "Sự tự do này là tài sản quý — hãy dùng nó để hiểu những người không có cùng điều kiện và đóng góp cho sự thay đổi công bằng hơn."
  }
};
