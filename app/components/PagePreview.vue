<template>
  <Transition
    @enter="onEnter"
    @leave="onLeave"
    :css="false"
  >
    <div
      v-if="booksStore.isBookOpen"
      class="fixed inset-0 z-30 flex items-center justify-center"
    >
      <!-- Dark overlay -->
      <div ref="overlayRef" class="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      <!-- Page viewer -->
      <div ref="viewerRef" class="relative w-full max-w-3xl mx-8 mt-24">
        <!-- Close button -->
        <button
          @click="booksStore.closeBook()"
          class="absolute -top-14 right-0 flex items-center gap-2 text-white/40 hover:text-white transition-colors duration-300 text-xs uppercase tracking-[0.2em] font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Quitter
        </button>

        <!-- Book spread -->
        <div class="relative aspect-[4/5] md:aspect-[16/10] bg-[#f8f4ed] rounded-lg shadow-[0_30px_80px_rgba(0,0,0,0.6)] overflow-hidden">
          <div 
            class="flex w-[200%] md:w-full h-full transition-transform duration-500"
            :class="mobileShowRightPage ? '-translate-x-1/2 md:translate-x-0' : 'translate-x-0'"
          >
            <!-- Left page -->
            <div class="w-1/2 shrink-0 h-full p-8 md:p-14 relative border-r border-black/10 bg-gradient-to-r from-black/[0.03] to-transparent">
              <div v-if="currentPage > 0" class="h-full flex flex-col justify-between">
                <p class="text-surface-800/70 leading-[1.9] text-sm md:text-base font-serif">
                  {{ pages[currentPage - 1]?.content }}
                </p>
                <span class="text-surface-800/30 text-xs font-mono">{{ currentPage }}</span>
              </div>
              <div v-else class="h-full flex flex-col items-center justify-center text-center">
                <div class="w-12 h-[1px] bg-accent/40 mb-6" />
                <h3 class="text-2xl md:text-3xl font-serif text-surface-800 mb-3">{{ activeBook.title }}</h3>
                <p class="text-surface-800/50 text-sm italic">by {{ activeBook.author }}</p>
                <div class="w-12 h-[1px] bg-accent/40 mt-6" />
              </div>
              <!-- Page shadow -->
              <div class="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-black/[0.06] to-transparent pointer-events-none" />
            </div>

            <!-- Right page -->
            <div class="w-1/2 shrink-0 h-full p-8 md:p-14 relative bg-gradient-to-l from-black/[0.02] to-transparent">
              <div class="h-full flex flex-col justify-between">
                <div>
                  <h4 v-if="currentPageData?.title" class="text-lg font-serif text-surface-800 mb-4">
                    {{ currentPageData.title }}
                  </h4>
                  <p class="text-surface-800/70 leading-[1.9] text-sm md:text-base font-serif">
                    {{ currentPageData?.content }}
                  </p>
                </div>
                <span class="text-surface-800/30 text-xs font-mono text-right">{{ currentPage + 1 }}</span>
              </div>
              <!-- Page shadow -->
              <div class="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-black/[0.06] to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <div class="flex items-center justify-between mt-8">
          <!-- Mobile Prev -->
          <button
            @click="handleMobilePrev"
            :disabled="currentPage === 0 && !mobileShowRightPage"
            class="md:hidden flex items-center gap-2 text-white/50 hover:text-white disabled:text-white/15 disabled:cursor-not-allowed transition-all duration-300 text-xs uppercase tracking-widest"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Précédent
          </button>
          
          <!-- Desktop Prev -->
          <button
            @click="booksStore.prevPage()"
            :disabled="currentPage === 0"
            class="hidden md:flex items-center gap-2 text-white/50 hover:text-white disabled:text-white/15 disabled:cursor-not-allowed transition-all duration-300 text-xs uppercase tracking-widest"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Précédent
          </button>

          <!-- Page dots -->
          <div class="flex items-center gap-2">
            <div
              v-for="(_, i) in pages"
              :key="i"
              class="w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer"
              :class="i === currentPage ? 'bg-accent w-4' : 'bg-white/20 hover:bg-white/40'"
              @click="goToPage(i)"
            />
          </div>

          <!-- Mobile Next -->
          <button
            @click="handleMobileNext"
            :disabled="currentPage >= totalPages - 1 && mobileShowRightPage"
            class="md:hidden flex items-center gap-2 text-white/50 hover:text-white disabled:text-white/15 disabled:cursor-not-allowed transition-all duration-300 text-xs uppercase tracking-widest"
          >
            Suivant
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <!-- Desktop Next -->
          <button
            @click="booksStore.nextPage()"
            :disabled="currentPage >= totalPages - 1"
            class="hidden md:flex items-center gap-2 text-white/50 hover:text-white disabled:text-white/15 disabled:cursor-not-allowed transition-all duration-300 text-xs uppercase tracking-widest"
          >
            Suivant
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import gsap from 'gsap'
import { useBooksStore } from '~/stores/books'

const booksStore = useBooksStore()

const activeBook = computed(() => booksStore.activeBook)
const pages = computed(() => activeBook.value.pages)
const currentPage = computed(() => booksStore.currentPage)
const totalPages = computed(() => booksStore.totalPages)
const currentPageData = computed(() => pages.value[currentPage.value])

const overlayRef = ref<HTMLElement | null>(null)
const viewerRef = ref<HTMLElement | null>(null)

const mobileShowRightPage = ref(false)

watch(() => booksStore.isBookOpen, (isOpen) => {
  if (!isOpen) {
    mobileShowRightPage.value = false
  }
})

const handleMobileNext = () => {
  if (currentPage.value === 0 && !mobileShowRightPage.value) {
    mobileShowRightPage.value = true
  } else if (currentPage.value < totalPages.value - 1) {
    booksStore.nextPage()
    mobileShowRightPage.value = true
  }
}

const handleMobilePrev = () => {
  if (currentPage.value === 0 && mobileShowRightPage.value) {
    mobileShowRightPage.value = false
  } else if (currentPage.value > 0) {
    booksStore.prevPage()
    mobileShowRightPage.value = true
  }
}

const goToPage = (i: number) => {
  booksStore.currentPage = i
  mobileShowRightPage.value = true
}

const onEnter = (el: Element, done: () => void) => {
  const tl = gsap.timeline({ onComplete: done })
  if (overlayRef.value) {
    tl.fromTo(overlayRef.value, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' }, 0)
  }
  if (viewerRef.value) {
    tl.fromTo(viewerRef.value,
      { y: 60, opacity: 0, scale: 0.92 },
      { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out' },
      0.15
    )
  }
}

const onLeave = (el: Element, done: () => void) => {
  const tl = gsap.timeline({ onComplete: done })
  if (viewerRef.value) {
    tl.to(viewerRef.value, { y: 30, opacity: 0, scale: 0.95, duration: 0.35, ease: 'power2.in' }, 0)
  }
  if (overlayRef.value) {
    tl.to(overlayRef.value, { opacity: 0, duration: 0.3, ease: 'power2.in' }, 0.1)
  }
}
</script>
