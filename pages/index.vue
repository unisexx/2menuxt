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
        title: "line2me.in.th | ร้านขายสติกเกอร์ไลน์ถูกลิขสิทธิ์ ส่งไว ไม่หมดอายุ",
        meta: [
            {
                name: "description",
                content:
                    "ค้นหาสติกเกอร์ไลน์ ธีม และอิโมจิใหม่ล่าสุดจาก line2me พร้อมข้อมูลอัปเดตใหม่ทุกวัน รวมสินค้าลิขสิทธิ์แท้มากมายในราคาสุดคุ้ม",
            },
            {
                name: "keywords",
                content:
                    "สติกเกอร์ไลน์, Line Sticker, สติกเกอร์น่ารัก, สติกเกอร์ใหม่, สติกเกอร์ไลน์ไทย, สติกเกอร์ไลน์สวยๆ, โหลดสติกเกอร์ไลน์, สติกเกอร์ไลน์ฟรี, สติกเกอร์ไลน์ยอดนิยม, สติกเกอร์ไลน์ครีเอเตอร์, ซื้อสติกเกอร์ไลน์, สติกเกอร์ไลน์ขำขัน, สติกเกอร์ไลน์น่ารักๆ, สติกเกอร์ไลน์ตัวการ์ตูน, สติกเกอร์ไลน์สัตว์, สติกเกอร์ไลน์เด็กๆ, สติกเกอร์ไลน์โปรโมชั่น, สติกเกอร์ไลน์ลดราคา, สติกเกอร์ไลน์ใหม่ล่าสุด, สติกเกอร์ไลน์แฟชั่น, ธีมไลน์, Line Theme, ธีมน่ารัก, ธีมใหม่, ธีมไลน์ไทย, ธีมไลน์สวยๆ, โหลดธีมไลน์, ธีมไลน์ฟรี, ธีมไลน์ยอดนิยม, ธีมไลน์ครีเอเตอร์, ซื้อธีมไลน์, ธีมไลน์ขำขัน, ธีมไลน์น่ารักๆ, ธีมไลน์ตัวการ์ตูน, ธีมไลน์สัตว์, ธีมไลน์เด็กๆ, ธีมไลน์โปรโมชั่น, ธีมไลน์ลดราคา, ธีมไลน์ใหม่ล่าสุด, ธีมไลน์แฟชั่น,  อิโมจิไลน์, Line Emoji, อิโมจิน่ารัก, อิโมจิใหม่, อิโมจิไลน์ไทย, อิโมจิไลน์สวยๆ, โหลดอิโมจิไลน์, อิโมจิไลน์ฟรี, อิโมจิไลน์ยอดนิยม, อิโมจิไลน์ครีเอเตอร์, ซื้ออิโมจิไลน์, อิโมจิไลน์ขำขัน, อิโมจิไลน์น่ารักๆ, อิโมจิไลน์ตัวการ์ตูน, อิโมจิไลน์สัตว์, อิโมจิไลน์เด็กๆ, อิโมจิไลน์โปรโมชั่น, อิโมจิไลน์ลดราคา, อิโมจิไลน์ใหม่ล่าสุด, อิโมจิไลน์แฟชั่น, สติกเกอร์ใหม่, ธีมใหม่, อิโมจิใหม่, line2me, สติกเกอร์ลิขสิทธิ์, ธีมลิขสิทธิ์, อิโมจิลิขสิทธิ์",
            },
            {
                property: "og:title",
                content: "line2me - สติกเกอร์ ธีม และอิโมจิใหม่ล่าสุด",
            },
            {
                property: "og:description",
                content:
                    "ค้นหาสติกเกอร์ไลน์ ธีม และอิโมจิใหม่ล่าสุดจาก line2me พร้อมข้อมูลอัปเดตใหม่ทุกวัน รวมสินค้าลิขสิทธิ์แท้มากมายในราคาสุดคุ้ม",
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
