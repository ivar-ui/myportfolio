<template>
  <div class="min-h-screen bg-neutral-950 text-white font-sans">
   <section class="h-screen flex flex-col items-center justify-center text-center text-white space-y-6 animate-fade-in">
    <h1 class="text-5xl md:text-6xl font-bold">All Publication</h1>
    <p class="text-gray-300 text-lg">Scroll down to see all my press release & design publication</p>
    <button @click="scrollToProjects" class="focus:outline-none">
      <svg class="w-8 h-8 animate-bounce text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  </section>

    <!-- PRESS RELEASE SECTION -->
    <section class="max-w-5xl mx-auto px-6 py-16 text-center">
      <h1 class="text-4xl md:text-5xl font-bold">Press Release</h1>

      <div class="grid gap-8 mt-10 text-left">
        <!-- Artikel 1 -->
        <article
          class="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 hover:border-indigo-500/40 transition"
        >
          <h3 class="text-xl font-semibold mb-3">Collaboration Launch with XYZ Brand</h3>
          <p class="text-neutral-400 leading-relaxed mb-4">
            Our collaboration with XYZ Brand focuses on sustainable design and creative marketing innovation,
            receiving recognition across multiple digital platforms.
          </p>
          <a
            href="#"
            class="inline-block text-indigo-400 hover:text-indigo-300 text-sm font-medium transition"
          >
            Read More →
          </a>
        </article>

        <!-- Artikel 2 -->
        <article
          class="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 hover:border-indigo-500/40 transition"
        >
          <h3 class="text-xl font-semibold mb-3">Award Nomination for Best Visual Campaign</h3>
          <p class="text-neutral-400 leading-relaxed mb-4">
            Our recent visual storytelling project was nominated for “Best Visual Campaign 2025”,
            blending minimalism and strong social media engagement.
          </p>
          <a
            href="#"
            class="inline-block text-indigo-400 hover:text-indigo-300 text-sm font-medium transition"
          >
            Read More →
          </a>
        </article>
      </div>
    </section>

    <!-- DIVIDER -->
    <div class="h-px w-2/3 mx-auto bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-20"></div>

    <!-- INSTAGRAM POST DESIGN SECTION -->
    <section class="max-w-6xl mx-auto px-6 pb-24 text-center">
      <h1 class="text-4xl md:text-5xl font-bold">Design Published</h1>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        <!-- Card 1 -->
        <div
          class="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:border-indigo-500/40 transition flex flex-col items-center text-center"
        >
          <div
            class="w-full h-48 bg-neutral-800 border border-neutral-700 rounded-lg flex items-center justify-center text-neutral-600 text-sm"
          >
            (Image Placeholder)
          </div>
          <h3 class="font-semibold text-lg mt-4">Awareness Post</h3>
          <p class="text-neutral-400 text-sm">Promotional layout for eco-lifestyle campaign</p>
        </div>

        <!-- Card 2 -->
        <div
          class="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:border-indigo-500/40 transition flex flex-col items-center text-center"
        >
          <div
            class="w-full h-48 bg-neutral-800 border border-neutral-700 rounded-lg flex items-center justify-center text-neutral-600 text-sm"
          >
            (Image Placeholder)
          </div>
          <h3 class="font-semibold text-lg mt-4">Event Promotion</h3>
          <p class="text-neutral-400 text-sm">Design for product launch or announcement post</p>
        </div>

        <!-- Card 3 -->
        <div
          class="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:border-indigo-500/40 transition flex flex-col items-center text-center"
        >
          <div
            class="w-full h-48 bg-neutral-800 border border-neutral-700 rounded-lg flex items-center justify-center text-neutral-600 text-sm"
          >
            (Image Placeholder)
          </div>
          <h3 class="font-semibold text-lg mt-4">Quote Template</h3>
          <p class="text-neutral-400 text-sm">Minimal typography for inspirational posts</p>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
</script>

<style scoped>
/* Smooth fade-in animation */
section {
  animation: fadeIn 0.9s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Smooth hover scale for cards */
article,
div.bg-neutral-900 {
  transition: all 0.3s ease;
}

article:hover,
div.bg-neutral-900:hover {
  transform: translateY(-4px);
}
</style>
