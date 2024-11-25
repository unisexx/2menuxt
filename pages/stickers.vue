<template>
    <div>
        <!-- แสดงข้อมูลสติกเกอร์ -->
        <div v-if="stickerData">
            <h2 class="text-xl font-semibold mb-4">สติกเกอร์ทั้งหมด</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StickerCard :stickers="stickerData.data" />
            </div>

            <!-- Pagination -->
            <div class="flex justify-between items-center mt-6">
                <button
                    @click="changePage(stickerData.current_page - 1)"
                    :disabled="!stickerData.prev_page_url"
                    class="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                >
                    ก่อนหน้า
                </button>
                <span class="text-gray-700 font-semibold"
                    >หน้าปัจจุบัน: {{ stickerData.current_page }}</span
                >
                <button
                    @click="changePage(stickerData.current_page + 1)"
                    :disabled="!stickerData.next_page_url"
                    class="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                >
                    ถัดไป
                </button>
            </div>
        </div>
        <p v-else-if="loading">Loading...</p>
        <p v-else>Error loading sticker data</p>
    </div>
</template>

<script setup>
    import { ref, watch } from "vue";
    import { useRouter, useRoute } from "vue-router";

    // ตัวแปรสำหรับเก็บข้อมูล
    const stickerData = ref(null);
    const loading = ref(false);
    const error = ref(null);

    // Router และ Route
    const router = useRouter();
    const route = useRoute();

    // ฟังก์ชันสำหรับดึงข้อมูล
    async function fetchStickers() {
        try {
            loading.value = true;

            // สร้าง URL พร้อม query string
            const params = new URLSearchParams({
                page: route.query.page || 1,
            });

            const url = `https://api.line2me.in.th/api/sticker-more?${params.toString()}`;
            const res = await fetch(url);

            if (!res.ok) throw new Error("Failed to fetch sticker data");

            stickerData.value = await res.json();
        } catch (err) {
            error.value = err.message;
            console.error("Error fetching stickers:", err.message);
        } finally {
            loading.value = false;
        }
    }

    // ฟังก์ชันเปลี่ยนหน้า
    function changePage(page) {
        router.push({
            query: {
                ...route.query,
                page,
            },
        });
    }

    // Watch การเปลี่ยนแปลงของ route.query
    watch(
        () => route.query,
        () => {
            fetchStickers();
        },
        { immediate: true }
    );
</script>
