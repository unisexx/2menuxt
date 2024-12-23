<template>
    <div class="mx-auto">
        <div v-if="sticker">
            <div class="flex flex-wrap">
                <div
                    v-if="sticker.status === 1"
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
                                    :href="`https://line.me/S/sticker/${sticker.sticker_code}`"
                                    target="_blank"
                                >
                                    {{ sticker.title_th }}
                                </NuxtLink>
                            </li>
                        </ol>
                    </nav>

                    <!-- ตัวอย่างสติกเกอร์ -->
                    <div class="flex items-start">
                        <!-- รูปภาพหลัก -->
                        <div class="relative mr-3">
                            <img
                                :src="sticker.img_url"
                                :alt="sticker.title"
                                class="w-32 sm:w-48 lg:w-56 xl:w-64 h-auto autoLoopSticker"
                                :data-animation="sticker.img_url"
                                loading="lazy"
                            />
                            <!-- เงื่อนไขแสดงเสียง -->
                            <audio
                                v-if="
                                    [
                                        'SOUND',
                                        'POPUP_SOUND',
                                        'ANIMATION_SOUND',
                                    ].includes(sticker.stickerresourcetype)
                                "
                                id="mainAudio"
                                autoplay
                                preload="metadata"
                                style="display: none"
                            >
                                <source
                                    :src="`https://sdl-stickershop.line.naver.jp/stickershop/v1/product/${sticker.sticker_code}/IOS/main_sound.m4a`"
                                    type="audio/mpeg"
                                />
                            </audio>

                            <span
                                v-if="sticker.is_new"
                                class="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-1 rounded custom-font-size"
                            >
                                NEW
                            </span>
                        </div>

                        <!-- ข้อมูลข้อความ -->
                        <div class="flex-1">
                            <h1
                                class="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 flex flex-wrap items-center gap-2"
                            >
                                {{ sticker.title_th }}
                                <span
                                    v-if="
                                        getStickerResourceTypeText(
                                            sticker.stickerresourcetype
                                        )
                                    "
                                    class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded border border-blue-400 flex-shrink-0"
                                >
                                    {{
                                        getStickerResourceTypeText(
                                            sticker.stickerresourcetype
                                        )
                                    }}
                                </span>
                            </h1>

                            <p class="hidden md:block text-gray-600 mb-2">
                                {{ sticker.detail }}
                            </p>
                            <p class="mb-2">
                                <span class="font-bold"> รหัสสินค้า:</span>
                                S-{{ sticker.sticker_code }}
                            </p>
                            <p class="mb-2">
                                <span class="font-bold">ประเทศ:</span>
                                <span
                                    class="fflag ff-sm ml-1 mb-1"
                                    :class="`fflag-${sticker.country.toUpperCase()}`"
                                    :title="sticker.country"
                                ></span>
                                {{ getCountryText() }}
                            </p>
                            <p class="text-lg mb-2 font-bold">
                                <span>Price: </span>
                                <span class="text-red-500">{{
                                    sticker.price
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

                    <!-- ตัวอย่างสติกเกอร์ในชุด -->
                    <div class="mt-4">
                        <h2 class="text-2xl font-semibold mb-4">
                            <span
                                v-if="
                                    getStickerResourceTypeTextDetail(
                                        sticker.stickerresourcetype
                                    )
                                "
                                >{{
                                    getStickerResourceTypeTextDetail(
                                        sticker.stickerresourcetype
                                    )
                                }}</span
                            >
                        </h2>

                        <!-- หากไม่มีข้อมูล -->
                        <div
                            v-if="!sticker.stamp || sticker.stamp.length === 0"
                            class="text-center text-gray-500"
                        >
                            <img
                                :src="`https://sdl-stickershop.line.naver.jp/products/0/0/${sticker.version}/${sticker.sticker_code}/LINEStorePC/preview.png`"
                                :alt="`สติ๊กเกอร์ไลน์ ${sticker.title_th}`"
                                class="w-full object-contain"
                            />
                        </div>

                        <!-- หากมีข้อมูล -->
                        <div v-else class="grid grid-cols-4 gap-2">
                            <div
                                v-for="stamp in sticker.stamp"
                                :key="stamp"
                                class="flex justify-center items-center"
                            >
                                <img
                                    :src="getStickerUrl(stamp)"
                                    :alt="`สติกเกอร์ ${stamp}`"
                                    class="stampImg w-auto object-contain"
                                    :data-animation="getAnimationUrl(stamp)"
                                    @click="changeToAnimation"
                                    loading="lazy"
                                />
                                <audio
                                    v-if="
                                        [
                                            'SOUND',
                                            'POPUP_SOUND',
                                            'ANIMATION_SOUND',
                                        ].includes(sticker.stickerresourcetype)
                                    "
                                    preload="metadata"
                                    style="display: none"
                                >
                                    <source
                                        :src="`https://sdl-stickershop.line.naver.jp/products/0/0/${sticker.version}/${sticker.sticker_code}/android/sound/${stamp}.m4a`"
                                        type="audio/mpeg"
                                    />
                                </audio>
                            </div>
                        </div>
                    </div>

                    <hr class="mt-5 mb-5" />

                    <!-- โปรโมทสติกเกอร์ -->
                    <div
                        v-if="
                            promoteStickerData && promoteStickerData.length > 0
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
                    v-if="sticker.status === 0"
                    :imgUrl="sticker.img_url"
                    :title="sticker.title_th"
                />

                <div
                    class="w-full lg:w-3/12 xl:w-4/12 border-l border-gray-200"
                >
                    <!-- เนื้อหาคอลัมน์ขวา -->
                </div>
            </div>
        </div>

        <p v-else-if="stickerPending">Loading...</p>
    </div>
</template>

<script setup>
    import { ref, onMounted } from "vue";
    import { useRoute } from "#app";

    // ดึงค่า route ID
    const route = useRoute();
    const id = route.params.id;

    // ตั้งค่า States
    const sticker = ref(null);
    const promoteStickerData = ref(null);
    const authorStickerData = ref(null);
    const authorThemeData = ref(null);
    const authorEmojiData = ref(null);

    // const stickerPending = ref(true);
    // const promoteStickerPending = ref(true);
    // const authorStickerPending = ref(true);
    // const authorThemePending = ref(true);
    // const authorEmojiPending = ref(true);

    const stickerPending = ref(false);
    const promoteStickerPending = ref(false);
    const authorStickerPending = ref(false);
    const authorThemePending = ref(false);
    const authorEmojiPending = ref(false);

    //===== onMounted จะทำงานฝั่ง client ไม่เป็น SSR (Server Side Rendering) =====/
    onMounted(async () => {
        try {
            // 1. โหลดข้อมูลสติกเกอร์
            const stickerRes = await fetch(
                `https://api.line2me.in.th/api/sticker-view/${id}`
            );
            if (stickerRes.ok) sticker.value = await stickerRes.json();
            stickerPending.value = false;

            // 2. LOG Product View
            if (sticker.value) {
                try {
                    // ดึง IP ของ client
                    const clientIp = await fetch("/api/get-client-ip")
                        .then((res) => res.json())
                        .then((data) => data.ip) // รับค่า IP ตรง ๆ โดยไม่ต้องแยก
                        .catch(() => "Unknown"); // Default IP เป็น Unknown

                    // สร้าง payload สำหรับการส่งข้อมูลแบบ POST
                    const payload = {
                        type: "sticker",
                        id: sticker.value.id,
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
            if (sticker.value) {
                // สติกเกอร์โปรโมท
                const promoteStickerRes = await fetch(
                    `https://api.line2me.in.th/api/promote-sticker`
                );
                if (promoteStickerRes.ok)
                    promoteStickerData.value = await promoteStickerRes.json();
                promoteStickerPending.value = false;

                // สติกเกอร์อื่นๆ ตามผู้สร้าง
                const stickerParams = new URLSearchParams({
                    sticker_code: sticker.value?.sticker_code || "",
                    author_th: sticker.value?.author_th || "",
                    category: sticker.value?.category || "",
                    country: sticker.value?.country || "",
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
                    id: sticker.value?.sticker_code || "",
                    author: sticker.value?.author_th || "",
                    category: sticker.value?.category || "",
                    country: sticker.value?.country || "",
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
                    id: sticker.value?.sticker_code || "",
                    creator_name: sticker.value?.author_th || "",
                    category: sticker.value?.category || "",
                    country: sticker.value?.country || "",
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
        if (!sticker.value) return "#";
        return `/stickers?category=${sticker.value.category}`;
    };

    const getCategoryText = () => {
        if (!sticker.value) return "";
        if (sticker.value.category === "official") return "สติกเกอร์ทางการ";
        if (sticker.value.category === "creator") return "ครีเอเตอร์สติกเกอร์";
        return "หมวดหมู่ไม่ทราบ";
    };

    const getCountryLink = () => {
        if (!sticker.value) return "#";
        return `/stickers?country=${sticker.value.country}`;
    };

    const getCountryText = () => {
        if (!sticker.value) return "";
        const countryMap = {
            th: "ประเทศไทย",
            jp: "ประเทศญี่ปุ่น",
            tw: "ประเทศไต้หวัน",
            id: "ประเทศอินโดนีเซีย",
        };
        return countryMap[sticker.value.country] || "ประเทศไม่ทราบ";
    };

    const getStickerResourceTypeText = (type) => {
        const resourceTypeMap = {
            ANIMATION: "สติกเกอร์เคลื่อนไหว",
            ANIMATION_SOUND: "สติกเกอร์เคลื่อนไหว+มีเสียง",
            SOUND: "สติกเกอร์มีเสียง",
            POPUP: "สติกเกอร์ป๊อปอัพ",
            POPUP_SOUND: "สติกเกอร์ป๊อปอัพ + มีเสียง",
            NAME_TEXT: "สติกเกอร์เติมคำ",
            PER_STICKER_TEXT: "สติกเกอร์ข้อความ",
        };
        return resourceTypeMap[type] || "";
    };

    const getStickerResourceTypeTextDetail = (type) => {
        const resourceTypeMap = {
            ANIMATION: "คลิกสติกเกอร์เพื่อดูรูปเคลื่อนไหว",
            ANIMATION_SOUND: "คลิกสติกเกอร์เพื่อฟังเสียง",
            SOUND: "คลิกสติกเกอร์เพื่อฟังเสียง",
            POPUP: "คลิกสติกเกอร์เพื่อดูรายละเอียด",
            POPUP_SOUND: "คลิกสติกเกอร์เพื่อฟังเสียง",
        };

        return resourceTypeMap[type] || "ตัวอย่างสติกเกอร์ในชุด"; // คืนค่าเป็น "" หากไม่มีใน map
    };

    const getStickerUrl = (stamp) => {
        return `https://stickershop.line-scdn.net/stickershop/v1/sticker/${stamp}/android/sticker.png;compress=true`;
    };

    const getAnimationUrl = (stamp) => {
        const type = sticker.value?.stickerresourcetype || "";

        if (
            ["SOUND", "STATIC", "NAME_TEXT", "PER_STICKER_TEXT"].includes(type)
        ) {
            return `https://stickershop.line-scdn.net/stickershop/v1/sticker/${stamp}/android/sticker.png;compress=true`;
        } else if (["POPUP", "POPUP_SOUND"].includes(type)) {
            return `https://stickershop.line-scdn.net/stickershop/v1/sticker/${stamp}/IOS/sticker_popup.png;compress=true`;
        } else {
            return `https://stickershop.line-scdn.net/stickershop/v1/sticker/${stamp}/IOS/sticker_animation@2x.png;compress=true`;
        }
    };

    const changeToAnimation = (event) => {
        const target = event.target;
        const animationSrc = target.getAttribute("data-animation");
        if (animationSrc) {
            target.src = animationSrc;
        }

        const parentDiv = target.closest("div");
        const audioElement = parentDiv.querySelector("audio");

        if (audioElement) {
            audioElement.play();
        }
    };

    //===== SEO เป็น Server Side Rendering ต้องใช้ useAsyncData =====/
    const { data: seo } = await useAsyncData(`fetchSeo-${id}`, async () => {
        const res = await fetch(
            `https://api.line2me.in.th/api/sticker-seo/${id}`
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
                    content: `https://line2me.in.th/sticker/${id}`,
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
                            name: "LINE Stickers",
                        },
                        offers: {
                            "@type": "Offer",
                            url: `https://line2me.in.th/sticker/${id}`,
                            price: sticker.value?.price || 0,
                            priceCurrency: "THB",
                            availability: "https://schema.org/InStock",
                        },
                    }),
                },
            ],
        });
    }
</script>
