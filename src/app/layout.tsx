import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Cinzel } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import BannerCarousel from "@/components/common/BannerCarousel";
import ChatWidget from "@/components/common/ChatWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "2022 개정 교육과정 성취기준 탐색",
  description: "2022 개정 교육과정의 핵심 성취기준을 쉽고 빠르게 원클릭으로 탐색하세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${cinzel.variable} antialiased font-sans text-gray-900 bg-[#FDFCF8] min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <BannerCarousel />
        <ChatWidget />
        <Footer />
      </body>
    </html>
  );
}
