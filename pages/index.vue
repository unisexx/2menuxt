<template>
    <div>
        <div
            class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-20"
        >
            <div
                class="absolute top-[-100px] left-0 -z-10 w-[300px] h-[300px] bg-gradient-to-tr from-green-400 to-blue-300 opacity-50 rounded-full"
                style="filter: blur(60px)"
            ></div>
            <div
                class="absolute top-[-50px] right-0 -z-10 w-[200px] h-[200px] bg-gradient-to-bl from-blue-500 to-green-300 opacity-40 rounded-full"
                style="filter: blur(50px)"
            ></div>

            <p
                class="mx-auto -mt-4 max-w-2xl text-lg tracking-tight text-slate-700 sm:mt-6"
            >
                ยินดีต้อนรับสู่
            </p>

            <h1
                class="mx-auto max-w-4xl font-display text-5xl tracking-tight text-slate-900 sm:text-7xl font-bold"
            >
                <span class="inline-block">
                    <span class="relative whitespace-nowrap text-green-600">
                        <svg
                            aria-hidden="true"
                            viewBox="0 0 418 42"
                            class="absolute top-2/3 left-0 h-[0.58em] w-full fill-orange-300/70"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"
                            ></path>
                        </svg>
                        <span class="relative">line2me</span>
                    </span>
                </span>
                <span class="inline-block ms-3">Stickers Store</span>
            </h1>

            <p
                class="mx-auto mt-9 max-w-2xl text-lg tracking-tight text-slate-700 sm:mt-6"
            >
                <span class="inline-block"
                    >ขายสติกเกอร์ไลน์ลิขสิทธิ์แท้ 100% จากร้านที่ได้รับอนุญาต
                    (Verified Resellers) พร้อมประสบการณ์กว่า 10 ปี
                </span>
            </p>

            <NuxtLink
                href="https://line.me/ti/p/~ratasak1234"
                target="_blank"
                class="mt-8 inline-block bg-blue-700 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full text-md transition duration-300 ease-in-out"
            >
                แอดไลน์ไอดี ratasak1234
            </NuxtLink>
        </div>

        <!-- โปรโมทสติกเกอร์ -->
        <div v-if="promoteStickerData">
            <HeadingWithLine text="สติกเกอร์ไลน์แนะนำ" color="text-green-500" />
            <StickerCard :stickers="promoteStickerData" :showPromote="true" />
        </div>
        <p v-else-if="promoteStickerPending">Loading...</p>
        <p v-else>Error loading promote-sticker data</p>
        <hr class="m-5" />

        <!-- สติกเกอร์ -->
        <div v-if="stickerData">
            <HeadingWithLine
                text="สติกเกอร์ไลน์อัพเดทประจำสัปดาห์"
                color="text-red-500"
            />
            <StickerCard :stickers="stickerData" />
            <SeeMoreButton
                href="stickers?page=1&country=&category=official&order=new"
            ></SeeMoreButton>
        </div>
        <p v-else-if="stickerPending">Loading...</p>
        <p v-else>Error loading sticker data</p>
        <hr class="m-5" />

        <!-- ธีม -->
        <div v-if="themeData">
            <HeadingWithLine
                text="ธีมไลน์อัพเดทประจำสัปดาห์"
                color="text-red-500"
            />
            <ThemeCard :themes="themeData" />
            <SeeMoreButton
                href="themes?page=1&country=&category=official&order=new"
            ></SeeMoreButton>
        </div>
        <p v-else-if="themePending">Loading...</p>
        <p v-else>Error loading theme data</p>
        <hr class="m-5" />

        <!-- อีโมจิ -->
        <div v-if="emojiData">
            <HeadingWithLine
                text="อีโมจิไลน์อัพเดทประจำสัปดาห์"
                color="text-red-500"
            />
            <EmojiCard :emojis="emojiData" />
            <SeeMoreButton
                href="emojis?page=1&country=&category=official&order=new"
            ></SeeMoreButton>
        </div>
        <p v-else-if="emojiPending">Loading...</p>
        <p v-else>Error loading emoji data</p>
        <hr class="m-5" />

        <!-- สติกเกอร์ทางการไทย -->
        <div v-if="officialThaiStickerData">
            <HeadingWithLine
                text="สติกเกอร์ไลน์ทางการไทย"
                color="text-sky-400"
            />
            <StickerCard :stickers="officialThaiStickerData" />
            <SeeMoreButton
                href="stickers?page=1&country=th&category=official&order=popular"
            ></SeeMoreButton>
        </div>
        <p v-else-if="officialThaiStickerPending">Loading...</p>
        <p v-else>Error loading sticker data</p>
        <hr class="m-5" />

        <!-- สติกเกอร์ทางการต่างประเทศ -->
        <div v-if="officialOverseaStickerData">
            <HeadingWithLine
                text="สติกเกอร์ไลน์ทางการต่างประเทศ"
                color="text-sky-400"
            />
            <StickerCard :stickers="officialOverseaStickerData" />
            <SeeMoreButton
                href="stickers?page=1&country=jp&category=official&order=popular"
            ></SeeMoreButton>
        </div>
        <p v-else-if="officialOverseaStickerPending">Loading...</p>
        <p v-else>Error loading sticker data</p>
        <hr class="m-5" />

        <!-- สติกเกอร์ครีเอเตอร์ไทย -->
        <div v-if="creatorThaiStickerData">
            <HeadingWithLine
                text="สติกเกอร์ไลน์ครีเอเตอร์ไทย"
                color="text-sky-400"
            />
            <StickerCard :stickers="creatorThaiStickerData" />
            <SeeMoreButton
                href="stickers?page=1&country=th&category=creator&order=popular"
            ></SeeMoreButton>
        </div>
        <p v-else-if="creatorThaiStickerPending">Loading...</p>
        <p v-else>Error loading sticker data</p>
        <hr class="m-5" />

        <!-- สติกเกอร์ครีเอเตอร์ไทยต่างประเทศ -->
        <div v-if="creatorOverseaStickerData">
            <HeadingWithLine
                text="สติกเกอร์ไลน์ครีเอเตอร์ต่างประเทศ"
                color="text-sky-400"
            />
            <StickerCard :stickers="creatorOverseaStickerData" />
            <SeeMoreButton
                href="stickers?page=1&country=jp&category=creator&order=popular"
            ></SeeMoreButton>
        </div>
        <p v-else-if="creatorOverseaStickerPending">Loading...</p>
        <p v-else>Error loading sticker data</p>
        <hr class="m-5" />

        <!-- ธีมทางการไทย -->
        <div v-if="officialThaiThemeData">
            <HeadingWithLine text="ธีมไลน์ทางการไทย" color="text-rose-400" />
            <ThemeCard :themes="officialThaiThemeData" />
            <SeeMoreButton
                href="themes?page=1&country=th&category=official&order=popular"
            ></SeeMoreButton>
        </div>
        <p v-else-if="officialThaiThemePending">Loading...</p>
        <p v-else>Error loading theme data</p>
        <hr class="m-5" />

        <!-- ธีมทางการต่างประเทศ -->
        <div v-if="officialOverseaThemeData">
            <HeadingWithLine
                text="ธีมไลน์ทางการต่างประเทศ"
                color="text-rose-400"
            />
            <ThemeCard :themes="officialOverseaThemeData" />
            <SeeMoreButton
                href="themes?page=1&country=jp&category=official&order=popular"
            ></SeeMoreButton>
        </div>
        <p v-else-if="officialOverseaThemePending">Loading...</p>
        <p v-else>Error loading theme data</p>
        <hr class="m-5" />

        <!-- ธีมครีเอเตอร์ไทย -->
        <div v-if="creatorThaiThemeData">
            <HeadingWithLine
                text="ธีมไลน์ครีเอเตอร์ไทย"
                color="text-rose-400"
            />
            <ThemeCard :themes="creatorThaiThemeData" />
            <SeeMoreButton
                href="themes?page=1&country=th&category=creator&order=popular"
            ></SeeMoreButton>
        </div>
        <p v-else-if="creatorThaiThemePending">Loading...</p>
        <p v-else>Error loading theme data</p>
        <hr class="m-5" />

        <!-- ธีมครีเอเตอร์ต่างประเทศ -->
        <div v-if="creatorOverseaThemeData">
            <HeadingWithLine
                text="ธีมไลน์ครีเอเตอร์ต่างประเทศ"
                color="text-rose-400"
            />
            <ThemeCard :themes="creatorOverseaThemeData" />
            <SeeMoreButton
                href="themes?page=1&country=jp&category=creator&order=popular"
            ></SeeMoreButton>
        </div>
        <p v-else-if="creatorOverseaThemePending">Loading...</p>
        <p v-else>Error loading theme data</p>
        <hr class="m-5" />

        <!-- อิโมจิทางการไทย -->
        <div v-if="officialThaiEmojiData">
            <HeadingWithLine text="อิโมจิไลน์ทางการไทย" color="text-teal-500" />
            <EmojiCard :emojis="officialThaiEmojiData" />
            <SeeMoreButton
                href="emojis?page=1&country=th&category=official&order=popular"
            ></SeeMoreButton>
        </div>
        <p v-else-if="officialThaiEmojiPending">Loading...</p>
        <p v-else>Error loading emoji data</p>
        <hr class="m-5" />

        <!-- อิโมจิทางการต่างประเทศ -->
        <div v-if="officialOverseaEmojiData">
            <HeadingWithLine
                text="อิโมจิไลน์ทางการต่างประเทศ"
                color="text-teal-500"
            />
            <EmojiCard :emojis="officialOverseaEmojiData" />
            <SeeMoreButton
                href="emojis?page=1&country=jp&category=official&order=popular"
            ></SeeMoreButton>
        </div>
        <p v-else-if="officialOverseaEmojiPending">Loading...</p>
        <p v-else>Error loading emoji data</p>
        <hr class="m-5" />

        <!-- อิโมจิครีเอเตอร์ไทย -->
        <div v-if="creatorThaiEmojiData">
            <HeadingWithLine
                text="อิโมจิไลน์ครีเอเตอร์ไทย"
                color="text-teal-500"
            />
            <EmojiCard :emojis="creatorThaiEmojiData" />
            <SeeMoreButton
                href="emojis?page=1&country=th&category=creator&order=popular"
            ></SeeMoreButton>
        </div>
        <p v-else-if="creatorThaiEmojiPending">Loading...</p>
        <p v-else>Error loading emoji data</p>
        <hr class="m-5" />

        <!-- อิโมจิครีเอเตอร์ต่างประเทศ -->
        <div v-if="creatorOverseaEmojiData">
            <HeadingWithLine
                text="อิโมจิไลน์ครีเอเตอร์ต่างประเทศ"
                color="text-teal-500"
            />
            <EmojiCard :emojis="creatorOverseaEmojiData" />
            <SeeMoreButton
                href="emojis?page=1&country=jp&category=creator&order=popular"
            ></SeeMoreButton>
        </div>
        <p v-else-if="creatorOverseaEmojiPending">Loading...</p>
        <p v-else>Error loading emoji data</p>
        <hr class="m-5" />
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

    // สติกเกอร์โปรโมท API
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

    // สติกเกอร์ทางการไทย API
    const {
        data: officialThaiStickerData,
        error: officialThaiStickerError,
        pending: officialThaiStickerPending,
    } = await useAsyncData(`fetchOfficialThaiSticker-${id}`, async () => {
        const res = await fetch(
            `https://api.line2me.in.th/api/sticker-official-thai`
        );
        if (!res.ok)
            throw new Error("Failed to fetch sticker-official-thai API");
        return res.json();
    });

    // สติกเกอร์ทางการต่างประเทศ API
    const {
        data: officialOverseaStickerData,
        error: officialOverseaStickerError,
        pending: officialOverseaStickerPending,
    } = await useAsyncData(`fetchOfficialOverseaSticker-${id}`, async () => {
        const res = await fetch(
            `https://api.line2me.in.th/api/sticker-official-oversea`
        );
        if (!res.ok)
            throw new Error("Failed to fetch sticker-official-oversea API");
        return res.json();
    });

    // สติกเกอร์ครีเอเตอร์ไทย API
    const {
        data: creatorThaiStickerData,
        error: creatorThaiStickerError,
        pending: creatorThaiStickerPending,
    } = await useAsyncData(`fetchCreatorThaiSticker-${id}`, async () => {
        const res = await fetch(
            `https://api.line2me.in.th/api/sticker-creator-thai`
        );
        if (!res.ok)
            throw new Error("Failed to fetch sticker-creator-thai API");
        return res.json();
    });

    // สติกเกอร์ครีเอเตอร์ต่างประเทศ API
    const {
        data: creatorOverseaStickerData,
        error: creatorOverseaStickerError,
        pending: creatorOverseaStickerPending,
    } = await useAsyncData(`fetchCreatorOverseaSticker-${id}`, async () => {
        const res = await fetch(
            `https://api.line2me.in.th/api/sticker-creator-oversea`
        );
        if (!res.ok)
            throw new Error("Failed to fetch sticker-creator-oversea API");
        return res.json();
    });

    // ธีมทางการไทย API
    const {
        data: officialThaiThemeData,
        error: officialThaiThemeError,
        pending: officialThaiThemePending,
    } = await useAsyncData(`fetchOfficialThaiTheme-${id}`, async () => {
        const res = await fetch(
            `https://api.line2me.in.th/api/theme-official-thai`
        );
        if (!res.ok) throw new Error("Failed to fetch theme-official-thai API");
        return res.json();
    });

    // ธีมทางการต่างประเทศ API
    const {
        data: officialOverseaThemeData,
        error: officialOverseaThemeError,
        pending: officialOverseaThemePending,
    } = await useAsyncData(`fetchOfficialOverseaTheme-${id}`, async () => {
        const res = await fetch(
            `https://api.line2me.in.th/api/theme-official-oversea`
        );
        if (!res.ok)
            throw new Error("Failed to fetch theme-official-oversea API");
        return res.json();
    });

    // ธีมครีเอเตอร์ไทย API
    const {
        data: creatorThaiThemeData,
        error: creatorThaiThemeError,
        pending: creatorThaiThemePending,
    } = await useAsyncData(`fetchCreatorThaiTheme-${id}`, async () => {
        const res = await fetch(
            `https://api.line2me.in.th/api/theme-creator-thai`
        );
        if (!res.ok) throw new Error("Failed to fetch theme-creator-thai API");
        return res.json();
    });

    // ธีมครีเอเตอร์ต่างประเทศ API
    const {
        data: creatorOverseaThemeData,
        error: creatorOverseaThemeError,
        pending: creatorOverseaThemePending,
    } = await useAsyncData(`fetchCreatorOverseaTheme-${id}`, async () => {
        const res = await fetch(
            `https://api.line2me.in.th/api/theme-creator-oversea`
        );
        if (!res.ok)
            throw new Error("Failed to fetch theme-creator-oversea API");
        return res.json();
    });

    // อิโมจิทางการไทย API
    const {
        data: officialThaiEmojiData,
        error: officialThaiEmojiError,
        pending: officialThaiEmojiPending,
    } = await useAsyncData(`fetchOfficialThaiEmoji-${id}`, async () => {
        const res = await fetch(
            `https://api.line2me.in.th/api/emoji-official-thai`
        );
        if (!res.ok) throw new Error("Failed to fetch emoji-official-thai API");
        return res.json();
    });

    // อิโมจิการต่างประเทศ API
    const {
        data: officialOverseaEmojiData,
        error: officialOverseaEmojiError,
        pending: officialOverseaEmojiPending,
    } = await useAsyncData(`fetchOfficialOverseaEmoji-${id}`, async () => {
        const res = await fetch(
            `https://api.line2me.in.th/api/emoji-official-oversea`
        );
        if (!res.ok)
            throw new Error("Failed to fetch emoji-official-oversea API");
        return res.json();
    });

    // อิโมจิครีเอเตอร์ไทย API
    const {
        data: creatorThaiEmojiData,
        error: creatorThaiEmojiError,
        pending: creatorThaiEmojiPending,
    } = await useAsyncData(`fetchCreatorThaiEmoji-${id}`, async () => {
        const res = await fetch(
            `https://api.line2me.in.th/api/emoji-creator-thai`
        );
        if (!res.ok) throw new Error("Failed to fetch emoji-creator-thai API");
        return res.json();
    });

    // อิโมจิครีเอเตอร์ต่างประเทศ API
    const {
        data: creatorOverseaEmojiData,
        error: creatorOverseaEmojiError,
        pending: creatorOverseaEmojiPending,
    } = await useAsyncData(`fetchCreatorOverseaEmoji-${id}`, async () => {
        const res = await fetch(
            `https://api.line2me.in.th/api/emoji-creator-oversea`
        );
        if (!res.ok)
            throw new Error("Failed to fetch emoji-creator-oversea API");
        return res.json();
    });
</script>
