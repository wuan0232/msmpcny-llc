<template>
  <picture v-if="meta.kind === 'responsive'">
    <source type="image/webp" :srcset="meta.webpSrcset" :sizes="sizes" />
    <img
      :src="meta.fallbackSrc"
      :alt="alt"
      :class="imgClass"
      :loading="loading"
      :fetchpriority="fetchpriority"
      :decoding="decoding"
    />
  </picture>
  <img
    v-else
    :src="meta.imgSrc"
    :alt="alt"
    :class="imgClass"
    :loading="loading"
    :fetchpriority="fetchpriority"
    :decoding="decoding"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getResponsivePublicImage } from '@/utils/responsivePublicImage'

const props = withDefaults(
  defineProps<{
    src: string
    alt: string
    /** 传给 `<source sizes>`，例如首页大图 `100vw` */
    sizes: string
    imgClass?: string
    loading?: 'lazy' | 'eager'
    fetchpriority?: 'high' | 'low' | 'auto'
    decoding?: 'async' | 'auto' | 'sync'
  }>(),
  {
    imgClass: '',
    decoding: 'async',
  },
)

const meta = computed(() => getResponsivePublicImage(props.src))
</script>
