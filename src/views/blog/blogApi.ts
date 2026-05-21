const BLOG_API_BASE = (
  import.meta.env.VITE_BLOG_API_BASE ?? (import.meta.env.DEV ? '/api' : 'https://aihosthub.aihnet.com/api')
).replace(/\/+$/, '')
const BLOG_API_TOKEN = import.meta.env.VITE_BLOG_API_TOKEN ?? 'local-dev-token'
const SITE_ID_OVERRIDE = (import.meta.env.VITE_BLOG_SITE_ID ?? 'msmpcny').trim()

const BLOG_API_ORIGIN = BLOG_API_BASE.replace(/\/api$/, '')

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

export interface BlogSite {
  id: string
  name: string
  address: string
  status: string
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

interface BlogSitesResponse {
  sites: BlogSite[]
}

export interface BlogPostsResponse {
  items: BlogListPost[]
  total: number
  page: number
  pageSize: number
}

interface BlogHealthResponse {
  status: string
}

export async function fetchHealth(signal?: AbortSignal): Promise<BlogHealthResponse> {
  const response = await fetch(`${BLOG_API_ORIGIN}/health`, {
    signal,
    headers: { Accept: 'application/json' },
  })
  if (!response.ok) {
    throw new Error(`Health check failed (${response.status})`)
  }
  return (await response.json()) as BlogHealthResponse
}

export async function fetchBlogSites(signal?: AbortSignal): Promise<BlogSite[]> {
  const data = await requestJson<BlogSitesResponse>('/blog/sites', { signal })
  return data.sites ?? []
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

export function pickSiteId(sites: BlogSite[], host: string): string {
  if (SITE_ID_OVERRIDE) {
    const forced = sites.find((site) => site.id === SITE_ID_OVERRIDE)
    if (forced) return forced.id
  }

  const normalizedHost = host.toLowerCase()
  const exactAddress = sites.find((site) => site.address.toLowerCase() === normalizedHost)
  if (exactAddress) return exactAddress.id

  const fuzzyAddress = sites.find((site) => normalizedHost.includes(site.address.toLowerCase()))
  if (fuzzyAddress) return fuzzyAddress.id

  const firstSite = sites[0]
  if (firstSite) return firstSite.id

  return ''
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
