module.exports = {
    apps: [
        {
            name: "line2me",
            exec_mode: "cluster",
            instances: "max", // หรือระบุจำนวน instance ที่ต้องการ
            script: "./.output/server/index.mjs",
            env: {
                PORT: 3000, // หรือพอร์ตที่ต้องการให้แอปพลิเคชันรัน
                NODE_ENV: "production",
            },
        },
    ],
};
