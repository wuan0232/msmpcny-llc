<template>
  <div class="si-wrapper">
    <NavBar />

    <main class="si-main">
      <section id="sacroiliac-stabilization" class="si-section">
        <div class="si-hero">
          <img
            src="https://le-cdn.hibuwebsites.com/4f7ab16b56fa4b438d877a564ca53166/dms3rep/multi/opt/sacroiliac-stabilization-hero-2880w.jpg"
            alt="Sacroiliac stabilization hero" class="si-hero-image" />
        </div>

        <div class="si-content">
          <div class="si-panel">
            <div class="container">
              <div class="si-grid">
                <div class="si-copy">
                  <h2 class="si-title">Complete Sacroiliac Care</h2>
                  <p class="si-body">
                    Sacroiliac stabilization is a process that restores strength, stability, and functionality to the
                    sacroiliac joint. The treatments that we offer at Musculoskeletal Medicine PC can help you restore
                    proper biomechanics that can result in a net reduction of pain and improvement of function.
                  </p>

                  <p class="si-body">
                    Find out more about our
                    <a class="si-link" href="/about">independent physician</a>
                    before you make an appointment for your therapy today.
                  </p>

                  <h3 class="si-subtitle">Improve Joint Function</h3>
                  <p class="si-body">
                    The treatments that we offer can restore proper biomechanics in order to help relieve your pain and
                    improve the function of your joint. Start on the path towards better health and recovery with the
                    assistance of our dedicated, compassionate care. Reduce pain with the aid of sacroiliac
                    stabilization.
                  </p>

                  <a
                    href="/pdf/Sacroiliac Joint Stabilization.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="si-cta"
                  >
                    Learn more about Sacroiliac Stabilization
                  </a>
                </div>

                <div class="si-side">
                  <div class="si-callout">
                    Call (929) 399-3134 and make an appointment for sacroiliac stabilization.
                  </div>

                  <div class="si-video-wrap">
                    <video class="si-video" controls playsinline preload="metadata">
                      <source src="/videos/musculoskeletal-medicine-gbjxb8zma-a03tk3.mp4" type="video/mp4" />
                      Your browser does not support HTML5 video.
                    </video>
                  </div>

                  <button type="button" class="si-caption-button" @click="openModal">
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
      <div class="video-modal" role="dialog" aria-modal="true" aria-label="Sacroiliac stabilization video">
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
.si-wrapper {
  width: 100%;
  min-height: 100vh;
  background: #ffffff;
  overflow-x: hidden;
}

.si-main {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.si-section {
  background: #ffffff;
  scroll-margin-top: 120px;
  padding-top: 120px;
}

.si-hero {
  width: 100%;
  height: calc(100vh - 120px);
  min-height: 500px;
  overflow: hidden;
  position: relative;
}

.si-hero-image {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: center top;
}

.si-content {
  position: relative;
  background: #ffffff;
  margin-top: -80px;
  padding-top: 80px;
}

.si-panel {
  width: 100%;
  background: #ffffff;
  padding-top: 34px;
}

.si-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(280px, 0.75fr);
  gap: 36px;
  align-items: start;
  padding-bottom: 48px;
}

.si-title {
  margin: 0 0 16px;
  color: var(--brand-red);
  font-size: 52px;
  line-height: 1.08;
  font-weight: 800;
  font-family: Georgia, 'Times New Roman', Times, serif;
}

.si-subtitle {
  margin: 24px 0 12px;
  color: var(--brand-red);
  font-size: 44px;
  line-height: 1.12;
  font-weight: 800;
  font-family: Georgia, 'Times New Roman', Times, serif;
}

.si-body {
  margin: 0 0 18px;
  color: #4a4a4a;
  font-size: 13px;
  line-height: 1.55;
}

.si-link {
  color: var(--brand-red);
  text-decoration: underline;
  font-weight: 700;
}

.si-cta {
  display: block;
  margin: 8px auto 0;
  background: var(--brand-red);
  color: #ffffff;
  border: 0;
  border-radius: 3px;
  padding: 11px 22px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
}

.si-side {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.si-callout {
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

.si-video-wrap {
  width: 100%;
  background: #111111;
}

.si-video {
  width: 100%;
  display: block;
  aspect-ratio: 16 / 9;
}

.si-caption-button {
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
  .si-section {
    --overlay-offset: 90px;
  }

  .si-grid {
    grid-template-columns: 1fr;
  }

  .si-title {
    font-size: 34px;
  }

  .si-subtitle {
    font-size: 28px;
  }
}

@media (max-width: 768px) {
  .si-section {
    --overlay-offset: 58px;
    scroll-margin-top: 72px;
  }

  .si-hero {
    top: 72px;
    height: calc(100vh - 72px);
    min-height: 420px;
  }

  .si-callout {
    font-size: 18px;
  }

  .si-caption-button {
    font-size: 14px;
  }
}
</style>
