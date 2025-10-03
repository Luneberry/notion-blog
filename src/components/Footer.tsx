export default function Footer() {
  return (
    <footer className="bg-muted/30 mt-16 border-t border-border">
      <div className="max-w-[960px] mx-auto px-6 py-8">
        <div className="text-center text-muted-foreground text-sm">
          <p className="mb-1">© {new Date().getFullYear()} Notion Blog. All rights reserved.</p>
          <p className="text-xs">Powered by Next.js & Notion</p>
        </div>
      </div>
    </footer>
  )
}
