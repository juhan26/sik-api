import type { VercelRequest, VercelResponse } from "@vercel/node"
import { getUserController } from "../../src/controllers/userController"

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")

  if (req.method === "OPTIONS") {
    return res.status(200).end()
  }

  try {
    const { id } = req.query

    switch (req.method) {
      case "GET":
        return await getUserController.getById(req, res)
      case "PUT":
        return await getUserController.update(req, res)
      case "DELETE":
        return await getUserController.delete(req, res)
      default:
        return res.status(405).json({ error: "Method not allowed" })
    }
  } catch (error) {
    console.error("API Error:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
}
