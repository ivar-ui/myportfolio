<template>
  <section
    class="min-h-screen px-6 py-24 relative overflow-visible"
    style="
      background: linear-gradient(
        160deg,
        #f8f9fc 0%,
        #eef0f5 50%,
        #e4e7ef 100%
      );
    "
  >
    <!-- Subtle grid texture overlay -->
    <div
      class="pointer-events-none fixed inset-0 z-[1]"
      style="
        background-image: radial-gradient(circle, #c8ccd8 1px, transparent 1px);
        background-size: 28px 28px;
        opacity: 0.35;
      "
    ></div>

    <transition name="slide-fade">
      <div
        v-if="showNotif"
        class="fixed top-6 left-1/2 -translate-x-1/2 w-[90vw] max-w-[300px] px-4 py-3 rounded-xl shadow-lg z-[9999] text-center text-sm sm:text-base font-medium"
        style="background: #1e1e2e; color: #f0f0f5; letter-spacing: 0.01em"
      >
        Tekan box untuk melihat tingkat skill!
      </div>
    </transition>

    <div
      class="pointer-events-none fixed inset-0 z-[5] transition-opacity duration-500"
      style="background: #1e1e2e"
      :style="{ opacity: overlayOpacity }"
    ></div>

    <div class="max-w-5xl mx-auto space-y-24 relative overflow-visible z-10">
      <!-- ── About Me ── -->
      <div
        class="reveal fade-section flex flex-col md:flex-row items-center gap-10 p-10 rounded-3xl opacity-0 translate-y-4"
        style="
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(200, 204, 220, 0.6);
          box-shadow: 0 8px 40px rgba(100, 110, 140, 0.1);
        "
      >
        <div class="w-60 aspect-square flex-shrink-0">
          <img
            src="/newpp.jpg"
            alt="Foto Profil"
            class="w-full h-full object-cover rounded-2xl"
            style="box-shadow: 0 6px 24px rgba(80, 90, 130, 0.15)"
          />
        </div>
        <div class="flex-1">
          <p
            class="text-xs font-bold uppercase tracking-widest mb-2"
            style="color: #7b82a0"
          >
            Profil
          </p>
          <h2
            class="text-3xl font-bold mb-4"
            style="
              color: #1e1e2e;
              font-family: &quot;Georgia&quot;, serif;
              letter-spacing: -0.02em;
            "
          >
            Tentang Saya
          </h2>
          <div
            style="
              width: 40px;
              height: 3px;
              background: #6366f1;
              border-radius: 99px;
              margin-bottom: 1rem;
            "
          ></div>
          <p style="color: #4a4f68; line-height: 1.8; font-size: 0.95rem">
            Saya adalah mahasiswa semester akhir Teknologi Informasi yang
            memiliki pengalaman dalam bidang jaringan komputer. Saya memiliki
            pengalaman tentang instalasi, pengelolaan dan troubleshooting
            jaringan, konfigurasi routing dan switching, konfigurasi CCTV,
            pengembangan perangkat IoT, dan virtualisasi cloud. Saya sangat
            termotivasi untuk terus belajar dan mengikuti perkembangan teknologi
            informasi, selain itu saya memiliki sertifikasi di bidang jaringan
            yang akan mendukung kemampuan saya untuk berkontribusi dalam tim IT.
          </p>
        </div>
      </div>

      <!-- ── Technical Skills ── -->
      <div
        class="reveal fade-section text-center space-y-10 opacity-0 translate-y-4"
      >
        <div>
          <p
            class="text-xs font-bold uppercase tracking-widest mb-2"
            style="color: #7b82a0"
          >
            Keahlian
          </p>
          <h2
            class="text-3xl font-bold"
            style="
              color: #1e1e2e;
              font-family: &quot;Georgia&quot;, serif;
              letter-spacing: -0.02em;
            "
          >
            Technical Skills
          </h2>
          <div
            style="
              width: 40px;
              height: 3px;
              background: #6366f1;
              border-radius: 99px;
              margin: 0.75rem auto 0;
            "
          ></div>
        </div>
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
              :style="{
                transform: flippedCards[index]
                  ? 'rotateY(180deg)'
                  : 'rotateY(0deg)',
              }"
            >
              <!-- Front -->
              <div
                class="absolute inset-0 backface-hidden rounded-2xl overflow-hidden flex flex-col"
                style="
                  background: rgba(255, 255, 255, 0.9);
                  border: 1px solid rgba(200, 204, 220, 0.5);
                  box-shadow: 0 4px 20px rgba(100, 110, 150, 0.08);
                "
              >
                <img
                  :src="tech.photo"
                  :alt="tech.name"
                  class="w-full h-full object-cover"
                />
                <div
                  class="absolute bottom-0 w-full py-3 text-center"
                  style="
                    background: rgba(30, 30, 46, 0.8);
                    backdrop-filter: blur(6px);
                  "
                >
                  <p class="font-semibold text-base text-white">
                    {{ tech.name }}
                  </p>
                </div>
              </div>

              <!-- Back -->
              <div
                class="absolute inset-0 backface-hidden rounded-2xl overflow-hidden p-5 [transform:rotateY(180deg)] flex flex-col justify-center items-center"
                style="
                  background: #1e1e2e;
                  border: 1px solid rgba(99, 102, 241, 0.3);
                  box-shadow: 0 4px 24px rgba(99, 102, 241, 0.15);
                "
              >
                <p
                  class="font-bold text-lg mb-4"
                  style="color: #fff; letter-spacing: -0.01em"
                >
                  {{ tech.name }}
                </p>

                <template v-if="tech.name === 'Device Installation'">
                  <div class="grid grid-cols-2 gap-4 mt-2">
                    <img
                      v-for="logo in tech.logos"
                      :key="logo.name"
                      :src="logo.src"
                      :alt="logo.name"
                      class="object-contain h-14 w-14 mx-auto"
                      style="filter: brightness(0) invert(1) opacity(0.85)"
                    />
                  </div>
                </template>

                <template v-else>
                  <ul
                    class="space-y-1 text-sm text-left w-full"
                    style="color: rgba(255, 255, 255, 0.75)"
                  >
                    <li
                      v-for="item in tech.details"
                      :key="item"
                      class="flex items-center gap-2"
                    >
                      <span
                        style="
                          width: 5px;
                          height: 5px;
                          border-radius: 50%;
                          background: #6366f1;
                          display: inline-block;
                          flex-shrink: 0;
                        "
                      ></span>
                      {{ item }}
                    </li>
                  </ul>
                  <div
                    v-if="tech.logos"
                    class="flex flex-wrap gap-3 mt-4 justify-center"
                  >
                    <img
                      v-for="logo in tech.logos"
                      :key="logo.name"
                      :src="logo.src"
                      :alt="logo.name"
                      class="h-8 w-8 object-contain"
                      style="filter: brightness(0) invert(1) opacity(0.8)"
                    />
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ── Software Skills ── -->
      <div
        class="reveal fade-section text-center space-y-10 opacity-0 translate-y-4"
      >
        <div>
          <p
            class="text-xs font-bold uppercase tracking-widest mb-2"
            style="color: #7b82a0"
          >
            Programming
          </p>
          <h2
            class="text-3xl font-bold"
            style="
              color: #1e1e2e;
              font-family: &quot;Georgia&quot;, serif;
              letter-spacing: -0.02em;
            "
          >
            Software Skills
          </h2>
          <div
            style="
              width: 40px;
              height: 3px;
              background: #6366f1;
              border-radius: 99px;
              margin: 0.75rem auto 0;
            "
          ></div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          <div
            v-for="skill in skills"
            :key="skill.name"
            class="relative group overflow-hidden rounded-2xl cursor-pointer"
            style="
              background: rgba(255, 255, 255, 0.85);
              border: 1px solid rgba(200, 204, 220, 0.5);
              box-shadow: 0 2px 14px rgba(100, 110, 150, 0.07);
            "
            @mouseenter="hovered = skill.name"
            @mouseleave="hovered = ''"
          >
            <!-- Slide wipe overlay -->
            <div
              class="absolute inset-0 transition-transform duration-500 ease-in-out rounded-2xl"
              :class="{
                'translate-x-full': hovered !== skill.name,
                'translate-x-0': hovered === skill.name,
              }"
              style="background: #1e1e2e"
            ></div>

            <!-- Default state -->
            <div
              class="relative z-10 flex items-center gap-4 p-5 transition-opacity duration-300"
              :class="{ 'opacity-0': hovered === skill.name }"
            >
              <img
                :src="skill.logo"
                :alt="skill.name"
                class="h-11 w-11 object-contain"
                style="filter: none"
              />
              <p class="font-semibold text-base" style="color: #1e1e2e">
                {{ skill.name }}
              </p>
            </div>

            <!-- Hover state -->
            <div
              v-if="hovered === skill.name"
              class="absolute inset-0 flex flex-col items-center justify-center z-20 animate-fade-in gap-1"
            >
              <p class="text-white font-bold text-base">{{ skill.name }}</p>
              <span
                class="text-xs px-3 py-1 rounded-full font-semibold"
                style="background: rgba(99, 102, 241, 0.25); color: #a5b4fc"
                >{{ skill.level }}</span
              >
            </div>
          </div>
        </div>
      </div>

      <!-- ── Tools ── -->
      <div
        class="reveal fade-section text-center space-y-10 opacity-0 translate-y-4"
      >
        <div>
          <p
            class="text-xs font-bold uppercase tracking-widest mb-2"
            style="color: #7b82a0"
          >
            Perangkat
          </p>
          <h2
            class="text-3xl font-bold"
            style="
              color: #1e1e2e;
              font-family: &quot;Georgia&quot;, serif;
              letter-spacing: -0.02em;
            "
          >
            Tools
          </h2>
          <div
            style="
              width: 40px;
              height: 3px;
              background: #6366f1;
              border-radius: 99px;
              margin: 0.75rem auto 0;
            "
          ></div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          <div
            v-for="tool in allTools"
            :key="tool.name"
            class="relative group overflow-hidden rounded-2xl cursor-pointer"
            style="
              background: rgba(255, 255, 255, 0.85);
              border: 1px solid rgba(200, 204, 220, 0.5);
              box-shadow: 0 2px 14px rgba(100, 110, 150, 0.07);
            "
            @mouseenter="hovered = tool.name"
            @mouseleave="hovered = ''"
          >
            <div
              class="absolute inset-0 transition-transform duration-500 ease-in-out rounded-2xl"
              :class="{
                'translate-x-full': hovered !== tool.name,
                'translate-x-0': hovered === tool.name,
              }"
              style="background: #1e1e2e"
            ></div>

            <div
              class="relative z-10 flex items-center gap-4 p-5 transition-opacity duration-300"
              :class="{ 'opacity-0': hovered === tool.name }"
            >
              <img
                :src="tool.logo"
                :alt="tool.name"
                class="h-11 w-11 object-contain"
              />
              <p class="font-semibold text-base" style="color: #1e1e2e">
                {{ tool.name }}
              </p>
            </div>

            <div
              v-if="hovered === tool.name"
              class="absolute inset-0 flex flex-col items-center justify-center z-20 animate-fade-in gap-1"
            >
              <p class="text-white font-bold text-base">{{ tool.name }}</p>
              <span
                class="text-xs px-3 py-1 rounded-full font-semibold"
                style="background: rgba(99, 102, 241, 0.25); color: #a5b4fc"
                >{{ tool.level }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const hovered = ref("");
const showNotif = ref(false);
const flippedCards = ref([]);
const overlayOpacity = ref(0);
let ticking = false;
const isMobile = ref(false);

const handleReveal = () => {
  const reveals = document.querySelectorAll(".reveal");
  const windowHeight = window.innerHeight;
  reveals.forEach((el) => {
    const top = el.getBoundingClientRect().top;
    if (top < windowHeight - 100) el.classList.add("active");
    else el.classList.remove("active");
  });
};

const updateOverlay = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      overlayOpacity.value = Math.min(window.scrollY / 800, 0.6);
      ticking = false;
    });
    ticking = true;
  }
};

