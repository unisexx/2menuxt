<template>
    <div class="mx-auto">
        <div class="flex flex-wrap lg:flex-nowrap">
            <!-- Left Column -->
            <div class="w-full lg:w-9/12 xl:w-8/12 p-4">
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
                            <!-- <option value="">ทั้งหมด</option> -->
                            <option value="official">อีโมจิทางการ</option>
                            <option value="creator">อีโมจิครีเอเตอร์</option>
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
                            <option value="new">ล่าสุด</option>
                            <option value="popular">ฮิต</option>
                        </select>
                    </div>
                </div>

                <!-- อีโมจิ -->
                <div v-if="emojiData && emojiData.data">
                    <h2 class="text-xl font-semibold mb-4">
                        {{ headerTitle }}
                    </h2>
                    <EmojiCard :emojis="emojiData.data" />
                    <hr />

                    <!-- Pagination -->
                    <div
                        class="relative z-50 flex justify-between items-center mt-6"
                    >
                        <button
                            @click="changePage(emojiData.current_page - 1)"
                            :disabled="!emojiData.prev_page_url"
                            class="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                        >
                            ก่อนหน้า
                        </button>
                        <span class="text-gray-700 font-medium"
                            >หน้าปัจจุบัน: {{ emojiData.current_page }}</span
                        >
                        <button
                            @click="changePage(emojiData.current_page + 1)"
                            :disabled="!emojiData.next_page_url"
                            class="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition z-50"
                        >
                            ถัดไป
                        </button>
                    </div>
                </div>
                <p v-else-if="emojiPending">Loading...</p>
                <p v-else>Error loading emoji data</p>
            </div>

            <!-- Right Column -->
            <div
                class="hidden lg:block w-full lg:w-3/12 xl:w-4/12 border-l border-gray-200 pl-4"
            >
                <!-- <div class="sticky top-4">
                    <p class="text-gray-700 font-medium mb-4">
                        Additional Content
                    </p>
                    <ul>
                        <li v-for="promo in promotions" :key="promo.id">
                            <a
                                :href="promo.link"
                                class="text-blue-500 hover:underline"
                            >
                                {{ promo.title }}
                            </a>
                        </li>
                    </ul>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed, watch } from "vue";
    import { useRouter, useRoute } from "vue-router";

    // ตัวแปรสำหรับเก็บข้อมูล API
    const emojiData = ref(null);
    const emojiPending = ref(false);
    const emojiError = ref(null);

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
        id: "อินโดนีเซีย",
    };

    // Router และ Route
    const router = useRouter();
    const route = useRoute();

    // ฟังก์ชันดึงข้อมูลอีโมจิ
    async function fetchEmojis(query) {
        try {
            emojiPending.value = true;
            const url = `https://api.line2me.in.th/api/emoji-more?${query}`;
            const res = await fetch(url);
            if (!res.ok) throw new Error("Failed to fetch emoji API");
            const data = await res.json();
            emojiData.value = data; // เก็บข้อมูลในตัวแปร
        } catch (error) {
            emojiError.value = error.message;
            console.error("Error fetching emoji data:", error.message);
        } finally {
            emojiPending.value = false;
        }
    }

    // ฟังก์ชันอัปเดต URL และดึงข้อมูล
    function applyFilters() {
        const newQuery = {
            ...route.query,
            page: 1, // รีเซ็ตหน้าเมื่อเปลี่ยนฟิลเตอร์
            country: selectedCountry.value,
            category: selectedCategory.value,
            order: selectedOrder.value, // เพิ่มตัวเลือกการเรียงลำดับ
        };

        router.push({ query: newQuery }); // อัปเดต URL
    }

    // ฟังก์ชันเปลี่ยนหน้า
    function changePage(page) {
        const newQuery = {
            ...route.query,
            page,
        };

        router.push({ query: newQuery }); // อัปเดต URL
        window.scrollTo({ top: 0 }); // เลื่อนกลับไปด้านบน
    }

    // สร้างหัวข้อจาก parameter
    const headerTitle = computed(() => {
        const countryLabel = countries[selectedCountry.value] || "ทั้งหมด";
        const categoryLabel =
            selectedCategory.value === "official"
                ? "อีโมจิทางการ"
                : selectedCategory.value === "creator"
                ? "อีโมจิครีเอเตอร์"
                : "อีโมจิทั้งหมด";
        const orderLabel = selectedOrder.value === "popular" ? "ฮิต" : "ล่าสุด";

        return `${categoryLabel} ${countryLabel} (${orderLabel})`;
    });

    // อัปเดต SEO
    useHead(() => {
        const title = `${headerTitle.value} | line2me`;
        const description = `ค้นหา ${headerTitle.value} ที่ line2me พร้อมข้อมูลที่อัปเดตล่าสุด`;
        const keywords = `อีโมจิไลน์, ${headerTitle.value}, ซื้ออีโมจิ, line2me`;

        return {
            title,
            meta: [
                { name: "description", content: description },
                { name: "keywords", content: keywords },
                { property: "og:title", content: title },
                { property: "og:description", content: description },
                { property: "og:type", content: "website" },
                {
                    property: "og:url",
                    content: window?.location?.href || "",
                },
                {
                    property: "og:image",
                    content: "https://example.com/default-emoji-image.jpg", // เปลี่ยน URL รูปภาพตามจริง
                },
            ],
        };
    });

    // Watch การเปลี่ยนแปลงของ query string
    watch(
        () => route.query,
        (newQuery) => {
            const query = new URLSearchParams(newQuery).toString();
            fetchEmojis(query); // ดึงข้อมูลใหม่เมื่อ query string เปลี่ยน
        },
        { immediate: true }
    );

    // ดึงค่าจาก query string ครั้งแรก
    selectedCountry.value = route.query.country || "";
    selectedCategory.value = route.query.category || "";
    selectedOrder.value = route.query.order || "new"; // ค่าดีฟอลต์เป็น "new"
</script>
