"use client"

import Link from "next/link"
import { Sparkles } from "lucide-react"
import { ThemeToggle } from "@/components/ThemeToggle"
import { useEffect, useState } from "react"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-[960px] mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors font-[family-name:var(--font-poppins)]">
              Notion Blog
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/" className="text-foreground/70 hover:text-foreground transition-colors font-medium text-sm">
              홈
            </Link>
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  )
}
