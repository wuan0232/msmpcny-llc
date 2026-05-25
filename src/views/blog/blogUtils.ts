import { extractFirstImageRef, getBlogImageUrl, type BlogListPost } from './blogApi'

export const BLOG_DEFAULT_SITE_ID = 'msmpcny'
export const BLOG_LIST_PAGE_SIZE = 9
export const BLOG_CARD_CATEGORY = 'Patient education'

export interface BlogCardPost {
  id: string
  title: string
  excerpt: string
  dateIso: string
  dateLabel: string
  category: string
  imageUrl: string
  imageAlt: string
}

export interface BlogSectionBlock {
  heading: string
  texts: string[]
  imageUrl: string
  imageAlt: string
}

interface ListPageSnapshot {
  cards: BlogCardPost[]
  total: number
}

const listPageCache = new Map<string, ListPageSnapshot>()

function listPageCacheKey(siteId: string, page: number) {
  return `${siteId}:${page}`
}

export function getListPageCache(siteId: string, page: number): ListPageSnapshot | null {
  return listPageCache.get(listPageCacheKey(siteId, page)) ?? null
}

export function setListPageCache(siteId: string, page: number, snapshot: ListPageSnapshot) {
  listPageCache.set(listPageCacheKey(siteId, page), snapshot)
}

export function toBlogErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error && error.message) {
    return `${fallback} ${error.message}`
  }
  return fallback
}

export function formatBlogDate(dateValue: string, style: 'list' | 'detail'): string {
  if (!dateValue) return 'N/A'
  const date = new Date(dateValue)
  if (Number.isNaN(date.getTime())) return dateValue

  if (style === 'list') {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
      .format(date)
      .toUpperCase()
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

/** 同步映射：不阻塞网络，列表先展示文字 */
export function mapPostToCardSync(post: BlogListPost): BlogCardPost {
  const imageRef = extractFirstImageRef(post)
  const createdAt = post.createdAt ?? ''

  return {
    id: post.id,
    title: post.title || 'Untitled',
    excerpt: (post.excerpt ?? '').trim() || 'No summary available.',
    dateIso: createdAt,
    dateLabel: formatBlogDate(createdAt, 'list'),
    category: BLOG_CARD_CATEGORY,
    imageUrl: imageRef?.url ?? '',
    imageAlt: imageRef?.alt?.trim() || post.title,
  }
}

/** 后台补全缺失封面图，不阻塞首屏 */
export async function enrichListCardImages(
  siteId: string,
  items: BlogListPost[],
  onUpdate: (postId: string, imageUrl: string) => void,
  signal?: AbortSignal,
) {
  const tasks = items.map(async (item) => {
    if (signal?.aborted) return
    const imageRef = extractFirstImageRef(item)
    if (!imageRef?.id || imageRef.url) return

    try {
      const url = await getBlogImageUrl(siteId, imageRef.id, signal)
      if (!signal?.aborted && url) {
        onUpdate(item.id, url)
      }
    } catch {
      /* 单张失败不影响其它卡片 */
    }
  })

  await Promise.all(tasks)
}

export function getPostSectionBlocks(post: BlogListPost): BlogSectionBlock[] {
  const blocks: BlogSectionBlock[] = []

  for (const section of post.sections ?? []) {
    const heading = (section.heading ?? '').trim()
    const texts: string[] = []

    if (section.body?.trim()) {
      texts.push(section.body.trim())
    }

    for (const paragraph of section.paragraphs ?? []) {
      const text = (paragraph.text ?? '').trim()
      if (text) texts.push(text)
    }

    const firstImage = (section.paragraphs ?? [])
      .map((paragraph) => paragraph.image)
      .find((image) => image?.url || image?.id)

    blocks.push({
      heading,
      texts,
      imageUrl: firstImage?.url ?? '',
      imageAlt: firstImage?.alt ?? '',
    })
  }

  if (blocks.length > 0) return blocks

  return [
    {
      heading: '',
      texts: post.excerpt ? [post.excerpt] : ['No detail content available.'],
      imageUrl: '',
      imageAlt: '',
    },
  ]
}

export function postNeedsImageHydration(post: BlogListPost): boolean {
  for (const section of post.sections ?? []) {
    for (const paragraph of section.paragraphs ?? []) {
      const image = paragraph.image
      if (image?.id && !image.url) return true
    }
  }
  return false
}

export async function hydratePostImages(
  input: BlogListPost,
  siteId: string,
  signal?: AbortSignal,
): Promise<BlogListPost> {
  const clone: BlogListPost = structuredClone(input)

  for (const section of clone.sections ?? []) {
    for (const paragraph of section.paragraphs ?? []) {
      const image = paragraph.image
      if (!image?.id || image.url) continue
      try {
        image.url = await getBlogImageUrl(siteId, image.id, signal)
      } catch {
        /* 保留正文 */
      }
    }
  }

  return clone
}
