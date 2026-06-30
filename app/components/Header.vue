<template>
  <header class="fixed top-0 left-0 w-full z-50 transition-all duration-500" :class="headerClass">
    <div class="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
      <!-- Logo -->
      <div class="flex items-center gap-3">
        <!-- <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center">
          <span class="text-white text-sm font-bold">V</span>
        </div> -->
        <span class="text-lg font-serif font-bold tracking-wider drop-shadow-[0_0.3px_0.3px_rgba(0,0,0,0.2)] text-[#FD9923]">Vinciane Hodiamont</span>
      </div>

      <!-- Desktop nav -->
      <nav class="hidden lg:flex items-center gap-10 text-[13px] font-medium tracking-[0.12em] uppercase">
        <a
          href="#"
          @click.prevent="booksStore.setOpenModal('author')"
          class="text-[#FD9923]/90 hover:text-white transition-colors duration-300"
        >
          A PROPOS
        </a>

        <!-- Where to Buy dropdown -->
        <div class="relative" ref="buyDropdownRef">
          <button
            @click="toggleBuyDropdown"
            class="text-[#FD9923]/90 hover:text-white transition-colors duration-300 flex items-center gap-1.5"
          >
            OÙ ACHETER
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-3 w-3 transition-transform duration-300"
              :class="{ 'rotate-180': showDropdown }"
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <Transition
            @enter="dropdownEnter"
            @leave="dropdownLeave"
            :css="false"
          >
            <div
              v-if="showDropdown"
              class="absolute top-full right-0 mt-4 w-52 bg-surface-900/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.5)] py-2"
            >
              <a
                v-for="store in activeBookStores"
                :key="store.name"
                :href="store.url"
                target="_blank"
                rel="noopener"
                class="flex items-center gap-3 px-5 py-3 text-[#FD9923]/70 hover:text-white hover:bg-white/5 transition-all duration-200"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-accent/60" />
                {{ store.name }}
              </a>
            </div>
          </Transition>
        </div>

        <!-- Useful links dropdown -->
        <div class="relative" ref="usefulLinksDropdownRef">
          <button
            @click="toggleUsefulLinksDropdown"
            class="text-[#FD9923]/90 hover:text-white transition-colors duration-300 flex items-center gap-1.5"
          >
            LIENS UTILES
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-3 w-3 transition-transform duration-300"
              :class="{ 'rotate-180': showUsefulLinksDropdown }"
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <Transition
            @enter="dropdownEnter"
            @leave="dropdownLeave"
            :css="false"
          >
            <div
              v-if="showUsefulLinksDropdown"
              class="absolute top-full right-0 mt-4 w-52 bg-surface-900/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.5)] py-2"
            >
              <a
                v-for="link in usefulLinks"
                :key="link.name"
                :href="link.url"
                target="_blank"
                rel="noopener"
                class="flex items-center gap-3 px-5 py-3 text-[#FD9923]/70 hover:text-white hover:bg-white/5 transition-all duration-200"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-accent/60" />
                {{ link.name }}
              </a>
            </div>
          </Transition>
        </div>

        <a
          href="#"
          @click.prevent="booksStore.setOpenModal('contact')"
          class="text-[#FD9923]/90 hover:text-white transition-colors duration-300"
        >
          CONTACT
        </a>
      </nav>

      <!-- Mobile menu button -->
      <button @click="mobileOpen = !mobileOpen" class="lg:hidden text-[#FD9923]/60 hover:text-white">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path v-if="!mobileOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Mobile nav -->
    <Transition
      @enter="(el: Element, done: () => void) => { gsap.fromTo(el, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: 0.3, ease: 'power2.out', onComplete: done }) }"
      @leave="(el: Element, done: () => void) => { gsap.to(el, { height: 0, opacity: 0, duration: 0.2, ease: 'power2.in', onComplete: done }) }"
      :css="false"
    >
      <div v-if="mobileOpen" class="lg:hidden bg-surface-900/95 backdrop-blur-xl border-t border-white/10 overflow-hidden">
        <nav class="flex flex-col px-8 py-6 gap-4 text-sm font-medium tracking-wider uppercase">
          <!-- <a href="#" @click.prevent="mobileOpen = false" class="text-[#FD9923]/60 hover:text-white transition-colors">Home</a> -->
          <a href="#" @click.prevent="booksStore.setOpenModal('author'); mobileOpen = false" class="text-[#FD9923]/80 hover:text-white transition-colors">A propos</a>
          <a href="#" @click.prevent="booksStore.setOpenModal('contact'); mobileOpen = false" class="text-[#FD9923]/80 hover:text-white transition-colors">Contact</a>
          <div class="border-t border-white/10 pt-4 mt-2">
            <span class="text-[#FD9923]/50 text-xs">Où acheter</span>
            <div class="flex flex-wrap gap-2 mt-2">
              <a
                v-for="store in activeBookStores"
                :key="store.name"
                :href="store.url"
                target="_blank"
                rel="noopener"
                class="px-4 py-2 rounded-full bg-white/5 text-[#FD9923]/80 text-xs hover:bg-white/10 transition-colors"
              >
                {{ store.name }}
              </a>
            </div>
          </div>
          <div class="border-t border-white/10 pt-4 mt-2">
            <span class="text-[#FD9923]/50 text-xs">Liens utiles</span>
            <div class="flex flex-wrap gap-2 mt-2">
              <a
                v-for="link in usefulLinks"
                :key="link.name"
                :href="link.url"
                target="_blank"
                rel="noopener"
                class="px-4 py-2 rounded-full bg-white/5 text-[#FD9923]/80 text-xs hover:bg-white/10 transition-colors"
              >
                {{ link.name }}
              </a>
            </div>
          </div>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { useBooksStore } from '~/stores/books'
import { usefulLinksConfig } from '~/config/usefulLinks.config'

const booksStore = useBooksStore()
const activeBookStores = computed(() => booksStore.activeBook?.stores ?? [])
const usefulLinks = usefulLinksConfig

const showDropdown = ref(false)
const showUsefulLinksDropdown = ref(false)
const mobileOpen = ref(false)
const buyDropdownRef = ref<HTMLElement | null>(null)
const usefulLinksDropdownRef = ref<HTMLElement | null>(null)

const toggleBuyDropdown = () => {
  showUsefulLinksDropdown.value = false
  showDropdown.value = !showDropdown.value
}

const toggleUsefulLinksDropdown = () => {
  showDropdown.value = false
  showUsefulLinksDropdown.value = !showUsefulLinksDropdown.value
}

const headerClass = computed(() => {
  return 'bg-[#236661]/80 backdrop-blur-md border-b border-white/5'
})

// Close dropdowns on outside click
const handleOutsideClick = (e: MouseEvent) => {
  if (buyDropdownRef.value && !buyDropdownRef.value.contains(e.target as Node)) {
    showDropdown.value = false
  }
  if (usefulLinksDropdownRef.value && !usefulLinksDropdownRef.value.contains(e.target as Node)) {
    showUsefulLinksDropdown.value = false
  }
}

onMounted(() => document.addEventListener('click', handleOutsideClick))
onUnmounted(() => document.removeEventListener('click', handleOutsideClick))

const dropdownEnter = (el: Element, done: () => void) => {
  gsap.fromTo(el,
    { opacity: 0, y: -8, scale: 0.95 },
    { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: 'power2.out', onComplete: done }
  )
}

const dropdownLeave = (el: Element, done: () => void) => {
  gsap.to(el, { opacity: 0, y: -8, scale: 0.95, duration: 0.2, ease: 'power2.in', onComplete: done })
}
</script>
