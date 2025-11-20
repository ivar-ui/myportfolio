<template>
  <div class="fixed inset-0 -z-30 animate-gradient bg-gradient-to-br from-[#000033] via-[#000022] to-[#000000]"></div>

  <div
    class="fixed inset-0 -z-5 pointer-events-none transition-opacity duration-300"
    :style="{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }"
  ></div>

  <section class="h-screen flex flex-col items-center justify-center text-center text-white space-y-6 animate-fade-in">
    <h1 class="text-5xl md:text-6xl font-bold">My Project</h1>
    <p class="text-gray-300 text-lg">Scroll down to see all my works</p>
    <button @click="scrollToProjects" class="focus:outline-none">
      <svg class="w-8 h-8 animate-bounce text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  </section>

  <main
    v-if="showContent"
    ref="projectSection"
    class="relative z-10 min-h-screen px-4 py-20 text-white max-w-6xl mx-auto animate-fade-up"
  >
    <div class="space-y-16">
      <section class="text-center space-y-4">
        <h1 class="text-4xl md:text-5xl font-bold">Teknologi Informasi</h1>
        <p class="text-lg max-w-2xl mx-auto text-gray-300">
          Berikut adalah beberapa proyek yang telah saya kerjakan dalam bidang pengembangan website, mobile, dan teknologi lainnya.
        </p>
      </section>

      <section class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(project, index) in projects"
          :key="index"
          class="project-card group bg-gray-900/90 backdrop-blur-md rounded-xl border border-white/20 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 reveal relative flex flex-col overflow-hidden aspect-ratio-4-3"
        >
          
          <img :src="project.image" :alt="project.title" class="project-image w-full h-full object-cover absolute inset-0 transition-all duration-500 group-hover:blur-sm" />
          
          <div class="absolute top-0 right-0 p-3 flex gap-3 z-30 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
            <a v-if="project.github" :href="project.github" target="_blank" class="text-white bg-black/50 p-2 rounded-full hover:bg-black/80 transition" title="GitHub">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.1 3.3 9.42 7.87 10.96.58.1.79-.25.79-.56v-2.15c-3.2.7-3.87-1.38-3.87-1.38-.52-1.34-1.28-1.7-1.28-1.7-1.05-.7.08-.69.08-.69 1.17.08 1.79 1.2 1.79 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.2-3.1-.12-.3-.52-1.5.12-3.14 0 0 .97-.31 3.2 1.2.92-.26 1.9-.39 2.88-.39.97 0 1.95.13 2.87.39 2.23-1.51 3.2-1.2 3.2-1.2.65 1.64.25 2.84.12 3.14.75.81 1.2 1.84 1.2 3.1 0 4.42-2.7 5.4-5.26 5.68.42.36.79 1.1.79 2.22v3.29c0 .31.21.66.8.55 4.56-1.54 7.85-5.86 7.85-10.96C23.5 5.74 18.27.5 12 .5z" />
              </svg>
            </a>
            <a v-if="project.demo" :href="project.demo" target="_blank" class="text-white bg-black/50 p-2 rounded-full hover:bg-black/80 transition" title="Live Demo">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15 3H5a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2v-4h-2v4H5V5h10v4h2V5a2 2 0 00-2-2zm4.71 6.29a1 1 0 00-1.42 0l-5 5a1 1 0 000 1.42l5 5a1 1 0 001.42-1.42L16.41 15H22v-2h-5.59l3.3-3.29a1 1 0 000-1.42z" />
              </svg>
            </a>
          </div>

          <div class="project-content absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/80 via-black/60 to-transparent text-white transition-opacity duration-300 group-hover:opacity-0 z-10">
            <h3 class="text-xl font-semibold mb-1">{{ project.title }}</h3>
            <button class="text-purple-400 hover:text-purple-300 text-sm focus:outline-none mt-2">See More</button>
          </div>

          <div class="project-overlay absolute inset-x-0 bottom-0 h-3/4 bg-gray-950/95 backdrop-blur-sm p-6 rounded-b-xl border-t border-white/20 flex flex-col transition-transform duration-500 ease-out translate-y-full group-hover:translate-y-0 z-20">
            <p class="text-sm text-gray-300 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent flex-grow">
              {{ project.description }}
            </p>
          </div>
        </div>
      </section>

      <section class="text-center space-y-4 pt-10">
        <h2 class="text-3xl md:text-4xl font-bold">UI/UX Project</h2>
        <p class="text-lg max-w-2xl mx-auto text-gray-300">
          Koleksi desain antarmuka dan pengalaman pengguna untuk aplikasi mobile dan website.
        </p>
      </section>
      <section class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(item, index) in uiuxProjects"
          :key="index"
          class="project-card group bg-gray-900/90 backdrop-blur-md rounded-xl border border-white/20 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 reveal relative flex flex-col overflow-hidden aspect-ratio-4-3"
        >
          <img :src="item.image" :alt="item.title" class="project-image w-full h-full object-cover absolute inset-0 transition-all duration-500 group-hover:blur-sm" />
          
          <div class="project-content absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/80 via-black/60 to-transparent text-white transition-opacity duration-300 group-hover:opacity-0 z-10">
            <h3 class="text-xl font-semibold mb-1">{{ item.title }}</h3>
            <button class="text-purple-400 hover:text-purple-300 text-sm focus:outline-none mt-2">See More</button>
          </div>

          <div class="absolute top-0 right-0 p-3 flex gap-3 z-30 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
            <a v-if="item.github" :href="item.github" target="_blank" class="text-white bg-black/50 p-2 rounded-full hover:bg-black/80 transition" title="GitHub">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.1 3.3 9.42 7.87 10.96.58.1.79-.25.79-.56v-2.15c-3.2.7-3.87-1.38-3.87-1.38-.52-1.34-1.28-1.7-1.28-1.7-1.05-.7.08-.69.08-.69 1.17.08 1.79 1.2 1.79 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.2-3.1-.12-.3-.52-1.5.12-3.14 0 0 .97-.31 3.2 1.2.92-.26 1.9-.39 2.88-.39.97 0 1.95.13 2.87.39 2.23-1.51 3.2-1.2 3.2-1.2.65 1.64.25 2.84.12 3.14.75.81 1.2 1.84 1.2 3.1 0 4.42-2.7 5.4-5.26 5.68.42.36.79 1.1.79 2.22v3.29c0 .31.21.66.8.55 4.56-1.54 7.85-5.86 7.85-10.96C23.5 5.74 18.27.5 12 .5z" /></svg>
            </a>
            <a v-if="item.demo" :href="item.demo" target="_blank" class="text-white bg-black/50 p-2 rounded-full hover:bg-black/80 transition" title="Live Demo">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M15 3H5a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2v-4h-2v4H5V5h10v4h2V5a2 2 0 00-2-2zm4.71 6.29a1 1 0 00-1.42 0l-5 5a1 1 0 000 1.42l5 5a1 1 0 001.42-1.42L16.41 15H22v-2h-5.59l3.3-3.29a1 1 0 000-1.42z" /></svg>
            </a>
          </div>
          
          <div class="project-overlay absolute inset-x-0 bottom-0 h-3/4 bg-gray-950/95 backdrop-blur-sm p-6 rounded-b-xl border-t border-white/20 flex flex-col transition-transform duration-500 ease-out translate-y-full group-hover:translate-y-0 z-20">
            <p class="text-sm text-gray-300 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent flex-grow">
              {{ item.description }}
            </p>
          </div>
        </div>
      </section>
      
      <section class="text-center space-y-4 pt-10">
        <h2 class="text-3xl md:text-4xl font-bold">Multimedia</h2>
        <p class="text-lg max-w-2xl mx-auto text-gray-300">
          Kumpulan proyek multimedia seperti video profil, animasi, dan dokumentasi visual.
        </p>
      </section>

      <section class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(item, index) in multimedia"
          :key="index"
          class="project-card group bg-gray-900/90 backdrop-blur-md rounded-xl border border-white/20 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 reveal relative flex flex-col overflow-hidden aspect-ratio-4-3"
        >
          <img :src="item.image" :alt="item.title" class="project-image w-full h-full object-cover absolute inset-0 transition-all duration-500 group-hover:blur-sm" />
          
          <div class="project-content absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/80 via-black/60 to-transparent text-white transition-opacity duration-300 group-hover:opacity-0 z-10">
            <h3 class="text-xl font-semibold mb-1">{{ item.title }}</h3>
            <button class="text-purple-400 hover:text-purple-300 text-sm focus:outline-none mt-2">See More</button>
          </div>

          <div class="project-overlay absolute inset-x-0 bottom-0 h-3/4 bg-gray-950/95 backdrop-blur-sm p-6 rounded-b-xl border-t border-white/20 flex flex-col transition-transform duration-500 ease-out translate-y-full group-hover:translate-y-0 z-20">
            <p class="text-sm text-gray-300 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent flex-grow">
              {{ item.description }}
            </p>
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

