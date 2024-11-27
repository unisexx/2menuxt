<template>
    <ul class="p-4">
        <li v-for="menu in menus" :key="menu.to">
            <NuxtLink
                v-if="menu.to"
                :to="menu.to"
                :class="[
                    {
                        'menu-item flex items-center py-2 px-4 rounded-lg transition-all duration-300': true,
                        'bg-blue-700 text-white shadow-md': isActive(menu.to),
                        'hover:bg-blue-100 hover:text-blue-700': !isActive(
                            menu.to
                        ),
                    },
                ]"
                @click="() => closeAside()"
            >
                <span
                    v-if="menu.icon"
                    class="material-symbols-outlined text-lg bg-gradient-to-br from-indigo-400 to-blue-400 bg-clip-text text-transparent"
                >
                    {{ menu.icon }}
                </span>
                <span class="ml-2 font-medium">{{ menu.label }}</span>
            </NuxtLink>
            <hr v-else-if="menu.separator" />
        </li>
    </ul>
</template>

<script setup>
    defineProps({
        menus: {
            type: Array,
            required: true,
        },
        isActive: {
            type: Function,
            required: true,
        },
        closeAside: {
            type: Function,
            default: () => {}, // ฟังก์ชันเปล่า กรณีไม่ต้องการปิดเมนู
        },
    });
</script>
