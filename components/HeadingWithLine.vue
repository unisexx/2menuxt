<template>
    <h2 class="text-xl font-semibold mb-4 relative inline-block stroke-current">
        {{ text }}
        <svg
            :class="`${color} absolute -bottom-0.5 w-full max-h-1.5`"
            viewBox="0 0 55 5"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
        >
            <path
                d="M0.652466 4.00002C15.8925 2.66668 48.0351 0.400018 54.6853 2.00002"
                stroke-width="2"
            ></path>
        </svg>
    </h2>
</template>

<script>
    export default {
        props: {
            text: {
                type: String,
                required: true,
            },
            color: {
                type: String,
                required: true,
                default: "text-red-500", // สีเริ่มต้น
            },
        },
    };
</script>

<style scoped>
    /* คุณสามารถเพิ่มสไตล์เพิ่มเติมได้ที่นี่ หากต้องการ */
</style>
