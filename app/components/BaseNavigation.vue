<script setup lang="ts"></script>

<template>
  <header class="py-2 sm:py-4 bg-white/10 backdrop-blur-md text-white fixed top-0 left-0 w-full z-50 shadow-md">
    <nav class="flex flex-wrap sm:flex-nowrap container mx-auto px-4 sm:px-6 items-center">
      <!-- Logo / Brand -->
      <NuxtLink to="/" class="flex gap-2 items-center flex-shrink-0">
        <span class="text-xl sm:text-2xl font-bold tracking-wide">Ivan Arya</span>
      </NuxtLink>

      <!-- Menu -->
      <ul class="flex flex-wrap sm:flex-nowrap gap-4 sm:gap-6 ml-auto text-base sm:text-lg font-medium capitalize">
        <li>
          <NuxtLink to="/" class="hover:underline">Home</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/about" class="hover:underline">About</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/project" class="hover:underline">Project</NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
/* Optional: agar navbar selalu clickable di mobile dan tidak terlalu rapat */
@media (max-width: 640px) {
  nav ul li {
    flex: 1 1 100%;
    text-align: center;
  }
}
</style>
