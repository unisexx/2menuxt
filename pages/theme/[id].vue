<template>
    <div class="container mx-auto">
        <div v-if="theme && theme.theme_code">
            <div class="flex flex-wrap">
                <div class="w-full lg:w-9/12 xl:w-8/12 mx-auto">
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
                                <a
                                    class="cursor-default"
                                    rel="nofollow"
                                    :href="`https://line.me/S/shop/theme/detail?id=${theme.theme_code}`"
                                    target="_blank"
                                >
                                    {{ theme.title }}
                                </a>
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
                                <a
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
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
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

    // ตั้งค่า PhotoSwipe Lightbox
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
</script>
