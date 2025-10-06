// src/app/layout.tsx
import type React from "react";
import type { Metadata } from "next";
import Script from "next/script";                 // ✅ 추가
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

export const metadata = {
  title: "Notion Blog | 강력한 블로그 플랫폼",
  description: "Notion을 CMS로 사용하는 SEO 친화적 블로그",
  keywords: ["Notion", "Blog", "Next.js", "SEO", "카카오애드핏"],
  openGraph: {
    title: "Notion Blog",
    description: "Notion을 CMS로 사용하는 SEO 친화적 블로그입니다.",
    url: "https://notion-blog-yourname.vercel.app",
    siteName: "Notion Blog",
    locale: "ko_KR",
    type: "website",
  },
  alternates: {
    canonical: "https://notion-blog-syga.vercel.app/",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${inter.variable} ${poppins.variable}`} suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />

          {/* Kakao AdFit (공통 하단) */}
          <ins
            className="kakao_ad_area"
            style={{ display: "none", width: "100%" }}
            data-ad-unit="DAN-EI02oUNmqHBR7hwg"
            data-ad-width="250"
            data-ad-height="250"
          />
          <Script
            src="https://t1.daumcdn.net/kas/static/ba.min.js"
            async
            strategy="afterInteractive"
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
