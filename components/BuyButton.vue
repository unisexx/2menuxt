<template>
    <NuxtLink
        :to="link"
        target="_blank"
        class="text-lg inline-block bg-blue-700 text-white text-center px-6 py-3 rounded-full hover:bg-blue-600 w-full transition duration-300 ease-in-out"
        :class="additionalClass"
    >
        <span class="material-symbols-outlined text-xl mb-1"
            >arrow_forward</span
        >
        {{ text }}
    </NuxtLink>
</template>

<script setup>
    defineProps({
        link: {
            type: String,
            default: "https://line.me/ti/p/~@line2me", // ค่าดีฟอลต์สำหรับ link
        },
        text: {
            type: String,
            default: "สั่งซื้อชุดนี้แอดไลน์ไอดี @line2me", // ค่าดีฟอลต์สำหรับข้อความ
        },
        additionalClass: {
            type: String,
            default: "",
        },
    });
</script>
