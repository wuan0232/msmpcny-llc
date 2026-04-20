<template>
  <div class="prp-wrapper">
    <NavBar />

    <main class="prp-main">
      <section id="prp" class="prp-section">
        <div class="prp-hero">
          <img
            src="https://le-cdn.hibuwebsites.com/4f7ab16b56fa4b438d877a564ca53166/dms3rep/multi/opt/platelet-rich-plasma-hero-2880w.jpg"
            alt="Platelet rich plasma hero"
            class="prp-hero-image"
          />
        </div>

        <div class="prp-content">
          <div class="prp-panel">
            <div class="container">
              <div class="prp-grid">
                <div class="prp-copy">
                  <h2 class="prp-title">Regenerative Healing</h2>
                  <p class="prp-body">
                    Musculoskeletal Medicine PC offers a wide range of non-operative, non-surgical pain relief
                    solutions, including PRP or Platelet-Rich Plasma treatments. This non-steroidal alternative
                    medical treatment relieves pain by naturally promoting the long-lasting healing of
                    musculoskeletal conditions.
                  </p>

                  <p class="prp-body">
                    Find out more about our
                    <a class="prp-link" href="/about">independent physician</a>
                    before making an appointment with us today.
                  </p>

                  <h3 class="prp-subtitle">Treatments Performed With Visualization</h3>
                  <p class="prp-body">
                    Let our treatments help you get back on your feet again through your body's natural healing
                    process. We utilize ultrasounds and fluoroscopy to get an idea of how the treatment is taking
                    effect, so you can rest assured that the treatments you receive will work. Visit us today!
                  </p>

                  <button type="button" class="prp-cta">Learn more about Platelet Rich Plasma</button>
                </div>

                <div class="prp-side">
                  <div class="prp-callout">
                    Call 315-478-9710 to schedule your Platelet-Rich Plasma treatments today.
                  </div>

                  <div class="prp-video-wrap">
                    <video class="prp-video" controls playsinline preload="metadata">
                      <source src="/videos/musculoskeletal-medicine-gbjxb8zma-a03tk3.mp4" type="video/mp4" />
                      Your browser does not support HTML5 video.
                    </video>
                  </div>

                  <button type="button" class="prp-caption-button" @click="openModal">
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
      <div class="video-modal" role="dialog" aria-modal="true" aria-label="PRP video">
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
.prp-wrapper {
  width: 100%;
  min-height: 100vh;
  background: #ffffff;
  overflow-x: hidden;
}

.prp-main {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.prp-section {
  background: #ffffff;
  scroll-margin-top: 120px;
  padding-top: 120px;
}

.prp-hero {
  width: 100%;
  height: calc(100vh - 120px);
  min-height: 500px;
  overflow: hidden;
  position: relative;
}

.prp-hero-image {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: center top;
}

.prp-content {
  position: relative;
  background: #ffffff;
  margin-top: -80px;
  padding-top: 80px;
}

.prp-panel {
  width: 100%;
  background: #ffffff;
  padding-top: 34px;
}

.prp-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(280px, 0.75fr);
  gap: 36px;
  align-items: start;
  padding-bottom: 48px;
}

.prp-title {
  margin: 0 0 16px;
  color: var(--brand-red);
  font-size: 52px;
  line-height: 1.08;
  font-weight: 800;
}

.prp-subtitle {
  margin: 24px 0 12px;
  color: var(--brand-red);
  font-size: 44px;
  line-height: 1.12;
  font-weight: 800;
}

.prp-body {
  margin: 0 0 18px;
  color: #4a4a4a;
  font-size: 13px;
  line-height: 1.55;
}

.prp-link {
  color: var(--brand-red);
  text-decoration: underline;
  font-weight: 700;
}

.prp-cta {
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

.prp-side {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.prp-callout {
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

.prp-video-wrap {
  width: 100%;
  background: #111111;
}

.prp-video {
  width: 100%;
  display: block;
  aspect-ratio: 16 / 9;
}

.prp-caption-button {
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
  font-style: italic;
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
  .prp-section {
    --overlay-offset: 90px;
  }

  .prp-grid {
    grid-template-columns: 1fr;
  }

  .prp-title {
    font-size: 34px;
  }

  .prp-subtitle {
    font-size: 28px;
  }
}

@media (max-width: 768px) {
  .prp-section {
    --overlay-offset: 58px;
    scroll-margin-top: 72px;
  }

  .prp-hero {
    top: 72px;
    height: calc(100vh - 72px);
    min-height: 420px;
  }

  .prp-callout {
    font-size: 18px;
  }

  .prp-caption-button {
    font-size: 14px;
  }
}
</style>
