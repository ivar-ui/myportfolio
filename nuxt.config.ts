// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',

  future: {
    compatibilityVersion: 4,
  },

  experimental: {

  },

  unhead: {

  },

  // ⚙️ KONFIGURASI APP HEAD UNTUK LOGO DAN JUDUL
  app: {
    head: {
      // (Opsional) Mengatur Judul Web
      title: 'Ivan Portfolio*s', 
      
      // Mengatur Favicon menggunakan portfolio.png
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/portfolio.png', // Menunjuk ke file di folder public/
        }
      ],
    }
  },
  // ------------------------------------------

  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@tresjs/nuxt'
  ],

  googleFonts: {
    families: {
      Montserrat: true,
    }
  }
});