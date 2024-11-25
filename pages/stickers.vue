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
                    v-model="selectedCategory"
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
                    v-model="selectedCountry"
                    @change="applyFilters"
                    class="border rounded px-3 py-2"
                >
                    <option
                        v-for="(label, key) in countries"
                        :key="key"
                        :value="key"
                    >
                        {{ label }}
                    </option>
                </select>
            </div>

            <!-- เลือกการเรียงลำดับ -->
            <div>
                <label for="order" class="block mb-2 font-medium"
                    >เรียงลำดับ:</label
                >
                <select
                    id="order"
                    v-model="selectedOrder"
                    @change="applyFilters"
                    class="border rounded px-3 py-2"
                >
                    <option value="popular">ฮิต</option>
                    <option value="new">ล่าสุด</option>
                </select>
            </div>
        </div>

        <!-- สติกเกอร์ -->
        <div v-if="stickerData">
            <h2 class="text-xl font-semibold mb-4">{{ headerTitle }}</h2>
            <StickerCard :stickers="stickerData.data" />
            <hr />

            <!-- Pagination -->
            <div class="flex justify-between items-center mt-6">
                <button
                    @click="changePage(stickerData?.current_page - 1)"
                    :disabled="!stickerData?.prev_page_url"
                    class="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                >
                    ก่อนหน้า
                </button>
                <span class="text-gray-700 font-semibold">
                    หน้าปัจจุบัน: {{ stickerData?.current_page || 1 }}
                </span>
                <button
                    @click="changePage(stickerData?.current_page + 1)"
                    :disabled="!stickerData?.next_page_url"
                    class="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                >
                    ถัดไป
                </button>
            </div>
        </div>
        <p v-else-if="pending">Loading...</p>
        <p v-else>Error loading sticker data</p>
    </div>
</template>

<script setup>
    import { ref, computed } from "vue";
    import { useRouter, useRoute } from "vue-router";
    import { useAsyncData } from "#app";

    // ตัวแปรสำหรับฟิลเตอร์
    const selectedCountry = ref("");
    const selectedCategory = ref("");
    const selectedOrder = ref("new"); // ค่าดีฟอลต์เป็น "ล่าสุด"

    // ตัวเลือกประเทศ
    const countries = {
        "": "ทั้งหมด",
        th: "ไทย",
        jp: "ญี่ปุ่น",
        tw: "ไต้หวัน",
        us: "สหรัฐอเมริกา",
    };

    // Router และ Route
    const router = useRouter();
    const route = useRoute();

    // ดึงข้อมูลสติกเกอร์
    const {
        data: stickerData,
        pending,
        refresh,
    } = useAsyncData(() =>
        $fetch(`https://api.line2me.in.th/api/sticker-more`, {
            params: {
                page: route.query.page || 1,
                country: route.query.country || "",
                category: route.query.category || "",
                order: route.query.order || "new",
            },
        })
    );

    // ฟังก์ชันอัปเดต URL และดึงข้อมูล
    function applyFilters() {
        router.push({
            query: {
                ...route.query,
                page: 1, // รีเซ็ตหน้าเมื่อเปลี่ยนฟิลเตอร์
                country: selectedCountry.value,
                category: selectedCategory.value,
                order: selectedOrder.value, // เพิ่มตัวเลือกการเรียงลำดับ
            },
        });
        refresh(); // ดึงข้อมูลใหม่
    }

    // ฟังก์ชันเปลี่ยนหน้า
    function changePage(page) {
        if (page < 1 || !page) return; // ป้องกันหน้าติดลบหรือ null
        router.push({
            query: {
                ...route.query,
                page,
            },
        });
        refresh(); // โหลดข้อมูลใหม่
    }

    // สร้างหัวข้อจาก parameter
    const headerTitle = computed(() => {
        const countryLabel = countries[selectedCountry.value] || "ทั้งหมด";
        const categoryLabel =
            selectedCategory.value === "official"
                ? "สติกเกอร์ทางการ"
                : selectedCategory.value === "creator"
                ? "สติกเกอร์ครีเอเตอร์"
                : "สติกเกอร์ทั้งหมด";
        const orderLabel = selectedOrder.value === "popular" ? "ฮิต" : "ล่าสุด";

        return `${categoryLabel} ${countryLabel} (${orderLabel})`;
    });
</script>
