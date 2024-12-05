<template>
    <div class="relative overflow-hidden">
        <NuxtLayout> </NuxtLayout>
    </div>
</template>

<script setup>
    useHead({
        script: [
            {
                src: "https://www.googletagmanager.com/gtag/js?id=G-L2WFRL1B38",
                async: true,
            },
        ],
        innerHTML: `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-L2WFRL1B38');
  `,
    });
</script>
