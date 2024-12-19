<template>
    <div class="mx-auto">
        <div class="flex flex-wrap lg:flex-nowrap">
            <!-- Left Column -->
            <div class="w-full lg:w-9/12 xl:w-8/12 p-4">
                <!-- ฟิลเตอร์ -->
                <div class="flex flex-wrap gap-4 mb-4">
                    <!-- เลือกประเภท -->
                    <div>
                        <span class="block mb-2 font-medium">เลือกประเภท:</span>
                        <div class="flex gap-2">
                            <button
                                @click="setFilter('category', 'official')"
                                :class="[
                                    'px-3 py-1 sm:px-4 sm:py-2 font-medium rounded text-sm sm:text-base',
                                    selectedCategory === 'official'
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-200 text-gray-800',
                                ]"
                            >
                                อีโมจิทางการ
                            </button>
                            <button
                                @click="setFilter('category', 'creator')"
                                :class="[
                                    'px-3 py-1 sm:px-4 sm:py-2 font-medium rounded text-sm sm:text-base',
                                    selectedCategory === 'creator'
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-200 text-gray-800',
                                ]"
                            >
                                อีโมจิครีเอเตอร์
                            </button>
                        </div>
                    </div>

                    <!-- เลือกประเทศ -->
                    <div>
                        <span class="block mb-2 font-medium">เลือกประเทศ:</span>
                        <div class="flex gap-2">
                            <button
                                v-for="(label, key) in countries"
                                :key="key"
                                @click="setFilter('country', key)"
                                :class="[
                                    'px-3 py-1 sm:px-4 sm:py-2 font-medium rounded text-sm sm:text-base',
                                    selectedCountry === key
                                        ? 'bg-green-500 text-white'
                                        : 'bg-gray-200 text-gray-800',
                                ]"
                            >
                                {{ label }}
                            </button>
                        </div>
                    </div>

                    <!-- เลือกการเรียงลำดับ -->
                    <div>
                        <span class="block mb-2 font-medium">เรียงลำดับ:</span>
                        <div class="inline-flex gap-2">
                            <button
                                @click="setFilter('order', 'new')"
                                :class="[
                                    'px-3 py-1 sm:px-4 sm:py-2 font-medium rounded text-sm sm:text-base',
                                    selectedOrder === 'new'
                                        ? 'bg-purple-500 text-white'
                                        : 'bg-gray-200 text-gray-800',
                                ]"
                            >
                                ล่าสุด
                            </button>
                            <button
                                @click="setFilter('order', 'popular')"
                                :class="[
                                    'px-3 py-1 sm:px-4 sm:py-2 font-medium rounded text-sm sm:text-base',
                                    selectedOrder === 'popular'
                                        ? 'bg-purple-500 text-white'
                                        : 'bg-gray-200 text-gray-800',
                                ]"
                            >
                                ฮิต
                            </button>
                        </div>
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
                <!-- Placeholder for Additional Content -->
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
        // "": "ทั้งหมด",
        th: "ไทย",
        jp: "ญี่ปุ่น",
        tw: "ไต้หวัน",
        // id: "อินโดนีเซีย",
    };

    // Router และ Route
    const router = useRouter();
    const route = useRoute();

    // ฟังก์ชันสำหรับตั้งค่า Filter
    function setFilter(type, value) {
        if (type === "category") selectedCategory.value = value;
        if (type === "country") selectedCountry.value = value;
        if (type === "order") selectedOrder.value = value;
        applyFilters();
    }

    // ฟังก์ชันอัปเดต URL และดึงข้อมูล
    function applyFilters() {
        const newQuery = {
            ...route.query,
            page: 1, // รีเซ็ตหน้าเมื่อเปลี่ยนฟิลเตอร์
            country: selectedCountry.value,
            category: selectedCategory.value,
            order: selectedOrder.value,
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

    // เพิ่ม SEO ด้วย useHead
    useHead(() => {
        const title = `${headerTitle.value} | line2me`;
        const description = `ค้นหา ${headerTitle.value} ที่ line2me พร้อมข้อมูลที่อัปเดตล่าสุด`;

        const structuredData = {
            "@context": "https://schema.org",
            "@type": "Product",
            name: headerTitle.value,
            description: `ค้นหาอีโมจิไลน์ประเภท ${selectedCategory.value}`,
            url: window?.location?.href || "",
            offers: {
                "@type": "Offer",
                priceCurrency: "THB",
                availability: "https://schema.org/InStock",
            },
        };

        return {
            title,
            meta: [
                { name: "description", content: description },
                { property: "og:title", content: title },
                { rel: "canonical", href: window?.location?.href || "" },
            ],
            script: [
                {
                    type: "application/ld+json",
                    innerHTML: JSON.stringify(structuredData),
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
    selectedCountry.value = route.query.country || "th";
    selectedCategory.value = route.query.category || "official";
    selectedOrder.value = route.query.order || "new"; // ค่าดีฟอลต์เป็น "new"

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
</script>