// Data Project (Dibiarkan sama, hanya properti shortDescription tidak digunakan di template)
const projects = ref([
  { title: 'Pemasangan CCTV baru Auditorium BG Munaf Dept. Teknik Perkapalan ITS', description: 'Melakukan penarikan kabel UTP sebanyak 8 buah, melakukan konfigurasi Network Digital Recorder, dan Pemasangan kamera CCTV, serta melakukan konfigurasi untuk monitoring remote CCTV ', shortDescription: 'Instalasi 8 kabel UTP, konfigurasi NVR, dan pemasangan kamera CCTV untuk monitoring remote di Auditorium ITS.', tags: ['DVR/NVR', 'Config', 'Networking'], image: '/projects/perkapalanits.jpg', github: 'https://github.com/ivar-ui/kitabantu_mobile', demo: 'https://your-demo-link.com/fundraising-app' },
  { title: 'Pemindahan dan Membangun Ulang Jaringan Komputer Dept. Teknik Mesin ITS', description: 'Melakukan pemindahan Wall Mounted Rack serta melakukan pembaruan yang meliputi penarikan fiber optic dan kabel UTP, melakukan splicing kabel Fiber Optic, melakukan pemasangan switch manageable dan konfigurasi jaringan komputer yang baru dirancang', shortDescription: 'Pemindahan dan pembaruan jaringan komputer (FO & UTP, splicing, konfigurasi switch) di Dept. Teknik Mesin ITS.', tags: ['Config', 'Networking', 'Switch'], image: '/projects/mesinits.jpg', github: 'https://github.com/ivar-ui/kitabantu_mobile', demo: 'https://your-demo-link.com/fundraising-app' },
  { title: 'Project Dir. Pengelolaan Infrastruktur, Lingkungan, dan Operasional UNAIR ', description: 'Membangun jaringan komputer pada ruangan baru, pekerjaan meliputi pemasangan kabel kelistrikan, penarikan kabel fiber optik, splicing kabel fiber optic, penarikan kabel UTP sebanyak 40 buah, dan pemasangan switch manageable', shortDescription: 'Pembangunan jaringan komputer ruangan baru UNAIR: kelistrikan, penarikan/splicing FO & 40 UTP, serta pemasangan switch manageable.', tags: ['Networking', 'Config', 'Troubleshoot'], image: '/projects/kahuripanlt3.jpg', github: 'https://github.com/ivar-ui/kitabantu_mobile', demo: 'https://your-demo-link.com/fundraising-app' },
  { title: 'Project Jaringan Komputer Laboratorium Komputer Fakultas FISIP UNAIR', description: 'Membangun jaringan komputer untuk Lab Komputer, pengerjaan diantara lain adalah melakukan splicing Fiber Optik untuk backbone internet, penarikan kabel UTP sebanyak 40 buah, memasang Switch Manageable, merakit dan konfigurasi 40 buah PC', shortDescription: 'Pembangunan jaringan Lab Komputer FISIP UNAIR: Splicing FO backbone, 40 kabel UTP, pemasangan switch, perakitan & konfigurasi 40 PC.', tags: ['Network', 'Config', 'Switch'], image: '/projects/fisipunair.jpg', github: 'https://github.com/ivar-ui/kitabantu_mobile', demo: 'https://your-demo-link.com/fundraising-app' },
  { title: 'Fundraising Mobile App', description: 'Merancang backend aplikasi mobile Fundraising menggunakan Flutter yang terintegrasi dengan website Fundraising berbasis laravel.', shortDescription: 'Pengembangan backend aplikasi mobile Fundraising (Flutter) terintegrasi dengan website Laravel.', tags: ['Flutter', 'Laravel', 'MySQL'], image: '/projects/donasi.png', github: 'https://github.com/ivar-ui/kitabantu_mobile', demo: 'https://your-demo-link.com/fundraising-app' },
  { title: 'YukRental, Motorcycle Rent Website', description: 'Merancang backend CRUD website rental yang dapat diakses oleh customer dan admin menggunakan MySql Database.', shortDescription: 'Perancangan backend CRUD website rental motor untuk customer dan admin dengan database MySQL.', tags: ['Html', 'Php', 'Bootstrap'], image: '/projects/yukrental.png', github: 'https://github.com/ivar-ui/yukrental', demo: 'https://ivardeploy.great-site.net/csyukrental/' },
  { title: 'Garbage Filtering System Website', description: 'Merancang dan mengembangkan sistem IoT yang dapat diakses melalui website menggunakan database yang telah terintegrasi dengan sensor dan arduino.', shortDescription: 'Perancangan dan pengembangan sistem IoT penyaringan sampah yang dapat diakses melalui website dan terintegrasi dengan sensor/Arduino.', tags: ['Arduino', 'C++', 'Php', 'IoT'], image: '/projects/iot.png', github: 'https://github.com/ivar-ui/garbage_filtering_sistem', demo: 'https://github.com/ivar-ui/garbage_filtering_sistem' },
  { title: 'Frent Agriculture Website', description: 'Merancang dan mengembangkan website rental dan jual beli produk pertanian berbasis Internet of Things.', shortDescription: 'Perancangan website rental dan jual beli produk pertanian yang terintegrasi dengan Internet of Things (IoT).', tags: ['Arduino', 'C++', 'Php'], image: '/projects/frent.png', github: 'https://github.com/ivar-ui/frentagricult', demo: 'https://frentagricult.netlify.app/' },
])

