import type { BlogListPost } from './blogApi'

const postCacheBySite = new Map<string, Map<string, BlogListPost>>()

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
