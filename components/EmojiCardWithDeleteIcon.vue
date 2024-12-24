<template>
    <div :class="[defaultClass, customClass]">
        <div
            v-for="emoji in emojis"
            :key="emoji.id"
            class="overflow-hidden relative block"
        >
            <!-- เนื้อหาลิงก์ -->
            <NuxtLink :to="'/emoji/' + emoji.id" class="block">
                <div>
                    <img
                        :src="`https://stickershop.line-scdn.net/sticonshop/v1/product/${emoji.emoji_code}/iphone/main.png`"
                        :alt="emoji.title"
                        class="w-full"
                        loading="lazy"
                    />
                    <span
                        v-if="emoji.is_new"
                        class="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-1 rounded isnew-font-size"
                    >
                        NEW
                    </span>
                </div>
            </NuxtLink>

            <!-- ปุ่มลบ -->
            <button
                v-if="isAdmin"
                @click.stop="deleteEmoji(emoji.id)"
                class="absolute top-2 left-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition"
                title="ลบ"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>

            <!-- ข้อมูลเพิ่มเติม -->
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
        </div>
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
                default: "",
            },
            isAdmin: {
                type: Boolean,
                default: false, // กำหนดสถานะ Admin เพื่อแสดงปุ่มลบ
            },
        },
        methods: {
            async deleteEmoji(id) {
                if (confirm("คุณต้องการลบอิโมจินี้หรือไม่?")) {
                    try {
                        const response = await fetch(
                            "https://api.line2me.in.th/api/emoji-change-status",
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    id: id,
                                    key: "AFbTh7BgkbD5RcCjTfTNABdtgTXR0R6C",
                                }),
                            }
                        );

                        if (!response.ok) {
                            throw new Error("Failed to delete emoji.");
                        }

                        const result = await response.json();
                        console.log(
                            result.message || "Emoji deleted successfully."
                        );

                        // รีโหลดหน้าเว็บใหม่หลังจากลบสำเร็จ
                        window.location.reload();
                    } catch (error) {
                        console.error(
                            error.message ||
                                "An error occurred while deleting the emoji."
                        );
                    }
                }
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
    button[title="ลบ"] {
        position: absolute;
        top: 0.5rem;
        left: 0.5rem;
        z-index: 10;
    }
</style>
