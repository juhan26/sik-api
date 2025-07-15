import type { VercelRequest, VercelResponse } from "@vercel/node"

// Mock config data
const configs = [
  { id: 1, key: "app_name", value: "SIK API", description: "Application name", createdAt: "2024-01-01T00:00:00Z" },
  { id: 2, key: "version", value: "1.0.0", description: "API version", createdAt: "2024-01-01T00:00:00Z" },
  {
    id: 3,
    key: "maintenance_mode",
    value: "false",
    description: "Maintenance mode status",
    createdAt: "2024-01-01T00:00:00Z",
  },
]

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
        return res.status(200).json({
          success: true,
          data: configs,
          total: configs.length,
          message: "Configs retrieved successfully",
        })

      case "POST":
        const { key, value, description } = req.body

        // Basic validation
        if (!key || !value) {
          return res.status(400).json({
            success: false,
            error: "Key and value are required",
          })
        }

        // Check if key already exists
        const existingConfig = configs.find((config) => config.key === key)
        if (existingConfig) {
          return res.status(409).json({
            success: false,
            error: "Config with this key already exists",
          })
        }

        // Create new config
        const newConfig = {
          id: Math.max(...configs.map((c) => c.id), 0) + 1,
          key,
          value,
          description: description || "",
          createdAt: new Date().toISOString(),
        }

        configs.push(newConfig)

        return res.status(201).json({
          success: true,
          data: newConfig,
          message: "Config created successfully",
        })

      default:
        return res.status(405).json({
          success: false,
          error: "Method not allowed",
        })
    }
  } catch (error) {
    console.error("Config API Error:", error)
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      message: error instanceof Error ? error.message : "Unknown error",
    })
  }
}
