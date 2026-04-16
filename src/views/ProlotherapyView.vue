<template>
  <div class="patient-forms-wrapper">
    <NavBar />

    <main class="patient-forms-main">
      <ProlotherapySection
        sectionId="prolotherapy"
        heroImageSrc="https://le-cdn.hibuwebsites.com/4f7ab16b56fa4b438d877a564ca53166/dms3rep/multi/opt/prolotherapy-hero-2880w.jpg"
        videoSrc="/videos/musculoskeletal-medicine-gbjxb8zma-a03tk3.mp4"
      />

      <SiteFooter sectionId="contact" />
    </main>
  </div>
</template>

<script setup lang="ts">
import NavBar from '../components/NavBar.vue'
import ProlotherapySection from '../components/sections/ProlotherapySection.vue'
import SiteFooter from '../components/sections/SiteFooter.vue'
</script>

<style scoped>
.patient-forms-wrapper {
  width: 100%;
  min-height: 100vh;
  background-color: #ffffff;
}

.patient-forms-main {
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>

