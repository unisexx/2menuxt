<template>
  <div>
    <h1>ข้อมูลจาก API</h1>
    <div v-if="data">
      <p><strong>ID:</strong> {{ data.id }}</p>
      <p><strong>ชื่อสติกเกอร์:</strong> {{ data.title }}</p>
      <p><strong>ราคา:</strong> {{ data.price }}</p>
      <img :src="data.image" alt="Sticker Image" />
    </div>
    <p v-else>Loading...</p>
  </div>
</template>

<script setup>
const { data, error } = await useAsyncData('fetchSticker', async () => {
  const res = await fetch('https://line2me.in.th/api/sticker-view/33326')
  if (!res.ok) throw new Error('Failed to fetch API')
  return res.json()
})

if (error.value) {
  console.error('Error fetching data:', error.value)
}
</script>

