export default {
    apps: [
        {
            name: "line2me",
            script: "./.output/server/index.mjs",
            exec_mode: "cluster",
            instances: "max",
            env: {
                NODE_ENV: "production",
                PORT: 3000,
            },
        },
    ],
};
