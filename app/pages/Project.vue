<template>
  <!-- Animated Gradient Background -->
  <div class="fixed inset-0 -z-30 animate-gradient bg-gradient-to-br from-[#2a004f] via-[#0d1a45] to-[#000000]"></div>

  <!-- Particle Stars Canvas -->
  <canvas ref="starCanvas" class="fixed inset-0 -z-20 pointer-events-none w-full h-full"></canvas>

  <!-- Stars Layer -->
  <div class="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
    <div class="stars"></div>
    <div class="stars2"></div>
    <div class="stars3"></div>
  </div>

  <!-- Dynamic Black Overlay -->
  <div
    class="fixed inset-0 -z-5 pointer-events-none transition-opacity duration-300"
    :style="{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }"
  ></div>

  <!-- Hero / Intro Section -->
  <section
    class="h-screen flex flex-col items-center justify-center text-center text-white space-y-6 animate-fade-in"
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
  <main
    v-if="showContent"
    ref="projectSection"
    class="relative z-10 min-h-screen px-4 py-20 text-white max-w-6xl mx-auto animate-fade-up"
  >
    <div class="space-y-16">
      <!-- Header -->
      <section class="text-center space-y-4">
        <h1 class="text-4xl md:text-5xl font-bold">Teknologi Informasi</h1>
        <p class="text-lg max-w-2xl mx-auto text-gray-300">
          Berikut adalah beberapa proyek yang telah saya kerjakan dalam bidang pengembangan website, mobile, dan teknologi lainnya.
        </p>
      </section>

      <!-- Project Cards -->
      <section class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(project, index) in projects"
          :key="index"
          class="bg-black/20 backdrop-blur-md p-5 rounded-xl shadow-lg border border-purple-500/30 hover:scale-[1.02] transition-all duration-300 reveal"
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
          class="bg-black/30 backdrop-blur-md p-5 rounded-xl shadow-lg border border-purple-500/30 hover:scale-[1.02] transition-all duration-300 reveal"
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
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'

const showContent = ref(false)
const projectSection = ref<HTMLElement | null>(null)
const overlayOpacity = ref(0)
const starCanvas = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  setTimeout(() => {
    showContent.value = true
  }, 50)

  window.addEventListener('scroll', updateOverlay)
  window.addEventListener('scroll', handleReveal)
  handleReveal()

  // Three.js stars
  if (!starCanvas.value) return
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 1

  const renderer = new THREE.WebGLRenderer({ canvas: starCanvas.value, alpha: true, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)

  const starsGeometry = new THREE.BufferGeometry()
  const starCount = 1000
  const starVertices: number[] = []

  for (let i = 0; i < starCount; i++) {
    const x = (Math.random() - 0.5) * 2000
    const y = (Math.random() - 0.5) * 2000
    const z = -Math.random() * 2000
    starVertices.push(x, y, z)
  }

  starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3))

  const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 1.2, sizeAttenuation: true })

  const stars = new THREE.Points(starsGeometry, starsMaterial)
  scene.add(stars)

  const animate = () => {
    requestAnimationFrame(animate)
    stars.rotation.y += 0.0005
    renderer.render(scene, camera)
  }

  animate()

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateOverlay)
  window.removeEventListener('scroll', handleReveal)
})

const scrollToProjects = () => {
  const target = projectSection.value
  if (!target) return
  const targetY = target.offsetTop
  const startY = window.scrollY
  const distance = targetY - startY
  const duration = 1500
  let startTime: number | null = null
  const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
  const animateScroll = (currentTime: number) => {
    if (!startTime) startTime = currentTime
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const ease = easeInOutCubic(progress)
    window.scrollTo(0, startY + distance * ease)
    if (elapsed < duration) requestAnimationFrame(animateScroll)
  }
  requestAnimationFrame(animateScroll)
}

const updateOverlay = () => {
  const scrollTop = window.scrollY
  const maxScroll = 600
  const opacity = Math.min(scrollTop / maxScroll, 1) * 0.6
  overlayOpacity.value = opacity
}

