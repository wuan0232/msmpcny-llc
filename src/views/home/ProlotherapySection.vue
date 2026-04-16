<template>
  <section :id="sectionId" class="service-section">
    <div class="service-hero">
      <img :src="heroImageSrc" alt="Prolotherapy hero" class="service-hero-image" />
    </div>

    <div class="service-content">
      <div class="service-panel">
        <div class="container">
          <div class="service-grid">
            <div class="service-copy">
              <h2 class="service-title">Natural Healing Stimulation</h2>
              <p class="service-body">
                Prolotherapy is a non-surgical, non-invasive treatment that can help you to stimulate your
                body's natural healing process and improve your pain management fast. We always offer quality
                care and personalized service at our small, privately owned practice. Make an appointment for
                top-of-the-line care today.
              </p>

              <p class="service-body">
                Find out more about our independent physician before you make your appointment with us today.
              </p>

              <h3 class="service-subtitle">Ligament and Tendon Regeneration</h3>
              <p class="service-body">
                Take advantage of this non-surgical process to strengthen and repair injured or painful joints
                and connective tissues. The therapeutic treatments that we offer at Musculoskeletal Medicine
                PC can help you get back on your feet and return to full functionality fast.
              </p>

              <button type="button" class="service-cta">
                Learn more about Prolotherapy
              </button>
            </div>

            <div class="service-side">
              <div class="service-callout">
                Call 315-478-9710 to schedule your Prolotherapy treatments today.
              </div>

              <div class="service-video-wrap">
                <video class="service-video" controls playsinline preload="metadata">
                  <source :src="videoSrc" type="video/mp4" />
                  Your browser does not support HTML5 video.
                </video>
              </div>

              <button type="button" class="service-caption-button" @click="openModal">
                Click Here for Closed Captioning
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isOpen" class="video-modal-backdrop" @click.self="closeModal">
      <div class="video-modal" role="dialog" aria-modal="true" aria-label="Prolotherapy video">
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
    heroImageSrc: string
    videoSrc: string
  }>(),
  {
    sectionId: 'therapy',
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
    // 自动播放可能被拦截，保留 controls 让用户手动播放
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
.service-section {
  --overlay-offset: 165px;
  background: #ffffff;
  scroll-margin-top: 90px;
}

.service-hero {
  width: 100%;
  background: #f2f2f2;
  height: var(--hero-h, 460px);
  overflow: hidden;
  position: sticky;
  top: 80px;
  z-index: 0;
}

.service-hero-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
}

.service-content {
  position: relative;
  z-index: 1;
  margin-top: calc(-1 * var(--overlay-offset, 120px));
  background: #ffffff;
  padding-bottom: 56px;
}

.service-panel {
  background: #ffffff;
  width: 100%;
  padding: 34px 0 0;
}

.service-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(320px, 0.75fr);
  gap: 44px;
  align-items: start;
}

.service-title {
  margin: 0 0 10px;
  color: var(--brand-red);
  text-align: left;
  font-size: 34px;
  font-weight: 800;
  line-height: 1.15;
}

.service-subtitle {
  margin: 26px 0 10px;
  color: #7a1f1b;
  font-size: 20px;
  font-weight: 800;
}

.service-body {
  margin: 0 0 14px;
  color: #4b4b4b;
  font-size: 14px;
  line-height: 1.6;
}

.service-cta {
  margin-top: 10px;
  background: var(--brand-red);
  color: #ffffff;
  border: 0;
  border-radius: 2px;
  padding: 10px 20px;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
}

.service-side {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.service-callout {
  width: 100%;
  background: var(--brand-red);
  color: #ffffff;
  text-align: center;
  font-size: 15px;
  line-height: 1.45;
  font-weight: 800;
  padding: 18px 18px;
}

.service-video-wrap {
  width: 100%;
  background: #111111;
  margin-top: 26px;
}

.service-video {
  width: 100%;
  display: block;
  aspect-ratio: 16 / 9;
}

.service-caption-button {
  margin-top: 12px;
  width: 100%;
  max-width: 245px;
  background: var(--brand-red);
  color: #ffffff;
  border: 0;
  border-radius: 2px;
  padding: 9px 12px;
  font-size: 11px;
  font-weight: 800;
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
}

.video-description {
  margin: 10px 8px 0;
  color: #666666;
  font-size: 15px;
  line-height: 1.55;
}

@media (max-width: 900px) {
  .service-section {
    --overlay-offset: 92px;
  }

  .service-grid {
    grid-template-columns: 1fr;
    gap: 26px;
  }

  .service-side {
    align-items: stretch;
  }

  .service-caption-button {
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .service-section {
    scroll-margin-top: 72px;
    --overlay-offset: 56px;
  }

  .service-title {
    font-size: 28px;
  }

  .service-caption-button {
    max-width: 100%;
  }

  .video-modal {
    width: min(100%, 94vw);
    padding: 18px 12px 16px;
    border-radius: 12px;
  }
}
</style>
