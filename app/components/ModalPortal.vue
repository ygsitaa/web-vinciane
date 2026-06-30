<template>
  <Teleport to="body">
    <Transition
      @enter="onEnter"
      @leave="onLeave"
      :css="false"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[60] flex items-center justify-center p-4"
        @click.self="$emit('close')"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/70 backdrop-blur-md" @click="$emit('close')" />

        <!-- Modal -->
        <div
          ref="modalContent"
          class="relative bg-[#236661] backdrop-blur-md border border-white/10 rounded-3xl p-10 max-w-3xl w-full text-white shadow-[0_25px_60px_rgba(0,0,0,0.6)] overflow-hidden"
        >
          <!-- Decorative gradient orb -->
          <!-- <div class="absolute -top-20 -right-20 w-40 h-40 bg-accent/20 rounded-full blur-3xl pointer-events-none" /> -->

          <!-- Close button -->
          <button
            @click="$emit('close')"
            class="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all duration-300"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Title -->
          <h2 class="text-3xl font-serif font-bold mb-6 text-white/95">{{ title }}</h2>

          <!-- Content slot -->
          <div class="text-white/90 leading-relaxed space-y-4">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const props = defineProps<{
  isOpen: boolean
  title: string
}>()

const emit = defineEmits<{
  close: []
}>()

const modalContent = ref<HTMLElement | null>(null)

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.isOpen) {
    emit('close')
  }
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))

const onEnter = (el: Element, done: () => void) => {
  const htmlEl = el as HTMLElement
  const backdrop = htmlEl.querySelector('.bg-black\\/70')
  const modal = htmlEl.querySelector('.relative')

  gsap.set(htmlEl, { visibility: 'visible' })

  const tl = gsap.timeline({ onComplete: done })

  if (backdrop) {
    tl.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power2.out' }, 0)
  }
  if (modal) {
    tl.fromTo(modal,
      { y: 40, opacity: 0, scale: 0.96 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.4)' },
      0.1
    )
  }
}

const onLeave = (el: Element, done: () => void) => {
  const htmlEl = el as HTMLElement
  gsap.to(htmlEl, {
    opacity: 0,
    duration: 0.3,
    ease: 'power2.in',
    onComplete: done
  })
}
</script>