const handleReveal = () => {
  const reveals = document.querySelectorAll('.reveal')
  const windowHeight = window.innerHeight
  for (const el of reveals) {
    const top = el.getBoundingClientRect().top
    if (top < windowHeight - 50) el.classList.add('animate-fade-up')
  }
}

const projects = [
  { title: 'Donasi App (Flutter + PHP)', description: 'Merancang backend aplikasi mobile Fundraising menggunakan Flutter yang terintegrasi dengan website Fundraising berbasis laravel.', tags: ['Flutter', 'Laravel', 'MySQL'], image: '/projects/donasi.jpg' },
  { title: 'Rent Website', description: 'Merancang backend website rental antara customer dan admin menggunakan PHP, MySql yang memiliki fitur CRUD.', tags: ['Html', 'Php', 'Bootstrap'], image: '/projects/rent.jpg' },
  { title: 'IoT Garbage Filtering Sistem', description: 'Alat makan otomatis berbasis IoT yang dapat dipantau lewat aplikasi mobile.', tags: ['Arduino', 'C++', 'Php'], image: '/projects/iot.jpg' },
]

const multimedia = [
  { title: 'Company Profile Video Gumelaring Sasangka Aji', description: 'Video kampanye Internasional Wayang Karakter Brawijayan berdurasi total 10 menit lengkap dengan efek dan sound design.', tags: ['Premiere Pro', 'After Effects'], image: '/projects/gsa.JPG' },
  { title: 'Brawijaya One Learning', description: 'Video editor : video pembelajaran jarak jauh beberapa fakultas Universitas Brawijaya.', tags: ['Adobe Premiere', 'Capcut','Video Editor'], image: '/projects/brone.jpeg' },
  { title: 'Event Documentation', description: 'Video dokumentasi event MICE kelas N3C Administrasi Bisnis.', tags: ['Video Editing', 'Cinematic', 'Sound Design'], image: '/projects/event.jpg' },
  { title: 'Kultum : Pimipnan Daerah Muhammadiyah Kota Malang', description: 'Take dan editing 30 video kultum bulan suci ramadhan para Pimpinan Muhammadiyah Se-Kota Malang', tags: ['Videography', 'Video Editing'], image: '/projects/kultum.jpeg' },
  { title: 'Kampanye Wayang Karakter : Brawiijayan Tosan Aji Fest', description: 'Take video dan Editing highlight dengan tema Karakter Brawijayan Lakon Pangeran Sutasoma.', tags: ['Directing', 'Editing', 'Videography'], image: '/projects/gsa2.jpeg' },
  { title: 'Company Profile D-III Adminitrasi Bisnis Fakultas Vokasi', description: 'Take video company profile Program Studi Administrasi Bisnis 2025.', tags: ['Videographer'], image: '/projects/comprof.jpeg' },
]
</script>

<style scoped>
@keyframes gradientAnimation {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
.animate-gradient { background-size: 400% 400%; animation: gradientAnimation 15s ease infinite; }

@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in { animation: fade-in 1s ease-out forwards; }

@keyframes fade-up {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-fade-up { animation: fade-up 1s ease-out forwards; }

.stars, .stars2, .stars3 {
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: repeat;
  background-position: 0 0;
  animation: moveStars 100s linear infinite;
}
.stars { background-image: url("https://raw.githubusercontent.com/Kalabasa/superstar-bg/main/stars1.png"); }
.stars2 { background-image: url("https://raw.githubusercontent.com/Kalabasa/superstar-bg/main/stars2.png"); animation-duration: 200s; }
.stars3 { background-image: url("https://raw.githubusercontent.com/Kalabasa/superstar-bg/main/stars3.png"); animation-duration: 300s; }

@keyframes moveStars {
  0% { transform: translateY(0); }
  100% { transform: translateY(-1000px); }
}
</style>
