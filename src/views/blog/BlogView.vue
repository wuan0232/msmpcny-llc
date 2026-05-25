<template>
  <div class="blog-wrapper">
    <NavBar />

    <main class="blog-main">
      <section class="blog-hero">
        <div class="container blog-hero-inner">
          <p class="blog-eyebrow">BLOG</p>
          <h1 class="blog-title">msmpcny blog</h1>
          <p class="blog-lead">
            Educational content for patients and families. Browse the latest articles on
            musculoskeletal medicine, pain management, and non-surgical treatment options.
          </p>
        </div>
      </section>

      <section class="blog-content">
        <div class="container">
          <div class="blog-meta-bar">
            <span class="blog-meta-pill">Latest insights</span>
            <span class="blog-meta-count">{{ totalItems }} articles</span>
            <span class="blog-meta-note">Site: msmpcny.aihnet.com</span>
          </div>

          <div
            ref="carouselRef"
            class="blog-carousel"
            @touchstart.passive="onTouchStart"
            @touchmove.passive="onTouchMove"
            @touchend="onTouchEnd"
            @touchcancel="onTouchEnd"
            @pointerdown="onPointerDown"
            @pointermove="onPointerMove"
            @pointerup="onPointerUp"
            @pointercancel="onPointerUp"
            @pointerleave="onPointerUp"
          >
            <div v-if="isLoading" class="blog-load-state">Loading blog posts...</div>
            <div v-else-if="errorMessage" class="blog-error-state">
              <p>{{ errorMessage }}</p>
              <button type="button" class="blog-page-btn" @click="reloadCurrentPage">Retry</button>
            </div>
            <div v-else-if="posts.length === 0" class="blog-empty-state">
              No published articles found for this site.
            </div>
            <Transition v-else name="blog-page">
              <ul :key="`${activeSiteId}-${currentPage}`" class="blog-grid">
                <li v-for="post in posts" :key="post.id" class="blog-card-item">
                  <article class="blog-card">
                    <div v-if="post.imageUrl" class="blog-card-image-wrap">
                      <img :src="post.imageUrl" :alt="post.imageAlt" class="blog-card-image" loading="lazy" decoding="async" />
                    </div>
                    <header class="blog-card-header">
                      <time class="blog-card-date" :datetime="post.dateIso">{{ post.dateLabel }}</time>
                      <span class="blog-card-category">{{ post.category }}</span>
                    </header>

                    <h2 class="blog-card-title">{{ post.title }}</h2>

                    <p class="blog-card-excerpt">{{ post.excerpt }}</p>

                    <RouterLink
                      class="blog-card-link"
                      :to="{ name: 'blog-detail', params: { postId: post.id }, query: { site: activeSiteId } }"
                    >
                      Read article details
                    </RouterLink>
                  </article>
                </li>
              </ul>
            </Transition>

            <p
              v-if="isDragging"
              class="blog-swipe-hint"
              :class="{ 'blog-swipe-hint--left': dragOffsetX < 0, 'blog-swipe-hint--right': dragOffsetX > 0 }"
              aria-hidden="true"
            >
              {{ dragOffsetX < 0 ? 'Release for next page' : dragOffsetX > 0 ? 'Release for previous page' : '' }}
            </p>
          </div>

          <nav v-if="totalPages > 1" class="blog-pagination" aria-label="Blog articles pagination">
            <button
              type="button"
              class="blog-page-btn blog-page-btn--arrow"
              :disabled="currentPage <= 1 || isLoading"
              aria-label="Previous page"
              @click="goToPage(currentPage - 1)"
            >
              ‹
            </button>

            <div class="blog-page-dots" role="group" aria-label="Page numbers">
              <button
                v-for="page in totalPages"
                :key="page"
                type="button"
                class="blog-page-dot"
                :class="{ 'blog-page-dot--active': page === currentPage }"
                :aria-label="`Page ${page}`"
                :aria-current="page === currentPage ? 'page' : undefined"
                :disabled="isLoading"
                @click="goToPage(page)"
              />
            </div>

            <span class="blog-page-label">
              Page {{ currentPage }} of {{ totalPages }}
              <span class="blog-page-range">({{ pageRangeLabel }})</span>
            </span>

            <button
              type="button"
              class="blog-page-btn blog-page-btn--arrow"
              :disabled="currentPage >= totalPages || isLoading"
              aria-label="Next page"
              @click="goToPage(currentPage + 1)"
            >
              ›
            </button>
          </nav>
        </div>
      </section>
    </main>

    <SiteFooter sectionId="blog-footer" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import NavBar from '../../components/NavBar.vue'
