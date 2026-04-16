<template>
  <section :id="sectionId" :class="sectionClass">
    <div :class="heroClass">
      <img :src="heroImageSrc" :alt="heroAlt" :class="heroImageClass" />
    </div>

    <div :class="contentClass">
      <div :class="panelClass">
        <div class="container">
          <div :class="gridClass">
            <div :class="copyClass">
              <h2 :class="titleClass">{{ title }}</h2>
              <slot name="content"></slot>
            </div>

            <div :class="sideClass">
              <div :class="calloutClass">
                {{ calloutText }}
              </div>

              <div :class="videoWrapClass">
                <video :class="videoClass" controls playsinline preload="metadata">
                  <source :src="videoSrc" type="video/mp4" />
                  Your browser does not support HTML5 video.
                </video>
              </div>

              <button type="button" :class="captionButtonClass" @click="openModal">
                Click Here for Closed Captioning
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isOpen" class="video-modal-backdrop" @click.self="closeModal">
      <div class="video-modal" role="dialog" aria-modal="true" :aria-label="videoModalLabel">
        <button type="button" class="video-close" aria-label="Close video" @click="closeModal">
          ×
        </button>

        <div class="video-player-wrap">
          <video
            ref="videoRef"
            class="video-player"
            controls
            autoplay
            playsinline
          >
            <source :src="videoSrc" type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
        </div>

        <p class="video-description">
          {{ videoDescription }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch, computed } from 'vue'

const props = withDefaults(
  defineProps<{
    sectionId?: string
    sectionClass?: string
    heroClass?: string
    heroImageClass?: string
    heroAlt?: string
    contentClass?: string
    panelClass?: string
    gridClass?: string
    copyClass?: string
    titleClass?: string
    sideClass?: string
    calloutClass?: string
    videoWrapClass?: string
    videoClass?: string
    captionButtonClass?: string
    videoModalLabel?: string
    heroImageSrc: string
    videoSrc: string
    title: string
    calloutText: string
    videoDescription: string
  }>(),
  {
    sectionId: 'section',
    sectionClass: 'content-section',
    heroClass: 'content-hero',
    heroImageClass: 'content-hero-image',
    heroAlt: 'Hero image',
    contentClass: 'content-content',
    panelClass: 'content-panel',
    gridClass: 'content-grid',
    copyClass: 'content-copy',
    titleClass: 'content-title',
    sideClass: 'content-side',
    calloutClass: 'content-callout',
    videoWrapClass: 'content-video-wrap',
    videoClass: 'content-video',
    captionButtonClass: 'content-caption-button',
    videoModalLabel: 'Video modal',
  },
)

const { sectionId, heroImageSrc, videoSrc } = props

const isOpen = ref(false)
const videoRef = ref<HTMLVideoElement | null>(null)

const openModal = async () => {
  isOpen.value = true
  await nextTick()
  try {
    await videoRef.value?.play()
  } catch {
    // 浏览器可能阻止自动播放，保留 controls 让用户手动播放
  }
}

const closeModal = () => {
  videoRef.value?.pause()
  isOpen.value = false
}

watch(isOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

onBeforeUnmount(() => {
  document.body.style.overflow = ''
})
</script>

<style scoped>
.video-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: grid;
  place-items: center;
  background: rgba(0, 0, 0, 0.45);
  padding: 24px;
}

.video-modal {
  position: relative;
  width: min(100%, 740px);
  background: #ffffff;
  border: 3px solid var(--brand-red);
  border-radius: 14px;
  padding: 20px 16px 18px;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.28);
}

.video-close {
  position: absolute;
  top: 6px;
  right: 10px;
  border: 0;
  background: transparent;
  color: #222222;
  font-size: 28px;
  line-height: 1;
  cursor: pointer;
  z-index: 2;
  padding: 0;
}

.video-player-wrap {
  background: #111111;
  margin-top: 2px;
}

.video-player {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 8.2;
}

.video-description {
  margin: 10px 8px 0;
  color: #666666;
  font-size: 15px;
  line-height: 1.55;
}

@media (max-width: 768px) {
  .video-modal {
    width: min(100%, 94vw);
    padding: 18px 12px 16px;
    border-radius: 12px;
  }

  .video-close {
    top: 4px;
    right: 8px;
    font-size: 24px;
  }

  .video-description {
    margin: 10px 2px 0;
    font-size: 13px;
    line-height: 1.5;
  }
}
</style>
