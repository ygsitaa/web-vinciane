<template>
  <div class="h-screen w-screen overflow-hidden bg-surface-950 text-white font-sans selection:bg-accent/30 selection:text-white">
    <Header />
    <BookExperience />
    <BookSelector />
    <PurchaseActions />
    <PagePreview />
    
    <!-- Welcome/About Modal -->
    <ModalPortal :is-open="booksStore.openModal === 'author'" title="Bienvenue sur mon site internet !" @close="booksStore.setOpenModal(null)">
      <p>
        Je suis Vinciane Hodiamont, auteure de livres pour enfants qui parlent du TDAH et des complications autour de ce trouble.
      </p>
      <p class="mt-4">
        Vous trouverez sur ce site les différents livres que j'ai écris. Vous pouvez sélectionner par le menu latéral gauche quel livre vous souhaitez voir/consulter et pour chaque livre, je vous laisse la possibilité d'en lire un extrait, il vous suffit de cliquer sur le livre animé en milieu de page.
      </p>
      <p>
        Des ressources sont disponibles dans la catégorie "Liens utiles" qui vous donnera plus d'informations sur ce trouble.
      </p>
    </ModalPortal>

    <!-- Contact Modal -->
    <ModalPortal :is-open="booksStore.openModal === 'contact'" title="Get in Touch" @close="booksStore.setOpenModal(null)">
      <form class="space-y-5" @submit.prevent>
        <div>
          <label class="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Email</label>
          <input
            type="email"
            placeholder="your@email.com"
            class="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-300"
          />
        </div>
        <div>
          <label class="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Message</label>
          <textarea
            rows="4"
            placeholder="Your message..."
            class="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-300 resize-none"
          />
        </div>
        <button class="w-full bg-gradient-to-r from-accent to-accent-dark text-surface-950 font-semibold rounded-xl px-4 py-3.5 hover:opacity-90 transition-opacity duration-300 text-sm uppercase tracking-wider">
          Send Message
        </button>
      </form>
    </ModalPortal>
  </div>
</template>

<script setup lang="ts">
import { useBooksStore } from '~/stores/books'

const booksStore = useBooksStore()
</script>

<style>
html, body, #__nuxt {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #09090b;
}

/* Smooth scrollbar for any internal scroll areas */
::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 999px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.25);
}
</style>
