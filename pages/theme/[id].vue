<template>
    <div class="mx-auto">
        <div v-if="theme && theme.theme_code">
            <div class="flex flex-wrap">
                <div
                    v-if="theme.status === 1"
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
                                    >หน้าแรก</NuxtLink
                                >
                                <span class="mx-2">/</span>
                            </li>
                            <li class="breadcrumb-item flex items-center">
                                <NuxtLink
                                    :to="getCategoryLink()"
                                    class="text-gray-500 hover:text-blue-600"
                                    >{{ getCategoryText() }}</NuxtLink
                                >
                                <span class="mx-2">/</span>
                            </li>
                            <li class="breadcrumb-item flex items-center">
                                <NuxtLink
                                    :to="getCountryLink()"
                                    class="text-gray-500 hover:text-blue-600"
                                    >{{ getCountryText() }}</NuxtLink
                                >
                                <span class="mx-2">/</span>
                            </li>
                            <li class="breadcrumb-item active text-gray-700">
                                <NuxtLink
                                    class="cursor-default"
                                    rel="nofollow"
                                    :href="`https://line.me/S/shop/theme/detail?id=${theme.theme_code}`"
                                    target="_blank"
                                >
                                    {{ theme.title }}
                                </NuxtLink>
                            </li>
                        </ol>
                    </nav>

                    <div class="flex items-start">
                        <!-- รูปภาพหลัก -->
                        <div class="relative mr-3">
                            <img
                                :src="theme.img_url"
                                :alt="theme.title"
                                class="w-32 sm:w-48 lg:w-56 xl:w-64 h-auto rounded"
                                loading="lazy"
                            />
                            <span
                                v-if="theme.is_new"
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
                                {{ theme.title }}
                            </h1>
                            <p class="hidden md:block text-gray-600 mb-2">
                                {{ theme.detail }}
                            </p>
                            <p class="mb-2">
                                <span class="font-bold">รหัสสินค้า:</span>
                                {{ theme.id }}
                            </p>
                            <p class="mb-2">
                                <span class="font-bold">ประเทศ:</span>
                                <span
                                    class="fflag ff-sm ml-1 mb-1"
                                    :class="
                                        'fflag-' + theme.country.toUpperCase()
                                    "
                                    :title="theme.country"
                                ></span>
                                {{ getCountryText() }}
                            </p>
                            <p class="text-lg mb-2 font-bold">
                                <span>ราคา: </span>
                                <span class="text-red-500">{{
                                    theme.price
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

                    <!-- ตัวอย่างธีม -->
                    <div class="mt-8">
                        <h2 class="text-2xl font-semibold mb-4">
                            ตัวอย่างธีม แตะเพื่อดูขนาดเต็ม
                        </h2>
                        <div id="gallery" class="grid grid-cols-2 gap-4">
                            <div
                                v-for="(x, index) in [2, 3, 4, 5]"
                                :key="x"
                                class="text-center overflow-hidden"
                            >
                                <NuxtLink
                                    :href="
                                        generateThemeUrlDetail(
                                            theme.theme_code,
                                            x,
                                            theme.section
                                        )
                                    "
                                    data-pswp-width="720"
                                    data-pswp-height="1232"
                                    :data-pswp-index="index"
                                >
                                    <img
                                        class="w-full h-auto rounded cursor-pointer"
                                        :src="
                                            generateThemeUrlDetail(
                                                theme.theme_code,
                                                x,
                                                theme.section
                                            )
                                        "
                                        :alt="`ธีมไลน์ ${theme.title}`"
                                        loading="lazy"
                                    />
                                </NuxtLink>
                            </div>
                        </div>

                        <hr class="mt-5 mb-5" />

                        <!-- โปรโมทสติกเกอร์ -->
                        <div
                            v-if="
                                promoteStickerData &&
                                promoteStickerData.length > 0
                            "
                        >
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
                        <p v-else-if="promoteStickerPending">Loading...</p>

                        <!-- ธีมตามผู้สร้าง -->
                        <!-- แสดงข้อมูลเมื่อโหลดเสร็จ -->
                        <div
                            v-if="authorThemeData && authorThemeData.length > 0"
                        >
                            <HeadingWithLine
                                text="ธีมอื่นๆที่น่าสนใจ"
                                color="text-rose-400"
                            />
                            <ThemeCard :themes="authorThemeData" />
                            <hr class="my-5" />
                        </div>
                        <p v-if="authorThemePending">กำลังโหลด...</p>

                        <!-- สติกเกอร์ตามผู้สร้าง -->
                        <div
                            v-if="
                                authorStickerData &&
                                authorStickerData.length > 0
                            "
                        >
                            <HeadingWithLine
                                text="สติกเกอร์อื่นๆที่น่าสนใจ"
                                color="text-sky-400"
                            />
                            <StickerCard :stickers="authorStickerData" />
                            <hr class="my-5" />
                        </div>
                        <p v-if="authorStickerPending">กำลังโหลด...</p>

                        <!-- อิโมจิตามผู้สร้าง -->
                        <!-- แสดงข้อมูลเมื่อโหลดเสร็จ -->
                        <div
                            v-if="authorEmojiData && authorEmojiData.length > 0"
                        >
                            <HeadingWithLine
                                text="อิโมจิอื่นๆที่น่าสนใจ"
                                color="text-teal-500"
                            />
                            <EmojiCard :emojis="authorEmojiData" />
                            <hr class="my-5" />
                        </div>
                        <p v-if="authorEmojiPending">กำลังโหลด...</p>
                    </div>
                </div>

                <!-- status = 0 ไม่มีขายแล้ว -->
                <NotAvailable
                    v-if="theme.status === 0"
                    :imgUrl="theme.img_url"
                    :title="theme.title"
                />

                <div
                    class="w-full lg:w-3/12 xl:w-4/12 border-l border-gray-200"
                >
                    <!-- เนื้อหาคอลัมน์ขวา -->
                </div>
            </div>
        </div>

        <p v-else-if="themePending">Loading...</p>
    </div>
</template>

<script setup>
    import { ref, onMounted } from "vue";
    import { useRoute } from "#app";
    import PhotoSwipeLightbox from "photoswipe/lightbox";
    import "photoswipe/style.css";

    // ดึงค่า route ID
    const route = useRoute();
    const id = route.params.id;

    // ตั้งค่า States
    const theme = ref(null);
    const promoteStickerData = ref(null);
    const authorStickerData = ref(null);
    const authorThemeData = ref(null);
    const authorEmojiData = ref(null);

    const themePending = ref(true);
    const promoteStickerPending = ref(true);
    const authorStickerPending = ref(true);
    const authorThemePending = ref(true);
    const authorEmojiPending = ref(true);

    //===== onMounted จะทำงานฝั่ง client ไม่เป็น SSR (Server Side Rendering) =====/
    onMounted(async () => {
        try {
            // 1. โหลดข้อมูลธีม
            const themeRes = await fetch(
                `https://api.line2me.in.th/api/theme-view/${id}`
            );
            if (themeRes.ok) theme.value = await themeRes.json();
            themePending.value = false;

            // 2. LOG Product View
            if (theme.value) {
                try {
                    const clientIp = await fetch("/api/get-client-ip")
                        .then((res) => res.json())
                        .then((data) => {
                            // ตรวจสอบและแยกเอา IP ตัวแรกจาก string ที่ได้
                            const firstIp = data.ip.split(",")[0].trim();
                            return firstIp;
                        })
                        .catch(() => "Unknown"); // Default IP เป็น Unknown
                    console.log(clientIp);

                    // สร้าง query parameters สำหรับการส่งข้อมูลแบบ GET
                    const queryParams = new URLSearchParams({
                        type: "theme",
                        id: theme.value.id,
                        ip_address: clientIp,
                    }).toString();

                    // ส่งคำขอ GET พร้อม query parameters
                    await fetch(
                        `https://api.line2me.in.th/api/record-product-view?${queryParams}`,
                        {
                            method: "GET",
                        }
                    );

                    console.log(
                        "Record Product View Successfully Sent (GET, no-cors)"
                    );
                } catch (error) {
                    console.error("Error sending record-product-view:", error);
                }
            }

            // 3. โหลด API อื่น ๆ ตามลำดับ
            if (theme.value) {
                // สติกเกอร์โปรโมท
                const promoteStickerRes = await fetch(
                    `https://api.line2me.in.th/api/promote-sticker`
                );
                if (promoteStickerRes.ok)
                    promoteStickerData.value = await promoteStickerRes.json();
                promoteStickerPending.value = false;

                // สติกเกอร์อื่นๆ ตามผู้สร้าง
                const stickerParams = new URLSearchParams({
                    sticker_code: theme.value?.id || "",
                    author_th: theme.value?.author || "",
                    category: theme.value?.category || "",
                    country: theme.value?.country || "",
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
                    id: theme.value?.id || "",
                    author: theme.value?.author || "",
                    category: theme.value?.category || "",
                    country: theme.value?.country || "",
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
                    id: theme.value?.id || "",
                    creator_name: theme.value?.author || "",
                    category: theme.value?.category || "",
                    country: theme.value?.country || "",
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

                // PhotoSwipe Lightbox
                initLightbox();
            }
        } catch (error) {
            console.error("API fetch error:", error);
        }
    });

    // ฟังก์ชันสร้าง URL ของหมวดหมู่
    const getCategoryLink = () => {
        if (!theme.value) return "#";
        return `/themes?category=${theme.value.category}`;
    };

    // ฟังก์ชันแสดงหมวดหมู่ของธีม
    const getCategoryText = () => {
        if (!theme.value) return "";
        if (theme.value.category === "official") return "ธีมทางการ";
        if (theme.value.category === "creator") return "ธีมครีเอเตอร์";
        return "หมวดหมู่ไม่ทราบ";
    };

    // ฟังก์ชันสร้าง URL ของประเทศ
    const getCountryLink = () => {
        if (!theme.value) return "#";
        return `/themes?country=${theme.value.country}`;
    };

    // ฟังก์ชันแสดงชื่อประเทศ
    const getCountryText = () => {
        if (!theme.value) return "";
        const countryMap = {
            th: "ประเทศไทย",
            jp: "ประเทศญี่ปุ่น",
            tw: "ประเทศไต้หวัน",
            id: "ประเทศอินโดนีเซีย",
        };
        return countryMap[theme.value.country] || "ประเทศไม่ทราบ";
    };

    // ฟังก์ชันสร้าง URL ของรูปภาพตัวอย่าง
    const generateThemeUrlDetail = (theme_code, imgOrder, section = 1) => {
        const baseUrl = "https://shop.line-scdn.net/themeshop/v1/products/";
        if (!theme_code) return "#";
        return `${baseUrl}${theme_code.slice(0, 2)}/${theme_code.slice(
            2,
            4
        )}/${theme_code.slice(
            4,
            6
        )}/${theme_code}/${section}/ANDROID/th/preview_00${imgOrder}_720x1232.png`;
    };

    //===== PhotoSwipe Lightbox =====/
    const initLightbox = () => {
        const lightbox = new PhotoSwipeLightbox({
            gallery: "#gallery",
            children: "a",
            pswpModule: () => import("photoswipe"),
        });
        lightbox.init();
    };

    //===== SEO เป็น Server Side Rendering ต้องใช้ useAsyncData =====/
    const { data: seo } = await useAsyncData(`fetchSeo-${id}`, async () => {
        const res = await fetch(
            `https://api.line2me.in.th/api/theme-seo/${id}`
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
                    content: `https://line2me.in.th/theme/${id}`,
                },
                { property: "og:type", content: "product" },
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
                            name: "LINE Themes",
                        },
                        offers: {
                            "@type": "Offer",
                            url: `https://line2me.in.th/theme/${id}`,
                            price: theme.value?.price || 0, // ราคาของธีม
                            priceCurrency: "THB", // สกุลเงิน
                            availability: "https://schema.org/InStock", // สถานะสินค้า
                        },
                    }),
                },
            ],
        });
    }
</script>
