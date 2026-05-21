<template>
  <div class="blog-detail-wrapper">
    <NavBar />

    <main class="blog-detail-main">
      <section class="blog-detail-section">
        <div class="container blog-detail-container">
          <RouterLink class="back-link" :to="{ name: 'blog' }">← Back to blog</RouterLink>

          <div v-if="isLoading" class="detail-state">Loading article...</div>
          <div v-else-if="errorMessage" class="detail-state detail-state-error">
            <p>{{ errorMessage }}</p>
            <button type="button" class="retry-btn" @click="loadDetail">Retry</button>
          </div>
          <article v-else-if="post" class="detail-card">
            <p class="detail-date">{{ formatDate(post.createdAt ?? '') }}</p>
            <h1 class="detail-title">{{ post.title }}</h1>
            <p v-if="post.excerpt" class="detail-excerpt">{{ post.excerpt }}</p>

            <section
              v-for="(section, index) in sectionBlocks"
              :key="`${post.id}-${index}`"
              class="detail-content-section"
            >
              <h2 v-if="section.heading" class="section-heading">{{ section.heading }}</h2>
              <img
                v-if="section.imageUrl"
                :src="section.imageUrl"
                :alt="section.imageAlt || post.title"
                class="section-image"
                loading="lazy"
                decoding="async"
              />
              <p v-for="(paragraph, pIndex) in section.texts" :key="`${index}-${pIndex}`" class="section-text">
                {{ paragraph }}
              </p>
            </section>
          </article>
        </div>
      </section>
    </main>

    <SiteFooter sectionId="blog-detail-footer" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import NavBar from '../../components/NavBar.vue'
import SiteFooter from '../../components/sections/SiteFooter.vue'
import { fetchBlogImage, findBlogPostById, type BlogListPost } from './blogApi'
import { cachePosts, getCachedPost } from './blogState'

interface SectionBlock {
  heading: string
  texts: string[]
  imageUrl: string
  imageAlt: string
}

const route = useRoute()
const post = ref<BlogListPost | null>(null)
const isLoading = ref(true)
const errorMessage = ref('')

const siteId = computed(() => {
  const value = route.query.site
  return typeof value === 'string' && value.trim() ? value.trim() : 'msmpcny'
})

const postId = computed(() => {
  const value = route.params.postId
  return typeof value === 'string' ? value : ''
})

const sectionBlocks = computed<SectionBlock[]>(() => {
  const current = post.value
  if (!current) return []

  const blocks: SectionBlock[] = []
  for (const section of current.sections ?? []) {
    const heading = (section.heading ?? '').trim()
    const texts: string[] = []

    if (section.body && section.body.trim()) {
      texts.push(section.body.trim())
    }

    for (const paragraph of section.paragraphs ?? []) {
      const text = ((paragraph as { text?: string }).text ?? '').trim()
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

  if (blocks.length === 0) {
    return [
      {
        heading: '',
        texts: current.excerpt ? [current.excerpt] : ['No detail content available.'],
        imageUrl: '',
        imageAlt: '',
      },
    ]
  }

  return blocks
})

onMounted(() => {
  void loadDetail()
})

async function loadDetail() {
  isLoading.value = true
  errorMessage.value = ''

  try {
    if (!postId.value) {
      throw new Error('Missing article id')
    }

    let found = getCachedPost(siteId.value, postId.value)
    if (!found) {
      found = await findBlogPostById(siteId.value, postId.value)
      if (found) {
        cachePosts(siteId.value, [found])
      }
    }

    if (!found) {
      throw new Error('Article not found')
    }

    post.value = await hydratePostImages(found)
  } catch (error) {
    post.value = null
    errorMessage.value = error instanceof Error ? error.message : 'Failed to load article.'
  } finally {
    isLoading.value = false
  }
}

async function hydratePostImages(input: BlogListPost): Promise<BlogListPost> {
  const clone: BlogListPost = JSON.parse(JSON.stringify(input)) as BlogListPost

  for (const section of clone.sections ?? []) {
    for (const paragraph of section.paragraphs ?? []) {
      const image = paragraph.image
      if (!image || image.url || !image.id) continue
      try {
        const details = await fetchBlogImage(siteId.value, image.id)
        image.url = details.url
        if (!image.alt && details.alt) {
          image.alt = details.alt
        }
      } catch {
        // Keep rendering text even if image detail request fails.
      }
    }
  }

  return clone
}

function formatDate(dateValue: string): string {
  if (!dateValue) return 'N/A'
  const date = new Date(dateValue)
  if (Number.isNaN(date.getTime())) return dateValue
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}
</script>

<style scoped>
.blog-detail-wrapper {
  width: 100%;
  min-height: 100vh;
  background: #eef1f4;
  overflow-x: hidden;
}

.blog-detail-main {
  padding-top: 120px;
}

.blog-detail-section {
  padding: 32px 0 72px;
}

.blog-detail-container {
  max-width: 920px;
}

.back-link {
  display: inline-block;
  margin-bottom: 18px;
  color: #0f2438;
  font-weight: 700;
}

.detail-state {
  padding: 28px 20px;
  background: #fff;
  border-radius: 12px;
  color: #4b5563;
}

.detail-state-error {
  color: #a12828;
}

.detail-state-error p {
  margin: 0 0 12px;
}

.retry-btn {
  border: 1px solid #d1d5db;
  background: #ffffff;
  border-radius: 8px;
  padding: 8px 14px;
  cursor: pointer;
}

.detail-card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(15, 36, 56, 0.06);
  padding: 30px;
}

.detail-date {
  margin: 0 0 6px;
  font-size: 13px;
  color: #6b7280;
  font-weight: 700;
}

.detail-title {
  margin: 0 0 14px;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-size: clamp(1.7rem, 3.5vw, 2.3rem);
  line-height: 1.25;
  color: #0f2438;
}

.detail-excerpt {
  margin: 0 0 20px;
  color: #4b5563;
  font-size: 16px;
  line-height: 1.7;
}

.detail-content-section + .detail-content-section {
  margin-top: 26px;
  padding-top: 18px;
  border-top: 1px solid #e5e7eb;
}

.section-heading {
  margin: 0 0 10px;
  font-size: 1.2rem;
  color: #0f2438;
}

.section-image {
  width: 100%;
  max-height: 420px;
  object-fit: cover;
  display: block;
  border-radius: 10px;
  margin: 0 0 14px;
}

.section-text {
  margin: 0 0 12px;
  line-height: 1.75;
  color: #374151;
}

@media (max-width: 900px) {
  .blog-detail-main {
    padding-top: 100px;
  }

  .detail-card {
    padding: 22px;
  }
}
</style>
