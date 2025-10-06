import { getPublishedPosts, getPostBySlug, getPostContent } from "@/lib/notion"
import { notFound } from "next/navigation"
import Image from "next/image"
import ReactMarkdown from "react-markdown"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock } from "lucide-react"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: "게시글을 찾을 수 없습니다",
    }
  }

  return {
    title: `${post.title} - Notion Blog`,
    description: post.summary || post.title,
  }
}

export async function generateStaticParams() {
  const posts = await getPublishedPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export const revalidate = 60

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  // --- FINAL DEBUGGING LOGS ---
  console.log(`[FINAL_DEBUG] Slug: ${slug}`);
  console.log(`[FINAL_DEBUG] Result of getPostBySlug: ${post ? `Post found with ID ${post.id}` : 'Post NOT FOUND (null)'}`);
  
  if (!post) {
    notFound();
  }

  const content = await getPostContent(post.id);
  console.log(`[FINAL_DEBUG] Result of getPostContent: Content length is ${content.length}`);
  // --- END FINAL DEBUGGING LOGS ---

  const readingTime = Math.ceil(content.split(" ").length / 200)

  return (
    <article className="min-h-screen">
      <div className="max-w-[768px] mx-auto px-6 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-all group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">목록으로</span>
        </Link>
      </div>

      {post.thumbnail && (
        <div className="max-w-[960px] mx-auto px-6 mt-8">
          <div className="relative w-full aspect-[21/9] rounded-xl overflow-hidden shadow-md">
            <Image
              src={post.thumbnail || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-contain bg-muted"
              priority
            />
          </div>
        </div>
      )}

      <header className="max-w-[768px] mx-auto px-6 mt-12 mb-12">
        {post.category && (
          <span className="inline-block bg-primary/10 text-primary text-sm px-4 py-1.5 rounded-full mb-6 font-medium">
            {post.category}
          </span>
        )}

        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-foreground leading-tight font-[family-name:var(--font-poppins)]">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <time>
              {new Date(post.publishedDate).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{readingTime}분 읽기</span>
          </div>
        </div>
      </header>

      <div className="max-w-[768px] mx-auto px-6 mb-16">
        <div className="markdown-content">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>

      <div className="max-w-[768px] mx-auto px-6 pb-24">
        <div className="bg-muted rounded-xl p-8 border border-border">
          <h3 className="text-2xl font-bold mb-3 text-foreground font-[family-name:var(--font-poppins)]">
            다른 글도 읽어보세요
          </h3>
          <p className="text-muted-foreground mb-6 leading-relaxed">더 많은 흥미로운 이야기가 기다리고 있습니다</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg font-medium transition-all hover:gap-3"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>전체 글 보기</span>
          </Link>
        </div>
      </div>
    </article>
  )
}
