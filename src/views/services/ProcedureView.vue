<template>
  <div class="procedures-wrapper">
    <NavBar />

    <main class="procedures-main">
      <section id="procedures" class="procedures-section">
        <div class="procedures-hero">
          <img
            src="https://le-cdn.hibuwebsites.com/4f7ab16b56fa4b438d877a564ca53166/dms3rep/multi/opt/Procedure-new-hero-2880w.png"
            alt="Procedures hero"
            class="procedures-hero-image"
          />
        </div>

        <div class="procedures-content">
          <div class="procedures-panel">
            <div class="container">
              <div class="procedures-grid">
                <div class="procedures-copy">
                  <h2 class="procedures-title">Procedure List</h2>
                  <ul class="procedures-list">
                    <li><strong>Joint Injections:</strong> Includes the use of C-Arm fluoroscopy and/or ultrasound guidance when necessary.</li>
                    <li><strong>Tendon, Ligament, and Trigger Point Injections.</strong></li>
                    <li><strong>Prolotherapy:</strong> Injections into ligament and tendon attachments to promote connective tissue healing and strengthening.</li>
                    <li><strong>Prolozone:</strong> Injections augmented with an oxygen and ozone mixture to promote healing of injured tissue.</li>
                    <li><strong>Platelet Rich Plasma Injections:</strong> Derived from the patient's blood containing growth factors to promote healing.</li>
                    <li><strong>Perineural Injections (Neuropathic Pain Treatment):</strong> Injections into subcutaneous nerves to reduce inflammation and pain. Lyftogt Technique.</li>
                    <li><strong>Caudal Epidural and Lumbar Transforaminal Epidural Injections:</strong> Fluoroscopic guided including epidurogram when indicated.</li>
                    <li><strong>Sacroiliac Joint and Ligament Injections:</strong> With the use of C-Arm fluoroscopy to reduce inflammation or to stabilize hypermobile S-I joints.</li>
                    <li><strong>Facet Injections (Cervical, Thoracic, and Lumbar):</strong> Fluoroscopic guided.</li>
                    <li><strong>Conscious Sedation:</strong> To ease the pain of injection treatments. Continuous oximetry monitoring employed.</li>
                    <li><strong>Osteopathic Diagnostic and Manipulative Techniques.</strong></li>
                    <li><strong>Acupuncture Methods:</strong> Limited to Percutaneous Electrical Stimulation (Craig Technique) and Intramuscular Stimulation (Chan Gunn Technique).</li>
                    <li><strong>Diagnostic Ultrasound Exams:</strong> Specific imaging protocols for evaluating shoulder pathology and Carpal Tunnel Syndrome.</li>
                    <li><strong>Carpal Tunnel Hydro Dissection:</strong> Ultrasound guided for treatment of Carpal Tunnel Syndrome.</li>
                    <li><strong>Chiropractic Evaluation and Treatment.</strong></li>
                    <li><strong>Custom Orthotics:</strong> Utilizing the Foot Levelers System.</li>
                  </ul>
                </div>

                <div class="procedures-side">
                  <div class="procedures-callout">
                    Call 315-478-9710 to schedule your Prolotherapy treatments today.
                  </div>

                  <div class="procedures-video-wrap">
                    <video class="procedures-video" controls playsinline preload="metadata">
                      <source src="/videos/musculoskeletal-medicine-gbjxb8zma-a03tk3.mp4" type="video/mp4" />
                      Your browser does not support HTML5 video.
                    </video>
                  </div>

                  <button type="button" class="procedures-caption-button" @click="openModal">
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
      <div class="video-modal" role="dialog" aria-modal="true" aria-label="Procedures video">
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
.procedures-wrapper {
  width: 100%;
  min-height: 100vh;
  background: #ffffff;
  overflow-x: hidden;
}

.procedures-main {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.procedures-section {
  --overlay-offset: 140px;
  width: 100%;
  background: #ffffff;
  scroll-margin-top: 90px;
}

.procedures-hero {
  width: 100%;
  height: calc(100vh - 80px);
  min-height: 560px;
  overflow: hidden;
  position: sticky;
  top: 80px;
  z-index: 0;
}

.procedures-hero-image {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: center center;
}

.procedures-content {
  position: relative;
  z-index: 1;
  margin-top: calc(-1 * var(--overlay-offset));
  background: #ffffff;
}

.procedures-panel {
  width: 100%;
  background: #ffffff;
  padding-top: 34px;
}

.procedures-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(280px, 0.75fr);
  gap: 36px;
  align-items: start;
  padding-bottom: 48px;
}

.procedures-title {
  margin: 0 0 16px;
  color: var(--brand-red);
  font-size: 52px;
  line-height: 1.08;
  font-weight: 800;
}

.procedures-list {
  margin: 0;
  padding-left: 22px;
  color: #3f3f3f;
  font-size: 13px;
  line-height: 1.5;
}

.procedures-list li {
  margin: 6px 0;
}

.procedures-side {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.procedures-callout {
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

.procedures-video-wrap {
  width: 100%;
  background: #111111;
}

.procedures-video {
  width: 100%;
  display: block;
  aspect-ratio: 16 / 9;
}

.procedures-caption-button {
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
  .procedures-section {
    --overlay-offset: 90px;
  }

  .procedures-grid {
    grid-template-columns: 1fr;
  }

  .procedures-title {
    font-size: 34px;
  }
}

@media (max-width: 768px) {
  .procedures-section {
    --overlay-offset: 58px;
    scroll-margin-top: 72px;
  }

  .procedures-hero {
    top: 72px;
    height: calc(100vh - 72px);
    min-height: 420px;
  }

  .procedures-callout {
    font-size: 18px;
  }

  .procedures-caption-button {
    font-size: 14px;
  }
}
</style>

