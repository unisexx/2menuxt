<template>
    <div class="mx-auto">
        <div v-if="emoji">
            <div class="flex flex-wrap">
                <div
                    v-if="emoji.status === 1"
                    class="w-full lg:w-9/12 xl:w-8/12 mx-auto p-4"
                >
                    <!-- Breadcrumb -->
                    <nav class="mb-4 bg-gray-100 rounded-lg p-4">
                        <ol
                            class="breadcrumb flex flex-wrap items-center text-sm text-gray-500"
                        >
                            <li class="breadcrumb-item flex items-center">
                                <NuxtLink
                                    to="/"
                                    class="text-gray-500 hover:text-blue-600"
                                >
                                    หน้าแรก
                                </NuxtLink>
                                <span class="mx-2">/</span>
                            </li>
                            <li class="breadcrumb-item flex items-center">
                                <NuxtLink
                                    :to="getCategoryLink()"
                                    class="text-gray-500 hover:text-blue-600"
                                >
                                    {{ getCategoryText() }}
                                </NuxtLink>
                                <span class="mx-2">/</span>
                            </li>
                            <li class="breadcrumb-item flex items-center">
                                <NuxtLink
                                    :to="getCountryLink()"
                                    class="text-gray-500 hover:text-blue-600"
                                >
                                    {{ getCountryText() }}
                                </NuxtLink>
                                <span class="mx-2">/</span>
                            </li>
                            <li class="breadcrumb-item active text-gray-700">
                                <NuxtLink
                                    class="cursor-default"
                                    rel="nofollow"
                                    :href="`line://shop/emoji/detail?id=${emoji.emoji_code}`"
                                    target="_blank"
                                >
                                    {{ emoji.title }}
                                </NuxtLink>
                            </li>
                        </ol>
                    </nav>

                    <!-- ตัวอย่างอิโมจิ -->
                    <div class="flex items-start">
                        <!-- รูปภาพหลัก -->
                        <div class="relative mr-3">
                            <img
                                :src="`https://stickershop.line-scdn.net/sticonshop/v1/product/${emoji.emoji_code}/iphone/main.png`"
                                :alt="emoji.title"
                                class="w-32 sm:w-48 lg:w-56 xl:w-64 h-auto rounded-lg"
                                loading="lazy"
                            />
                            <span
                                v-if="emoji.is_new"
                                class="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-1 rounded custom-font-size"
                            >
                                NEW
                            </span>
                        </div>

                        <!-- ข้อมูลข้อความ -->
                        <div class="flex-1">
                            <h1
                                class="text-xl sm:text-2xl lg:text-3xl font-bold mb-4"
                            >
                                {{ emoji.title }}
                            </h1>
                            <p class="hidden md:block text-gray-600 mb-2">
                                {{ emoji.detail }}
                            </p>
                            <p class="mb-2">
                                <span class="font-bold">รหัสสินค้า:</span>
                                E-{{ emoji.id }}
                            </p>
                            <p class="mb-2">
                                <span class="font-bold">ประเทศ:</span>
                                <span
                                    class="fflag ff-sm ml-1 mb-1"
                                    :class="
                                        'fflag-' + emoji.country.toUpperCase()
                                    "
                                    :title="emoji.country"
                                ></span>
                                {{ getCountryText() }}
                            </p>
                            <p class="text-lg mb-2 font-bold">
                                <span>ราคา: </span>
                                <span class="text-red-500">{{
                                    emoji.price
                                }}</span>
                                <span>THB</span>
                            </p>
                            <!-- ปุ่มสั่งซื้อ -->
                            <BuyButton additionalClass="hidden md:block" />
                        </div>
                    </div>

                    <div class="mt-2">
                        <!-- ปุ่มสั่งซื้อ -->
                        <BuyButton additionalClass="block md:hidden" />
                    </div>

                    <hr class="my-4 border-t border-gray-200" />

                    <!-- Section: ตัวอย่างอิโมจิ -->
                    <div class="mt-8">
                        <h2 class="text-2xl font-semibold mb-4">
                            ตัวอย่างอิโมจิ
                        </h2>
                        <div class="grid grid-cols-8 gap-4">
                            <div
                                v-for="x in 150"
                                :key="x"
                                ref="emojiContainerRefs"
                                class="text-center overflow-hidden"
                            >
                                <img
                                    class="w-full h-auto rounded"
                                    :src="
                                        generateEmojiImageUrl(
                                            emoji.emoji_code,
                                            x
                                        )
                                    "
                                    :alt="`อิโมจิไลน์ ${emoji.title}`"
                                    @error="hideImage(x)"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>

                    <hr class="mt-5 mb-5" />

                    <!-- โปรโมทสติกเกอร์ -->
                    <div>
                        <HeadingWithLine
                            text="สติกเกอร์แนะนำ"
                            color="text-green-500"
                        />
                        <StickerCard
                            :stickers="promoteStickerData"
                            :showPromote="true"
                        />
                        <hr class="my-5" />
                    </div>

                    <!-- อิโมจิตามผู้สร้าง -->
                    <!-- แสดงข้อมูลเมื่อโหลดเสร็จ -->
                    <div v-if="authorEmojiData && authorEmojiData.length > 0">
                        <HeadingWithLine
                            text="อิโมจิอื่นๆที่น่าสนใจ"
                            color="text-teal-500"
                        />
                        <EmojiCard :emojis="authorEmojiData" />
                        <hr class="my-5" />
                    </div>
                    <p v-if="authorEmojiPending">กำลังโหลด...</p>

                    <!-- สติกเกอร์ตามผู้สร้าง -->
                    <!-- แสดงข้อมูลเมื่อโหลดเสร็จ -->
                    <div
                        v-if="authorStickerData && authorStickerData.length > 0"
                    >
                        <HeadingWithLine
                            text="สติกเกอร์อื่นๆที่น่าสนใจ"
                            color="text-sky-400"
                        />
                        <StickerCard :stickers="authorStickerData" />
                        <hr class="my-5" />
                    </div>
                    <p v-if="authorStickerPending">กำลังโหลด...</p>

                    <!-- ธีมตามผู้สร้าง -->
                    <!-- แสดงข้อมูลเมื่อโหลดเสร็จ -->
                    <div v-if="authorThemeData && authorThemeData.length > 0">
                        <HeadingWithLine
                            text="ธีมอื่นๆที่น่าสนใจ"
                            color="text-rose-400"
                        />
                        <ThemeCard :themes="authorThemeData" />
                        <hr class="my-5" />
                    </div>
                    <p v-if="authorThemePending">กำลังโหลด...</p>
                </div>

                <!-- status = 0 ไม่มีขายแล้ว -->
                <NotAvailable
                    v-if="emoji.status === 0"
                    :imgUrl="`https://stickershop.line-scdn.net/sticonshop/v1/product/${emoji.emoji_code}/iphone/main.png`"
                    :title="emoji.title"
                />

                <div
                    class="w-full lg:w-3/12 xl:w-4/12 border-l border-gray-200"
                >
                    <!-- เนื้อหาคอลัมน์ขวา -->
                </div>
            </div>
        </div>

        <p v-else-if="emojiPending">Loading...</p>
    </div>
