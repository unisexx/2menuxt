<template>
  <div>
    <h1>ข้อมูลสติกเกอร์</h1>
    <div v-if="data">
      <p><strong>ID:</strong> {{ data.id }}</p>
      <p><strong>ชื่อสติกเกอร์:</strong> {{ data.title }}</p>
      <p><strong>ราคา:</strong> {{ data.price }}</p>
      <img :src="data.image" alt="Sticker Image" />
    </div>
    <p v-else-if="pending">Loading...</p>
    <p v-else>Error loading data</p>
  </div>
</template>

<script setup>
import { useRoute } from '#app'

const route = useRoute()
const id = route.params.id

const { data, error, pending } = await useAsyncData(`fetchSticker-${id}`, async () => {
  const res = await fetch(`https://line2me.in.th/api/sticker-view/${id}`)
  if (!res.ok) throw new Error('Failed to fetch API')
  return res.json()
})

if (error.value) {
  console.error('Error fetching data:', error.value)
}
</script>
