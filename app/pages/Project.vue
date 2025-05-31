<template>
  <!-- Video Background -->
  <transition name="fade" appear>
    <div
      v-if="showVideo"
      class="fixed inset-0 -z-20 overflow-hidden pointer-events-none"
    >
      <video
        autoplay
        muted
        loop
        playsinline
        class="w-full h-full object-cover scale-[1.1] blur-[1px]"
      >
        <source src="/project.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  </transition>

  <!-- Dynamic Black Overlay -->
  <div
    class="fixed inset-0 -z-10 pointer-events-none transition-opacity duration-300"
    :style="{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }"
  ></div>

  <!-- Hero / Intro Section -->
  <section
    class="h-screen flex flex-col items-center justify-center text-center text-white space-y-6"
  >
    <h1 class="text-5xl md:text-6xl font-bold">My Project</h1>
    <p class="text-gray-300 text-lg">Scroll down to see all my works</p>
    <button @click="scrollToProjects" class="focus:outline-none">
      <svg
        class="w-8 h-8 animate-bounce text-white"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  </section>

  <!-- Page Content -->
  <transition name="fade-slide" appear>
    <main
      v-if="showContent"
      ref="projectSection"
      class="relative z-10 min-h-screen px-4 py-20 text-white max-w-6xl mx-auto"
    >
      <div class="space-y-16">
        <!-- Header -->
        <section class="text-center space-y-4">
          <h1 class="text-4xl md:text-5xl font-bold">My Projects</h1>
          <p class="text-lg max-w-2xl mx-auto text-gray-300">
            Berikut adalah beberapa proyek yang telah saya kerjakan dalam bidang pengembangan website, mobile, dan teknologi lainnya.
          </p>
        </section>

        <!-- Project Cards -->
        <section class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(project, index) in projects"
            :key="index"
            class="bg-[#2b003f]/40 backdrop-blur-md p-5 rounded-xl shadow-lg border border-purple-500/30 hover:scale-[1.02] transition-all duration-300"
          >
            <img
              :src="project.image"
              :alt="project.title"
              class="w-full h-40 object-cover rounded-md mb-4 border border-white/10 shadow"
            />
            <h3 class="text-xl font-semibold mb-2">{{ project.title }}</h3>
            <p class="text-sm text-gray-300 mb-4">{{ project.description }}</p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="(tag, i) in project.tags"
                :key="i"
                class="px-2 py-1 text-xs rounded-full bg-purple-300/80 text-black"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </section>

        <!-- Multimedia Section -->
        <section class="text-center space-y-4 pt-10">
          <h2 class="text-3xl md:text-4xl font-bold">Multimedia</h2>
          <p class="text-lg max-w-2xl mx-auto text-gray-300">
            Kumpulan proyek multimedia seperti video profil, animasi, dan dokumentasi visual.
          </p>
        </section>

        <!-- Multimedia Cards -->
        <section class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(project, index) in multimedia"
            :key="index"
            class="bg-[#2b003f]/40 backdrop-blur-md p-5 rounded-xl shadow-lg border border-purple-500/30 hover:scale-[1.02] transition-all duration-300"
          >
            <img
              :src="project.image"
              :alt="project.title"
              class="w-full h-40 object-cover rounded-md mb-4 border border-white/10 shadow"
            />
            <h3 class="text-xl font-semibold mb-2">{{ project.title }}</h3>
            <p class="text-sm text-gray-300 mb-4">{{ project.description }}</p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="(tag, i) in project.tags"
                :key="i"
                class="px-2 py-1 text-xs rounded-full bg-purple-300/80 text-black"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>
  </transition>
</template>

<script setup lang="ts">

const showVideo = ref(false)
const showContent = ref(false)
const projectSection = ref<HTMLElement | null>(null)
const overlayOpacity = ref(0)

onMounted(() => {
  setTimeout(() => {
    showVideo.value = true
    showContent.value = true
  }, 50)

  window.addEventListener('scroll', updateOverlay)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateOverlay)
})

