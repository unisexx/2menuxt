<template>
  <div>
    <h1>LINE Sticker Updates</h1>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <ul>
        <li v-for="(sticker, index) in stickers" :key="index">
          <h3>{{ sticker.title }}</h3>
          <img :src="sticker.image" alt="Sticker Image" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stickers: [], // เก็บข้อมูลสติกเกอร์
      loading: true, // สถานะโหลดข้อมูล
      error: null, // เก็บข้อผิดพลาด
    };
  },
  async mounted() {
    try {
      const response = await this.$axios.$get("/sticker-update"); // ใช้ Axios
      this.stickers = response; // เก็บข้อมูลจาก API
    } catch (err) {
      this.error = "Failed to fetch sticker updates. Please try again later.";
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  color: #2c3e50;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  margin: 20px 0;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
}
img {
  max-width: 100%;
  height: auto;
}
</style>
