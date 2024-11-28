<template>
    <div
        v-if="stickers.length > 0"
        class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-5 gap-2 md:gap-4 mt-6"
    >
        <a
            v-for="sticker in stickers"
            :key="sticker.id"
            :href="'/sticker/' + (sticker.sticker_code || 'unknown')"
            class="overflow-hidden block"
        >
            <div class="relative">
                <img
                    :src="sticker.img_url || '/default-image.png'"
                    :alt="sticker.title_th || 'No title available'"
                    class="w-full"
                    loading="lazy"
                />
                <span
                    v-if="sticker.is_new === true"
                    class="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-1 rounded custom-font-size"
                >
                    NEW
                </span>
            </div>
            <div class="p-4 text-center">
                <h3 class="text-sm font-semibold text-gray-600 mb-2">
                    <span
                        v-if="sticker.country && sticker.country !== 'th'"
                        class="fflag ff-sm mb-1"
                        :class="'fflag-' + sticker.country.toUpperCase()"
                        :title="sticker.country"
                    ></span>
                    {{ sticker.title_th }}
                </h3>
                <p class="text-sm font-bold text-green-600">
                    {{ sticker.price }} THB
                </p>
            </div>
        </a>
    </div>
    <div v-else>
        <div
            class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 md:gap-4 mt-6"
        >
            <div
                v-for="n in 8"
                :key="n"
                class="animate-pulse bg-gray-300 h-40 w-full rounded"
            ></div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            stickers: {
                type: Array,
                required: true,
                default: () => [],
            },
        },
    };
</script>

<style scoped>
    .custom-font-size {
        font-size: 8px; /* Default สำหรับมือถือ */
    }

    @media (max-width: 640px) {
        .custom-font-size {
            font-size: 10px;
        }
    }
</style>
