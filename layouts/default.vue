<template>
    <div class="flex flex-col min-h-screen">
        <!-- Navbar -->
        <nav class="bg-white border-b fixed top-0 left-0 w-full z-50 shadow-sm">
            <div class="mx-auto px-4 flex items-center justify-between py-4">
                <NuxtLink
                    to="/"
                    class="text-3xl font-bold tracking-wide relative"
                >
                    <!-- ข้อความ LINE -->
                    <span
                        class="text-green-500"
                        style="font-family: 'Arial', sans-serif"
                    >
                        LINE
                    </span>
                    <!-- ข้อความ 2me -->
                    <span class="text-gray-800">2me</span>
                    <!-- ข้อความเสริม -->
                    <span
                        class="absolute text-sm text-gray-500 italic top-6 left-1"
                    >
                        สติกเกอร์ไลน์ส่งไว
                    </span>
                </NuxtLink>
            </div>
        </nav>

        <!-- Main Layout -->
        <div class="flex flex-1 mt-[4rem] relative">
            <!-- Mobile Layout -->
            <div class="lg:hidden">
                <!-- Floating Button -->
                <button
                    class="fixed top-3 right-4 bg-blue-700 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none flex items-center justify-center z-50"
                    @click="toggleAside"
                >
                    <span
                        v-if="isCollapsed"
                        class="material-symbols-outlined text-2xl"
                    >
                        menu
                    </span>
                    <span v-else class="material-symbols-outlined text-2xl">
                        close
                    </span>
                </button>

                <!-- Aside Menu -->
                <aside
                    :class="{
                        '-translate-x-full': isCollapsed,
                        'translate-x-0': !isCollapsed,
                    }"
                    class="border-r h-screen fixed top-[4rem] transition-transform duration-300 w-64 z-40 bg-white"
                >
                    <!-- เมนูรายการ -->
                    <ul class="p-4">
                        <li v-for="menu in menus" :key="menu.to">
                            <NuxtLink
                                v-if="menu.to"
                                :to="menu.to"
                                :class="[
                                    {
                                        'menu-item flex items-center py-2 px-4 rounded-lg transition-all duration-300': true,
                                        'bg-blue-700 text-white shadow-md':
                                            isActive(
                                                menu.to
                                            ) /* Active Menu Style */,
                                        'hover:bg-blue-100 hover:text-blue-700':
                                            !isActive(
                                                menu.to
                                            ) /* Hover Style */,
                                    },
                                ]"
                                @click="closeAside"
                            >
                                <span
                                    v-if="menu.icon"
                                    class="material-symbols-outlined text-lg"
                                    >{{ menu.icon }}</span
                                >
                                <span class="ml-2 font-medium">{{
                                    menu.label
                                }}</span>
                            </NuxtLink>

                            <hr v-else-if="menu.separator" />
                        </li>
                    </ul>
                </aside>
                <!-- Main Content -->
                <main class="flex-1 p-3 transition-all duration-300">
                    <NuxtPage />
                </main>
            </div>

            <!-- Desktop Layout -->
            <div class="hidden lg:flex">
                <!-- Aside Menu -->
                <aside
                    class="border-r h-screen w-64 bg-white fixed top-[4rem] left-0 z-40"
                >
                    <ul class="p-4">
                        <li v-for="menu in menus" :key="menu.to">
                            <NuxtLink
                                v-if="menu.to"
                                :to="menu.to"
                                :class="[
                                    {
                                        'menu-item flex items-center py-2 px-4 rounded-lg transition-all duration-300': true,
                                        'bg-blue-700 text-white shadow-md':
                                            isActive(
                                                menu.to
                                            ) /* Active Menu Style */,
                                        'hover:bg-blue-100 hover:text-blue-700':
                                            !isActive(
                                                menu.to
                                            ) /* Hover Style */,
                                    },
                                ]"
                                @click="closeAside"
                            >
                                <span
                                    v-if="menu.icon"
                                    class="material-symbols-outlined text-lg"
                                    >{{ menu.icon }}</span
                                >
                                <span class="ml-2 font-medium">{{
                                    menu.label
                                }}</span>
                            </NuxtLink>

                            <hr v-else-if="menu.separator" />
                        </li>
                    </ul>
                </aside>
                <!-- Main Content -->
                <main class="flex-1 p-3 ml-64">
                    <NuxtPage />
                </main>
            </div>
        </div>

        <!-- Footer -->
        <footer class="bg-gray-800 text-white py-4">
            <div class="container mx-auto text-center">
                <p>
                    &copy; 2024 line2me ร้านขายสติกเกอร์ไลน์. All rights
                    reserved.
                </p>
            </div>
        </footer>
    </div>
