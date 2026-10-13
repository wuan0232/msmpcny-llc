<template>
  <GoogleMap
    :address="NYC_CLINIC_ADDRESS"
    :zoom="compact ? Math.min(zoom, 15) : zoom"
    :style="{ height }"
  />
</template>

<script setup lang="ts">
import GoogleMap from './GoogleMap.vue'
import { NYC_CLINIC_ADDRESS } from '../config/clinicLocation'

withDefaults(defineProps<{ height?: string; zoom?: number; compact?: boolean }>(), {
  height: '400px',
  zoom: 16,
  compact: false,
})
</script>
