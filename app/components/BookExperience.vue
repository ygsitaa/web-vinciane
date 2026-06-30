<template>
  <div class="absolute inset-0 z-10 object-cover w-full h-full" :style="backgroundStyle">
    <!-- 3D Canvas -->
    <TresCanvas
      clear-color="transparent"
      :clear-alpha="0"
      :alpha="true"
      window-size
      style="background: transparent"
    >
      <TresPerspectiveCamera
        :position="[0, 0.5, 7] as any"
        :fov="40"
        :near="0.1"
        :far="100"
      />

      <OrbitControls
        :enable-damping="true"
        :damping-factor="0.05"
        :enable-pan="false"
        :enable-zoom="true"
        :min-distance="4"
        :max-distance="12"
        :min-polar-angle="Math.PI / 4"
        :max-polar-angle="Math.PI / 1.8"
        :auto-rotate="!booksStore.isBookOpen"
        :auto-rotate-speed="0.5"
      />

      <!-- Lighting -->
      <TresAmbientLight :intensity="0.4" color="#e8e0d0" />

      <TresDirectionalLight
        :position="[5, 8, 5] as any"
        :intensity="1.8"
        color="#ffffff"
        cast-shadow
        :shadow-mapSize-width="2048"
        :shadow-mapSize-height="2048"
      />

      <TresDirectionalLight
        :position="[-3, 4, -2] as any"
        :intensity="0.6"
        color="#c9a96e"
      />

      <TresPointLight
        :position="[0, -3, 4] as any"
        :intensity="0.8"
        color="#4a90d9"
        :distance="15"
      />

      <!-- The Book -->
      <BookModel />

      <!-- Ground reflection plane -->
      <!-- <TresMesh :position="[0, -2, 0] as any" :rotation="[-Math.PI / 2, 0, 0] as any">
        <TresPlaneGeometry :args="[30, 30]" />
        <TresMeshStandardMaterial
          color="#09090b"
          :roughness="0.2"
          :metalness="0.8"
          :transparent="true"
          :opacity="0.5"
        />
      </TresMesh> -->
    </TresCanvas>

    <!-- Click target aligned with the book model -->
    <div
      v-if="!booksStore.isBookOpen && !booksStore.isTransitioning"
      class="pointer-events-none absolute inset-0 z-20"
    >
      <button
        type="button"
        class="pointer-events-auto absolute left-1/2 top-1/2 flex h-[280px] w-[210px] p-5 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[1.25rem] transition-all duration-300 sm:h-[340px] sm:w-[260px] md:h-[420px] md:w-[320px] opacity-0"
        @click="booksStore.openBook()"
        aria-label="Open book preview"
      >
        <div class="flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white/30 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>
          <span class="text-[#93A55C] text-xs uppercase tracking-[0.3em] font-light">Appuye/Clique pour Lire</span>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { useBooksStore } from '~/stores/books'
import { useAsset } from '~/composables/useAsset'

const booksStore = useBooksStore()
const { asset } = useAsset()
const backgroundStyle = {
  backgroundImage: `url('${asset('bg-3dscene3.jpg')}')`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat'
}
</script>
