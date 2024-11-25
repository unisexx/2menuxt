module.exports = {
    apps: [
        {
            name: "line2me",
            script: "./.output/server/index.mjs",
            exec_mode: "cluster",
            instances: "max", // หรือกำหนดจำนวน instance เช่น 2, 3
            env: {
                NODE_ENV: "production",
                PORT: 3000,
            },
        },
    ],
};
