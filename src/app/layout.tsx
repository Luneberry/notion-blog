// src/app/layout.tsx
import type React from "react";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Notion Blog",
  description: "Notion을 CMS로 사용하는 블로그입니다.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        {/* 기존 레이아웃 구조 */}
        <main>{children}</main>

        {/* ✅ Kakao AdFit 광고 (모든 페이지 공통 노출) */}
        <ins
          className="kakao_ad_area"
          style={{ display: "none" }}
          data-ad-unit="DAN-EI02oUNmqHBR7hwg"
          data-ad-width="250"
          data-ad-height="250"
        ></ins>

        <Script
          src="https://t1.daumcdn.net/kas/static/ba.min.js"
          async
          strategy="afterInteractive" // 페이지 렌더 후 로드
        />
      </body>
    </html>
  );
}
