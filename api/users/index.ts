import type { VercelRequest, VercelResponse } from "@vercel/node"

// Mock data storage (in production, this would be a database)
const users = [
  { id: 1, name: "John Doe", email: "john@example.com", createdAt: "2024-01-01T00:00:00Z" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", createdAt: "2024-01-02T00:00:00Z" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", createdAt: "2024-01-03T00:00:00Z" },
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
          data: users,
          total: users.length,
          message: "Users retrieved successfully",
        })

      case "POST":
        const { name, email } = req.body

        // Basic validation
        if (!name || !email) {
          return res.status(400).json({
            success: false,
            error: "Name and email are required",
          })
        }

        // Check if email already exists
        const existingUser = users.find((user) => user.email === email)
        if (existingUser) {
          return res.status(409).json({
            success: false,
            error: "User with this email already exists",
          })
        }

        // Create new user
        const newUser = {
          id: Math.max(...users.map((u) => u.id), 0) + 1,
          name,
          email,
          createdAt: new Date().toISOString(),
        }

        users.push(newUser)

        return res.status(201).json({
          success: true,
          data: newUser,
          message: "User created successfully",
        })

      default:
        return res.status(405).json({
          success: false,
          error: "Method not allowed",
        })
    }
  } catch (error) {
    console.error("Users API Error:", error)
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      message: error instanceof Error ? error.message : "Unknown error",
    })
  }
}
