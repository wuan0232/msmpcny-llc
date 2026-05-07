<script setup lang="ts">
import { RouterView } from 'vue-router'
import AudioEyeWidget from './components/AudioEyeWidget.vue'
</script>

<template>
  <RouterView />
  <AudioEyeWidget />
</template>

<style scoped>
/* 全局布局由各页面（如 HomeView）负责 */
</style>
