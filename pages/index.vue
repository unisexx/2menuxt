<template>
  <div>
    <h1>ข้อมูลสติกเกอร์</h1>
    <div v-if="data">
      <pre>{{ data }}</pre>
    </div>
    <p v-else-if="pending">Loading...</p>
    <p v-else>Error loading data</p>
  </div>
</template>

<script setup>
import { useRoute } from "#app";

const route = useRoute();
const id = route.params.id;

const { data, error, pending } = await useAsyncData(
  `fetchSticker-${id}`,
  async () => {
    const res = await fetch(`https://line2me.in.th/api/sticker-update`);
    if (!res.ok) throw new Error("Failed to fetch API");
    return res.json();
  }
);

if (error.value) {
  console.error("Error fetching data:", error.value);
}
</script>
