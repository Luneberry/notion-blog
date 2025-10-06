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
    <html lang="ko" className={`${inter.variable} ${poppins.variable}`} suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />

          {/* ✅ Kakao AdFit Script (모든 페이지 하단에 노출) */}
          <ins
            className="kakao_ad_area"
            style={{ display: "none", width: "100%" }}
            data-ad-unit="DAN-EI02oUNmqHBR7hwg"
            data-ad-width="320"
            data-ad-height="100"
          ></ins>
          <script
            async
            type="text/javascript"
            charSet="utf-8"
            src="https://t1.daumcdn.net/kas/static/ba.min.js"
          ></script>
        </ThemeProvider>
      </body>
    </html>
  );
}
