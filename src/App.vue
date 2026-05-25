<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView v-slot="{ Component }">
    <KeepAlive include="BlogView">
      <component :is="Component" />
    </KeepAlive>
  </RouterView>
</template>

<style scoped>
/* 全局布局由各页面（如 HomeView）负责 */
</style>
