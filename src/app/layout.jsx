import { Inter_Tight, Roboto } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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

export const metadata = {
  metadataBase: new URL("https://lumenex.com.au"),
  title: {
    default: "Lumenx | Solar, Batteries & EV Charging in Melbourne & Sydney",
    template: "%s | Lumenx",
  },
  description:
    "Lumenx is an Australian solar energy company. CEC-accredited solar panels, batteries, EV chargers and heat pumps for homes and business across Victoria and NSW. Rebates handled, 16-year warranty. Get a free quote.",
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
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.png", apple: "/favicon.png" },
  // Default share card. Pages that set their own openGraph.images override it;
  // everything else inherits this, so no Lumenx link is ever shared as a bare
  // grey box. JPEG rather than WebP: some social scrapers still do not read it.
  openGraph: {
    type: "website",
    siteName: "Lumenx",
    title: "Lumenx | Solar, Batteries & EV Charging in Melbourne & Sydney",
    description:
      "Together, we build a brighter future. CEC-accredited solar, batteries and EV charging for Australian homes and business. Rebates handled, 16-year warranty.",
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
  twitter: {
    card: "summary_large_image",
    title: "Lumenx | Solar, Batteries & EV Charging",
    description: "CEC-accredited solar, batteries and EV charging across VIC & NSW. Rebates handled.",
    images: ["/og-default.jpg"],
  },
};

export const viewport = {
  themeColor: "#0b143b",
  colorScheme: "light",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-AU" className={`${interTight.variable} ${roboto.variable}`}>
      <body>
        <SmoothScroll />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
