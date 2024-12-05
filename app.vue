<template>
    <div class="relative overflow-hidden">
        <NuxtLayout> </NuxtLayout>
    </div>
</template>

<script setup>
    useHead({
        script: [
            {
                src: "https://www.googletagmanager.com/gtag/js?id=G-WGHGZDRCTE",
                async: true,
            },
        ],
        innerHTML: `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-WGHGZDRCTE');
  `,
    });
</script>
