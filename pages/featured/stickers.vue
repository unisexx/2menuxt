<template>
    <div class="mx-auto">
        <div class="flex flex-wrap lg:flex-nowrap">
            <!-- Left Column -->
            <div class="w-full lg:w-9/12 xl:w-8/12 p-4">
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

    // Router
    const router = useRouter();
    const route = useRoute();

    async function fetchStickers(query) {
        try {
            stickerPending.value = true;
            const url = `https://api.line2me.in.th/api/promote-sticker-more?${query}`;
            const res = await fetch(url);
            if (!res.ok) throw new Error("Failed to fetch sticker API");
            const data = await res.json();
            // ตรวจสอบว่า data เป็น array หรือ object ที่ต้องการ
            if (Array.isArray(data)) {
                stickerData.value = { data: data }; // ปรับให้ตรงกับที่ต้องการ
            } else {
                stickerData.value = data;
            }
        } catch (error) {
            stickerError.value = error.message;
        } finally {
            stickerPending.value = false;
        }
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
        return "สติกเกอร์แนะนำ";
    });

    useHead(() => {
        const title = `สติกเกอร์แนะนำ | line2me`;
        const description = `ค้นหาสติกเกอร์แนะนำและสติกเกอร์ยอดนิยมบน line2me พร้อมข้อมูลที่อัปเดตล่าสุด`;

        const structuredData = {
            "@context": "https://schema.org",
            "@type": "Product",
            name: "สติกเกอร์แนะนำและยอดนิยม",
            description:
                "ค้นหาสติกเกอร์แนะนำและสติกเกอร์ยอดนิยมที่คุณชื่นชอบบน line2me",
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
                { property: "og:description", content: description },
                { property: "og:type", content: "website" },
                { property: "og:url", content: window?.location?.href || "" },
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
</script>
