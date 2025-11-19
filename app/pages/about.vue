<template>
  <section
    class="min-h-screen px-6 py-24 text-white bg-gradient-to-b from-[#0f172a] to-black relative overflow-visible"
  >
    <transition name="slide-fade">
      <div
        v-if="showNotif"
        class="fixed top-6 left-1/2 -translate-x-1/2 w-[90vw] max-w-[300px] px-4 py-2 rounded-lg text-white shadow-lg z-[9999] text-center text-sm sm:text-base"
        style="background-color: #2e2e2e;"
      >
        Tekan box untuk melihat tingkat skill!
      </div>
    </transition>

    <div
      class="pointer-events-none fixed inset-0 z-[5] bg-black transition-opacity duration-500"
      :style="{ opacity: overlayOpacity }"
    ></div>

    <div class="max-w-5xl mx-auto space-y-24 relative overflow-visible z-10">
      <div
        class="reveal fade-section flex flex-col md:flex-row items-center gap-8 bg-white/10 p-8 rounded-2xl shadow-xl opacity-0 translate-y-4 overflow-visible"
      >
        <div class="w-64 aspect-[1/1]">
          <img
            src="/newpp.jpg"
            alt="Foto Profil"
            class="w-full h-full object-cover rounded-xl shadow-md"
          />
        </div>
        <div class="flex-1">
          <h2 class="text-3xl font-bold mb-4">Tentang Saya</h2>
          <p class="text-white/80 leading-relaxed">
            Saya adalah mahasiswa semester akhir Teknologi Informasi yang memiliki pengalaman dalam bidang jaringan komputer. Saya memiliki pengalaman tentang instalasi, pengelolaan dan troubleshooting jaringan, konfigurasi routing dan switching, konfigurasi CCTV, pengembangan perangkat IoT, dan virtualisasi cloud. Saya sangat termotivasi untuk terus belajar dan mengikuti perkembangan teknologi informasi, selain itu saya memiliki sertifikasi di bidang jaringan yang akan mendukung kemampuan saya untuk berkontribusi dalam tim IT untuk mendukung pencapaian tujuan perusahaan.
          </p>
        </div>
      </div>

      <div class="reveal fade-section text-center space-y-10 opacity-0 translate-y-4">
        <h2 class="text-3xl font-bold">Technical Skills</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div
            v-for="(tech, index) in technicalSkills"
            :key="tech.name"
            class="group"
            @click="isMobile && toggleFlip(index)"
            @mouseenter="!isMobile && (flippedCards[index] = true)"
            @mouseleave="!isMobile && (flippedCards[index] = false)"
          >
            <div
              class="relative w-full h-0 pb-[150%] transition-transform duration-700 transform-style-preserve-3d"
              :style="{ transform: flippedCards[index] ? 'rotateY(180deg)' : 'rotateY(0deg)' }"
            >
              <div
                class="absolute inset-0 backface-hidden rounded-xl overflow-hidden shadow-xl bg-white/10 flex flex-col"
              >
                <img
                  :src="tech.photo"
                  :alt="tech.name"
                  class="w-full h-full object-cover"
                />
                <div class="absolute bottom-0 w-full bg-black/70 py-3 text-center">
                  <p class="font-semibold text-lg text-white">{{ tech.name }}</p>
                </div>
              </div>

              <div
                class="absolute inset-0 backface-hidden rounded-xl overflow-hidden shadow-xl bg-white/10 text-white p-4 [transform:rotateY(180deg)] flex flex-col justify-center items-center"
              >
                <p class="font-semibold text-xl mb-3">{{ tech.name }}</p>

                <template v-if="tech.name === 'Device Installation'">
                  <div class="flex flex-col items-center justify-center mt-6 space-y-4">
                    <div class="grid grid-cols-2 gap-4">
                      <img
                        v-for="(logo, index2) in tech.logos"
                        :key="logo.name"
                        :src="logo.src"
                        :alt="logo.name"
                        class="object-contain h-16 w-16"
                      />
                    </div>
                  </div>
                </template>

                <template v-else>
                  <ul
                    class="list-disc list-inside text-sm space-y-1 text-white/80 text-left"
                  >
                    <li v-for="item in tech.details" :key="item">{{ item }}</li>
                  </ul>
                  <div v-if="tech.logos" class="flex flex-wrap gap-3 mt-3 justify-center">
                    <img
                      v-for="logo in tech.logos"
                      :key="logo.name"
                      :src="logo.src"
                      :alt="logo.name"
                      class="h-8 w-8 object-contain"
                    />
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="reveal fade-section text-center space-y-10 opacity-0 translate-y-4">
        <h2 class="text-3xl font-bold">Software Skills</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div
            v-for="skill in skills"
            :key="skill.name"
            class="relative group overflow-hidden rounded-xl cursor-pointer"
            @mouseenter="hovered = skill.name"
            @mouseleave="hovered = ''"
          >
            <div
              class="absolute inset-0 bg-white/10 transition-transform duration-500 ease-in-out"
              :class="{ 'translate-x-full': hovered === skill.name }"
            ></div>

            <div
              class="relative z-10 flex items-center gap-4 p-4 transition-opacity duration-300"
              :class="{ 'opacity-0': hovered === skill.name }"
            >
              <img :src="skill.logo" :alt="skill.name" class="h-12 w-12 object-contain" />
              <p class="font-semibold text-lg">{{ skill.name }}</p>
            </div>

            <div
              v-if="hovered === skill.name"
              class="absolute inset-0 bg-white/20 flex items-center justify-center z-10 opacity-0 animate-fade-in"
            >
              <p class="text-white-400 text-sm font-semibold">{{ skill.level }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="reveal fade-section text-center space-y-10 opacity-0 translate-y-4">
        <h2 class="text-3xl font-bold">Tools</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div
            v-for="tool in allTools"
            :key="tool.name"
            class="relative group overflow-hidden rounded-xl cursor-pointer"
            @mouseenter="hovered = tool.name"
            @mouseleave="hovered = ''"
          >
            <div
              class="absolute inset-0 bg-white/10 transition-transform duration-500 ease-in-out"
              :class="{ 'translate-x-full': hovered === tool.name }"
            ></div>

            <div
              class="relative z-10 flex items-center gap-4 p-4 transition-opacity duration-300"
              :class="{ 'opacity-0': hovered === tool.name }"
            >
              <img :src="tool.logo" :alt="tool.name" class="h-12 w-12 object-contain" />
              <p class="font-semibold text-lg">{{ tool.name }}</p>
            </div>

            <div
              v-if="hovered === tool.name"
              class="absolute inset-0 bg-white/20 flex items-center justify-center z-10 opacity-0 animate-fade-in"
            >
              <p class="text-white-400 text-sm font-semibold">{{ tool.level }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

const hovered = ref('')
const showNotif = ref(false)
const flippedCards = ref([])
const overlayOpacity = ref(0)
let ticking = false
const isMobile = ref(false)

const handleReveal = () => {
  const reveals = document.querySelectorAll('.reveal')
  const windowHeight = window.innerHeight
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top
    if (top < windowHeight - 100) el.classList.add('active')
    else el.classList.remove('active')
  })
}

