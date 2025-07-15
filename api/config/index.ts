import type { VercelRequest, VercelResponse } from "@vercel/node"

// Mock config data
const configs = [
  {
    id: 1,
    key: "app_name",
    value: "SIK API",
    description: "Application name",
    category: "general",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 2,
    key: "version",
    value: "1.0.0",
    description: "API version",
    category: "general",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 3,
    key: "maintenance_mode",
    value: "false",
    description: "Maintenance mode status",
    category: "system",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 4,
    key: "max_upload_size",
    value: "10MB",
    description: "Maximum file upload size",
    category: "system",
    createdAt: "2024-01-01T00:00:00Z",
  },
]

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")

  const { category, search } = req.query

  if (req.method === "OPTIONS") {
    return res.status(200).end()
  }

  try {
    switch (req.method) {
      case "GET":
        let filteredConfigs = configs

        if (category) {
          filteredConfigs = filteredConfigs.filter((config) => config.category === category)
        }

        if (search) {
          filteredConfigs = filteredConfigs.filter(
            (config) =>
              config.key.toLowerCase().includes((search as string).toLowerCase()) ||
              config.description.toLowerCase().includes((search as string).toLowerCase()),
          )
        }

        return res.status(200).json({
          success: true,
          data: filteredConfigs,
          total: filteredConfigs.length,
          categories: [...new Set(configs.map((c) => c.category))],
          message: "Configs retrieved successfully",
        })

      case "POST":
        const { key, value, description = "", configCategory = "general" } = req.body

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

        const newConfig = {
          id: Math.max(...configs.map((c) => c.id), 0) + 1,
          key,
          value,
          description,
          category: configCategory,
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
