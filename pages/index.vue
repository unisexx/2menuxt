<template>
  <Layout>
    <div class="container mx-auto">
      <!-- แสดงข้อมูลดิบ -->

      <div v-if="data">
        <pre>{{ data }}</pre>
      </div>
      <p v-else-if="pending">Loading...</p>
      <p v-else>Error loading data</p>

      <!-- <h2 class="text-xl font-semibold mb-4">
        สติกเกอร์ไลน์อัพเดทประจำสัปดาห์
      </h2>
      <StickerCard :stickers="stickers" />
      <hr />
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
import { useRoute } from "#app";

const route = useRoute();

const { data, error, pending } = await useAsyncData(
  `fetchSticker`,
  async () => {
    const res = await fetch(`https://line2me.in.th/sticker-update`);
    if (!res.ok) throw new Error("Failed to fetch API");
    return res.json();
  }
);

if (error.value) {
  console.error("Error fetching data:", error.value);
}
</script>

<style scoped>
/* เพิ่มสไตล์เพิ่มเติมถ้าจำเป็น */
</style>
