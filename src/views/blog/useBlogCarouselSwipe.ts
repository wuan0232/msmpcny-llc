import { ref } from 'vue'

const SWIPE_THRESHOLD = 56

export function useBlogCarouselSwipe(onPrev: () => void, onNext: () => void, canSwipe: () => boolean) {
  const isDragging = ref(false)
  const dragOffsetX = ref(0)

  let touchStartX = 0
  let pointerStartX = 0
  let pointerId: number | null = null

  function isInteractiveTarget(target: EventTarget | null) {
    return (target as HTMLElement | null)?.closest('a,button,input,select,textarea')
  }

  function finishSwipe(deltaX: number) {
    if (!canSwipe()) return
    if (deltaX <= -SWIPE_THRESHOLD) {
      onNext()
      return
    }
    if (deltaX >= SWIPE_THRESHOLD) {
      onPrev()
    }
  }

  function onTouchStart(event: TouchEvent) {
    if (isInteractiveTarget(event.target)) return
    touchStartX = event.touches[0]?.clientX ?? 0
    dragOffsetX.value = 0
    isDragging.value = true
  }

  function onTouchMove(event: TouchEvent) {
    if (!isDragging.value) return
    const x = event.touches[0]?.clientX ?? 0
    dragOffsetX.value = x - touchStartX
  }

  function onTouchEnd() {
    finishSwipe(dragOffsetX.value)
    dragOffsetX.value = 0
    isDragging.value = false
  }

  function onPointerDown(event: PointerEvent) {
    if (event.pointerType === 'touch' || isInteractiveTarget(event.target)) return
    pointerId = event.pointerId
    pointerStartX = event.clientX
    dragOffsetX.value = 0
    isDragging.value = true
    ;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)
  }

  function onPointerMove(event: PointerEvent) {
    if (!isDragging.value || event.pointerId !== pointerId) return
    dragOffsetX.value = event.clientX - pointerStartX
  }

  function onPointerUp(event: PointerEvent) {
    if (event.pointerId !== pointerId) return
    try {
      ;(event.currentTarget as HTMLElement).releasePointerCapture(event.pointerId)
    } catch {
      /* already released */
    }
    if (isDragging.value && event.pointerType !== 'touch') {
      finishSwipe(dragOffsetX.value)
    }
    dragOffsetX.value = 0
    isDragging.value = false
    pointerId = null
  }

  return {
    isDragging,
    dragOffsetX,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onPointerDown,
    onPointerMove,
    onPointerUp,
  }
}
