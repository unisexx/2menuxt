<template>
    <div :class="[defaultClass, customClass]">
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
                    class="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-1 rounded isnew-font-size"
                >
                    NEW
                </span>
            </div>
            <div class="p-4 text-center">
                <h3 class="text-sm font-semibold text-gray-600 mb-2">
                    <span
                        v-if="sticker.country !== 'th'"
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
        </NuxtLink>

        <!-- Card Promote -->
        <NuxtLink
            v-if="showPromote"
            href="/promote"
            class="overflow-hidden block relative bg-teal-500 rounded-lg shadow-lg"
        >
            <svg
                class="absolute bottom-0 left-0 mb-8"
                viewBox="0 0 375 283"
                fill="none"
                style="transform: scale(1.5); opacity: 0.1"
            >
                <rect
                    x="159.52"
                    y="175"
                    width="152"
                    height="152"
                    rx="8"
                    transform="rotate(-45 159.52 175)"
                    fill="white"
                />
                <rect
                    y="107.48"
                    width="152"
                    height="152"
                    rx="8"
                    transform="rotate(-45 0 107.48)"
                    fill="white"
                />
            </svg>
            <div class="relative">
                <!-- Card Promote Image -->
                <img
                    src="https://i.imgur.com/6GYpcjc.png"
                    class="w-full"
                    loading="lazy"
                />
            </div>
            <div class="p-4 text-center text-white">
                <h3 class="text-sm font-semibold mb-2">
                    โปรโมทสติกเกอร์ไลน์ของคุณตำแหน่งนี้คลิก
                </h3>
                <p class="text-sm font-bold">100 บาท / เดือน</p>
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
                default: "",
            },
            showPromote: {
                type: Boolean,
                default: false, // Default คือไม่แสดง Card Promote
            },
        },
        computed: {
            defaultClass() {
                return "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-6 gap-2 md:gap-4 mt-6";
            },
        },
    };
</script>

<style scoped>
    .isnew-font-size {
        font-size: 8px;
    }
</style>
