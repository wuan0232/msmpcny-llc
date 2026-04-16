<template>
  <div class="procedures-wrapper">
    <NavBar />

    <main class="procedures-main">
      <ProceduresSection sectionId="procedures"
        heroImageSrc="https://le-cdn.hibuwebsites.com/4f7ab16b56fa4b438d877a564ca53166/dms3rep/multi/opt/Procedure-new-hero-2880w.png"
        videoSrc="/videos/musculoskeletal-medicine-gbjxb8zma-a03tk3.mp4" />

      <SiteFooter sectionId="contact" />
    </main>
  </div>
</template>

<script setup lang="ts">
import NavBar from '../components/NavBar.vue'
import SiteFooter from '../components/sections/SiteFooter.vue'
import ProceduresSection from './procedures/ProceduresSection.vue'
</script>

<style scoped>
.procedures-wrapper {
  width: 100%;
  min-height: 100vh;
  background-color: #ffffff;
  overflow-x: hidden;
}

.procedures-main {
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}
</style>
