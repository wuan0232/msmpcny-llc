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
            fetchpriority="high"
            decoding="async"
          />
        </div>

        <div class="procedures-content">
          <div class="procedures-panel">
            <div class="container">
              <div class="procedures-grid">
                <div class="procedures-copy">
                  <h2 class="procedures-title">Procedure List</h2>
                  <ul class="procedures-list">
                    <li><strong>Joint Injections:</strong> Includes the use of C-Arm fluoroscopy and/or ultrasound
                      guidance when necessary.</li>
                    <li><strong>Tendon, Ligament, and Trigger Point Injections.</strong></li>
                    <li><strong>Prolotherapy:</strong> Injections into ligament and tendon attachments to promote
                      connective tissue healing and strengthening.</li>
                    <li><strong>Prolozone:</strong> Injections augmented with an oxygen and ozone mixture to promote
                      healing of injured tissue.</li>
                    <li><strong>Platelet Rich Plasma Injections:</strong> Derived from the patient's blood containing
                      growth factors to promote healing.</li>
                    <li><strong>Perineural Injections (Neuropathic Pain Treatment):</strong> Injections into
                      subcutaneous nerves to reduce inflammation and pain. Lyftogt Technique.</li>
                    <li><strong>Caudal Epidural and Lumbar Transforaminal Epidural Injections:</strong> Fluoroscopic
                      guided including epidurogram when indicated.</li>
                    <li><strong>Sacroiliac Joint and Ligament Injections:</strong> With the use of C-Arm fluoroscopy to
                      reduce inflammation or to stabilize hypermobile S-I joints.</li>
                    <li><strong>Facet Injections (Cervical, Thoracic, and Lumbar):</strong> Fluoroscopic guided.</li>
                    <li><strong>Conscious Sedation:</strong> To ease the pain of injection treatments. Continuous
                      oximetry monitoring employed.</li>
                    <li><strong>Osteopathic Diagnostic and Manipulative Techniques.</strong></li>
                    <li><strong>Acupuncture Methods:</strong> Limited to Percutaneous Electrical Stimulation (Craig
                      Technique) and Intramuscular Stimulation (Chan Gunn Technique).</li>
                    <li><strong>Diagnostic Ultrasound Exams:</strong> Specific imaging protocols for evaluating shoulder
                      pathology and Carpal Tunnel Syndrome.</li>
                    <li><strong>Carpal Tunnel Hydro Dissection:</strong> Ultrasound guided for treatment of Carpal
                      Tunnel Syndrome.</li>
                    <li><strong>Chiropractic Evaluation and Treatment.</strong></li>
                    <li><strong>Custom Orthotics:</strong> Utilizing the Foot Levelers System.</li>
                  </ul>
                </div>

                <div class="procedures-side">
                  <div class="procedures-callout">
                    Call (929) 399-3134 to schedule your Prolotherapy treatments today.
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
    // Autoplay may be blocked by browser policy.
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
  background: #ffffff;
  scroll-margin-top: 120px;
  padding-top: 120px;
}

.procedures-hero {
  width: 100%;
  height: calc(100vh - 120px);
  min-height: 500px;
  overflow: hidden;
  position: relative;
}

.procedures-hero-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
}

.procedures-content {
  background: #ffffff;
  position: relative;
  margin-top: -80px;
  padding-top: 80px;
}

.procedures-panel {
  width: 100%;
  background: #ffffff;
  padding: 34px 0 48px;
}

.procedures-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(300px, 0.72fr);
  gap: 40px;
  align-items: start;
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
  align-items: flex-end;
}

.procedures-callout {
  width: 100%;
  background: var(--brand-red);
  color: #ffffff;
  text-align: center;
  font-size: 15px;
  line-height: 1.45;
  font-weight: 800;
  padding: 18px 18px;
}

.procedures-video-wrap {
  width: 100%;
  background: #111111;
  margin-top: 26px;
}

.procedures-video {
  width: 100%;
  display: block;
  aspect-ratio: 16 / 9;
}

.procedures-caption-button {
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
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999999;
}

.video-modal {
  position: relative;
  width: 90%;
  max-width: 800px;
  background: #ffffff;
  border-radius: 8px;
  padding: 20px;
}

.video-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 32px;
  cursor: pointer;
  color: #333;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.video-player-wrap {
  width: 100%;
}

.video-player {
  width: 100%;
  display: block;
  border-radius: 4px;
}
</style>