const updateOverlay = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      overlayOpacity.value = Math.min(window.scrollY / 800, 0.6)
      ticking = false
    })
    ticking = true
  }
}

const toggleFlip = (index) => {
  flippedCards.value[index] = !flippedCards.value[index]
}

const technicalSkills = [
  { name: 'Device Configuration', photo: '/about/device.jpg', details: ['Routing', 'Switching', 'Radio P2P', 'Virtualization', 'Firewall', 'Data Backup'] },
  { name: 'Device Installation', photo: '/about/install.jpg', details: [], logos: [
    { name: 'Mikrotik', src: '/logos/mikrotik.png' },
    { name: 'Ubiquiti', src: '/logos/ubiquiti.png' },
    { name: 'Ruijie', src: '/logos/ruijie.png' },
    { name: 'HPE', src: '/logos/hpe.png' },
    { name: 'SPC', src: '/logos/spc.jpg' },
    { name: 'Hikvision', src: '/logos/hikvision.png' }
  ]},
  { name: 'Maintenance', photo: '/about/maintenance.jpg', details: ['Splicing Fiber Optic', 'Troubleshoot Jaringan', 'Upgrade Firmware', 'Reinstalasi Device'] },
  { name: 'CCTV Installation', photo: '/about/cctv.jpg', details: ['Konfigurasi Ip Camera', 'Setup Network Video Recorder', 'Pengaturan Zone Pointing', 'Monitoring Remote'] }
]

