<template>
    <div class="flex justify-end mt-4">
        <NuxtLink :href="href" :class="class">
            <slot>
                ดูเพิ่ม
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                </svg>
            </slot>
        </NuxtLink>
    </div>
</template>

<script setup>
    defineProps({
        href: {
            type: String,
            required: true,
        },
        class: {
            type: String,
            default:
                "flex items-center text-green-500 font-semibold underline hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-300 ease-in-out",
        },
    });
</script>
