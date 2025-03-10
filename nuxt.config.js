export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "@nuxt/image"],

  app: {
    head: {
      title: "Kunstgalerie",
      meta: [
        {
          name: "description",
          content: "Blader door onze collectie van prachtige kunstwerken",
        },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Raleway:wght@300;400;500&display=swap",
        },
      ],
    },
  },

  css: ["~/assets/css/main.css"],
  devtools: { enabled: true },
  compatibilityDate: "2025-03-10",

  image: {
    provider: "cloudinary",
    cloudinary: {
      baseURL: "https://res.cloudinary.com/demo/image/upload/",
    },
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
    presets: {
      artwork: {
        modifiers: {
          format: "webp",
          fit: "cover",
          quality: 80,
        },
      },
      thumbnail: {
        modifiers: {
          format: "webp",
          width: 400,
          height: 300,
          fit: "cover",
          quality: 80,
        },
      },
    },
  },
});
