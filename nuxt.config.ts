export default defineNuxtConfig({
  ssr: true,

  css: ['@/assets/css/tailwind.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  app: {
      baseURL: '/', // กำหนด Base URL ให้ตรงกับโฟลเดอร์ราก
      head:{
      title: 'Sticker View',
            meta: [{ name: 'description', content: 'View Sticker Details by ID' }], 
      },
    },


  build: {
    publicPath: '/_nuxt/', // ต้องตรงกับ Path ของ Static Files
  },

  runtimeConfig: {
    public: {
      apiBase: 'https://line2me.in.th/api',
    },
  },

  compatibilityDate: '2024-11-01',
  devtools: { enabled: true }
})
