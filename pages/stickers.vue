<template>
    <div class="mx-auto">
        <div class="flex flex-wrap lg:flex-nowrap">
            <!-- Left Column -->
            <div class="w-full lg:w-9/12 xl:w-8/12 p-4">
                <!-- Filters -->
                <div class="flex flex-wrap gap-4 mb-4">
                    <!-- Filter Buttons for Category -->
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
                                สติกเกอร์ทางการ
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
                                สติกเกอร์ครีเอเตอร์
                            </button>
                        </div>
                    </div>

                    <!-- Filter Buttons for Country -->
                    <div>
                        <span class="block mb-2 font-medium">เลือกประเทศ:</span>
                        <div class="flex gap-2">
                            <button
                                v-for="(label, key) in filteredCountries"
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

                    <!-- Filter Buttons for Order -->
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

                <!-- Stickers Section -->
                <div v-if="stickerData && stickerData.data">
                    <h2 class="text-xl font-semibold mb-4">
                        {{ headerTitle }}
                    </h2>
                    <StickerCard :stickers="stickerData.data" />
                    <hr />
                    <!-- Pagination -->
                    <div class="flex justify-between items-center mt-6">
                        <button
                            @click="changePage(stickerData.current_page - 1)"
                            :disabled="!stickerData.prev_page_url"
                            class="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                        >
                            ก่อนหน้า
                        </button>
                        <span class="text-gray-700 font-semibold">
                            หน้าปัจจุบัน: {{ stickerData.current_page }}
                        </span>
                        <button
                            @click="changePage(stickerData.current_page + 1)"
                            :disabled="!stickerData.next_page_url"
                            class="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition z-50"
                        >
                            ถัดไป
                        </button>
                    </div>
                </div>
                <p v-else-if="stickerPending">Loading...</p>
                <p v-else>Error loading sticker data</p>
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

    // Data variables
    const stickerData = ref(null);
    const stickerPending = ref(false);
    const stickerError = ref(null);

    // Filters
    const selectedCountry = ref("");
    const selectedCategory = ref("");
    const selectedOrder = ref("new");

    // Country options
    const allCountries = {
        // "": "ทั้งหมด",
        th: "ไทย",
        jp: "ญี่ปุ่น",
        tw: "ไต้หวัน",
        id: "อินโดนีเซีย",
    };

    const filteredCountries = computed(() => {
        if (selectedCategory.value === "creator") {
            const { id, ...rest } = allCountries;
            return rest;
        }
        return allCountries;
    });

    const router = useRouter();
    const route = useRoute();

    function setFilter(type, value) {
        if (type === "category") selectedCategory.value = value;
        if (type === "country") selectedCountry.value = value;
        if (type === "order") selectedOrder.value = value;
        applyFilters();
    }

    async function fetchStickers(query) {
        try {
            stickerPending.value = true;
            const url = `https://api.line2me.in.th/api/sticker-more?${query}`;
            const res = await fetch(url);
            if (!res.ok) throw new Error("Failed to fetch sticker API");
            const data = await res.json();
            stickerData.value = data;
        } catch (error) {
            stickerError.value = error.message;
        } finally {
            stickerPending.value = false;
        }
    }

    function applyFilters() {
        const newQuery = {
            ...route.query,
            page: 1,
            country: selectedCountry.value,
            category: selectedCategory.value,
            order: selectedOrder.value,
        };
        router.push({ query: newQuery });
    }

    function changePage(page) {
        const newQuery = {
            ...route.query,
            page,
        };
        router.push({ query: newQuery });
        window.scrollTo({ top: 0 });
    }

    const headerTitle = computed(() => {
        const countryLabel = allCountries[selectedCountry.value] || "ทั้งหมด";
        const categoryLabel =
            selectedCategory.value === "official"
                ? "สติกเกอร์ทางการ"
                : selectedCategory.value === "creator"
                ? "สติกเกอร์ครีเอเตอร์"
                : "สติกเกอร์ทั้งหมด";
        const orderLabel = selectedOrder.value === "popular" ? "ฮิต" : "ล่าสุด";

        return `${categoryLabel} ${countryLabel} (${orderLabel})`;
    });

    useHead(() => {
        const title = `${headerTitle.value} | line2me`;
        const description = `ค้นหา ${headerTitle.value} ที่ line2me พร้อมข้อมูลที่อัปเดตล่าสุด`;

        const structuredData = {
            "@context": "https://schema.org",
            "@type": "Product",
            name: headerTitle.value,
            description: `ค้นหาสติกเกอร์ไลน์ประเภท ${selectedCategory.value}`,
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

    watch(
        () => route.query,
        (newQuery) => {
            const query = new URLSearchParams(newQuery).toString();
            fetchStickers(query);
        },
        { immediate: true }
    );

    selectedCountry.value = route.query.country || "th";
    selectedCategory.value = route.query.category || "official";
    selectedOrder.value = route.query.order || "new";
</script>
