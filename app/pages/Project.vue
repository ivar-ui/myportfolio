<template>
  <div class="fixed inset-0 -z-30 animate-gradient bg-gradient-to-br from-[#000033] via-[#000022] to-[#000000]"></div>

  <div
    class="fixed inset-0 -z-5 pointer-events-none transition-opacity duration-300"
    :style="{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }"
  ></div>

  <div
    v-if="activeProjectIndex !== null && activeProjectCategory !== null"
    class="fixed inset-0 z-50 p-4 bg-black/90 backdrop-blur-sm flex items-center justify-center overflow-y-auto"
    @click.self="closeProjectDetail"
  >
    <div 
      class="w-full max-w-lg mx-auto bg-gray-950/95 rounded-xl border border-white/20 shadow-2xl overflow-hidden transform transition-all duration-300 ease-out animate-scale-in"
    >
      
      <div class="relative">
        <img 
          :src="currentProjectDetail.image" 
          :alt="currentProjectDetail.title" 
          class="w-full h-48 object-cover opacity-70"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-5">
          <h2 class="text-2xl font-bold text-white">{{ currentProjectDetail.title }}</h2>
        </div>
        
        <button 
          @click="closeProjectDetail" 
          class="absolute top-3 right-3 p-2 text-white bg-black/50 rounded-full hover:bg-black/80 transition z-10" 
          title="Close"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <div class="p-5 text-gray-300 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent">
        
        <div class="mb-4 flex flex-wrap gap-2" v-if="currentProjectDetail.tags && currentProjectDetail.tags.length > 0">
          <span 
            v-for="tag in currentProjectDetail.tags" 
            :key="tag" 
            class="px-3 py-1 text-xs font-semibold rounded-full bg-purple-600 text-white"
          >
            {{ tag }}
          </span>
        </div>
        
        <p class="text-sm leading-relaxed whitespace-pre-wrap">
          {{ currentProjectDetail.description }}
        </p>

        <div class="mt-6 pt-4 border-t border-gray-800 flex gap-4">
          <a 
            v-if="currentProjectDetail.github" 
            :href="currentProjectDetail.github" 
            target="_blank" 
            class="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition text-sm"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.1 3.3 9.42 7.87 10.96.58.1.79-.25.79-.56v-2.15c-3.2.7-3.87-1.38-3.87-1.38-.52-1.34-1.28-1.7-1.28-1.7-1.05-.7.08-.69.08-.69 1.17.08 1.79 1.2 1.79 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.2-3.1-.12-.3-.52-1.5.12-3.14 0 0 .97-.31 3.2 1.2.92-.26 1.9-.39 2.88-.39.97 0 1.95.13 2.87.39 2.23-1.51 3.2-1.2 3.2-1.2.65 1.64.25 2.84.12 3.14.75.81 1.2 1.84 1.2 3.1 0 4.42-2.7 5.4-5.26 5.68.42.36.79 1.1.79 2.22v3.29c0 .31.21.66.8.55 4.56-1.54 7.85-5.86 7.85-10.96C23.5 5.74 18.27.5 12 .5z" /></svg> 
            GitHub 
          </a>
          <a 
            v-if="currentProjectDetail.demo" 
            :href="currentProjectDetail.demo" 
            target="_blank" 
            class="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition text-sm"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M15 3H5a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2v-4h-2v4H5V5h10v4h2V5a2 2 0 00-2-2zm4.71 6.29a1 1 0 00-1.42 0l-5 5a1 1 0 000 1.42l5 5a1 1 0 001.42-1.42L16.41 15H22v-2h-5.59l3.3-3.29a1 1 0 000-1.42z" /></svg> 
            Live Demo 
          </a>
        </div>
      </div>
    </div>
  </div>
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
          class="project-card group bg-gray-900/90 backdrop-blur-md rounded-xl border border-white/20 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 reveal relative flex flex-col overflow-hidden aspect-ratio-4-3 cursor-pointer"
          @click="handleCardClick(index, 'projects')"
        >
          
          <img :src="project.image" :alt="project.title" class="project-image w-full h-full object-cover absolute inset-0 transition-all duration-500 md:group-hover:blur-sm" />
          
          <div class="absolute top-0 right-0 p-3 flex gap-3 z-30 transition-opacity duration-300 opacity-0 md:group-hover:opacity-100">
            <a v-if="project.github" :href="project.github" target="_blank" @click.stop class="text-white bg-black/50 p-2 rounded-full hover:bg-black/80 transition" title="GitHub">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.1 3.3 9.42 7.87 10.96.58.1.79-.25.79-.56v-2.15c-3.2.7-3.87-1.38-3.87-1.38-.52-1.34-1.28-1.7-1.28-1.7-1.05-.7.08-.69.08-.69 1.17.08 1.79 1.2 1.79 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.2-3.1-.12-.3-.52-1.5.12-3.14 0 0 .97-.31 3.2 1.2.92-.26 1.9-.39 2.88-.39.97 0 1.95.13 2.87.39 2.23-1.51 3.2-1.2 3.2-1.2.65 1.64.25 2.84.12 3.14.75.81 1.2 1.84 1.2 3.1 0 4.42-2.7 5.4-5.26 5.68.42.36.79 1.1.79 2.22v3.29c0 .31.21.66.8.55 4.56-1.54 7.85-5.86 7.85-10.96C23.5 5.74 18.27.5 12 .5z" />
              </svg>
            </a>
            <a v-if="project.demo" :href="project.demo" target="_blank" @click.stop class="text-white bg-black/50 p-2 rounded-full hover:bg-black/80 transition" title="Live Demo">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15 3H5a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2v-4h-2v4H5V5h10v4h2V5a2 2 0 00-2-2zm4.71 6.29a1 1 0 00-1.42 0l-5 5a1 1 0 000 1.42l5 5a1 1 0 001.42-1.42L16.41 15H22v-2h-5.59l3.3-3.29a1 1 0 000-1.42z" />
              </svg>
            </a>
          </div>

          <div :class="['project-content absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/80 via-black/60 to-transparent text-white transition-opacity duration-300 md:group-hover:opacity-0 z-10 flex flex-col justify-end min-h-[80px]', { 'opacity-0': isMobile && activeProjectIndex === index && activeProjectCategory === 'projects' }]">
            <h3 class="text-lg font-semibold mb-1 leading-tight">{{ project.title }}</h3>
            <button v-if="isMobile" class="text-purple-400 hover:text-purple-300 text-sm focus:outline-none mt-1" @click.stop="handleCardClick(index, 'projects')">See More</button> 
            <span v-else class="text-purple-400 text-sm focus:outline-none mt-1">See More</span>
          </div>

          <div class="project-overlay absolute inset-x-0 bottom-0 h-3/4 bg-gray-950/95 backdrop-blur-sm p-6 rounded-b-xl border-t border-white/20 flex flex-col transition-transform duration-500 ease-out translate-y-full md:group-hover:translate-y-0 z-20">
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
          class="project-card group bg-gray-900/90 backdrop-blur-md rounded-xl border border-white/20 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 reveal relative flex flex-col overflow-hidden aspect-ratio-4-3 cursor-pointer"
          @click="handleCardClick(index, 'uiuxProjects')"
        >
          <img :src="item.image" :alt="item.title" class="project-image w-full h-full object-cover absolute inset-0 transition-all duration-500 md:group-hover:blur-sm" />
          
          <div :class="['project-content absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/80 via-black/60 to-transparent text-white transition-opacity duration-300 md:group-hover:opacity-0 z-10 flex flex-col justify-end min-h-[80px]', { 'opacity-0': isMobile && activeProjectIndex === index && activeProjectCategory === 'uiuxProjects' }]">
            <h3 class="text-lg font-semibold mb-1 leading-tight">{{ item.title }}</h3>
            <button v-if="isMobile" class="text-purple-400 hover:text-purple-300 text-sm focus:outline-none mt-1" @click.stop="handleCardClick(index, 'uiuxProjects')">See More</button>
            <span v-else class="text-purple-400 text-sm focus:outline-none mt-1">Hover to see details</span>
          </div>

          <div class="absolute top-0 right-0 p-3 flex gap-3 z-30 transition-opacity duration-300 opacity-0 md:group-hover:opacity-100">
            <a v-if="item.github" :href="item.github" target="_blank" @click.stop class="text-white bg-black/50 p-2 rounded-full hover:bg-black/80 transition" title="GitHub">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.1 3.3 9.42 7.87 10.96.58.1.79-.25.79-.56v-2.15c-3.2.7-3.87-1.38-3.87-1.38-.52-1.34-1.28-1.7-1.28-1.7-1.05-.7.08-.69.08-.69 1.17.08 1.79 1.2 1.79 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.2-3.1-.12-.3-.52-1.5.12-3.14 0 0 .97-.31 3.2 1.2.92-.26 1.9-.39 2.88-.39.97 0 1.95.13 2.87.39 2.23-1.51 3.2-1.2 3.2-1.2.65 1.64.25 2.84.12 3.14.75.81 1.2 1.84 1.2 3.1 0 4.42-2.7 5.4-5.26 5.68.42.36.79 1.1.79 2.22v3.29c0 .31.21.66.8.55 4.56-1.54 7.85-5.86 7.85-10.96C23.5 5.74 18.27.5 12 .5z" /></svg>
            </a>
            <a v-if="item.demo" :href="item.demo" target="_blank" @click.stop class="text-white bg-black/50 p-2 rounded-full hover:bg-black/80 transition" title="Live Demo">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M15 3H5a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2v-4h-2v4H5V5h10v4h2V5a2 2 0 00-2-2zm4.71 6.29a1 1 0 00-1.42 0l-5 5a1 1 0 000 1.42l5 5a1 1 0 001.42-1.42L16.41 15H22v-2h-5.59l3.3-3.29a1 1 0 000-1.42z" /></svg>
            </a>
          </div>
          
          <div class="project-overlay absolute inset-x-0 bottom-0 h-3/4 bg-gray-950/95 backdrop-blur-sm p-6 rounded-b-xl border-t border-white/20 flex flex-col transition-transform duration-500 ease-out translate-y-full md:group-hover:translate-y-0 z-20">
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
          class="project-card group bg-gray-900/90 backdrop-blur-md rounded-xl border border-white/20 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 reveal relative flex flex-col overflow-hidden aspect-ratio-4-3 cursor-pointer"
          @click="handleCardClick(index, 'multimedia')"
        >
          <img :src="item.image" :alt="item.title" class="project-image w-full h-full object-cover absolute inset-0 transition-all duration-500 md:group-hover:blur-sm" />
          
          <div :class="['project-content absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/80 via-black/60 to-transparent text-white transition-opacity duration-300 md:group-hover:opacity-0 z-10 flex flex-col justify-end min-h-[80px]', { 'opacity-0': isMobile && activeProjectIndex === index && activeProjectCategory === 'multimedia' }]">
            <h3 class="text-lg font-semibold mb-1 leading-tight">{{ item.title }}</h3>
            <button v-if="isMobile" class="text-purple-400 hover:text-purple-300 text-sm focus:outline-none mt-1" @click.stop="handleCardClick(index, 'multimedia')">See More</button>
            <span v-else class="text-purple-400 text-sm focus:outline-none mt-1">Hover to see details</span>
          </div>

          <div class="project-overlay absolute inset-x-0 bottom-0 h-3/4 bg-gray-950/95 backdrop-blur-sm p-6 rounded-b-xl border-t border-white/20 flex flex-col transition-transform duration-500 ease-out translate-y-full md:group-hover:translate-y-0 z-20">
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
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