import SiteFooter from '../../components/sections/SiteFooter.vue'
import { cachePosts, fetchBlogPosts } from './blogApi'
import {
  BLOG_DEFAULT_SITE_ID,
  BLOG_LIST_PAGE_SIZE,
  enrichListCardImages,
  getListPageCache,
  mapPostToCardSync,
  setListPageCache,
  toBlogErrorMessage,
  type BlogCardPost,
} from './blogUtils'
import { useBlogCarouselSwipe } from './useBlogCarouselSwipe'

defineOptions({ name: 'BlogView' })

const currentPage = ref(1)
const carouselRef = ref<HTMLElement | null>(null)
const posts = ref<BlogCardPost[]>([])
const totalItems = ref(0)
const activeSiteId = ref(BLOG_DEFAULT_SITE_ID)
const isLoading = ref(false)
const errorMessage = ref('')

const totalPages = computed(() => Math.max(1, Math.ceil(totalItems.value / BLOG_LIST_PAGE_SIZE)))
const pageRangeLabel = computed(() => {
  if (totalItems.value === 0) return '0 of 0'
  const start = (currentPage.value - 1) * BLOG_LIST_PAGE_SIZE + 1
  const end = Math.min(currentPage.value * BLOG_LIST_PAGE_SIZE, totalItems.value)
  return `${start}-${end} of ${totalItems.value}`
})

let postsAbortController: AbortController | null = null

function scrollCarouselIntoView() {
  carouselRef.value?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
}

function goToPage(page: number) {
  if (isLoading.value) return
  const next = Math.min(Math.max(1, page), totalPages.value)
  if (next === currentPage.value) return
  currentPage.value = next
  scrollCarouselIntoView()
}

const { isDragging, dragOffsetX, onTouchStart, onTouchMove, onTouchEnd, onPointerDown, onPointerMove, onPointerUp } =
  useBlogCarouselSwipe(
    () => goToPage(currentPage.value - 1),
    () => goToPage(currentPage.value + 1),
    () => !isLoading.value && totalPages.value > 1,
  )

watch(currentPage, () => {
  void loadPosts({ preferCache: true })
})

watch(totalPages, (pages) => {
  if (currentPage.value > pages) {
    currentPage.value = pages
  }
})

onMounted(() => {
  void loadPosts({ preferCache: true })
})

function applyImageToCard(postId: string, imageUrl: string) {
  const target = posts.value.find((item) => item.id === postId)
  if (target && !target.imageUrl) {
    target.imageUrl = imageUrl
  }
}

async function loadPosts(options: { silent?: boolean; preferCache?: boolean } = {}) {
  const siteId = activeSiteId.value
  const page = currentPage.value

  if (options.preferCache) {
    const cached = getListPageCache(siteId, page)
    if (cached) {
      posts.value = cached.cards
      totalItems.value = cached.total
      isLoading.value = false
      errorMessage.value = ''
      void loadPosts({ silent: true })
      return
    }
  }

  if (postsAbortController) {
    postsAbortController.abort()
  }
  postsAbortController = new AbortController()
  const { signal } = postsAbortController

  if (!options.silent && posts.value.length === 0) {
    isLoading.value = true
  }
  if (!options.silent) {
    errorMessage.value = ''
  }

  try {
    const data = await fetchBlogPosts(siteId, page, BLOG_LIST_PAGE_SIZE, signal)
    if (signal.aborted) return

    const cards = data.items.map(mapPostToCardSync)
    cachePosts(siteId, data.items)
    setListPageCache(siteId, page, { cards, total: data.total ?? 0 })

    posts.value = cards
    totalItems.value = data.total ?? 0

    void enrichListCardImages(siteId, data.items, applyImageToCard, signal)
  } catch (error) {
    if (signal.aborted) return
    if (!options.silent) {
      posts.value = []
      totalItems.value = 0
      errorMessage.value = toBlogErrorMessage(error, 'Failed to load posts from API.')
    }
  } finally {
    if (!signal.aborted) {
      isLoading.value = false
    }
  }
}

function reloadCurrentPage() {
  void loadPosts()
}
</script>

<style scoped>
.blog-wrapper {
  width: 100%;
  min-height: 100vh;
  background: #eef1f4;
  overflow-x: hidden;
}

.blog-main {
  width: 100%;
  padding-top: 120px;
}

.blog-hero {
  padding: 48px 0 32px;
}

.blog-hero-inner {
  max-width: 920px;
}

.blog-eyebrow {
  margin: 0 0 12px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: #6b7280;
}

.blog-title {
  margin: 0 0 16px;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 800;
  line-height: 1.15;
  color: #0f2438;
}

.blog-lead {
  margin: 0;
  max-width: 720px;
  font-size: 16px;
  line-height: 1.65;
  color: #5c6570;
}

.blog-content {
  padding: 0 0 72px;
}

