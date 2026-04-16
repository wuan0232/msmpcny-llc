<template>
  <section id="home" class="hero-section">
    <img src="/images/image1.png" alt="Musculoskeletal Medicine hero" class="hero-image" />
  </section>
</template>

<style scoped>
.hero-section {
  width: 100%;
  background: #e9e9e9;
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
