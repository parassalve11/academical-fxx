// Content captured from academiyafx.com on 14 Oct 2026.
// Market, news and analysis entries are static snapshots — wire these to the
// live APIs when integrating with the production backend.

export const nav = [
  { label: "Markets", href: "/markets" },
  { label: "Courses", href: "/courses" },
  { label: "Calendar", href: "/calendar" },
  { label: "News", href: "/news" },
  { label: "Analysis & Opinion", href: "/analysis" },
  { label: "Brokers", href: "/brokers" },
  { label: "Advertise", href: "/advertise" },
];

export const ticker = [
  { name: "Dow Jones", value: "51,670.10", change: -0.35 },
  { name: "Nasdaq Composite", value: "27,204.38", change: -0.15 },
  { name: "Russell 2000", value: "2,783.37", change: -0.4 },
  { name: "S&P 500", value: "7,805.37", change: -0.02 },
  { name: "Euro STOXX 50", value: "6,184.90", change: 0.01 },
  { name: "FTSE 100", value: "10,650.33", change: -0.06 },
  { name: "Hang Seng", value: "24,345.22", change: 0.3 },
  { name: "Nikkei 225", value: "68,089.78", change: 0.46 },
];

export const marketsBoard = [
  { name: "Dow Jones", symbol: "^DJI", value: "51,670.10", change: -0.35 },
  { name: "Nasdaq Composite", symbol: "^IXIC", value: "27,204.38", change: -0.15 },
  { name: "Russell 2000", symbol: "^RUT", value: "2,783.37", change: -0.4 },
  { name: "S&P 500", symbol: "^GSPC", value: "7,805.37", change: -0.02 },
  { name: "Euro STOXX 50", symbol: "^STOXX50E", value: "6,184.90", change: 0.01 },
  { name: "FTSE 100 (UK)", symbol: "^FTSE", value: "10,650.33", change: -0.06 },
];

export const topMovers = {
  gainer: { name: "Nikkei 225 (JP)", points: "+312.26", change: 0.46 },
  loser: { name: "Russell 2000", points: "-11.11", change: -0.4 },
};

export const highlights = [
  { title: "Forex, stocks & crypto", body: "Three markets, one structured curriculum." },
  { title: "Live Zoom classes", body: "Learn face to face and ask questions as you go." },
  { title: "Lifetime access", body: "Pay once and keep every lesson and update." },
  { title: "Certificate", body: "Earn a certificate when you complete a course." },
];

export const courses = [
  {
    slug: "master-institutional-trading-in-90-days-oa90lz",
    kicker: "Learn to trade like a pro",
    title: "Master Institutional Trading",
    summary:
      "Build a strong foundation, sharpen your strategies and trade global markets the way institutions do — from the basics through risk management and trading psychology.",
    image: "/images/courses/institutional-90-days.png",
    instructor: "Platform Owner",
    rating: 5.0,
    reviews: 1,
    lessons: 31,
    students: 23,
    price: 250,
    was: 500,
  },
  {
    slug: "learn-to-trade-like-a-pro-master-institutional-trading-mapfso",
    kicker: "Learn to trade like a pro",
    title: "Master Institutional Trading (R)",
    summary:
      "The same institutional framework in a refreshed edition — technical analysis, candlestick patterns and real-time market updates.",
    image: "/images/courses/institutional-pro.png",
    instructor: "Platform Owner",
    rating: null,
    reviews: 0,
    lessons: 30,
    students: 12,
    price: 150,
    was: 300,
  },
  {
    slug: "test-courses-10jrs6",
    kicker: null,
    title: "test courses",
    summary: "xyz",
    image: null,
    instructor: "Platform Owner",
    rating: 1.0,
    reviews: 1,
    lessons: 1,
    students: 13,
    price: 0,
    was: null,
  },
];

// The course syllabus is a real sequence, so it is presented as an ordered path.
export const curriculum = [
  { title: "The basics", body: "How markets, brokers and orders actually work." },
  { title: "Technical analysis", body: "Candlesticks and the chart patterns that repeat." },
  { title: "Pro trader strategies", body: "Setups with defined entries, targets and exits." },
  { title: "Market analysis", body: "Read technicals and fundamentals together." },
  { title: "Real-time updates", body: "Apply it live as the market moves." },
  { title: "Risk management", body: "Position sizing that keeps you in the game." },
  { title: "Psychology control", body: "Discipline when the trade goes against you." },
];