const uiuxProjects = ref([
  { title: 'Digihub Website', description: 'Merancang dan mengembangkan design UI website bussiness plan bertajuk DigiHub.', shortDescription: 'Perancangan dan pengembangan design UI website untuk bussiness plan DigiHub.', tags: ['Figma', 'Javascript', 'Php'], image: '/projects/digihub.png', github: 'https://github.com/username/fundraising-app', demo: 'https://www.figma.com/proto/2ZEoQZMWLKWnxJ7yOc34i4/Digihub-Website?node-id=0-1&t=dJpEJgtNjIUpG5GM-1' },
  { title: 'Reshine Mobile App', description: 'Merancang design UI aplikasi mobile jual beli template design dan jasa joki multimedia.', shortDescription: 'Perancangan design UI aplikasi mobile Reshine untuk jual beli template dan jasa multimedia.', tags: ['Figma', 'Adobe'], image: '/projects/uiux.png', github: 'https://github.com/username/fundraising-app', demo: 'https://www.figma.com/design/HqhsgmEg9OHXiHjzlvk1rp/Userflow-IMK?node-id=0-1' },
  { title: 'Home gardening Mobile App', description: 'Merancang design UI aplikasi mobile Home Gardening berbasis IoT secara real time.', shortDescription: 'Perancangan design UI aplikasi mobile Home Gardening yang berbasis IoT real-time.', tags: ['Figma', 'dart', 'Php'], image: '/projects/homgar.png', github: 'https://github.com/username/fundraising-app', demo: 'https://www.figma.com/proto/AnfJauFzqWtu2zQY7EYbEC/Home-Garden?page-id=101%3A1295&node-id=619-3405' },
  { title: 'Healthmate Mobile App', description: 'Merancang design UI aplikasi mobile Healtmate untuk konsultasi dengan dokter.', shortDescription: 'Perancangan design UI aplikasi mobile Healthmate untuk layanan konsultasi dengan dokter.', tags: ['Figma', 'dart', 'Php'], image: '/projects/health.png', github: 'https://github.com/username/fundraising-app', demo: 'https://www.figma.com/design/ahQTmHMMWA0VBWljx52xbt/Untitled?node-id=0-1' },
  { title: 'Funk Kitchen Mobile App', description: 'Merancang design UI aplikasi mobile Funk Kitchen untuk order makanan dine in & pickup.', shortDescription: 'Perancangan design UI aplikasi mobile Funk Kitchen untuk order makanan (dine in & pickup).', tags: ['Figma', 'dart', 'Php'], image: '/projects/funk.png', github: 'https://github.com/username/fundraising-app', demo: 'https://www.figma.com/design/CRNizE7dmZNmg13VmSbc2M/FUNK-KITCHEN?node-id=0-1' },
])

