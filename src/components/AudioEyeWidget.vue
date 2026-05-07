<template>
  <button
    v-if="!hasValidScriptUrl"
    class="audioeye-fallback"
    type="button"
    aria-label="Accessibility tools are not configured"
    title="AudioEye script is not configured"
  >
    <span class="audioeye-fallback-icon" aria-hidden="true">A</span>
  </button>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

const SCRIPT_ID = 'audioeye-site-code'
const STYLESHEET_ID = 'audioeye-toolbar-stylesheet'
const DEFAULT_SCRIPT_URL =
  'https://wsv3cdn.audioeye.com/static-scripts/v2/2026-05-01/toolbar.bundle.js'
const DEFAULT_STYLESHEET_URL =
  'https://wsv3cdn.audioeye.com/static-scripts/v2/2026-05-01/toolbarCSS.bundle.css'

const scriptUrl = (import.meta.env.VITE_AUDIOEYE_SCRIPT_URL as string | undefined) || DEFAULT_SCRIPT_URL
const stylesheetUrl =
  (import.meta.env.VITE_AUDIOEYE_STYLESHEET_URL as string | undefined) || DEFAULT_STYLESHEET_URL

const normalizedScriptUrl = scriptUrl?.trim()
const normalizedStylesheetUrl = stylesheetUrl?.trim()
const hasValidScriptUrl = Boolean(normalizedScriptUrl && !normalizedScriptUrl.endsWith('.css'))

function appendStylesheet(href: string): void {
  if (document.getElementById(STYLESHEET_ID)) return

  const link = document.createElement('link')
  link.id = STYLESHEET_ID
  link.rel = 'stylesheet'
  link.href = href

  document.head.appendChild(link)
}

onMounted(() => {
  if (normalizedStylesheetUrl) {
    appendStylesheet(normalizedStylesheetUrl)
  }

  if (!hasValidScriptUrl || !normalizedScriptUrl || document.getElementById(SCRIPT_ID)) return

  const script = document.createElement('script')
  script.id = SCRIPT_ID
  script.src = normalizedScriptUrl
  script.async = true

  document.head.appendChild(script)
})
</script>

<style scoped>
.audioeye-fallback {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 10000;
  width: 58px;
  height: 58px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: #1678b8;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.22);
  color: #ffffff;
  cursor: help;
}

.audioeye-fallback-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 28px;
  font-weight: 900;
  line-height: 1;
}
</style>
