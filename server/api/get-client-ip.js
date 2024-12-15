export default defineEventHandler((event) => {
    // ดึง IP Address จาก Header หรือ Connection
    const ipAddress =
        event.req.headers["x-forwarded-for"] || // กรณีมี Proxy
        event.req.connection.remoteAddress; // ดึงจาก Connection โดยตรง

    let clientIp = "Unknown";

    if (ipAddress) {
        // กรองเฉพาะ IP v4 (ใช้ Regex)
        const ipv4Regex = /^(?:\d{1,3}\.){3}\d{1,3}$/;

        // ตรวจสอบกรณี x-forwarded-for ที่มีหลาย IP
        const ipList = ipAddress.split(",").map((ip) => ip.trim());

        for (const ip of ipList) {
            // จัดการกรณี "::ffff:" ซึ่งเป็น IPv4 ที่แปลงมาจาก IPv6
            const cleanIp = ip.includes("::ffff:")
                ? ip.split("::ffff:")[1]
                : ip;

            // ตรวจสอบว่าเป็น IPv4
            if (ipv4Regex.test(cleanIp)) {
                clientIp = cleanIp;
                break;
            }
        }
    }

    // ส่งคืนค่า IP v4 หรือ "Unknown"
    return {
        ip: clientIp,
    };
});
