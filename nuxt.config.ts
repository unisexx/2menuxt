// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
ssr: true,
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
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true }
})
