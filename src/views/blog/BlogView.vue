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
            <span class="blog-meta-count">{{ blogPosts.length }} sample articles</span>
            <span class="blog-meta-note">Preview content only</span>
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
            <Transition name="blog-page" mode="out-in">
              <ul :key="currentPage" class="blog-grid">
                <li v-for="post in paginatedPosts" :key="post.id" class="blog-card-item">
                  <article class="blog-card">
                    <header class="blog-card-header">
                      <time class="blog-card-date" :datetime="post.date">{{ post.date }}</time>
                      <span class="blog-card-category">{{ post.category }}</span>
                    </header>

                    <h2 class="blog-card-title">{{ post.title }}</h2>

                    <p class="blog-card-excerpt">{{ post.excerpt }}</p>

                    <span class="blog-card-link" aria-hidden="true">Read article details</span>
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

          <nav class="blog-pagination" aria-label="Blog articles pagination">
            <button
              type="button"
              class="blog-page-btn blog-page-btn--arrow"
              :disabled="currentPage <= 1"
              aria-label="Previous page"
              @click="goPrev"
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
              :disabled="currentPage >= totalPages"
              aria-label="Next page"
              @click="goNext"
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
import { computed, ref, watch } from 'vue'
import NavBar from '../../components/NavBar.vue'
import SiteFooter from '../../components/sections/SiteFooter.vue'
import { blogPosts } from './blogPosts'

const PAGE_SIZE = 9
const SWIPE_THRESHOLD = 56

const currentPage = ref(1)
const carouselRef = ref<HTMLElement | null>(null)

const totalPages = computed(() => Math.max(1, Math.ceil(blogPosts.length / PAGE_SIZE)))

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  return blogPosts.slice(start, start + PAGE_SIZE)
})

const pageRangeLabel = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE + 1
  const end = Math.min(currentPage.value * PAGE_SIZE, blogPosts.length)
  return `${start}–${end} of ${blogPosts.length}`
})

watch(totalPages, (pages) => {
  if (currentPage.value > pages) {
    currentPage.value = pages
  }
})

function scrollCarouselIntoView() {
  carouselRef.value?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
}

function goToPage(page: number) {
  const next = Math.min(Math.max(1, page), totalPages.value)
  if (next === currentPage.value) return
  currentPage.value = next
  scrollCarouselIntoView()
}

function goPrev() {
  goToPage(currentPage.value - 1)
}

function goNext() {
  goToPage(currentPage.value + 1)
}

/* Touch swipe */
let touchStartX = 0

function onTouchStart(event: TouchEvent) {
  touchStartX = event.touches[0]?.clientX ?? 0
  dragOffsetX.value = 0
  isDragging.value = true
}

function onTouchMove(event: TouchEvent) {
  if (!isDragging.value) return
  const x = event.touches[0]?.clientX ?? 0
  dragOffsetX.value = x - touchStartX
}

function onTouchEnd() {
  finishSwipe(dragOffsetX.value)
  dragOffsetX.value = 0
  isDragging.value = false
}

/* Pointer swipe (mouse / pen) */
const isDragging = ref(false)
const dragOffsetX = ref(0)
let pointerStartX = 0
let pointerId: number | null = null

function onPointerDown(event: PointerEvent) {
  if (event.pointerType === 'touch') return
  pointerId = event.pointerId
  pointerStartX = event.clientX
  dragOffsetX.value = 0
  isDragging.value = true
  ;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)
}

function onPointerMove(event: PointerEvent) {
  if (!isDragging.value || event.pointerId !== pointerId) return
  dragOffsetX.value = event.clientX - pointerStartX
}

function onPointerUp(event: PointerEvent) {
  if (event.pointerId !== pointerId) return
  try {
    ;(event.currentTarget as HTMLElement).releasePointerCapture(event.pointerId)
  } catch {
    /* already released */
  }
  if (isDragging.value && event.pointerType !== 'touch') {
    finishSwipe(dragOffsetX.value)
  }
  dragOffsetX.value = 0
  isDragging.value = false
  pointerId = null
}

function finishSwipe(deltaX: number) {
  if (deltaX <= -SWIPE_THRESHOLD) {
    goNext()
    return
  }
  if (deltaX >= SWIPE_THRESHOLD) {
    goPrev()
  }
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

.blog-page-enter-active,
.blog-page-leave-active {
  transition:
    opacity 0.28s ease,
    transform 0.28s ease;
}

.blog-page-enter-from {
  opacity: 0;
  transform: translateX(24px);
}

.blog-page-leave-to {
  opacity: 0;
  transform: translateX(-24px);
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
  align-self: flex-start;
  font-size: 14px;
  font-weight: 700;
  color: #0f2438;
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
