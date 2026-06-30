<template>
  <TresGroup ref="bookGroup" :position="[0, 0, 0] as any">
    <!-- Spine -->
    <TresMesh :position="[-bookWidth / 2 - spineWidth / 2, 0, 0] as any">
      <TresBoxGeometry :args="[spineWidth, bookHeight, bookDepth]" />
      <TresMeshStandardMaterial color="#1a1a1a" :roughness="0.2" :metalness="0.1" />
    </TresMesh>

    <!-- Front Cover -->
    <TresGroup ref="frontCoverGroup" :position="[-bookWidth / 2, 0, 0] as any">
      <TresMesh :position="[bookWidth / 2, 0, bookDepth / 2 + coverThickness / 2] as any">
        <TresBoxGeometry :args="[bookWidth, bookHeight, coverThickness]" />
        <TresMeshStandardMaterial v-if="frontTexture" :map="frontTexture" :roughness="0.3" :metalness="0.15" color="#ffffff" />
        <TresMeshStandardMaterial v-else color="#222" :roughness="0.3" :metalness="0.15" />
      </TresMesh>
    </TresGroup>

    <!-- Back Cover -->
    <TresMesh :position="[0, 0, -(bookDepth / 2 + coverThickness / 2)] as any">
      <TresBoxGeometry :args="[bookWidth, bookHeight, coverThickness]" />
      <TresMeshStandardMaterial v-if="backTexture" :map="backTexture" :roughness="0.3" :metalness="0.15" color="#ffffff" />
      <TresMeshStandardMaterial v-else color="#222" :roughness="0.3" :metalness="0.15" />
    </TresMesh>

    <!-- Pages block -->
    <TresMesh :position="[0, 0, 0] as any">
      <TresBoxGeometry :args="[bookWidth * 0.95, bookHeight * 0.96, bookDepth * 0.95]" />
      <TresMeshStandardMaterial color="#f5f0e6" :roughness="0.9" :metalness="0" />
    </TresMesh>
  </TresGroup>
</template>

<script setup lang="ts">
import { ref, shallowRef, watch, onMounted } from 'vue'
import * as THREE from 'three'
import gsap from 'gsap'
import { useBooksStore } from '~/stores/books'
import { useThreeScene } from '~/composables/useThreeScene'

const booksStore = useBooksStore()
const { createTimeline, killAllTimelines } = useThreeScene()

// Book dimensions
const bookWidth = 1.7
const bookHeight = 2.2
const bookDepth = 0.2
const spineWidth = 0.1
const coverThickness = 0.05

// Refs to TresGroup wrappers
const bookGroup = ref<any>(null)
const frontCoverGroup = ref<any>(null)

// Texture loading
const frontTexture = shallowRef<THREE.Texture | null>(null)
const backTexture = shallowRef<THREE.Texture | null>(null)
const textureLoader = new THREE.TextureLoader()

const loadTextures = (frontUrl: string, backUrl: string) => {
  textureLoader.load(frontUrl, (tex) => {
    tex.colorSpace = THREE.SRGBColorSpace
    frontTexture.value = tex
  })
  textureLoader.load(backUrl, (tex) => {
    tex.colorSpace = THREE.SRGBColorSpace
    backTexture.value = tex
  })
}

// Idle floating animation
let idleAnim: gsap.core.Tween | null = null

onMounted(() => {
  loadTextures(booksStore.activeBook.frontCoverImage, booksStore.activeBook.backCoverImage)
  startIdleAnimation()
})

const startIdleAnimation = () => {
  if (!bookGroup.value) return
  const obj = bookGroup.value

  // Gentle float
  idleAnim = gsap.to(obj.position, {
    y: 0.15,
    duration: 3,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1
  })

  // Subtle rotation
  gsap.to(obj.rotation, {
    y: 0.08,
    duration: 5,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1
  })
}

// Watch for book open/close
watch(() => booksStore.isBookOpen, (open) => {
  if (!frontCoverGroup.value || !bookGroup.value) return

  const cover = frontCoverGroup.value
  const book = bookGroup.value
  const tl = createTimeline()

  if (open) {
    // Stop idle
    if (idleAnim) idleAnim.pause()

    tl.to(book.rotation, {
      y: -0.3,
      duration: 0.6,
      ease: 'power2.inOut'
    })
    .to(cover.rotation, {
      y: -Math.PI * 0.75,
      duration: 1.2,
      ease: 'power3.inOut'
    }, '-=0.3')
  } else {
    tl.to(cover.rotation, {
      y: 0,
      duration: 0.8,
      ease: 'power3.inOut'
    })
    .to(book.rotation, {
      y: 0,
      duration: 0.5,
      ease: 'power2.out'
    }, '-=0.3')
    .call(() => {
      if (idleAnim) idleAnim.resume()
    })
  }
})

// Watch for book transitions
watch(() => booksStore.activeBookId, () => {
  if (!bookGroup.value) return
  const book = bookGroup.value

  killAllTimelines()

  const tl = createTimeline({
    onComplete: () => {
      booksStore.finishTransition()
      startIdleAnimation()
    }
  })

  // Animate out
  tl.to(book.position, { y: -2, duration: 0.5, ease: 'power2.in' })
    .to(book.rotation, { y: Math.PI, duration: 0.5 }, '<')
    .to(book.scale, { x: 0.8, y: 0.8, z: 0.8, duration: 0.5 }, '<')
    // Swap textures at midpoint
    .call(() => {
      loadTextures(booksStore.activeBook.frontCoverImage, booksStore.activeBook.backCoverImage)
    })
    // Animate in
    .to(book.position, { y: 0, duration: 0.8, ease: 'power2.out' })
    .to(book.rotation, { y: 0, duration: 0.8, ease: 'power2.out' }, '<')
    .to(book.scale, { x: 1, y: 1, z: 1, duration: 0.8, ease: 'back.out(1.7)' }, '<')
})
</script>
