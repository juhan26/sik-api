import { Config } from "../models/Config"

export const ConfigService = {
  async getAllConfigs() {
    try {
      return await Config.findAll()
    } catch (error) {
      throw new Error("Failed to fetch configs from database")
    }
  },

  async createConfig(configData: any) {
    try {
      return await Config.create(configData)
    } catch (error) {
      throw new Error("Failed to create config in database")
    }
  },
}
