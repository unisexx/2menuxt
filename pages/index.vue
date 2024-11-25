<template>
  <div>
    <!-- สติกเกอร์ -->
    <div v-if="stickerData">
      <h2 class="text-xl font-semibold mb-4">
        สติกเกอร์ไลน์อัพเดทประจำสัปดาห์
      </h2>
      <StickerCard :stickers="stickerData" />
      <hr />
    </div>
    <p v-else-if="stickerPending">Loading...</p>
    <p v-else>Error loading sticker data</p>

    <!-- ธีม -->
    <div v-if="themeData">
      <h2 class="text-xl font-semibold mb-4">ธีมไลน์อัพเดทประจำสัปดาห์</h2>
      <ThemeCard :themes="themeData" />
      <hr />
    </div>
    <p v-else-if="themePending">Loading...</p>
    <p v-else>Error loading theme data</p>

    <!-- อีโมจิ -->
    <div v-if="emojiData">
      <h2 class="text-xl font-semibold mb-4">อีโมจิไลน์อัพเดทประจำสัปดาห์</h2>
      <EmojiCard :emojis="emojiData" />
      <hr />
    </div>
    <p v-else-if="emojiPending">Loading...</p>
    <p v-else>Error loading emoji data</p>
  </div>
</template>

<script setup>
import { useRoute, useHead } from "#app";

const route = useRoute();
const id = route.params.id;

// SEO
useHead({
  title: "สติกเกอร์ไลน์ ธีม และอีโมจิ - อัพเดทประจำสัปดาห์",
  meta: [
    {
      name: "description",
      content:
        "ติดตามข้อมูลอัพเดทสติกเกอร์ไลน์ ธีมไลน์ และอีโมจิที่น่าสนใจประจำสัปดาห์จาก Line2Me",
    },
    {
      property: "og:title",
      content: "สติกเกอร์ไลน์ ธีม และอีโมจิ - อัพเดทประจำสัปดาห์",
    },
    {
      property: "og:description",
      content:
        "ค้นพบสติกเกอร์ไลน์ ธีมไลน์ และอีโมจิใหม่ล่าสุด พร้อมข้อมูลที่อัพเดททุกสัปดาห์จาก Line2Me",
    },
    {
      property: "og:image",
      content: "https://line2me.in.th/og-image.jpg", // เปลี่ยน URL รูปภาพตามต้องการ
    },
    {
      name: "keywords",
      content: "สติกเกอร์ไลน์, ธีมไลน์, อีโมจิ, Line2Me, อัพเดท",
    },
  ],
});

// สติกเกอร์ API
const {
  data: stickerData,
  error: stickerError,
  pending: stickerPending,
} = await useAsyncData(`fetchSticker-${id}`, async () => {
  const res = await fetch(`https://line2me.in.th/api/sticker-update`);
  if (!res.ok) throw new Error("Failed to fetch sticker API");
  return res.json();
});

// ธีม API
const {
  data: themeData,
  error: themeError,
  pending: themePending,
} = await useAsyncData(`fetchTheme-${id}`, async () => {
  const res = await fetch(`https://line2me.in.th/api/theme-update`);
  if (!res.ok) throw new Error("Failed to fetch theme API");
  return res.json();
});

// อีโมจิ API
const {
  data: emojiData,
  error: emojiError,
  pending: emojiPending,
} = await useAsyncData(`fetchEmoji-${id}`, async () => {
  const res = await fetch(`https://line2me.in.th/api/emoji-update`);
  if (!res.ok) throw new Error("Failed to fetch emoji API");
  return res.json();
});

// ตรวจสอบข้อผิดพลาด
if (stickerError.value) {
  console.error("Error fetching sticker data:", stickerError.value);
}
if (themeError.value) {
  console.error("Error fetching theme data:", themeError.value);
}
if (emojiError.value) {
  console.error("Error fetching emoji data:", emojiError.value);
}
</script>
