<template>
    <div class="relative overflow-hidden">
        <NuxtLayout> </NuxtLayout>
    </div>
</template>

<script setup>
    if (process.client) {
        useHead({
            script: [
                {
                    src: "https://www.googletagmanager.com/gtag/js?id=G-K10KSG51EV",
                    async: true,
                },
            ],
            innerHTML: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-K10KSG51EV');
    `,
        });
    }
</script>
