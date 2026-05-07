<template>
  <div ref="rootEl" class="contact-map-root">
    <div ref="mapEl" class="leaflet-host" role="region" aria-label="Clinic location map" />
    <button
      class="fullscreen-button"
      type="button"
      aria-label="Toggle map fullscreen"
      @click="toggleFullscreen"
    >
      <span class="fullscreen-icon" aria-hidden="true" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

const props = withDefaults(
  defineProps<{
    address: string
    lat: number
    lng: number
    zoom?: number
  }>(),
  {
    zoom: 15,
  },
)

delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: () => string })._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
})

const rootEl = ref<HTMLElement | null>(null)
const mapEl = ref<HTMLElement | null>(null)
let map: L.Map | null = null
let resizeObserver: ResizeObserver | null = null

function initMap(): void {
  if (!mapEl.value || map) return

  const latLng: [number, number] = [props.lat, props.lng]

  map = L.map(mapEl.value, {
    zoomControl: true,
    scrollWheelZoom: true,
    dragging: true,
    touchZoom: true,
    doubleClickZoom: true,
    keyboard: true,
  }).setView(latLng, props.zoom)

  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright" rel="noopener noreferrer">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions" rel="noopener noreferrer">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20,
  }).addTo(map)

  L.marker(latLng).addTo(map).bindPopup(props.address)

  resizeObserver = new ResizeObserver(() => {
    map?.invalidateSize()
  })
  resizeObserver.observe(mapEl.value)
}

function invalidateSoon(): void {
  requestAnimationFrame(() => {
    map?.invalidateSize()
  })
}

async function toggleFullscreen(): Promise<void> {
  if (!rootEl.value) return

  if (document.fullscreenElement) {
    await document.exitFullscreen()
  } else {
    await rootEl.value.requestFullscreen()
  }

  invalidateSoon()
}

function handleFullscreenChange(): void {
  invalidateSoon()
}

onMounted(() => {
  void nextTick().then(() => {
    initMap()
    invalidateSoon()
  })
  document.addEventListener('fullscreenchange', handleFullscreenChange)
})

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', handleFullscreenChange)
  resizeObserver?.disconnect()
  resizeObserver = null
  map?.remove()
  map = null
})
</script>

<style scoped>
.contact-map-root {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 0;
  background: #f1f1f1;
}

.contact-map-root:fullscreen {
  background: #f1f1f1;
}

.leaflet-host {
  width: 100%;
  height: 100%;
}

.fullscreen-button {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 500;
  width: 34px;
  height: 34px;
  padding: 0;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 2px;
  background: #ffffff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.fullscreen-button:hover {
  background: #f4f4f4;
}

.fullscreen-icon {
  position: relative;
  display: block;
  width: 18px;
  height: 18px;
  margin: 7px auto;
}

.fullscreen-icon::before,
.fullscreen-icon::after {
  content: '';
  position: absolute;
  width: 7px;
  height: 7px;
}

.fullscreen-icon::before {
  top: 0;
  left: 0;
  border-top: 3px solid #222222;
  border-left: 3px solid #222222;
  box-shadow: 11px 0 0 -4px #222222;
}

.fullscreen-icon::after {
  right: 0;
  bottom: 0;
  border-right: 3px solid #222222;
  border-bottom: 3px solid #222222;
}

:deep(.leaflet-control-zoom) {
  border: 0;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
}

:deep(.leaflet-control-zoom a) {
  width: 30px;
  height: 30px;
  line-height: 30px;
  color: #222222;
}
</style>
