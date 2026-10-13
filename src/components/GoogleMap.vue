<template>
  <iframe
    class="google-map"
    :src="embedUrl"
    :title="`Map of ${address}`"
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"
    allowfullscreen
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{ address: string; zoom?: number }>(), {
  zoom: 16,
})

const embedUrl = computed(() => {
  const params = new URLSearchParams({
    q: props.address,
    z: String(props.zoom),
    hl: 'en',
    output: 'embed',
  })
  return `https://www.google.com/maps?${params}`
})
</script>

<style scoped>
.google-map {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
  border-radius: 0;
  box-shadow: none;
}
</style>