.blog-meta-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 14px;
  margin-bottom: 28px;
  padding: 18px 22px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(15, 36, 56, 0.06);
}

.blog-meta-pill {
  display: inline-block;
  padding: 6px 14px;
  border-radius: 999px;
  background: #e8ecf0;
  font-size: 13px;
  font-weight: 600;
  color: #374151;
}

.blog-meta-count,
.blog-meta-note {
  font-size: 14px;
  color: #5c6570;
}

.blog-carousel {
  position: relative;
  touch-action: pan-y;
  user-select: none;
  cursor: grab;
}

.blog-carousel:active {
  cursor: grabbing;
}

.blog-swipe-hint {
  position: absolute;
  left: 50%;
  bottom: -4px;
  transform: translateX(-50%);
  margin: 0;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(15, 36, 56, 0.88);
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.15s ease;
}

.blog-carousel:active .blog-swipe-hint,
.blog-swipe-hint--left,
.blog-swipe-hint--right {
  opacity: 1;
}

.blog-grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

.blog-load-state,
.blog-empty-state,
.blog-error-state {
  margin: 0;
  padding: 32px 20px;
  border-radius: 12px;
  background: #ffffff;
  color: #5c6570;
  text-align: center;
  box-shadow: 0 1px 3px rgba(15, 36, 56, 0.06);
}

.blog-error-state {
  color: #a12828;
}

.blog-error-state p {
  margin: 0 0 14px;
}

.blog-page-enter-active,
.blog-page-leave-active {
  transition: opacity 0.16s ease;
}

.blog-page-enter-from,
.blog-page-leave-to {
  opacity: 0;
}

.blog-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 22px 22px 20px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(15, 36, 56, 0.08);
  box-sizing: border-box;
}

.blog-card-image-wrap {
  margin: -22px -22px 14px;
  border-radius: 12px 12px 0 0;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  background: #e5e7eb;
}

.blog-card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.blog-card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
}

.blog-card-date {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: #6b7280;
  white-space: nowrap;
}

.blog-card-category {
  flex-shrink: 0;
  padding: 4px 10px;
  border-radius: 999px;
  background: #eef1f4;
  font-size: 11px;
  font-weight: 600;
  color: #4b5563;
  text-align: right;
}

.blog-card-title {
  margin: 0 0 12px;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-size: 1.125rem;
  font-weight: 800;
  line-height: 1.35;
  color: #0f2438;
}

.blog-card-excerpt {
  flex: 1;
  margin: 0 0 18px;
  font-size: 14px;
  line-height: 1.6;
  color: #5c6570;
}

.blog-card-link {
  display: block;
  width: calc(100% + 44px);
  margin: 4px -22px -20px;
  padding: 16px 22px;
  border-top: 1px solid #e5e7eb;
  font-size: 14px;
  font-weight: 700;
  color: #0f2438;
  text-decoration: none;
}

.blog-card-link:hover {
  color: var(--brand-red);
}

.blog-pagination {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 16px 20px;
  margin-top: 36px;
  padding-top: 8px;
}

.blog-page-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  height: 44px;
  padding: 0 14px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  background: #ffffff;
  color: #0f2438;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;
}

.blog-page-btn--arrow {
  font-size: 28px;
  line-height: 1;
  padding-bottom: 2px;
}

.blog-page-btn:hover:not(:disabled) {
  border-color: var(--brand-red);
  color: var(--brand-red);
}

.blog-page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.blog-page-dots {
  display: flex;
  align-items: center;
  gap: 10px;
}

.blog-page-dot {
  width: 10px;
  height: 10px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: #c5cdd6;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    background 0.2s ease;
}

.blog-page-dot:hover {
  background: #9ca3af;
}

.blog-page-dot--active {
  background: var(--brand-red);
  transform: scale(1.2);
}

.blog-page-label {
  font-size: 14px;
  font-weight: 600;
  color: #4b5563;
  min-width: 10rem;
  text-align: center;
}

.blog-page-range {
  display: block;
  margin-top: 2px;
  font-size: 12px;
  font-weight: 500;
  color: #6b7280;
}

@media (max-width: 1024px) {
  .blog-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
  .blog-main {
    padding-top: 100px;
  }

  .blog-hero {
    padding: 32px 0 24px;
  }
}

@media (max-width: 640px) {
  .blog-main {
    padding-top: 90px;
  }

  .blog-grid {
    grid-template-columns: 1fr;
    gap: 18px;
  }

  .blog-meta-bar {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .blog-card-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .blog-card-category {
    text-align: left;
  }

  .blog-pagination {
    gap: 12px;
  }

  .blog-page-label {
    order: -1;
    width: 100%;
  }
}
</style>