export const mentors = [
  { name: "Saurya Praveen", role: "Mentor & trading expert" },
  { name: "Kumkum", role: "Trading expert" },
];

export const news = [
  {
    id: "6acec60172e9d2513886f623",
    ticker: "NASDAQ:ANL",
    source: "fmp",
    ago: "13h ago",
    title: "Stocks Fall: Adlai Nortye, Omada, Syndax, Six Flags",
    excerpt:
      "Several stocks recorded double-digit losses on October 13, 2026. A failed clinical trial drove the decline in Syndax Pharmaceuticals, while Six Flags shares fell following a roller-coaster incident.",
    image: "/images/news/stocks-fall.jpg",
  },
  { id: "6acec60172e9d2513886f624", ticker: "NASDAQ:BMBL", ago: "13h ago", title: "Bumble (NASDAQ: BMBL) Leads Sharp Stock-Market Gains", image: "/images/news/bumble.jpg" },
  { id: "6ace94c972e9d2513886e9fe", ticker: "NASDAQ:AMAT", ago: "14h ago", title: "Applied Materials (NASDAQ: AMAT) Outlook: AI-Driven Growth and Financial Targets", image: "/images/news/amat.jpg" },
  { id: "6ace86b972e9d2513886e69a", ticker: "NASDAQ:OLLI", ago: "15h ago", title: "Ollie's Bargain Outlet (NASDAQ: OLLI) Stock: Price Target and Share Buyback Boost Investor Confidence", image: "/images/news/olli.jpg" },
  { id: "6ace86b972e9d2513886e69b", ticker: "NASDAQ:ANGO", ago: "16h ago", title: "H.C. Wainwright Adjusts Price Target for AngioDynamics (NASDAQ: ANGO) Amid Q1 Fiscal 2027 Results", image: "/images/news/ango.jpg" },
  { id: "6ace86b972e9d2513886e69c", ticker: "NASDAQ:DPZ", ago: "17h ago", title: "Domino's Pizza (NASDAQ:DPZ) Q3 Earnings: Navigating Competition and Stock Performance", image: "/images/news/dpz.jpg" },
];

export const analysis = [
  { id: "6a8c0a327783299a774e9f40", title: "link", author: "Platform Owner", date: "24 Aug", comments: 0 },
  { id: "6a76c5648a22e284027de8ea", title: "Point of interest", author: "Platform Owner", date: "8 Aug", comments: 0 },
  { id: "6a60da40e4a18bf664db256d", title: "Today results", author: "Platform Owner", date: "22 Jul", comments: 0 },
  { id: "6a4248addee17ed271542491", title: "Nothing here to share", author: "JJK King", date: "29 Jun", comments: 1 },
];

export const socials = [
  { label: "YouTube", href: "https://youtube.com/@sauryapraveen", icon: "youtube" },
  { label: "Instagram", href: "https://www.instagram.com/saurya__praveen", icon: "instagram" },
  { label: "Facebook", href: "https://www.facebook.com/share/1ED9UhDyuC/", icon: "facebook" },
  { label: "Telegram", href: "https://t.me/academiya_fx", icon: "telegram" },
];

export const footerColumns = [
  {
    title: "Learn",
    links: [
      { label: "All courses", href: "/courses" },
      { label: "Forex", href: "/courses?market=forex" },
      { label: "Stocks", href: "/courses?market=stocks" },
      { label: "Crypto", href: "/courses?market=crypto" },
    ],
  },
  {
    title: "Markets",
    links: [
      { label: "Indices", href: "/markets" },
      { label: "Financial news", href: "/news" },
      { label: "Economic calendar", href: "/calendar" },
      { label: "Analysis & Opinion", href: "/analysis" },
      { label: "Broker reviews", href: "/brokers" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Log in", href: "/login" },
      { label: "Sign up", href: "/signup" },
      { label: "My learning", href: "/learn" },
      { label: "About us", href: "/about" },
      { label: "Contact us", href: "/contact" },
      { label: "Advertise", href: "/advertise" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Refund & Cancellation", href: "/refund" },
      { label: "Risk Disclaimer", href: "/disclaimer" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
  },
];
