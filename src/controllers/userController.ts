import type { VercelRequest, VercelResponse } from "@vercel/node"
import { UserService } from "../services/userService"

export const getUserController = {
  async getAll(req: VercelRequest, res: VercelResponse) {
    try {
      const users = await UserService.getAllUsers()
      return res.status(200).json({
        success: true,
        data: users,
      })
    } catch (error) {
      console.error("Get all users error:", error)
      return res.status(500).json({
        success: false,
        error: "Failed to fetch users",
      })
    }
  },

  async getById(req: VercelRequest, res: VercelResponse) {
    try {
      const { id } = req.query
      const user = await UserService.getUserById(id as string)

      if (!user) {
        return res.status(404).json({
          success: false,
          error: "User not found",
        })
      }

      return res.status(200).json({
        success: true,
        data: user,
      })
    } catch (error) {
      console.error("Get user by ID error:", error)
      return res.status(500).json({
        success: false,
        error: "Failed to fetch user",
      })
    }
  },

  async create(req: VercelRequest, res: VercelResponse) {
    try {
      const userData = req.body
      const newUser = await UserService.createUser(userData)

      return res.status(201).json({
        success: true,
        data: newUser,
      })
    } catch (error) {
      console.error("Create user error:", error)
      return res.status(500).json({
        success: false,
        error: "Failed to create user",
      })
    }
  },

  async update(req: VercelRequest, res: VercelResponse) {
    try {
      const { id } = req.query
      const userData = req.body
      const updatedUser = await UserService.updateUser(id as string, userData)

      return res.status(200).json({
        success: true,
        data: updatedUser,
      })
    } catch (error) {
      console.error("Update user error:", error)
      return res.status(500).json({
        success: false,
        error: "Failed to update user",
      })
    }
  },

  async delete(req: VercelRequest, res: VercelResponse) {
    try {
      const { id } = req.query
      await UserService.deleteUser(id as string)

      return res.status(200).json({
        success: true,
        message: "User deleted successfully",
      })
    } catch (error) {
      console.error("Delete user error:", error)
      return res.status(500).json({
        success: false,
        error: "Failed to delete user",
      })
    }
  },
}
