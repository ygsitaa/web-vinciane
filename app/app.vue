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
      <p>
        Bonne visite !
      </p>
    </ModalPortal>

    <!-- Contact Modal -->
    <ModalPortal :is-open="booksStore.openModal === 'contact'" title="Contactez-moi" @close="booksStore.setOpenModal(null)">
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
            placeholder="Votre message..."
            class="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-300 resize-none"
          />
        </div>
        <button class="w-full bg-gradient-to-r from-accent to-accent-dark text-surface-950 font-semibold rounded-xl px-4 py-3.5 hover:opacity-90 transition-opacity duration-300 text-sm uppercase tracking-wider">
          Envoyer votre message
        </button>
      </form>

      <div class="pt-8 pb-8 flex flex-col items-center justify-center">
        <h1 class="tangerine-bold text-4xl text-white/90 mb-8 tracking-wide">Vinciane Hodiamont</h1>
        <div class="flex items-center justify-center gap-6">
          <a href="#" target="_blank" class="group relative flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:border-[#1877F2]/50 hover:bg-[#1877F2]/20 hover:shadow-[0_0_20px_rgba(24,119,242,0.4)] transition-all duration-300 hover:-translate-y-1">
            <i class="fa-brands fa-facebook-f text-xl transition-transform duration-300 group-hover:scale-110"></i>
            <span class="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs font-medium text-white/80">Facebook</span>
          </a>
          <a href="#" target="_blank" class="group relative flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:border-[#E4405F]/50 hover:bg-[#E4405F]/20 hover:shadow-[0_0_20px_rgba(228,64,95,0.4)] transition-all duration-300 hover:-translate-y-1">
            <i class="fa-brands fa-instagram text-xl transition-transform duration-300 group-hover:scale-110"></i>
            <span class="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs font-medium text-white/80">Instagram</span>
          </a>
          <a href="#" target="_blank" class="group relative flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:border-[#0A66C2]/50 hover:bg-[#0A66C2]/20 hover:shadow-[0_0_20px_rgba(10,102,194,0.4)] transition-all duration-300 hover:-translate-y-1">
            <i class="fa-brands fa-linkedin-in text-xl transition-transform duration-300 group-hover:scale-110"></i>
            <span class="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs font-medium text-white/80">LinkedIn</span>
          </a>
        </div>
      </div>
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
