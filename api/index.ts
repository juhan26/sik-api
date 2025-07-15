import type { VercelRequest, VercelResponse } from "@vercel/node"

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")

  if (req.method === "OPTIONS") {
    return res.status(200).end()
  }

  try {
    return res.status(200).json({
      success: true,
      message: "🚀 SIK API is running successfully!",
      version: "1.0.0",
      timestamp: new Date().toISOString(),
      nodeVersion: process.version,
      endpoints: {
        users: "/api/users",
        config: "/api/config",
        health: "/api/health",
      },
      environment: process.env.NODE_ENV || "production",
    })
  } catch (error) {
    console.error("API Error:", error)
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      message: error instanceof Error ? error.message : "Unknown error",
    })
  }
}
