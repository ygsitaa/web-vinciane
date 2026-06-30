import { defineStore } from 'pinia'
import { booksConfig, type Book } from '~/config/books.config'

export const useBooksStore = defineStore('books', {
  state: () => ({
    books: booksConfig as Book[],
    activeBookId: booksConfig[0]!.id,
    isBookOpen: false,
    isTransitioning: false,
    currentPage: 0,
    openModal: 'author' as 'author' | 'contact' | null
  }),
  getters: {
    activeBook(state): Book {
      return state.books.find(b => b.id === state.activeBookId) ?? state.books[0]!
    },
    activeBookIndex(state): number {
      return state.books.findIndex(b => b.id === state.activeBookId)
    },
    totalPages(): number {
      return this.activeBook.pages.length
    }
  },
  actions: {
    setActiveBook(id: string) {
      if (id !== this.activeBookId && !this.isTransitioning) {
        this.isTransitioning = true
        this.isBookOpen = false
        this.currentPage = 0
        this.activeBookId = id
        // Transition flag cleared by the 3D scene after animation completes
      }
    },
    openBook() {
      this.isBookOpen = true
      this.currentPage = 0
    },
    closeBook() {
      this.isBookOpen = false
      this.currentPage = 0
    },
    nextPage() {
      if (this.currentPage < this.totalPages - 1) {
        this.currentPage++
      }
    },
    prevPage() {
      if (this.currentPage > 0) {
        this.currentPage--
      }
    },
    finishTransition() {
      this.isTransitioning = false
    },
    setOpenModal(modal: 'author' | 'contact' | null) {
      this.openModal = modal
    }
  }
})
