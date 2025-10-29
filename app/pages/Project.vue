<template>
  <!-- Animated Gradient Background -->
  <div class="fixed inset-0 -z-30 animate-gradient bg-gradient-to-br from-[#2a004f] via-[#0d1a45] to-[#000000]"></div>

  <!-- Stars Layer -->
  <div class="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
    <div class="stars"></div>
    <div class="stars2"></div>
    <div class="stars3"></div>
  </div>

  <!-- Dynamic Overlay -->
  <div
    class="fixed inset-0 -z-5 pointer-events-none transition-opacity duration-300"
    :style="{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }"
  ></div>

  <!-- Hero Section -->
  <section class="h-screen flex flex-col items-center justify-center text-center text-white space-y-6 animate-fade-in">
    <h1 class="text-5xl md:text-6xl font-bold">My Project</h1>
    <p class="text-gray-300 text-lg">Scroll down to see all my works</p>
    <button @click="scrollToProjects" class="focus:outline-none">
      <svg class="w-8 h-8 animate-bounce text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  </section>

  <!-- Main Content -->
  <main
    v-if="showContent"
    ref="projectSection"
    class="relative z-10 min-h-screen px-4 py-20 text-white max-w-6xl mx-auto animate-fade-up"
  >
    <div class="space-y-16">
      <!-- Teknologi Informasi -->
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
          <h3 class="text-xl font-semibold mb-2 min-h-[56px]">{{ project.title }}</h3>
          <p class="text-sm text-gray-300 mb-6 min-h-[72px]">{{ project.description }}</p>

          <div class="flex justify-between items-center pt-2">
            <div class="flex flex-wrap gap-2">
              <span v-for="(tag, i) in project.tags" :key="i" class="px-2 py-1 text-xs rounded-full bg-purple-300/80 text-black">{{ tag }}</span>
            </div>

            <div class="flex gap-3">
              <a :href="project.github" target="_blank" class="text-white hover:text-purple-400 transition" title="GitHub">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.1 3.3 9.42 7.87 10.96.58.1.79-.25.79-.56v-2.15c-3.2.7-3.87-1.38-3.87-1.38-.52-1.34-1.28-1.7-1.28-1.7-1.05-.7.08-.69.08-.69 1.17.08 1.79 1.2 1.79 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.2-3.1-.12-.3-.52-1.5.12-3.14 0 0 .97-.31 3.2 1.2.92-.26 1.9-.39 2.88-.39.97 0 1.95.13 2.87.39 2.23-1.51 3.2-1.2 3.2-1.2.65 1.64.25 2.84.12 3.14.75.81 1.2 1.84 1.2 3.1 0 4.42-2.7 5.4-5.26 5.68.42.36.79 1.1.79 2.22v3.29c0 .31.21.66.8.55 4.56-1.54 7.85-5.86 7.85-10.96C23.5 5.74 18.27.5 12 .5z"
                  />
                </svg>
              </a>
              <a :href="project.demo" target="_blank" class="text-white hover:text-green-400 transition" title="Live Demo">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M15 3H5a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2v-4h-2v4H5V5h10v4h2V5a2 2 0 00-2-2zm4.71 6.29a1 1 0 00-1.42 0l-5 5a1 1 0 000 1.42l5 5a1 1 0 001.42-1.42L16.41 15H22v-2h-5.59l3.3-3.29a1 1 0 000-1.42z"
                  />
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
          v-for="(item, index) in multimedia"
          :key="index"
          class="bg-black/30 backdrop-blur-md p-5 rounded-xl shadow-lg border border-purple-500/30 hover:scale-[1.02] transition-all duration-300 reveal"
        >
          <img :src="item.image" :alt="item.title" class="w-full h-40 object-cover rounded-md mb-4 border border-white/10 shadow" />
          <h3 class="text-xl font-semibold mb-2 min-h-[56px]">{{ item.title }}</h3>
          <p class="text-sm text-gray-300 mb-6 min-h-[72px]">{{ item.description }}</p>

          <div class="flex flex-wrap gap-2 pt-2">
            <span v-for="(tag, i) in item.tags" :key="i" class="px-2 py-1 text-xs rounded-full bg-purple-300/80 text-black">
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

const showContent = ref(false)
const projectSection = ref<HTMLElement | null>(null)
const overlayOpacity = ref(0)