const showContent = ref(false)
const projectSection = ref<HTMLElement | null>(null)
const overlayOpacity = ref(0)
const isMobile = ref(false) 
const activeProjectIndex = ref<number | null>(null) 
const activeProjectCategory = ref<string | null>(null) 

// Data Project (shortDescription sudah dihapus)
const projects = ref([
  { title: 'Maintenance  Uninterruptible Power Supply Gedung AMEC Lantai 4 Fakultas Kedokteran UNAIR', description: 'Maintenance Uninterruptible Power Supply dengan kendala tidak bisa melakukan backup power dengan muncul pesan Unload Protection dan battery not connected, kemudian dilanjut dengan pergantian pada seluruh batrai', tags: ['Maintenance', 'Troubleshoot', ''], image: '/projects/ups.jpg', github: '', demo: '' },
  { title: 'Instalasi Radio P2P, Access point, dan Switch Wisma Dinas 3 Rektorat UNAIR', description: 'Instalasi Radio P2P dari FKH ke Rumah Dinas Rektorat sejauh 120 meter, kegiatan berupa penarikan kabel untuk Radio Point to Point, Access Point, switch dan juga cctv. Selain itu juga melakukan konfigurasi pada pernagkat Access Point, Radio Point to Point ', tags: ['Maintenance', 'Troubleshoot', ''], image: '/projects/wisma3.jpg', github: '', demo: '' },
  { title: 'Pemasangan CCTV baru Auditorium BG Munaf Dept. Teknik Perkapalan ITS', description: 'Melakukan penarikan kabel UTP sebanyak 8 buah, melakukan konfigurasi Network Digital Recorder, dan Pemasangan kamera CCTV, serta melakukan konfigurasi untuk monitoring remote CCTV ', tags: ['DVR/NVR', 'Config', 'Networking'], image: '/projects/perkapalanits.jpg', github: '', demo: '' },
  { title: 'Pemindahan dan Membangun Ulang Jaringan Komputer Dept. Teknik Mesin ITS', description: 'Melakukan pemindahan Wall Mounted Rack serta melakukan pembaruan yang meliputi penarikan fiber optic dan kabel UTP, melakukan splicing kabel Fiber Optic, melakukan pemasangan switch manageable dan konfigurasi jaringan komputer yang baru dirancang', tags: ['Config', 'Networking', 'Switch'], image: '/projects/mesinits.jpg', github: '', demo: '' },
  { title: 'Project Dir. Pengelolaan Infrastruktur, Lingkungan, dan Operasional UNAIR ', description: 'Membangun jaringan komputer pada ruangan baru, pekerjaan meliputi pemasangan kabel kelistrikan, penarikan kabel fiber optik, splicing kabel fiber optic, penarikan kabel UTP sebanyak 40 buah, dan pemasangan switch manageable', tags: ['Networking', 'Config', 'Troubleshoot'], image: '/projects/kahuripanlt3.jpg', github: '', demo: '' },
  { title: 'Troubleshoot dan Konfigurasi Radio Point to Point CCTV Lift GKB UNAIR', description: 'Berkoordinasi dengan tim teknisi lift untuk Melakukan maintance berupa troubleshooting dan pergantian Radio P2P yang rusak dengan yang baru di lift GKB UNAIR Kampus C, selain itu juga melakukan konfigurasi bridging pada sisi lain radio P2P melalui switch di ruang panel', tags: ['Network', 'Config', 'RadioP2P'], image: '/projects/troubleshootp2p.jpg', github: '', demo: '' },
  { title: 'Project Jaringan Komputer Laboratorium Komputer Fakultas FISIP UNAIR', description: 'Membangun jaringan komputer untuk Lab Komputer, pengerjaan diantara lain adalah melakukan splicing Fiber Optik untuk backbone internet, penarikan kabel UTP sebanyak 40 buah, memasang Switch Manageable, merakit dan konfigurasi 40 buah PC', tags: ['Network', 'Config', 'Switch'], image: '/projects/fisipunair.jpg', github: '', demo: '' },
  { title: 'Troubleshoot dan Maintenance Network Video Recorder FIB UNAIR Kampus B', description: 'Melakukan troubleshoot dengan kendala pada NVR yang tidak dapat melakukan playback dan recording, kemudian melakukan maintenance dengan melakukan pergantian beberapa komponen pad NVR seperti hard disk, kabel konektor, dan adapter', tags: ['Network', 'Config', 'Switch'], image: '/projects/maintenancecctv.jpg', github: '', demo: '' },
  { title: 'Maintenance Jaringan Fiber Optik FIB UNAIR Kampus B', description: 'Melakukan maintenance penyambungan kabel fiber optik yang putus akibat terkena excavator, maintenance berupa splicing Fiber Optik sebanyak 12 core dan pemindahan posisi ODP di tempat yang lebih aman', tags: ['Network', 'Config', 'Switch'], image: '/projects/maintenancefo.jpg', github: '', demo: '' },
  { title: 'Fundraising Mobile App', description: 'Merancang backend aplikasi mobile Fundraising menggunakan Flutter yang terintegrasi dengan website Fundraising berbasis laravel.', tags: ['Flutter', 'Laravel', 'MySQL'], image: '/projects/donasi.png', github: 'https://github.com/ivar-ui/kitabantu_mobile', demo: 'https://your-demo-link.com/fundraising-app' },
  { title: 'YukRental, Motorcycle Rent Website', description: 'Merancang backend CRUD website rental yang dapat diakses oleh customer dan admin menggunakan MySql Database.', tags: ['Html', 'Php', 'Bootstrap'], image: '/projects/yukrental.png', github: 'https://github.com/ivar-ui/yukrental', demo: 'https://ivardeploy.great-site.net/csyukrental/' },
  { title: 'Garbage Filtering System Website', description: 'Merancang dan mengembangkan sistem IoT yang dapat diakses melalui website menggunakan database yang telah terintegrasi dengan sensor dan arduino.', tags: ['Arduino', 'C++', 'Php', 'IoT'], image: '/projects/iot.png', github: 'https://github.com/ivar-ui/garbage_filtering_sistem', demo: 'https://github.com/ivar-ui/garbage_filtering_sistem' },
  { title: 'Frent Agriculture Website', description: 'Merancang dan mengembangkan website rental dan jual beli produk pertanian berbasis Internet of Things.', tags: ['Arduino', 'C++', 'Php'], image: '/projects/frent.png', github: 'https://github.com/ivar-ui/frentagricult', demo: 'https://frentagricult.netlify.app/' },
])

