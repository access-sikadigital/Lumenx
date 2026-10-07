import { Inter_Tight, Noto_Sans_Arabic, Noto_Sans_SC, Roboto } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrackingBridge from "@/components/TrackingBridge";
import { LanguageProvider } from "@/lib/i18n";
import { StateProvider } from "@/lib/state-context";

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter-tight",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

/* Script fallbacks. Inter Tight and Roboto carry no Chinese or Arabic
   glyphs, so without these the moment a translated string lands the browser
   substitutes whatever it has locally: the page renders, but in a different
   face at a different weight, and Arabic in particular loses its joining
   behaviour. Declared as variables and appended to the font stacks in
   globals.css, so they cost nothing until a non-Latin glyph is actually
   asked for.

   `preload: false` on purpose: these are large subsets and English is the
   only live language, so preloading them would mean every Australian visitor
   downloading a Chinese font they will never see. */
const notoSC = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sc",
  display: "swap",
  preload: false,
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-arabic",
  display: "swap",
  preload: false,
});

export const metadata = {
  metadataBase: new URL("https://lumenex.com.au"),
  title: {
    default: "Lumenx Solar | Solar & Battery Installers in VIC & NSW",
    template: "%s | Lumenx",
  },
  description:
    "Solar panels, batteries and EV chargers for homes and businesses in VIC and NSW. Solar Victoria authorised, every rebate applied. Free quote: 1800 577 319.",
  applicationName: "Lumenx",
  keywords: [
    "solar panels melbourne",
    "solar batteries",
    "solar power sydney",
    "commercial solar",
    "ev charger installation",
    "solar rebates victoria",
    "Lumenx",
  ],
  // No canonical here: a layout canonical is inherited by every page that does
  // not set its own, which would tell Google those pages are copies of the
  // home page. The home page and each indexed page declare their own.
  icons: { icon: "/favicon.png", apple: "/favicon.png" },
  // Default share card. Pages that set their own openGraph.images override it;
  // everything else inherits this, so no Lumenx link is ever shared as a bare
  // grey box. JPEG rather than WebP: some social scrapers still do not read it.
  openGraph: {
    type: "website",
    siteName: "Lumenx",
    title: "Lumenx Solar | Solar & Battery Installers in VIC & NSW",
    description:
      "Solar panels, batteries and EV chargers for homes and businesses in VIC and NSW. Solar Victoria authorised, every rebate applied. Free quote: 1800 577 319.",
    url: "/",
    locale: "en_AU",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Solar panels on a rooftop at sunset, Lumenx",
      },
    ],
  },
  // No twitter title/description: pages never set their own, so a fixed one
  // here made every shared page show the home page's text. Without it X reads
  // each page's og:title and og:description instead.
  twitter: {
    card: "summary_large_image",
    images: ["/og-default.jpg"],
  },
};

export const viewport = {
  themeColor: "#0b143b",
  colorScheme: "light",
};

export default function RootLayout({ children }) {
  return (
    /* lang and dir start as en-AU/ltr and are rewritten on <html> by
       LanguageProvider when a different language is chosen. They are set here
       too so the server-rendered document is never missing them. */
    <html
      lang="en-AU"
      dir="ltr"
      className={`${interTight.variable} ${roboto.variable} ${notoSC.variable} ${notoArabic.variable}`}
    >
      <body>
        <SmoothScroll />
        <TrackingBridge />
        {/* State first: the language provider renders inside it so a
            translated string can still read the chosen state. */}
        <StateProvider>
          <LanguageProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </LanguageProvider>
        </StateProvider>
      </body>
    </html>
  );
}
