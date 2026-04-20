<template>
  <section id="home" class="hero-section">
    <img src="/images/image1.png" alt="Musculoskeletal Medicine hero" class="hero-image" />
  </section>
</template>

<style scoped>
.hero-section {
  width: 100%;
  background: #e9e9e9;
  scroll-margin-top: 120px;
  overflow-x: hidden;
}

.hero-image {
  display: block;
  width: 100%;
  height: calc(100vh - 120px);
  min-height: 500px;
  object-fit: cover;
  object-position: center top;
  box-sizing: border-box;
}

/* 平板设备 */
@media (max-width: 900px) {
  .hero-section {
    scroll-margin-top: 100px;
  }

  .hero-image {
    height: calc(100vh - 100px);
    min-height: 400px;
  }
}

/* 移动设备 */
@media (max-width: 768px) {
  .hero-section {
    scroll-margin-top: 80px;
  }

  .hero-image {
    height: calc(100vh - 80px);
    min-height: 350px;
  }
}

@media (max-width: 480px) {
  .hero-section {
    scroll-margin-top: 70px;
  }

  .hero-image {
    height: calc(100vh - 70px);
    min-height: 300px;
  }
}
</style>
