<template>
  <section :id="sectionId" class="hero-section">
    <img :src="imageSrc" :alt="imageAlt" class="hero-image" />
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  sectionId?: string
  imageSrc: string
  imageAlt: string
}>()

const { sectionId, imageSrc, imageAlt } = props
</script>

<style scoped>
.hero-section {
  width: 100%;
  background: #e9e9e9;
  /* 给粘性导航一点点遮挡空间，避免锚点滚动时标题被盖住 */
  scroll-margin-top: 96px;
  overflow-x: hidden;
}

.hero-image {
  display: block;
  width: 100%;
  height: calc(100vh - 80px);
  min-height: 620px;
  object-fit: cover;
  object-position: center top;
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .hero-section {
    scroll-margin-top: 72px;
  }

  .hero-image {
    height: calc(100vh - 92px);
    min-height: 420px;
  }
}
</style>

