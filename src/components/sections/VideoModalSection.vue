<template>
  <section :id="sectionId" class="video-section">
    <div class="container video-inner">
      <div class="video-preview" role="button" tabindex="0" @click="openModal" @keydown.enter="openModal" @keydown.space.prevent="openModal">
        <div class="video-preview-overlay">
          <p class="video-preview-copy">
            Watch our<br />
            30-second video<br />
            to learn more about<br />
            <strong>Musculoskeletal Medicine, P.C.</strong>
          </p>
        </div>
      </div>

      <button type="button" class="video-caption-button" @click="openModal">
        Click Here for Closed Captioning
      </button>
    </div>

    <div v-if="isOpen" class="video-modal-backdrop" @click.self="closeModal">
      <div class="video-modal" role="dialog" aria-modal="true" aria-label="Intro video">
        <button type="button" class="video-close" aria-label="Close video" @click="closeModal">
          ×
        </button>

        <div class="video-player-wrap">
          <video
            v-if="!hasVideoError"
            ref="videoRef"
            class="video-player"
            controls
            autoplay
            playsinline
            @error="handleVideoError"
          >
            <source :src="videoSrc" type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>

          <div v-else class="video-fallback">
            <p class="video-fallback-title">视频文件暂未放入项目。</p>
            <p class="video-fallback-text">
              请把视频放到 <code>public/videos/clinic-intro.mp4</code>，
              或者把组件里的 <code>videoSrc</code> 改成你的实际文件路径。
            </p>
          </div>
        </div>

        <p class="video-description">
          Our goal at Musculoskeletal Medicine PC, since 2001, is to properly evaluate and effectively
          treat acute and chronic pain. We specialize in multiple traditional as well as nontraditional,
          nonsurgical treatment options. Give us a call today or visit us online for more information.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    sectionId?: string
    videoSrc?: string
  }>(),
  {
    videoSrc: '/videos/clinic-intro.mp4',
  },
)

const { sectionId, videoSrc } = props

const isOpen = ref(false)
const hasVideoError = ref(false)
const videoRef = ref<HTMLVideoElement | null>(null)

const openModal = async () => {
  isOpen.value = true
  hasVideoError.value = false

  await nextTick()
  try {
    await videoRef.value?.play()
  } catch {
    // 自动播放可能被浏览器拦截，保留 controls 让用户手动播放
  }
}

const closeModal = () => {
  videoRef.value?.pause()
  isOpen.value = false
}

const handleVideoError = () => {
  hasVideoError.value = true
}

watch(isOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

onBeforeUnmount(() => {
  document.body.style.overflow = ''
})
</script>

<style scoped>
.video-section {
  background: #ffffff;
  padding: 52px 0 68px;
  scroll-margin-top: 90px;
}

.video-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.video-preview {
  width: min(100%, 340px);
  aspect-ratio: 16 / 9;
  background: linear-gradient(180deg, #7a1f1b 0%, #1a1515 100%);
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.18);
}

.video-preview-overlay {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  padding: 24px;
  text-align: center;
}

.video-preview-copy {
  margin: 0;
  color: #ffffff;
  font-size: 17px;
  line-height: 1.35;
}

.video-preview-copy strong {
  display: block;
  margin-top: 6px;
  font-size: 18px;
}

.video-caption-button {
  margin-top: 8px;
  min-width: 166px;
  background: var(--brand-red);
  color: #ffffff;
  border: 0;
  border-radius: 2px;
  padding: 8px 16px;
  font-size: 11px;
  cursor: pointer;
}

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
  background: linear-gradient(180deg, #7a1f1b 0%, #1a1515 100%);
}

.video-fallback {
  display: grid;
  place-items: center;
  min-height: 320px;
  padding: 24px;
  text-align: center;
  color: #ffffff;
  background: linear-gradient(180deg, #7a1f1b 0%, #1a1515 100%);
}

.video-fallback-title {
  margin: 0 0 10px;
  font-size: 28px;
  font-weight: 800;
}

.video-fallback-text {
  max-width: 620px;
  margin: 0;
  font-size: 17px;
  line-height: 1.6;
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

  .video-fallback {
    min-height: 200px;
  }
}
</style>

