<template>
    <div>
        <!-- ฟิลเตอร์ -->
        <div class="flex flex-wrap gap-4 mb-4">
            <!-- เลือกประเภท -->
            <div>
                <label for="category" class="block mb-2 font-medium"
                    >เลือกประเภท:</label
                >
                <select
                    id="category"
                    v-model="filters.category"
                    @change="applyFilters"
                    class="border rounded px-3 py-2"
                >
                    <option value="">ทั้งหมด</option>
                    <option value="official">สติกเกอร์ทางการ</option>
                    <option value="creator">สติกเกอร์ครีเอเตอร์</option>
                </select>
            </div>

            <!-- เลือกประเทศ -->
            <div>
                <label for="country" class="block mb-2 font-medium"
                    >เลือกประเทศ:</label
                >
                <select
                    id="country"
                    v-model="filters.country"
                    @change="applyFilters"
                    class="border rounded px-3 py-2"
                >
                    <option value="">ทั้งหมด</option>
                    <option value="th">ไทย</option>
                    <option value="jp">ญี่ปุ่น</option>
                    <option value="tw">ไต้หวัน</option>
                    <option value="us">สหรัฐอเมริกา</option>
                </select>
            </div>

            <!-- เลือกการเรียงลำดับ -->
            <div>
                <label for="order" class="block mb-2 font-medium"
                    >เรียงลำดับ:</label
                >
                <select
                    id="order"
                    v-model="filters.order"
                    @change="applyFilters"
                    class="border rounded px-3 py-2"
                >
                    <option value="popular">ฮิต</option>
                    <option value="new">ล่าสุด</option>
                </select>
            </div>
        </div>

        <!-- แสดงข้อมูลสติกเกอร์ -->
        <div v-if="stickerData">
            <h2 class="text-xl font-semibold mb-4">สติกเกอร์ทั้งหมด</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div
                    v-for="sticker in stickerData.data"
                    :key="sticker.id"
                    class="border p-2 rounded"
                >
                    <img
                        :src="sticker.image"
                        alt="sticker"
                        class="w-full h-auto mb-2"
                    />
                    <p class="text-center font-semibold">{{ sticker.name }}</p>
                </div>
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
    import { ref, watch, computed } from "vue";
    import { useRouter, useRoute } from "vue-router";
    import { useAsyncData } from "#app";

    // ตัวแปรสำหรับเก็บข้อมูล
    const stickerData = ref(null);
    const loading = ref(false);
    const error = ref(null);

    // ตัวกรอง
    const filters = ref({
        category: "",
        country: "",
        order: "new", // ค่าเริ่มต้น
    });

    // Router และ Route
    const router = useRouter();
    const route = useRoute();

    // ฟังก์ชันสำหรับดึงข้อมูล
    async function fetchStickers() {
        try {
            loading.value = true;

            // สร้าง URL พร้อม query string
            const params = new URLSearchParams({
                category: filters.value.category,
                country: filters.value.country,
                order: filters.value.order,
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

    // ฟังก์ชันอัปเดต URL และดึงข้อมูลเมื่อฟิลเตอร์เปลี่ยน
    function applyFilters() {
        router.push({
            query: {
                ...route.query,
                page: 1, // รีเซ็ตหน้า
                category: filters.value.category,
                country: filters.value.country,
                order: filters.value.order,
            },
        });
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
