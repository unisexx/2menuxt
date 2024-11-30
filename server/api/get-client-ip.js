export default defineEventHandler((event) => {
    // ดึง IP Address จาก Header หรือ Connection
    const ipAddress =
        event.req.headers["x-forwarded-for"] ||
        event.req.connection.remoteAddress;

    // ตรวจสอบและปรับแต่งค่า IP Address (จัดการกรณี "::ffff:")
    const clientIp = ipAddress.includes("::ffff:")
        ? ipAddress.split("::ffff:")[1]
        : ipAddress;

    // ส่งคืนค่า IP Address
    return {
        ip: clientIp || "Unknown", // คืนค่า IP หรือ "Unknown" หากไม่พบ
    };
});