const multimedia = ref([
  { title: 'Company Profile Video Gumelaring Sasangka Aji', description: 'Video kampanye Internasional Wayang Karakter Brawijayan berdurasi total 10 menit lengkap dengan efek dan sound design.', shortDescription: 'Video kampanye Wayang Karakter Brawijayan (10 menit) lengkap dengan efek dan sound design.', tags: ['Premiere Pro', 'After Effects'], image: '/projects/gsa.JPG' },
  { title: 'Brawijaya One Learning', description: 'Video editor : video pembelajaran jarak jauh beberapa fakultas Universitas Brawijaya.', shortDescription: 'Editor video pembelajaran jarak jauh untuk beberapa fakultas Universitas Brawijaya.', tags: ['Adobe Premiere', 'Capcut','Video Editor'], image: '/projects/brone.jpeg' },
  { title: 'Event Documentation', description: 'Video dokumentasi event MICE kelas N3C Administrasi Bisnis.', shortDescription: 'Video dokumentasi event MICE (Meeting, Incentive, Convention, Exhibition) kelas N3C Administrasi Bisnis.', tags: ['Video Editing', 'Cinematic', 'Sound Design'], image: '/projects/event.jpg' },
  { title: 'Kultum : Pimipinan Daerah Muhammadiyah Kota Malang', description: 'Take dan editing 30 video kultum bulan suci ramadhan para Pimpinan Muhammadiyah Se-Kota Malang', shortDescription: 'Pengambilan dan editing 30 video kultum Ramadhan Pimpinan Daerah Muhammadiyah Se-Kota Malang.', tags: ['Videography', 'Video Editing'], image: '/projects/kultum.jpeg' },
  { title: 'Kampanye Wayang Karakter : Brawiijayan Tosan Aji Fest', description: 'Take video dan Editing highlight dengan tema Karakter Brawijayan Lakon Pangeran Sutasoma.', shortDescription: 'Pengambilan dan Editing highlight video Kampanye Wayang Karakter Lakon Pangeran Sutasoma.', tags: ['Directing', 'Editing', 'Videography'], image: '/projects/gsa2.jpeg' },
  { title: 'Company Profile D-III Adminitrasi Bisnis Fakultas Vokasi', description: 'Take video company profile Program Studi Administrasi Bisnis 2025.', shortDescription: 'Pengambilan video company profile Program Studi Administrasi Bisnis 2025.', tags: ['Videographer'], image: '/projects/comprof.jpeg' },
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
  showContent.value = true
  window.addEventListener('scroll', updateOverlay)
  window.addEventListener('scroll', handleReveal)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateOverlay)
  window.removeEventListener('scroll', handleReveal)
})
</script>

