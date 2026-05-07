<template>
  <div
    ref="mapEl"
    class="location-map"
    :style="{ height }"
    role="region"
    aria-label="Clinic location map"
  />
</template>

<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import { NYC_CLINIC_ADDRESS, NYC_CLINIC_LATLNG } from '../config/clinicLocation'

const props = withDefaults(
  defineProps<{
    height?: string
    zoom?: number
    /** 页脚等小区域：略低 zoom、避免过挤 */
    compact?: boolean
  }>(),
  {
    height: '400px',
    zoom: 16,
    compact: false,
  },
)

// Vite 打包后 Leaflet 默认图标路径会失效，需显式指定资源
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: () => string })._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
})

const mapEl = ref<HTMLElement | null>(null)
let map: L.Map | null = null
let resizeObserver: ResizeObserver | null = null

function effectiveZoom(): number {
  return props.compact ? Math.min(props.zoom, 15) : props.zoom
}

function initMap(): void {
  if (!mapEl.value || map) return

  map = L.map(mapEl.value, {
    scrollWheelZoom: true,
    dragging: true,
    touchZoom: true,
    doubleClickZoom: true,
    keyboard: true,
  }).setView(NYC_CLINIC_LATLNG, effectiveZoom())

  // CARTO 底图基于 OSM 数据，国内访问 Google 嵌入不可用时通常仍可加载切片；支持拖拽平移与滚轮缩放
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright" rel="noopener noreferrer">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions" rel="noopener noreferrer">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20,
  }).addTo(map)

  L.marker(NYC_CLINIC_LATLNG).addTo(map).bindPopup(NYC_CLINIC_ADDRESS)

  resizeObserver = new ResizeObserver(() => {
    map?.invalidateSize()
  })
  resizeObserver.observe(mapEl.value)
}

onMounted(() => {
  void nextTick().then(() => {
    initMap()
    requestAnimationFrame(() => map?.invalidateSize())
  })
})

onUnmounted(() => {
  resizeObserver?.disconnect()
  resizeObserver = null
  map?.remove()
  map = null
})
</script>

<style scoped>
.location-map {
  width: 100%;
  min-height: 120px;
  z-index: 0;
}
</style>
