<template>
  <!-- 目前 About 页面与主页共用同一套内容区块，避免路由缺失导致构建报错 -->
  <HomeView />
</template>

<script setup lang="ts">
import HomeView from './HomeView.vue'
</script>

<style scoped>
/* 空 */
</style>

