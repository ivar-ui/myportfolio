<template>
    <!-- Background Video -->
    <div v-if="isClient" class="fixed inset-0 z-[-2] overflow-hidden pointer-events-none">
      <video autoplay muted loop playsinline class="w-full h-full object-cover scale-[1.1] blur-[1px]">
        <source src="/about.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  
    <!-- Overlay gradient -->
    <div class="fixed inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent z-[-1] pointer-events-none"></div>
  
    <!-- Main Content with enter transition -->
    <transition name="fade-slide-in" appear>
      <main v-if="pageVisible" class="text-white min-h-screen px-4 py-24 relative z-10 overflow-y-auto">
        <div class="max-w-5xl mx-auto space-y-20">
  
          <!-- About Me -->
          <section id="about" class="text-center space-y-5 pt-40">
            <h1 class="text-5xl font-extrabold tracking-wide drop-shadow-lg">About Me</h1>
            <p class="text-lg max-w-3xl mx-auto leading-relaxed text-white/90">
              Saya adalah mahasiswa Semester 4 dengan pengalaman dalam bidang Teknologi Informasi dan Multimedia, seperti troubleshooting, networking, perancangan software berbasis website, mobile, dan Internet of Things serta editing menggunakan beberapa bahasa pemrograman seperti php, dart, C++, dan python. Saya memiliki rasa ingin tahu yang tinggi, mampu bekerja secara kolaboratif dan individual, serta fokus dalam menyelesaikan tugas dan berkomitmen untuk memberikan hasil yang terbaik.
            </p>
            <div class="pt-4">
              <svg @click="revealAndScroll" class="w-6 h-6 animate-bounce mx-auto cursor-pointer text-purple-300 hover:text-purple-400 transition-colors" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </section>
  
          <!-- Details -->
          <transition name="fade-slide-up">
            <section v-show="showDetails" id="details" ref="detailsSection" class="relative space-y-32">
  
              <!-- Education -->
              <div class="relative">
                <h2 class="text-3xl font-bold mb-10 text-center">🎓 Education</h2>
                <div class="absolute left-1/2 top-[28px] h-[186px] w-1 bg-purple-500/30 transform -translate-x-1/2"></div>
                <div class="space-y-16">
                  <div class="relative flex items-start">
                    <div class="w-1/2 text-right pr-6">
                      <h3 class="font-semibold">Computer and Network Engineering</h3>
                      <p class="text-sm text-white/70">SMK Negeri 2 Bojonegoro · 2020 – 2023</p>
                    </div>
                    <div class="absolute left-1/2 transform -translate-x-1/2 mt-2 w-4 h-4 bg-purple-400 border-4 border-white rounded-full z-10"></div>
                    <div class="w-1/2"></div>
                  </div>
                  <div class="relative flex items-start">
                    <div class="w-1/2 text-right pr-6">
                      <h3 class="font-semibold">Diploma III of Information Technology</h3>
                      <p class="text-sm text-white/70">Universitas Brawijaya · 2023 – Now</p>
                    </div>
                    <div class="absolute left-1/2 transform -translate-x-1/2 mt-2 w-4 h-4 bg-purple-400 border-4 border-white rounded-full z-10"></div>
                    <div class="w-1/2"></div>
                  </div>
                </div>
              </div>
  
              <!-- Experience -->
              <div class="relative">
                <h2 class="text-3xl font-bold mb-10 text-center">💼 Experience</h2>
                <div class="absolute left-1/2 top-[28px] h-[186px] w-1 bg-purple-500/30 transform -translate-x-1/2"></div>
                <div class="space-y-16">
                  <div class="relative flex items-start">
                    <div class="w-1/2"></div>
                    <div class="absolute left-1/2 transform -translate-x-1/2 mt-2 w-4 h-4 bg-purple-400 border-4 border-white rounded-full z-10"></div>
                    <div class="w-1/2 pl-6">
                      <h3 class="font-semibold">Frontend Developer – Freelance</h3>
                      <p class="text-sm text-white/70">2022 – Present</p>
                      <p class="text-sm text-white/70">Developed responsive websites and UI animations using Nuxt and TailwindCSS for global clients.</p>
                    </div>
                  </div>
                  <div class="relative flex items-start">
                    <div class="w-1/2"></div>
                    <div class="absolute left-1/2 transform -translate-x-1/2 mt-2 w-4 h-4 bg-purple-400 border-4 border-white rounded-full z-10"></div>
                    <div class="w-1/2 pl-6">
                      <h3 class="font-semibold">Frontend Developer – Freelance</h3>
                      <p class="text-sm text-white/70">2022 – Present</p>
                      <p class="text-sm text-white/70">Developed responsive websites and UI animations using Nuxt and TailwindCSS for global clients.</p>
                    </div>
                  </div>
                </div>
              </div>
  
              <!-- Skills -->
              <section class="flex justify-center">
                <div class="text-center max-w-3xl">
                  <h2 class="text-xl font-bold mb-6">🛠️ Skills</h2>
                  <div class="mb-6">
                    <h3 class="text-white/90 font-semibold mb-2">Programming & Tools</h3>
                    <div class="flex flex-wrap justify-center gap-3">
                      <span class="skill-chip">Nuxt</span>
                      <span class="skill-chip">Vue.js</span>
                      <span class="skill-chip">Tailwind CSS</span>
                      <span class="skill-chip">JavaScript</span>
                      <span class="skill-chip">REST API</span>
                      <span class="skill-chip">Flutter</span>
                      <span class="skill-chip">PHP</span>
                      <span class="skill-chip">Python</span>
                      <span class="skill-chip">C++</span>
                    </div>
                  </div>
                  <div>
                    <h3 class="text-white/90 font-semibold mb-2">Software Skills</h3>
                    <div class="flex flex-wrap justify-center gap-3">
                      <span class="skill-chip">Visual Studio Code</span>
                      <span class="skill-chip">Adobe Photoshop</span>
                      <span class="skill-chip">Adobe Premiere Pro</span>
                      <span class="skill-chip">XAMPP</span>
                      <span class="skill-chip">Postman</span>
                      <span class="skill-chip">Arduino IDE</span>
                      <span class="skill-chip">MySQL Workbench</span>
                    </div>
                  </div>
                </div>
              </section>
  
            </section>
          </transition>
        </div>
      </main>
    </transition>
  </template>
  
  <script setup lang="ts">
  
  const showDetails = ref(false)
  const isClient = ref(false)
  const detailsSection = ref<HTMLElement | null>(null)
  const pageVisible = ref(false)
  
  function revealAndScroll() {
    showDetails.value = true
    nextTick(() => {
      setTimeout(() => {
        detailsSection.value?.scrollIntoView({ behavior: 'smooth' })
      }, 300)
    })
  }
  
  onMounted(() => {
    isClient.value = true
    setTimeout(() => {
      pageVisible.value = true
    }, 100)
  })
  </script>
  
  <style scoped>
  .fade-slide-in-enter-active {
    transition: opacity 1s ease, transform 1s ease;
  }
  .fade-slide-in-enter-from {
    opacity: 0;
    transform: translateY(50px);
  }
  
  .fade-slide-up-enter-active,
  .fade-slide-up-leave-active {
    transition: opacity 1s ease, transform 1s ease;
  }
  .fade-slide-up-enter-from,
  .fade-slide-up-leave-to {
    opacity: 0;
    transform: translateY(40px);
  }
  
  html {
    scroll-behavior: smooth !important;
  }
  html,
  body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    width: 100%;
    min-height: 100vh;
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
  .skill-chip {
    background: rgba(216, 180, 254, 0.8);
    padding: 0.4rem 1rem;
    font-size: 0.875rem;
    color: #1a1a1a;
    border-radius: 9999px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  </style>
  