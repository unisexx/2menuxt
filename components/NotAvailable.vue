<template>
    <div
        class="flex flex-col items-center justify-center w-full lg:w-9/12 xl:w-8/12 mx-auto min-h-screen mt-[-150px]"
    >
        <img
            :src="imgUrl"
            :alt="title"
            class="w-32 sm:w-48 lg:w-56 xl:w-64 h-auto autoLoopSticker"
            loading="lazy"
        />
        <h1
            class="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 flex flex-wrap items-center gap-2 text-center text-gray-700"
        >
            {{ title }}
        </h1>
        <p class="text-gray-500 mb-6">ชุดนี้ไม่มีขายแล้ว T-T"</p>

        <!-- ปุ่ม ดูรายการอื่นๆ -->
        <NuxtLink
            to="/"
            class="bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
            ดูรายการอื่นๆ
        </NuxtLink>
    </div>
</template>

<script>
    export default {
        props: {
            imgUrl: {
                type: String,
                required: true, // ระบุว่า imgUrl เป็นข้อมูลที่ต้องส่งมา
            },
            title: {
                type: String,
                required: true, // ระบุว่า title เป็นข้อมูลที่ต้องส่งมา
            },
        },
    };
</script>