const scrollToProjects = () => {
  const target = projectSection.value
  if (!target) return

  const targetY = target.offsetTop
  const startY = window.scrollY
  const distance = targetY - startY
  const duration = 1500 // 1.5 detik

  let startTime: number | null = null

  const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

  const animateScroll = (currentTime: number) => {
    if (!startTime) startTime = currentTime
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const ease = easeInOutCubic(progress)
    window.scrollTo(0, startY + distance * ease)

    if (elapsed < duration) {
      requestAnimationFrame(animateScroll)
    }
  }

  requestAnimationFrame(animateScroll)
}

const updateOverlay = () => {
  const scrollTop = window.scrollY
  const maxScroll = 600
  const opacity = Math.min(scrollTop / maxScroll, 1) * 0.6
  overlayOpacity.value = opacity
}

const projects = [
  {
    title: 'Donasi App (Flutter + PHP)',
    description: 'Aplikasi web donasi menggunakan Flutter Web terhubung dengan backend PHP dan MySQL.',
    tags: ['Flutter', 'PHP', 'MySQL'],
    image: '/projects/donasi.jpg',
  },
  {
    title: 'E-commerce Website',
    description: 'Website toko online dengan fitur keranjang, login, dan payment gateway.',
    tags: ['Vue.js', 'Tailwind', 'Stripe'],
    image: '/projects/ecommerce.jpg',
  },
  {
    title: 'IoT Smart Feeder',
    description: 'Alat makan otomatis berbasis IoT yang dapat dipantau lewat aplikasi mobile.',
    tags: ['Arduino', 'Flutter', 'MQTT'],
    image: '/projects/feeder.jpg',
  },
  {
    title: 'Portfolio Website',
    description: 'Website pribadi untuk menampilkan karya, pengalaman, dan kontak.',
    tags: ['Nuxt 3', 'Tailwind CSS'],
    image: '/projects/portfolio.jpg',
  },
  {
    title: 'Event Booking System',
    description: 'Sistem reservasi acara dengan fitur admin panel dan autentikasi.',
    tags: ['Laravel', 'Vue.js', 'MySQL'],
    image: '/projects/event.jpg',
  },
]

const multimedia = [
  {
    title: 'Company Profile Video',
    description: 'Video profil perusahaan berdurasi 3 menit lengkap dengan motion graphic dan musik latar.',
    tags: ['Premiere Pro', 'After Effects'],
    image: '/projects/company-profile.jpg',
  },
  {
    title: 'Produk Showcase',
    description: 'Video promosi produk dengan teknik sinematik, slow motion, dan color grading.',
    tags: ['Cinematography', 'DaVinci Resolve'],
    image: '/projects/showcase.jpg',
  },
  {
    title: '2D Animation Explainer',
    description: 'Animasi edukatif untuk aplikasi digital menggunakan ilustrasi dan narasi.',
    tags: ['After Effects', 'Illustrator'],
    image: '/projects/animation.jpg',
  },
  {
    title: 'Wedding Documentation',
    description: 'Video dokumentasi pernikahan lengkap dari prewedding hingga resepsi.',
    tags: ['Video Editing', 'Cinematic', 'Sound Design'],
    image: '/projects/wedding.jpg',
  },
  {
    title: 'Music Video',
    description: 'Proyek video musik indie dengan konsep visual storytelling dan efek transisi kreatif.',
    tags: ['Music', 'Storyboarding', 'Color Grading'],
    image: '/projects/music.jpg',
  },
  {
    title: 'Short Film Project',
    description: 'Film pendek 5 menit dengan tema sosial dan sinematografi profesional.',
    tags: ['Directing', 'Editing', 'Lighting'],
    image: '/projects/shortfilm.jpg',
  },
  {
    title: 'Motion Graphic Logo',
    description: 'Animasi logo berdurasi 10 detik untuk opening video konten YouTube.',
    tags: ['Logo Design', 'Motion Graphic'],
    image: '/projects/logo-motion.jpg',
  },
]
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Animasi fade-slide (fade + slide up) */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition:
    opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}

html,
body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  width: 100%;
  min-height: 100vh;
  background-color: black;
}

* {
  box-sizing: border-box;
  max-width: 100vw;
}

::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}
</style>
