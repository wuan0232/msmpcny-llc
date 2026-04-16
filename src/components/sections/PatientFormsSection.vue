<template>
  <section :id="sectionId" class="patient-forms-section">
    <div class="patient-forms-hero">
      <img :src="heroImageSrc" alt="Patient forms hero" class="patient-forms-hero-image" />
    </div>

    <div class="patient-forms-content">
      <div class="patient-forms-panel">
        <div class="container">
          <div class="patient-forms-grid">
            <div class="patient-forms-copy">
              <h2 class="patient-forms-title">Patient Forms</h2>
              <p class="patient-forms-body">
                Musculoskeletal Medicine, P.C. is an independent physician practice that has been serving
                the local area since 2001. Below are our forms for new patients, you can call us at
                <a href="tel:3154789710">315-478-9710</a> with any questions you may have.
              </p>

              <ul class="patient-forms-links">
                <li v-for="item in formLinks" :key="item.label">
                  <a :href="item.href" target="_blank" rel="noopener noreferrer">
                    {{ item.label }}
                  </a>
                </li>
              </ul>
            </div>

            <div class="patient-forms-side">
              <div class="patient-callout">
                Call 315-478-9710 to schedule your Prolotherapy treatments today.
              </div>

              <div class="patient-video-wrap">
                <video class="patient-video" controls playsinline preload="metadata">
                  <source :src="videoSrc" type="video/mp4" />
                  Your browser does not support HTML5 video.
                </video>
              </div>

              <button type="button" class="patient-caption-button" @click="openModal">
                Click Here for Closed Captioning
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isOpen" class="video-modal-backdrop" @click.self="closeModal">
      <div class="video-modal" role="dialog" aria-modal="true" aria-label="Patient forms video">
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
    sectionId: 'forms',
  },
)

const { sectionId, heroImageSrc, videoSrc } = props

const formLinks = [
  { label: 'New Patient Forms', href: 'https://www.msmpcny.com/patient-forms' },
  { label: 'New Patient Consent Forms', href: 'https://www.msmpcny.com/patient-forms' },
  { label: 'Patient Information Form', href: 'https://www.msmpcny.com/patient-forms' },
  { label: 'Patient History Form', href: 'https://www.msmpcny.com/patient-forms' },
  { label: 'Patient Pain Diagram', href: 'https://www.msmpcny.com/patient-forms' },
]

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
.patient-forms-section {
  --overlay-offset: 185px;
  background: #ffffff;
  scroll-margin-top: 90px;
  width: 100%;
  overflow-x: hidden;
}

.patient-forms-hero {
  width: 100%;
  background: #f2f2f2;
  height: 100vh;
  overflow: hidden;
  position: sticky;
  top: 0;
  z-index: 0;
  box-sizing: border-box;
}

.patient-forms-hero-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
}

.patient-forms-content {
  position: relative;
  z-index: 1;
  margin-top: calc(-1 * var(--overlay-offset, 120px));
  background: #ffffff;
  padding-bottom: 56px;
}

.patient-forms-panel {
  background: #ffffff;
  width: 100%;
  padding: 34px 0 0;
  box-shadow: 0 0 0 rgba(0, 0, 0, 0);
}

.patient-forms-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(250px, 0.7fr);
  gap: 48px;
  align-items: start;
  width: 100%;
  box-sizing: border-box;
}

.patient-forms-title {
  margin: 0 0 12px;
  color: var(--brand-red);
  font-size: 28px;
  line-height: 1.2;
  text-align: center;
}

.patient-forms-body {
  margin: 0 0 22px;
  max-width: 560px;
  color: #4a4a4a;
  font-size: 14px;
  line-height: 1.6;
}

.patient-forms-body a {
  color: inherit;
  font-weight: 700;
}

.patient-forms-links {
  margin: 0;
  padding-left: 28px;
  color: #222222;
}

.patient-forms-links li {
  margin: 7px 0;
}

.patient-forms-links a {
  color: #3b2b2b;
  text-decoration: underline;
  font-weight: 700;
}

.patient-forms-side {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.patient-callout {
  width: 100%;
  background: var(--brand-red);
  color: #ffffff;
  text-align: center;
  font-size: 16px;
  line-height: 1.45;
  font-weight: 700;
  padding: 18px 22px;
  margin-bottom: 28px;
}

.patient-video-wrap {
  width: 100%;
  background: #111111;
}

.patient-video {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #111111;
}

.patient-caption-button {
  margin-top: 10px;
  min-width: 216px;
  background: var(--brand-red);
  color: #ffffff;
  border: 0;
  border-radius: 3px;
  padding: 10px 16px;
  font-size: 11px;
  font-weight: 700;
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

.video-description {
  margin: 10px 8px 0;
  color: #666666;
  font-size: 15px;
  line-height: 1.55;
}

@media (max-width: 900px) {
  .patient-forms-section {
    --hero-h: 320px;
    --overlay-offset: 86px;
  }

  .patient-forms-hero-image {
    /* 高度由 --hero-h 控制 */
  }

  .patient-forms-grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .patient-forms-title {
    text-align: left;
  }
}

@media (max-width: 768px) {
  .patient-forms-section {
    scroll-margin-top: 72px;
    --overlay-offset: 50px;
  }

  .patient-forms-content {
    padding-bottom: 40px;
  }

  .patient-forms-hero {
    top: 72px;
  }

  .patient-forms-panel {
    padding-top: 24px;
  }

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

