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
            <!-- Layout for Mobile or Desktop -->
            <div v-if="screenIsLarge" class="hidden lg:flex">
                <!-- Desktop Layout -->
                <aside
                    class="border-r h-screen w-64 bg-white fixed top-[4rem] left-0 z-40"
                >
                    <MenuList :menus="menus" :isActive="isActive" />
                </aside>
                <main class="flex-1 p-3 ml-64">
                    <NuxtPage />
                </main>
            </div>

            <div v-else class="lg:hidden">
                <!-- Mobile Layout -->
                <button
                    class="fixed top-3 right-4 bg-blue-700 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none flex items-center justify-center z-50"
                    @click="toggleAside"
                >
                    <span v-if="isCollapsed" class="material-symbols-outlined">
                        menu
                    </span>
                    <span v-else class="material-symbols-outlined">
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
                    <MenuList
                        :menus="menus"
                        :isActive="isActive"
                        :closeAside="closeAside"
                    />
                </aside>

                <!-- Main Content -->
                <main class="flex-1 p-3 transition-all duration-300">
                    <NuxtPage />
                </main>
            </div>
        </div>

        <!-- Footer -->
        <footer class="bg-gray-800 text-white py-4">
            <div class="container mx-auto text-center">
                <p>&copy; 2024 line2me All rights reserved.</p>
            </div>
        </footer>
    </div>
</template>

<script>
    import MenuList from "~/components/MenuList.vue";

    export default {
        name: "Layout",
        data() {
            return {
                isCollapsed: true,
                menus: [
                    { to: "/", label: "หน้าแรก", icon: "home" },
                    { separator: true },
                    {
                        to: "/stickers",
                        label: "สติกเกอร์ไลน์",
                        icon: "rocket_launch",
                    },
                    { separator: true },
                    { to: "/themes", label: "ธีมไลน์", icon: "palette" },
                    { separator: true },
                    {
                        to: "/emojis",
                        label: "อิโมจิไลน์",
                        icon: "emoji_emotions",
                    },
                ],
                screenIsLarge: false,
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
                this.isCollapsed = true;
            },
            setDefaultAsideState() {
                if (process.client) {
                    const screenWidth = window.innerWidth;
                    this.screenIsLarge = screenWidth >= 1024;
                    this.isCollapsed = !this.screenIsLarge;
                }
            },
            isActive(link) {
                const currentPath = this.$route.path.split("/")[1] || "";
                const menuPath = link.split("/")[1] || "";
                const activeRules = {
                    "": [""],
                    stickers: ["sticker", "stickers"],
                    themes: ["theme", "themes"],
                    emojis: ["emoji", "emojis"],
                };
                return activeRules[menuPath]?.includes(currentPath) || false;
            },
        },
    };
</script>