const toggleFlip = (index) => {
  flippedCards.value[index] = !flippedCards.value[index];
};

const technicalSkills = [
  {
    name: "Device Configuration",
    photo: "/about/device.jpg",
    details: [
      "Routing",
      "Switching",
      "Radio P2P",
      "Virtualization",
      "Firewall",
      "Data Backup",
    ],
  },
  {
    name: "Device Installation",
    photo: "/about/install.jpg",
    details: [],
    logos: [
      { name: "Mikrotik", src: "/logos/mikrotik.png" },
      { name: "Ubiquiti", src: "/logos/ubiquiti.png" },
      { name: "Ruijie", src: "/logos/ruijie.png" },
      { name: "HPE", src: "/logos/hpe.png" },
      { name: "SPC", src: "/logos/spc.jpg" },
      { name: "Hikvision", src: "/logos/hikvision.png" },
    ],
  },
  {
    name: "Maintenance",
    photo: "/about/maintenance.jpg",
    details: [
      "Splicing Fiber Optic",
      "Troubleshoot Jaringan",
      "Upgrade Firmware",
      "Reinstalasi Device",
    ],
  },
  {
    name: "CCTV Installation",
    photo: "/about/cctv.jpg",
    details: [
      "Konfigurasi Ip Camera",
      "Setup Network Video Recorder",
      "Pengaturan Zone Pointing",
      "Monitoring Remote",
    ],
  },
];

