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
      buildAssetsDir: '/dear_nuxt/', // กำหนดชื่อโฟลเดอร์ใหม่ที่ต้องการ
      baseURL: '/', // กำหนด Base URL ให้ตรงกับโฟลเดอร์ราก
      head: {
        link: [
          { rel: 'stylesheet', href: '/tailwind.css' }
        ],
      htmlAttrs: {
        lang: 'th', // เพิ่มภาษาไทยใน <html>
      },
    },
    },

  compatibilityDate: '2024-11-01',
  // devtools: { enabled: true }
})
