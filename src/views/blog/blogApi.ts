const BLOG_API_BASE = (
  import.meta.env.VITE_BLOG_API_BASE ?? (import.meta.env.DEV ? '/api' : 'https://aihosthub.aihnet.com/api')
).replace(/\/+$/, '')
const BLOG_API_TOKEN = import.meta.env.VITE_BLOG_API_TOKEN ?? 'local-dev-token'

type RequestInitWithSignal = RequestInit & { signal?: AbortSignal }

async function requestJson<T>(path: string, init: RequestInitWithSignal = {}): Promise<T> {
  const headers = new Headers(init.headers)
  if (BLOG_API_TOKEN) {
    headers.set('Authorization', `Bearer ${BLOG_API_TOKEN}`)
  }
  headers.set('Accept', 'application/json')

  const response = await fetch(`${BLOG_API_BASE}${path}`, { ...init, headers })
  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`)
  }
  return (await response.json()) as T
}

export interface BlogImage {
  id: string
  url: string
  alt?: string
}

interface BlogImageRef {
  id?: string
  url?: string
  alt?: string
}

interface BlogParagraph {
  text?: string
  image?: BlogImageRef
}

interface BlogSection {
  heading?: string
  body?: string
  paragraphs?: BlogParagraph[]
}

export interface BlogListPost {
  id: string
  siteId: string
  title: string
  excerpt?: string
  sections?: BlogSection[]
  createdAt?: string
}

export interface BlogPostsResponse {
  items: BlogListPost[]
  total: number
  page: number
  pageSize: number
}

const postCacheBySite = new Map<string, Map<string, BlogListPost>>()
const imageUrlCache = new Map<string, string>()

function imageCacheKey(siteId: string, imageId: string) {
  return `${siteId}:${imageId}`
}

export function cachePosts(siteId: string, posts: BlogListPost[]) {
  const siteCache = postCacheBySite.get(siteId) ?? new Map<string, BlogListPost>()
  for (const post of posts) {
    siteCache.set(post.id, post)
  }
  postCacheBySite.set(siteId, siteCache)
}

export function getCachedPost(siteId: string, postId: string): BlogListPost | null {
  return postCacheBySite.get(siteId)?.get(postId) ?? null
}

export async function fetchBlogPosts(
  siteId: string,
  page: number,
  pageSize: number,
  signal?: AbortSignal,
): Promise<BlogPostsResponse> {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    sort: 'createdAt:desc',
  })
  return requestJson<BlogPostsResponse>(`/blog/sites/${encodeURIComponent(siteId)}/posts?${params.toString()}`, {
    signal,
  })
}

export async function findBlogPostById(
  siteId: string,
  postId: string,
  signal?: AbortSignal,
): Promise<BlogListPost | null> {
  const pageSize = 20
  let page = 1
  let total = 1

  while ((page - 1) * pageSize < total) {
    if (signal?.aborted) return null
    const result = await fetchBlogPosts(siteId, page, pageSize, signal)
    const matched = result.items.find((item) => item.id === postId)
    if (matched) return matched
    total = result.total
    page += 1
  }

  return null
}

export async function fetchBlogImage(siteId: string, imageId: string, signal?: AbortSignal): Promise<BlogImage> {
  return requestJson<BlogImage>(
    `/blog/sites/${encodeURIComponent(siteId)}/images/${encodeURIComponent(imageId)}`,
    { signal },
  )
}

/** 带内存缓存，避免列表/详情重复请求同一张图 */
export async function getBlogImageUrl(
  siteId: string,
  imageId: string,
  signal?: AbortSignal,
): Promise<string> {
  const key = imageCacheKey(siteId, imageId)
  const cached = imageUrlCache.get(key)
  if (cached) return cached

  const image = await fetchBlogImage(siteId, imageId, signal)
  imageUrlCache.set(key, image.url)
  return image.url
}

export function extractFirstImageRef(post: BlogListPost): BlogImageRef | null {
  for (const section of post.sections ?? []) {
    for (const paragraph of section.paragraphs ?? []) {
      if (paragraph.image?.url || paragraph.image?.id) {
        return paragraph.image
      }
    }
  }
  return null
}
