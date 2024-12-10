<template>
    <div class="container mx-auto">
        <div v-if="theme && theme.theme_code">
            <div class="flex flex-wrap">
                <div
                    v-if="theme.status === 1"
                    class="w-full lg:w-9/12 xl:w-8/12 mx-auto"
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
                        <div v-if="promoteStickerData">
                            <HeadingWithLine
                                text="สติกเกอร์แนะนำ"
                                color="text-green-500"
                            />
                            <StickerCard
                                :stickers="promoteStickerData"
                                :showPromote="true"
                            />
                        </div>
                        <p v-else-if="promoteStickerPending">Loading...</p>
                        <p v-else>Error loading promote-sticker data</p>

                        <!-- ธีมตามผู้สร้าง -->
                        <!-- แสดงข้อมูลเมื่อโหลดเสร็จ -->
                        <div
                            v-if="authorThemeData && authorThemeData.length > 0"
                        >
                            <HeadingWithLine
                                text="ธีมอื่นๆที่น่าสนใจ"
                                color="text-rose-400"
                            />
                            <ThemeCard
                                :themes="authorThemeData"
                                customClass="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-2 md:gap-4 mt-6"
                            />
                        </div>
                        <p v-if="authorThemePending">กำลังโหลด...</p>
                        <p v-if="authorThemeError">
                            เกิดข้อผิดพลาด: {{ authorThemeError.message }}
                        </p>

                        <!-- สติกเกอร์ตามผู้สร้าง -->
                        <!-- แสดงข้อมูลเมื่อโหลดเสร็จ -->
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
                            <StickerCard
                                :stickers="authorStickerData"
                                customClass="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-2 md:gap-4 mt-6"
                            />
                        </div>
                        <p v-if="pending">กำลังโหลด...</p>
                        <p v-if="error">เกิดข้อผิดพลาด: {{ error.message }}</p>

                        <!-- อิโมจิตามผู้สร้าง -->
                        <!-- แสดงข้อมูลเมื่อโหลดเสร็จ -->
                        <div
                            v-if="authorEmojiData && authorEmojiData.length > 0"
                        >
                            <HeadingWithLine
                                text="อิโมจิอื่นๆที่น่าสนใจ"
                                color="text-teal-500"
                            />
                            <EmojiCard
                                :emojis="authorEmojiData"
                                customClass="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-2 md:gap-4 mt-6"
                            />
                        </div>
                        <p v-if="authorEmojiPending">กำลังโหลด...</p>
                        <p v-if="authorEmojiError">
                            เกิดข้อผิดพลาด: {{ authorEmojiError.message }}
                        </p>
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

        <p v-else-if="pending">Loading...</p>
        <p v-else class="text-red-500">ไม่พบข้อมูลธีม หรือ API มีปัญหา</p>
    </div>
</template>

<script setup>
    import { useRoute } from "#app";
    import PhotoSwipeLightbox from "photoswipe/lightbox";
    import "photoswipe/style.css";

    // ดึงค่า route ID
    const route = useRoute();
    const id = route.params.id;

    // ดึงข้อมูลธีมจาก API
    const {
        data: theme,
        error,
        pending,
    } = await useAsyncData(`fetchTheme-${id}`, async () => {
        const res = await fetch(
            `https://api.line2me.in.th/api/theme-view/${id}`
        );
        if (!res.ok) throw new Error("Failed to fetch API");
        return res.json();
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

    // เรียกใช้ Lightbox เมื่อ component mount
    onMounted(() => {
        initLightbox();
    });

    //===== สติกเกอร์โปรโมท API =====/
    const {
        data: promoteStickerData,
        error: promoteStickerError,
        pending: promoteStickerPending,
    } = await useAsyncData(`fetchPromoteSticker-${id}`, async () => {
        const res = await fetch(
            `https://api.line2me.in.th/api/promote-sticker`
        );
        if (!res.ok) throw new Error("Failed to fetch promote-sticker API");
        return res.json();
    });

    //===== ธีมอื่นๆตามผู้สร้าง =====/
    const {
        data: authorThemeData,
        pending: authorThemePending,
        error: authorThemeError,
    } = useAsyncData("authorTheme", () =>
        $fetch(`https://api.line2me.in.th/api/theme-by-author`, {
            params: {
                id: theme.value?.id || "",
                author: theme.value?.author || "",
                category: theme.value?.category || "",
                country: theme.value?.country || "",
            },
        })
    );

    //===== สติกเกอร์อื่นๆตามผู้สร้าง =====/
    const {
        data: authorStickerData,
        pending: authorStickerPending,
        error: authorStickerError,
    } = useAsyncData("authorSticker", () => {
        const apiUrl = `https://api.line2me.in.th/api/sticker-by-author`;
        const params = {
            sticker_code: theme.value?.id || "",
            author_th: theme.value?.author || "",
            category: theme.value?.category || "",
            country: theme.value?.country || "",
        };
        return $fetch(apiUrl, { params });
    });

    //===== อิโมจิอื่นๆตามผู้สร้าง =====/
    const {
        data: authorEmojiData,
        pending: authorEmojiPending,
        error: authorEmojiError,
    } = useAsyncData("authorEmoji", () =>
        $fetch(`https://api.line2me.in.th/api/emoji-by-author`, {
            params: {
                id: theme.value?.id || "",
                creator_name: theme.value?.author || "",
                category: theme.value?.category || "",
                country: theme.value?.country || "",
            },
        })
    );

    //===== LOG Product View =====/
    // ฟังก์ชันส่งข้อมูลไปยัง API
    const sendRecordProductView = async (type, id) => {
        try {
            const clientIp = await $fetch("/api/get-client-ip")
                .then((res) => res.ip)
                .catch(() => "Unknown"); // Default to 'Unknown' if IP fetch fails

            await $fetch("https://api.line2me.in.th/api/record-product-view", {
                method: "POST",
                body: {
                    type,
                    id,
                    ip_address: clientIp, // IP address from client
                },
            });

            console.log("Record Product View Successfully Sent");
        } catch (error) {
            console.error("Error sending record-product-view:", error);
        }
    };

    // Trigger sendRecordProductView after everything is loaded
    onMounted(() => {
        if (!pending.value && !error.value) {
            sendRecordProductView("theme", id);
        }
    });

    //===== SEO =====/
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