const skills = [
  { name: "JavaScript", logo: "/logos/javascript.svg", level: "Intermediate" },
  { name: "Python", logo: "/logos/python.svg", level: "Intermediate" },
  { name: "PHP", logo: "/logos/php.svg", level: "Intermediate" },
  { name: "Flutter", logo: "/logos/flutter.svg", level: "Beginner" },
  { name: "C++", logo: "/logos/c.svg", level: "Intermediate" },
  { name: "Laravel", logo: "/logos/laravel.svg", level: "Intermediate" },
];

const allTools = [
  { name: "VSCode", logo: "/logos/vscode.svg", level: "Intermediate" },
  { name: "MySQL", logo: "/logos/mysql.svg", level: "Intermediate" },
  { name: "Postman", logo: "/logos/postman.svg", level: "Beginner" },
  { name: "Git", logo: "/logos/github.svg", level: "Intermediate" },
  { name: "GNS3", logo: "/logos/gns3.png", level: "Intermediate" },
  { name: "Winbox", logo: "/logos/winbox.png", level: "Intermediate" },
  { name: "Proxmox", logo: "/logos/proxmox.png", level: "Intermediate" },
  { name: "PuTTY", logo: "/logos/putty.png", level: "Intermediate" },
  { name: "Photoshop", logo: "/logos/photoshop.svg", level: "Intermediate" },
  { name: "Premiere", logo: "/logos/premiere.svg", level: "Intermediate" },
  { name: "Lightroom", logo: "/logos/lightroom.svg", level: "Intermediate" },
  { name: "Figma", logo: "/logos/figma.svg", level: "Intermediate" },
];