const projects = ref([
  { title: 'Fundraising Mobile App', description: 'Merancang backend aplikasi mobile Fundraising menggunakan Flutter yang terintegrasi dengan website Fundraising berbasis laravel.', tags: ['Flutter', 'Laravel', 'MySQL'], image: '/projects/donasi.png', github: 'https://github.com/ivar-ui/kitabantu_mobile', demo: 'https://your-demo-link.com/fundraising-app' },
  { title: 'YukRental, Motorcycle Rent Website', description: 'Merancang backend CRUD website rental yang dapat diakses oleh customer dan admin menggunakan MySql Database.', tags: ['Html', 'Php', 'Bootstrap'], image: '/projects/yukrental.png', github: 'https://github.com/ivar-ui/yukrental', demo: 'https://ivardeploy.great-site.net/csyukrental/' },
  { title: 'Garbage Filtering System Website', description: 'Merancang dan mengembangkan sistem IoT yang dapat diakses melalui website menggunakan database yang telah terintegrasi dengan sensor dan arduino.', tags: ['Arduino', 'C++', 'Php'], image: '/projects/iot.png', github: 'https://github.com/ivar-ui/garbage_filtering_sistem', demo: 'https://github.com/ivar-ui/garbage_filtering_sistem' },
  { title: 'Frent Agriculture Website', description: 'Merancang dan mengembangkan website rental dan jual beli produk pertanian berbasis Internet of Things.', tags: ['Arduino', 'C++', 'Php'], image: '/projects/frent.png', github: 'https://github.com/ivar-ui/frentagricult', demo: 'https://frentagricult.netlify.app/' },
  { title: 'Design UI/UX digihub Website', description: 'Merancang dan mengembangkan design UI website bussiness plan bertajuk DigiHub.', tags: ['Figma', 'Javascript', 'Php'], image: '/projects/digihub.png', github: 'https://github.com/username/fundraising-app', demo: 'https://www.figma.com/proto/2ZEoQZMWLKWnxJ7yOc34i4/Digihub-Website?node-id=0-1&t=dJpEJgtNjIUpG5GM-1' },
  { title: 'Design UI/UX Reshine Mobile App', description: 'Merancang design UI aplikasi mobile jual beli template design dan jasa joki multimedia.', tags: ['Figma', 'Adobe'], image: '/projects/uiux.png', github: 'https://github.com/username/fundraising-app', demo: 'https://www.figma.com/design/HqhsgmEg9OHXiHjzlvk1rp/Userflow-IMK?node-id=0-1' },
  { title: 'Design UI/UX Home gardening Mobile App', description: 'Merancang design UI aplikasi mobile Home Gardening berbasis IoT secara real time.', tags: ['Figma', 'dart', 'Php'], image: '/projects/homgar.png', github: 'https://github.com/username/fundraising-app', demo: 'https://www.figma.com/proto/AnfJauFzqWtu2zQY7EYbEC/Home-Garden?page-id=101%3A1295&node-id=619-3405' },
  { title: 'Design UI/UX Healthmate Mobile App', description: 'Merancang design UI aplikasi mobile Healtmate untuk konsultasi dengan dokter.', tags: ['Figma', 'dart', 'Php'], image: '/projects/health.png', github: 'https://github.com/username/fundraising-app', demo: 'https://www.figma.com/design/ahQTmHMMWA0VBWljx52xbt/Untitled?node-id=0-1' },
  { title: 'Design UI/UX Funk Kitchen Mobile App', description: 'Merancang design UI aplikasi mobile Funk Kitchen untuk order makanan dine in & pickup.', tags: ['Figma', 'dart', 'Php'], image: '/projects/funk.png', github: 'https://www.figma.com/design/CRNizE7dmZNmg13VmSbc2M/FUNK-KITCHEN?node-id=0-1' },
])

const multimedia = ref([
  { title: 'Company Profile Video Gumelaring Sasangka Aji', description: 'Video kampanye Internasional Wayang Karakter Brawijayan berdurasi total 10 menit lengkap dengan efek dan sound design.', tags: ['Premiere Pro', 'After Effects'], image: '/projects/gsa.JPG' },
  { title: 'Brawijaya One Learning', description: 'Video editor : video pembelajaran jarak jauh beberapa fakultas Universitas Brawijaya.', tags: ['Adobe Premiere', 'Capcut','Video Editor'], image: '/projects/brone.jpeg' },
  { title: 'Event Documentation', description: 'Video dokumentasi event MICE kelas N3C Administrasi Bisnis.', tags: ['Video Editing', 'Cinematic', 'Sound Design'], image: '/projects/event.jpg' },
  { title: 'Kultum : Pimipinan Daerah Muhammadiyah Kota Malang', description: 'Take dan editing 30 video kultum bulan suci ramadhan para Pimpinan Muhammadiyah Se-Kota Malang', tags: ['Videography', 'Video Editing'], image: '/projects/kultum.jpeg' },
  { title: 'Kampanye Wayang Karakter : Brawiijayan Tosan Aji Fest', description: 'Take video dan Editing highlight dengan tema Karakter Brawijayan Lakon Pangeran Sutasoma.', tags: ['Directing', 'Editing', 'Videography'], image: '/projects/gsa2.jpeg' },
  { title: 'Company Profile D-III Adminitrasi Bisnis Fakultas Vokasi', description: 'Take video company profile Program Studi Administrasi Bisnis 2025.', tags: ['Videographer'], image: '/projects/comprof.jpeg' },
])

const scrollToProjects = () => projectSection.value?.scrollIntoView({ behavior: 'smooth' })

const updateOverlay = () => overlayOpacity.value = Math.min(window.scrollY / 600, 0.7)

const handleReveal = () => {
  const reveals = document.querySelectorAll<HTMLElement>('.reveal')
  const windowHeight = window.innerHeight
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top
    if (top < windowHeight - 100) el.classList.add('active')
    else el.classList.remove('active')
  })
}

onMounted(() => {
  setTimeout(() => (showContent.value = true), 50)
  window.addEventListener('scroll', updateOverlay)
  window.addEventListener('scroll', handleReveal)
  handleReveal()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateOverlay)
  window.removeEventListener('scroll', handleReveal)
})
</script>

<style scoped>
.animate-gradient {
  background-size: 400% 400%;
  animation: gradientBG 15s ease infinite;
}
@keyframes gradientBG {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.8s ease;
}
.reveal.active {
  opacity: 1;
  transform: translateY(0);
}
.stars,
.stars2,
.stars3 {
  position: absolute;
  width: 200%;
  height: 200%;
  background-repeat: repeat;
  background-size: 50px 50px;
  background-image: radial-gradient(white 1px, transparent 1px);
  opacity: 0.2;
}
.stars2 {
  opacity: 0.1;
  transform: scale(0.5);
}
.stars3 {
  opacity: 0.05;
  transform: scale(0.25);
}
</style>
