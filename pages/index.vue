<template>
  <Layout>
    <div class="container mx-auto">
      <h2 class="text-xl font-semibold mb-4">
        สติกเกอร์ไลน์อัพเดทประจำสัปดาห์
      </h2>
      <StickerCard :stickers="stickers" />

      <div v-if="stickers.length > 0">
        <div
          v-for="sticker in stickers"
          :key="sticker.id"
          class="border p-4 mb-4 rounded-md"
        >
          <img
            :src="sticker.img_url"
            :alt="sticker.title_th"
            class="w-32 h-32 object-cover mb-2"
          />
          <h3 class="text-lg font-semibold">{{ sticker.title_th }}</h3>
          <p>รหัสสติกเกอร์: {{ sticker.sticker_code }}</p>
          <p>ประเทศ: {{ sticker.country }}</p>
          <p>ราคา: {{ sticker.price }} THB</p>
        </div>
      </div>

      <!-- <hr />

      <h2 class="text-xl font-semibold mt-8 mb-4">ธีมไลน์อัพเดทประจำสัปดาห์</h2>
      <ThemeCard :themes="themes" />

      <hr />

      <h2 class="text-xl font-semibold mt-8 mb-4">
        อิโมจิไลน์อัพเดทประจำสัปดาห์
      </h2>
      <EmojiCard :emojis="emojis" /> -->
    </div>
  </Layout>
</template>

<script setup>
import { useRuntimeConfig, useFetch, useHead } from "#app";

import ThemeCard from "../components/ThemeCard.vue";
import StickerCard from "../components/StickerCard.vue";
import EmojiCard from "../components/EmojiCard.vue";

const config = useRuntimeConfig();

// ดึงข้อมูลด้วย useFetch
const { data: stickers, error: stickerError } = useFetch(
  `${config.public.apiBase}/sticker-update`
);
// const { data: themes, error: themeError } = useFetch(
//   `${config.public.apiBase}/theme-update`
// );
// const { data: emojis, error: emojiError } = useFetch(
//   `${config.public.apiBase}/emoji-update`
// );

// ตั้งค่า SEO สำหรับหน้า Index
useHead({
  title: "Line2Me - สติกเกอร์ ธีม และอิโมจิใหม่ล่าสุด",
  meta: [
    {
      name: "description",
      content:
        "ค้นหาสติกเกอร์ไลน์ ธีม และอิโมจิใหม่ล่าสุดจาก Line2Me พร้อมข้อมูลอัปเดตใหม่ทุกวัน รวมสินค้าลิขสิทธิ์แท้มากมายในราคาสุดคุ้ม",
    },
    {
      name: "keywords",
      content:
        "สติกเกอร์ไลน์, ธีมไลน์, อิโมจิไลน์, สติกเกอร์ใหม่, ธีมใหม่, อิโมจิใหม่, Line2Me, สติกเกอร์ลิขสิทธิ์, ธีมลิขสิทธิ์, อิโมจิลิขสิทธิ์",
    },
    {
      property: "og:title",
      content: "Line2Me - สติกเกอร์ ธีม และอิโมจิใหม่ล่าสุด",
    },
    {
      property: "og:description",
      content:
        "ค้นหาสติกเกอร์ไลน์ ธีม และอิโมจิใหม่ล่าสุดจาก Line2Me พร้อมข้อมูลอัปเดตใหม่ทุกวัน รวมสินค้าลิขสิทธิ์แท้มากมายในราคาสุดคุ้ม",
    },
    {
      property: "og:image",
      content: "https://example.com/default-og-image.jpg",
    },
    { property: "og:url", content: "https://example.com/" },
  ],
});
</script>

<style scoped>
/* เพิ่มสไตล์เพิ่มเติมถ้าจำเป็น */
</style>
