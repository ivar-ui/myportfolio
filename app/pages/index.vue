<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const spotlight = ref(null)
const showPage = ref(false)

const handleMouseMove = (e) => {
  const x = e.clientX
  const y = e.clientY
  spotlight.value?.style.setProperty('--x', `${x}px`)
  spotlight.value?.style.setProperty('--y', `${y}px`)
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)

  setTimeout(() => {
    showPage.value = true
  }, 100) // bisa ditambah jadi 300 untuk efek lebih lambat
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<template>
  <!-- Semua elemen dibungkus fade-slow -->
  <transition name="fade-slow">
    <div v-if="showPage" class="relative w-full h-full overflow-hidden">
      <!-- Background Video -->
      <div class="fixed inset-0 z-[-2]">
        <video
          autoplay
          muted
          loop
          playsinline
          class="w-full h-full object-cover"
        >
          <source src="/home.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <!-- Spotlight -->
      <div
        id="spotlight-overlay"
        ref="spotlight"
        class="fixed inset-0 z-[-1] pointer-events-none"
      ></div>

      <!-- Content -->
      <div class="fixed inset-0 flex items-center justify-center text-white text-center z-10">
        <transition name="fade-zoom-slow">
          <h1 v-if="showPage" class="text-5xl md:text-6xl font-bold drop-shadow-lg">
            Welcome!
          </h1>
        </transition>
      </div>
    </div>
  </transition>
</template>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  cursor: none;
}

* {
  box-sizing: border-box;
  cursor: none !important;
}

/* Spotlight effect */
#spotlight-overlay {
  background: radial-gradient(
    circle at var(--x, 50%) var(--y, 50%),
    rgba(255, 255, 255, 0.10) 0px,
    rgba(255, 255, 255, 0.06) 80px,
    rgba(0, 0, 0, 0.3) 160px,
    rgba(0, 0, 0, 0.5) 240px,
    rgba(0, 0, 0, 0.7) 320px,
    rgba(0, 0, 0, 0.85) 420px
  );
  background-repeat: no-repeat;
  background-size: 100vw 100vh;
  transition: background 80ms ease-out;
  will-change: background;
  pointer-events: none;
}

/* Fade Slow */
.fade-slow-enter-active, .fade-slow-leave-active {
  transition: opacity 1.5s ease;
}
.fade-slow-enter-from, .fade-slow-leave-to {
  opacity: 0;
}

/* Fade-Zoom Slow */
.fade-zoom-slow-enter-active {
  transition: opacity 1.5s ease, transform 1.5s ease;
}
.fade-zoom-slow-leave-active {
  transition: opacity 1s ease, transform 1s ease;
}
.fade-zoom-slow-enter-from,
.fade-zoom-slow-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
