# Notion Blog

Notion을 CMS(콘텐츠 관리 시스템)로 사용하는 Next.js 블로그입니다.

## 기술 스택

- **프레임워크**: Next.js 15 (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **Notion 연동**: @notionhq/client
- **Markdown 렌더링**: notion-to-md, react-markdown

## 프로젝트 설정 가이드

### 1. Notion 연동 설정

#### 1.1 Notion Integration 생성

1. [Notion Integrations 페이지](https://www.notion.so/my-integrations)에 접속합니다.
2. "New integration" 버튼을 클릭합니다.
3. Integration 이름을 입력하고 워크스페이스를 선택합니다.
4. "Submit" 버튼을 클릭하여 Integration을 생성합니다.
5. 생성된 Integration의 **Internal Integration Token**을 복사합니다. (이것이 `NOTION_API_KEY`입니다)

#### 1.2 Notion 데이터베이스 생성

1. Notion에서 새 페이지를 생성합니다.
2. 페이지 내에서 `/database` 명령어를 입력하여 데이터베이스를 생성합니다.
3. 다음 속성(Property)들을 추가합니다:

| 속성 이름 | 타입 | 설명 |
|----------|------|------|
| Name | 제목 (Title) | 게시글 제목 |
| Slug | 텍스트 (Text) | URL에 사용될 고유 값 (예: my-first-post) |
| Published | 체크박스 (Checkbox) | 게시 여부 |
| Published Date | 날짜 (Date) | 게시 날짜 |
| Summary | 텍스트 (Text) | 게시글 요약 |
| Category | 선택 (Select) | 카테고리 |
| Files | 파일과 미디어 (Files) | 썸네일 이미지 |

#### 1.3 데이터베이스에 Integration 연결

1. 생성한 데이터베이스 페이지 우측 상단의 `...` 메뉴를 클릭합니다.
2. "Add connections"를 선택합니다.
3. 앞서 생성한 Integration을 선택하여 연결합니다.

#### 1.4 데이터베이스 ID 확인

데이터베이스 페이지의 URL에서 ID를 확인합니다:
\`\`\`
https://www.notion.so/[워크스페이스]/[데이터베이스ID]?v=...
\`\`\`
예시: `https://www.notion.so/myworkspace/281c2ca5252380e0bbc8c541c660dc51?v=...`
→ 데이터베이스 ID는 `281c2ca5252380e0bbc8c541c660dc51`

### 2. 프로젝트 설치

#### 2.1 프로젝트 다운로드

\`\`\`bash
# ZIP 파일 다운로드 후 압축 해제
# 또는 GitHub에서 클론
\`\`\`

#### 2.2 의존성 설치

\`\`\`bash
npm install
# 또는
yarn install
# 또는
pnpm install
\`\`\`

### 3. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 입력합니다:

\`\`\`env
# Notion API 설정
NOTION_API_KEY="your_notion_integration_token"
NOTION_DATABASE_ID="your_database_id"

# 사이트 정보
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
\`\`\`

- `NOTION_API_KEY`: 1.1에서 복사한 Integration Token
- `NOTION_DATABASE_ID`: 1.4에서 확인한 데이터베이스 ID
- `NEXT_PUBLIC_BASE_URL`: 로컬 개발 시 `http://localhost:3000`, 배포 시 실제 도메인

### 4. 로컬 실행

\`\`\`bash
npm run dev
# 또는
yarn dev
# 또는
pnpm dev
\`\`\`

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인합니다.

### 5. 배포

#### 5.1 Vercel 배포 (권장)

1. [Vercel](https://vercel.com)에 로그인합니다.
2. "New Project"를 클릭합니다.
3. GitHub 저장소를 연결하거나 프로젝트를 업로드합니다.
4. Environment Variables 섹션에서 다음 변수들을 추가합니다:
   - `NOTION_API_KEY`
   - `NOTION_DATABASE_ID`
   - `NEXT_PUBLIC_BASE_URL` (배포된 도메인 주소)
5. "Deploy" 버튼을 클릭합니다.

#### 5.2 빌드 및 프로덕션 실행

\`\`\`bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start
\`\`\`

## 사용 방법

### 게시글 작성

1. Notion 데이터베이스에 새 페이지를 추가합니다.
2. 필수 속성들을 입력합니다:
   - **Name**: 게시글 제목
   - **Slug**: URL에 사용될 고유 값 (예: `my-first-post`)
   - **Published Date**: 게시 날짜
   - **Summary**: 게시글 요약 (선택)
   - **Category**: 카테고리 (선택)
   - **Files**: 썸네일 이미지 (선택)
3. 페이지 본문에 콘텐츠를 작성합니다.
4. **Published** 체크박스를 체크하면 블로그에 게시됩니다.

### 게시글 수정

1. Notion에서 해당 페이지를 수정합니다.
2. 약 60초 후 자동으로 블로그에 반영됩니다. (revalidate 설정)

### 게시글 숨기기

1. **Published** 체크박스를 해제하면 블로그에서 숨겨집니다.

## 주요 기능

- ✅ Notion 데이터베이스 연동
- ✅ 게시글 목록 페이지
- ✅ 게시글 상세 페이지 (동적 라우팅)
- ✅ Markdown 렌더링 (코드 블록, 이미지 등 지원)
- ✅ SEO 최적화 (메타 태그, robots.txt, sitemap.xml)
- ✅ 반응형 디자인
- ✅ 썸네일 이미지 지원
- ✅ 카테고리 분류
- ✅ 최신순 정렬

## 문제 해결

### 게시글이 표시되지 않는 경우

1. Notion Integration이 데이터베이스에 연결되어 있는지 확인
2. `.env.local` 파일의 환경 변수가 올바른지 확인
3. **Published** 체크박스가 체크되어 있는지 확인
4. **Slug** 값이 입력되어 있는지 확인

### 이미지가 표시되지 않는 경우

1. `next.config.mjs`의 `remotePatterns` 설정 확인
2. Notion의 **Files** 속성에 이미지가 업로드되어 있는지 확인

## 라이선스

MIT