</template>

<script>
    export default {
        name: "Layout",
        data() {
            return {
                isCollapsed: true, // ค่าเริ่มต้น: ซ่อนเมนูใน Mobile Layout
                menus: [
                    { to: "/", label: "หน้าแรก", icon: "home" },
                    { separator: true },
                    {
                        to: "/stickers",
                        label: "สติกเกอร์ไลน์",
                        icon: "rocket_launch", // ไอคอนสำหรับสติกเกอร์
                    },
                    { separator: true },
                    {
                        to: "/themes",
                        label: "ธีมไลน์",
                        icon: "palette", // ไอคอนสำหรับธีม
                    },
                    { separator: true },
                    {
                        to: "/emojis",
                        label: "อิโมจิไลน์",
                        icon: "emoji_emotions", // ไอคอนสำหรับอิโมจิ
                    },
                ],
                screenIsLarge: false, // ตั้งค่าเริ่มต้นสำหรับ SSR
            };
        },
        mounted() {
            if (process.client) {
                this.setDefaultAsideState();
                window.addEventListener("resize", this.setDefaultAsideState);
            }
        },
        beforeDestroy() {
            if (process.client) {
                window.removeEventListener("resize", this.setDefaultAsideState);
            }
        },
        methods: {
            toggleAside() {
                this.isCollapsed = !this.isCollapsed;
            },
            closeAside() {
                // ปิดเมนู Mobile Layout
                this.isCollapsed = true;
            },
            setDefaultAsideState() {
                if (process.client) {
                    const screenWidth = window.innerWidth;
                    this.screenIsLarge = screenWidth >= 1024;
                    this.isCollapsed = !this.screenIsLarge; // ซ่อนเมนูหากเป็น Mobile Layout
                }
            },
            isActive(link) {
                const currentPath = this.$route.path.split("/")[1] || ""; // Path หลักจาก URL
                const menuPath = link.split("/")[1] || ""; // Path หลักจากเมนู

                // สร้างกฎสำหรับตรวจสอบ Active
                const activeRules = {
                    "": [""], // สำหรับหน้าแรก
                    stickers: ["sticker", "stickers"],
                    themes: ["theme", "themes"],
                    emojis: ["emoji", "emojis"],
                };

                // ตรวจสอบว่า currentPath อยู่ในกฎของ menuPath หรือไม่
                return activeRules[menuPath]?.includes(currentPath) || false;
            },
        },
    };
</script>

<style>
    /* @import url("https://fonts.googleapis.com/icon?family=Material+Icons"); */

    /* เพิ่มฟอนต์ Material Symbols Outlined */
    @import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=swap");

    /* สไตล์สำหรับ Material Symbols Outlined */
    .material-symbols-outlined {
        font-family: "Material Symbols Outlined";
        font-weight: normal;
        font-style: normal;
        font-size: 24px; /* ขนาดของไอคอน */
        line-height: 1;
        letter-spacing: normal;
        text-transform: none;
        white-space: nowrap;
        word-wrap: normal;
        direction: ltr;
        -webkit-font-smoothing: antialiased;
        display: inline-block;
        vertical-align: middle;
    }
</style>
