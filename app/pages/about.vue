<template>
  <section class="min-h-screen px-6 py-24 text-white bg-gradient-to-b from-[#0f172a] to-black">
    <!-- Notif-->
    <transition name="slide-fade">
       <div
    v-if="showNotif"
    class="fixed top-6 left-1/2 -translate-x-1/2 w-[90vw] max-w-[300px] px-4 py-2 rounded-lg text-white shadow-lg z-50 text-center text-sm sm:text-base"
    style="background-color: #2e2e2e;"
  >
    Tekan box untuk melihat tingkat skill!
  </div>
    </transition>

    <div class="max-w-5xl mx-auto space-y-24">
      <!-- Box atas yg ada foto -->
      <div
        class="fade-section flex flex-col md:flex-row items-center gap-8 bg-white/10 p-8 rounded-2xl shadow-xl opacity-0 translate-y-4"
        ref="fadeEls"
      >
        <div class="w-64 aspect-[1/1]">
          <img
            src="/profile.jpeg"
            alt="Foto Profil"
            class="w-full h-full object-cover rounded-xl shadow-md"
          />
        </div>
        <div class="flex-1">
          <h2 class="text-3xl font-bold mb-4">Tentang Saya</h2>
          <p class="text-white/80 leading-relaxed">
          Mahasiswa semester 4 dengan minat mendalam dan pengalaman luas di bidang Teknologi Informasi dan Multimedia. Memiliki pengalaman cukup dalam troubleshooting, konfigurasi jaringan komputer, pengelolaan database serta memiliki keahlian dalam pengembangan perangkat lunak web dan mobile, termasuk sistem berbasis Internet of Things (IoT). 
          Menguasai berbagai bahasa pemrograman seperti html, python, dart, php dan tools relevan. Proaktif dalam mempelajari hal baru, mampu bekerja secara mandiri maupun dalam tim, mampu untuk memanajemen tim, serta berdedikasi untuk mencapai hasil yang optimal.     </p>  
        </div>
      </div>

      <!-- Skill -->
      <div class="fade-section text-center space-y-10 opacity-0 translate-y-4" ref="fadeEls">
        <h2 class="text-3xl font-bold">Skills</h2>
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

      <!-- Software Tools -->
      <div class="fade-section text-center space-y-10 opacity-0 translate-y-4" ref="fadeEls">
        <h2 class="text-3xl font-bold">Software Tools</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Coding Tools -->
          <div class="bg-white/10 rounded-2xl shadow-xl p-6 h-full">
            <h3 class="text-xl font-semibold mb-6">Coding Tools</h3>
            <div class="grid grid-cols-2 gap-4">
              <div
                v-for="tool in codingTools"
                :key="tool.name"
                class="relative group overflow-hidden rounded-xl cursor-pointer bg-white/10 p-3"
                @mouseenter="hovered = tool.name"
                @mouseleave="hovered = ''"
              >
                <div
                  class="absolute inset-0 bg-white/10 transition-transform duration-500 ease-in-out"
                  :class="{ 'translate-x-full': hovered === tool.name }"
                ></div>

                <div
                  class="relative z-10 flex items-center gap-3 transition-opacity duration-300"
                  :class="{ 'opacity-0': hovered === tool.name }"
                >
                  <img :src="tool.logo" :alt="tool.name" class="w-8 h-8 object-contain" />
                  <span class="text-white">{{ tool.name }}</span>
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

          <!-- Non-Coding Tools -->
          <div class="bg-white/10 rounded-2xl shadow-xl p-6 h-full">
            <h3 class="text-xl font-semibold mb-6">Non-Coding Tools</h3>
            <div class="grid grid-cols-2 gap-4">
              <div
                v-for="tool in nonCodingTools"
                :key="tool.name"
                class="relative group overflow-hidden rounded-xl cursor-pointer bg-white/10 p-3"
                @mouseenter="hovered = tool.name"
                @mouseleave="hovered = ''"
              >
                <div
                  class="absolute inset-0 bg-white/10 transition-transform duration-500 ease-in-out"
                  :class="{ 'translate-x-full': hovered === tool.name }"
                ></div>

                <div
                  class="relative z-10 flex items-center gap-3 transition-opacity duration-300"
                  :class="{ 'opacity-0': hovered === tool.name }"
                >
                  <img :src="tool.logo" :alt="tool.name" class="w-8 h-8 object-contain" />
                  <span class="text-white">{{ tool.name }}</span>
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
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const hovered = ref('')
const fadeEls = ref([])
const showNotif = ref(false)

const triggerNotif = () => {
  showNotif.value = true
  setTimeout(() => {
    showNotif.value = false
  }, 2000)
}

const skills = [
  { name: 'Next.Js', logo: '/logos/nextjs.svg', level: 'Intermediate' },
  { name: 'JavaScript', logo: '/logos/javascript.svg', level: 'Intermediate' },
  { name: 'Python', logo: '/logos/python.svg', level: 'Intermediate' },
  { name: 'PHP', logo: '/logos/php.svg', level: 'Intermediate' },
  { name: 'Flutter', logo: '/logos/flutter.svg', level: 'Beginner' },
  { name: 'Vue.Js', logo: '/logos/vue.svg', level: 'Beginner' },
  { name: 'C++', logo: '/logos/c.svg', level: 'Intermediate' },
  { name: 'Golang', logo: '/logos/golang.svg', level: 'Beginner' },
  { name: 'Tailwind', logo: '/logos/tailwind.svg', level: 'Beginner' },
]

const codingTools = [
  { name: 'VSCode', logo: '/logos/vscode.svg', level: 'Intermediate' },
  { name: 'MySQL', logo: '/logos/mysql.svg', level: 'Intermediate' },
  { name: 'Postman', logo: '/logos/postman.svg', level: 'Beginner' },
  { name: 'Git', logo: '/logos/github.svg', level: 'Intermediate' },
]

const nonCodingTools = [
  { name: 'Photoshop', logo: '/logos/photoshop.svg', level: 'Intermediate' },
  { name: 'Premiere', logo: '/logos/premiere.svg', level: 'Intermediate' },
  { name: 'Lightroom', logo: '/logos/lightroom.svg', level: 'Intermediate' },
  { name: 'Figma', logo: '/logos/figma.svg', level: 'Intermediate' },
]

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-enter')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15 }
  )

  const elements = document.querySelectorAll('.fade-section')
  elements.forEach(el => observer.observe(el))

  triggerNotif()
})
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeInUp 0.5s ease forwards;
}

.animate-enter {
  animation: fadeInUp 0.8s ease forwards;
}

img {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4));
  transition: transform 0.3s ease;
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 9999px;
  border: 2px solid transparent;
  background-clip: content-box;
  transition: background-color 0.3s ease;
}
::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, 0.4);
}
* {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
}

/* Transisi Notifikasi */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
