/**
 * Tiếng Việt — service page overlay.
 *
 * Mirrors lib/services.js. Anything omitted falls through to English.
 *
 * NOT TRANSLATED ON PURPOSE: rebate amounts, warranty terms, finance wording,
 * accreditation names (SAA, CEC, NETCC, Solar Victoria) and program names.
 * Those are regulated claims and proper nouns, and the accreditation names
 * are what a customer actually needs in English to verify them.
 *
 * REQUIRES NAATI-CERTIFIED REVIEW BEFORE LAUNCH.
 */
export default {
  "residential-solar": {
    label: "Điện mặt trời gia đình",
    seoTitle: "Lắp đặt điện mặt trời gia đình tại Melbourne",
    seoDescription:
      "Điện mặt trời chất lượng cho các gia đình ở Victoria. Tấm pin cao cấp, lắp đặt bởi kỹ thuật viên được SAA chứng nhận, trợ cấp lo trọn gói. Xem các mức công suất phù hợp với mái nhà bạn.",
    eyebrow: "Điện mặt trời gia đình",
    h1: "Hệ thống thiết kế theo ngôi nhà của bạn, không theo catalogue.",
    lead: "Phần lớn báo giá bắt đầu từ một hệ thống rồi suy ngược lại. Chúng tôi bắt đầu từ mái nhà, hóa đơn và cách gia đình bạn thực sự dùng điện, rồi thiết kế quanh những điều đó.",
    chips: ["5kW đến 15kW", "Đại lý được Solar Victoria ủy quyền", "Lắp đặt đạt chuẩn SAA"],
    intro: {
      heading: "Một hệ thống dựa trên hóa đơn của bạn",
      body: [
        "Hệ thống quá nhỏ thì bỏ phí phần điện lẽ ra mái nhà có thể tạo ra. Hệ thống quá lớn thì phần dư bán lên lưới chỉ được vài xu mỗi kWh, trong khi chi phí bạn bỏ ra để tạo ra nó cao hơn nhiều. Công suất đúng nằm ở giữa, và nó phụ thuộc vào việc gia đình bạn dùng điện vào lúc nào.",
        "Chúng tôi đọc hóa đơn gần nhất, xem hướng mái, độ dốc và mức che bóng, rồi chọn công suất tương ứng. Bạn nhận được một đề xuất cố định, liệt kê từng khoản: số lượng tấm pin, công suất, mức tiết kiệm dự kiến hằng năm, và mọi khoản trợ cấp đã được trừ trước khi bạn thấy con số phải trả.",
      ],
      points: [
        "Bố trí tấm pin được mô phỏng trên mái nhà thật của bạn, không dùng mẫu chung",
        "Tấm pin Tier-1 từ Jinko Solar, Longi, Risen, Sunman và Boss Solar",
        "Chúng tôi đứng ra xin trợ cấp STCs liên bang và Solar Victoria",
        "Hệ thống giám sát được cài đặt trước khi chúng tôi rời đi, để bạn thấy từng kWh",
      ],
    },
    features: [
      { title: "Chọn công suất trung thực", line: "Nếu hệ thống nhỏ hơn có lợi hơn cho bạn, chúng tôi sẽ nói thẳng. Lắp dư công suất là cách phổ biến nhất khiến các gia đình mất tiền với điện mặt trời." },
      { title: "Giá cố định, liệt kê từng khoản", line: "Một con số, bóc tách từng hạng mục, trợ cấp đã được trừ sẵn. Không có khoảng giá, không chỉnh sửa sau khi đặt cọc." },
      { title: "Lắp đặt đạt chuẩn SAA", line: "Mỗi công trình đều được kỹ thuật viên có chứng nhận SAA nghiệm thu, gọn gàng và thường xong trong một ngày." },
      { title: "Trợ cấp lo trọn gói", line: "Hồ sơ STCs liên bang và Solar Victoria do chúng tôi nộp. Bạn chỉ thấy mức giá đã giảm, không phải thủ tục." },
      { title: "Sẵn sàng cho pin lưu trữ", line: "Nếu bạn tính đến pin trong tương lai, chúng tôi chọn bộ biến tần có thể gắn pin sau này mà không phải thay thiết bị." },
      { title: "Hỗ trợ sau khi vận hành", line: "Giám sát, kiểm tra hiệu suất, và một đội ngũ địa phương vẫn bắt máy sau hai năm." },
    ],
    faqs: [
      { q: "Tôi cần hệ thống bao nhiêu kW?", a: "Điều đó phụ thuộc vào lượng điện bạn dùng mỗi ngày và dùng vào lúc nào, chứ không chỉ diện tích mái. Nói chung, 6.6kW phù hợp với phần lớn gia đình nhỏ; nhà có máy lạnh, hồ bơi hoặc xe điện thường cần từ 10kW trở lên. Chúng tôi tính từ hóa đơn thật của bạn thay vì ước chừng." },
      { q: "Lắp đặt mất bao lâu?", a: "Phần lớn công trình gia đình hoàn tất trong một ngày sau khi hệ thống được thiết kế và phê duyệt. Chúng tôi xác nhận ngày cụ thể trong đề xuất và có mặt đúng hẹn." },
      { q: "Mái nhà tôi có lắp được không?", a: "Hầu hết mái đều phù hợp. Mái hướng bắc cho sản lượng cao nhất, nhưng bố trí chia đông–tây lại hợp với gia đình dùng điện nhiều vào sáng và chiều tối. Che bóng nặng là yếu tố hạn chế chính, và nếu mái của bạn không phù hợp, chúng tôi sẽ nói thật." },
      { q: "Tôi có cần lắp pin ngay không?", a: "Không. Rất nhiều gia đình lắp tấm pin trước rồi bổ sung pin lưu trữ sau. Chúng tôi sẽ chọn bộ biến tần sẵn sàng cho pin, để lần nâng cấp đó không phải thay thiết bị bạn vừa mua." },
    ],
  },

  "solar-batteries": {
    label: "Pin lưu trữ",
    eyebrow: "Pin lưu trữ",
    chips: ["Sungrow, Alpha ESS, LG", "Dung lượng theo buổi tối của bạn", "Tùy chọn mạch dự phòng"],
    intro: {
      heading: "Pin dùng để chuyển điện ban ngày sang buổi tối",
      body: [
        "Pin không đưa bạn ra khỏi lưới điện. Việc của nó là giữ lại phần điện mặt trời dư ban ngày để bạn dùng vào buổi tối, thay vì bán đi với giá rất thấp rồi mua lại với giá cao hơn khi trời tối.",
        "Dung lượng phù hợp phụ thuộc vào lượng điện bạn dùng từ lúc mặt trời lặn đến khi đi ngủ, và những mạch nào bạn muốn vẫn chạy khi mất điện. Chúng tôi mô phỏng trên mức tiêu thụ thực tế rồi đưa con số cho bạn xem.",
      ],
      points: [
        "Dung lượng tính theo mức dùng buổi tối, không theo kích cỡ lớn nhất có thể lắp",
        "Mạch dự phòng được chọn cùng bạn ngay từ khâu thiết kế",
        "Khoản giảm giá pin liên bang do chúng tôi đứng ra xin",
        "Giám sát được cài đặt và hướng dẫn trước khi chúng tôi rời đi",
      ],
    },
    features: [
      { title: "Dung lượng theo buổi tối", line: "Từ 1/5/2026 khoản giảm giá giảm dần trên 14kWh, nên pin càng lớn không còn đồng nghĩa với càng lợi." },
      { title: "Bạn chọn mạch dự phòng", line: "Những mạch nào vẫn có điện khi mất điện được quyết định ở khâu thiết kế, không phải vào đúng ngày xảy ra sự cố." },
      { title: "Giám sát ngay từ ngày đầu", line: "Được cài đặt và hướng dẫn trước khi bàn giao, để bạn thấy việc sạc, xả và lấy điện từ lưới theo thời gian thực." },
    ],
  },

  "solar-packages": {
    label: "Gói điện mặt trời",
    eyebrow: "Trọn gói",
    intro: {
      heading: "Tấm pin, bộ biến tần và pin lưu trữ, lắp một lần",
      body: [
        "Lắp điện mặt trời và pin cùng lúc rẻ hơn chia làm hai đợt: một lần thiết kế, một lần xin đấu nối, một lần thi công.",
        "Mỗi gói đều đã trừ sẵn những khoản trợ cấp bạn đủ điều kiện, nên con số bạn thấy chính là con số bạn trả.",
      ],
    },
  },

  "commercial-solar": {
    label: "Điện mặt trời doanh nghiệp",
    eyebrow: "Điện mặt trời doanh nghiệp",
    h1: "Cắt giảm chi phí điện ban ngày của doanh nghiệp.",
    lead: "Điện mặt trời và pin lưu trữ cho kho bãi, văn phòng, trang trại, phòng khám và cửa hàng bán lẻ, từ 30kW đến 1MW, tại Victoria và New South Wales.",
  },

  "ev-chargers": {
    label: "Trạm sạc xe điện",
    eyebrow: "Trạm sạc xe điện",
    h1: "Sạc xe bằng chính nắng của bạn.",
    lead: "Là phần bổ sung cho hệ điện mặt trời và pin lưu trữ, không phải một hạng mục riêng. Sạc ban ngày và chiếc xe chạy bằng điện bạn tự tạo ra.",
  },

  "heat-pump-hot-water": {
    label: "Bình nước nóng heat pump",
    eyebrow: "Bình nước nóng heat pump",
    h1: "Nước nóng rẻ nhất bạn có thể dùng.",
    lead: "Heat pump di chuyển nhiệt chứ không tạo ra nhiệt, nên chi phí vận hành chỉ bằng một phần nhỏ. Hẹn giờ chạy giữa trưa và nó dùng chính điện mặt trời của bạn.",
  },

  "battery-for-existing-solar": {
    label: "Lắp pin cho hệ có sẵn",
    eyebrow: "Lắp thêm pin lưu trữ",
    h1: "Tấm pin bạn đã có. Đây là nửa còn lại.",
    lead: "Lắp thêm pin lưu trữ vào hệ thống có sẵn là công việc khác với lắp cả hai cùng lúc, và nó bắt đầu từ thiết bị đang có trên tường nhà bạn.",
    chips: ["Mọi hãng biến tần", "Đã áp dụng giảm giá liên bang", "Dung lượng theo buổi tối"],
    intro: {
      heading: "Những gì phải kiểm tra trước",
      body: [
        "Bộ biến tần hiện tại quyết định hình hài của công việc. Có loại gắn pin trực tiếp được. Có loại cần thêm một thiết bị ghép AC đặt bên cạnh. Có loại đã cũ đến mức thay mới lại rẻ hơn. Không thể đoán những điều đó từ bên ngoài, nên biểu mẫu báo giá có hỏi hãng và model bộ biến tần của bạn.",
        "Khoản giảm giá pin liên bang yêu cầu phải có điện mặt trời đủ điều kiện, mà bạn thì đã có, nên lắp thêm thường là cách gọn nhất để đáp ứng. Chúng tôi chọn dung lượng theo lượng điện bạn thực sự dùng sau khi trời tối, không theo thiết bị lớn nhất vừa với bức tường.",
      ],
    },
  },

  "inverter-repair": {
    label: "Sửa chữa biến tần",
    eyebrow: "Sửa chữa biến tần",
    h1: "Bộ phận hỏng đầu tiên, được xử lý đúng cách.",
    lead: "Bộ biến tần là thiết bị làm việc nặng nhất trong hệ thống và cũng dễ ngừng hoạt động nhất. Nhiều trường hợp sửa được; đôi khi thay mới lại hợp lý hơn. Chúng tôi cho bạn biết trường hợp của mình là gì.",
    chips: ["Mọi thương hiệu", "Sửa hoặc thay", "Báo cáo bằng văn bản"],
    intro: {
      heading: "Sửa, thay, hay cứ để yên",
      body: [
        "Tấm pin thường sống lâu hơn bộ biến tần gắn kèm. Khi biến tần bắt đầu báo lỗi, câu hỏi trung thực là: sửa thì dùng thêm được vài năm hay vài tháng? Điều đó phụ thuộc vào loại lỗi, tuổi thiết bị, và linh kiện cho model đó còn hay không.",
        "Chúng tôi kiểm tra tấm pin, cầu dao cách ly, dây dẫn, biến tần và pin lưu trữ, rồi nói thẳng bạn thuộc trường hợp nào. Nếu đúng là nên thay, đây cũng là lúc cân nhắc chuyển sang loại hỗ trợ pin, vì làm hai lần tốn hơn làm một lần.",
      ],
    },
  },

  "service-health-check": {
    label: "Kiểm tra & bảo dưỡng",
    eyebrow: "Kiểm tra & bảo dưỡng",
    h1: "Biết hệ thống của bạn đang thực sự làm gì.",
    lead: "Phần lớn sự cố điện mặt trời diễn ra âm thầm. Sản lượng tụt dần, một chuỗi pin ngừng chạy, một cầu dao nhảy mà không ai hay. Kiểm tra định kỳ là cách phát hiện trước khi hóa đơn phát hiện giúp bạn.",
    chips: ["Mọi hệ thống", "Báo cáo bằng văn bản", "Của chúng tôi hay của đơn vị khác"],
    intro: {
      heading: "Những gì được kiểm tra",
      body: [
        "Hệ điện mặt trời không có đèn báo lỗi. Cầu dao cách ly hỏng, một chuỗi pin bị ngắt hay tấm pin suy giảm đều không tự báo; chúng chỉ lặng lẽ tạo ra ít điện hơn, và phần lớn gia đình chỉ nhận ra khi hóa đơn một quý nào đó cao bất thường.",
        "Chúng tôi kiểm tra tấm pin, cầu dao cách ly, dây dẫn, biến tần và pin lưu trữ, xác nhận hệ giám sát thực sự đang gửi dữ liệu, rồi gửi bạn báo cáo bằng văn bản. Hạng mục cần xử lý sẽ được báo giá riêng, nên buổi kiểm tra là chẩn đoán chứ không phải một chuyến chào hàng.",
      ],
    },
  },

  "heating-and-cooling": {
    label: "Sưởi ấm & làm mát",
    eyebrow: "Sưởi ấm & làm mát",
    h1: "Cách sưởi rẻ nhất bạn có thể chạy bằng điện nhà mình.",
    lead: "Máy lạnh hai chiều di chuyển nhiệt thay vì tạo ra nhiệt, nên chi phí chỉ bằng một phần nhỏ so với sưởi điện trở. Chạy ban ngày thì còn rẻ hơn nữa.",
    chips: ["Thợ có chứng chỉ ARCtick", "Chạy bằng điện mặt trời của bạn", "Sưởi ấm và làm mát"],
    intro: {
      heading: "Vì sao nó hợp với điện mặt trời",
      body: [
        "Máy lạnh hai chiều thực chất là một heat pump. Mùa đông nó đưa nhiệt từ không khí bên ngoài vào nhà; mùa hè thì làm ngược lại. Vì di chuyển nhiệt chứ không tạo ra nhiệt, mỗi đơn vị điện tiêu thụ cho ra nhiều đơn vị nhiệt.",
        "Chính phần điện đó mới là điều đáng nói. Sưởi và làm mát thường là phụ tải theo mùa lớn nhất trong nhà, và nó chạy mạnh nhất vào giữa trưa mùa hè, đúng lúc tấm pin của bạn phát nhiều nhất. Ghép hai thứ lại chính là khác biệt giữa một hệ thống hoàn vốn và một hệ thống chỉ bán điện giá rẻ.",
      ],
    },
  },

  "pool-heating": {
    label: "Sưởi hồ bơi",
    eyebrow: "Sưởi hồ bơi",
  },

  "tesla-powerwall": {
    label: "Tesla Powerwall",
    eyebrow: "Tesla Powerwall",
  },
};
