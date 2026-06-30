import { ref, onBeforeUnmount } from 'vue'
import gsap from 'gsap'

/**
 * Composable for managing GSAP timelines tied to the 3D scene.
 * Automatically cleans up timelines on component unmount.
 */
export const useThreeScene = () => {
  const timelines = ref<gsap.core.Timeline[]>([])

  const createTimeline = (options?: gsap.TimelineVars): gsap.core.Timeline => {
    const tl = gsap.timeline(options)
    timelines.value.push(tl)
    return tl
  }

  const killAllTimelines = () => {
    timelines.value.forEach(tl => tl.kill())
    timelines.value = []
  }

  onBeforeUnmount(() => {
    killAllTimelines()
  })

  return {
    createTimeline,
    killAllTimelines
  }
}
