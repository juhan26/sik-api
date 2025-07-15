import { User } from "../models/User"

export const UserService = {
  async getAllUsers() {
    try {
      return await User.findAll()
    } catch (error) {
      throw new Error("Failed to fetch users from database")
    }
  },

  async getUserById(id: string) {
    try {
      return await User.findByPk(id)
    } catch (error) {
      throw new Error("Failed to fetch user from database")
    }
  },

  async createUser(userData: any) {
    try {
      return await User.create(userData)
    } catch (error) {
      throw new Error("Failed to create user in database")
    }
  },

  async updateUser(id: string, userData: any) {
    try {
      const [updatedRowsCount] = await User.update(userData, {
        where: { id },
      })

      if (updatedRowsCount === 0) {
        throw new Error("User not found")
      }

      return await User.findByPk(id)
    } catch (error) {
      throw new Error("Failed to update user in database")
    }
  },

  async deleteUser(id: string) {
    try {
      const deletedRowsCount = await User.destroy({
        where: { id },
      })

      if (deletedRowsCount === 0) {
        throw new Error("User not found")
      }

      return true
    } catch (error) {
      throw new Error("Failed to delete user from database")
    }
  },
}