const uiuxProjects = ref([
  { title: 'Design UI/UX digihub Website', description: 'Merancang dan mengembangkan design UI website bussiness plan bertajuk DigiHub.', tags: ['Figma', 'Javascript', 'Php'], image: '/projects/digihub.png', github: 'https://github.com/username/fundraising-app', demo: 'https://www.figma.com/proto/2ZEoQZMWLKWnxJ7yOc34i4/Digihub-Website?node-id=0-1&t=dJpEJgtNjIUpG5GM-1' },
  { title: 'Design UI/UX Reshine Mobile App', description: 'Merancang design UI aplikasi mobile jual beli template design dan jasa joki multimedia.', tags: ['Figma', 'Adobe'], image: '/projects/uiux.png', github: 'https://github.com/username/fundraising-app', demo: 'https://www.figma.com/design/HqhsgmEg9OHXiHjzlvk1rp/Userflow-IMK?node-id=0-1' },
  { title: 'Design UI/UX Home gardening Mobile App', description: 'Merancang design UI aplikasi mobile Home Gardening berbasis IoT secara real time.', tags: ['Figma', 'dart', 'Php'], image: '/projects/homgar.png', github: 'https://github.com/username/fundraising-app', demo: 'https://www.figma.com/proto/AnfJauFzqWtu2zQY7EYbEC/Home-Garden?page-id=101%3A1295&node-id=619-3405' },
  { title: 'Design UI/UX Healthmate Mobile App', description: 'Merancang design UI aplikasi mobile Healtmate untuk konsultasi dengan dokter.', tags: ['Figma', 'dart', 'Php'], image: '/projects/health.png', github: 'https://github.com/username/fundraising-app', demo: 'https://www.figma.com/design/ahQTmHMMWA0VBWljx52xbt/Untitled?node-id=0-1' },
  { title: 'Design UI/UX Funk Kitchen Mobile App', description: 'Merancang design UI aplikasi mobile Funk Kitchen untuk order makanan dine in & pickup.', tags: ['Figma', 'dart', 'Php'], image: '/projects/funk.png', github: 'https://github.com/username/fundraising-app', demo: 'https://www.figma.com/design/CRNizE7dmZNmg13VmSbc2M/FUNK-KITCHEN?node-id=0-1' },
])

