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
    switch (req.method) {
      case "GET":
        // Mock data for now to test deployment
        return res.status(200).json({
          success: true,
          data: [
            { id: 1, key: "app_name", value: "SIK API" },
            { id: 2, key: "version", value: "1.0.0" },
          ],
        })
      case "POST":
        const { key, value } = req.body
        return res.status(201).json({
          success: true,
          data: { id: Date.now(), key, value },
          message: "Config created successfully",
        })
      default:
        return res.status(405).json({ error: "Method not allowed" })
    }
  } catch (error) {
    console.error("API Error:", error)
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    })
  }
}
