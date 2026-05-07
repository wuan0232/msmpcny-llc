<template>
  <div class="prolozone-wrapper">
    <NavBar />

    <main class="prolozone-main">
      <section id="prolozone" class="prolozone-section">
        <div class="prolozone-hero">
          <img
            src="https://le-cdn.hibuwebsites.com/4f7ab16b56fa4b438d877a564ca53166/dms3rep/multi/opt/prolozone-hero-2880w.jpg"
            alt="Prolozone hero" class="prolozone-hero-image" />
        </div>

        <div class="prolozone-content">
          <div class="prolozone-panel">
            <div class="container">
              <div class="prolozone-grid">
                <div class="prolozone-copy">
                  <h2 class="prolozone-title">Permanent Pain Treatments</h2>
                  <p class="prolozone-body">
                    Chronic pain can make your life very difficult to live with. Find the relief that you
                    need when you trust Musculoskeletal Medicine PC to offer you Prolozone treatments.
                    This permanent, non-surgical treatment is ideal for taking care of your chronic pain
                    and aiding you in your recovery.
                  </p>

                  <p class="prolozone-body">
                    Find out more about our independent physician that has served patients in the area
                    loyally since 2001.
                  </p>

                  <h3 class="prolozone-subtitle">Tissue Injection Therapy</h3>
                  <p class="prolozone-body">
                    Prolozone is a connective tissue injection therapy involving an injection of
                    collagen-producing substances and ozone gas that can help reconstruct damaged or
                    weakened connective tissue. Make an appointment today to get relief from your chronic
                    pain with our Prolozone treatments.
                  </p>

                  <a
                    href="/pdf/Prolozone.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="prolozone-cta"
                  >
                    Learn more about Prolozone
                  </a>
                </div>

                <div class="prolozone-side">
                  <div class="prolozone-callout">
                    Call (929) 399-3134 to schedule your Prolozone treatments today.
                  </div>

                  <div class="prolozone-video-wrap">
                    <video class="prolozone-video" controls playsinline preload="metadata">
                      <source src="/videos/musculoskeletal-medicine-gbjxb8zma-a03tk3.mp4" type="video/mp4" />
                      Your browser does not support HTML5 video.
                    </video>
                  </div>

                  <button type="button" class="prolozone-caption-button" @click="openModal">
                    Click Here for Closed Captioning
                  </button>
                </div>
              </div>
            </div>

            <SiteFooter sectionId="contact" />
          </div>
        </div>
      </section>
    </main>

    <div v-if="isOpen" class="video-modal-backdrop" @click.self="closeModal">
      <div class="video-modal" role="dialog" aria-modal="true" aria-label="Prolozone video">
        <button type="button" class="video-close" aria-label="Close video" @click="closeModal">×</button>
        <div class="video-player-wrap">
          <video ref="videoRef" class="video-player" controls autoplay playsinline>
            <source src="/videos/musculoskeletal-medicine-gbjxb8zma-a03tk3.mp4" type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'
import NavBar from '../../components/NavBar.vue'
import SiteFooter from '../../components/sections/SiteFooter.vue'

const isOpen = ref(false)
const videoRef = ref<HTMLVideoElement | null>(null)

const openModal = async () => {
  isOpen.value = true
  await nextTick()
  try {
    await videoRef.value?.play()
  } catch {
    // autoplay may be blocked by browser
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
.prolozone-wrapper {
  width: 100%;
  min-height: 100vh;
  background: #ffffff;
  overflow-x: hidden;
}

.prolozone-main {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.prolozone-section {
  background: #ffffff;
  scroll-margin-top: 120px;
  padding-top: 120px;
}

.prolozone-hero {
  width: 100%;
  height: calc(100vh - 120px);
  min-height: 500px;
  overflow: hidden;
  position: relative;
}

.prolozone-hero-image {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: center top;
}

.prolozone-content {
  position: relative;
  background: #ffffff;
  margin-top: -80px;
  padding-top: 80px;
}

.prolozone-panel {
  width: 100%;
  background: #ffffff;
  padding-top: 34px;
}

.prolozone-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(280px, 0.75fr);
  gap: 36px;
  align-items: start;
  padding-bottom: 48px;
}

.prolozone-title {
  margin: 0 0 16px;
  color: var(--brand-red);
  font-size: 52px;
  line-height: 1.08;
  font-weight: 800;
}

.prolozone-subtitle {
  margin: 24px 0 12px;
  color: var(--brand-red);
  font-size: 44px;
  line-height: 1.12;
  font-weight: 800;
}

.prolozone-body {
  margin: 0 0 18px;
  color: #4a4a4a;
  font-size: 13px;
  line-height: 1.55;
}

.prolozone-cta {
  margin-top: 8px;
  background: var(--brand-red);
  color: #ffffff;
  border: 0;
  border-radius: 3px;
  padding: 11px 22px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
}

.prolozone-side {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.prolozone-callout {
  width: 100%;
  background: var(--brand-red);
  color: #ffffff;
  text-align: center;
  font-size: 20px;
  line-height: 1.35;
  font-weight: 700;
  padding: 22px 18px;
  margin-bottom: 20px;
}

.prolozone-video-wrap {
  width: 100%;
  background: #111111;
}

.prolozone-video {
  width: 100%;
  display: block;
  aspect-ratio: 16 / 9;
}

.prolozone-caption-button {
  margin-top: 12px;
  width: 100%;
  max-width: 290px;
  background: var(--brand-red);
  color: #ffffff;
  border: 0;
  border-radius: 3px;
  padding: 10px 14px;
  font-size: 16px;
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
  width: min(100%, 980px);
  background: #ffffff;
  border: 3px solid var(--brand-red);
  border-radius: 14px;
  padding: 16px;
}

.video-close {
  position: absolute;
  top: 4px;
  right: 10px;
  border: 0;
  background: transparent;
  color: #222222;
  font-size: 34px;
  line-height: 1;
  cursor: pointer;
}

.video-player-wrap {
  background: #111111;
}

.video-player {
  width: 100%;
  display: block;
  aspect-ratio: 16 / 9;
}

@media (max-width: 900px) {
  .prolozone-section {
    --overlay-offset: 90px;
  }

  .prolozone-grid {
    grid-template-columns: 1fr;
  }

  .prolozone-title {
    font-size: 34px;
  }

  .prolozone-subtitle {
    font-size: 28px;
  }
}

@media (max-width: 768px) {
  .prolozone-section {
    --overlay-offset: 58px;
    scroll-margin-top: 72px;
  }

  .prolozone-hero {
    top: 72px;
    height: calc(100vh - 72px);
    min-height: 420px;
  }

  .prolozone-callout {
    font-size: 18px;
  }

  .prolozone-caption-button {
    font-size: 14px;
  }
}
</style>
