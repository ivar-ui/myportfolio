<template>
  <div>
    <!-- Custom glowing purple cursor -->
    <div id="custom-cursor"></div>

    <!-- Purple spark trail - 30 particles -->
    <div v-for="i in 30" :key="i" class="spark"></div>

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  const cursor = document.getElementById('custom-cursor')
  const sparks = Array.from(document.querySelectorAll('.spark'))
  const positions = Array(sparks.length).fill({ x: 0, y: 0 })

  let mouseX = window.innerWidth / 2
  let mouseY = window.innerHeight / 2

  const handleMouseMove = (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
  }

  const animate = () => {
    // Center the cursor by offsetting half its width/height
    const offsetX = 16  // half of #custom-cursor width (32px)
    const offsetY = 16

    cursor.style.transform = `translate3d(${mouseX - offsetX}px, ${mouseY - offsetY}px, 0)`

    // Spark trail animation
    positions[0] = { x: mouseX, y: mouseY }
    for (let i = 1; i < positions.length; i++) {
      const prev = positions[i - 1]
      const curr = positions[i]
      positions[i] = {
        x: curr.x + (prev.x - curr.x) * 0.25,
        y: curr.y + (prev.y - curr.y) * 0.25,
      }
    }

    sparks.forEach((spark, i) => {
      const scale = 1 - i / sparks.length
      const sparkOffset = 6 // half of .spark width (12px)
      spark.style.transform = `translate3d(${positions[i].x - sparkOffset}px, ${positions[i].y - sparkOffset}px, 0) scale(${scale})`
      spark.style.opacity = `${scale}`
    })

    requestAnimationFrame(animate)
  }

  window.addEventListener('mousemove', handleMouseMove)
  animate()

  onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove)
  })
})
</script>

<style scoped>
* {
  cursor: none !important;
}

/* Glowing purple cursor */
#custom-cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #c084fc;
  box-shadow:
    0 0 15px #a855f7,
    0 0 30px #9333ea,
    0 0 60px #7e22ce;
  pointer-events: none;
  z-index: 10000;
  mix-blend-mode: screen;
  transform: translate3d(0, 0, 0);
  transition: transform 0.05s ease-out;
}

/* Purple spark trail */
.spark {
  position: fixed;
  top: 0;
  left: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #a855f7;
  box-shadow:
    0 0 10px rgba(168, 85, 247, 0.8),
    0 0 20px rgba(147, 51, 234, 0.6),
    0 0 32px rgba(126, 34, 206, 0.4);
  pointer-events: none;
  z-index: 9999;
  transform: translate3d(0, 0, 0);
  transition: transform 0.05s linear;
  will-change: transform, opacity;
}
@media (hover: none) and (pointer: coarse) {
  * {
    cursor: none !important;
  }
}

</style>
