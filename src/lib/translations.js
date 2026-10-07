/**
 * Interface translations: English, Simplified Chinese, Vietnamese, Arabic.
 *
 * ============================================================================
 * SCOPE, STATED HONESTLY
 * ============================================================================
 * This file covers the GLOBAL INTERFACE and the HOME PAGE: navigation,
 * buttons, the hero, the energy-flow explainer, section headings and the
 * footer. That is what a visitor meets first and what makes the switcher a
 * real feature rather than a decoration.
 *
 * Deep page copy — the forty-odd service, rebate, location and calculator
 * pages — is NOT translated here. Those fall back to English automatically
 * via `t()`, so nothing breaks and nothing renders blank. Translating them
 * is a copy job, not an engineering one, and it needs the translator Tony's
 * brief already calls for.
 *
 * ============================================================================
 * BEFORE LAUNCH: NAATI REVIEW
 * ============================================================================
 * The client brief requires a native speaker or NAATI-certified translator to
 * review all translated text before it goes live, and it is right to. These
 * translations are careful and idiomatic, but two categories carry real risk
 * if a nuance is wrong:
 *
 *   - anything describing finance, credit, fees or eligibility
 *   - anything describing a rebate, a warranty or an accreditation
 *
 * Both are regulated claims. A mistranslation there is not a typo, it is a
 * misleading representation in another language. Everything in this file is
 * plain interface copy for exactly that reason: the regulated wording has
 * deliberately been left in English until a certified translator signs it off.
 *
 * Entries are `{ en, zh, vi, ar }`. `t()` in lib/i18n.jsx falls back to `en`
 * for any key a language has not been given yet, so a partial translation is
 * always safe to ship.
 */

