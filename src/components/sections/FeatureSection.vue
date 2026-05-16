<template>
  <section
    :id="sectionId"
    class="feature-section"
    :class="[{ 'feature-reverse': reverse }, `feature-bg-${background}`]"
  >
    <div class="container">
      <h2 class="feature-title">{{ title }}</h2>

      <div class="feature-row">
        <div class="feature-media">
          <ResponsivePublicPicture
            :src="imageSrc"
            :alt="imageAlt"
            sizes="(max-width: 900px) 100vw, 44vw"
            img-class="feature-image"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div class="feature-copy">
          <p class="feature-body">{{ body }}</p>
          <div class="feature-actions" :class="`actions-${buttonAlign}`">
            <button type="button" class="feature-button">
              {{ buttonText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import ResponsivePublicPicture from '../ResponsivePublicPicture.vue'

type Background = 'grey' | 'white'
type ButtonAlign = 'left' | 'center'

const props = withDefaults(
  defineProps<{
    sectionId?: string
    title: string
    body: string
    buttonText: string
    imageSrc: string
    imageAlt: string
    reverse?: boolean
    background?: Background
    buttonAlign?: ButtonAlign
  }>(),
  {
    reverse: false,
    background: 'white',
    buttonAlign: 'center',
  },
)

const {
  sectionId,
  title,
  body,
  buttonText,
  imageSrc,
  imageAlt,
  reverse,
  background,
  buttonAlign,
} = props
</script>

<style scoped>
.feature-section {
  padding: 56px 0;
  scroll-margin-top: 90px;
  width: 100%;
  overflow-x: hidden;
}

.feature-bg-grey {
  background: #ededed;
}

.feature-bg-white {
  background: #ffffff;
}

.feature-title {
  margin: 0 0 22px;
  font-size: 22px;
  font-weight: 700;
  color: var(--brand-red);
  text-align: center;
}

.feature-row {
  display: flex;
  align-items: center;
  gap: 56px;
  width: 100%;
  box-sizing: border-box;
}

.feature-reverse .feature-row {
  flex-direction: row-reverse;
}

.feature-media {
  flex: 0 0 44%;
}

.feature-copy {
  flex: 1;
}

.feature-section :deep(.feature-image) {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}

.feature-body {
  margin: 0 0 18px;
  color: #333333;
  font-size: 14px;
  line-height: 1.5;
}

.feature-actions {
  display: flex;
}

.actions-left {
  justify-content: flex-start;
}

.actions-center {
  justify-content: center;
}

.feature-button {
  background: var(--brand-red);
  color: #ffffff;
  border: 0;
  padding: 12px 46px;
  border-radius: 2px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  min-width: 220px;
  text-align: center;
}

@media (max-width: 900px) {
  .feature-row {
    flex-direction: column;
    gap: 16px;
  }

  .feature-media {
    flex: 0 0 auto;
    width: 100%;
  }
}
</style>

