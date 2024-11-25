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
      stickers: [], // To store sticker data
      loading: true, // To show a loading state
      error: null, // To handle errors
    };
  },
  async fetch() {
    try {
      const response = await fetch("https://line2me.in.th/sticker-update");
      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }
      const data = await response.json();
      // Assuming data structure has an array of stickers
      this.stickers = data;
    } catch (err) {
      this.error = err.message;
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
