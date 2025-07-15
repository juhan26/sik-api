import type { VercelRequest, VercelResponse } from "@vercel/node"
import { ConfigService } from "../services/configService"

export const getConfigController = {
  async getAll(req: VercelRequest, res: VercelResponse) {
    try {
      const configs = await ConfigService.getAllConfigs()
      return res.status(200).json({
        success: true,
        data: configs,
      })
    } catch (error) {
      console.error("Get all configs error:", error)
      return res.status(500).json({
        success: false,
        error: "Failed to fetch configs",
      })
    }
  },

  async create(req: VercelRequest, res: VercelResponse) {
    try {
      const configData = req.body
      const newConfig = await ConfigService.createConfig(configData)

      return res.status(201).json({
        success: true,
        data: newConfig,
      })
    } catch (error) {
      console.error("Create config error:", error)
      return res.status(500).json({
        success: false,
        error: "Failed to create config",
      })
    }
  },
}