export const T = {
  /* ---------------- global chrome ---------------- */
  nav_services: { en: "Services", zh: "服务", vi: "Dịch vụ", ar: "الخدمات" },
  nav_commercial: { en: "Commercial", zh: "商业项目", vi: "Doanh nghiệp", ar: "الأعمال" },
  nav_rebates: { en: "Rebates", zh: "补贴", vi: "Trợ cấp", ar: "الحوافز" },
  nav_tools: { en: "Tools", zh: "工具", vi: "Công cụ", ar: "الأدوات" },
  nav_company: { en: "Company", zh: "关于我们", vi: "Công ty", ar: "الشركة" },

  cta_quote: { en: "Get a Free Quote", zh: "获取免费报价", vi: "Nhận báo giá miễn phí", ar: "احصل على عرض سعر مجاني" },
  cta_quote_short: { en: "Get a free quote", zh: "获取免费报价", vi: "Nhận báo giá miễn phí", ar: "احصل على عرض سعر مجاني" },
  cta_call: { en: "Call us", zh: "致电我们", vi: "Gọi cho chúng tôi", ar: "اتصل بنا" },

  menu_open: { en: "Open menu", zh: "打开菜单", vi: "Mở menu", ar: "فتح القائمة" },
  menu_close: { en: "Close menu", zh: "关闭菜单", vi: "Đóng menu", ar: "إغلاق القائمة" },

  /* ---------------- hero ---------------- */
  hero_eyebrow: {
    en: "Together, we build a brighter future",
    zh: "携手共创更光明的未来",
    vi: "Cùng nhau, chúng ta kiến tạo một tương lai tươi sáng hơn",
    ar: "معًا نبني مستقبلًا أكثر إشراقًا",
  },
  hero_h1_a: { en: "Solar and battery", zh: "太阳能与电池安装，", vi: "Lắp đặt điện mặt trời và pin lưu trữ", ar: "تركيب الطاقة الشمسية والبطاريات" },
  hero_h1_b: { en: "installers for lower", zh: "为维州和新州家庭", vi: "giúp giảm hóa đơn điện tại", ar: "لفواتير أقل في" },
  hero_h1_c: { en: "bills in VIC & NSW.", zh: "降低电费。", vi: "Victoria và NSW.", ar: "فيكتوريا ونيو ساوث ويلز." },
  hero_lead: {
    en: "SAA-accredited installation of solar, batteries and EV charging for homes and businesses across Victoria and New South Wales. Rebates handled, manufacturer warranties registered in your name.",
    zh: "由 SAA 认证技师为维多利亚州和新南威尔士州的家庭与企业安装太阳能、电池及电动车充电设备。补贴由我们代办，厂商保修以您的名义登记。",
    vi: "Lắp đặt điện mặt trời, pin lưu trữ và trạm sạc xe điện bởi kỹ thuật viên được SAA chứng nhận, phục vụ gia đình và doanh nghiệp tại Victoria và New South Wales. Chúng tôi lo thủ tục trợ cấp và đăng ký bảo hành nhà sản xuất dưới tên bạn.",
    ar: "تركيب أنظمة الطاقة الشمسية والبطاريات وشواحن السيارات الكهربائية على يد فنيين معتمدين من SAA، للمنازل والشركات في فيكتوريا ونيو ساوث ويلز. نتولى إجراءات الحوافز ونسجّل ضمانات الشركات المصنّعة باسمك.",
  },
  hero_start: { en: "Start with what you need", zh: "从您的需求开始", vi: "Bắt đầu với điều bạn cần", ar: "ابدأ بما تحتاجه" },
  hero_solar: { en: "Solar", zh: "太阳能", vi: "Điện mặt trời", ar: "طاقة شمسية" },
  hero_battery: { en: "Battery", zh: "电池", vi: "Pin lưu trữ", ar: "بطارية" },
  hero_both: { en: "Solar + battery", zh: "太阳能 + 电池", vi: "Điện mặt trời + pin", ar: "طاقة شمسية + بطارية" },
  hero_prefer_talk: { en: "Prefer to talk?", zh: "想直接咨询？", vi: "Muốn trao đổi trực tiếp?", ar: "تفضّل التحدث؟" },

  /* ---------------- energy flow explainer ---------------- */
  ef_eyebrow: { en: "How it works", zh: "运作原理", vi: "Cách hoạt động", ar: "كيف يعمل" },
  ef_heading: {
    en: "Where your power comes from, hour by hour.",
    zh: "您的电力，每小时从何而来。",
    vi: "Điện của bạn đến từ đâu, theo từng giờ.",
    ar: "من أين تأتي الكهرباء لديك، ساعة بساعة.",
  },
  ef_lead: {
    en: "The same house in three situations. Watch which lines light up, and the colour tells you where that energy came from.",
    zh: "同一座房子，三种情形。看哪些线路亮起，颜色会告诉您电力的来源。",
    vi: "Cùng một ngôi nhà trong ba tình huống. Hãy xem đường nào sáng lên, và màu sắc cho biết nguồn điện đến từ đâu.",
    ar: "المنزل نفسه في ثلاث حالات. لاحظ أي الخطوط تضيء، واللون يخبرك من أين جاءت تلك الطاقة.",
  },
  ef_day: { en: "Day", zh: "白天", vi: "Ban ngày", ar: "النهار" },
  ef_night: { en: "Night", zh: "夜晚", vi: "Ban đêm", ar: "الليل" },
  ef_blackout: { en: "Blackout", zh: "停电", vi: "Mất điện", ar: "انقطاع الكهرباء" },
  ef_replay: { en: "Replay", zh: "重播", vi: "Phát lại", ar: "إعادة التشغيل" },

  ef_day_head: { en: "The sun is doing the work", zh: "太阳在为您工作", vi: "Mặt trời đang làm việc", ar: "الشمس تقوم بالعمل" },
  ef_day_body: {
    en: "Panels generate, the inverter converts, and your home runs on it. Whatever the house does not use charges the battery, and anything still spare is exported to the grid.",
    zh: "光伏板发电，逆变器转换，家中用电即来源于此。家里用不完的电先为电池充电，仍有富余则上网外送。",
    vi: "Tấm pin tạo điện, bộ biến tần chuyển đổi, và ngôi nhà của bạn vận hành bằng nguồn điện đó. Phần dư sẽ sạc vào pin, phần còn thừa được bán lên lưới.",
    ar: "الألواح تولّد الطاقة، والعاكس يحوّلها، ومنزلك يعمل بها. وما لا يستهلكه المنزل يشحن البطارية، وما يتبقى يُصدَّر إلى الشبكة.",
  },
  ef_night_head: { en: "The battery takes over", zh: "电池接手供电", vi: "Pin lưu trữ tiếp quản", ar: "البطارية تتولى المهمة" },
  ef_night_body: {
    en: "The panels are asleep. Your home runs on what the battery stored earlier in the day, and only draws from the grid once the battery is low.",
    zh: "光伏板停止工作。家中用电来自电池白天储存的电量，只有在电池电量不足时才从电网取电。",
    vi: "Tấm pin ngừng hoạt động. Ngôi nhà dùng điện đã được pin tích trữ ban ngày, và chỉ lấy từ lưới khi pin gần cạn.",
    ar: "الألواح نائمة. يعمل منزلك بما خزّنته البطارية في وقت سابق من اليوم، ولا يسحب من الشبكة إلا عندما تنخفض شحنة البطارية.",
  },
  ef_blackout_head: { en: "The grid is off, you are not", zh: "电网断了，您的家没有", vi: "Lưới điện mất, nhà bạn thì không", ar: "الشبكة مفصولة، أما أنت فلا" },
  ef_blackout_body: {
    en: "The grid line is isolated automatically, which keeps the street safe for crews. Your backup circuits keep running on the battery. Everything else stays off until power returns.",
    zh: "电网线路会自动隔离，以保障抢修人员在街道上的安全。您的备用回路继续由电池供电，其余电路则保持关闭，直至恢复供电。",
    vi: "Đường dây lưới được tự động cô lập để bảo đảm an toàn cho đội sửa chữa ngoài đường. Các mạch dự phòng của bạn vẫn chạy bằng pin. Phần còn lại sẽ tắt cho đến khi có điện trở lại.",
    ar: "يُعزل خط الشبكة تلقائيًا، وهو ما يحافظ على سلامة فرق الصيانة في الشارع. وتستمر دوائرك الاحتياطية بالعمل من البطارية، بينما يبقى كل ما عداها متوقفًا حتى تعود الكهرباء.",
  },

  ef_solar_panels: { en: "Solar panels", zh: "光伏板", vi: "Tấm pin mặt trời", ar: "الألواح الشمسية" },
  ef_inverter: { en: "Inverter", zh: "逆变器", vi: "Bộ biến tần", ar: "العاكس" },
  ef_battery: { en: "Battery", zh: "电池", vi: "Pin lưu trữ", ar: "البطارية" },
  ef_switchboard: { en: "Switchboard", zh: "配电箱", vi: "Tủ điện", ar: "لوحة التوزيع" },
  ef_home: { en: "Your home", zh: "您的家", vi: "Ngôi nhà của bạn", ar: "منزلك" },
  ef_grid: { en: "Grid", zh: "电网", vi: "Lưới điện", ar: "الشبكة" },

  ef_generating: { en: "Generating", zh: "发电中", vi: "Đang phát điện", ar: "يولّد الطاقة" },
  ef_asleep: { en: "Asleep", zh: "休眠", vi: "Đang nghỉ", ar: "متوقف" },
  ef_charging: { en: "Charging", zh: "充电中", vi: "Đang sạc", ar: "يشحن" },
  ef_supplying: { en: "Supplying", zh: "供电中", vi: "Đang cấp điện", ar: "يزوّد بالطاقة" },
  ef_exporting: { en: "Exporting", zh: "上网外送", vi: "Bán lên lưới", ar: "يُصدّر" },
  ef_importing: { en: "Importing", zh: "从电网取电", vi: "Lấy từ lưới", ar: "يستورد" },
  ef_isolated: { en: "Isolated", zh: "已隔离", vi: "Đã cô lập", ar: "معزول" },
  ef_backup_on: { en: "Backup circuits on", zh: "备用回路已启用", vi: "Mạch dự phòng đang bật", ar: "الدوائر الاحتياطية تعمل" },
  ef_other_off: { en: "Other circuits off", zh: "其他回路已关闭", vi: "Các mạch khác đã tắt", ar: "الدوائر الأخرى متوقفة" },

  ef_legend_title: {
    en: "Line colour shows where the energy came from",
    zh: "线条颜色表示电力的来源",
    vi: "Màu đường dây cho biết nguồn điện đến từ đâu",
    ar: "لون الخط يوضّح مصدر الطاقة",
  },
  ef_from_panels: { en: "From your panels", zh: "来自光伏板", vi: "Từ tấm pin của bạn", ar: "من ألواحك" },
  ef_from_battery: { en: "From your battery", zh: "来自电池", vi: "Từ pin lưu trữ", ar: "من بطاريتك" },
  ef_from_grid: { en: "From the grid", zh: "来自电网", vi: "Từ lưới điện", ar: "من الشبكة" },
  ef_not_in_use: { en: "Not in use", zh: "未使用", vi: "Không sử dụng", ar: "غير مستخدم" },
  ef_not_live: {
    en: "An illustration of how a system behaves, not a live reading from your home.",
    zh: "此图用于说明系统的运作方式，并非您家中的实时读数。",
    vi: "Đây là hình minh họa cách hệ thống vận hành, không phải số liệu thực tế từ nhà bạn.",
    ar: "هذا رسم توضيحي لكيفية عمل النظام، وليس قراءة مباشرة من منزلك.",
  },

  /* ---------------- home page sections ---------------- */
  svc_eyebrow: { en: "What we do", zh: "我们的服务", vi: "Chúng tôi làm gì", ar: "ما نقوم به" },
  svc_heading: {
    en: "Everything you need to run on the sun.",
    zh: "让您依靠阳光生活的一切所需。",
    vi: "Mọi thứ bạn cần để sống nhờ ánh nắng.",
    ar: "كل ما تحتاجه لتعتمد على الشمس.",
  },
  svc_explore: { en: "Explore", zh: "了解更多", vi: "Tìm hiểu thêm", ar: "استكشف" },

  /* ---------------- language switcher ---------------- */
  lang_label: { en: "Language", zh: "语言", vi: "Ngôn ngữ", ar: "اللغة" },
  lang_change: { en: "Change language", zh: "切换语言", vi: "Đổi ngôn ngữ", ar: "تغيير اللغة" },

  /* ---------------- translation notice ---------------- */
  /* Shown while a non-English language is selected. Being upfront that parts
     of the site are still English is better than a reader hitting a wall of
     it with no explanation and assuming the switcher is broken. */
  translation_partial: {
    en: "",
    zh: "部分详情页面目前仍为英文，我们正在陆续翻译。如需以中文沟通，请致电我们。",
    vi: "Một số trang chi tiết hiện vẫn bằng tiếng Anh và đang được dịch. Hãy gọi cho chúng tôi nếu bạn muốn trao đổi bằng tiếng Việt.",
    ar: "بعض الصفحات التفصيلية لا تزال بالإنجليزية ويجري العمل على ترجمتها. اتصل بنا إذا كنت تفضّل التحدث بالعربية.",
  },
};

/** Look up a key. Unknown keys return "" rather than throwing. */
export function tr(key, lang = "en") {
  const entry = T[key];
  if (!entry) return "";
  return entry[lang] ?? entry.en ?? "";
}
