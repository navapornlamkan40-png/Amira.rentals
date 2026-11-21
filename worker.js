
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // ตรวจสอบการทำงานของ Worker
    if (url.pathname === "/api/health") {
      return Response.json({
        success: true,
        message: "AMIRA.RENTALS Worker is running"
      });
    }

    // ทดสอบการเชื่อมต่อ D1 Database
    if (url.pathname === "/api/db") {
      try {
        const result = await env.DB
          .prepare("SELECT 1 AS connected")
          .first();

        return Response.json({
          success: true,
          database: "amira-rentals-db",
          connected: result.connected === 1
        });
      } catch (error) {
        return Response.json({
          success: false,
          error: error.message
        }, { status: 500 });
      }
    }

    // แสดงเว็บไซต์เดิม
    return env.ASSETS.fetch(request);
  }
};