<style>
/* Gaya global untuk scrollbar */
.scrollbar-thin::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
}
.scrollbar-thin::-webkit-scrollbar-track {
    background: transparent;
}
/* Tailwind line-clamp-2 (membutuhkan plugin) */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2;
}
</style>

<style scoped>
/* ... (Gaya CSS yang sudah ada) ... */

.project-card {
    /* Rasio 4:3 */
    height: 0; 
    padding-bottom: calc(100% * 3 / 4); 
    overflow: hidden; 
    position: relative;
}

/* Gambar Proyek */
.project-image {
    transition: filter 0.5s ease; 
}

/* Konten Normal (Hanya Judul dan See More) */
.project-content {
    /* Gradient, transisi, dll. */
    transition: opacity 0.3s ease;
}

/* Overlay Deskripsi Penuh (75% Tinggi) */
.project-overlay {
    /* Tinggi 75% */
    height: 75%; 
    transform: translateY(100%); 
    transition: transform 0.5s ease-out;
    display: flex;
    flex-direction: column;
}

/* Efek Hover */
.group:hover .project-image {
    filter: blur(5px); 
}

.group:hover .project-content {
    opacity: 0; 
}

.group:hover .project-overlay {
    transform: translateY(0); 
}

/* Pastikan konten di overlay mengisi ruang yang tersedia dan dapat di-scroll */
.project-overlay p {
    flex-grow: 1;
}
</style>