const multimedia = ref([
  { title: 'Company Profile Video Gumelaring Sasangka Aji', description: 'Video kampanye Internasional Wayang Karakter Brawijayan berdurasi total 10 menit lengkap dengan efek dan sound design.', tags: ['Premiere Pro', 'After Effects'], image: '/projects/gsa.JPG' },
  { title: 'Brawijaya One Learning', description: 'Video editor : video pembelajaran jarak jauh beberapa fakultas Universitas Brawijaya.', tags: ['Adobe Premiere', 'Capcut','Video Editor'], image: '/projects/brone.jpeg' },
  { title: 'Event Documentation', description: 'Video dokumentasi event MICE kelas N3C Administrasi Bisnis.', tags: ['Video Editing', 'Cinematic', 'Sound Design'], image: '/projects/event.jpg' },
  { title: 'Kultum : Pimipinan Daerah Muhammadiyah Kota Malang', description: 'Take dan editing 30 video kultum bulan suci ramadhan para Pimpinan Muhammadiyah Se-Kota Malang', tags: ['Videography', 'Video Editing'], image: '/projects/kultum.jpeg' },
  { title: 'Kampanye Wayang Karakter : Brawiijayan Tosan Aji Fest', description: 'Take video dan Editing highlight dengan tema Karakter Brawijayan Lakon Pangeran Sutasoma.', tags: ['Directing', 'Editing', 'Videography'], image: '/projects/gsa2.jpeg' },
  { title: 'Company Profile D-III Adminitrasi Bisnis Fakultas Vokasi', description: 'Take video company profile Program Studi Administrasi Bisnis 2025.', tags: ['Videographer'], image: '/projects/comprof.jpeg' },
])


