import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ServiceWorkerRegister } from "./components/ServiceWorkerRegister";
import { WebVitals } from "./components/WebVitals";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fontDisplay = localFont({
  src: "./fonts/Dancing_Script/DancingScript-VariableFont_wght.ttf",
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "News App",
    template: "%s | News App",
  },
  description:
    "Découvrez notre sélection de produits tech : audio, bureau et accessoires du quotidien.",
  keywords: ["ecommerce", "tech", "audio", "bureau", "accessoires"],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "News App",
    title: "News App",
    description:
      "Découvrez notre sélection de produits tech : audio, bureau et accessoires du quotidien.",
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${fontDisplay.variable} min-h-screen antialiased`}
      >
        <WebVitals />
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  );
}
