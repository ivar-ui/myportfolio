<script setup lang="ts"></script>

<template>
  <header class="py-4 bg-white/10 backdrop-blur-md text-white fixed top-0 left-0 w-full z-50 shadow-md">
    <nav class="flex container mx-auto px-4 items-center">
      <NuxtLink to="/" class="flex gap-2 items-center">
        <span class="text-2xl font-bold tracking-wide">Portfolio</span>
      </NuxtLink>
      <ul class="flex gap-6 ml-auto text-lg font-medium capitalize">
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
