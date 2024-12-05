<template>
    <div class="relative overflow-hidden">
        <NuxtLayout> </NuxtLayout>
    </div>
</template>

<script setup>
    useHead({
        script: [
            {
                src: "https://www.googletagmanager.com/gtag/js?id=G-WGWGZDRCTE",
                async: true,
            },
        ],
        innerHTML: `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-WGWGZDRCTE');
  `,
    });
</script>