const skills = [
  { name: 'JavaScript', logo: '/logos/javascript.svg', level: 'Intermediate' },
  { name: 'Python', logo: '/logos/python.svg', level: 'Intermediate' },
  { name: 'PHP', logo: '/logos/php.svg', level: 'Intermediate' },
  { name: 'Flutter', logo: '/logos/flutter.svg', level: 'Beginner' },
  { name: 'C++', logo: '/logos/c.svg', level: 'Intermediate' },
  { name: 'Laravel', logo: '/logos/laravel.svg', level: 'Intermediate' },
]

// 🚀 Tools digabungkan menjadi satu array tunggal
const allTools = [
  // ConfigTools
  { name: 'VSCode', logo: '/logos/vscode.svg', level: 'Intermediate' },
  { name: 'MySQL', logo: '/logos/mysql.svg', level: 'Intermediate' },
  { name: 'Postman', logo: '/logos/postman.svg', level: 'Beginner' },
  { name: 'Git', logo: '/logos/github.svg', level: 'Intermediate' },
  { name: 'GNS3', logo: '/logos/gns3.png', level: 'Intermediate' },
  { name: 'Winbox', logo: '/logos/winbox.png', level: 'Intermediate' },
  { name: 'Proxmox', logo: '/logos/proxmox.png', level: 'Intermediate' },
  { name: 'PuTTY', logo: '/logos/putty.png', level: 'Intermediate' },
  // multimed Tools
  { name: 'Photoshop', logo: '/logos/photoshop.svg', level: 'Intermediate' },
  { name: 'Premiere', logo: '/logos/premiere.svg', level: 'Intermediate' },
  { name: 'Lightroom', logo: '/logos/lightroom.svg', level: 'Intermediate' },
  { name: 'Figma', logo: '/logos/figma.svg', level: 'Intermediate' },
]

const triggerNotif = () => {
  showNotif.value = true
  setTimeout(() => (showNotif.value = false), 5000)
}

const handleScroll = () => {
  updateOverlay()
  handleReveal()
}

onMounted(() => {
  flippedCards.value = Array(technicalSkills.length).fill(false)
  triggerNotif()
  handleReveal()
  isMobile.value = window.innerWidth <= 768
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
.reveal.active {
  opacity: 1 !important;
  transform: translateY(0) !important;
  transition: all 0.8s ease;
}
.animate-fade-in { animation: fadeInUp 0.5s ease forwards; }
.backface-hidden { backface-visibility: hidden; }
.transform-style-preserve-3d { transform-style: preserve-3d; }
.group { perspective: 1000px; -webkit-tap-highlight-color: transparent; }
img { filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4)); transition: transform 0.3s ease; }
::-webkit-scrollbar { width: 10px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background-color: rgba(255, 255, 255, 0.2); border-radius: 9999px; border: 2px solid transparent; background-clip: content-box; transition: background-color 0.3s ease; }
::-webkit-scrollbar-thumb:hover { background-color: rgba(255, 255, 255, 0.4); }
* { scrollbar-width: thin; scrollbar-color: rgba(255, 255, 255, 0.2) transparent; }
.slide-fade-enter-active, .slide-fade-leave-active { transition: all 0.5s ease; }
.slide-fade-enter-from { opacity: 0; transform: translateY(-20px); }
.slide-fade-leave-to { opacity: 0; transform: translateY(-20px); }
</style>