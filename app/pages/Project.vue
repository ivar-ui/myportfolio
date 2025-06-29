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
  <section class="h-screen flex flex-col items-center justify-center text-center text-white space-y-6 animate-fade-in">
    <h1 class="text-5xl md:text-6xl font-bold">My Project</h1>
    <p class="text-gray-300 text-lg">Scroll down to see all my works</p>
    <button @click="scrollToProjects" class="focus:outline-none">
      <svg class="w-8 h-8 animate-bounce text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  </section>

  <!-- Page Content -->
  <main v-if="showContent" ref="projectSection" class="relative z-10 min-h-screen px-4 py-20 text-white max-w-6xl mx-auto animate-fade-up">
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
          class="bg-black/20 backdrop-blur-md p-5 rounded-xl shadow-lg border border-purple-500/30 hover:scale-[1.02] transition-all duration-300 reveal relative"
        >
          <img :src="project.image" :alt="project.title" class="w-full h-40 object-cover rounded-md mb-4 border border-white/10 shadow" />

          <!-- Title -->
          <h3 class="text-xl font-semibold mb-2 min-h-[56px]">{{ project.title }}</h3>

          <!-- Description -->
          <p class="text-sm text-gray-300 mb-6 min-h-[72px]">{{ project.description }}</p>

          <!-- Tags + Icons Row -->
          <div class="flex justify-between items-center pt-2">
            <div class="flex flex-wrap gap-2">
              <span v-for="(tag, i) in project.tags" :key="i" class="px-2 py-1 text-xs rounded-full bg-purple-300/80 text-black">
                {{ tag }}
              </span>
            </div>
            <div class="flex gap-3">
              <a :href="project.github" target="_blank" class="text-white hover:text-purple-400 transition" title="View on GitHub">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.1 3.3 9.42 7.87 10.96.58.1.79-.25.79-.56v-2.15c-3.2.7-3.87-1.38-3.87-1.38-.52-1.34-1.28-1.7-1.28-1.7-1.05-.7.08-.69.08-.69 1.17.08 1.79 1.2 1.79 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.2-3.1-.12-.3-.52-1.5.12-3.14 0 0 .97-.31 3.2 1.2.92-.26 1.9-.39 2.88-.39.97 0 1.95.13 2.87.39 2.23-1.51 3.2-1.2 3.2-1.2.65 1.64.25 2.84.12 3.14.75.81 1.2 1.84 1.2 3.1 0 4.42-2.7 5.4-5.26 5.68.42.36.79 1.1.79 2.22v3.29c0 .31.21.66.8.55 4.56-1.54 7.85-5.86 7.85-10.96C23.5 5.74 18.27.5 12 .5z"/>
                </svg>
              </a>
              <a :href="project.demo" target="_blank" class="text-white hover:text-green-400 transition" title="Live Demo">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15 3H5a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2v-4h-2v4H5V5h10v4h2V5a2 2 0 00-2-2zm4.71 6.29a1 1 0 00-1.42 0l-5 5a1 1 0 000 1.42l5 5a1 1 0 001.42-1.42L16.41 15H22v-2h-5.59l3.3-3.29a1 1 0 000-1.42z"/>
                </svg>
              </a>
            </div>
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

          <!-- Title -->
          <h3 class="text-xl font-semibold mb-2 min-h-[56px]">{{ project.title }}</h3>

          <!-- Description -->
          <p class="text-sm text-gray-300 mb-6 min-h-[72px]">{{ project.description }}</p>

          <!-- Tags -->
          <div class="flex flex-wrap gap-2 pt-2">
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
  { title: 'Fundraising Mobile App', description: 'Merancang backend aplikasi mobile Fundraising menggunakan Flutter yang terintegrasi dengan website Fundraising berbasis laravel.', tags: ['Flutter', 'Laravel', 'MySQL'], image: '/projects/donasi.png', github: 'https://github.com/ivar-ui/kitabantu_mobile', demo: 'https://your-demo-link.com/fundraising-app' },
  { title: 'YukRental, Motorcycle Rent Website', description: 'Merancang backend CRUD website rental yang dapat diakses oleh customer dan admin menggunakan MySql Database.', tags: ['Html', 'Php', 'Bootstrap'], image: '/projects/yukrental.png', github: 'https://github.com/ivar-ui/yukrental', demo: 'https://ivardeploy.great-site.net/csyukrental/' },
  { title: 'Garbage Filtering System Website', description: 'Merancang dan mengembangkan sistem AI yang dapat membaca beberapa gesture tangan dan emosi wajah secara real time menggunakan python.', tags: ['Arduino', 'C++', 'Php'], image: '/projects/iot.png', github: 'https://github.com/ivar-ui/garbage_filtering_sistem', demo: 'https://github.com/ivar-ui/garbage_filtering_sistem' },
  { title: 'Emotional & Hand Gesture Detection', description: 'Merancang dan mengembangkan sistem IoT yang dapat diakses melalui website menggunakan database yang telah terintegrasi dengan sensor dan arduino.', tags: ['Arduino', 'C++', 'Php'], image: '/projects/hand.png', github: 'https://github.com/ivar-ui/hand_gesture', demo: 'https://github.com/ivar-ui/hand_gesture' },
  { title: 'Frent Agriculture Website', description: 'Merancang dan mengembangkan website rental dan jual beli produk pertanian berbasis Internet of Things.', tags: ['Arduino', 'C++', 'Php'], image: '/projects/frent.png', github: 'https://github.com/ivar-ui/frentagricult', demo: 'https://frentagricult.netlify.app/' },
  { title: 'Design UI/UX Reshine Mobile App', description: 'Merancang dan mengembangkan design UI aplikasi jual beli template design dan jasa joki multimedia.', tags: ['Figma', 'C++', 'Php'], image: '/projects/uiux.png', github: 'https://github.com/username/fundraising-app', demo: 'https://www.figma.com/design/HqhsgmEg9OHXiHjzlvk1rp/Userflow-IMK?node-id=0-1' },
  { title: 'Design UI/UX Home gardening Mobile App', description: 'Merancang dan mengembangkan design UI aplikasi mobile home gardening yang interaktif dan berbasis Internet of Things secara real time.', tags: ['Figma', 'dart', 'Php'], image: '/projects/homgar.png', github: 'https://github.com/username/fundraising-app', demo: 'https://www.figma.com/proto/AnfJauFzqWtu2zQY7EYbEC/Home-Garden?page-id=101%3A1295&type=design&node-id=114-1702&viewport=-364%2C683%2C0.18&t=bq4XDuHRKkWVRn8J-1&scaling=scale-down&starting-point-node-id=114%3A1702' },
]

const multimedia = [
  { title: 'Company Profile Video Gumelaring Sasangka Aji', description: 'Video kampanye Internasional Wayang Karakter Brawijayan berdurasi total 10 menit lengkap dengan efek dan sound design.', tags: ['Premiere Pro', 'After Effects'], image: '/projects/gsa.JPG' },
  { title: 'Brawijaya One Learning', description: 'Video editor : video pembelajaran jarak jauh beberapa fakultas Universitas Brawijaya.', tags: ['Adobe Premiere', 'Capcut','Video Editor'], image: '/projects/brone.jpeg' },
  { title: 'Event Documentation', description: 'Video dokumentasi event MICE kelas N3C Administrasi Bisnis.', tags: ['Video Editing', 'Cinematic', 'Sound Design'], image: '/projects/event.jpg' },
  { title: 'Kultum : Pimipinan Daerah Muhammadiyah Kota Malang', description: 'Take dan editing 30 video kultum bulan suci ramadhan para Pimpinan Muhammadiyah Se-Kota Malang', tags: ['Videography', 'Video Editing'], image: '/projects/kultum.jpeg' },
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
