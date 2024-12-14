<template>
    <div
        :class="[
            defaultClass, // ค่า default
            customClass, // ค่า override จาก props
        ]"
    >
        <NuxtLink
            v-for="theme in themes"
            :key="theme.id"
            :to="'/theme/' + theme.id"
            class="overflow-hidden block"
        >
            <div class="relative">
                <!-- รูปภาพเต็มขนาด -->
                <img
                    :src="theme.img_url"
                    :alt="theme.title"
                    class="w-full"
                    loading="lazy"
                />
                <span
                    v-if="theme.is_new"
                    class="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-1 rounded isnew-font-size"
                >
                    NEW
                </span>
            </div>
            <div class="p-4 text-center">
                <h3 class="text-sm font-semibold text-gray-600 mb-2">
                    <span
                        v-if="theme.country !== 'th'"
                        class="fflag ff-sm mb-1"
                        :class="'fflag-' + theme.country.toUpperCase()"
                        :title="theme.country"
                    ></span>
                    {{ theme.title }}
                </h3>
                <p class="text-sm font-bold text-green-600">
                    {{ theme.price }} THB
                </p>
            </div>
        </NuxtLink>
    </div>
</template>

<script>
    export default {
        props: {
            themes: {
                type: Array,
                required: true,
            },
            customClass: {
                type: String,
                default: "", // ไม่ override class ถ้าไม่ได้ส่งเข้ามา
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
    /* ใช้ขนาดที่เล็กสำหรับมือถือ และปรับขนาดสำหรับหน้าจอที่ใหญ่ขึ้น */
    .isnew-font-size {
        font-size: 8px; /* Default สำหรับมือถือ */
    }
</style>
