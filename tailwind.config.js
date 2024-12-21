/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./components/**/*.{vue,js}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}",
    ],
    theme: {
        extend: {
            animation: {
                slowspin: "spin 2s linear infinite", // กำหนดให้หมุน 1 รอบใน 2 วินาที
            },
        },
    },
    plugins: [],
};
