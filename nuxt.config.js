export default defineNuxtConfig({
  modules: [
      '@nuxtjs/tailwindcss',
      '@pinia/nuxt',
  ],

  app: {
      head: {
          title: 'Art Gallery',
          meta: [
              { name: 'description', content: 'Browse our collection of beautiful artworks' }
          ],
          link: [
              { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
              { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Raleway:wght@300;400;500&display=swap' }
          ]
      }
  },

  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  compatibilityDate: '2025-03-10'
})