</template>

<script setup>
    import { ref, onMounted } from "vue";
    import { useRoute } from "#app";
    import BuyButton from "~/components/BuyButton.vue";

    // ดึงค่า route ID
    const route = useRoute();
    const id = route.params.id;

    // ตั้งค่า States
    const emoji = ref(null);
    const promoteStickerData = ref(null);
    const authorStickerData = ref(null);
    const authorThemeData = ref(null);
    const authorEmojiData = ref(null);

    // const emojiPending = ref(true);
    // const promoteStickerPending = ref(true);
    // const authorStickerPending = ref(true);
    // const authorThemePending = ref(true);
    // const authorEmojiPending = ref(true);

    const emojiPending = ref(false);
    const promoteStickerPending = ref(false);
    const authorStickerPending = ref(false);
    const authorThemePending = ref(false);
    const authorEmojiPending = ref(false);

    //===== onMounted จะทำงานฝั่ง client ไม่เป็น SSR (Server Side Rendering) =====/
    onMounted(async () => {
        try {
            // 1. โหลดข้อมูลอิโมจิ
            const emojiRes = await fetch(
                `https://api.line2me.in.th/api/emoji-view/${id}`
            );
            if (emojiRes.ok) emoji.value = await emojiRes.json();
            emojiPending.value = false;

            // 2. LOG Product View
            if (emoji.value) {
                try {
                    // ดึง IP ของ client
                    const clientIp = await fetch("/api/get-client-ip")
                        .then((res) => res.json())
                        .then((data) => data.ip) // รับค่า IP ตรง ๆ โดยไม่ต้องแยก
                        .catch(() => "Unknown"); // Default IP เป็น Unknown

                    // สร้าง payload สำหรับการส่งข้อมูลแบบ POST
                    const payload = {
                        type: "emoji",
                        id: emoji.value.id,
                        ip_address: clientIp,
                    };

                    // ส่งคำขอ POST พร้อม payload
                    await fetch(
                        "https://api.line2me.in.th/api/record-product-view",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json", // กำหนดให้ส่งเป็น JSON
                            },
                            body: JSON.stringify(payload), // แปลง payload เป็น JSON
                        }
                    );

                    // console.log("Record Product View Successfully Sent (POST)");
                } catch (error) {
                    console.error("Error sending record-product-view:", error);
                }
            }

            // 3. โหลด API อื่น ๆ ตามลำดับ
            if (emoji.value) {
                // สติกเกอร์โปรโมท
                const promoteStickerRes = await fetch(
                    `https://api.line2me.in.th/api/promote-sticker`
                );
                if (promoteStickerRes.ok)
                    promoteStickerData.value = await promoteStickerRes.json();
                promoteStickerPending.value = false;

                // สติกเกอร์อื่นๆ ตามผู้สร้าง
                const stickerParams = new URLSearchParams({
                    sticker_code: emoji.value?.id || "",
                    author_th: emoji.value?.creator_name || "",
                    category: emoji.value?.category || "",
                    country: emoji.value?.country || "",
                }).toString();
                const authorStickerRes = await fetch(
                    `https://api.line2me.in.th/api/sticker-by-author?${stickerParams}`,
                    {
                        method: "GET",
                        headers: { "Content-Type": "application/json" },
                    }
                );
                if (authorStickerRes.ok)
                    authorStickerData.value = await authorStickerRes.json();
                authorStickerPending.value = false;

                // ธีมอื่นๆ ตามผู้สร้าง
                const themeParams = new URLSearchParams({
                    id: emoji.value?.id || "",
                    author: emoji.value?.creator_name || "",
                    category: emoji.value?.category || "",
                    country: emoji.value?.country || "",
                }).toString();
                const authorThemeRes = await fetch(
                    `https://api.line2me.in.th/api/theme-by-author?${themeParams}`,
                    {
                        method: "GET",
                        headers: { "Content-Type": "application/json" },
                    }
                );
                if (authorThemeRes.ok)
                    authorThemeData.value = await authorThemeRes.json();
                authorThemePending.value = false;

                // อิโมจิอื่นๆ ตามผู้สร้าง
                const emojiParams = new URLSearchParams({
                    id: emoji.value?.id || "",
                    creator_name: emoji.value?.creator_name || "",
                    category: emoji.value?.category || "",
                    country: emoji.value?.country || "",
                }).toString();
                const authorEmojiRes = await fetch(
                    `https://api.line2me.in.th/api/emoji-by-author?${emojiParams}`,
                    {
                        method: "GET",
                        headers: { "Content-Type": "application/json" },
                    }
                );
                if (authorEmojiRes.ok)
                    authorEmojiData.value = await authorEmojiRes.json();
                authorEmojiPending.value = false;
            }
        } catch (error) {
            console.error("API fetch error:", error);
        }
    });

    const getCategoryLink = () => {
        if (!emoji.value) return "#";
        return `/emojis?category=${emoji.value.category}`;
    };

    const getCategoryText = () => {
        if (!emoji.value) return "";
        if (emoji.value.category === "official") return "อิโมจิทางการ";
        if (emoji.value.category === "creator") return "อิโมจิครีเอเตอร์";
        return "หมวดหมู่ไม่ทราบ";
    };

    const getCountryText = () => {
        if (!emoji.value) return "";
        const countryMap = {
            th: "ประเทศไทย",
            jp: "ประเทศญี่ปุ่น",
            tw: "ประเทศไต้หวัน",
            id: "ประเทศอินโดนีเซีย",
        };
        return countryMap[emoji.value.country] || "ประเทศไม่ทราบ";
    };

    const getCountryLink = () => {
        if (!emoji.value) return "#";
        return `/emojis?country=${emoji.value.country}`;
    };

    const generateEmojiImageUrl = (emojiCode, imgOrder) => {
        const baseUrl =
            "https://stickershop.line-scdn.net/sticonshop/v1/sticon";
        return `${baseUrl}/${emojiCode}/iphone/${String(imgOrder).padStart(
            3,
            "0"
        )}.png`;
    };

    const emojiContainerRefs = ref([]);
    const hideImage = (index) => {
        const container = emojiContainerRefs.value[index - 1]; // หา `<div>` ที่ตรงกับ index
        if (container) {
            container.style.display = "none"; // ซ่อน `<div>` ที่ครอบอยู่
        }
    };

    //===== SEO =====/
    const { data: seo } = await useAsyncData(`fetchSeo-${id}`, async () => {
        const res = await fetch(
            `https://api.line2me.in.th/api/emoji-seo/${id}`
        );
        if (!res.ok) throw new Error("Failed to fetch SEO API");
        return res.json();
    });

    if (seo.value) {
        useHead({
            title: seo.value.title,
            meta: [
                { name: "description", content: seo.value.description },
                { name: "keywords", content: seo.value.keywords },
                { property: "og:title", content: seo.value.title },
                { property: "og:description", content: seo.value.description },
                { property: "og:image", content: seo.value.image },
                {
                    property: "og:url",
                    content: `https://line2me.in.th/emoji/${id}`,
                },
                { property: "og:type", content: "article" },
            ],
            link: [
                {
                    rel: "canonical",
                    href: process.client ? window.location.href : "",
                },
            ],
            script: [
                {
                    type: "application/ld+json",
                    children: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Product",
                        name: seo.value.title,
                        description: seo.value.description,
                        image: seo.value.image,
                        brand: {
                            "@type": "Brand",
                            name: "LINE Emojis",
                        },
                        offers: {
                            "@type": "Offer",
                            url: `https://line2me.in.th/emoji/${id}`,
                            price: emoji.value?.price || 0,
                            priceCurrency: "THB",
                            availability: "https://schema.org/InStock",
                        },
                    }),
                },
            ],
        });
    }
</script>