const handleScroll = () => {
  updateOverlay();
  handleReveal();
};

onMounted(() => {
  flippedCards.value = Array(technicalSkills.length).fill(false);
  showNotif.value = true;
  setTimeout(() => (showNotif.value = false), 5000);
  handleReveal();
  isMobile.value = window.innerWidth <= 768;
  window.addEventListener("scroll", handleScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.reveal.active {
  opacity: 1 !important;
  transform: translateY(0) !important;
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.animate-fade-in {
  animation: fadeInUp 0.4s ease forwards;
}

.backface-hidden {
  backface-visibility: hidden;
}
.transform-style-preserve-3d {
  transform-style: preserve-3d;
}
.group {
  perspective: 1000px;
  -webkit-tap-highlight-color: transparent;
}

img {
  transition: transform 0.3s ease;
}

/* Custom scrollbar — light theme */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #f0f2f8;
}
::-webkit-scrollbar-thumb {
  background-color: rgba(100, 110, 160, 0.25);
  border-radius: 9999px;
  border: 2px solid transparent;
  background-clip: content-box;
  transition: background-color 0.3s ease;
}
::-webkit-scrollbar-thumb:hover {
  background-color: rgba(100, 110, 160, 0.45);
}
* {
  scrollbar-width: thin;
  scrollbar-color: rgba(100, 110, 160, 0.25) transparent;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(-16px);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-16px);
}
</style>
