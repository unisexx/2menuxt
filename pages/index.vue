<template>
    <div>
        <!-- สติกเกอร์ -->
        <div v-if="stickerData">
            <h2 class="text-xl font-semibold mb-4">
                สติกเกอร์ไลน์อัพเดทประจำสัปดาห์
            </h2>
            <StickerCard :stickers="stickerData" />
        </div>
        <p v-else-if="stickerPending">Loading...</p>
        <p v-else>Error loading sticker data</p>

        <!-- ธีม -->
        <div v-if="themeData">
            <h2 class="text-xl font-semibold mb-4">
                ธีมไลน์อัพเดทประจำสัปดาห์
            </h2>
            <ThemeCard :themes="themeData" />
        </div>
        <p v-else-if="themePending">Loading...</p>
        <p v-else>Error loading theme data</p>

        <!-- อีโมจิ -->
        <div v-if="emojiData">
            <h2 class="text-xl font-semibold mb-4">
                อีโมจิไลน์อัพเดทประจำสัปดาห์
            </h2>
            <EmojiCard :emojis="emojiData" />
        </div>
        <p v-else-if="emojiPending">Loading...</p>
        <p v-else>Error loading emoji data</p>
    </div>
</template>

<script setup>
    import { useRoute } from "#app";

    const route = useRoute();
    const id = route.params.id;

    // SEO
    useHead({
        title: "Line2Me - สติกเกอร์ ธีม และอิโมจิใหม่ล่าสุด",
        meta: [
            {
                name: "description",
                content:
                    "ค้นหาสติกเกอร์ไลน์ ธีม และอิโมจิใหม่ล่าสุดจาก Line2Me พร้อมข้อมูลอัปเดตใหม่ทุกวัน รวมสินค้าลิขสิทธิ์แท้มากมายในราคาสุดคุ้ม",
            },
            {
                name: "keywords",
                content:
                    "สติกเกอร์ไลน์, ธีมไลน์, อิโมจิไลน์, สติกเกอร์ใหม่, ธีมใหม่, อิโมจิใหม่, Line2Me, สติกเกอร์ลิขสิทธิ์, ธีมลิขสิทธิ์, อิโมจิลิขสิทธิ์",
            },
            {
                property: "og:title",
                content: "Line2Me - สติกเกอร์ ธีม และอิโมจิใหม่ล่าสุด",
            },
            {
                property: "og:description",
                content:
                    "ค้นหาสติกเกอร์ไลน์ ธีม และอิโมจิใหม่ล่าสุดจาก Line2Me พร้อมข้อมูลอัปเดตใหม่ทุกวัน รวมสินค้าลิขสิทธิ์แท้มากมายในราคาสุดคุ้ม",
            },
            {
                property: "og:image",
                content: "https://example.com/default-og-image.jpg",
            },
            { property: "og:url", content: "https://example.com/" },
        ],
    });

    // สติกเกอร์ API
    const {
        data: stickerData,
        error: stickerError,
        pending: stickerPending,
    } = await useAsyncData(`fetchSticker-${id}`, async () => {
        const res = await fetch(`https://api.line2me.in.th/api/sticker-update`);
        if (!res.ok) throw new Error("Failed to fetch sticker API");
        return res.json();
    });

    // ธีม API
    const {
        data: themeData,
        error: themeError,
        pending: themePending,
    } = await useAsyncData(`fetchTheme-${id}`, async () => {
        const res = await fetch(`https://api.line2me.in.th/api/theme-update`);
        if (!res.ok) throw new Error("Failed to fetch theme API");
        return res.json();
    });

    // อีโมจิ API
    const {
        data: emojiData,
        error: emojiError,
        pending: emojiPending,
    } = await useAsyncData(`fetchEmoji-${id}`, async () => {
        const res = await fetch(`https://api.line2me.in.th/api/emoji-update`);
        if (!res.ok) throw new Error("Failed to fetch emoji API");
        return res.json();
    });

    // ตรวจสอบข้อผิดพลาด
    if (stickerError.value) {
        console.error("Error fetching sticker data:", stickerError.value);
    }
    if (themeError.value) {
        console.error("Error fetching theme data:", themeError.value);
    }
    if (emojiError.value) {
        console.error("Error fetching emoji data:", emojiError.value);
    }
</script>
