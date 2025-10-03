import { getPublishedPosts } from "@/lib/notion"
import Image from "next/image"
import Link from "next/link"
import { Calendar, ArrowRight } from "lucide-react"

export const metadata = {
  title: "홈 - Notion Blog",
  description: "Notion을 CMS로 사용하는 블로그의 게시글 목록입니다.",
}

export const revalidate = 60

export default async function HomePage() {
  const posts = await getPublishedPosts()

  return (
    <div className="min-h-screen">
      <section className="max-w-[960px] mx-auto px-6 pt-24 pb-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground leading-tight font-[family-name:var(--font-poppins)]">
          생각을 나누고
          <br />
          <span className="text-primary">이야기를 전합니다</span>
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Notion을 CMS로 활용한 블로그에서 다양한 이야기를 만나보세요
        </p>
      </section>

      <section className="max-w-[960px] mx-auto px-6 pb-24">
        {posts.length === 0 ? (
          <div className="text-center py-20 bg-card rounded-xl border border-border">
            <h3 className="text-xl font-semibold mb-3 text-foreground">아직 게시글이 없습니다</h3>
            <p className="text-muted-foreground">첫 번째 게시글을 작성해보세요!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group block h-full">
                <article className="bg-card rounded-xl overflow-hidden border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col">
                  <div className="relative w-full aspect-[16/9] bg-muted overflow-hidden">
                    {post.thumbnail ? (
                      <Image
                        src={post.thumbnail || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg
                          className="w-12 h-12 text-muted-foreground/30"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    )}
                    {post.category && (
                      <div className="absolute top-3 left-3">
                        <span className="inline-block bg-background/90 backdrop-blur-sm text-foreground text-xs px-3 py-1 rounded-full font-medium">
                          {post.category}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors leading-tight flex-1 line-clamp-2 font-[family-name:var(--font-poppins)]">
                      {post.title}
                    </h2>

                    {post.summary && (
                      <p className="text-muted-foreground text-base mb-4 line-clamp-2 leading-relaxed">
                        {post.summary}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Calendar className="w-4 h-4" />
                        <time>
                          {new Date(post.publishedDate).toLocaleDateString("ko-KR", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </time>
                      </div>
                      <div className="flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                        <span>읽기</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