// Komputasi untuk mendapatkan detail proyek yang aktif
const currentProjectDetail = computed(() => {
  if (activeProjectIndex.value === null || activeProjectCategory.value === null) return null
  const allProjects: { [key: string]: typeof projects.value } = {
    projects: projects.value,
    uiuxProjects: uiuxProjects.value,
    multimedia: multimedia.value,
  }
  return allProjects[activeProjectCategory.value][activeProjectIndex.value]
})

// Fungsi untuk menangani klik pada kartu proyek (hanya aktif di mobile)
const handleCardClick = (index: number, category: string) => {
  if (isMobile.value) {
    activeProjectIndex.value = index
    activeProjectCategory.value = category
  }
}

// Fungsi untuk menutup detail proyek mobile
const closeProjectDetail = () => {
  activeProjectIndex.value = null
  activeProjectCategory.value = null
}

// Fungsi untuk memeriksa ukuran layar (mobile vs desktop)
const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

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
  checkMobile() 
  window.addEventListener('scroll', updateOverlay)
  window.addEventListener('scroll', handleReveal)
  window.addEventListener('resize', checkMobile) 
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateOverlay)
  window.removeEventListener('scroll', handleReveal)
  window.removeEventListener('resize', checkMobile)
})
</script>

<style>
/* ... (Gaya global yang sudah ada) ... */
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
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2;
}

