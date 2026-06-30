<template>
  <Transition
    @enter="onEnter"
    @leave="onLeave"
    :css="false"
  >
    <div
      v-if="!booksStore.isBookOpen"
      ref="containerRef"
      class="fixed bottom-10 left-9 md:left-10 z-30 flex flex-col items-start gap-2 max-w-sm backdrop-blur-md border-b border-white/5 p-3 md:p-6"
      :class="booksStore.activeBookId === 'book-1' ? 'bg-[#236661]/80' : booksStore.activeBookId === 'book-2' ? 'bg-[#FD9923]/80' : 'bg-[#A094B7]/80'"
    >
      <!-- Book info -->
      <div class="text-left">
        <h2 class="text-2xl md:text-3xl font-serif font-bold text-white mb-1.5">
          {{ activeBook.title }}
        </h2>
        <p class="text-white text-sm leading-relaxed max-w-xs ml-auto">
          {{ activeBook.description }}
        </p>
      </div>

      <!-- Store buttons -->
      <div class="flex flex-wrap justify-start gap-2.5">
        <a
          v-for="store in activeBook.stores"
          :key="store.name"
          :href="store.url"
          target="_blank"
          rel="noopener"
          class="group relative px-5 py-2.5 rounded-full text-[12px] font-medium uppercase tracking-wider text-white/80 border border-white/10 bg-white/[0.03] backdrop-blur-sm hover:bg-white/10 hover:border-accent/30 hover:text-white transition-all duration-300"
        >
          <span class="relative z-10">{{ store.name }}</span>
        </a>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import gsap from 'gsap'
import { useBooksStore } from '~/stores/books'

const booksStore = useBooksStore()
const activeBook = computed(() => booksStore.activeBook)
const containerRef = ref<HTMLElement | null>(null)

const onEnter = (el: Element, done: () => void) => {
  gsap.fromTo(el,
    { opacity: 0, x: 30 },
    { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out', onComplete: done }
  )
}

const onLeave = (el: Element, done: () => void) => {
  gsap.to(el,
    { opacity: 0, x: 30, duration: 0.3, ease: 'power2.in', onComplete: done }
  )
}
</script>
