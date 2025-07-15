import type { VercelRequest, VercelResponse } from "@vercel/node"

// Mock users data
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
    switch (req.method) {
      case "GET":
        const { page = "1", limit = "10", search = "" } = req.query
        const pageNum = Number.parseInt(page as string)
        const limitNum = Number.parseInt(limit as string)

        let filteredUsers = users
        if (search) {
          filteredUsers = users.filter(
            (user) =>
              user.name.toLowerCase().includes((search as string).toLowerCase()) ||
              user.email.toLowerCase().includes((search as string).toLowerCase()),
          )
        }

        const startIndex = (pageNum - 1) * limitNum
        const endIndex = startIndex + limitNum
        const paginatedUsers = filteredUsers.slice(startIndex, endIndex)

        return res.status(200).json({
          success: true,
          data: paginatedUsers,
          pagination: {
            page: pageNum,
            limit: limitNum,
            total: filteredUsers.length,
            totalPages: Math.ceil(filteredUsers.length / limitNum),
          },
          message: "Users retrieved successfully",
        })

      case "POST":
        const { name, email, role = "user" } = req.body

        if (!name || !email) {
          return res.status(400).json({
            success: false,
            error: "Name and email are required",
          })
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
          return res.status(400).json({
            success: false,
            error: "Invalid email format",
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

        const newUser = {
          id: Math.max(...users.map((u) => u.id), 0) + 1,
          name,
          email,
          role,
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
