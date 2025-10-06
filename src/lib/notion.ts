import { NotionToMarkdown } from "notion-to-md"
import { Client } from "@notionhq/client"

// 환경 변수 검증
if (!process.env.NOTION_API_KEY) {
  throw new Error("NOTION_API_KEY 환경 변수가 설정되지 않았습니다.")
}

if (!process.env.NOTION_DATABASE_ID) {
  throw new Error("NOTION_DATABASE_ID 환경 변수가 설정되지 않았습니다.")
}

// 데이터베이스 ID
const DATABASE_ID = process.env.NOTION_DATABASE_ID
const NOTION_API_KEY = process.env.NOTION_API_KEY
const NOTION_VERSION = "2022-06-28"

// 게시글 타입 정의
export interface BlogPost {
  id: string
  title: string
  slug: string
  summary: string
  publishedDate: string
  category: string
  thumbnail: string | null
}

/**
 * Notion API를 직접 호출하는 헬퍼 함수
 */
async function queryNotionDatabase(filter?: any, sorts?: any) {
  const response = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${NOTION_API_KEY}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      filter,
      sorts,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Notion API 오류: ${response.status} - ${error}`)
  }

  return response.json()
}

/**
 * Published가 체크된 게시글만 가져오기
 * Published Date 기준으로 최신순 정렬
 */
export async function getPublishedPosts(): Promise<BlogPost[]> {
  try {
    // --- DEBUGGING LOGS START ---
    console.log("Attempting to fetch published posts...");
    console.log(`Database ID used: ${process.env.NOTION_DATABASE_ID}`);
    if (process.env.NOTION_API_KEY) {
      const key = process.env.NOTION_API_KEY;
      console.log(`API Key used (partial): ${key.substring(0, 5)}...${key.substring(key.length - 4)}`);
    } else {
      console.log("API Key is NOT DEFINED in this environment.");
    }
    // --- DEBUGGING LOGS END ---
    const response = await queryNotionDatabase(
      {
        property: "Published",
        checkbox: {
          equals: true,
        },
      },
      [
        {
          property: "Published Date",
          direction: "descending",
        },
      ],
    )

    // Notion 응답을 BlogPost 타입으로 변환
    return response.results.map((page: any) => {
      const properties = page.properties

      return {
        id: page.id,
        title: properties.Name?.title?.[0]?.plain_text || "제목 없음",
        slug: properties.Slug?.rich_text?.[0]?.plain_text || "",
        summary: properties.Summary?.rich_text?.[0]?.plain_text || "",
        publishedDate: properties["Published Date"]?.date?.start || new Date().toISOString(),
        category: properties.Category?.select?.name || "",
        thumbnail: properties.Files?.files?.[0]?.file?.url || properties.Files?.files?.[0]?.external?.url || null,
      }
    })
  } catch (error) {
    console.error("게시글 목록을 가져오는 중 오류 발생:", error)
    throw error
  }
}

/**
 * Slug로 특정 게시글 가져오기
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const response = await queryNotionDatabase({
      and: [
        {
          property: "Published",
          checkbox: {
            equals: true,
          },
        },
        {
          property: "Slug",
          rich_text: {
            equals: slug,
          },
        },
      ],
    })

    if (response.results.length === 0) {
      return null
    }

    const page: any = response.results[0]
    const properties = page.properties

    return {
      id: page.id,
      title: properties.Name?.title?.[0]?.plain_text || "제목 없음",
      slug: properties.Slug?.rich_text?.[0]?.plain_text || "",
      summary: properties.Summary?.rich_text?.[0]?.plain_text || "",
      publishedDate: properties["Published Date"]?.date?.start || new Date().toISOString(),
      category: properties.Category?.select?.name || "",
      thumbnail: properties.Files?.files?.[0]?.file?.url || properties.Files?.files?.[0]?.external?.url || null,
    }
  } catch (error) {
    console.error("게시글을 가져오는 중 오류 발생:", error)
    return null
  }
}

/**
 * Notion 페이지 콘텐츠를 Markdown으로 변환
 * notion-to-md는 여전히 Client를 필요로 하므로 여기서만 사용
 */
export async function getPostContent(pageId: string): Promise<string> {
  try {
    // notion-to-md를 위한 Client 생성
    const notion = new Client({
      auth: NOTION_API_KEY,
      notionVersion: NOTION_VERSION,
    })

    const n2m = new NotionToMarkdown({ notionClient: notion })

    // Notion 페이지의 블록들을 Markdown으로 변환
    const mdblocks = await n2m.pageToMarkdown(pageId)
    const mdString = n2m.toMarkdownString(mdblocks)

    return mdString.parent || ""
  } catch (error) {
    console.error("콘텐츠를 변환하는 중 오류 발생:", error)
    return ""
  }
}
