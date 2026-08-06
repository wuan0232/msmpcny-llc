/** 诊所地址与地图标点（WGS84）。用于 Leaflet / OpenStreetMap，不依赖 Google。 */
export const NYC_CLINIC_ADDRESS = '42-65 Kissena Blvd, Flushing, NY'
export const SYRACUSE_CLINIC_ADDRESS = '475 Irving Avenue, Suite 402, Syracuse, NY 13210'
export const DFW_CLINIC_ADDRESS = '1140 Empire Central Pl, #106H, Dallas, TX'

/** 42-65 Kissena Blvd, Flushing, NY 11355 一带近似坐标 */
export const NYC_CLINIC_LAT = 40.7552
export const NYC_CLINIC_LNG = -73.8278

/** 475 Irving Avenue, Syracuse, NY 13210 */
export const SYRACUSE_CLINIC_LAT = 43.0458122
export const SYRACUSE_CLINIC_LNG = -76.1372677

/** 1140 Empire Central Pl, Dallas, TX 75247 */
export const DFW_CLINIC_LAT = 32.8247749
export const DFW_CLINIC_LNG = -96.8747705

export const NYC_CLINIC_LATLNG: [number, number] = [NYC_CLINIC_LAT, NYC_CLINIC_LNG]
export const SYRACUSE_CLINIC_LATLNG: [number, number] = [SYRACUSE_CLINIC_LAT, SYRACUSE_CLINIC_LNG]
export const DFW_CLINIC_LATLNG: [number, number] = [DFW_CLINIC_LAT, DFW_CLINIC_LNG]

export function googleMapsSearchUrl(address = NYC_CLINIC_ADDRESS): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
}

export function googleMapsDirectionsUrl(address = NYC_CLINIC_ADDRESS): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`
}
