<template>
    <div
        :class="[
            defaultClass, // ค่าเริ่มต้น
            customClass, // ค่า override จาก props
        ]"
    >
        <NuxtLink
            v-for="emoji in emojis"
            :key="emoji.id"
            :to="'/emoji/' + emoji.id"
            class="overflow-hidden block"
        >
            <div class="relative">
                <!-- รูปภาพเต็มขนาด -->
                <img
                    :src="`https://stickershop.line-scdn.net/sticonshop/v1/product/${emoji.emoji_code}/iphone/main.png`"
                    :alt="emoji.title"
                    class="w-full"
                    loading="lazy"
                />
                <span
                    v-if="emoji.is_new"
                    class="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-1 rounded custom-font-size"
                >
                    NEW
                </span>
            </div>
            <div class="p-4 text-center">
                <h3 class="text-sm font-semibold text-gray-600 mb-2">
                    <span
                        v-if="emoji.country !== 'th'"
                        class="fflag ff-sm mb-1"
                        :class="'fflag-' + emoji.country.toUpperCase()"
                        :title="emoji.country"
                    ></span>
                    {{ emoji.title }}
                </h3>
                <p class="text-sm font-bold text-green-600">
                    {{ emoji.price }} THB
                </p>
            </div>
        </NuxtLink>
    </div>
</template>

<script>
    export default {
        props: {
            emojis: {
                type: Array,
                required: true,
            },
            customClass: {
                type: String,
                default: "", // ไม่มีค่า override class ถ้าไม่ได้ส่งเข้ามา
            },
        },
        computed: {
            defaultClass() {
                return "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 md:gap-4 mt-6";
            },
        },
    };
</script>

<style scoped>
    /* คุณสามารถเพิ่มสไตล์เฉพาะสำหรับ component นี้ได้ */
    .custom-font-size {
        font-size: 8px; /* Default สำหรับมือถือ */
    }
</style>
