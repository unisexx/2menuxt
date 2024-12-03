export default defineNuxtConfig({
  ssr: true,

  css: [
    '@/assets/css/tailwind.css',
    '@/assets/css/freakflags/freakflags.css',
    "@/assets/css/global.css",
    '@/assets/css/nprogress.css' 
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  plugins: [
    '~/plugins/nprogress.ts'
  ],

  app: {
      buildAssetsDir: '/line2me_nuxt/', // กำหนดชื่อโฟลเดอร์ใหม่ที่ต้องการ
      baseURL: '/', // กำหนด Base URL ให้ตรงกับโฟลเดอร์ราก
      head: {
        link: [
          { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ],
      htmlAttrs: {
        lang: 'th', // เพิ่มภาษาไทยใน <html>
      },
    },
    },

  compatibilityDate: '2024-11-01',
  // devtools: { enabled: true }
})
