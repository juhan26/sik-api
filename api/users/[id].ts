import type { VercelRequest, VercelResponse } from "@vercel/node"

// Mock users data (same as index.ts - in production this would be shared via database)
const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "user",
    createdAt: "2024-01-02T00:00:00Z",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "user",
    createdAt: "2024-01-03T00:00:00Z",
  },
]

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")

  if (req.method === "OPTIONS") {
    return res.status(200).end()
  }

  try {
    const { id } = req.query
    const userId = Number.parseInt(id as string)

    if (isNaN(userId)) {
      return res.status(400).json({
        success: false,
        error: "Invalid user ID format",
      })
    }

    switch (req.method) {
      case "GET":
        const user = users.find((u) => u.id === userId)
        if (!user) {
          return res.status(404).json({
            success: false,
            error: "User not found",
          })
        }

        return res.status(200).json({
          success: true,
          data: user,
          message: "User retrieved successfully",
        })

      case "PUT":
        const { name, email, role } = req.body
        const userIndex = users.findIndex((u) => u.id === userId)

        if (userIndex === -1) {
          return res.status(404).json({
            success: false,
            error: "User not found",
          })
        }

        // Email validation if email is being updated
        if (email) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailRegex.test(email)) {
            return res.status(400).json({
              success: false,
              error: "Invalid email format",
            })
          }

          // Check if email already exists (excluding current user)
          const existingUser = users.find((user) => user.email === email && user.id !== userId)
          if (existingUser) {
            return res.status(409).json({
              success: false,
              error: "User with this email already exists",
            })
          }
        }

        // Update user fields
        if (name) users[userIndex].name = name
        if (email) users[userIndex].email = email
        if (role) users[userIndex].role = role

        return res.status(200).json({
          success: true,
          data: users[userIndex],
          message: "User updated successfully",
        })

      case "DELETE":
        const deleteIndex = users.findIndex((u) => u.id === userId)
        if (deleteIndex === -1) {
          return res.status(404).json({
            success: false,
            error: "User not found",
          })
        }

        const deletedUser = users[deleteIndex]
        users.splice(deleteIndex, 1)

        return res.status(200).json({
          success: true,
          data: deletedUser,
          message: "User deleted successfully",
        })

      default:
        return res.status(405).json({
          success: false,
          error: "Method not allowed",
        })
    }
  } catch (error) {
    console.error("User API Error:", error)
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      message: error instanceof Error ? error.message : "Unknown error",
    })
  }
}
