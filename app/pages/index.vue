<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// typing effect
const typingText = ref('')
const textsToType = ['Ivan AryaPutra', 'Junior Network Engineer', 'Portfolio Page']
let textIndex = 0
let charIndex = 0
let typingInterval

function typeNextLetter() {
  if (textIndex >= textsToType.length) textIndex = 0

  const currentText = textsToType[textIndex]
  typingText.value = currentText.slice(0, charIndex + 1)
  charIndex++

  if (charIndex === currentText.length) {
    clearInterval(typingInterval)
    setTimeout(() => {
      typingInterval = setInterval(typeNextLetter, 100)
      charIndex = 0
      textIndex++
    }, 2000)
  }
}

onMounted(() => {
  typingInterval = setInterval(typeNextLetter, 100)
})

onUnmounted(() => {
  clearInterval(typingInterval)
})
</script>

<template>
  <div class="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-wave-gradient px-4 sm:px-6 md:px-10">
    <!-- content-->
    <div class="flex flex-col items-center text-center space-y-8 w-full max-w-lg md:max-w-3xl">
      <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold min-h-[3rem] text-white">
        {{ typingText }}
        <span class="border-r-2 border-white animate-blink ml-1"></span>
      </h1>

      <!-- Social Icons -->
      <div class="flex space-x-4 sm:space-x-6 justify-center">
        <a href="https://www.linkedin.com/in/ivan-aryaputra" target="_blank"
          class="w-12 h-12 sm:w-16 sm:h-16 bg-black/20 hover:bg-black/40 rounded-xl flex items-center justify-center transition duration-300">
          <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" class="w-6 h-6 sm:w-10 sm:h-10" />
        </a>
        <a href="https://github.com/ivar-ui" target="_blank"
          class="w-12 h-12 sm:w-16 sm:h-16 bg-black/20 hover:bg-black/40 rounded-xl flex items-center justify-center transition duration-300">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" class="w-6 h-6 sm:w-10 sm:h-10 invert" />
        </a>
        <a href="https://www.behance.net/gallery/220316429/Graphic-Designer-Socmed-Specialist-Portfolio" target="_blank"
          class="w-12 h-12 sm:w-16 sm:h-16 bg-black/20 hover:bg-black/40 rounded-xl flex items-center justify-center transition duration-300">
          <img src="https://cdn-icons-png.flaticon.com/512/145/145799.png" class="w-6 h-6 sm:w-10 sm:h-10" />
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Typing & blink animation */
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
.animate-blink { animation: blink 1s step-start infinite; }

/* Gradient wave background (navy to black) */
.bg-wave-gradient {
  background: linear-gradient(180deg, #000022 0%, #000000 50%, #000022 100%);
  background-size: 100% 200%;
  animation: waveGradient 8s ease-in-out infinite alternate;
}

@keyframes waveGradient {
  0% { background-position: 0% 0%; }
  50% { background-position: 0% 100%; }
  100% { background-position: 0% 0%; }
}

/* Social icon hover */
a { background-color: rgba(0,0,0,0.2); }
</style>
