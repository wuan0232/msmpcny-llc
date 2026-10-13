<template>
  <GoogleMap :address="address" :zoom="zoom" />
</template>

<script setup lang="ts">
import GoogleMap from './GoogleMap.vue'

withDefaults(defineProps<{ address: string; zoom?: number }>(), {
  zoom: 15,
})
</script>