/* Tambahkan animasi untuk modal/overlay */
@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.animate-scale-in {
  animation: scale-in 0.3s ease-out forwards;
}
</style>

<style scoped>
/* ... (Gaya CSS scoped yang sudah ada) ... */

.project-card {
    height: 0; 
    padding-bottom: calc(100% * 3 / 4); 
    overflow: hidden; 
    position: relative;
}

.project-image {
    transition: filter 0.5s ease; 
}

.project-content {
    transition: opacity 0.3s ease;
    display: flex; 
    flex-direction: column; 
    justify-content: flex-end; 
    min-height: 80px; 
}

/* Overlay Deskripsi Penuh (75% Tinggi) */
.project-overlay {
    height: 75%; 
    transform: translateY(100%); 
    transition: transform 0.5s ease-out;
    display: none; /* Default: Sembunyikan di Mobile. Akan di-override di media query desktop. */
    flex-direction: column;
}

/* Efek Hover (Desktop Only) - Menggunakan media query eksplisit */
@media (min-width: 768px) {
  /* Tampilkan overlay & atur tampilan awal di Desktop */
  .project-overlay {
    display: flex; 
  }
  /* Tombol aksi (GitHub/Demo) */
  .absolute.p-3 {
    display: flex;
  }

  .project-card:hover .project-image {
    filter: blur(5px); 
  }

  .project-card:hover .project-content {
    opacity: 0; 
  }

  .project-card:hover .project-overlay {
    transform: translateY(0); 
  }
}

.project-overlay p {
    flex-grow: 1;
}
</style>