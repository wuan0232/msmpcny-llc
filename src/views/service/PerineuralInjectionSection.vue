<template>
  <div class="pn-wrapper">
    <NavBar />

    <main class="pn-main">
      <section id="perineural-injections" class="pn-section">
        <div class="pn-hero">
          <img
            src="https://le-cdn.hibuwebsites.com/4f7ab16b56fa4b438d877a564ca53166/dms3rep/multi/opt/epidural-injections-hero-2880w.jpg"
            alt="Perineural injections hero"
            class="pn-hero-image"
          />
        </div>

        <div class="pn-content">
          <div class="pn-panel">
            <div class="container">
              <div class="pn-grid">
                <div class="pn-copy">
                  <h2 class="pn-title">Effective Perineural Injections</h2>
                  <p class="pn-body">
                    The perineural injections that we offer are a trusted, effective treatment option for both lower back
                    pain and leg pain. Musculoskeletal Medicine PC has served the local community loyally since 2001.
                    Make an appointment with our team of compassionate, dedicated care professionals today.
                  </p>

                  <p class="pn-body">
                    Make the right choice in clinics for your pain relief. Find out more about our
                    <a class="pn-link" href="/about">independent physician</a>
                    before you make an appointment with us today.
                  </p>

                  <h3 class="pn-subtitle">Trigger Point Injections</h3>
                  <p class="pn-body">
                    This commonly practiced pain interventional technique is used in the treatment of painful areas of
                    muscle or knots of muscles that form when the muscles do not relax. Turn to the professionals to
                    help you with any and all of your treatment and recovery needs today.
                  </p>

                  <button type="button" class="pn-cta">Learn more about Perineural Injections</button>
                </div>

                <div class="pn-side">
                  <div class="pn-callout">
                    Call 315-478-9710 to schedule perineural injections with us.
                  </div>

                  <div class="pn-video-wrap">
                    <video class="pn-video" controls playsinline preload="metadata">
                      <source src="/videos/musculoskeletal-medicine-gbjxb8zma-a03tk3.mp4" type="video/mp4" />
                      Your browser does not support HTML5 video.
                    </video>
                  </div>

                  <button type="button" class="pn-caption-button" @click="openModal">
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
      <div class="video-modal" role="dialog" aria-modal="true" aria-label="Perineural injections video">
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
.pn-wrapper {
  width: 100%;
  min-height: 100vh;
  background: #ffffff;
  overflow-x: hidden;
}

.pn-main {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.pn-section {
  background: #ffffff;
  scroll-margin-top: 120px;
  padding-top: 120px;
}

.pn-hero {
  width: 100%;
  height: calc(100vh - 120px);
  min-height: 500px;
  overflow: hidden;
  position: relative;
}

.pn-hero-image {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: center top;
}

.pn-content {
  position: relative;
  background: #ffffff;
  margin-top: -80px;
  padding-top: 80px;
}

.pn-panel {
  width: 100%;
  background: #ffffff;
  padding-top: 34px;
}

.pn-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(280px, 0.75fr);
  gap: 36px;
  align-items: start;
  padding-bottom: 48px;
}

.pn-title {
  margin: 0 0 16px;
  color: var(--brand-red);
  font-size: 52px;
  line-height: 1.08;
  font-weight: 800;
  font-family: Georgia, 'Times New Roman', Times, serif;
}

.pn-subtitle {
  margin: 24px 0 12px;
  color: var(--brand-red);
  font-size: 44px;
  line-height: 1.12;
  font-weight: 800;
  font-family: Georgia, 'Times New Roman', Times, serif;
}

.pn-body {
  margin: 0 0 18px;
  color: #4a4a4a;
  font-size: 13px;
  line-height: 1.55;
}

.pn-link {
  color: var(--brand-red);
  text-decoration: underline;
  font-weight: 700;
}

.pn-cta {
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

.pn-side {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pn-callout {
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

.pn-video-wrap {
  width: 100%;
  background: #111111;
}

.pn-video {
  width: 100%;
  display: block;
  aspect-ratio: 16 / 9;
}

.pn-caption-button {
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
  .pn-section {
    --overlay-offset: 90px;
  }

  .pn-grid {
    grid-template-columns: 1fr;
  }

  .pn-title {
    font-size: 34px;
  }

  .pn-subtitle {
    font-size: 28px;
  }
}

@media (max-width: 768px) {
  .pn-section {
    --overlay-offset: 58px;
    scroll-margin-top: 72px;
  }

  .pn-hero {
    top: 72px;
    height: calc(100vh - 72px);
    min-height: 420px;
  }

  .pn-callout {
    font-size: 18px;
  }

  .pn-caption-button {
    font-size: 14px;
  }
}
</style>
