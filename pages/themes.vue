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
                                ธีมทางการ
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
                                ธีมครีเอเตอร์
                            </button>
                        </div>
                    </div>

                    <!-- Filter Buttons for Country -->
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

                <!-- Theme List Section -->
                <div v-if="themeData && themeData.data">
                    <h2 class="text-xl font-semibold mb-4">
                        {{ headerTitle }}
                    </h2>
                    <ThemeCard :themes="themeData.data" />
                    <hr />
                    <!-- Pagination -->
                    <div class="flex justify-between items-center mt-6">
                        <button
                            @click="changePage(themeData.current_page - 1)"
                            :disabled="!themeData.prev_page_url"
                            class="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                        >
                            ก่อนหน้า
                        </button>
                        <span class="text-gray-700 font-semibold">
                            หน้าปัจจุบัน: {{ themeData.current_page }}
                        </span>
                        <button
                            @click="changePage(themeData.current_page + 1)"
                            :disabled="!themeData.next_page_url"
                            class="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition z-50"
                        >
                            ถัดไป
                        </button>
                    </div>
                </div>
                <p v-else-if="themePending">Loading...</p>
                <p v-else>Error loading theme data</p>
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
    const themeData = ref(null);
    const themePending = ref(false);
    const themeError = ref(null);

    // Filters
    const selectedCountry = ref("");
    const selectedCategory = ref("");
    const selectedOrder = ref("new");

    // Country options
    const countries = {
        // "": "ทั้งหมด",
        th: "ไทย",
        jp: "ญี่ปุ่น",
    };

    const router = useRouter();
    const route = useRoute();

    function setFilter(type, value) {
        if (type === "category") selectedCategory.value = value;
        if (type === "country") selectedCountry.value = value;
        if (type === "order") selectedOrder.value = value;
        applyFilters();
    }

    async function fetchThemes(query) {
        try {
            themePending.value = true;
            const url = `https://api.line2me.in.th/api/theme-more?${query}`;
            const res = await fetch(url);
            if (!res.ok) throw new Error("Failed to fetch theme API");
            const data = await res.json();
            themeData.value = data;
        } catch (error) {
            themeError.value = error.message;
        } finally {
            themePending.value = false;
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
        const countryLabel = countries[selectedCountry.value] || "ทั้งหมด";
        const categoryLabel =
            selectedCategory.value === "official"
                ? "ธีมทางการ"
                : selectedCategory.value === "creator"
                ? "ธีมครีเอเตอร์"
                : "ธีมทั้งหมด";
        const orderLabel = selectedOrder.value === "popular" ? "ฮิต" : "ล่าสุด";

        return `${categoryLabel} ${countryLabel} (${orderLabel})`;
    });

    useHead(() => {
        const title = `${headerTitle.value} | line2me`;
        const description = `ค้นหา ${headerTitle.value} ที่ line2me พร้อมข้อมูลที่อัปเดตล่าสุด`;
        const canonicalUrl = window?.location?.href || "";
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "Product",
            name: headerTitle.value,
            description: description,
            url: canonicalUrl,
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
                { rel: "canonical", href: canonicalUrl },
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
            fetchThemes(query);
        },
        { immediate: true }
    );

    selectedCountry.value = route.query.country || "th";
    selectedCategory.value = route.query.category || "official";
    selectedOrder.value = route.query.order || "new";
</script>
