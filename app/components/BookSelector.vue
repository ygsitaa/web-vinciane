<template>
  <div class="fixed left-8 top-24 xl:top-1/2 xl:-translate-y-1/2 z-30 flex flex-col items-start gap-1">
    <button
      v-for="(book, index) in books"
      :key="book.id"
      @click="selectBook(book.id)"
      class="group flex items-center gap-4 p-2 transition-all duration-500 bg-[#236661]/80 backdrop-blur-md border-b border-white/5"
      :class="[
        { 'pointer-events-none': booksStore.isTransitioning },
        book.id === 'book-1' ? 'bg-[#236661]/80' : book.id === 'book-2' ? 'bg-[#FD9923]/80' : 'bg-[#A094B7]/80'
      ]"
    >
      <!-- Index number -->
      <span
        class="text-[11px] font-mono tabular-nums transition-all duration-500"
        :class="isActive(book.id) ? 'text-[#D4E7EE]' : 'text-white group-hover:text-white/40'"
      >
        {{ String(index + 1).padStart(2, '0') }}
      </span>

      <!-- Line indicator -->
      <div class="relative h-[1px] overflow-hidden transition-all duration-700" :class="isActive(book.id) ? 'w-12' : 'w-6 group-hover:w-8'">
        <div
          class="absolute inset-0 transition-colors duration-500"
          :class="isActive(book.id) ? 'bg-[#D4E7EE]' : 'bg-white group-hover:bg-white/40'"
        />
      </div>

      <!-- Title -->
      <span
        class="text-[13px] font-light tracking-wider transition-all duration-500 whitespace-nowrap"
        :class="isActive(book.id) ? 'text-[#D4E7EE] opacity-100' : 'text-white group-hover:text-white/80 opacity-90'"
      >
        {{ book.title }}
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useBooksStore } from '~/stores/books'

const booksStore = useBooksStore()
const books = computed(() => booksStore.books)

const isActive = (id: string) => booksStore.activeBookId === id

const selectBook = (id: string) => {
  if (id !== booksStore.activeBookId) {
    booksStore.setActiveBook(id)
  }
}
</script>
