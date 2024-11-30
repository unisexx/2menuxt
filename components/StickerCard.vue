<template>
    <div
        :class="[
            defaultClass,
            customClass, // ใช้ customClass ที่รับมาจาก props
        ]"
    >
        <NuxtLink
            v-for="sticker in stickers"
            :key="sticker.id"
            :to="'/sticker/' + sticker.sticker_code"
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
                    v-if="sticker.is_new"
                    class="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-1 rounded"
                >
                    NEW
                </span>
            </div>
            <div class="p-4 text-center">
                <h3 class="text-sm font-semibold text-gray-600 mb-2">
                    {{ sticker.title_th }}
                </h3>
                <p class="text-sm font-bold text-green-600">
                    {{ sticker.price }} THB
                </p>
            </div>
        </NuxtLink>
    </div>
</template>

<script>
    export default {
        props: {
            stickers: {
                type: Array,
                required: true,
            },
            customClass: {
                type: String,
                default: "", // Default คือไม่มีการเพิ่ม class
            },
        },
        computed: {
            defaultClass() {
                return "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 md:gap-4 mt-6";
            },
        },
    };
</script>
