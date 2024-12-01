<template>
    <div>
        <h1 class="text-xl font-bold mb-4">ผลการค้นหา: "{{ searchQuery }}"</h1>

        <!-- Loading State -->
        <div v-if="isLoading" class="text-center text-gray-500 py-5">
            กำลังค้นหา...
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="text-center text-red-500 py-5">
            {{ errorMessage }}
        </div>

        <!-- Stickers -->
        <div v-if="results.stickers.length > 0">
            <h2 class="text-lg font-semibold mb-2">สติกเกอร์</h2>
            <StickerCard :stickers="results.stickers" />
        </div>

        <!-- Themes -->
        <div v-if="results.themes.length > 0">
            <h2 class="text-lg font-semibold mb-2">ธีม</h2>
            <ThemeCard :themes="results.themes" />
        </div>

        <!-- Emojis -->
        <div v-if="results.emojis.length > 0">
            <h2 class="text-lg font-semibold mb-2">อิโมจิ</h2>
            <EmojiCard :emojis="results.emojis" />
        </div>

        <!-- No Results -->
        <div
            v-if="
                !isLoading &&
                !errorMessage &&
                !results.stickers.length &&
                !results.themes.length &&
                !results.emojis.length
            "
            class="text-center text-gray-500 py-5"
        >
            ไม่พบผลลัพธ์สำหรับ "{{ searchQuery }}"
        </div>
    </div>
</template>

<script setup>
    import { useRoute } from "#app";
    import { ref, onMounted, watch } from "vue";
    import StickerCard from "~/components/StickerCard.vue";
    import ThemeCard from "~/components/ThemeCard.vue";
    import EmojiCard from "~/components/EmojiCard.vue";

    const route = useRoute();
    const searchQuery = ref(route.query.q || ""); // รับค่าคำค้นหาจาก query string
    const isLoading = ref(false);
    const errorMessage = ref("");
    const results = ref({
        stickers: [],
        themes: [],
        emojis: [],
    }); // เก็บผลลัพธ์การค้นหา

    const fetchResults = async () => {
        if (!searchQuery.value.trim()) return;

        isLoading.value = true;
        errorMessage.value = "";

        try {
            const response = await $fetch(
                `https://api.line2me.in.th/api/search?q=${encodeURIComponent(
                    searchQuery.value.trim()
                )}`
            );
            results.value = response.data || {
                stickers: [],
                themes: [],
                emojis: [],
            };
        } catch (error) {
            errorMessage.value = error.message || "เกิดข้อผิดพลาดในการค้นหา";
        } finally {
            isLoading.value = false;
        }
    };

    // ดึงข้อมูลเมื่อเปิดหน้า
    onMounted(fetchResults);

    // ดึงข้อมูลใหม่เมื่อคำค้นหาใน query string เปลี่ยน
    watch(
        () => route.query.q,
        (newQuery) => {
            searchQuery.value = newQuery || "";
            fetchResults();
        }
    );
</script>
